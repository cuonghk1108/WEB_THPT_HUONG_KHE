import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { Save, Image as ImageIcon, RotateCcw } from 'lucide-react';
import { GlobalImages } from '../../types';

const ImageManager: React.FC = () => {
  const { globalImages, updateGlobalImages } = useData();
  const [formData, setFormData] = useState<GlobalImages>(globalImages);
  const [status, setStatus] = useState<'idle' | 'saving' | 'success'>('idle');

  // Sync state if context updates elsewhere
  useEffect(() => {
    setFormData(globalImages);
  }, [globalImages]);

  const handleFileChange = (key: keyof GlobalImages, file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        setFormData(prev => ({ ...prev, [key]: dataUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (key: keyof GlobalImages, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setStatus('saving');
    // Simulate network delay
    setTimeout(() => {
        updateGlobalImages(formData);
        setStatus('success');
        setTimeout(() => setStatus('idle'), 2000);
    }, 800);
  };

  const handleReset = (key: keyof GlobalImages) => {
    // Reset specifically to the initial hardcoded defaults if needed, 
    // or just to what is currently in context. 
    // Here we reset to what is currently in context (undo changes)
    setFormData(prev => ({ ...prev, [key]: globalImages[key] }));
  };

  const imageFields: { key: keyof GlobalImages; label: string; description: string }[] = [
    { 
        key: 'logo', 
        label: 'Logo Trường', 
        description: 'Logo chính thức của trường THPT Hương Khê.' 
    },
    { 
        key: 'homeHero', 
        label: 'Banner Trang Chủ', 
        description: 'Hình ảnh lớn hiển thị đầu tiên trên trang chủ (Nên dùng ảnh ngang, chất lượng cao).' 
    },
    { 
        key: 'principal', 
        label: 'Ảnh Hiệu Trưởng', 
        description: 'Ảnh chân dung hiển thị trong phần thông điệp chào mừng.' 
    },
    { 
        key: 'introHistory', 
        label: 'Ảnh Lịch Sử', 
        description: 'Hình ảnh hiển thị trong trang Giới thiệu phần Lịch sử hình thành.' 
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
       <div className="mb-8">
          <h1 className="text-2xl font-bold font-heading text-slate-900">Quản lý Hình ảnh</h1>
          <p className="text-slate-600 text-sm font-medium">Thay đổi các hình ảnh chính trên toàn bộ website.</p>
        </div>

        <div className="space-y-8">
            {imageFields.map((field) => (
                <div key={field.key} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Input Area */}
                        <div className="flex-1 space-y-4">
                            <div>
                                <h3 className="text-lg font-bold text-slate-800">{field.label}</h3>
                                <p className="text-xs text-slate-500 font-medium mb-3">{field.description}</p>
                                
                                <div className="relative">
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-slate-900 font-medium text-sm"
                                        onChange={(e) => handleFileChange(field.key, e.target.files?.[0] || null)}
                                    />
                                </div>
                            </div>
                            
                            <div className="flex justify-end">
                                <button 
                                    onClick={() => handleReset(field.key)}
                                    className="text-xs font-bold text-slate-500 hover:text-slate-700 flex items-center gap-1"
                                >
                                    <RotateCcw className="h-3 w-3" /> Khôi phục
                                </button>
                            </div>
                        </div>

                        {/* Preview Area */}
                        <div className="w-full md:w-64 h-48 bg-slate-50 rounded-lg border border-slate-200 overflow-hidden flex-shrink-0 relative group">
                            {formData[field.key] ? (
                                <img 
                                    src={formData[field.key]} 
                                    alt="Preview" 
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Invalid+Image+URL';
                                    }}
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-400">
                                    <ImageIcon className="h-10 w-10 opacity-50" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-white text-xs font-bold uppercase tracking-wider">Xem trước</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* Floating Action Bar */}
        <div className="fixed bottom-6 right-8 z-20">
            <button 
                onClick={handleSave}
                disabled={status === 'saving'}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold shadow-xl transition-all transform hover:scale-105 ${
                    status === 'success' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-primary-600 text-white hover:bg-primary-700'
                }`}
            >
                <Save className="h-5 w-5" />
                {status === 'saving' ? 'Đang lưu...' : status === 'success' ? 'Đã lưu thành công!' : 'Lưu thay đổi'}
            </button>
        </div>
    </div>
  );
};

export default ImageManager;
