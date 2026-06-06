import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { pushLeadToZohoCRM } from '@/lib/zoho';

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    let body;
    try {
      body = JSON.parse(rawBody);
    } catch (e) {
      return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
    }

    console.log('Received ad platform lead webhook payload:', body);

    // Standardize variables for Google Ads and Facebook Ads payloads
    // 1. Google Lead Form Webhook payload usually has 'user_column_data'
    // 2. Facebook Lead Ads Webhook payload usually has direct fields or leads details
    // 3. We also support direct standardized post parameters for direct API routing
    
    let name = body.name || body.full_name || '';
    let email = body.email || '';
    let phone = body.phone || body.mobile || body.contact_number || '';
    let company = body.company || body.company_name || '';
    let campaign = body.campaign_name || body.campaign || 'Unknown Campaign';
    let source = body.source || 'ads'; // e.g. 'google_ads', 'facebook_ads'
    let adId = body.ad_id || body.creative_id || '';
    let keyword = body.keyword || body.match_type || '';

    // Parse Google Ads Lead Form webhook data format if applicable
    if (body.user_column_data && Array.isArray(body.user_column_data)) {
      source = 'google_ads';
      for (const col of body.user_column_data) {
        const type = col.column_id ? col.column_id.toUpperCase() : '';
        const val = col.string_value || '';
        if (type === 'FULL_NAME') name = val;
        else if (type === 'EMAIL') email = val;
        else if (type === 'PHONE_NUMBER') phone = val;
        else if (type === 'COMPANY_NAME') company = val;
      }
      if (body.campaign_id) {
        campaign = `Google Campaign ${body.campaign_id}`;
      }
    }

    // Parse Facebook Ads Lead webhook format if applicable
    if (body.entry && Array.isArray(body.entry)) {
      source = 'facebook_ads';
      const changes = body.entry[0]?.changes;
      if (changes && Array.isArray(changes)) {
        const leadData = changes[0]?.value;
        if (leadData) {
          name = leadData.full_name || name;
          email = leadData.email || email;
          phone = leadData.phone || phone;
          company = leadData.company_name || company;
          campaign = leadData.campaign_name || campaign;
          adId = leadData.ad_id || adId;
        }
      }
    }

    // Basic validation
    if (!name && !email && !phone) {
      return NextResponse.json({ error: 'Lead has no contact fields.' }, { status: 400 });
    }

    name = name || 'Anonymous B2B Buyer';
    email = email || 'no-email@tecindustries.in';
    phone = phone || 'no-phone';

    // Anti-Spam: Basic format and syntax verification for phone/email
    const cleanPhone = phone.replace(/[\s\-\+\(\)]/g, '');
    const isFakeEmail = /^(asdf|test|dummy|fake|spam|none|noemail|abc|123)/i.test(email) || email.includes('example.com');
    const isInvalidPhone = phone !== 'no-phone' && (cleanPhone.length < 10 || /^(0123|1234|9999|0000|1111)/.test(cleanPhone));

    if (isFakeEmail || isInvalidPhone) {
      console.warn(`Lead rejected as spam/fake: Email=${email}, Phone=${phone}`);
      return NextResponse.json({ error: 'Lead failed security validation.' }, { status: 400 });
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
            console.warn(`Duplicate lead detected within 24 hours for phone ${phone}. Rejecting to prevent CRM clutter.`);
            return NextResponse.json({ error: 'Duplicate lead submitted within 24 hours.' }, { status: 429 });
          }
        }
      } catch (checkErr) {
        console.error('Supabase duplicate lead check failed:', checkErr);
      }
    }

    // 1. SAVE LEAD TO SUPABASE
    const serializedInfo = `[Campaign: ${campaign}] [Ad ID: ${adId || 'N/A'}] [Keyword: ${keyword || 'N/A'}]`;
    const dbCompany = company ? `${company} ${serializedInfo}` : `Individual Lead ${serializedInfo}`;

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
      console.error('Database save failed for ad lead:', dbErr);
    }

    // 2. ZOHO CRM INTEGRATION (REST API with Webform Fallback)
    let crmPushed = false;
    try {
      const crmCompany = company && company.trim() ? company.trim() : 'Individual / Ads Lead';
      const crmDescription = `Ad Campaign: ${campaign}\nCreative ID: ${adId || 'N/A'}\nKeyword/Match: ${keyword || 'N/A'}\nSource: ${source}`;

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
        console.log('[Ads Webhook] Zoho CRM REST API credentials missing or request failed. Falling back to silent Webform post...');
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
        crmFormData.append('Industry', 'Ads Marketing Lead');
        crmFormData.append('Description', crmDescription);

        const crmRes = await fetch('https://crm.zoho.in/crm/WebToLeadForm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: crmFormData.toString(),
        });

        if (!crmRes.ok) {
          console.error('Zoho CRM response error status for ad lead fallback:', crmRes.status);
        } else {
          console.log('Successfully pushed ad lead to Zoho CRM via Webform fallback!');
          crmPushed = true;
        }
      }
    } catch (crmErr) {
      console.error('Failed silently to push ad lead to Zoho CRM:', crmErr);
    }

    // 3. FORWARD TO PAPERCLIP AI AGENTS FOR INSTANT TELECALLER TRIGGER
    let forwardedToAgents = false;
    if (process.env.PAPERCLIP_API_URL) {
      try {
        const paperclipRes = await fetch(process.env.PAPERCLIP_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            company: dbCompany,
            email,
            phone,
            role: 'general',
            productInterest: 'General Inquiry / Ads',
            message: `New ad platform lead captured! Campaign: ${campaign}. Please trigger the AI Telecaller for immediate 60-second outreach.`,
            source: source
          }),
        });

        if (paperclipRes.ok) {
          console.log('Successfully forwarded ad lead to Paperclip AI agents!');
          forwardedToAgents = true;
        } else {
          console.error('Paperclip AI response error status for ad lead:', paperclipRes.status);
        }
      } catch (paperclipErr) {
        console.error('Failed silently to forward ad lead to Paperclip AI:', paperclipErr);
      }
    }

    // 4. TRIGGER WHATSAPP FOLLOW-UP AUTOMATICALLY
    if (phone && phone !== 'no-phone') {
      try {
        const host = request.headers.get('host') || 'localhost:3000';
        const protocol = host.includes('localhost') ? 'http' : 'https';
        const waUrl = `${protocol}://${host}/api/webhooks/whatsapp-followup`;

        // Classify lead: If campaign/company contains dealer or distributor keywords, classify as 'dealer', else default to 'end_user'
        const isDealer = campaign.toLowerCase().includes('dealer') || 
                         campaign.toLowerCase().includes('distributor') || 
                         company.toLowerCase().includes('dealer') || 
                         company.toLowerCase().includes('distributor');
        const classification = isDealer ? 'dealer' : 'end_user';

        console.log(`[Ads Webhook] Triggering WhatsApp follow-up at ${waUrl}. Classification: ${classification}...`);
        fetch(waUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            phone,
            classification
          })
        }).catch(err => console.error('[Ads Webhook] WhatsApp trigger failed asynchronously:', err));
      } catch (waErr) {
        console.error('[Ads Webhook] WhatsApp trigger error:', waErr);
      }
    }

    return NextResponse.json({
      success: true,
      saved: dbSaved,
      emailed: false,
      forwarded: forwardedToAgents,
      lead: { name, email, phone, campaign, source }
    });

  } catch (err) {
    console.error('Webhook processing failed:', err);
    return NextResponse.json({ error: 'Failed to process ad lead webhook.' }, { status: 500 });
  }
}
