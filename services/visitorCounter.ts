type VisitorStats = {
  today: number;
  week: number;
  year: number;
  total: number;
};

type VisitorHistoryEntry = {
  date: string; // YYYY-MM-DD
  count: number;
};

const HISTORY_KEY = 'visitor_history';

const toDateKey = (date: Date) => date.toISOString().slice(0, 10);

const getHistory = (): VisitorHistoryEntry[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveHistory = (history: VisitorHistoryEntry[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
};

const computeStats = (history: VisitorHistoryEntry[]): VisitorStats => {
  const todayKey = toDateKey(new Date());
  const currentYear = new Date().getFullYear();

  const today = history.find(h => h.date === todayKey)?.count ?? 0;

  const week = history
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-7)
    .reduce((sum, h) => sum + h.count, 0);

  const year = history
    .filter(h => Number(h.date.slice(0, 4)) === currentYear)
    .reduce((sum, h) => sum + h.count, 0);

  const total = history.reduce((sum, h) => sum + h.count, 0);

  return { today, week, year, total };
};

export const visitorCounter = {
  incrementVisitor(): Promise<VisitorStats> {
    const history = getHistory();
    const todayKey = toDateKey(new Date());
    const existing = history.find(h => h.date === todayKey);

    if (existing) {
      existing.count += 1;
    } else {
      history.push({ date: todayKey, count: 1 });
    }

    saveHistory(history);
    return Promise.resolve(computeStats(history));
  },

  getVisitorStats(): Promise<VisitorStats> {
    const history = getHistory();
    return Promise.resolve(computeStats(history));
  },

  getVisitorHistory(days = 14): Promise<VisitorHistoryEntry[]> {
    const history = getHistory();
    const sorted = history.slice().sort((a, b) => a.date.localeCompare(b.date));
    return Promise.resolve(sorted.slice(-days));
  }
};

export type { VisitorHistoryEntry, VisitorStats };
