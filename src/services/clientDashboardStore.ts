import { ClientProject, Deliverable, ClientInvoice } from '../types';

const CLIENT_PROJECTS_KEY = 'wka_client_projects_v1';

export function getDefaultClientProjects(userId: string, userEmail: string = 'client@example.com'): ClientProject[] {
  return [
    {
      id: 'proj-001',
      userId: userId || 'guest',
      title: 'Full-Stack Custom SaaS Web Application (React 19 & Supabase)',
      category: 'Full Stack Engineering',
      status: 'Deliverables Ready',
      progressPercentage: 90,
      leadEngineer: 'Waleed Khan Afridi',
      techStack: ['React 19', 'Next.js 15', 'TypeScript', 'Tailwind CSS', 'Supabase Auth & RLS', 'Node.js'],
      startDate: '2026-07-10',
      estimatedCompletion: '2026-07-30',
      totalBudget: 1250,
      paidAmount: 1250,
      repositoryUrl: 'https://github.com/waleedkhanafridi/saas-web-app-production',
      previewUrl: 'https://waleedkhanafridi.online/',
      milestones: [
        {
          id: 'm1',
          title: 'Requirements, Architecture & UI Mockups',
          status: 'Completed',
          completedDate: '2026-07-12',
          description: 'Full UX wireframing, component tokens, database schema design, and API route planning.'
        },
        {
          id: 'm2',
          title: 'Frontend Component Architecture & Styling',
          status: 'Completed',
          completedDate: '2026-07-18',
          description: 'Built responsive UI in React 19, dark/light theme tokens, Lucide icons, and Tailwind CSS.'
        },
        {
          id: 'm3',
          title: 'Supabase Backend, Auth & Database RLS',
          status: 'Completed',
          completedDate: '2026-07-24',
          description: 'Configured PostgreSQL database tables, secure user authentication, and Row Level Security policies.'
        },
        {
          id: 'm4',
          title: 'Final Testing, Deliverables & Cloud Deployment',
          status: 'In Progress',
          description: 'Lighthouse audit, performance optimization, domain setup, and source code package delivery.'
        }
      ],
      deliverables: [
        {
          id: 'del-101',
          projectId: 'proj-001',
          title: 'Production Source Code & Deployment Package',
          fileName: 'FullStack_SaaS_SourceCode_v1.2.zip',
          fileSize: '14.8 MB',
          fileType: 'zip',
          version: 'v1.2.0',
          uploadedAt: '2026-07-26',
          downloadsCount: 3,
          securityHash: 'sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
          contentSnippet: `# Production Build Package - Full Stack SaaS Application
Lead Engineer: Waleed Khan Afridi (https://waleedkhanafridi.online)
Client Email: ${userEmail}

## Package Contents:
1. /src - Complete React 19 + TypeScript source code
2. /supabase - PostgreSQL schema migration files & RLS policies
3. README.md - Step-by-step installation & deployment guide
4. .env.example - Production environment variable configuration

Thank you for choosing Waleed Khan Afridi Digital Web Services!
`
        },
        {
          id: 'del-102',
          projectId: 'proj-001',
          title: 'Figma UI/UX Component Kit & Design System',
          fileName: 'Figma_UI_Design_System_v1.fig',
          fileSize: '8.2 MB',
          fileType: 'fig',
          version: 'v1.0.0',
          uploadedAt: '2026-07-15',
          downloadsCount: 5,
          securityHash: 'sha256:8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4',
          contentSnippet: `Figma Design Tokens & UI Kit Documentation
Includes Color Palettes, Typography System, Dark Mode Tokens, and 40+ Interactive UI Components.`
        },
        {
          id: 'del-103',
          projectId: 'proj-001',
          title: 'Supabase Database Schema & Credentials Access Guide',
          fileName: 'Supabase_Database_Credentials_Guide.pdf',
          fileSize: '1.4 MB',
          fileType: 'pdf',
          version: 'v1.0.0',
          uploadedAt: '2026-07-25',
          downloadsCount: 2,
          securityHash: 'sha256:a211327170e88384f509eb33e4b486241b18d893f40d39e38e6820ef63e3d231',
          contentSnippet: `Database Credentials & API Integration Guide
PostgreSQL Connection String, Anon Key, Service Role Key, and Row Level Security Setup.`
        }
      ],
      invoices: [
        {
          id: 'inv-2001',
          invoiceNumber: 'INV-2026-8091',
          projectId: 'proj-001',
          projectTitle: 'Full-Stack Custom SaaS Web Application',
          issueDate: '2026-07-10',
          dueDate: '2026-07-20',
          amount: 1250,
          status: 'PAID',
          paymentMethod: 'Binance Pay USDT (TRC20)',
          items: [
            { description: 'Milestone 1 & 2: Wireframing, React 19 Frontend & Design System', quantity: 1, unitPrice: 625, total: 625 },
            { description: 'Milestone 3 & 4: Supabase Backend Integration, RLS & Production Launch', quantity: 1, unitPrice: 625, total: 625 }
          ],
          notes: 'Paid in full via Binance Pay USDT. Transaction Verified on Blockchain.'
        }
      ]
    },
    {
      id: 'proj-002',
      userId: userId || 'guest',
      title: 'E-Commerce SEO Optimization & Core Web Vitals Overhaul',
      category: 'Technical SEO',
      status: 'In Progress',
      progressPercentage: 65,
      leadEngineer: 'Waleed Khan Afridi',
      techStack: ['Google Search Console', 'Technical SEO', 'Schema.org JSON-LD', 'PageSpeed Insights', 'Next.js SSG'],
      startDate: '2026-07-18',
      estimatedCompletion: '2026-08-05',
      totalBudget: 450,
      paidAmount: 225,
      milestones: [
        {
          id: 'm201',
          title: 'Comprehensive Technical SEO Audit & Crawl Analysis',
          status: 'Completed',
          completedDate: '2026-07-21',
          description: 'Identified 404 crawl errors, canonical tag mismatches, and page speed bottlenecks.'
        },
        {
          id: 'm202',
          title: 'Structured Data JSON-LD & Rich Snippet Injection',
          status: 'Completed',
          completedDate: '2026-07-25',
          description: 'Implemented Google-compliant Organization, Product, FAQ, and BreadcrumbList schemas.'
        },
        {
          id: 'm203',
          title: 'Core Web Vitals Optimization (LCP, CLS, INP)',
          status: 'In Progress',
          description: 'Optimizing image compression, font preconnects, and JavaScript bundle sizes.'
        },
        {
          id: 'm204',
          title: 'Google Indexation Verification & Monthly SEO Growth Report',
          status: 'Pending',
          description: 'Submitting sitemaps to Google Search Console and measuring ranking improvements.'
        }
      ],
      deliverables: [
        {
          id: 'del-201',
          projectId: 'proj-002',
          title: 'Technical SEO Audit & Schema Blueprint Report',
          fileName: 'Technical_SEO_Audit_Report.pdf',
          fileSize: '3.6 MB',
          fileType: 'pdf',
          version: 'v1.0.0',
          uploadedAt: '2026-07-22',
          downloadsCount: 4,
          securityHash: 'sha256:d41d8cd98f00b204e9800998ecf8427e',
          contentSnippet: `Technical SEO Audit & Rich Snippet Optimization Report
Author: Waleed Khan Afridi
Analysis of site speed, Schema.org JSON-LD structured data, mobile usability, and Google ranking metrics.`
        }
      ],
      invoices: [
        {
          id: 'inv-2002',
          invoiceNumber: 'INV-2026-8104',
          projectId: 'proj-002',
          projectTitle: 'E-Commerce SEO Optimization & Core Web Vitals Overhaul',
          issueDate: '2026-07-18',
          dueDate: '2026-07-28',
          amount: 450,
          status: 'PAID',
          paymentMethod: 'Payoneer Direct Transfer',
          items: [
            { description: 'Deposit (50%): Technical SEO Audit & Schema Injection', quantity: 1, unitPrice: 225, total: 225 },
            { description: 'Final Balance (50%): Core Web Vitals & Search Console Indexation', quantity: 1, unitPrice: 225, total: 225 }
          ],
          notes: '50% initial milestone payment received via Payoneer. Balance due upon project completion.'
        }
      ]
    }
  ];
}

export function loadClientProjects(userId: string, userEmail: string = 'client@example.com'): ClientProject[] {
  if (typeof window === 'undefined') return getDefaultClientProjects(userId, userEmail);

  try {
    const raw = localStorage.getItem(CLIENT_PROJECTS_KEY);
    if (!raw) {
      const defaults = getDefaultClientProjects(userId, userEmail);
      localStorage.setItem(CLIENT_PROJECTS_KEY, JSON.stringify(defaults));
      return defaults;
    }
    const projects: ClientProject[] = JSON.parse(raw);
    return projects.length > 0 ? projects : getDefaultClientProjects(userId, userEmail);
  } catch (err) {
    console.error('Error loading client projects:', err);
    return getDefaultClientProjects(userId, userEmail);
  }
}

export function saveClientProjects(projects: ClientProject[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CLIENT_PROJECTS_KEY, JSON.stringify(projects));
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
