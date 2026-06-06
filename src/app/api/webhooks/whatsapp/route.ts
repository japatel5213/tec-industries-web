import { NextRequest, NextResponse } from 'next/server';

/**
 * WhatsApp Business API — Incoming Webhook Receiver
 *
 * GET  → Meta verification challenge (required to register webhook)
 * POST → Incoming messages, status updates, delivery receipts
 */

// ─── GET: Meta Webhook Verification ────────────────────────────────────────
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const mode      = searchParams.get('hub.mode');
  const token     = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  const VERIFY_TOKEN = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN || 'tec-whatsapp-2026';

  console.log('[WhatsApp Webhook] Verification request received:', { mode, token });

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('[WhatsApp Webhook] ✅ Verified successfully!');
    // Must return the challenge as plain text (not JSON)
    return new NextResponse(challenge, { status: 200 });
  }

  console.warn('[WhatsApp Webhook] ❌ Verification failed — token mismatch');
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

// ─── POST: Incoming Message & Status Handler ────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log('[WhatsApp Webhook] Incoming payload:', JSON.stringify(body, null, 2));

    const entry = body?.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;

    if (!value) {
      return NextResponse.json({ received: true });
    }

    // ── 1. Handle Incoming Customer Messages ──────────────────────────────
    const messages = value.messages;
    if (messages && messages.length > 0) {
      for (const msg of messages) {
        const from    = msg.from;    // Customer's WhatsApp number
        const msgId   = msg.id;
        const msgType = msg.type;    // 'text', 'image', 'audio', etc.
        const msgText = msg.text?.body || '';

        console.log(`[WhatsApp Webhook] 📩 New message from ${from}: "${msgText}" (type: ${msgType})`);

        // Auto-reply logic: Send acknowledgement to customer
        if (msgType === 'text' && from) {
          await sendAutoReply(from, msgText);
        }

        // TODO: Save to Supabase / forward to CRM pipeline
        // await saveIncomingMessage({ from, msgId, msgType, msgText });
      }
    }

    // ── 2. Handle Message Status Updates ─────────────────────────────────
    const statuses = value.statuses;
    if (statuses && statuses.length > 0) {
      for (const status of statuses) {
        const recipientId = status.recipient_id;
        const msgStatus   = status.status; // 'sent', 'delivered', 'read', 'failed'
        console.log(`[WhatsApp Webhook] 📊 Message to ${recipientId} → ${msgStatus.toUpperCase()}`);
      }
    }

    // Always return 200 quickly — Meta will retry if you return error
    return NextResponse.json({ received: true }, { status: 200 });

  } catch (err) {
    console.error('[WhatsApp Webhook] POST error:', err);
    // Still return 200 so Meta doesn't disable the webhook
    return NextResponse.json({ received: true }, { status: 200 });
  }
}

// ─── Helper: Send Auto-Reply ────────────────────────────────────────────────
async function sendAutoReply(to: string, incomingText: string) {
  const WA_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
  const PHONE_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!WA_TOKEN || !PHONE_ID) {
    console.warn('[WhatsApp Auto-Reply] Missing credentials, skipping auto-reply');
    return;
  }

  // Simple keyword-based routing
  const text = incomingText.toLowerCase();
  let replyText = '';

  if (text.includes('price') || text.includes('rate') || text.includes('quote') || text.includes('cost')) {
    replyText = `Hello! 👋 Thank you for contacting *TEC Industries*.\n\nFor pricing and quotations on our HDPE pipes, valves, and industrial fittings, please share:\n1️⃣ Product name / specification\n2️⃣ Quantity required\n3️⃣ Delivery location\n\nOur team will respond within 2 business hours. 🏭`;
  } else if (text.includes('catalog') || text.includes('brochure') || text.includes('product')) {
    replyText = `Hello! 👋 Thank you for your interest in *TEC Industries* products.\n\nYou can view our complete catalog at:\n🔗 https://www.tecindustries.in/products\n\nFor specific product queries, reply with the product name and we'll assist you! ✅`;
  } else if (text.includes('dealer') || text.includes('distributor') || text.includes('reseller')) {
    replyText = `Hello! 👋 Thank you for your interest in the *TEC Industries Dealer Program*.\n\nWe offer:\n✅ Competitive margins\n✅ Marketing support\n✅ Technical training\n\nPlease share your company name and location and our partnerships team will connect with you shortly! 🤝`;
  } else {
    replyText = `Hello! 👋 Thank you for contacting *TEC Industries* — India's trusted HDPE pipe and industrial solutions provider.\n\nWe'll connect you with our team shortly. For faster assistance:\n📞 Call: +91-94260-31064\n🌐 Website: www.tecindustries.in\n\nBusiness hours: Mon–Sat, 9 AM–7 PM IST ⏰`;
  }

  if (!replyText) return;

  try {
    await fetch(`https://graph.facebook.com/v18.0/${PHONE_ID}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WA_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to,
        type: 'text',
        text: { body: replyText },
      }),
    });
    console.log(`[WhatsApp Auto-Reply] ✅ Reply sent to ${to}`);
  } catch (err) {
    console.error('[WhatsApp Auto-Reply] Failed:', err);
  }
}
