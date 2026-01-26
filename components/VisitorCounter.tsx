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
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Fire-and-forget: increment and update in background, don't block render
    console.log('VisitorCounter: Starting increment...');
    visitorCounter.incrementVisitor()
      .then(newStats => {
        console.log('VisitorCounter: Increment success, stats:', newStats);
        setStats(newStats);
        setLoaded(true);
      })
      .catch((err) => {
        console.error('VisitorCounter: Increment failed:', err);
        // Fallback: try to get stats without incrementing
        visitorCounter.getVisitorStats()
          .then(currentStats => {
            console.log('VisitorCounter: Fallback success, stats:', currentStats);
            setStats(currentStats);
            setLoaded(true);
          })
          .catch(err => {
            console.error('VisitorCounter: Fallback failed:', err);
            setLoaded(true);
          });
      });
  }, []);

  return (
    <div className={`bg-slate-200 dark:bg-white/5 p-6 rounded-2xl border border-slate-300 dark:border-white/10 transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-75'}`}>
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
