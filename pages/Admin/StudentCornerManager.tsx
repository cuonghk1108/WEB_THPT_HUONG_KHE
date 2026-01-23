import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Plus, Edit, Trash2, X, Save, Calendar, FileText, BookOpen } from 'lucide-react';
import { ScheduleRow, ExamItem, FormItem } from '../../types';

const StudentCornerManager: React.FC = () => {
  const { studentCorner, updateStudentCorner, addExam, deleteExam, addForm, deleteForm } = useData();
  const [activeTab, setActiveTab] = useState<'schedule' | 'exams' | 'forms'>('schedule');
  const [isScheduleEditOpen, setIsScheduleEditOpen] = useState(false);
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingExam, setEditingExam] = useState<ExamItem | null>(null);
  const [editingForm, setEditingForm] = useState<FormItem | null>(null);

  // Schedule State
  const [scheduleData, setScheduleData] = useState({
    scheduleTitle: studentCorner.scheduleTitle,
    scheduleDescription: studentCorner.scheduleDescription,
    scheduleNote: studentCorner.scheduleNote,
    scheduleRows: studentCorner.scheduleRows,
  });

  // Exam State
  const [examData, setExamData] = useState({
    examTitle: '',
    date: '',
    subject: '',
    time: '',
  });

  // Form State
  const [formData, setFormData] = useState({
    name: '',
  });

  // Schedule
  const handleSaveSchedule = () => {
    updateStudentCorner({
      ...studentCorner,
      scheduleTitle: scheduleData.scheduleTitle,
      scheduleDescription: scheduleData.scheduleDescription,
      scheduleNote: scheduleData.scheduleNote,
      scheduleRows: scheduleData.scheduleRows,
    });
    setIsScheduleEditOpen(false);
  };

  const handleAddScheduleRow = () => {
    setScheduleData({
      ...scheduleData,
      scheduleRows: [...scheduleData.scheduleRows, { day: '', periods: ['', '', '', '', ''] }],
    });
  };

  const handleUpdateScheduleRow = (idx: number, field: 'day' | 'periods', value: any) => {
    const updated = [...scheduleData.scheduleRows];
    if (field === 'day') {
      updated[idx].day = value;
    } else {
      updated[idx].periods = value;
    }
    setScheduleData({ ...scheduleData, scheduleRows: updated });
  };

  const handleDeleteScheduleRow = (idx: number) => {
    setScheduleData({
      ...scheduleData,
      scheduleRows: scheduleData.scheduleRows.filter((_, i) => i !== idx),
    });
  };

  // Exams
  const handleOpenExamModal = (exam?: ExamItem) => {
    if (exam) {
      setEditingExam(exam);
      setExamData({ examTitle: '', date: exam.date, subject: exam.subject, time: exam.time });
    } else {
      setEditingExam(null);
      setExamData({ examTitle: '', date: '', subject: '', time: '' });
    }
    setIsExamModalOpen(true);
  };

  const handleSaveExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingExam) {
      updateStudentCorner({
        ...studentCorner,
        exams: studentCorner.exams.map(exam =>
          exam.id === editingExam.id
            ? { ...exam, date: examData.date, subject: examData.subject, time: examData.time }
            : exam
        ),
      });
    } else {
      addExam({ date: examData.date, subject: examData.subject, time: examData.time });
    }
    setIsExamModalOpen(false);
    setExamData({ examTitle: '', date: '', subject: '', time: '' });
  };

  // Forms
  const handleOpenFormModal = (form?: FormItem) => {
    if (form) {
      setEditingForm(form);
      setFormData({ name: form.name });
    } else {
      setEditingForm(null);
      setFormData({ name: '' });
    }
    setIsFormModalOpen(true);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingForm) {
      updateStudentCorner({
        ...studentCorner,
        forms: studentCorner.forms.map(form =>
          form.id === editingForm.id ? { ...form, name: formData.name } : form
        ),
      });
    } else {
      addForm({ name: formData.name });
    }
    setIsFormModalOpen(false);
    setFormData({ name: '' });
  };

  return (
    <div>
      <div className="mb-8">
        <div>
          <h1 className="text-2xl font-bold font-heading text-slate-900">Quản lý Góc học sinh</h1>
          <p className="text-slate-600 text-sm font-medium">Tùy chỉnh nội dung: thời khóa biểu, lịch thi, và biểu mẫu.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 mb-8">
        <button
          onClick={() => setActiveTab('schedule')}
          className={`pb-4 px-4 font-bold text-sm transition-colors border-b-2 ${
            activeTab === 'schedule' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <BookOpen className="h-4 w-4 inline mr-2" />
          Thời khóa biểu
        </button>
        <button
          onClick={() => setActiveTab('exams')}
          className={`pb-4 px-4 font-bold text-sm transition-colors border-b-2 ${
            activeTab === 'exams' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Calendar className="h-4 w-4 inline mr-2" />
          Lịch thi
        </button>
        <button
          onClick={() => setActiveTab('forms')}
          className={`pb-4 px-4 font-bold text-sm transition-colors border-b-2 ${
            activeTab === 'forms' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <FileText className="h-4 w-4 inline mr-2" />
          Biểu mẫu
        </button>
      </div>

      {/* Schedule Tab */}
      {activeTab === 'schedule' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Quản lý Thời khóa biểu</h3>
              {!isScheduleEditOpen && (
                <button
                  onClick={() => setIsScheduleEditOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-bold"
                >
                  <Edit className="h-4 w-4" /> Sửa
                </button>
              )}
            </div>

            {isScheduleEditOpen ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Tiêu đề</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-slate-700 dark:text-white"
                    value={scheduleData.scheduleTitle}
                    onChange={(e) => setScheduleData({ ...scheduleData, scheduleTitle: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Mô tả</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-slate-700 dark:text-white"
                    value={scheduleData.scheduleDescription}
                    onChange={(e) => setScheduleData({ ...scheduleData, scheduleDescription: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Dòng thời khóa biểu</label>
                  <div className="space-y-3">
                    {scheduleData.scheduleRows.map((row, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Thứ 2"
                          className="w-24 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-slate-700 dark:text-white"
                          value={row.day}
                          onChange={(e) => handleUpdateScheduleRow(idx, 'day', e.target.value)}
                        />
                        <div className="flex gap-2 flex-1">
                          {row.periods.map((period, pIdx) => (
                            <input
                              key={pIdx}
                              type="text"
                              placeholder={`Tiết ${pIdx + 1}`}
                              className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-slate-700 dark:text-white text-sm"
                              value={period}
                              onChange={(e) => {
                                const newPeriods = [...row.periods];
                                newPeriods[pIdx] = e.target.value;
                                handleUpdateScheduleRow(idx, 'periods', newPeriods);
                              }}
                            />
                          ))}
                        </div>
                        <button
                          onClick={() => handleDeleteScheduleRow(idx)}
                          className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handleAddScheduleRow}
                    className="mt-3 text-blue-600 font-bold text-sm hover:underline flex items-center gap-1"
                  >
                    <Plus className="h-4 w-4" /> Thêm dòng
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Ghi chú</label>
                  <textarea
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-slate-700 dark:text-white"
                    rows={2}
                    value={scheduleData.scheduleNote}
                    onChange={(e) => setScheduleData({ ...scheduleData, scheduleNote: e.target.value })}
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleSaveSchedule}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 font-bold"
                  >
                    <Save className="h-4 w-4" /> Lưu
                  </button>
                  <button
                    onClick={() => setIsScheduleEditOpen(false)}
                    className="bg-slate-300 hover:bg-slate-400 text-slate-800 px-6 py-2 rounded-lg font-bold"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-slate-600 dark:text-slate-300">
                <p className="font-bold mb-2">{scheduleData.scheduleTitle}</p>
                <p className="text-sm mb-4">{scheduleData.scheduleDescription}</p>
                <table className="w-full border border-slate-200 dark:border-slate-600 text-sm">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-700">
                      <th className="border border-slate-200 dark:border-slate-600 p-2">Thứ</th>
                      <th className="border border-slate-200 dark:border-slate-600 p-2">Tiết 1</th>
                      <th className="border border-slate-200 dark:border-slate-600 p-2">Tiết 2</th>
                      <th className="border border-slate-200 dark:border-slate-600 p-2">Tiết 3</th>
                      <th className="border border-slate-200 dark:border-slate-600 p-2">Tiết 4</th>
                      <th className="border border-slate-200 dark:border-slate-600 p-2">Tiết 5</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scheduleData.scheduleRows.map((row, idx) => (
                      <tr key={idx}>
                        <td className="border border-slate-200 dark:border-slate-600 p-2 font-bold bg-slate-50 dark:bg-slate-700">{row.day}</td>
                        {row.periods.map((period, pIdx) => (
                          <td key={pIdx} className="border border-slate-200 dark:border-slate-600 p-2 text-center">
                            {period}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-xs mt-2 italic text-slate-500">{scheduleData.scheduleNote}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Exams Tab */}
      {activeTab === 'exams' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Lịch kiểm tra</h3>
            <button
              onClick={() => handleOpenExamModal()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-bold"
            >
              <Plus className="h-4 w-4" /> Thêm lịch thi
            </button>
          </div>

          <div className="space-y-3">
            {studentCorner.exams.map((exam) => (
              <div
                key={exam.id}
                className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-between"
              >
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{exam.subject}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{exam.time}</p>
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-bold">{exam.date}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenExamModal(exam)}
                    className="p-2 bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-300 rounded-lg"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteExam(exam.id)}
                    className="p-2 bg-red-100 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800 text-red-700 dark:text-red-300 rounded-lg"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {isExamModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
              <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-lg shadow-2xl animate-scale-up border border-slate-200 dark:border-slate-700">
                <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                  <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                    {editingExam ? 'Sửa lịch thi' : 'Thêm lịch thi mới'}
                  </h3>
                  <button
                    onClick={() => setIsExamModalOpen(false)}
                    className="text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 p-2 rounded-full"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <form onSubmit={handleSaveExam} className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Ngày thi (DD/MM/YYYY)</label>
                    <input
                      required
                      type="text"
                      placeholder="15/10/2025"
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-slate-700 dark:text-white"
                      value={examData.date}
                      onChange={(e) => setExamData({ ...examData, date: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Môn thi</label>
                    <input
                      required
                      type="text"
                      placeholder="Toán học (1 tiết)"
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-slate-700 dark:text-white"
                      value={examData.subject}
                      onChange={(e) => setExamData({ ...examData, subject: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Giờ thi</label>
                    <input
                      required
                      type="text"
                      placeholder="7:00 - 7:45"
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-slate-700 dark:text-white"
                      value={examData.time}
                      onChange={(e) => setExamData({ ...examData, time: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-2 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-bold flex items-center justify-center gap-2"
                    >
                      <Save className="h-4 w-4" /> {editingExam ? 'Cập nhật' : 'Thêm'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsExamModalOpen(false)}
                      className="flex-1 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-700 text-slate-800 dark:text-white py-2 rounded-lg font-bold"
                    >
                      Hủy
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Forms Tab */}
      {activeTab === 'forms' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Biểu mẫu & Quy định</h3>
            <button
              onClick={() => handleOpenFormModal()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-bold"
            >
              <Plus className="h-4 w-4" /> Thêm biểu mẫu
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {studentCorner.forms.map((form) => (
              <div
                key={form.id}
                className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="font-medium text-slate-900 dark:text-white">{form.name}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenFormModal(form)}
                    className="p-2 bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-300 rounded-lg"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteForm(form.id)}
                    className="p-2 bg-red-100 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800 text-red-700 dark:text-red-300 rounded-lg"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {isFormModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
              <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-lg shadow-2xl animate-scale-up border border-slate-200 dark:border-slate-700">
                <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                  <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                    {editingForm ? 'Sửa biểu mẫu' : 'Thêm biểu mẫu mới'}
                  </h3>
                  <button
                    onClick={() => setIsFormModalOpen(false)}
                    className="text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 p-2 rounded-full"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <form onSubmit={handleSaveForm} className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Tên biểu mẫu</label>
                    <input
                      required
                      type="text"
                      placeholder="Đơn xin nghỉ học có phép"
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-slate-700 dark:text-white"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-2 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-bold flex items-center justify-center gap-2"
                    >
                      <Save className="h-4 w-4" /> {editingForm ? 'Cập nhật' : 'Thêm'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsFormModalOpen(false)}
                      className="flex-1 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-700 text-slate-800 dark:text-white py-2 rounded-lg font-bold"
                    >
                      Hủy
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentCornerManager;
