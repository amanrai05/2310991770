# Stage 1 – Notification System Design

## Problem

Campus notification volume is high. Users lose track of important notifications.
Requirement: **Priority Inbox** – always display top `n` most important unread notifications.

## Priority Model

### Type Weights

| Type      | Weight | Reason                                      |
|-----------|--------|---------------------------------------------|
| Placement | 3      | Direct career impact – highest importance   |
| Result    | 2      | Academic outcomes – high importance         |
| Event     | 1      | Informational – lowest importance           |

### Scoring Formula

```
priority_score = weight × 10¹³ + unix_timestamp_ms
```

Multiplying weight by `10^13` ensures **type always dominates recency**.
Within same type, newer notification wins (recency tiebreaker).

### Example

| Notification       | Type      | Weight | Timestamp (ms)  | Score           |
|--------------------|-----------|--------|-----------------|-----------------|
| Google hiring      | Placement | 3      | 1745337600000   | 31745337600000  |
| AMD hiring (old)   | Placement | 3      | 1745250000000   | 31745250000000  |
| mid-sem results    | Result    | 2      | 1745337660000   | 21745337660000  |
| tech-fest event    | Event     | 1      | 1745337720000   | 11745337720000  |

→ Google hiring ranks #1 (newest Placement), AMD hiring #2 (older Placement), Result next, Event last.

## Maintaining Top-N Efficiently

### Approach: Min-Heap of size N

As new notifications stream in:

1. Start with empty min-heap (keyed by `priority_score`), capacity = N
2. For each new notification:
   - If heap size < N → push directly
   - Else if `score > heap.min` → pop min, push new
3. Heap always holds top N by score

**Time:** O(log N) per insert  
**Space:** O(N)

Optimal for streaming without full re-sort.

## Implementation

```typescript
// src/lib/api.ts

export const WEIGHT: Record<NotificationType, number> = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

export function priorityScore(n: Notification): number {
  const weight = WEIGHT[n.Type] ?? 0;
  const time = new Date(n.Timestamp).getTime();
  return weight * 1e13 + time;
}

export function sortByPriority(notifications: Notification[]): Notification[] {
  return [...notifications].sort((a, b) => priorityScore(b) - priorityScore(a));
}
```

## Frontend (Stage 2)

- `sortByPriority()` computes scores and sorts in O(n log n)
- Priority Inbox: `sortByPriority(all).slice(0, n)`
- `n` is user-configurable (5 / 10 / 15 / 20)
- Auto-refresh every 30s → priority re-computed on each fetch
- New/unread distinction via in-memory `Set<id>` tracking seen IDs
