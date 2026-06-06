import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { supabase } from '@/lib/supabase';

const transporter = nodemailer.createTransport({
  host: process.env.ZOHO_SMTP_HOST || 'smtp.zoho.in',
  port: Number(process.env.ZOHO_SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_SMTP_USER,
    pass: process.env.ZOHO_SMTP_PASS,
  },
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, company, email, phone, role, productInterest, message, LDTuvid } = body;

    // Basic validation
    if (!name || !email || !phone || !message) {
      return NextResponse.json({ error: 'Required fields missing.' }, { status: 400 });
    }

    // 1. SAVE LEAD TO SUPABASE (SO WE NEVER LOSE DATA!)
    const serializedInfo = `[Role: ${role || 'General'}] [Product: ${productInterest || 'General'}] [Msg: ${message}]`;
    const dbCompany = company ? `${company} ${serializedInfo}` : serializedInfo;

    let dbSaved = false;
    try {
      const { error: dbError } = await supabase
        .from('leads')
        .insert([{
          full_name: name,
          email: email,
          phone: phone,
          company_name: dbCompany,
          source: 'contact_form'
        }]);

      if (dbError) throw dbError;
      dbSaved = true;
    } catch (dbErr) {
      console.error('Database save failed:', dbErr);
    }

    // 1.5. SILENT ZOHO CRM WEBFORM INTEGRATION
    try {
      const nameParts = name.trim().split(/\s+/);
      const firstName = nameParts.length > 1 ? nameParts.slice(0, -1).join(' ') : '';
      const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : nameParts[0] || 'Unknown';

      // Map role to Zoho CRM Industry (Mandatory field)
      let crmIndustry = 'Other';
      if (role === 'installer') {
        crmIndustry = 'PPR Installtion Service Provider';
      } else if (role === 'dealer' || role === 'distributor') {
        crmIndustry = 'Other Brand Dealer/Distributor';
      }

      // Map product to Industry if applicable
      if (productInterest && productInterest.toLowerCase().includes('cooling')) {
        crmIndustry = 'Cooling Tower Manufacturer/Dealer';
      }

      const crmCompany = company && company.trim() ? company.trim() : 'Individual / Web Lead';
      const crmDescription = `Product of Interest: ${productInterest || 'Not Specified'}\n\nMessage:\n${message}`;

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
      crmFormData.append('Industry', crmIndustry);
      crmFormData.append('Description', crmDescription);

      if (LDTuvid) {
        crmFormData.append('LDTuvid', LDTuvid);
      }

      const crmRes = await fetch('https://crm.zoho.in/crm/WebToLeadForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: crmFormData.toString(),
      });

      if (!crmRes.ok) {
        console.error('Zoho CRM response error status:', crmRes.status);
      } else {
        console.log('Successfully pushed lead to Zoho CRM!');
      }
    } catch (crmErr) {
      console.error('Failed silently to push lead to Zoho CRM:', crmErr);
    }

    // 1.8. FORWARD TO PAPERCLIP AI AGENTS (OPTION 2)
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
            role,
            productInterest,
            message,
            LDTuvid,
            source: 'contact_form'
          }),
        });

        if (!paperclipRes.ok) {
          console.error('Paperclip AI response error status:', paperclipRes.status);
        } else {
          console.log('Successfully forwarded lead to Paperclip AI!');
        }
      } catch (paperclipErr) {
        console.error('Failed silently to forward lead to Paperclip AI:', paperclipErr);
      }
    }

    const roleLabel: Record<string, string> = {
      installer: 'PPR Pipe Installer',
      dealer: 'Dealer',
      distributor: 'Distributor',
      general: 'General Inquiry',
    };

    const htmlBody = `
      <div style="font-family: 'Open Sans', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1E2A3A, #2B3E50); padding: 32px; border-radius: 12px 12px 0 0;">
          <h1 style="color: #ffffff; font-size: 22px; font-weight: 800; margin: 0; letter-spacing: 0.04em;">NEW INQUIRY — TEC INDUSTRIES</h1>
          <p style="color: #3DAA7A; font-size: 13px; margin: 8px 0 0; letter-spacing: 0.08em;">via tecindustries.in</p>
        </div>
        <div style="background: #f8f9fa; padding: 32px; border: 1px solid #e0e3e8; border-top: none;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 12px 0; border-bottom: 1px solid #eee; font-size: 13px; font-weight: 700; color: #6B7B8D; width: 140px; text-transform: uppercase; letter-spacing: 0.06em;">Name</td><td style="padding: 12px 0; border-bottom: 1px solid #eee; font-size: 15px; color: #2B3E50; font-weight: 600;">${name}</td></tr>
            <tr><td style="padding: 12px 0; border-bottom: 1px solid #eee; font-size: 13px; font-weight: 700; color: #6B7B8D; text-transform: uppercase; letter-spacing: 0.06em;">Company</td><td style="padding: 12px 0; border-bottom: 1px solid #eee; font-size: 15px; color: #2B3E50;">${company || '—'}</td></tr>
            <tr><td style="padding: 12px 0; border-bottom: 1px solid #eee; font-size: 13px; font-weight: 700; color: #6B7B8D; text-transform: uppercase; letter-spacing: 0.06em;">Email</td><td style="padding: 12px 0; border-bottom: 1px solid #eee; font-size: 15px; color: #2D8B6E;"><a href="mailto:${email}" style="color: #2D8B6E;">${email}</a></td></tr>
            <tr><td style="padding: 12px 0; border-bottom: 1px solid #eee; font-size: 13px; font-weight: 700; color: #6B7B8D; text-transform: uppercase; letter-spacing: 0.06em;">Phone</td><td style="padding: 12px 0; border-bottom: 1px solid #eee; font-size: 15px; color: #2B3E50;"><a href="tel:${phone}" style="color: #2D8B6E;">${phone}</a></td></tr>
            <tr><td style="padding: 12px 0; border-bottom: 1px solid #eee; font-size: 13px; font-weight: 700; color: #6B7B8D; text-transform: uppercase; letter-spacing: 0.06em;">Role / Type</td><td style="padding: 12px 0; border-bottom: 1px solid #eee;"><span style="background: #E6F5F0; color: #2D8B6E; font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 999px; letter-spacing: 0.06em;">${roleLabel[role] || role}</span></td></tr>
            <tr><td style="padding: 12px 0; border-bottom: 1px solid #eee; font-size: 13px; font-weight: 700; color: #6B7B8D; text-transform: uppercase; letter-spacing: 0.06em;">Product</td><td style="padding: 12px 0; border-bottom: 1px solid #eee; font-size: 15px; color: #2B3E50;">${productInterest || '—'}</td></tr>
          </table>
          <div style="margin-top: 24px;">
            <p style="font-size: 13px; font-weight: 700; color: #6B7B8D; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 8px;">Message</p>
            <div style="background: #ffffff; border: 1px solid #e0e3e8; border-left: 4px solid #2D8B6E; padding: 16px 20px; border-radius: 4px; font-size: 15px; color: #2B3E50; line-height: 1.7;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
        </div>
        <div style="background: #1E2A3A; padding: 20px 32px; border-radius: 0 0 12px 12px; text-align: center;">
          <p style="color: rgba(255,255,255,0.4); font-size: 11px; margin: 0; letter-spacing: 0.04em;">TEC INDUSTRIES · Plot No. 700/1, 40 Shade Area, GIDC, Vapi, Gujarat 396195 (IN) · GSTIN: 24ACBFM4650R1ZU</p>
        </div>
      </div>
    `;

    // 2. ATTEMPT TO SEND EMAIL (TOLERATE FAILURES IF SMTP NOT FULLY CONFIGURED)
    let emailSent = false;
    try {
      if (process.env.ZOHO_SMTP_USER && process.env.ZOHO_SMTP_PASS) {
        await transporter.sendMail({
          from: `"TEC INDUSTRIES Website" <${process.env.ZOHO_SMTP_USER}>`,
          to: process.env.ZOHO_SMTP_USER || 'info@tecindustries.in',
          replyTo: email,
          subject: `[New Inquiry] ${roleLabel[role] || 'Inquiry'} — ${name} (${productInterest || 'General'})`,
          html: htmlBody,
        });

        // Auto-reply to sender
        await transporter.sendMail({
          from: `"TEC INDUSTRIES" <${process.env.ZOHO_SMTP_USER}>`,
          to: email,
          subject: 'Thank you for contacting TEC INDUSTRIES — We\'ll be in touch shortly',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: linear-gradient(135deg, #1E2A3A, #2B3E50); padding: 32px; border-radius: 12px 12px 0 0;">
                <h1 style="color: #ffffff; font-size: 20px; font-weight: 800; margin: 0;">Thank You, ${name}!</h1>
              </div>
              <div style="background: #f8f9fa; padding: 32px; border: 1px solid #e0e3e8; border-top: none;">
                <p style="color: #2B3E50; font-size: 15px; line-height: 1.8;">We have received your inquiry and our team will get back to you within <strong>1 business day</strong>.</p>
                <p style="color: #2B3E50; font-size: 15px; line-height: 1.8;">For urgent queries, please WhatsApp us at <a href="https://wa.me/919426031064" style="color: #2D8B6E;">+91 94260 31064</a>.</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
                <p style="color: #6B7B8D; font-size: 13px; margin: 0;"><em>"Your Partner in Industrial Progress"</em></p>
                <p style="color: #6B7B8D; font-size: 13px; margin: 8px 0 0;">TEC INDUSTRIES &copy; Plot No. 700/1, 40 Shade Area, GIDC, Vapi, Gujarat 396195 (IN) &bull; +91 94260 31064</p>
              </div>
            </div>
          `,
        });
        emailSent = true;
      } else {
        console.warn('SMTP Credentials missing, skipped sending emails. Lead was successfully saved to Supabase.');
      }
    } catch (emailErr) {
      console.error('Nodemailer failed but database save succeeded:', emailErr);
    }

    // Always return success if EITHER database or SMTP succeeded!
    if (dbSaved || emailSent) {
      return NextResponse.json({ success: true, saved: dbSaved, emailed: emailSent });
    } else {
      // If absolutely everything failed, throw error
      throw new Error('Both Database save and SMTP email send failed.');
    }
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Failed to process request. Please try WhatsApp.' }, { status: 500 });
  }
}
