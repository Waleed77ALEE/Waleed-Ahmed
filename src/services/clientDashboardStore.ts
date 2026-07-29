import { ClientProject, Deliverable, ClientInvoice } from '../types';

const CLIENT_PROJECTS_KEY = 'wka_client_projects_v1';

export function getDefaultClientProjects(userId: string, userEmail: string = 'client@example.com'): ClientProject[] {
  return [];
}

export function loadClientProjects(userId: string, userEmail: string = 'client@example.com'): ClientProject[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = localStorage.getItem(`${CLIENT_PROJECTS_KEY}_${userId || 'guest'}`);
    if (!raw) {
      return [];
    }
    const projects: ClientProject[] = JSON.parse(raw);
    return Array.isArray(projects) ? projects : [];
  } catch (err) {
    console.error('Error loading client projects:', err);
    return [];
  }
}

export function saveClientProjects(projects: ClientProject[], userId: string = 'guest') {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`${CLIENT_PROJECTS_KEY}_${userId}`, JSON.stringify(projects));
  } catch (err) {
    console.error('Error saving client projects:', err);
  }
}

export function triggerFileDownload(deliverable: Deliverable) {
  const content = deliverable.contentSnippet || `Waleed Khan Afridi Digital Web Services
Deliverable Title: ${deliverable.title}
File Name: ${deliverable.fileName}
Version: ${deliverable.version}
Security Hash: ${deliverable.securityHash}
Uploaded: ${deliverable.uploadedAt}

This deliverable is verified and protected under client copyright agreement.
Visit: https://waleedkhanafridi.online/
Contact: +92 341 6860077 | waleedkhanafridi7@gmail.com
`;

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = deliverable.fileName || 'deliverable.txt';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function printInvoice(invoice: ClientInvoice, userEmail: string = 'client@example.com') {
  const printWindow = window.open('', '_blank', 'width=800,height=900');
  if (!printWindow) {
    alert('Please allow popups to view and print the invoice.');
    return;
  }

  const itemsHtml = invoice.items
    .map(
      (item) => `
    <tr style="border-bottom: 1px solid #334155;">
      <td style="padding: 10px; text-align: left; color: #f8fafc;">${item.description}</td>
      <td style="padding: 10px; text-align: center; color: #cbd5e1;">${item.quantity}</td>
      <td style="padding: 10px; text-align: right; color: #cbd5e1;">$${item.unitPrice.toFixed(2)}</td>
      <td style="padding: 10px; text-align: right; color: #38bdf8; font-weight: bold;">$${item.total.toFixed(2)}</td>
    </tr>
  `
    )
    .join('');

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Invoice #${invoice.invoiceNumber} - Waleed Khan Afridi</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #020617; color: #e2e8f0; padding: 40px; margin: 0; }
          .invoice-box { max-width: 800px; margin: auto; padding: 30px; border: 1px solid #1e293b; border-radius: 16px; background: #0f172a; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5); }
          .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #0284c7; padding-bottom: 20px; margin-bottom: 20px; }
          .brand { color: #38bdf8; font-size: 24px; font-weight: 900; letter-spacing: -0.5px; }
          .status-badge { display: inline-block; padding: 6px 16px; border-radius: 20px; font-weight: 800; font-size: 12px; text-transform: uppercase; background: ${
            invoice.status === 'PAID' ? '#064e3b' : '#78350f'
          }; color: ${invoice.status === 'PAID' ? '#34d399' : '#fbbf24'}; border: 1px solid ${invoice.status === 'PAID' ? '#10b981' : '#f59e0b'}; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th { background: #1e293b; color: #94a3b8; padding: 10px; text-align: left; font-size: 12px; text-transform: uppercase; }
          .total-row { text-align: right; padding-top: 20px; font-size: 18px; font-weight: 900; color: #38bdf8; }
          .footer { margin-top: 40px; font-size: 11px; color: #64748b; text-align: center; border-top: 1px solid #1e293b; padding-top: 20px; }
          @media print {
            body { background: #fff; color: #000; }
            .invoice-box { border: none; background: #fff; color: #000; }
            th { background: #f1f5f9; color: #334155; }
            .brand { color: #0284c7; }
          }
        </style>
      </head>
      <body>
        <div class="invoice-box">
          <div class="header">
            <div>
              <div class="brand">Waleed Khan Afridi</div>
              <div style="font-size: 12px; color: #94a3b8; margin-top: 4px;">Senior Full Stack Developer & Digital Services</div>
              <div style="font-size: 11px; color: #64748b;">www.waleedkhanafridi.online | +92 341 6860077</div>
            </div>
            <div style="text-align: right;">
              <h2 style="margin: 0; color: #fff;">INVOICE</h2>
              <div style="font-size: 13px; color: #0284c7; font-family: monospace; font-weight: bold; margin-top: 4px;">${invoice.invoiceNumber}</div>
              <div style="margin-top: 8px;"><span class="status-badge">${invoice.status}</span></div>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; margin-bottom: 20px; font-size: 12px;">
            <div>
              <strong style="color: #94a3b8;">BILLED TO:</strong><br/>
              <span style="color: #fff; font-weight: bold;">${userEmail}</span><br/>
              <span>Client ID: ${invoice.projectId || 'DIRECT-CLIENT'}</span>
            </div>
            <div style="text-align: right;">
              <strong style="color: #94a3b8;">INVOICE DETAILS:</strong><br/>
              <span>Issue Date: ${invoice.issueDate}</span><br/>
              <span>Due Date: ${invoice.dueDate}</span><br/>
              <span>Payment Method: ${invoice.paymentMethod}</span>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th style="text-align: center;">Qty</th>
                <th style="text-align: right;">Unit Price</th>
                <th style="text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <div class="total-row">
            Total Amount: $${invoice.amount.toFixed(2)} USD
          </div>

          ${
            invoice.notes
              ? `<div style="margin-top: 20px; padding: 12px; background: #1e293b; border-radius: 8px; font-size: 11px; color: #cbd5e1;">
            <strong>Notes / Payment Proof:</strong> ${invoice.notes}
          </div>`
              : ''
          }

          <div class="footer">
            Thank you for working with Waleed Khan Afridi! This invoice is digitally verified.<br/>
            For questions or assistance, contact WhatsApp: +92 341 6860077 or email waleedkhanafridi7@gmail.com
          </div>
        </div>
        <script>
          window.onload = function() { window.print(); };
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
}
