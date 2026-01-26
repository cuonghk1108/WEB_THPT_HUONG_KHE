import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Plus, Trash2, X, Save, Image as ImageIcon } from 'lucide-react';
import { cloudStorage } from '../../services/cloudStorage';

const GalleryManager: React.FC = () => {
  const { gallery, addGalleryItem, deleteGalleryItem } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', category: 'Sự kiện', imageUrl: '' });
  const [uploadingImage, setUploadingImage] = useState(false);

  const resetForm = () => {
    setFormData({ title: '', category: 'Sự kiện', imageUrl: '' });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) {
      alert('Vui lòng chọn file ảnh hợp lệ!');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Kích thước ảnh quá lớn! Vui lòng chọn ảnh dưới 5MB.');
      return;
    }

    setUploadingImage(true);

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        
        try {
          // Upload to Cloudinary backend
          console.log('📤 Uploading image to Cloudinary backend...');
          const imageUrl = await cloudStorage.uploadImage(base64String, 'gallery');
          
          if (imageUrl) {
            console.log('✅ Image uploaded successfully:', imageUrl);
            setFormData({...formData, imageUrl});
            setUploadingImage(false);
            return;
          } else {
            console.error('❌ Backend returned null URL');
            alert('Lỗi: Backend upload thất bại. Vui lòng kiểm tra server!');
            setUploadingImage(false);
            return;
          }
        } catch (error) {
          console.error('❌ Cloud upload failed:', error);
          alert('Lỗi: Không thể kết nối đến server upload. Kiểm tra backend?');
          setUploadingImage(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Lỗi khi tải ảnh lên!');
      setUploadingImage(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.imageUrl) {
      alert('Vui lòng upload ảnh!');
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

    // Add gallery item
    addGalleryItem(formData);
    alert('✅ Ảnh đã được thêm thành công!');
    setIsModalOpen(false);
    resetForm();
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
                            <div className="flex gap-2">
                                <label className="flex-1 flex items-center justify-center px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 cursor-pointer transition-colors">
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={handleImageUpload}
                                        disabled={uploadingImage}
                                        className="hidden"
                                    />
                                    <span className="text-sm font-bold text-slate-700">
                                        {uploadingImage ? 'Đang upload...' : 'Chọn ảnh từ máy'}
                                    </span>
                                </label>
                                <div className="w-16 h-16 rounded border border-slate-300 overflow-hidden flex-shrink-0 bg-slate-50">
                                    {formData.imageUrl && <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />}
                                </div>
                            </div>
                            <p className="text-xs text-slate-500 font-medium">Hoặc dán link ảnh:</p>
                            <input required type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} placeholder="https://..." />
                        </div>
                    </div>
                    <div className="pt-4 flex justify-end gap-3">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-700 hover:bg-slate-100 font-bold rounded-lg border border-slate-300">Hủy</button>
                        <button type="submit" className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-lg flex items-center gap-2"><Save className="h-4 w-4" /> Thêm</button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};

export default GalleryManager;
