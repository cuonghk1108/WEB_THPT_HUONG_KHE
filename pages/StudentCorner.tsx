import React, { useMemo, useState } from 'react';
import { Calendar, Download, FileText, Bell, BookOpen, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

const StudentCorner: React.FC = () => {
  const { studentCorner, digitalLibrary } = useData();
  const [activeTab, setActiveTab] = useState<'schedule' | 'exam' | 'forms' | 'library'>('schedule');
  const [selectedClass, setSelectedClass] = useState<string>(studentCorner.scheduleByClass[0]?.className || '');

  const baseUrl = useMemo(() => (typeof window !== 'undefined' ? window.location.origin : ''), []);
  const examIcs = baseUrl ? `${baseUrl}/api/calendar?type=exam` : '/api/calendar?type=exam';
  const scheduleIcs = baseUrl ? `${baseUrl}/api/calendar?type=schedule` : '/api/calendar?type=schedule';
  const examGoogle = `https://calendar.google.com/calendar/r?cid=${encodeURIComponent(examIcs)}`;
  const scheduleGoogle = `https://calendar.google.com/calendar/r?cid=${encodeURIComponent(scheduleIcs)}`;

  const currentSchedule = useMemo(() => {
    return studentCorner.scheduleByClass.find((item) => item.className === selectedClass) || studentCorner.scheduleByClass[0];
  }, [selectedClass, studentCorner.scheduleByClass]);

  const maxPeriods = useMemo(() => {
    return Math.max(
      0,
      ...currentSchedule?.scheduleRows.map((row) => row.periods.length) ?? []
    );
  }, [currentSchedule]);

  const handleDownload = (itemName: string) => {
    alert(`Đang tải xuống: ${itemName}`);
  }

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen pb-16">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold font-heading mb-2">Góc học sinh</h1>
              <p className="text-blue-100">Cổng thông tin tra cứu lịch học, lịch thi và tài liệu dành cho học sinh.</p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <Link
                  to="/cong-hoc-sinh"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-slate-900 font-semibold shadow border border-slate-200 hover:bg-slate-50 transition"
                >
                  Đến Cổng Học Sinh
                </Link>
                <a
                  href={scheduleGoogle}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-slate-900 font-semibold shadow border border-slate-200 hover:bg-slate-50 transition"
                  target="_blank" rel="noreferrer"
                >
                  Đồng bộ TKB (Google)
                </a>
                <a
                  href={scheduleIcs}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-slate-900 font-semibold shadow border border-slate-200 hover:bg-slate-50 transition"
                >
                  iCal TKB (Phụ huynh)
                </a>
                <a
                  href={examGoogle}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-slate-900 font-semibold shadow border border-slate-200 hover:bg-slate-50 transition"
                  target="_blank" rel="noreferrer"
                >
                  Đồng bộ Lịch thi
                </a>
                <a
                  href={examIcs}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-slate-900 font-semibold shadow border border-slate-200 hover:bg-slate-50 transition"
                >
                  iCal Lịch thi
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-4 border-b border-slate-200 dark:border-slate-700 mb-8">
          <button 
            onClick={() => setActiveTab('schedule')}
            className={`pb-4 px-4 font-bold text-sm transition-colors border-b-2 ${activeTab === 'schedule' ? 'border-blue-600 text-blue-600 dark:text-blue-400' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            Thời khóa biểu
          </button>
          <button 
            onClick={() => setActiveTab('exam')}
            className={`pb-4 px-4 font-bold text-sm transition-colors border-b-2 ${activeTab === 'exam' ? 'border-blue-600 text-blue-600 dark:text-blue-400' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            Lịch thi & Kiểm tra
          </button>
          <button 
            onClick={() => setActiveTab('forms')}
            className={`pb-4 px-4 font-bold text-sm transition-colors border-b-2 ${activeTab === 'forms' ? 'border-blue-600 text-blue-600 dark:text-blue-400' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            Biểu mẫu & Quy định
          </button>
          <button 
            onClick={() => setActiveTab('library')}
            className={`pb-4 px-4 font-bold text-sm transition-colors border-b-2 ${activeTab === 'library' ? 'border-blue-600 text-blue-600 dark:text-blue-400' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            Thư viện tài liệu
          </button>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 min-h-[400px]">{activeTab === 'schedule' && (
            <div className="animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" /> {studentCorner.scheduleTitle}
                </h2>
                <button 
                    onClick={() => handleDownload('Thời khóa biểu tuần 5.pdf')}
                    className="text-sm text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-1"
                >
                    <Download className="h-4 w-4" /> Tải về PDF
                </button>
              </div>
              <div className="overflow-x-auto">
                <div className="mb-4 flex items-center gap-3">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Chọn lớp:</label>
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    {studentCorner.scheduleByClass.map((cls) => (
                      <option key={cls.className} value={cls.className}>
                        {cls.className}
                      </option>
                    ))}
                  </select>
                </div>
                <table className="w-full table-fixed border-collapse border border-slate-200 dark:border-slate-600 text-sm">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
                      <th className="border border-slate-200 dark:border-slate-600 p-3 h-14 align-middle text-left">Tiết / Thứ</th>
                      {currentSchedule?.scheduleRows.map((row, idx) => (
                        <th key={idx} className="border border-slate-200 dark:border-slate-600 p-3 h-14 align-middle text-center">{row.day}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: maxPeriods }).map((_, periodIndex) => (
                      <tr key={periodIndex} className="text-center text-slate-700 dark:text-slate-300">
                        <td className="border border-slate-200 dark:border-slate-600 p-3 h-14 align-middle font-bold bg-slate-50 dark:bg-slate-700 text-left">Tiết {periodIndex + 1}</td>
                        {currentSchedule?.scheduleRows.map((row, dayIdx) => (
                          <td key={dayIdx} className="border border-slate-200 dark:border-slate-600 p-3 h-14 align-middle">
                            {row.periods[periodIndex] || ''}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 italic">{studentCorner.scheduleNote}</p>
            </div>
          )}

          {activeTab === 'exam' && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                 <Bell className="h-5 w-5 text-red-500" /> {studentCorner.examTitle}
              </h2>
              <div className="space-y-4">
                {studentCorner.exams.map((exam) => (
                  <div key={exam.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-100 dark:border-slate-600">
                    <div>
                      <p className="font-bold text-slate-800 dark:text-slate-100">{exam.subject}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{exam.time}</p>
                    </div>
                    <div className="text-right">
                      <span className="block text-lg font-bold text-blue-600 dark:text-blue-400">{exam.date.split('/')[0]}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 uppercase">Tháng {exam.date.split('/')[1]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

           {activeTab === 'forms' && (
            <div className="animate-fade-in grid grid-cols-1 md:grid-cols-2 gap-6">
              {studentCorner.forms.map((form) => (
                <div 
                    key={form.id} 
                    onClick={() => handleDownload(form.name + '.doc')}
                    className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-600 rounded-lg hover:border-blue-300 dark:hover:border-blue-500 transition-colors group cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                    <span className="font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">{form.name}</span>
                  </div>
                  <Download className="h-4 w-4 text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                </div>
              ))}
              <div className="col-span-1 md:col-span-2 mt-4 text-center">
                 <Link to="/van-ban" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Xem tất cả văn bản</Link>
              </div>
            </div>
          )}

          {activeTab === 'library' && (
            <div className="animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-primary-600" />
                  Thư viện tài liệu
                </h2>
                <Link
                  to="/thu-vien"
                  className="text-sm text-primary-600 dark:text-primary-400 font-semibold hover:underline"
                >
                  Xem tất cả →
                </Link>
              </div>

              {digitalLibrary.length === 0 ? (
                <p className="text-slate-600 dark:text-slate-400">Chưa có tài liệu, vui lòng quay lại sau.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {digitalLibrary.slice(0, 9).map((res) => (
                    <div key={res.id} className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <BookOpen className="h-5 w-5 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                        <span className="text-xs px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full">
                          {res.type}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-1 text-sm leading-snug break-words">
                        {res.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">{res.author}</p>
                      <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-500 mb-3 pb-3 border-b border-slate-200 dark:border-slate-700">
                        <span>{res.category}</span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {res.views}
                        </span>
                      </div>
                      <a
                        href={res.url || '#'}
                        target="_blank"
                        rel="noreferrer"
                        className="block text-center px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors"
                      >
                        Xem tài liệu
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentCorner;
