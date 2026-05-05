// logging_middleware/logger.ts
// AffordMed Campus Eval – Logging Middleware
// Usage: import { Log } from '../logging_middleware/logger'

const LOG_API = 'http://20.207.122.201/evaluation-service/logs';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';
export type LogPackage =
  | 'api' | 'component' | 'hook' | 'page' | 'state' | 'style'
  | 'auth' | 'config' | 'middleware' | 'utils';

let _token: string | null = null;

export function setAuthToken(token: string) {
  _token = token;
}

export async function getAuthToken(): Promise<string> {
  if (_token) return _token;

  // Read from env at runtime
  const email = process.env.NEXT_PUBLIC_AUTH_EMAIL || '';
  const name = process.env.NEXT_PUBLIC_AUTH_NAME || '';
  const accessCode = process.env.NEXT_PUBLIC_ACCESS_CODE || '';
  const clientID = process.env.NEXT_PUBLIC_CLIENT_ID || '';
  const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET || '';

  if (!clientID || !clientSecret) {
    console.warn('[Logger] No clientID/clientSecret in env. Logs will not be sent.');
    return '';
  }

  try {
    const res = await fetch('http://20.207.122.201/evaluation-service/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, accessCode, clientID, clientSecret }),
    });
    const data = await res.json();
    _token = data.token || data.access_token || data.accessToken || '';
    return _token || '';
  } catch (e) {
    console.error('[Logger] Auth failed:', e);
    return '';
  }
}

export async function Log(
  level: LogLevel,
  pkg: LogPackage,
  message: string
): Promise<void> {
  // Always log to console regardless
  console[level === 'fatal' ? 'error' : level]?.(
    `[${level.toUpperCase()}][${pkg}] ${message}`
  );

  try {
    const token = await getAuthToken();
    if (!token) return;

    const body = {
      stack: 'frontend',
      level,
      package: pkg,
      message,
    };

    const res = await fetch(LOG_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      console.error('[Logger] API returned', res.status);
    }
  } catch (err) {
    console.error('[Logger] Failed to send log:', err);
  }
}

export default Log;
