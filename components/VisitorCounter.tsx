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
    <div className="mt-4 pt-4 border-t border-slate-300 dark:border-slate-800">
      <div className="grid grid-cols-4 gap-2 text-center text-sm">
        <div className="bg-slate-200 dark:bg-slate-800 p-3 rounded-lg">
          <div className="text-blue-600 dark:text-blue-400 font-bold text-lg">{stats.today}</div>
          <div className="text-slate-600 dark:text-slate-400 text-xs">Hôm nay</div>
        </div>
        <div className="bg-slate-200 dark:bg-slate-800 p-3 rounded-lg">
          <div className="text-green-600 dark:text-green-400 font-bold text-lg">{stats.week}</div>
          <div className="text-slate-600 dark:text-slate-400 text-xs">Tuần này</div>
        </div>
        <div className="bg-slate-200 dark:bg-slate-800 p-3 rounded-lg">
          <div className="text-purple-600 dark:text-purple-400 font-bold text-lg">{stats.year}</div>
          <div className="text-slate-600 dark:text-slate-400 text-xs">Năm nay</div>
        </div>
        <div className="bg-slate-200 dark:bg-slate-800 p-3 rounded-lg">
          <div className="text-orange-600 dark:text-orange-400 font-bold text-lg">{stats.total}</div>
          <div className="text-slate-600 dark:text-slate-400 text-xs">Tổng cộng</div>
        </div>
      </div>
    </div>
  );
};
