import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { pushLeadToZohoCRM } from '@/lib/zoho';

// Helper function to process and inject a lead (reused from ads-lead logic)
async function processLead(lead: { name: string, email: string, phone: string, company: string, source: string, campaign: string }) {
  let { name, email, phone, company, source, campaign } = lead;

  // Basic validation
  if (!name && !email && !phone) return { status: 'skipped', reason: 'No contact fields' };
  
  name = name || 'Anonymous B2B Buyer';
  email = email || 'no-email@tecindustries.in';
  phone = phone || 'no-phone';

  // Anti-Spam: Basic format and syntax verification for phone/email
  const cleanPhone = phone.replace(/[\s\-\+\(\)]/g, '');
  const isFakeEmail = /^(asdf|test|dummy|fake|spam|none|noemail|abc|123)/i.test(email) || email.includes('example.com');
  const isInvalidPhone = phone !== 'no-phone' && (cleanPhone.length < 10 || /^(0123|1234|9999|0000|1111)/.test(cleanPhone));

  if (isFakeEmail || isInvalidPhone) {
    console.warn(`[${source}] Lead rejected as spam/fake: Email=${email}, Phone=${phone}`);
    return { status: 'skipped', reason: 'Spam/Fake data' };
  }

  // 1. DEDUPLICATION (24-Hour Check)
  if (phone !== 'no-phone') {
    try {
      const { data: existingLeads, error: checkError } = await supabase
        .from('leads')
        .select('id, created_at')
        .eq('phone', phone)
        .order('created_at', { ascending: false })
        .limit(1);

      if (!checkError && existingLeads && existingLeads.length > 0) {
        const timeDiff = Date.now() - new Date(existingLeads[0].created_at).getTime();
        if (timeDiff < 24 * 60 * 60 * 1000) { // 24 hours
          console.warn(`[${source}] Duplicate lead detected within 24 hours for phone ${phone}.`);
          return { status: 'skipped', reason: 'Duplicate within 24 hours' };
        }
      }
    } catch (checkErr) {
      console.error(`[${source}] Supabase duplicate check failed:`, checkErr);
    }
  }

  // 2. SAVE LEAD TO SUPABASE
  const dbCompany = company ? company : `Individual Lead`;
  let dbSaved = false;
  try {
    const { error: dbError } = await supabase
        .from('leads')
        .insert([{
          full_name: name,
          email: email,
          phone: phone,
          company_name: dbCompany,
          source: source,
          status: 'new'
        }]);
    if (dbError) throw dbError;
    dbSaved = true;
  } catch (dbErr) {
    console.error(`[${source}] Database save failed:`, dbErr);
  }

  // 3. ZOHO CRM INTEGRATION (REST API with Webform Fallback)
  let crmPushed = false;
  try {
    const crmCompany = company && company.trim() ? company.trim() : 'Individual / B2B Lead';
    const crmDescription = `Source: ${source}\nCampaign: ${campaign}`;

    // Try REST API first
    crmPushed = await pushLeadToZohoCRM({
      name,
      email,
      phone,
      company: crmCompany,
      description: crmDescription,
      source
    });

    if (!crmPushed) {
      console.log(`[${source}] Zoho CRM REST API credentials missing or request failed. Falling back to silent Webform post...`);
      // Fallback to silent Web-to-Lead webform
      const nameParts = name.trim().split(/\s+/);
      const firstName = nameParts.length > 1 ? nameParts.slice(0, -1).join(' ') : '';
      const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : nameParts[0] || 'Unknown';

      const crmFormData = new URLSearchParams();
      crmFormData.append('xnQsjsdp', '8996f7e0cceb00c9a3946223a7e578537bf2af193ad74c8283350840e698149a');
      crmFormData.append('xmIwtLD', '0e3e941d571469315a5f4529585043f1fed06d97c2d88ff60762a44c3001d3b4a14ad558bc83f1504051ed0506584a22');
      crmFormData.append('actionType', 'TGVhZHM=');
      crmFormData.append('returnURL', 'null');
      crmFormData.append('Company', crmCompany);
      crmFormData.append('First Name', firstName);
      crmFormData.append('Last Name', lastName);
      crmFormData.append('Mobile', phone);
      crmFormData.append('Email', email);
      crmFormData.append('WhatsApp Number', phone);
      crmFormData.append('Industry', 'B2B Portal Lead');
      crmFormData.append('Description', crmDescription);

      const crmRes = await fetch('https://crm.zoho.in/crm/WebToLeadForm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: crmFormData.toString(),
      });

      if (!crmRes.ok) {
        console.error(`[${source}] Zoho CRM Webform response error:`, crmRes.status);
      } else {
        console.log(`[${source}] Successfully pushed lead to Zoho CRM via Webform fallback!`);
        crmPushed = true;
      }
    }
  } catch (crmErr) {
    console.error(`[${source}] Failed to push to Zoho CRM:`, crmErr);
  }

  // 4. FORWARD TO PAPERCLIP AI AGENTS (Exotel/LiveKit Telecaller)
  let forwardedToAgents = false;
  if (process.env.PAPERCLIP_API_URL) {
    try {
      const paperclipRes = await fetch(process.env.PAPERCLIP_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          company: dbCompany,
          email,
          phone,
          role: 'general',
          productInterest: 'B2B Portal Inquiry',
          message: `New B2B Lead from ${source}. Please trigger the AI Telecaller for immediate outreach.`,
          source: source
        }),
      });
      if (paperclipRes.ok) forwardedToAgents = true;
    } catch (paperclipErr) {
      console.error(`[${source}] Failed to forward to Paperclip AI:`, paperclipErr);
    }
  }

  // 5. TRIGGER WHATSAPP FOLLOW-UP AUTOMATICALLY
  if (phone && phone !== 'no-phone') {
    try {
      // Resolve host dynamically: use VERCEL_URL in production, localhost in dev
      const host = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000';
      const waUrl = `${host}/api/webhooks/whatsapp-followup`;
      console.log(`[B2B Cron Sync] Triggering WhatsApp follow-up at ${waUrl}...`);
      fetch(waUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          classification: 'dealer' // B2B portal leads default to dealer/reseller follow-up template
        })
      }).catch(err => console.error(`[B2B Cron Sync] WhatsApp trigger failed for ${phone}:`, err));
    } catch (waErr) {
      console.error('[B2B Cron Sync] WhatsApp trigger error:', waErr);
    }
  }

  return { status: 'processed', dbSaved, forwardedToAgents };
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    // Ensure basic security so random bots don't trigger the sync
    if (authHeader !== `Bearer ${process.env.CRON_SECRET || 'tec-cron-secret-123'}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const results = { tradeindia: { status: 'pending', newLeads: 0 }, indiamart: { status: 'pending', newLeads: 0 } };
    const today = new Date().toISOString().split('T')[0];

    // ==========================================
    // 1. TRADEINDIA INTEGRATION
    // ==========================================
    try {
      const tiUserId = '24601889';
      const tiProfileId = '126848643';
      const tiKey = 'a52c8c555aff4546cf738f8e29afa284';
      
      const tradeIndiaUrl = `https://www.tradeindia.com/utils/my_inquiry.html?userid=${tiUserId}&profile_id=${tiProfileId}&key=${tiKey}&from_date=${today}&to_date=${today}&limit=50&page_no=1`;
      const tiRes = await fetch(tradeIndiaUrl);
      const tiRaw = await tiRes.text();
      
      try {
        const tiData = JSON.parse(tiRaw);
        // Robust parsing: TradeIndia might return array directly or wrapped in 'DATA' or 'inquiries'
        let inquiries = [];
        if (Array.isArray(tiData)) inquiries = tiData;
        else if (tiData && Array.isArray(tiData.data)) inquiries = tiData.data;
        else if (tiData && Array.isArray(tiData.inquiries)) inquiries = tiData.inquiries;
        else if (tiData && Array.isArray(tiData.DATA)) inquiries = tiData.DATA;

        let processedCount = 0;
        for (const item of inquiries) {
          // Map TradeIndia fields (using common naming conventions)
          const name = item.sender_name || item.name || item.buyer_name || '';
          const email = item.sender_email || item.email || item.buyer_email || '';
          const phone = item.sender_mobile || item.mobile || item.buyer_mobile || item.sender_phone || '';
          const company = item.sender_company || item.company || item.company_name || '';

          const res = await processLead({
            name, email, phone, company,
            source: 'TradeIndia',
            campaign: 'TradeIndia Portal Sync'
          });
          if (res.status === 'processed') processedCount++;
        }
        results.tradeindia.status = 'success';
        results.tradeindia.newLeads = processedCount;
      } catch (parseErr) {
        console.warn('TradeIndia API did not return valid JSON. Might be down for maintenance.', tiRaw.substring(0, 100));
        results.tradeindia.status = 'maintenance_or_error';
      }
    } catch (e) {
      console.error('TradeIndia Fetch Error:', e);
      results.tradeindia.status = 'error';
    }

    // ==========================================
    // 2. INDIAMART INTEGRATION
    // ==========================================
    try {
      const imKey = process.env.INDIAMART_CRM_KEY;
      if (imKey) {
        const indiaMartUrl = `https://mapi.indiamart.com/wservce/crm/crmListing/v2/?glusr_crm_key=${imKey}&start_time=${today} 00:00:00&end_time=${today} 23:59:59`;
        const imRes = await fetch(indiaMartUrl);
        const imData = await imRes.json();

        let processedCount = 0;
        if (imData && imData.RESPONSE && Array.isArray(imData.RESPONSE)) {
          for (const item of imData.RESPONSE) {
            // Map IndiaMART fields
            const name = item.SENDER_NAME || '';
            const email = item.SENDER_EMAIL || '';
            const phone = item.SENDER_MOBILE || item.SENDER_MOBILE_ALT || '';
            const company = item.SENDER_COMPANY || '';

            const res = await processLead({
              name, email, phone, company,
              source: 'IndiaMART',
              campaign: 'IndiaMART Portal Sync'
            });
            if (res.status === 'processed') processedCount++;
          }
        }
        results.indiamart.status = 'success';
        results.indiamart.newLeads = processedCount;
      } else {
        results.indiamart.status = 'skipped_no_key_configured';
      }
    } catch (e) {
      console.error('IndiaMART Fetch Error:', e);
      results.indiamart.status = 'error';
    }

    return NextResponse.json({ success: true, results });

  } catch (err) {
    console.error('B2B Sync Cron failed:', err);
    return NextResponse.json({ error: 'Failed to process B2B cron sync.' }, { status: 500 });
  }
}
