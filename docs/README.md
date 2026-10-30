# Sor Connect Website Documentation & Handover Manual

Welcome to the official technical documentation and client handover manual for the **Sor Connect** corporate web platform ([https://www.sorconnect.in](https://www.sorconnect.in)).

This documentation suite serves as the **single source of truth** for business owners, software engineers, devops administrators, design systems engineers, technical auditors, and SEO specialists responsible for maintaining, operating, and extending this platform.

---

## 🧭 Documentation Navigation Matrix

| # | Document | Audience | Key Coverage |
|---|---|---|---|
| **01** | [Project Overview](01-project-overview.md) | All Stakeholders | Business context, core value proposition, key metrics, and technology choices. |
| **02** | [System Architecture](02-system-architecture.md) | Architects & Developers | Dual-tier storage (Supabase Cloud + Local JSON), data flow, and runtime mechanics. |
| **03** | [Project Structure](03-project-structure.md) | Developers | Complete directory and file tree, file responsibilities, dependencies, and build pipelines. |
| **04** | [Design System](04-design-system.md) | Designers & Frontend Devs | Verified design tokens, color palette, typography scale, spacing, and reusable UI components. |
| **05** | [Pages & Routes](05-pages-and-routes.md) | Developers & Content Leads | Exhaustive breakdown of public routes, DOM nodes, interactive widgets, and dynamic hooks. |
| **06** | [CMS & Admin Operations Manual](06-cms-admin-guide.md) | Content Administrators | Step-by-step guide for non-technical admins to manage projects, leads, careers, and media. |
| **07** | [Database Architecture & Schema](07-database-schema.md) | Backend & Database Admins | Supabase PostgreSQL tables, schemas, indexes, Row-Level Security (RLS), and Storage buckets. |
| **08** | [API & Third-Party Integrations](08-api-integrations.md) | Backend Developers | Node.js REST endpoints, Supabase REST queries, WhatsApp Business click-to-chat, and Vercel Analytics. |
| **09** | [Security Architecture](09-security.md) | Security Auditors & Devs | Authentication model, session handling, upload validation, CORS, RLS policies, and sanitization. |
| **10** | [Hosting, Deployment & Infrastructure](10-hosting-deployment.md) | DevOps & SysAdmins | Vercel Edge configuration, standalone Node.js daemon setup, domain/DNS, and rollback protocols. |
| **11** | [SEO Implementation & Guidelines](11-seo.md) | SEO & Marketing Specialists | Canonical hierarchy, metadata, 5 JSON-LD schema graphs, sitemaps, robots.txt, and ranking guidelines. |
| **12** | [Performance & Optimization](12-performance.md) | Performance Engineers | Asset loading pipeline, zero-lag tab preloading, CSS containment, script deferral, and CWV profile. |
| **13** | [Maintenance & Operations](13-maintenance.md) | System Administrators | Routine maintenance schedules, backup execution, storage cleanup, and dependency hygiene. |
| **14** | [Developer Onboarding & Setup](14-developer-onboarding.md) | New Developers | Local development environment setup, compile scripts, debugging, testing, and contribution rules. |
| **15** | [Technical Audit & Technical Debt](15-technical-audit.md) | Engineering Leads | Comprehensive code audit, identified risks, architecture limitations, and prioritized remediation backlog. |
| **16** | [Client Owner Manual](16-client-handover.md) | Website Owner / Executives | Plain-English non-technical manual for executive owners to manage day-to-day website duties safely. |
| **17** | [Troubleshooting & Diagnostics](17-troubleshooting.md) | Support Engineers | Diagnostic trees for common operational issues (upload errors, 404s, Supabase sync failures). |
| **18** | [Ownership Transfer & Handover Protocol](18-ownership-checklist.md) | Legal & Client Owners | Formal transfer checklist for domain, hosting, Supabase project, code repositories, and credentials. |

---

## 🎯 Quick Links by Role

- **Executive Owner / Client:** Start with [Client Owner Manual (16)](16-client-handover.md) and [Ownership Transfer Checklist (18)](18-ownership-checklist.md).
- **Daily Content Administrator:** Read [CMS & Admin Operations Manual (06)](06-cms-admin-guide.md).
- **New Full-Stack Developer:** Begin with [Project Overview (01)](01-project-overview.md), [Project Structure (03)](03-project-structure.md), and [Developer Onboarding (14)](14-developer-onboarding.md).
- **DevOps / SysAdmin:** Refer to [Hosting & Deployment (10)](10-hosting-deployment.md) and [Troubleshooting (17)](17-troubleshooting.md).
- **SEO & Growth Team:** Consult [SEO Implementation (11)](11-seo.md).

---

## 📄 Master Project Manual
A complete, unified compilation containing executive summaries, architecture diagrams, and consolidated runbooks is provided at:
👉 **[MASTER_PROJECT_MANUAL.md](../MASTER_PROJECT_MANUAL.md)**
