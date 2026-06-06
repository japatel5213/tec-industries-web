import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { pushLeadToZohoCRM } from '@/lib/zoho';

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    let body: any = {};
    
    try {
      body = JSON.parse(rawBody);
    } catch (e) {
      console.warn('Make.com Webhook payload is not valid JSON.', rawBody);
      return NextResponse.json({ error: 'Invalid payload format' }, { status: 400 });
    }

    console.log('Received Make.com Lead Webhook payload:', body);

    // Extract standardized fields expected from Make.com
    const name = body.name || 'B2B Lead';
    const email = body.email && !body.email.includes('no-email') ? body.email : '';
    const phone = body.phone || 'no-phone';
    const company = body.company || '';
    const source = body.source || 'B2B Mail Sync';

    // Basic validation
    if (!name && phone === 'no-phone') {
      return NextResponse.json({ error: 'Lead has no contact fields.' }, { status: 400 });
    }

    // Anti-Spam: Basic format and syntax verification for phone
    const cleanPhone = phone.replace(/[\s\-\+\(\)]/g, '');
    const isInvalidPhone = phone !== 'no-phone' && (cleanPhone.length < 10 || /^(0123|1234|9999|0000|1111)/.test(cleanPhone));

    if (isInvalidPhone) {
      console.warn(`[Make.com Webhook] Lead rejected as spam/fake: Phone=${phone}`);
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
            console.warn(`[Make.com Webhook] Duplicate lead detected within 24 hours for phone ${phone}. Dropping to prevent AI spam.`);
            return NextResponse.json({ error: 'Duplicate lead submitted within 24 hours.' }, { status: 429 });
          }
        }
      } catch (checkErr) {
        console.error('[Make.com Webhook] Supabase duplicate lead check failed:', checkErr);
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
      console.error('[Make.com Webhook] Supabase database save failed:', dbErr);
    }

    // 3. ZOHO CRM INTEGRATION (REST API with Webform Fallback)
    let crmPushed = false;
    try {
      const crmCompany = company && company.trim() ? company.trim() : 'Individual / B2B Lead';
      const crmDescription = `Source: ${source}`;

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
        console.log('[Make.com Webhook] Zoho CRM REST API credentials missing or request failed. Falling back to silent Webform post...');
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
          console.error('[Make.com Webhook] Zoho CRM Webform response error:', crmRes.status);
        } else {
          console.log('[Make.com Webhook] Successfully pushed lead to Zoho CRM via Webform fallback!');
          crmPushed = true;
        }
      }
    } catch (crmErr) {
      console.error('[Make.com Webhook] Failed to push to Zoho CRM:', crmErr);
    }

    // 4. FORWARD TO PAPERCLIP AI AGENTS FOR INSTANT TELECALLER TRIGGER
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
            company,
            email,
            phone,
            role: 'general',
            productInterest: 'IndiaMART B2B Inquiry',
            message: `New Lead captured via Zoho Mail B2B Sync. Source: ${source}. Please trigger the AI Telecaller for immediate outreach.`,
            source: source
          }),
        });

        if (paperclipRes.ok) {
          console.log('[Make.com Webhook] Successfully forwarded lead to Paperclip AI agents!');
          forwardedToAgents = true;
        } else {
          console.error('[Make.com Webhook] Paperclip AI response error status:', paperclipRes.status);
        }
      } catch (paperclipErr) {
        console.error('[Make.com Webhook] Failed to forward lead to Paperclip AI:', paperclipErr);
      }
    }

    // 5. TRIGGER WHATSAPP FOLLOW-UP AUTOMATICALLY
    if (phone && phone !== 'no-phone') {
      try {
        const host = request.headers.get('host') || 'localhost:3000';
        const protocol = host.includes('localhost') ? 'http' : 'https';
        const waUrl = `${protocol}://${host}/api/webhooks/whatsapp-followup`;

        // Classify lead: B2B portal leads default to dealer/reseller follow-up template
        const classification = 'dealer';

        console.log(`[Make.com Webhook] Triggering WhatsApp follow-up at ${waUrl}...`);
        fetch(waUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            phone,
            classification
          })
        }).catch(err => console.error('[Make.com Webhook] WhatsApp trigger failed asynchronously:', err));
      } catch (waErr) {
        console.error('[Make.com Webhook] WhatsApp trigger error:', waErr);
      }
    }

    return NextResponse.json({
      success: true,
      dbSaved,
      forwarded: forwardedToAgents,
      lead: { name, email, phone, source }
    });

  } catch (err) {
    console.error('[Make.com Webhook] Webhook processing failed:', err);
    return NextResponse.json({ error: 'Failed to process webhook.' }, { status: 500 });
  }
}
