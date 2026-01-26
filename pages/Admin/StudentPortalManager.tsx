import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Plus, Edit, Trash2, Save, User, FileText, Clock, X } from 'lucide-react';
import { AssignmentItem, GradeItem } from '../../types';

const StudentPortalManager: React.FC = () => {
  const {
    studentPortal,
    updateStudentInfo,
    addGrade,
    updateGrade,
    deleteGrade,
    addAssignment,
    updateAssignment,
    deleteAssignment,
  } = useData();

  const [infoDraft, setInfoDraft] = useState(studentPortal.info);
  const [isGradeModal, setIsGradeModal] = useState(false);
  const [editingGradeIdx, setEditingGradeIdx] = useState<number | null>(null);
  const [gradeForm, setGradeForm] = useState<GradeItem>({ subject: '', midterm: '', final: '' });

  const [isAssignmentModal, setIsAssignmentModal] = useState(false);
  const [editingAssignmentIdx, setEditingAssignmentIdx] = useState<number | null>(null);
  const [assignmentForm, setAssignmentForm] = useState<AssignmentItem>({ subject: '', title: '', dueDate: '', status: 'not-started' });

  const handleSaveInfo = () => {
    updateStudentInfo(infoDraft);
  };

  const openGradeModal = (idx?: number) => {
    if (idx !== undefined) {
      setEditingGradeIdx(idx);
      setGradeForm(studentPortal.grades[idx]);
    } else {
      setEditingGradeIdx(null);
      setGradeForm({ subject: '', midterm: '', final: '' });
    }
    setIsGradeModal(true);
  };

  const saveGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingGradeIdx !== null) {
      updateGrade(editingGradeIdx, gradeForm);
    } else {
      addGrade(gradeForm);
    }
    setIsGradeModal(false);
  };

  const openAssignmentModal = (idx?: number) => {
    if (idx !== undefined) {
      setEditingAssignmentIdx(idx);
      setAssignmentForm(studentPortal.assignments[idx]);
    } else {
      setEditingAssignmentIdx(null);
      setAssignmentForm({ subject: '', title: '', dueDate: '', status: 'not-started' });
    }
    setIsAssignmentModal(true);
  };

  const saveAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAssignmentIdx !== null) {
      updateAssignment(editingAssignmentIdx, assignmentForm);
    } else {
      addAssignment(assignmentForm);
    }
    setIsAssignmentModal(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-heading text-slate-900">Cổng Học Sinh</h1>
        <p className="text-slate-600 text-sm">Cập nhật thông tin cá nhân, điểm số, bài tập.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-3"><User className="h-5 w-5" /> Thông tin</h3>
          <div className="space-y-3">
            {[{ key: 'name', label: 'Họ tên' }, { key: 'class', label: 'Lớp' }, { key: 'gpa', label: 'GPA' }, { key: 'attendanceRate', label: 'Tỉ lệ có mặt' }, { key: 'credits', label: 'Tín chỉ' }].map(field => (
              <div key={field.key}>
                <label className="text-sm font-semibold text-slate-700">{field.label}</label>
                <input
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  value={(infoDraft as any)[field.key]}
                  onChange={(e) => setInfoDraft({ ...infoDraft, [field.key]: e.target.value })}
                />
              </div>
            ))}
            <button onClick={handleSaveInfo} className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2">
              <Save className="h-4 w-4" /> Lưu thông tin
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2"><FileText className="h-5 w-5" /> Điểm số</h3>
            <button onClick={() => openGradeModal()} className="px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold flex items-center gap-1">
              <Plus className="h-4 w-4" /> Thêm
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {studentPortal.grades.map((grade, idx) => (
              <div key={idx} className="border border-slate-200 rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-sm font-bold text-slate-900">{grade.subject}</p>
                    <p className="text-xs text-slate-500">Giữa kỳ: {grade.midterm}</p>
                    <p className="text-xs text-slate-500">Cuối kỳ: {grade.final}</p>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => openGradeModal(idx)} className="p-2 bg-slate-100 rounded-lg text-blue-600"><Edit className="h-4 w-4" /></button>
                    <button onClick={() => deleteGrade(idx)} className="p-2 bg-slate-100 rounded-lg text-red-600"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2"><Clock className="h-5 w-5" /> Bài tập</h3>
            <button onClick={() => openAssignmentModal()} className="px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold flex items-center gap-1">
              <Plus className="h-4 w-4" /> Thêm
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {studentPortal.assignments.map((item, idx) => (
              <div key={idx} className="border border-slate-200 rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-bold text-slate-900">{item.title}</p>
                    <p className="text-xs text-slate-500">{item.subject}</p>
                    <p className="text-xs text-slate-500">Hạn: {item.dueDate}</p>
                    <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold">{item.status}</span>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => openAssignmentModal(idx)} className="p-2 bg-slate-100 rounded-lg text-blue-600"><Edit className="h-4 w-4" /></button>
                    <button onClick={() => deleteAssignment(idx)} className="p-2 bg-slate-100 rounded-lg text-red-600"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isGradeModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <h3 className="text-xl font-bold">{editingGradeIdx !== null ? 'Sửa điểm' : 'Thêm điểm'}</h3>
              <button onClick={() => setIsGradeModal(false)} className="p-2 text-slate-500 hover:bg-slate-100 rounded-full"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={saveGrade} className="p-4 space-y-3">
              {(['subject', 'midterm', 'final'] as const).map(key => (
                <div key={key}>
                  <label className="text-sm font-semibold text-slate-700">{key === 'subject' ? 'Môn học' : key === 'midterm' ? 'Giữa kỳ' : 'Cuối kỳ'}</label>
                  <input
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    value={(gradeForm as any)[key]}
                    onChange={(e) => setGradeForm({ ...gradeForm, [key]: e.target.value })}
                  />
                </div>
              ))}
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsGradeModal(false)} className="px-4 py-2 rounded-lg border border-slate-300">Hủy</button>
                <button type="submit" className="px-5 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold">
                  <Save className="h-4 w-4" /> Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isAssignmentModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <h3 className="text-xl font-bold">{editingAssignmentIdx !== null ? 'Sửa bài tập' : 'Thêm bài tập'}</h3>
              <button onClick={() => setIsAssignmentModal(false)} className="p-2 text-slate-500 hover:bg-slate-100 rounded-full"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={saveAssignment} className="p-4 space-y-3">
              {(['title', 'subject', 'dueDate'] as const).map(key => (
                <div key={key}>
                  <label className="text-sm font-semibold text-slate-700">{key === 'title' ? 'Tên bài tập' : key === 'subject' ? 'Môn học' : 'Hạn nộp'}</label>
                  <input
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    value={(assignmentForm as any)[key]}
                    onChange={(e) => setAssignmentForm({ ...assignmentForm, [key]: e.target.value })}
                  />
                </div>
              ))}
              <div>
                <label className="text-sm font-semibold text-slate-700">Trạng thái</label>
                <select
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  value={assignmentForm.status}
                  onChange={(e) => setAssignmentForm({ ...assignmentForm, status: e.target.value as AssignmentItem['status'] })}
                >
                  <option value="submitted">Đã nộp</option>
                  <option value="pending">Sắp đến</option>
                  <option value="not-started">Chưa bắt đầu</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsAssignmentModal(false)} className="px-4 py-2 rounded-lg border border-slate-300">Hủy</button>
                <button type="submit" className="px-5 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold">
                  <Save className="h-4 w-4" /> Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentPortalManager;
