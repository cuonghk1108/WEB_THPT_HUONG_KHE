import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Plus, Trash2, X, Save, Image as ImageIcon } from 'lucide-react';

const GalleryManager: React.FC = () => {
  const { gallery, addGalleryItem, deleteGalleryItem } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', category: 'Sự kiện', imageUrl: '' });
  const [isSaving, setIsSaving] = useState(false);

  const resetForm = () => {
    setFormData({ title: '', category: 'Sự kiện', imageUrl: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.imageUrl.trim()) {
      alert('Vui lòng nhập đường dẫn ảnh!');
      return;
    }
    if (!formData.title.trim()) {
      alert('Vui lòng nhập tiêu đề!');
      return;
    }
    if (!formData.category) {
      alert('Vui lòng chọn danh mục!');
      return;
    }

    setIsSaving(true);
    try {
      // Directly add to gallery without saving to MongoDB
      await addGalleryItem(formData);
      console.log('✅ [Frontend] Gallery item added to state');
      alert('✅ Ảnh đã được thêm thành công!');
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error adding gallery item:', error);
      alert('❌ Lỗi khi thêm ảnh. Kiểm tra console.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold font-heading text-slate-900">Quản lý Thư viện ảnh</h1>
          <p className="text-slate-600 text-sm font-medium">Thêm hình ảnh hoạt động, sự kiện vào thư viện chung.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-bold shadow-lg shadow-primary-500/30 transition-all">
          <Plus className="h-5 w-5" /> Thêm ảnh
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
         {gallery.map(item => (
            <div key={item.id} className="relative group rounded-xl overflow-hidden aspect-square border border-slate-200">
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                    <span className="text-xs text-primary-300 font-bold uppercase">{item.category}</span>
                    <p className="text-white font-medium text-sm line-clamp-2">{item.title}</p>
                    <button onClick={() => deleteGalleryItem(item.id)} className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 shadow-sm">
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            </div>
         ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-scale-up border border-slate-200">
                <div className="p-6 border-b border-slate-200 flex justify-between items-center">
                    <h3 className="text-xl font-bold font-heading text-slate-900">Thêm ảnh mới</h3>
                    <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:bg-slate-100 p-2 rounded-full"><X className="h-6 w-6" /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-800 mb-1">Tiêu đề / Mô tả ảnh</label>
                        <input required type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-800 mb-1">Danh mục</label>
                        <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                             {['Sự kiện', 'Hoạt động', 'Thể thao', 'Thành tích', 'Cảnh quan'].map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-800 mb-1">Hình ảnh</label>
                        <div className="space-y-2">
                            <p className="text-xs text-slate-500 font-medium">Dán đường dẫn ảnh (URL):</p>
                            <input 
                              required 
                              type="text" 
                              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" 
                              value={formData.imageUrl} 
                              onChange={e => setFormData({...formData, imageUrl: e.target.value})} 
                              placeholder="https://example.com/image.jpg"
                            />
                            {formData.imageUrl && (
                              <div className="w-full h-32 rounded border border-slate-300 overflow-hidden bg-slate-50">
                                <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = '/uploads/images/placeholder.svg')} />
                              </div>
                            )}
                        </div>
                    </div>
                    <div className="pt-4 flex justify-end gap-3">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-700 hover:bg-slate-100 font-bold rounded-lg border border-slate-300">Hủy</button>
                        <button type="submit" disabled={isSaving} className="px-6 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-bold rounded-lg flex items-center gap-2"><Save className="h-4 w-4" /> {isSaving ? 'Đang lưu...' : 'Thêm'}</button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};

export default GalleryManager;
