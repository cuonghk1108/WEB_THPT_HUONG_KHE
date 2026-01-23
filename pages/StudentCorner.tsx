import React, { useState } from 'react';
import { Calendar, Download, FileText, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentCorner: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'schedule' | 'exam' | 'forms'>('schedule');

  const handleDownload = (itemName: string) => {
    alert(`Đang tải xuống: ${itemName}`);
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white pt-32 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold font-heading mb-4">Góc học sinh</h1>
          <p className="text-blue-100">Cổng thông tin tra cứu lịch học, lịch thi và tài liệu dành cho học sinh.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-4 border-b border-slate-200 mb-8">
          <button 
            onClick={() => setActiveTab('schedule')}
            className={`pb-4 px-4 font-bold text-sm transition-colors border-b-2 ${activeTab === 'schedule' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            Thời khóa biểu
          </button>
          <button 
            onClick={() => setActiveTab('exam')}
            className={`pb-4 px-4 font-bold text-sm transition-colors border-b-2 ${activeTab === 'exam' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            Lịch thi & Kiểm tra
          </button>
          <button 
            onClick={() => setActiveTab('forms')}
            className={`pb-4 px-4 font-bold text-sm transition-colors border-b-2 ${activeTab === 'forms' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            Biểu mẫu & Quy định
          </button>
        </div>

        {/* Content */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 min-h-[400px]">
          {activeTab === 'schedule' && (
            <div className="animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" /> Thời khóa biểu (Áp dụng từ tuần 5)
                </h2>
                <button 
                    onClick={() => handleDownload('Thời khóa biểu tuần 5.pdf')}
                    className="text-sm text-blue-600 font-bold hover:underline flex items-center gap-1"
                >
                    <Download className="h-4 w-4" /> Tải về PDF
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-slate-200 text-sm">
                  <thead>
                    <tr className="bg-slate-50 text-slate-700">
                      <th className="border border-slate-200 p-3">Thứ</th>
                      <th className="border border-slate-200 p-3">Tiết 1</th>
                      <th className="border border-slate-200 p-3">Tiết 2</th>
                      <th className="border border-slate-200 p-3">Tiết 3</th>
                      <th className="border border-slate-200 p-3">Tiết 4</th>
                      <th className="border border-slate-200 p-3">Tiết 5</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-center">
                      <td className="border border-slate-200 p-3 font-bold bg-slate-50">Thứ 2</td>
                      <td className="border border-slate-200 p-3">Chào cờ</td>
                      <td className="border border-slate-200 p-3">Toán</td>
                      <td className="border border-slate-200 p-3">Toán</td>
                      <td className="border border-slate-200 p-3">Lý</td>
                      <td className="border border-slate-200 p-3">Hóa</td>
                    </tr>
                    <tr className="text-center">
                      <td className="border border-slate-200 p-3 font-bold bg-slate-50">Thứ 3</td>
                      <td className="border border-slate-200 p-3">Văn</td>
                      <td className="border border-slate-200 p-3">Văn</td>
                      <td className="border border-slate-200 p-3">Anh</td>
                      <td className="border border-slate-200 p-3">Sử</td>
                      <td className="border border-slate-200 p-3">Địa</td>
                    </tr>
                     <tr className="text-center">
                      <td className="border border-slate-200 p-3 font-bold bg-slate-50">Thứ 4</td>
                      <td className="border border-slate-200 p-3">Tin</td>
                      <td className="border border-slate-200 p-3">Tin</td>
                      <td className="border border-slate-200 p-3">Sinh</td>
                      <td className="border border-slate-200 p-3">GDCD</td>
                      <td className="border border-slate-200 p-3">CN</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-slate-500 mt-4 italic">* Đây là thời khóa biểu mẫu. Học sinh vui lòng xem chi tiết theo từng lớp tại bảng tin nhà trường.</p>
            </div>
          )}

          {activeTab === 'exam' && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                 <Bell className="h-5 w-5 text-red-500" /> Lịch kiểm tra tập trung
              </h2>
              <div className="space-y-4">
                {[
                  { date: '15/10/2025', subject: 'Toán học (1 tiết)', time: '7:00 - 7:45' },
                  { date: '16/10/2025', subject: 'Ngữ văn (2 tiết)', time: '8:00 - 9:30' },
                  { date: '18/10/2025', subject: 'Tiếng Anh (1 tiết)', time: '9:45 - 10:30' },
                ].map((exam, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                    <div>
                      <p className="font-bold text-slate-800">{exam.subject}</p>
                      <p className="text-sm text-slate-500">{exam.time}</p>
                    </div>
                    <div className="text-right">
                      <span className="block text-lg font-bold text-primary-600">{exam.date.split('/')[0]}</span>
                      <span className="text-xs text-slate-500 uppercase">Tháng {exam.date.split('/')[1]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

           {activeTab === 'forms' && (
            <div className="animate-fade-in grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                'Đơn xin nghỉ học có phép',
                'Đơn xin phúc khảo bài thi',
                'Giấy xác nhận học sinh',
                'Bản cam kết an toàn giao thông',
                'Nội quy học sinh (Sửa đổi 2025)'
              ].map((form, idx) => (
                <div 
                    key={idx} 
                    onClick={() => handleDownload(form + '.doc')}
                    className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-primary-300 transition-colors group cursor-pointer hover:bg-slate-50"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-slate-400 group-hover:text-primary-600" />
                    <span className="font-medium text-slate-700 group-hover:text-slate-900">{form}</span>
                  </div>
                  <Download className="h-4 w-4 text-slate-400 group-hover:text-primary-600" />
                </div>
              ))}
              <div className="col-span-1 md:col-span-2 mt-4 text-center">
                 <Link to="/van-ban" className="text-primary-600 font-bold hover:underline">Xem tất cả văn bản</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentCorner;
