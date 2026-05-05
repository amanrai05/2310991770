# Notification Backend (scaffold)

This is a minimal scaffold for the evaluation backend. It provides example endpoints you can adapt:

- `POST /register` — simulate registration, returns `clientID` and `clientSecret` in response.
- `POST /auth` — authenticate with registration info, returns a Bearer token.
- `GET /notifications` — example notifications list.

Run:

```bash
cd notification_app_be
npm install
npm run dev   # requires nodemon (dev)
```

Notes:
- Do NOT commit real `clientID`/`clientSecret` or tokens. Use `.env` (excluded by .gitignore).
- Replace sample logic with your production implementations as required by the test.
