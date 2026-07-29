// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL") || "waleedkhanafridi7@gmail.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OrderPayload {
  id?: string;
  order_number?: string;
  customerName?: string;
  customerEmail?: string;
  contact_whatsapp?: string;
  items?: Array<{
    service_id?: string;
    title: string;
    price: number;
    quantity: number;
    delivery?: string;
  }>;
  totalAmount?: number;
  total_amount?: number;
  paymentMethod?: string;
  payment_method?: string;
  txId?: string;
  binance_tx_id?: string;
  createdAt?: string;
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const rawBody = await req.json();
    
    // Support both direct API call and Supabase Database Webhook payloads (req.body.record)
    const payload: OrderPayload = rawBody.record ? rawBody.record : rawBody;

    const orderNumber = payload.order_number || payload.id || `ORD-${Date.now()}`;
    const customerName = payload.customerName || "Valued Customer";
    const customerEmail = payload.customerEmail || "N/A";
    const whatsapp = payload.contact_whatsapp || "N/A";
    const total = payload.totalAmount || payload.total_amount || 0;
    const payment = payload.paymentMethod || payload.payment_method || "WhatsApp / Online";
    const tx = payload.txId || payload.binance_tx_id || "N/A";
    const items = payload.items || [];

    const cleanWhatsapp = whatsapp.replace(/[^0-9]/g, "");
    const waLink = cleanWhatsapp ? `https://wa.me/${cleanWhatsapp}` : `https://wa.me/923416860077`;

    // Construct Clean HTML Email Template
    const itemsHtml = items.map((item) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #1e293b; color: #f8fafc; font-size: 13px;">${item.title}</td>
        <td style="padding: 10px; border-bottom: 1px solid #1e293b; color: #94a3b8; font-size: 13px; text-align: center;">x${item.quantity || 1}</td>
        <td style="padding: 10px; border-bottom: 1px solid #1e293b; color: #10b981; font-weight: bold; font-size: 13px; text-align: right;">$${(item.price || 0).toFixed(2)} USD</td>
      </tr>
    `).join("");

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Order Alert #${orderNumber}</title>
      </head>
      <body style="margin:0; padding:0; background-color:#020617; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
        <div style="max-width: 600px; margin: 20px auto; background-color: #0f172a; border: 1px solid #1e293b; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #059669 0%, #0d9488 100%); padding: 24px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">
              🚀 New Order Received!
            </h1>
            <p style="color: #a7f3d0; margin: 6px 0 0 0; font-size: 13px; font-weight: 600;">
              Order Ref: <span style="font-family: monospace;">${orderNumber}</span>
            </p>
          </div>

          <!-- Body -->
          <div style="padding: 24px;">
            <div style="background-color: #020617; border: 1px solid #1e293b; border-radius: 12px; padding: 16px; margin-bottom: 20px;">
              <h3 style="color: #38bdf8; margin: 0 0 12px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
                👤 Customer Details
              </h3>
              <p style="margin: 4px 0; color: #e2e8f0; font-size: 13px;"><strong>Name:</strong> ${customerName}</p>
              <p style="margin: 4px 0; color: #e2e8f0; font-size: 13px;"><strong>Email:</strong> ${customerEmail}</p>
              <p style="margin: 4px 0; color: #e2e8f0; font-size: 13px;"><strong>WhatsApp:</strong> ${whatsapp}</p>
              <p style="margin: 4px 0; color: #e2e8f0; font-size: 13px;"><strong>Payment Method:</strong> ${payment}</p>
              <p style="margin: 4px 0; color: #e2e8f0; font-size: 13px;"><strong>Transaction Ref/ID:</strong> ${tx}</p>
            </div>

            <!-- Items Table -->
            <h3 style="color: #38bdf8; margin: 0 0 12px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
              🛒 Order Items Summary
            </h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <thead>
                <tr style="background-color: #020617;">
                  <th style="padding: 10px; text-align: left; color: #64748b; font-size: 11px; text-transform: uppercase;">Item</th>
                  <th style="padding: 10px; text-align: center; color: #64748b; font-size: 11px; text-transform: uppercase;">Qty</th>
                  <th style="padding: 10px; text-align: right; color: #64748b; font-size: 11px; text-transform: uppercase;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>

            <!-- Total Amount Card -->
            <div style="background-color: #020617; border: 1px solid #10b981; border-radius: 12px; padding: 16px; text-align: right; margin-bottom: 24px;">
              <span style="color: #94a3b8; font-size: 12px; font-weight: 600;">Grand Total Amount:</span>
              <div style="color: #10b981; font-size: 24px; font-weight: 900; font-family: monospace;">
                $${total.toFixed(2)} USD
              </div>
            </div>

            <!-- WhatsApp Action Button -->
            <div style="text-align: center;">
              <a href="${waLink}" target="_blank" style="display: inline-block; background-color: #10b981; color: #020617; font-weight: 800; font-size: 14px; text-decoration: none; padding: 14px 28px; border-radius: 12px; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);">
                💬 Contact Customer on WhatsApp
              </a>
            </div>
          </div>

          <!-- Footer -->
          <div style="background-color: #020617; border-top: 1px solid #1e293b; padding: 16px; text-align: center; color: #64748b; font-size: 11px;">
            Waleed Khan Afridi • Digital Marketplace Automated Supabase Edge Function Notification
          </div>
        </div>
      </body>
      </html>
    `;

    // Dispatch via Resend API if API Key exists, or fallback response
    if (RESEND_API_KEY) {
      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "Order Notifications <onboarding@resend.dev>",
          to: [ADMIN_EMAIL],
          subject: `⚡ New Marketplace Order #${orderNumber} ($${total.toFixed(2)})`,
          html: emailHtml,
        }),
      });

      const resendData = await resendRes.json();
      return new Response(JSON.stringify({ success: true, message: "Email notification dispatched via Resend", resendData }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Default response when RESEND_API_KEY is pending user secret configuration
    return new Response(
      JSON.stringify({
        success: true,
        message: "Order notification processed successfully by Edge Function.",
        adminEmail: ADMIN_EMAIL,
        orderRef: orderNumber,
        note: "To trigger real SMTP/Resend emails, set RESEND_API_KEY environment variable in Supabase Secrets.",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: any) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
