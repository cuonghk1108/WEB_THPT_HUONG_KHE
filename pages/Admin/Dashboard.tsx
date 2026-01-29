import React, { useEffect, useMemo, useState } from 'react';
import { useData } from '../../context/DataContext';
// import { visitorCounter, VisitorHistoryEntry } from '../../services/visitorCounter';
import BarChart from '../../components/BarChart';

import { Users, Newspaper, Images, Calendar, Activity, LayoutDashboard, FolderOpen, TrendingUp, Eye, BookOpen } from 'lucide-react';

interface VisitorStats {
  today: number;
  week: number;
  year: number;
  total: number;
}

interface VisitorHistoryEntry {
  date: string;
  count: number;
}

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string; accent?: string }> = ({ icon, label, value, accent = 'bg-blue-100 text-blue-600' }) => (
  <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
    <div className={`h-11 w-11 rounded-xl flex items-center justify-center ${accent}`}>{icon}</div>
    <div>
      <p className="text-xs uppercase tracking-wide text-slate-600 font-semibold">{label}</p>
      <p className="text-xl font-bold text-slate-900">{value}</p>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const { news, teachers, clubs, gallery } = useData();
  const [visitorStats] = useState<VisitorStats>({ today: 0, week: 0, year: 0, total: 0 });
  const [history] = useState<VisitorHistoryEntry[]>([]);

  const contentStats = useMemo(() => ([
    { label: 'Bài viết', value: news?.length || 0, icon: <Newspaper className="h-5 w-5" />, accent: 'bg-blue-100 text-blue-700' },
    { label: 'Giáo viên', value: teachers?.length || 0, icon: <Users className="h-5 w-5" />, accent: 'bg-emerald-100 text-emerald-700' },
    { label: 'CLB', value: clubs?.length || 0, icon: <Activity className="h-5 w-5" />, accent: 'bg-amber-100 text-amber-700' },
    { label: 'Thư viện ảnh', value: gallery?.length || 0, icon: <Images className="h-5 w-5" />, accent: 'bg-purple-100 text-purple-700' },
  ]), [news, teachers, clubs, gallery]);

  const visitorCards = visitorStats ? [
    { label: 'Hôm nay', value: visitorStats.today, icon: <Calendar className="h-5 w-5" />, accent: 'bg-blue-100 text-blue-700' },
    { label: 'Tuần', value: visitorStats.week, icon: <FolderOpen className="h-5 w-5" />, accent: 'bg-teal-100 text-teal-700' },
    { label: 'Năm', value: visitorStats.year, icon: <LayoutDashboard className="h-5 w-5" />, accent: 'bg-orange-100 text-orange-700' },
    { label: 'Tổng', value: visitorStats.total, icon: <Users className="h-5 w-5" />, accent: 'bg-slate-100 text-slate-700' },
  ] : [];

  const historyData = history.map((d) => ({
    label: d.date.slice(5).replace('-', '/'),
    value: d.count,
  }));



  // Calculate average daily visitors
  const totalDays = history.length;
  const avgDaily = totalDays > 0 ? Math.round(history.reduce((sum, h) => sum + h.count, 0) / totalDays) : 0;

  // Get peak visitor day
  const peakDay = history.length > 0 ? history.reduce((max, h) => h.count > max.count ? h : max) : null;

  // Recent news (last 3)
  const recentNews = news?.slice(0, 3) || [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-heading text-slate-900">Dashboard</h1>
        <p className="text-slate-600 text-sm font-medium mt-1">Tổng quan về hoạt động của website</p>
      </div>

      {/* Visitor Stats - Top Row */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-4">📊 Lượt truy cập</h2>
        <div className="grid gap-4 md:grid-cols-4">
          {visitorCards.map((c) => (
            <StatCard key={c.label} icon={c.icon} label={c.label} value={c.value.toLocaleString()} accent={c.accent} />
          ))}
        </div>
      </div>

      {/* Chart and Quick Stats */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <BarChart
            title="Lượt truy cập 14 ngày gần nhất"
            subtitle="Dữ liệu được lấy từ bộ đếm JSONBin"
            data={historyData}
          />
        </div>
        <div className="space-y-3">
          <StatCard icon={<TrendingUp className="h-5 w-5" />} label="TB/ngày" value={avgDaily.toLocaleString()} accent="bg-rose-100 text-rose-700" />
          <StatCard icon={<Eye className="h-5 w-5" />} label="Cao nhất" value={peakDay ? peakDay.count.toLocaleString() : '0'} accent="bg-indigo-100 text-indigo-700" />
          <div className="text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded-2xl p-3">
            <p className="font-semibold text-slate-700">Ngày cao nhất: {peakDay?.date || 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Content Statistics */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-4">📈 Nội dung</h2>
        <div className="grid gap-4 md:grid-cols-4">
          {contentStats.map((c) => (
            <StatCard key={c.label} icon={c.icon} label={c.label} value={c.value.toLocaleString()} accent={c.accent} />
          ))}
        </div>
      </div>

      {/* Recent News */}
      {recentNews.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-4">📰 Bài viết gần đây</h2>
          <div className="space-y-3">
            {recentNews.map((article) => (
              <div key={article.id} className="bg-white border border-slate-200 rounded-xl p-4 flex gap-3 hover:shadow-md transition-shadow">
                <Newspaper className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 line-clamp-1">{article.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{article.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-4">⚙️ Thống kê nhanh</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-sm font-bold text-blue-800">Tỷ lệ hoạt động</p>
            <p className="text-2xl font-bold text-blue-900 mt-2">{((visitorStats?.today || 0) / (visitorStats?.week || 1) * 100).toFixed(1)}%</p>
            <p className="text-xs text-blue-700 mt-1">So với tuần này</p>
          </div>
          
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <p className="text-sm font-bold text-emerald-800">Nội dung tổng</p>
            <p className="text-2xl font-bold text-emerald-900 mt-2">{(recentNews.length + (teachers?.length || 0) + (clubs?.length || 0) + (gallery?.length || 0))}</p>
            <p className="text-xs text-emerald-700 mt-1">Bài viết, GV, CLB, ảnh</p>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
            <p className="text-sm font-bold text-purple-800">Trạng thái</p>
            <p className="text-2xl font-bold text-purple-900 mt-2">✓ Online</p>
            <p className="text-xs text-purple-700 mt-1">Website hoạt động tốt</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
