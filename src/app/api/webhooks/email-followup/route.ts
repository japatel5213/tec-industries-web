import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, classification } = body;

    if (!email || !classification) {
      return NextResponse.json({ error: 'Missing email or classification' }, { status: 400 });
    }

    console.log(`[Email Follow-up] Triggered for ${email}. Classification: ${classification}`);

    const ZEPTOMAIL_TOKEN = process.env.ZEPTOMAIL_SEND_TOKEN;
    if (!ZEPTOMAIL_TOKEN) {
      console.warn('ZeptoMail token missing. Simulating success.');
      return NextResponse.json({ success: true, simulated: true });
    }

    // Determine email content based on classification
    let subject = 'Thank you for your interest in TEC Industries!';
    let htmlBody = `
      <p>Hi ${name || 'Valued Customer'},</p>
      <p>Thank you for reaching out. Attached is our product brochure.</p>
    `;

    if (classification === 'dealer' || classification === 'reseller') {
      subject = 'Exclusive Dealer Partnership with TEC Industries';
      htmlBody = `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto;">
          <h2>Dealer Partnership Details</h2>
          <p>Hi ${name || 'Partner'},</p>
          <p>It was great speaking with you. As a rapidly growing manufacturer, we offer highly competitive margins and dedicated support to our dealers and resellers.</p>
          <p>Please find attached our <strong>B2B Pricing Matrix</strong> and <strong>Partnership Agreement</strong> terms.</p>
          <p>If you have any questions regarding MOQs or logistics, please reply directly to this email.</p>
          <br/>
          <p>Best Regards,</p>
          <p><strong>TEC Industries AI Executive</strong></p>
        </div>
      `;
    }

    const payload = {
      from: { "address": "sales@tecindustries.in", "name": "TEC Industries" },
      to: [{ "email_address": { "address": email, "name": name || "" } }],
      subject: subject,
      htmlbody: htmlBody
    };

    const res = await fetch('https://api.zeptomail.in/v1.1/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Zoho-enczapikey ${ZEPTOMAIL_TOKEN}`
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    
    if (!res.ok) {
      console.error('ZeptoMail API Error:', data);
      return NextResponse.json({ error: 'Failed to send Email', details: data }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Email sent successfully' });

  } catch (err) {
    console.error('Email Follow-up error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
