import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Plus, Edit, Trash2, Search, X, Save, Image as ImageIcon } from 'lucide-react';
import { NewsItem } from '../../types';
import { cloudStorage } from '../../services/cloudStorage';

const NewsManager: React.FC = () => {
  const { news, addNews, updateNews, deleteNews } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Hoạt động',
    excerpt: '',
    content: '',
    imageUrl: '',
    date: new Date().toLocaleDateString('vi-VN')
  });
  const [uploadingImage, setUploadingImage] = useState(false);

  const resetForm = () => {
    setFormData({
        title: '',
        category: 'Hoạt động',
        excerpt: '',
        content: '',
        imageUrl: '',
        date: new Date().toLocaleDateString('vi-VN')
    });
    setEditingItem(null);
  };

  const handleOpenModal = (item?: NewsItem) => {
    if (item) {
        setEditingItem(item);
        setFormData({
            title: item.title,
            category: item.category,
            excerpt: item.excerpt,
            content: item.content,
            imageUrl: item.imageUrl,
            date: item.date
        });
    } else {
        resetForm();
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    if (!formData.title || !formData.excerpt) return;

    if (editingItem) {
        updateNews(editingItem.id, formData);
    } else {
        addNews({
            ...formData,
            // Fallback image if empty
            imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800' 
        });
    }
    setIsModalOpen(false);
    resetForm();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) {
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
          // Try to upload to ImgBB cloud
          const imageUrl = await cloudStorage.uploadImage(base64String, 'news');
          if (imageUrl) {
            setFormData({...formData, imageUrl});
            return;
          }
        } catch (error) {
          console.error('Cloud upload failed, using base64:', error);
        }

        // Fallback to base64
        setFormData({...formData, imageUrl: base64String});
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Lỗi khi tải ảnh lên!');
    } finally {
      setUploadingImage(false);
    }
  };

  const filteredNews = news.filter(n => n.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold font-heading text-slate-900">Quản lý Tin tức</h1>
          <p className="text-slate-600 text-sm font-medium">Quản lý bài viết, sự kiện và thông báo của nhà trường.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-bold shadow-lg shadow-primary-500/30 transition-all"
        >
          <Plus className="h-5 w-5" /> Thêm tin mới
        </button>
      </div>

      {/* Search & Stats */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-300 mb-6 flex gap-4">
         <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
            <input 
                type="text" 
                placeholder="Tìm kiếm bài viết..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 text-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium"
            />
         </div>
         <div className="flex items-center gap-2 px-4 bg-slate-50 rounded-lg border border-slate-300 text-slate-700 font-bold">
            <span>Tổng số: {news.length} bài</span>
         </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-300 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-slate-100 text-slate-900 text-xs font-extrabold uppercase tracking-wider border-b border-slate-300">
                    <tr>
                        <th className="p-4 w-16">ID</th>
                        <th className="p-4 w-24">Hình ảnh</th>
                        <th className="p-4">Tiêu đề</th>
                        <th className="p-4 w-32">Danh mục</th>
                        <th className="p-4 w-32">Ngày đăng</th>
                        <th className="p-4 w-32 text-right">Hành động</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                    {filteredNews.map(item => (
                        <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                            <td className="p-4 text-slate-700 font-mono text-xs font-bold">#{item.id}</td>
                            <td className="p-4">
                                <img src={item.imageUrl} alt="" className="w-12 h-12 rounded object-cover border border-slate-300" />
                            </td>
                            <td className="p-4">
                                <h3 className="font-bold text-slate-900 line-clamp-1 text-sm">{item.title}</h3>
                                <p className="text-xs text-slate-600 line-clamp-1 mt-1 font-medium">{item.excerpt}</p>
                            </td>
                            <td className="p-4">
                                <span className="inline-block px-2 py-1 bg-slate-200 text-slate-700 rounded text-xs font-bold border border-slate-300">
                                    {item.category}
                                </span>
                            </td>
                            <td className="p-4 text-sm text-slate-700 font-medium">{item.date}</td>
                            <td className="p-4 text-right">
                                <div className="flex justify-end gap-2">
                                    <button onClick={() => handleOpenModal(item)} className="p-2 text-blue-700 hover:bg-blue-100 rounded transition-colors" title="Sửa">
                                        <Edit className="h-4 w-4" />
                                    </button>
                                    <button onClick={() => deleteNews(item.id)} className="p-2 text-red-700 hover:bg-red-100 rounded transition-colors" title="Xóa">
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {filteredNews.length === 0 && (
            <div className="p-8 text-center text-slate-600 font-medium">
                Không tìm thấy bài viết nào.
            </div>
        )}
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-up flex flex-col border border-slate-200">
                <div className="p-6 border-b border-slate-200 flex justify-between items-center sticky top-0 bg-white z-10">
                    <h3 className="text-xl font-bold font-heading text-slate-900">
                        {editingItem ? 'Chỉnh sửa bài viết' : 'Thêm bài viết mới'}
                    </h3>
                    <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-slate-800 hover:bg-slate-100 p-2 rounded-full transition-colors">
                        <X className="h-6 w-6" />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block text-sm font-bold text-slate-800 mb-1">Tiêu đề bài viết</label>
                            <input 
                                type="text" 
                                required
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-slate-900"
                                value={formData.title}
                                onChange={e => setFormData({...formData, title: e.target.value})}
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-bold text-slate-800 mb-1">Danh mục</label>
                            <select 
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-slate-900"
                                value={formData.category}
                                onChange={e => setFormData({...formData, category: e.target.value})}
                            >
                                {['Hoạt động', 'Thông báo', 'Gương sáng', 'Đoàn thể', 'Học vụ'].map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                         <div>
                            <label className="block text-sm font-bold text-slate-800 mb-1">Ngày đăng</label>
                            <input 
                                type="text" 
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-slate-900"
                                value={formData.date}
                                onChange={e => setFormData({...formData, date: e.target.value})}
                                placeholder="DD/MM/YYYY"
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-bold text-slate-800 mb-1">Ảnh đại diện</label>
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
                                    <div className="w-20 h-20 rounded border border-slate-300 overflow-hidden flex-shrink-0 bg-slate-50">
                                        {formData.imageUrl && <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />}
                                    </div>
                                </div>
                                <p className="text-xs text-slate-500 font-medium">Hoặc dán link ảnh:</p>
                                <div className="flex gap-2">
                                    <div className="flex-1 relative">
                                        <ImageIcon className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
                                        <input 
                                            type="text" 
                                            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-slate-900"
                                            value={formData.imageUrl}
                                            onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                                            placeholder="https://example.com/image.jpg"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-bold text-slate-800 mb-1">Tóm tắt (Excerpt)</label>
                            <textarea 
                                rows={2}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-slate-900"
                                value={formData.excerpt}
                                onChange={e => setFormData({...formData, excerpt: e.target.value})}
                            ></textarea>
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-bold text-slate-800 mb-1">Nội dung chi tiết (HTML)</label>
                            <textarea 
                                rows={8}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none font-mono text-sm text-slate-900"
                                value={formData.content}
                                onChange={e => setFormData({...formData, content: e.target.value})}
                                placeholder="<p>Nội dung bài viết...</p>"
                            ></textarea>
                            <p className="text-xs text-slate-500 mt-1 font-medium">Hỗ trợ các thẻ HTML cơ bản: &lt;p&gt;, &lt;h3&gt;, &lt;strong&gt;, &lt;em&gt;</p>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
                        <button 
                            type="button" 
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 text-slate-700 hover:bg-slate-100 font-bold rounded-lg transition-colors border border-slate-300"
                        >
                            Hủy bỏ
                        </button>
                        <button 
                            type="submit" 
                            className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-lg shadow-lg shadow-primary-500/30 transition-colors flex items-center gap-2"
                        >
                            <Save className="h-4 w-4" />
                            {editingItem ? 'Cập nhật' : 'Đăng bài'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};

export default NewsManager;
