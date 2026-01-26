import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Plus, Edit, Trash2, X, Save, Users, Calendar, Upload } from 'lucide-react';
import { Club } from '../../types';
import { cloudStorage } from '../../services/cloudStorage';

const ClubManager: React.FC = () => {
  const { clubs, addClub, updateClub, deleteClub } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Club | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    members: 0,
    schedule: '',
    imageUrl: ''
  });

  const resetForm = () => {
    setFormData({ name: '', description: '', members: 0, schedule: '', imageUrl: '' });
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
          const imageUrl = await cloudStorage.uploadImage(base64String, 'club_image');
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

  const handleOpenModal = (item?: Club) => {
    if (item) {
        setEditingItem(item);
        setFormData({
            name: item.name,
            description: item.description,
            members: item.members,
            schedule: item.schedule,
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
        updateClub(editingItem.id, formData);
    } else {
        addClub({
            ...formData,
            imageUrl: formData.imageUrl || 'https://via.placeholder.com/600x400?text=Club+Image'
        });
    }
    setIsModalOpen(false);
    resetForm();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold font-heading text-slate-900">Quản lý Câu lạc bộ</h1>
          <p className="text-slate-600 text-sm font-medium">Danh sách các CLB và đội nhóm hoạt động trong trường.</p>
        </div>
        <button onClick={() => handleOpenModal()} className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-bold shadow-lg shadow-primary-500/30 transition-all">
          <Plus className="h-5 w-5" /> Thêm CLB
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {clubs.map(club => (
              <div key={club.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                  <div className="h-48 overflow-hidden relative group">
                      <img src={club.imageUrl} alt={club.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute top-2 right-2 flex gap-1">
                          <button onClick={() => handleOpenModal(club)} className="p-2 bg-white/90 hover:bg-white text-blue-700 rounded-full shadow-sm"><Edit className="h-4 w-4" /></button>
                          <button onClick={() => deleteClub(club.id)} className="p-2 bg-white/90 hover:bg-white text-red-700 rounded-full shadow-sm"><Trash2 className="h-4 w-4" /></button>
                      </div>
                  </div>
                  <div className="p-6 flex-grow">
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{club.name}</h3>
                      <p className="text-slate-600 text-sm mb-4 line-clamp-2">{club.description}</p>
                      <div className="flex items-center gap-4 text-xs font-bold text-slate-500 uppercase">
                          <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {club.members} TV</span>
                          <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {club.schedule}</span>
                      </div>
                  </div>
              </div>
          ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl animate-scale-up border border-slate-200">
                <div className="p-6 border-b border-slate-200 flex justify-between items-center">
                    <h3 className="text-xl font-bold font-heading text-slate-900">{editingItem ? 'Sửa CLB' : 'Thêm CLB mới'}</h3>
                    <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:bg-slate-100 p-2 rounded-full"><X className="h-6 w-6" /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-800 mb-1">Tên Câu lạc bộ</label>
                        <input required type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-800 mb-1">Mô tả ngắn</label>
                        <textarea required rows={2} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none resize-none" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                             <label className="block text-sm font-bold text-slate-800 mb-1">Số thành viên</label>
                             <input required type="number" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" value={formData.members} onChange={e => setFormData({...formData, members: Number(e.target.value)})} />
                        </div>
                        <div>
                             <label className="block text-sm font-bold text-slate-800 mb-1">Lịch sinh hoạt</label>
                             <input required type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" value={formData.schedule} onChange={e => setFormData({...formData, schedule: e.target.value})} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-800 mb-2">Ảnh bìa CLB</label>
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
                          <div className="w-32 h-20 rounded-lg overflow-hidden border border-slate-200">
                            <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => {(e.target as HTMLImageElement).src = 'https://via.placeholder.com/128?text=Error';}} />
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

export default ClubManager;
