import React, { useState } from 'react';
import { Plus, Edit, Trash2, X, Save, BookOpen, Eye, Link as LinkIcon } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { DigitalResource } from '../../types';

const DigitalLibraryManager: React.FC = () => {
  const { digitalLibrary, addResource, updateResource, deleteResource } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<DigitalResource | null>(null);
  const [formData, setFormData] = useState<Omit<DigitalResource, 'id'>>({
    title: '',
    author: '',
    category: 'Sách giáo khoa',
    year: new Date().getFullYear(),
    type: 'PDF',
    views: 0,
    url: '',
  });

  const openModal = (item?: DigitalResource) => {
    if (item) {
      setEditingItem(item);
      const { id, ...rest } = item;
      setFormData(rest);
    } else {
      setEditingItem(null);
      setFormData({ title: '', author: '', category: 'Sách giáo khoa', year: new Date().getFullYear(), type: 'PDF', views: 0, url: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      updateResource(editingItem.id, formData);
    } else {
      addResource(formData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading text-slate-900">Thư viện điện tử</h1>
          <p className="text-slate-600 text-sm">Quản lý tài nguyên số: sách, ebook, tài liệu.</p>
        </div>
        <button onClick={() => openModal()} className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold flex items-center gap-2">
          <Plus className="h-4 w-4" /> Thêm tài liệu
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {digitalLibrary.map(item => (
          <div key={item.id} className="border border-slate-200 rounded-xl p-4 bg-white shadow-sm flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-slate-500">{item.category} • {item.type}</p>
                <h3 className="text-lg font-bold text-slate-900 line-clamp-2">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.author}</p>
              </div>
              <div className="flex gap-1">
                <button onClick={() => openModal(item)} className="p-2 bg-slate-100 rounded-lg text-blue-600"><Edit className="h-4 w-4" /></button>
                <button onClick={() => deleteResource(item.id)} className="p-2 bg-slate-100 rounded-lg text-red-600"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
            <div className="flex justify-between text-sm text-slate-500">
              <span>Năm: {item.year}</span>
              <span>Lượt xem: {item.views}</span>
            </div>
            {item.url && (
              <a href={item.url} target="_blank" rel="noreferrer" className="text-primary-600 flex items-center gap-1 text-sm font-semibold">
                <Eye className="h-4 w-4" /> Xem / Tải
              </a>
            )}
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <h3 className="text-xl font-bold">{editingItem ? 'Sửa tài liệu' : 'Thêm tài liệu'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-500 hover:bg-slate-100 rounded-full"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-3">
              <div>
                <label className="text-sm font-semibold text-slate-700">Tiêu đề</label>
                <input
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">Tác giả / NXB</label>
                <input
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-semibold text-slate-700">Danh mục</label>
                  <input
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Loại file</label>
                  <input
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-semibold text-slate-700">Năm</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Lượt xem</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    value={formData.views}
                    onChange={(e) => setFormData({ ...formData, views: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-1"><LinkIcon className="h-4 w-4" /> Link (view/download)</label>
                <input
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg border border-slate-300">Hủy</button>
                <button type="submit" className="px-5 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold">
                  <Save className="h-4 w-4" />
                  {editingItem ? 'Cập nhật' : 'Lưu'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DigitalLibraryManager;
