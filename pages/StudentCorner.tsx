import React, { useState } from 'react';
import { Calendar, Download, FileText, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

const StudentCorner: React.FC = () => {
  const { studentCorner } = useData();
  const [activeTab, setActiveTab] = useState<'schedule' | 'exam' | 'forms'>('schedule');

  const handleDownload = (itemName: string) => {
    alert(`Đang tải xuống: ${itemName}`);
  }

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen pb-16">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white pt-32 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold font-heading mb-4">Góc học sinh</h1>
          <p className="text-blue-100">Cổng thông tin tra cứu lịch học, lịch thi và tài liệu dành cho học sinh.</p>
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
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 min-h-[400px]">
          {activeTab === 'schedule' && (
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
                <table className="w-full border-collapse border border-slate-200 dark:border-slate-600 text-sm">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
                      <th className="border border-slate-200 dark:border-slate-600 p-3">Thứ</th>
                      <th className="border border-slate-200 dark:border-slate-600 p-3">Tiết 1</th>
                      <th className="border border-slate-200 dark:border-slate-600 p-3">Tiết 2</th>
                      <th className="border border-slate-200 dark:border-slate-600 p-3">Tiết 3</th>
                      <th className="border border-slate-200 dark:border-slate-600 p-3">Tiết 4</th>
                      <th className="border border-slate-200 dark:border-slate-600 p-3">Tiết 5</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentCorner.scheduleRows.map((row, idx) => (
                      <tr key={idx} className="text-center text-slate-700 dark:text-slate-300">
                        <td className="border border-slate-200 dark:border-slate-600 p-3 font-bold bg-slate-50 dark:bg-slate-700">{row.day}</td>
                        {row.periods.map((period, pIdx) => (
                          <td key={pIdx} className="border border-slate-200 dark:border-slate-600 p-3">{period}</td>
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
        </div>
      </div>
    </div>
  );
};

export default StudentCorner;
