import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Plus, Edit, Trash2, X, Save, User, Mail, BookOpen, Search, Upload } from 'lucide-react';
import { Teacher } from '../../types';
import { cloudStorage } from '../../services/cloudStorage';

const TeacherManager: React.FC = () => {
  const { teachers, addTeacher, updateTeacher, deleteTeacher } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Teacher | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    position: 'Giáo viên',
    subject: '',
    email: '',
    department: 'Tổ Toán - Tin',
    imageUrl: ''
  });

  const resetForm = () => {
    setFormData({
        name: '',
        position: 'Giáo viên',
        subject: '',
        email: '',
        department: 'Tổ Toán - Tin',
        imageUrl: ''
    });
    setEditingItem(null);
  };

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Vui lòng chọn file ảnh hợp lệ!');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('Kích thước ảnh quá lớn! Vui lòng chọn ảnh dưới 2MB.');
      return;
    }

    setUploadingImage(true);

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        try {
          const imageUrl = await cloudStorage.uploadImage(base64String, 'teacher_image');
          if (imageUrl) {
            setFormData(prev => ({ ...prev, imageUrl }));
          } else {
            alert('Lỗi: Backend upload thất bại!');
          }
        } catch (error) {
          console.error('Upload failed:', error);
          alert('Lỗi: Không thể kết nối đến server upload!');
        }
        setUploadingImage(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Lỗi khi tải ảnh lên. Vui lòng thử lại!');
      setUploadingImage(false);
    }
  };

  const handleOpenModal = (item?: Teacher) => {
    if (item) {
        setEditingItem(item);
        setFormData({
            name: item.name,
            position: item.position,
            subject: item.subject,
            email: item.email,
            department: item.department,
            imageUrl: item.imageUrl
        });
    } else {
        resetForm();
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
        updateTeacher(editingItem.id, formData);
    } else {
        addTeacher({
            ...formData,
            imageUrl: formData.imageUrl || 'https://via.placeholder.com/400?text=No+Image'
        });
    }
    setIsModalOpen(false);
    resetForm();
  };

  const filteredTeachers = teachers.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
       <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold font-heading text-slate-900">Quản lý Giáo viên</h1>
          <p className="text-slate-600 text-sm font-medium">Danh sách cán bộ, giáo viên và nhân viên nhà trường.</p>
        </div>
        <button onClick={() => handleOpenModal()} className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-bold shadow-lg shadow-primary-500/30 transition-all">
          <Plus className="h-5 w-5" /> Thêm giáo viên
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-300 mb-6 flex gap-4">
         <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
            <input 
                type="text" 
                placeholder="Tìm kiếm giáo viên..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 text-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium"
            />
         </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-300 overflow-hidden">
         <table className="w-full text-left border-collapse">
            <thead className="bg-slate-100 text-slate-900 text-xs font-extrabold uppercase tracking-wider border-b border-slate-300">
                <tr>
                    <th className="p-4 w-16">ID</th>
                    <th className="p-4 w-20">Ảnh</th>
                    <th className="p-4">Họ và tên</th>
                    <th className="p-4">Chức vụ / Bộ môn</th>
                    <th className="p-4">Tổ chuyên môn</th>
                    <th className="p-4 text-right">Hành động</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
                {filteredTeachers.map(t => (
                    <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4 text-slate-700 font-mono text-xs font-bold">#{t.id}</td>
                        <td className="p-4">
                            <img src={t.imageUrl} alt="" className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                        </td>
                        <td className="p-4 font-bold text-slate-900">{t.name}</td>
                        <td className="p-4 text-sm text-slate-700">
                            <div className="font-semibold">{t.position}</div>
                            <div className="text-xs text-slate-500">{t.subject}</div>
                        </td>
                        <td className="p-4 text-sm text-slate-700">{t.department}</td>
                        <td className="p-4 text-right">
                            <div className="flex justify-end gap-2">
                                <button onClick={() => handleOpenModal(t)} className="p-2 text-blue-700 hover:bg-blue-100 rounded transition-colors"><Edit className="h-4 w-4" /></button>
                                <button onClick={() => deleteTeacher(t.id)} className="p-2 text-red-700 hover:bg-red-100 rounded transition-colors"><Trash2 className="h-4 w-4" /></button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
         </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl animate-scale-up border border-slate-200">
                <div className="p-6 border-b border-slate-200 flex justify-between items-center">
                    <h3 className="text-xl font-bold font-heading text-slate-900">{editingItem ? 'Sửa thông tin' : 'Thêm giáo viên'}</h3>
                    <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:bg-slate-100 p-2 rounded-full"><X className="h-6 w-6" /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-800 mb-1">Họ và tên</label>
                        <div className="relative">
                            <User className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                            <input required type="text" className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                             <label className="block text-sm font-bold text-slate-800 mb-1">Chức vụ</label>
                             <input required type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" value={formData.position} onChange={e => setFormData({...formData, position: e.target.value})} />
                        </div>
                        <div>
                             <label className="block text-sm font-bold text-slate-800 mb-1">Bộ môn</label>
                             <input required type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} />
                        </div>
                    </div>
                    <div>
                         <label className="block text-sm font-bold text-slate-800 mb-1">Email</label>
                         <div className="relative">
                            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                            <input required type="email" className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                         </div>
                    </div>
                    <div>
                         <label className="block text-sm font-bold text-slate-800 mb-1">Tổ chuyên môn</label>
                         <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})}>
                            {['Ban Giám Hiệu', 'Tổ Toán - Tin', 'Tổ Lý - Hóa', 'Tổ Ngoại Ngữ', 'Tổ Xã Hội', 'Tổ Sinh - Thể - QP'].map(d => <option key={d} value={d}>{d}</option>)}
                         </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-800 mb-2">Ảnh chân dung</label>
                        <div className="flex gap-2 items-center mb-2">
                          <input type="text" className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} placeholder="https://... hoặc upload ảnh" />
                          <label className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg cursor-pointer transition-colors text-sm font-semibold inline-flex items-center gap-1 whitespace-nowrap">
                            <Upload className="h-4 w-4" />
                            Upload
                            <input 
                              type="file" 
                              accept="image/*"
                              className="hidden"
                              disabled={uploadingImage}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleFileUpload(file);
                              }}
                            />
                          </label>
                        </div>
                        {formData.imageUrl && (
                          <div className="w-20 h-20 rounded-lg overflow-hidden border border-slate-200">
                            <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => {(e.target as HTMLImageElement).src = 'https://via.placeholder.com/80?text=Error';}} />
                          </div>
                        )}
                    </div>
                    <div className="pt-4 flex justify-end gap-3">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-700 hover:bg-slate-100 font-bold rounded-lg border border-slate-300">Hủy</button>
                        <button type="submit" className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-lg flex items-center gap-2"><Save className="h-4 w-4" /> Lưu</button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};

export default TeacherManager;
