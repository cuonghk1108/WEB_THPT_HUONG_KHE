import React, { useEffect, useMemo, useState } from 'react';
import { Award, Trophy, Star, Medal, Calendar, Users } from 'lucide-react';
import { useData } from '../context/DataContext';
import { AchievementTier, AchievementScope } from '../types';

const iconMap: Record<string, React.ComponentType<any>> = {
  trophy: Trophy,
  star: Star,
  award: Award,
  medal: Medal,
};

const tierGradient: Record<AchievementTier, string> = {
  'Giải Nhất': 'from-yellow-400 to-amber-500',
  'Giải Nhì': 'from-gray-300 to-gray-500',
  'Giải Ba': 'from-orange-400 to-red-500',
  'Khuyến khích': 'from-green-400 to-emerald-500',
};

const scopeBadgeClass: Record<AchievementScope, string> = {
  'Quốc tế': 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300',
  'Quốc gia': 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300',
  'Tỉnh': 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
  'Huyện': 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300',
  'Trường': 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200',
};

const Achievements: React.FC = () => {
  const { achievementYears } = useData();
  const sortedYears = useMemo(() => [...achievementYears].sort((a, b) => b.year - a.year), [achievementYears]);
  const [selectedYear, setSelectedYear] = useState<number | null>(sortedYears[0]?.year ?? null);

  useEffect(() => {
    if (sortedYears.length > 0 && !sortedYears.find(y => y.year === selectedYear)) {
      setSelectedYear(sortedYears[0].year);
    }
  }, [sortedYears, selectedYear]);

  const yearData = sortedYears.find(y => y.year === selectedYear) || sortedYears[0];
  const stats = yearData?.stats || [];
  const achievements = yearData?.items || [];

  const getBadgeClass = (scope?: string) => {
    const s = (scope || '').trim() as AchievementScope;
    return scopeBadgeClass[s] || 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200';
  };

  const getMedalGradient = (tier?: AchievementTier, fallback?: string) => {
    if (tier && tierGradient[tier]) return tierGradient[tier];
    if (fallback) return fallback;
    return 'from-primary-500 to-secondary-500';
  };

  return (
    <section className="min-h-screen bg-white pt-32 pb-20 text-slate-900">
      <div className="container mx-auto max-w-7xl px-6 lg:px-10 bg-white rounded-2xl shadow-sm border border-white space-y-10 md:space-y-12">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Thành Tích & Vinh Danh</h2>
          <p className="text-slate-600 dark:text-slate-300">Những thành tựu xuất sắc của học sinh THPT Hương Khê</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 p-6">
              <div className={`h-1.5 mb-3 rounded-full bg-gradient-to-r ${stat.color || 'from-blue-500 to-indigo-600'}`}></div>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">{stat.label}</p>
              <p className="text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Year Filter */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {sortedYears.map(yearObj => (
            <button
              key={yearObj.year}
              onClick={() => setSelectedYear(yearObj.year)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedYear === yearObj.year
                  ? 'bg-primary-600 text-white'
                  : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:border-primary-500'
              }`}
            >
              {yearObj.year}
            </button>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {achievements.map((achievement) => {
            const IconComponent = iconMap[(achievement.icon || '').toLowerCase()] || Trophy;
            const level = achievement.scope || achievement.category || 'Vinh danh';
            const gradient = getMedalGradient(achievement.tier as AchievementTier, achievement.medalColor || achievement.color);
            return (
              <div key={achievement.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-xl transition-shadow">
                <div className={`h-2 bg-gradient-to-r ${gradient}`}></div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${gradient}`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-semibold ${getBadgeClass(level)}`}>
                      {level}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {achievement.title}
                  </h3>

                  <p className="text-sm text-slate-700 dark:text-slate-400 mb-4 flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {achievement.description}
                  </p>

                  <p className="text-xs text-slate-600 dark:text-slate-500 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {achievement.date}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recognition Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-white -mt-4">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Lời cảm ơn từ Nhà trường</h3>
          <p className="text-slate-700 leading-relaxed">
            "Những thành tích này là kết quả của sự nỗ lực không ngừng của các em học sinh, sự tận tâm của đội ngũ giáo viên, và sự hỗ trợ của gia đình. THPT Hương Khê tự hào về các thế hệ học sinh xuất sắc và cam kết tiếp tục nâng cao chất lượng giáo dục, tạo điều kiện để các em phát triển toàn diện."
          </p>
          <p className="text-primary-700 font-semibold mt-4">
            - Hiệu trưởng Hồ Đức Cương
          </p>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
