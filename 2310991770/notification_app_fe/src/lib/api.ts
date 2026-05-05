import { Log } from '../../../logging_middleware/logger';

export type NotificationType = 'Event' | 'Result' | 'Placement';

export interface Notification {
  ID: string;
  Type: NotificationType;
  Message: string;
  Timestamp: string;
}

export interface FetchParams {
  limit?: number;
  page?: number;
  notification_type?: NotificationType;
}

// Use environment variable for API base so we can swap between local scaffold and remote test server.
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://20.207.122.201/evaluation-service/notifications';

export async function fetchNotifications(params: FetchParams = {}): Promise<Notification[]> {
  const query = new URLSearchParams();
  if (params.limit) query.set('limit', String(params.limit));
  if (params.page) query.set('page', String(params.page));
  if (params.notification_type) query.set('notification_type', params.notification_type);

  const url = `${API_BASE}${query.toString() ? '?' + query.toString() : ''}`;

  await Log('info', 'api', `Fetching notifications: ${url}`);

  try {
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    if (!res.ok) {
      await Log('error', 'api', `Notifications API failed: ${res.status} ${res.statusText}`);
      // Don't throw here; return an empty list so the UI can render without a global build/runtime error.
      return [];
    }

    const data = await res.json();
    const notifications: Notification[] = (data.notifications || []).map((n: any) => ({
      ID: n.ID || n.id,
      Type: n.Type || n.type,
      Message: n.Message || n.message,
      Timestamp: n.Timestamp || n.timestamp,
    }));

    await Log('info', 'api', `Fetched ${notifications.length} notifications successfully`);
    return notifications;
  } catch (err: any) {
    await Log('error', 'api', `fetchNotifications threw: ${err?.message || err}`);
    // Likely network/CORS/backend issue. Return empty list so the app remains usable.
    return [];
  }
}

export const WEIGHT: Record<NotificationType, number> = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

export function priorityScore(n: Notification): number {
  return (WEIGHT[n.Type] ?? 0) * 1e13 + new Date(n.Timestamp).getTime();
}

export function sortByPriority(notifications: Notification[]): Notification[] {
  return [...notifications].sort((a, b) => priorityScore(b) - priorityScore(a));
}

export function sortByRecency(notifications: Notification[]): Notification[] {
  return [...notifications].sort(
    (a, b) => new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime()
  );
}
