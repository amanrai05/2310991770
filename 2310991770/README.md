# 2310991770

Campus Hiring Evaluation – Frontend Track

## Structure

```
├── logging_middleware/          # Reusable logging module (Stage 1)
├── notification_app_fe/         # Next.js notification dashboard (Stage 2)
├── notification_system_design.md  # Priority algorithm design (Stage 1)
└── .gitignore
```

## Setup

### 1. Add credentials

```bash
cd notification_app_fe
cp .env.local.example .env.local
# Edit .env.local → paste your clientID and clientSecret
```

### 2. Run

```bash
cd notification_app_fe
npm install
npm run dev
# → http://localhost:3000
```

## Features

- All Notifications (paginated, newest first)
- Priority Inbox (Placement > Result > Event + recency)
- Filter by type (Event / Result / Placement)
- New/unread visual distinction
- Auto-refresh every 30s
- Fully responsive (mobile + desktop)
- Logging middleware integrated throughout
