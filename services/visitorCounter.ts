// Visitor counter using JSONBin.io
const JSONBIN_API_KEY = import.meta.env.VITE_JSONBIN_API_KEY || '';
const VISITOR_BIN_ID = import.meta.env.VITE_VISITOR_BIN_ID || '';

interface DailyVisitor {
  date: string; // YYYY-MM-DD
  count: number;
}

interface VisitorData {
  total: number;
  lastUpdate: string;
  daily: DailyVisitor[]; // Last 365 days
}

interface VisitorStats {
  today: number;
  week: number;
  year: number;
  total: number;
}

export interface VisitorHistoryEntry {
  date: string;
  count: number;
}

const TIME_ZONE = 'Asia/Ho_Chi_Minh';

function formatDateTZ(d: Date): string {
  try {
    // en-CA yields YYYY-MM-DD
    return new Intl.DateTimeFormat('en-CA', { timeZone: TIME_ZONE, year: 'numeric', month: '2-digit', day: '2-digit' }).format(d);
  } catch {
    return new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(d);
  }
}

function getTodayDate(): string {
  return formatDateTZ(new Date());
}

function getDayOfWeekFromDateString(dateStr: string): number {
  // Build a UTC date from YYYY-MM-DD to get stable weekday independent of local tz
  const utc = new Date(dateStr + 'T00:00:00Z');
  return utc.getUTCDay(); // 0=Sun, 1=Mon, ...
}

function subtractDays(dateStr: string, days: number): string {
  const utc = new Date(dateStr + 'T00:00:00Z');
  const ms = utc.getTime() - days * 24 * 60 * 60 * 1000;
  const d = new Date(ms);
  return d.toISOString().split('T')[0];
}

function getWeekStartDate(): string {
  const todayStr = getTodayDate();
  const dayOfWeek = getDayOfWeekFromDateString(todayStr);
  const subtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Monday-start week
  return subtractDays(todayStr, subtract);
}

function getYearStartDate(): string {
  const year = getTodayDate().slice(0, 4);
  return `${year}-01-01`;
}

export const visitorCounter = {
  async getVisitorStats(): Promise<VisitorStats> {
    try {
      if (!VISITOR_BIN_ID) {
        return { today: 0, week: 0, year: 0, total: 0 };
      }

      const response = await fetch(`https://api.jsonbin.io/v3/b/${VISITOR_BIN_ID}`, {
        headers: {
          'X-Master-Key': JSONBIN_API_KEY || '',
        },
      });

      if (!response.ok) {
        return { today: 0, week: 0, year: 0, total: 0 };
      }

      const data = await response.json();
      const visitorData: VisitorData = data.record || { total: 0, lastUpdate: new Date().toISOString(), daily: [] };

      const today = getTodayDate();
      const weekStart = getWeekStartDate();
      const yearStart = getYearStartDate();

      let todayCount = 0;
      let weekCount = 0;
      let yearCount = 0;

      visitorData.daily.forEach((daily: DailyVisitor) => {
        if (daily.date === today) {
          todayCount = daily.count;
        }
        if (daily.date >= weekStart) {
          weekCount += daily.count;
        }
        if (daily.date >= yearStart) {
          yearCount += daily.count;
        }
      });

      return {
        today: todayCount,
        week: weekCount,
        year: yearCount,
        total: visitorData.total,
      };
    } catch (error) {
      console.error('Error fetching visitor stats:', error);
      return { today: 0, week: 0, year: 0, total: 0 };
    }
  },

  async incrementVisitor(): Promise<VisitorStats> {
    try {
      if (!VISITOR_BIN_ID) {
        return { today: 0, week: 0, year: 0, total: 0 };
      }

      const response = await fetch(`https://api.jsonbin.io/v3/b/${VISITOR_BIN_ID}`, {
        headers: {
          'X-Master-Key': JSONBIN_API_KEY || '',
        },
      });

      let visitorData: VisitorData;

      if (response.ok) {
        const data = await response.json();
        visitorData = data.record || { total: 0, lastUpdate: new Date().toISOString(), daily: [] };
      } else {
        visitorData = { total: 0, lastUpdate: new Date().toISOString(), daily: [] };
      }

      // Increment total
      visitorData.total += 1;
      visitorData.lastUpdate = new Date().toISOString();

      // Update daily count
      const today = getTodayDate();
      const dailyEntry = visitorData.daily.find((d: DailyVisitor) => d.date === today);

      if (dailyEntry) {
        dailyEntry.count += 1;
      } else {
        visitorData.daily.push({ date: today, count: 1 });
      }

      // Keep only last 365 days
      visitorData.daily = visitorData.daily.sort((a: DailyVisitor, b: DailyVisitor) => b.date.localeCompare(a.date)).slice(0, 365);

      // Update bin
      const updateResponse = await fetch(`https://api.jsonbin.io/v3/b/${VISITOR_BIN_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': JSONBIN_API_KEY || '',
        },
        body: JSON.stringify(visitorData),
      });

      if (updateResponse.ok) {
        // Calculate stats
        const weekStart = getWeekStartDate();
        const yearStart = getYearStartDate();

        let todayCount = 0;
        let weekCount = 0;
        let yearCount = 0;

        visitorData.daily.forEach((daily: DailyVisitor) => {
          if (daily.date === today) {
            todayCount = daily.count;
          }
          if (daily.date >= weekStart) {
            weekCount += daily.count;
          }
          if (daily.date >= yearStart) {
            yearCount += daily.count;
          }
        });

        return {
          today: todayCount,
          week: weekCount,
          year: yearCount,
          total: visitorData.total,
        };
      }

      return { today: 0, week: 0, year: 0, total: 0 };
    } catch (error) {
      console.error('Error incrementing visitor count:', error);
      return { today: 0, week: 0, year: 0, total: 0 };
    }
  },

  async getVisitorHistory(limit: number = 14): Promise<VisitorHistoryEntry[]> {
    try {
      if (!VISITOR_BIN_ID) return [];

      const response = await fetch(`https://api.jsonbin.io/v3/b/${VISITOR_BIN_ID}`, {
        headers: {
          'X-Master-Key': JSONBIN_API_KEY || '',
        },
      });

      if (!response.ok) return [];

      const data = await response.json();
      const visitorData: VisitorData = data.record || { total: 0, lastUpdate: new Date().toISOString(), daily: [] };

      const sorted = [...(visitorData.daily || [])].sort((a, b) => a.date.localeCompare(b.date));
      const sliced = sorted.slice(-limit);
      return sliced.map(({ date, count }) => ({ date, count }));
    } catch (error) {
      console.error('Error fetching visitor history:', error);
      return [];
    }
  },
};
