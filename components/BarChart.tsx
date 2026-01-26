import React, { useMemo, useState, useEffect } from 'react';

interface BarChartProps {
  title?: string;
  subtitle?: string;
  data: { label: string; value: number }[];
  height?: number;
}

export const BarChart: React.FC<BarChartProps> = ({ title, subtitle, data, height = 220 }) => {
  const [animatedData, setAnimatedData] = useState<{ label: string; value: number }[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Animate bars on data change with reduced complexity
  useEffect(() => {
    setIsLoaded(false);
    setAnimatedData(data.map(d => ({ ...d, value: 0 })));
    
    // Use shorter delay for faster perceived loading
    const timer = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setAnimatedData(data);
        setIsLoaded(true);
      });
    });
    
    return () => cancelAnimationFrame(timer);
  }, [data]);

  const { max, ticks } = useMemo(() => {
    const maxValue = Math.max(...animatedData.map(d => d.value), 1);
    const rounded = Math.ceil(maxValue / 5) * 5 || 5;
    const steps = 4;
    const tickValues = Array.from({ length: steps + 1 }, (_, i) => Math.round((rounded / steps) * i));
    return { max: rounded, ticks: tickValues };
  }, [animatedData]);

  const chartWidth = Math.max(animatedData.length * 42, 320);
  const chartHeight = height;
  const barWidth = 26;
  const paddingBottom = 26;
  const paddingTop = 16;

  const empty = !animatedData || animatedData.length === 0;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
      {(title || subtitle) && (
        <div className="mb-3">
          {title && <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</div>}
          {subtitle && <div className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</div>}
        </div>
      )}

      {empty ? (
        <div className="flex items-center justify-center h-[140px] text-sm text-slate-500 dark:text-slate-400">Chưa có dữ liệu</div>
      ) : (
        <div className="relative overflow-x-auto" style={{ height: chartHeight }}>
          <svg width="100%" height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none">
            {/* Grid lines with optimized animation */}
            {ticks.map((t) => {
              const y = chartHeight - paddingBottom - (t / max) * (chartHeight - paddingTop - paddingBottom);
              return (
                <g key={`grid-${t}`} style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.4s ease-out' }}>
                  <line x1={0} x2={chartWidth} y1={y} y2={y} stroke="#e2e8f0" strokeWidth={1} strokeDasharray="4 4" opacity={0.6} />
                  <text x={8} y={y - 4} fontSize={10} fill="#94a3b8">{t}</text>
                </g>
              );
            })}

            {animatedData.map((d, idx) => {
              const barHeight = (d.value / max) * (chartHeight - paddingTop - paddingBottom);
              const x = idx * 42 + 20;
              const y = chartHeight - paddingBottom - barHeight;
              const delay = idx * 25; // Reduced stagger delay
              return (
                <g 
                  key={d.label}
                  style={{ 
                    animation: isLoaded ? `barSlideUp 0.5s cubic-bezier(0.22, 0.61, 0.36, 1) ${delay}ms both` : 'none'
                  }}
                >
                  <rect 
                    x={x} 
                    y={y} 
                    width={barWidth} 
                    height={barHeight} 
                    rx={10} 
                    fill="url(#barGradient)"
                    style={{
                      filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.08))'
                    }}
                  />
                  <text 
                    x={x + barWidth / 2} 
                    y={y - 6} 
                    textAnchor="middle" 
                    fontSize={11} 
                    fill="#0ea5e9" 
                    fontWeight={700}
                    style={{
                      animation: isLoaded ? `fadeInDown 0.6s ease-out ${delay + 200}ms both` : 'none'
                    }}
                  >
                    {d.value}
                  </text>
                  <text
                    x={x + barWidth / 2}
                    y={chartHeight - 6}
                    textAnchor="middle"
                    fontSize={11}
                    fill="#94a3b8"
                    transform={`rotate(-20 ${x + barWidth / 2} ${chartHeight - 6})`}
                    style={{
                      animation: isLoaded ? `fadeInUp 0.6s ease-out ${delay + 100}ms both` : 'none'
                    }}
                  >
                    {d.label}
                  </text>
                </g>
              );
            })}

            <defs>
              <linearGradient id="barGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0ea5e9" />
              </linearGradient>
              <style>{`
                @keyframes barSlideUp {
                  from {
                    opacity: 0;
                    transform: translateY(10px);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }
                @keyframes fadeInDown {
                  from {
                    opacity: 0;
                    transform: translateY(-4px);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }
                @keyframes fadeInUp {
                  from {
                    opacity: 0;
                    transform: translateY(4px);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }
              `}</style>
            </defs>
          </svg>
        </div>
      )}
    </div>
  );
};

export default BarChart;
