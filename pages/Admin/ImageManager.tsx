import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { Save, Image as ImageIcon, RotateCcw, Upload } from 'lucide-react';
import { GlobalImages } from '../../types';
import { cloudStorage } from '../../services/cloudStorage';

const ImageManager: React.FC = () => {
  const { globalImages, updateGlobalImages } = useData();
  const [formData, setFormData] = useState<GlobalImages>(globalImages);
  const [status, setStatus] = useState<'idle' | 'saving' | 'success'>('idle');

  // Sync state if context updates elsewhere
  useEffect(() => {
    setFormData(globalImages);
  }, [globalImages]);

  const handleChange = (key: keyof GlobalImages, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleFileUpload = async (key: keyof GlobalImages, file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Vui lòng chọn file ảnh hợp lệ!');
      return;
    }

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('Kích thước ảnh quá lớn! Vui lòng chọn ảnh dưới 2MB.');
      return;
    }

    setStatus('saving');

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        
        try {
          // Upload to Cloudinary backend
          console.log('📤 Uploading image to Cloudinary backend for key:', key);
          const imageUrl = await cloudStorage.uploadImage(base64String, key);
          
          if (imageUrl) {
            console.log('✅ Image uploaded:', imageUrl);
            const newImages = { ...formData, [key]: imageUrl };
            setFormData(newImages);
            updateGlobalImages(newImages);
            
            setStatus('success');
            setTimeout(() => setStatus('idle'), 2000);
          } else {
            console.error('❌ Backend returned null URL');
            alert('Lỗi: Backend upload thất bại!');
            setStatus('idle');
          }
        } catch (error) {
          console.error('❌ Cloud upload failed:', error);
          alert('Lỗi: Không thể kết nối đến server upload!');
          setStatus('idle');
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Lỗi khi tải ảnh lên. Vui lòng thử lại!');
      setStatus('idle');
    }
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
        description: 'Logo hiển thị trên Header và toàn bộ website (Nên dùng ảnh vuông, nền trong suốt).' 
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
          <p className="text-slate-600 text-sm font-medium">Thay đổi các hình ảnh chính trên toàn bộ website. Ảnh sẽ được lưu và hiển thị ngay lập tức.</p>
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
                                
                                <div className="relative mb-3">
                                    <ImageIcon className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                                    <input 
                                        type="text" 
                                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-slate-900 font-medium text-sm"
                                        value={formData[field.key]}
                                        onChange={(e) => handleChange(field.key, e.target.value)}
                                        placeholder="https://... hoặc upload ảnh"
                                    />
                                </div>

                                {/* Upload Button */}
                                <label className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg cursor-pointer transition-colors text-sm font-semibold">
                                    <Upload className="h-4 w-4" />
                                    Tải ảnh lên từ máy
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) handleFileUpload(field.key, file);
                                        }}
                                    />
                                </label>
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
