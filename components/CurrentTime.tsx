import React, { useEffect, useRef, useState } from 'react';

const TIME_ZONE = 'Asia/Ho_Chi_Minh';
const VN_OFFSET_MS = 7 * 60 * 60 * 1000; // UTC+7

function formatEpochMsVN(epochMs: number): string {
  const vnDate = new Date(epochMs);
  try {
    return new Intl.DateTimeFormat('vi-VN', {
      timeZone: TIME_ZONE,
      weekday: 'long',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(vnDate);
  } catch {
    // Fallback: manually apply UTC+7 and format
    const d = new Date(epochMs + VN_OFFSET_MS);
    const pad = (n: number) => String(n).padStart(2, '0');
    const weekdays = ['Chủ nhật','Thứ hai','Thứ ba','Thứ tư','Thứ năm','Thứ sáu','Thứ bảy'];
    const wd = weekdays[d.getUTCDay()];
    const date = `${pad(d.getUTCDate())}/${pad(d.getUTCMonth()+1)}/${d.getUTCFullYear()}`;
    const time = `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`;
    return `${wd}, ${date}, ${time}`;
  }
}

export const CurrentTime: React.FC = () => {
  const [nowStr, setNowStr] = useState<string>('');
  const baseServerEpochMs = useRef<number | null>(null);
  const clientStartMs = useRef<number>(Date.now());

  useEffect(() => {
    let intervalId: any;
    const init = async () => {
      try {
        const res = await fetch('/api/time');
        if (res.ok) {
          const data = await res.json();
          baseServerEpochMs.current = data.epochMs;
          clientStartMs.current = Date.now();
        } else {
          baseServerEpochMs.current = Date.now();
          clientStartMs.current = Date.now();
        }
      } catch {
        baseServerEpochMs.current = Date.now();
        clientStartMs.current = Date.now();
      }

      intervalId = setInterval(() => {
        const elapsed = Date.now() - clientStartMs.current;
        const epochMs = (baseServerEpochMs.current ?? Date.now()) + elapsed;
        setNowStr(formatEpochMsVN(epochMs));
      }, 1000);
    };

    init();
    return () => intervalId && clearInterval(intervalId);
  }, []);

  return (
    <div className="mt-4 pt-3 border-t border-slate-300 dark:border-white/10">
      <p className="text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Giờ hiện tại (VN)</p>
      <p className="text-slate-700 dark:text-slate-200 text-sm">{nowStr}</p>
    </div>
  );
};

export default CurrentTime;
