import React, { useEffect, useMemo, useState } from 'react';
import { Plus, Save, Trash2, Edit, X, Calendar, Award, Star } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Achievement, AchievementStat, AchievementTier, AchievementScope, AchievementIcon } from '../../types';

const defaultStat: AchievementStat = { label: 'Chỉ số', value: 0, color: 'from-primary-500 to-secondary-500' };

const AchievementManager: React.FC = () => {
  const {
    achievementYears,
    addAchievementYear,
    updateAchievementStats,
    addAchievementToYear,
    updateAchievementInYear,
    deleteAchievementInYear,
  } = useData();

  const sortedYears = useMemo(() => [...achievementYears].sort((a, b) => b.year - a.year), [achievementYears]);
  const [selectedYear, setSelectedYear] = useState<number>(sortedYears[0]?.year || new Date().getFullYear());
  const [statDrafts, setStatDrafts] = useState<AchievementStat[]>(sortedYears[0]?.stats || [defaultStat]);
  const [newYear, setNewYear] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Achievement | null>(null);
  const tierOptions: AchievementTier[] = ['Giải Nhất', 'Giải Nhì', 'Giải Ba', 'Khuyến khích'];
  const scopeOptions: AchievementScope[] = ['Quốc tế', 'Quốc gia', 'Tỉnh', 'Huyện', 'Trường'];
  const iconOptions: AchievementIcon[] = ['trophy', 'star', 'award', 'medal'];

  const getMedalColor = (tier?: AchievementTier) => {
    switch (tier) {
      case 'Giải Nhì':
        return 'from-gray-300 to-gray-500';
      case 'Giải Ba':
        return 'from-orange-400 to-red-500';
      case 'Khuyến khích':
        return 'from-green-400 to-emerald-500';
      case 'Giải Nhất':
      default:
        return 'from-yellow-400 to-amber-500';
    }
  };

  const [formData, setFormData] = useState<Omit<Achievement, 'id'>>({
    title: '',
    description: '',
    date: '',
    icon: 'trophy',
    category: 'Quốc gia',
    scope: 'Quốc gia',
    tier: 'Giải Nhất',
    medalColor: getMedalColor('Giải Nhất'),
  });

  useEffect(() => {
    const current = sortedYears.find(y => y.year === selectedYear);
    if (current) {
      setStatDrafts(current.stats.length ? current.stats : [defaultStat]);
    }
  }, [selectedYear, sortedYears]);

  const currentYear = sortedYears.find(y => y.year === selectedYear);

  const handleAddYear = () => {
    const parsed = Number(newYear);
    if (!parsed) return;
    addAchievementYear(parsed);
    setSelectedYear(parsed);
    setNewYear('');
  };

  const handleSaveStats = () => {
    if (!currentYear) return;
    updateAchievementStats(currentYear.year, statDrafts);
  };

  const openModal = (item?: Achievement) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title,
        description: item.description,
        date: item.date,
        icon: (item.icon as AchievementIcon) || 'trophy',
        category: item.category,
        scope: item.scope || (item.category as AchievementScope) || 'Quốc gia',
        tier: (item.tier as AchievementTier) || 'Giải Nhất',
        medalColor: item.medalColor || getMedalColor(item.tier as AchievementTier),
      });
    } else {
      setEditingItem(null);
      setFormData({ title: '', description: '', date: '', icon: 'trophy', category: 'Quốc gia', scope: 'Quốc gia', tier: 'Giải Nhất', medalColor: getMedalColor('Giải Nhất') });
    }
    setIsModalOpen(true);
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentYear) return;
    const payload = {
      ...formData,
      category: formData.scope || formData.category,
      medalColor: formData.medalColor || getMedalColor(formData.tier as AchievementTier),
    };
    if (editingItem) {
      updateAchievementInYear(currentYear.year, editingItem.id, payload);
    } else {
      addAchievementToYear(currentYear.year, payload);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-slate-900">Quản lý Thành tích</h1>
          <p className="text-slate-600 text-sm">Điều chỉnh số liệu và danh sách thành tích theo từng năm.</p>
        </div>
        <div className="flex gap-2 items-center">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="px-3 py-2 border border-slate-300 rounded-lg bg-white"
          >
            {sortedYears.map(y => (
              <option key={y.year} value={y.year}>{y.year}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Thêm năm"
            value={newYear}
            onChange={(e) => setNewYear(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg w-28"
          />
          <button onClick={handleAddYear} className="px-3 py-2 bg-primary-600 text-white rounded-lg font-semibold flex items-center gap-1">
            <Plus className="h-4 w-4" /> Thêm
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2"><Award className="h-5 w-5" /> Số liệu</h3>
          <button onClick={handleSaveStats} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold flex items-center gap-2">
            <Save className="h-4 w-4" /> Lưu số liệu
          </button>
        </div>
        <div className="space-y-4">
          {statDrafts.map((stat, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
              <input
                className="px-3 py-2 border border-slate-300 rounded-lg"
                value={stat.label}
                onChange={(e) => {
                  const next = [...statDrafts];
                  next[idx] = { ...next[idx], label: e.target.value };
                  setStatDrafts(next);
                }}
                placeholder="Nhãn"
              />
              <input
                className="px-3 py-2 border border-slate-300 rounded-lg"
                value={stat.value}
                onChange={(e) => {
                  const next = [...statDrafts];
                  const val = e.target.value;
                  next[idx] = { ...next[idx], value: val === '' ? '' : isNaN(Number(val)) ? val : Number(val) };
                  setStatDrafts(next);
                }}
                placeholder="Giá trị"
              />
              <input
                className="px-3 py-2 border border-slate-300 rounded-lg"
                value={stat.color}
                onChange={(e) => {
                  const next = [...statDrafts];
                  next[idx] = { ...next[idx], color: e.target.value };
                  setStatDrafts(next);
                }}
                placeholder="from-blue-500 to-cyan-500"
              />
              <div className="flex justify-end">
                <button
                  onClick={() => setStatDrafts(statDrafts.filter((_, i) => i !== idx))}
                  className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-1"
                >
                  <Trash2 className="h-4 w-4" /> Xóa
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={() => setStatDrafts([...statDrafts, { ...defaultStat, label: 'Mới', value: 0 }])}
            className="text-primary-600 font-semibold flex items-center gap-1"
          >
            <Plus className="h-4 w-4" /> Thêm chỉ số
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2"><Star className="h-5 w-5" /> Thành tích</h3>
          <button onClick={() => openModal()} className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold flex items-center gap-2">
            <Plus className="h-4 w-4" /> Thêm thành tích
          </button>
        </div>
        {currentYear?.items?.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentYear.items.map(item => (
              <div key={item.id} className="border border-slate-200 rounded-lg p-4 flex flex-col gap-2 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-slate-500 flex items-center gap-1"><Calendar className="h-4 w-4" /> {item.date}</p>
                    <h4 className="text-lg font-bold text-slate-900">{item.title}</h4>
                    <p className="text-sm text-slate-600">{item.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2 text-xs font-semibold">
                      <span className="px-2 py-1 rounded-full bg-slate-100 text-slate-700">{item.scope || item.category}</span>
                      {item.tier && (
                        <span className="px-2 py-1 rounded-full bg-amber-100 text-amber-700">{item.tier}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => openModal(item)} className="p-2 bg-slate-100 rounded-lg text-blue-600"><Edit className="h-4 w-4" /></button>
                    <button onClick={() => deleteAchievementInYear(currentYear.year, item.id)} className="p-2 bg-slate-100 rounded-lg text-red-600"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-500">Chưa có dữ liệu thành tích cho năm này.</p>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <h3 className="text-xl font-bold">{editingItem ? 'Sửa thành tích' : 'Thêm thành tích'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-500 hover:bg-slate-100 rounded-full"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleSaveItem} className="p-4 space-y-3">
              <div>
                <label className="text-sm font-semibold text-slate-700">Tiêu đề</label>
                <input
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">Mô tả</label>
                <textarea
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg resize-none"
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-semibold text-slate-700">Ngày</label>
                  <input
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="20/01/2026"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Cấp (scope)</label>
                  <select
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    value={formData.scope}
                    onChange={(e) => setFormData({ ...formData, scope: e.target.value as AchievementScope, category: e.target.value })}
                  >
                    {scopeOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">Hạng giải (tier)</label>
                <select
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  value={formData.tier}
                  onChange={(e) => setFormData({ ...formData, tier: e.target.value as AchievementTier, medalColor: getMedalColor(e.target.value as AchievementTier) })}
                >
                  {tierOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">Biểu tượng (trophy/star/award/medal)</label>
                <select
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value as AchievementIcon })}
                >
                  {iconOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg border border-slate-300">Hủy</button>
                <button type="submit" className="px-5 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold">
                  {editingItem ? 'Cập nhật' : 'Lưu'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AchievementManager;
