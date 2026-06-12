# 🎓 China Physics PhD Finder Agent

> A comprehensive web application for Nepali MSc Physics students from Tribhuvan University to find and apply to Physics PhD programs in China.

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)](https://www.prisma.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

## 📋 Table of Contents

1. [Project Description](#-project-description)
2. [Data Sources](#-data-sources)
3. [CSC Scholarship Guide](#-csc-scholarship-guide)
4. [Chinese Embassy Nepal](#-chinese-embassy-nepal)
5. [Features](#-features)
6. [Tech Stack](#-tech-stack)
7. [Getting Started](#-getting-started)
8. [Project Structure](#-project-structure)
9. [API Endpoints](#-api-endpoints)
10. [Sync & Watchlist Guide](#-sync--watchlist-guide)
11. [AI Agent](#-ai-agent)
12. [License](#-license)

---

## 📖 Project Description

**China Physics PhD Finder Agent** is a production-ready web application designed specifically for Nepali students who have completed (or are completing) their MSc in Physics from Tribhuvan University and want to pursue a PhD in China.

The application provides:

- **48 institutions** — 34 Chinese universities + 14 CAS (Chinese Academy of Sciences) institutes
- **Complete CSC Scholarship guide** for Nepali students (Type A & Type B)
- **Real-time deadline alerts** with color-coded urgency
- **AI-powered agent** to answer questions about programs, scholarships, and applications
- **Watchlist** to track target universities and their deadlines
- **Advanced filtering** by city, research field, CSC designation, and English program availability

---

## 📊 Data Sources

| Source | Description | URL |
|--------|-------------|-----|
| **CUCAS** | China University and College Admission System — comprehensive portal for international students | [cucas.edu.cn](https://www.cucas.edu.cn) |
| **Campus China** | Scholarship-linked program listings | [campuschina.org](https://www.campuschina.org) |
| **CSC** | China Scholarship Council official website | [csc.edu.cn](https://www.csc.edu.cn) |
| **CAS** | Chinese Academy of Sciences institute directory | [cas.cn](https://www.cas.cn) |
| **University Websites** | Individual university physics department pages | Various |

### Universities Included

All **Double First-Class** universities offering Physics PhD programs, including:
Peking University, Tsinghua University, USTC, Fudan University, Shanghai Jiao Tong University, Zhejiang University, Nanjing University, Sun Yat-sen University, Wuhan University, Harbin Institute of Technology, and 24 more.

### CAS Institutes Included

IOP (Beijing), IHEP (Beijing), NAOC (Beijing), CIOMP (Changchun), SIOM (Shanghai), ASIPP (Hefei), TIPC (Beijing), WIPM (Wuhan), PMO (Nanjing), YNAO (Kunming), XAO (Urumqi), ISSP (Hefei), FJIRSM (Fuzhou), SICCAS (Shanghai).

---

## 🎓 CSC Scholarship Guide

### Type A — Bilateral Program

| Feature | Details |
|---------|---------|
| **Channel** | Chinese Embassy in Kathmandu |
| **Agency Number** | 5861 |
| **Coverage** | Tuition + Accommodation + CNY 3,500/month + Insurance |
| **Deadline** | January – April |
| **Process** | Apply through Embassy Education Office |

### Type B — Chinese University Program

| Feature | Details |
|---------|---------|
| **Channel** | CSC Online Portal |
| **Portal** | [studyinchina.csc.edu.cn](https://studyinchina.csc.edu.cn) |
| **Coverage** | Same as Type A |
| **Deadline** | March – April |
| **Max Universities** | 3 |

> ⚠️ You can only apply for **one type** per year (A or B, not both).

### Provincial Scholarships

Beijing, Shanghai, Jiangsu, Zhejiang, Guangdong, Anhui, and Sichuan provinces offer additional scholarships.

---

## 🏛️ Chinese Embassy Nepal

| Detail | Information |
|--------|-------------|
| **Address** | Baluwatar, Kathmandu, Nepal |
| **Phone** | +977-1-4411740 |
| **Email** | chinaemb_np@mfa.gov.cn |
| **Working Hours** | Monday – Friday, 9:00 AM – 12:00 PM |
| **Website** | [np.china-embassy.gov.cn](http://np.china-embassy.gov.cn) |

---

## ✨ Features

### 🏠 Dashboard
- Stats overview (universities, CAS institutes, CSC designated, English programs)
- Top research fields visualization
- Top cities for Physics PhD
- Quick links to key sections
- Recent deadline alerts

### 🎓 Universities Browser
- **Search** by name, city, field, department, or research group
- **Filter** by: CSC Only, English Only, Watchlisted, City, Research Field
- **Expandable cards** with full details: URL, professors, documents, scholarships, notes
- **Load More** pagination (12 per page)

### 🔬 CAS Institutes
- 14 CAS institutes grouped by city
- Research focus areas for each institute
- UCAS enrollment information
- Expandable detail cards

### 📜 CSC Scholarship Guide
- Type A vs Type B comparison table
- Chinese Embassy Nepal contact information
- 7-step application timeline (January → September)
- Interactive document checklist with progress bar
- 7 provincial scholarships
- 8 FAQ items with detailed answers

### ⭐ Watchlist
- Add/remove universities
- Field filter for watchlisted items
- Sync functionality

### 🔔 Deadline Alerts
- Color-coded urgency: Red (<30 days), Amber (<60 days), Green (>60 days)
- Filter by urgency level or watchlisted status
- Notify toggle for individual alerts

### 🤖 AI Agent
- Chat interface powered by z-ai-web-dev-sdk
- Specialized in Chinese university PhD programs for Nepali students
- 5 suggested prompts for quick start
- Session-based conversation history
- Enriched with watchlist context

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | Full-stack React framework with App Router |
| **TypeScript 5** | Type-safe development |
| **Prisma ORM** | Database with SQLite |
| **Tailwind CSS 4** | Utility-first styling |
| **shadcn/ui** | Component library (New York style) |
| **z-ai-web-dev-sdk** | AI agent capabilities |
| **Lucide React** | Icon library |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ or **Bun** runtime
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/subarnasthaa/China-Physics-PhD-Finder-Agent.git
cd China-Physics-PhD-Finder-Agent

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env
# Edit .env if needed (default DATABASE_URL should work)

# Push database schema
bun run db:push

# Seed the database with university data
bunx tsx prisma/seed.ts

# Start the development server
bun run dev
```

The application will be available at `http://localhost:3000`.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── agent/route.ts          # AI agent chat endpoint
│   │   ├── alerts/route.ts         # Deadline alerts
│   │   ├── csc/route.ts            # CSC scholarship info
│   │   ├── stats/route.ts          # Dashboard statistics
│   │   ├── sync/route.ts           # Data sync management
│   │   ├── universities/
│   │   │   ├── route.ts            # University list with filters
│   │   │   └── [id]/route.ts       # Single university CRUD
│   │   └── watchlist/route.ts      # Watchlist management
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                    # Main SPA page
├── components/
│   ├── agent-chat-tab.tsx          # AI chat interface
│   ├── alerts-tab.tsx              # Deadline alerts view
│   ├── cas-institutes-tab.tsx      # CAS institutes browser
│   ├── csc-guide-tab.tsx           # CSC scholarship guide
│   ├── dashboard-tab.tsx           # Dashboard view
│   ├── header.tsx                  # App header with countdown
│   ├── universities-tab.tsx        # University browser with filters
│   ├── university-card.tsx         # Reusable university card
│   └── watchlist-tab.tsx           # Watchlist management
├── hooks/
│   ├── use-mobile.ts
│   └── use-toast.ts
└── lib/
    ├── db.ts                       # Prisma client
    └── utils.ts

prisma/
├── schema.prisma                   # Database schema
└── seed.ts                         # Seed script (48 institutions + 21 CSC entries)
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/universities` | List universities with filters |
| `POST` | `/api/universities` | Create university |
| `GET` | `/api/universities/[id]` | Get single university |
| `PUT` | `/api/universities/[id]` | Update university |
| `DELETE` | `/api/universities/[id]` | Delete university |
| `GET` | `/api/watchlist` | Get watchlist items |
| `POST` | `/api/watchlist` | Add to watchlist |
| `DELETE` | `/api/watchlist` | Remove from watchlist |
| `GET` | `/api/csc` | Get CSC info (optional: `?category=`) |
| `POST` | `/api/csc` | Create/update CSC info |
| `GET` | `/api/alerts` | Get deadline alerts |
| `GET` | `/api/stats` | Get dashboard statistics |
| `GET` | `/api/sync` | Get sync logs |
| `POST` | `/api/sync` | Trigger sync operation |
| `POST` | `/api/agent` | AI agent chat |

### Query Parameters for `/api/universities`

| Parameter | Type | Description |
|-----------|------|-------------|
| `search` | string | Search name, city, fields, department |
| `type` | string | "University" or "CAS Institute" |
| `cscOnly` | boolean | Filter CSC-designated only |
| `englishOnly` | boolean | Filter English programs only |
| `city` | string | Filter by city |
| `field` | string | Filter by research field |
| `watchlisted` | boolean | Filter watchlisted only |

---

## 🔄 Sync & Watchlist Guide

### Watchlist
- Click the **star icon** on any university card to add it to your watchlist
- Access your watchlist from the **Watchlist** tab
- Filter watchlisted items by research field
- Use the **Sync** button to refresh data

### Data Sync
- The sync API endpoint can be triggered to refresh university data
- Sync operations are logged in the `SyncLog` table
- Current data sources are static (seed script), but the sync infrastructure is ready for live scraping

---

## 🤖 AI Agent

The built-in AI agent is specialized in helping Nepali students with:

- University recommendations based on research interests
- CSC scholarship application process (Type A vs Type B)
- Application deadline information
- Required document checklists
- Tips specific to Nepali applicants
- CAS institute information

The agent uses the `z-ai-web-dev-sdk` package and maintains conversation history per session. It also receives context about the user's watchlist to provide personalized responses.

---

## 📄 License

This project is licensed under the **MIT License**.

---

<p align="center">
  Built with ❤️ for Nepali Physics students | <a href="https://github.com/subarnasthaa/China-Physics-PhD-Finder-Agent">GitHub</a>
</p>
