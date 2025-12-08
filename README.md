
# BPM/Workflow SaaS – .NET + React (Azure, MSSQL)

**Cel:** Platforma SaaS do projektowania i wykonywania procesów biznesowych (workflow) dla firm.  
Umożliwia tworzenie i publikację definicji procesów, obsługę zadań/akceptacji, SLA i eskalacje, powiadomienia, integracje (webhook/API) oraz raportowanie. Wspiera **multi‑tenant** (oddzielni klienci w jednym wdrożeniu), audyt i zgodność z RODO.

---

## Najważniejsze funkcje
- **Designer workflow** (drag & drop) + wersjonowanie definicji
- **Form builder** (dynamiczne formularze, walidacje)
- **Zadania i akceptacje** (SLA, eskalacje, komentarze, załączniki)
- **Powiadomienia** (e‑mail, in‑app, WebPush) i **real‑time** (SignalR)
- **Integracje** (webhooki, REST API; rozszerzalne konektory)
- **Raporty i dashboardy** (KPI, eksport CSV/XLSX/PDF)
- **Multi‑tenant**: separacja danych, RBAC, audyt, RODO

---

## Stack technologiczny

**Frontend**
- React + TypeScript (Vite), Material UI / Ant Design, Tailwind
- React Query (cache), React Router, React Hook Form + Zod (walidacje)
- Chart.js/Recharts (raporty), SignalR client (real‑time), i18n

**Backend**
- ASP.NET Core 8 (C#), Minimal APIs / Controllers
- DDD + CQRS: MediatR, FluentValidation, AutoMapper
- EF Core + **SQL Server (Azure SQL)** – migracje
- SignalR (powiadomienia), Hangfire/Quartz (zadania cykliczne/SLA)
- Serilog + OpenTelemetry (logi/metryki), Health Checks
- Silnik workflow: maszyna stanów (np. Stateless) + interpreter definicji
- Autoryzacja: **OIDC/JWT** (Azure AD / Azure AD B2C), policy‑based RBAC
- Cache: Redis (opcjonalnie), wyszukiwanie: Elasticsearch (opcjonalnie)

**Chmura Azure / DevOps**
- **Azure Kubernetes Service (AKS)** lub **Azure App Service** (API + Frontend)
- **Azure SQL** (MSSQL), **Azure Storage (Blob)** (załączniki)
- **Azure Key Vault** (sekrety), **Azure Monitor** (telemetria)
- **Azure AD / Azure AD B2C** (SSO / klienci zewnętrzni)
- **GitHub Actions** (CI/CD), Docker, Helm (deploy na AKS)
- CDN dla assetów UI (Azure Front Door/Static Web Apps – wariant)

---

## Architektura – skrót
- **Multi‑tenant**: `TenantId` (discriminator) + RBAC; opcjonalnie schema‑per‑tenant
- **API REST** + webhooki; read‑models pod raporty
- **Event‑driven** integracje (MassTransit + Azure Service Bus/RabbitMQ – opcjonalnie)
- **Audit trail** i wersjonowanie definicji workflow
