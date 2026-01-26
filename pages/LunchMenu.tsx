import React, { useState } from 'react';
import { UtensilsCrossed, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const LunchMenu: React.FC = () => {
  const [currentWeek, setCurrentWeek] = useState(0);

  const weekDays = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu'];
  const menus = [
    {
      day: 'Thứ Hai',
      date: '27/01',
      lunch: 'Cơm chiên dương châu, Gà nướng mật ong, Canh chua cá',
      soup: 'Canh chua cá',
      side: 'Dưa muối, Trứng cuộn'
    },
    {
      day: 'Thứ Ba',
      date: '28/01',
      lunch: 'Cơm tấm sườn nướng, Thịt nướng, Rau luộc',
      soup: 'Canh mung hạt',
      side: 'Dưa chuột, Mứt'
    },
    {
      day: 'Thứ Tư',
      date: '29/01',
      lunch: 'Cơm trắng, Cá kho tộ, Thịt kho tàu',
      soup: 'Canh cải cơm',
      side: 'Trứng chiên, Mứt'
    },
    {
      day: 'Thứ Năm',
      date: '30/01',
      lunch: 'Cơm chiên, Tôm xào, Gà xào lái',
      soup: 'Canh gà',
      side: 'Cà chua trứng, Rau xào'
    },
    {
      day: 'Thứ Sáu',
      date: '31/01',
      lunch: 'Cơm tấm, Sườn nướng, Cánh gà nước mắm',
      soup: 'Canh rau cải',
      side: 'Dưa kiểm, Chả trứng'
    }
  ];

  const allergens = [
    'Tôm', 'Cua', 'Cá', 'Trứng', 'Sữa', 'Lạc', 'Hạt điều'
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Thực đơn Bữa Trưa</h2>
          <p className="text-slate-600 dark:text-slate-300">Kế hoạch bữa ăn học sinh tuần này</p>
        </div>

        {/* Week Navigation */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setCurrentWeek(Math.max(0, currentWeek - 1))}
            disabled={currentWeek === 0}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4" />
            Tuần trước
          </button>
          
          <div className="text-center">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center justify-center gap-2">
              <Calendar className="h-5 w-5 text-primary-600" />
              Tuần {currentWeek + 1}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">27/01 - 31/01/2026</p>
          </div>

          <button
            onClick={() => setCurrentWeek(currentWeek + 1)}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
          >
            Tuần sau
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {menus.map((menu, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-5 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <UtensilsCrossed className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{menu.day}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{menu.date}/2026</p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase mb-1">Cơm & Thịt</p>
                  <p className="text-slate-900 dark:text-white">{menu.lunch}</p>
                </div>
                <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase mb-1">Canh</p>
                  <p className="text-slate-900 dark:text-white">{menu.soup}</p>
                </div>
                <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase mb-1">Kèm theo</p>
                  <p className="text-slate-900 dark:text-white">{menu.side}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Allergen Info */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-200 dark:border-slate-700">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Thông tin Dị ứng</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Nếu bạn có dị ứng với bất kỳ thực phẩm nào dưới đây, vui lòng thông báo cho nhân viên ăn cơm:
          </p>
          <div className="flex flex-wrap gap-3">
            {allergens.map((allergen, idx) => (
              <span key={idx} className="px-4 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-full text-sm font-medium">
                {allergen}
              </span>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg">
            <p className="text-sm text-blue-900 dark:text-blue-200">
              📞 Liên hệ: Phòng Quản lý Ăn cơm - Ext: 123 | Email: catering@hk.edu.vn
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LunchMenu;
