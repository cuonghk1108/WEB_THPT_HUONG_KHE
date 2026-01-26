import React from 'react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="flex min-h-[60vh] items-center justify-center fade-in">
      <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-blue-500" aria-label="Đang tải" />
        <div className="text-sm font-semibold tracking-wide">Đang tải nội dung...</div>
      </div>
    </div>
  );
};

export default LoadingScreen;
