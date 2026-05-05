# Logging Middleware

Reusable frontend logging module. Sends structured logs to AffordMed evaluation server.

## Usage

```typescript
import { Log } from '../logging_middleware/logger';

// Log(level, package, message)
await Log('info', 'page', 'Notifications page loaded');
await Log('error', 'api', 'Failed to fetch notifications: 500');
await Log('debug', 'component', 'NotificationCard rendered');
```

## Levels
`debug` | `info` | `warn` | `error` | `fatal`

## Packages (Frontend)
`api` | `component` | `hook` | `page` | `state` | `style` | `auth` | `config` | `middleware` | `utils`

## Setup

Add to `.env.local`:
```
NEXT_PUBLIC_CLIENT_ID=your_client_id
NEXT_PUBLIC_CLIENT_SECRET=your_client_secret
NEXT_PUBLIC_AUTH_EMAIL=aman1770.be23@chitkara.edu.in
NEXT_PUBLIC_AUTH_NAME=Aman Kumar
NEXT_PUBLIC_ACCESS_CODE=ap5hkc
```

Token is fetched automatically on first log call and cached.
