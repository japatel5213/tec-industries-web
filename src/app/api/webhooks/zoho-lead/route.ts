import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    let body: any = {};
    
    // Zoho CRM webhooks can be sent as form-urlencoded or JSON. We handle both.
    if (request.headers.get('content-type')?.includes('application/x-www-form-urlencoded')) {
      const params = new URLSearchParams(rawBody);
      params.forEach((value, key) => {
        body[key] = value;
      });
    } else {
      try {
        body = JSON.parse(rawBody);
      } catch (e) {
        console.warn('Zoho Webhook payload is not valid JSON, attempting fallback parse.', rawBody);
        return NextResponse.json({ error: 'Invalid payload format' }, { status: 400 });
      }
    }

    console.log('Received Zoho CRM Lead Webhook payload:', body);

    // Extract standardized fields. Adjust these based on how you map the Zoho Webhook parameters.
    const name = body.First_Name ? `${body.First_Name} ${body.Last_Name}`.trim() : (body.Last_Name || body.Full_Name || 'IndiaMART Buyer');
    const email = body.Email || 'no-email@indiamart.local';
    const phone = body.Mobile || body.Phone || 'no-phone';
    const company = body.Company || 'IndiaMART Inquiry';
    const source = body.Lead_Source || 'IndiaMART Email Parser';

    // Basic validation
    if (!name && phone === 'no-phone') {
      return NextResponse.json({ error: 'Lead has no contact fields.' }, { status: 400 });
    }

    // Anti-Spam: Basic format and syntax verification for phone
    const cleanPhone = phone.replace(/[\s\-\+\(\)]/g, '');
    const isInvalidPhone = phone !== 'no-phone' && (cleanPhone.length < 10 || /^(0123|1234|9999|0000|1111)/.test(cleanPhone));

    if (isInvalidPhone) {
      console.warn(`[Zoho Webhook] Lead rejected as spam/fake: Phone=${phone}`);
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
            console.warn(`[Zoho Webhook] Duplicate lead detected within 24 hours for phone ${phone}. Dropping to prevent AI spam.`);
            return NextResponse.json({ error: 'Duplicate lead submitted within 24 hours.' }, { status: 429 });
          }
        }
      } catch (checkErr) {
        console.error('[Zoho Webhook] Supabase duplicate lead check failed:', checkErr);
      }
    }

    // 2. FORWARD TO PAPERCLIP AI AGENTS FOR INSTANT TELECALLER TRIGGER
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
            message: `New Lead captured via Zoho CRM Email Parser. Source: ${source}. Please trigger the AI Telecaller for immediate outreach.`,
            source: source
          }),
        });

        if (paperclipRes.ok) {
          console.log('[Zoho Webhook] Successfully forwarded lead to Paperclip AI agents!');
          forwardedToAgents = true;
        } else {
          console.error('[Zoho Webhook] Paperclip AI response error status:', paperclipRes.status);
        }
      } catch (paperclipErr) {
        console.error('[Zoho Webhook] Failed to forward lead to Paperclip AI:', paperclipErr);
      }
    }

    return NextResponse.json({
      success: true,
      forwarded: forwardedToAgents,
      lead: { name, email, phone, source }
    });

  } catch (err) {
    console.error('[Zoho Webhook] Webhook processing failed:', err);
    return NextResponse.json({ error: 'Failed to process webhook.' }, { status: 500 });
  }
}
