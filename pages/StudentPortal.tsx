import React, { useState } from 'react';
import { User, Calendar, BookOpen, Award, Clock, Bell, FileText, LogOut } from 'lucide-react';
import { useData } from '../context/DataContext';

const StudentPortal: React.FC = () => {
  const { studentPortal } = useData();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentId && password) {
      setIsLoggedIn(true);
    }
  };

  if (!isLoggedIn) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-primary-100 dark:border-slate-700">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 text-center">Cổng Học Sinh</h2>
              <p className="text-slate-600 dark:text-slate-300 text-center mb-6">Đăng nhập để xem điểm số, bài tập và thông tin</p>
              
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                    Mã số học sinh
                  </label>
                  <input
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="Nhập mã số"
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-slate-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                    Mật khẩu
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nhập mật khẩu"
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-slate-700 dark:text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 rounded-lg transition-colors"
                >
                  Đăng nhập
                </button>
              </form>

              <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-4">
                Demo: Bất kỳ mã + mật khẩu nào cũng có thể đăng nhập
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Cổng Học Sinh</h2>
            <p className="text-slate-600 dark:text-slate-300">Chào {studentPortal.info.name}</p>
          </div>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Đăng xuất
          </button>
        </div>

        {/* Student Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
            { icon: User, label: 'Lớp', value: studentPortal.info.class },
            { icon: BookOpen, label: 'GPA', value: studentPortal.info.gpa },
            { icon: Clock, label: 'Có mặt', value: studentPortal.info.attendanceRate },
            { icon: Award, label: 'Tín chỉ', value: studentPortal.info.credits },
          ].map((item, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
              <item.icon className="h-6 w-6 text-primary-600 dark:text-primary-400 mb-2" />
              <p className="text-sm text-slate-600 dark:text-slate-400">{item.label}</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Grades & Assignments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Grades */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary-600" />
              Điểm số
            </h3>
            <div className="space-y-3">
              {studentPortal.grades.map((grade, i) => (
                <div key={i} className="border-b border-slate-200 dark:border-slate-700 pb-3 last:border-0">
                  <p className="font-semibold text-slate-900 dark:text-white mb-1">{grade.subject}</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">
                      Giữa kỳ: <span className="font-semibold text-slate-900 dark:text-white">{grade.midterm}</span>
                    </span>
                    <span className="text-slate-600 dark:text-slate-400">
                      Cuối kỳ: <span className="font-semibold text-slate-900 dark:text-white">{grade.final}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Assignments */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary-600" />
              Bài tập
            </h3>
            <div className="space-y-3">
              {studentPortal.assignments.map((assign, i) => (
                <div key={i} className="border-b border-slate-200 dark:border-slate-700 pb-3 last:border-0">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-semibold text-slate-900 dark:text-white text-sm">{assign.title}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      assign.status === 'submitted' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                      assign.status === 'pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' :
                      'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                    }`}>
                      {assign.status === 'submitted' ? 'Đã nộp' : assign.status === 'pending' ? 'Sắp đến' : 'Chưa bắt đầu'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">{assign.subject}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-500">Hạn nộp: {assign.dueDate}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Public library entry point */}
        <div className="mt-10 bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary-600" />
              Thư viện tài liệu
            </h3>
            <p className="text-slate-600 dark:text-slate-300">Tất cả tài liệu đã mở public. Bấm để xem ngoài cổng học sinh.</p>
          </div>
          <a
            href="/digital-library"
            className="inline-flex items-center justify-center px-5 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors"
          >
            Xem thư viện công khai
          </a>
        </div>
      </div>
    </section>
  );
};

export default StudentPortal;
