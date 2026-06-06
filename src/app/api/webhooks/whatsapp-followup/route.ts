import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, classification } = body;

    if (!phone || !classification) {
      return NextResponse.json({ error: 'Missing phone or classification' }, { status: 400 });
    }

    console.log(`[WhatsApp Follow-up] Triggered for ${phone}. Classification: ${classification}`);

    // Ensure phone number has country code (assuming India +91 if length is 10)
    let cleanPhone = phone.replace(/[\s\-\+\(\)]/g, '');
    if (cleanPhone.length === 10) {
      cleanPhone = `91${cleanPhone}`;
    }

    const WA_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN || process.env.WHATSAPP_TOKEN;
    const PHONE_ID = process.env.WHATSAPP_PHONE_NUMBER_ID || process.env.WHATSAPP_PHONE_ID;

    if (!WA_TOKEN || !PHONE_ID) {
      console.warn('WhatsApp API credentials missing. Simulating success.');
      return NextResponse.json({ success: true, simulated: true });
    }

    // Determine which Meta-approved template to send based on classification or custom override
    const templateOverride = body.template;
    let templateName = templateOverride || 'generic_followup';
    let langCode = 'en';

    if (!templateOverride) {
      if (classification === 'dealer' || classification === 'reseller') {
        templateName = 'dealer_partnership_invite'; // Replace with actual Meta template name
      } else if (classification === 'end_user') {
        templateName = 'product_brochure_send'; // Replace with actual Meta template name
      }
    }

    if (templateName === 'hello_world') {
      langCode = 'en_US';
    }

    const payload: any = {
      messaging_product: 'whatsapp',
      to: cleanPhone,
      type: 'template',
      template: {
        name: templateName,
        language: { code: langCode }
      }
    };

    // Only include body parameters if we are not sending the basic 'hello_world' template
    if (templateName !== 'hello_world') {
      payload.template.components = [
        {
          type: 'body',
          parameters: [
            { type: 'text', text: name || 'Valued Customer' }
          ]
        }
      ];
    }

    const res = await fetch(`https://graph.facebook.com/v18.0/${PHONE_ID}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WA_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    
    if (!res.ok) {
      console.error('WhatsApp API Error:', data);

      // Fallback: If custom template is missing/unapproved, retry with default hello_world test template
      if (data.error?.code === 132001 && templateName !== 'hello_world') {
        console.warn(`[WhatsApp Follow-up] Template '${templateName}' does not exist in Meta. Retrying with 'hello_world' fallback...`);
        const fallbackPayload = {
          messaging_product: 'whatsapp',
          to: cleanPhone,
          type: 'template',
          template: {
            name: 'hello_world',
            language: { code: 'en_US' }
          }
        };

        const fallbackRes = await fetch(`https://graph.facebook.com/v18.0/${PHONE_ID}/messages`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${WA_TOKEN}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(fallbackPayload)
        });

        const fallbackData = await fallbackRes.json();
        if (fallbackRes.ok) {
          console.log('[WhatsApp Follow-up] Fallback hello_world message sent successfully!');
          return NextResponse.json({ success: true, messageId: fallbackData.messages?.[0]?.id, fallback: true });
        } else {
          console.error('[WhatsApp Follow-up] Fallback hello_world failed:', fallbackData);
        }
      }

      return NextResponse.json({ error: 'Failed to send WhatsApp message', details: data }, { status: 500 });
    }

    return NextResponse.json({ success: true, messageId: data.messages?.[0]?.id });

  } catch (err) {
    console.error('WhatsApp Follow-up error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
