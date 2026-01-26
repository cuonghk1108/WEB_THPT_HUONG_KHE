import React, { useEffect, useState } from 'react';
import { visitorCounter } from '../services/visitorCounter';

export const VisitorCounter: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initCounter = async () => {
      try {
        // Increment visitor count
        const newCount = await visitorCounter.incrementVisitor();
        setCount(newCount);
      } catch (error) {
        console.error('Failed to update visitor count:', error);
        // Try to get count without incrementing if update fails
        const currentCount = await visitorCounter.getVisitorCount();
        setCount(currentCount);
      } finally {
        setLoading(false);
      }
    };

    initCounter();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-500 text-sm py-2">
        Đang tải...
      </div>
    );
  }

  return (
    <div className="text-center text-gray-600 dark:text-gray-400 text-sm py-2 border-t border-gray-200 dark:border-gray-700 mt-4">
      <div className="flex items-center justify-center gap-2">
        <span className="text-lg">👥</span>
        <span>Lượt truy cập: <strong className="text-blue-600 dark:text-blue-400">{count.toLocaleString('vi-VN')}</strong></span>
      </div>
    </div>
  );
};
