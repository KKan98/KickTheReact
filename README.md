Platforma do projektowania i wykonywania procesów biznesowych (workflow), z:

Edytorem procesów (drag&drop),
formularzami (dynamiczne form builder),
zadaniami/akceptacjami, SLA, eskalacjami,
powiadomieniami (e‑mail/Push),
integracjami (ERP/CRM/API),
raportami i audytem,
trybem SaaS (multi‑tenant) lub on‑premise.
Architektura logiczna (warstwy)
Frontend (React + TypeScript)

UI: Material UI / Ant Design + Tailwind
State: React Query (API caching) + minimal Redux Toolkit (np. dla globalnej sesji)
Routing: React Router
Formularze: React Hook Form + Zod (walidacja)
Wykresy: Chart.js/Recharts
Real‑time: SignalR client
i18n: react‑i18next (PL/EN), wsparcie RWD
Build: Vite (lub Next.js, jeśli potrzebny SSR)

Backend (.NET 8 / ASP.NET Core) — styl DDD

Warstwy:

Api (Minimal APIs/Controllers + DTO)
Application (CQRS + MediatR, walidacja FluentValidation)
Domain (encje, agregaty, zdarzenia domenowe)
Infrastructure (EF Core, repozytoria, integracje, messaging)


Autoryzacja: Policy‑based + Role/Scope + Claimy (JWT/OIDC)
Workflow:

wariant A: silnik wbudowany (np. oparcie o Stateless jako maszyna stanów + nasz edytor)
wariant B: integracja z silnikiem (np. hostowanie przez API i przechowywanie definicji w DB)


Komunikacja: REST (JSON) + Webhooks; opcjonalnie GraphQL dla raportów/filtrów
Notyfikacje: background jobs (Hangfire/Quartz) + e‑mail (SMTP/SendGrid) + WebPush
Real‑time: SignalR (zmiany statusów zadań, kolejki, powiadomienia)
Integracje: MassTransit + RabbitMQ/Azure Service Bus (event‑driven)
Baza danych: PostgreSQL / SQL Server (EF Core), Redis (cache), Elasticsearch (pełnotekstowe wyszukiwanie / logi)
Pliki: Azure Blob / S3 (załączniki do spraw/wniosków)

Observability & bezpieczeństwo

Logowanie: Serilog (sink: Seq/ELK) + korelacja requestów
Telemetria: OpenTelemetry + Prometheus/Grafana
Health checks: /health + liveness/readiness (K8s)
Audyt: pełny audit trail (kto, kiedy, co) + wersjonowanie definicji workflow
RODO/GDPR: retencja danych, prawo do bycia zapomnianym, maskowanie PII


🗺️ Architektura fizyczna (deployment)
SaaS (Multi‑tenant)

Kubernetes (AKS/EKS) + Docker
API + Frontend jako oddzielne serwisy
Ingress (NGINX), certyfikaty TLS
Multi‑tenancy:

Schema-per-tenant (np. tenantA.* w DB) dla izolacji, lub
Column discriminator (TenantId) dla prostoty i niższego kosztu.


CI/CD: GitHub Actions / Azure DevOps (build, test, image push, helm deploy)
Secrets: Azure Key Vault / AWS Secrets Manager
CDN: dla assetów UI

On‑premise

Docker Compose lub VM (Windows/Linux)
Łatwiejsza integracja z AD/LDAP
Backupy + monitoring lokalny


🔐 Uwierzytelnianie i autoryzacja

OIDC/OAuth2 (Azure AD / Azure AD B2C / Keycloak)
Tokeny JWT (+ odświeżanie)
Policy‑based Authorization w ASP.NET Core:

Role: Admin, Manager, Approver, User
Uprawnienia per‑moduł (claimy), np. Workflows.Create, Tasks.Assign


RBAC + row‑level security (filtrowanie po TenantId, DepartmentId)


📚 Moduły funkcjonalne


Designer workflow (React, drag&drop)

Stany, przejścia, warunki, akcje (np. wyślij maila, utwórz zadanie)
Wersjonowanie definicji, publikacja / wycofanie



Form builder

Pola: tekst, liczba, data, plik, selektor użytkowników, sekcje, walidacje
Dynamiczne reguły widoczności, autouzupełnianie z API



Zarządzanie sprawami/zadaniami

Lista zadań (moje, zespołu), przydział, SLA, eskalacje
Komentarze, załączniki, obserwatorzy



Powiadomienia & eskalacje

Szablony e‑mail, powiadomienia in‑app, webhooki



Integracje

Connectors: ERP/CRM/HR (REST/SOAP), webhooks, import/eksport



Raporty & Dashboardy

KPI (czas cyklu, ilość spraw, SLA breach)
Eksport CSV/XLSX/PDF
Audyt i śledzenie zdarzeń



Administracja

Tenanci, użytkownicy, role
Słowniki, parametry systemowe

⚙️ Technologie & pakiety (C#/.NET)

ASP.NET Core 8 (Minimal APIs/Controllers)
EF Core (PostgreSQL/SQL Server), Migrations
MediatR (CQRS, handler‑y)
FluentValidation (walidacja DTO)
AutoMapper (mapowanie DTO ↔ domain)
SignalR (real‑time)
Serilog (logi), OpenTelemetry
Hangfire/Quartz (zadania cykliczne, SLA)
MassTransit + RabbitMQ/Azure Service Bus (eventy)
Stateless (maszyna stanów) lub integracja z zewnętrznym silnikiem workflow
Identity / OIDC (Azure AD / Keycloak; JWT)



