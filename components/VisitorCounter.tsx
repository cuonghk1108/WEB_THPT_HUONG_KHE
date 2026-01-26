import React, { useEffect, useState } from 'react';
import { visitorCounter } from '../services/visitorCounter';

interface Stats {
  today: number;
  week: number;
  year: number;
  total: number;
}

export const VisitorCounter: React.FC = () => {
  const [stats, setStats] = useState<Stats>({ today: 0, week: 0, year: 0, total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initCounter = async () => {
      try {
        // Increment visitor count and get stats
        const newStats = await visitorCounter.incrementVisitor();
        setStats(newStats);
      } catch (error) {
        console.error('Failed to update visitor count:', error);
        // Try to get stats without incrementing if update fails
        const currentStats = await visitorCounter.getVisitorStats();
        setStats(currentStats);
      } finally {
        setLoading(false);
      }
    };

    initCounter();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <div className="bg-slate-200 dark:bg-white/5 p-6 rounded-2xl border border-slate-300 dark:border-white/10">
      <p className="text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Lượt truy cập</p>
      <div className="text-slate-700 dark:text-slate-200 text-sm space-y-1">
        <p>Hôm nay: <span className="font-semibold text-blue-600 dark:text-blue-400">{stats.today}</span></p>
        <p>Tuần này: <span className="font-semibold text-green-600 dark:text-green-400">{stats.week}</span></p>
        <p>Năm nay: <span className="font-semibold text-purple-600 dark:text-purple-400">{stats.year}</span></p>
        <p className="pt-1 border-t border-slate-300 dark:border-slate-700">Tổng: <span className="font-bold text-orange-600 dark:text-orange-400">{stats.total}</span></p>
      </div>
    </div>
  );
};
