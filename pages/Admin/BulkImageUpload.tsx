import React, { useState } from 'react';
import { Upload, Image as ImageIcon, CheckCircle, XCircle, Loader, AlertTriangle } from 'lucide-react';
import { saveGalleryImage } from '../../services/supabaseService';
import { uploadImageToSupabase } from '../../services/supabaseStorage';

interface UploadResult {
  filename: string;
  success: boolean;
  url?: string;
  error?: string;
}

const BulkImageUpload: React.FC = () => {
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState<UploadResult[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [category, setCategory] = useState('images');
  const [saveToDatabase, setSaveToDatabase] = useState(true);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles(files);
    }
  };

  const uploadToCloudinary = async (file: File, folder: string): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ml_default'); // You may need to create an unsigned preset in Cloudinary
    formData.append('folder', folder);

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const data = await response.json();
    return { url: data.secure_url };
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      alert('Vui lòng chọn ảnh để upload');
      return;
    }

    setUploading(true);
    const uploadResults: UploadResult[] = [];

    for (const file of selectedFiles) {
      try {
        // Upload to Supabase Storage
        const imageUrl = await uploadImageToSupabase(file, category);
        
        // Save to database if enabled
        if (saveToDatabase) {
          await saveGalleryImage({
            id: `gallery-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            url: imageUrl,
            title: file.name.replace(/\.[^/.]+$/, ''), // Remove extension
            category: category,
            description: `Uploaded on ${new Date().toLocaleDateString('vi-VN')}`,
            uploaded_at: new Date().toISOString()
          });
        }
        
        uploadResults.push({
          filename: file.name,
          success: true,
          url: imageUrl,
        });
      } catch (error: any) {
        uploadResults.push({
          filename: file.name,
          success: false,
          error: error.message,
        });
      }
    }

    setResults(uploadResults);
    setUploading(false);
  };

  const copyAllUrls = () => {
    const urls = results
      .filter(r => r.success && r.url)
      .map(r => r.url)
      .join('\n');
    navigator.clipboard.writeText(urls);
    alert('Đã copy tất cả URLs vào clipboard!');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-3 mb-6">
          <ImageIcon className="w-8 h-8 text-primary-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Upload ảnh hàng loạt</h1>
            <p className="text-gray-600 mt-1">Upload nhiều ảnh cùng lúc lên Supabase Storage</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chọn thư mục đích
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="images">Hình ảnh chung</option>
              <option value="news">Tin tức</option>
              <option value="gallery">Thư viện ảnh</option>
              <option value="teachers">Giáo viên</option>
              <option value="clubs">Câu lạc bộ</option>
              <option value="events">Sự kiện</option>
              <option value="achievements">Thành tích</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="saveToDb"
              checked={saveToDatabase}
              onChange={(e) => setSaveToDatabase(e.target.checked)}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <label htmlFor="saveToDb" className="text-sm font-medium text-gray-700">
              Lưu vào database để hiển thị trên web (Thư viện ảnh)
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chọn ảnh (có thể chọn nhiều)
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {selectedFiles.length > 0 && (
              <p className="mt-2 text-sm text-gray-600">
                Đã chọn {selectedFiles.length} ảnh
              </p>
            )}
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div className="text-sm text-yellow-800">
                <p className="font-semibold mb-1">Lưu ý:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Chỉ hỗ trợ file ảnh (JPG, PNG, GIF, WebP)</li>
                  <li>Mỗi ảnh tối đa 10MB</li>
                  <li>Tên file nên dùng chữ không dấu</li>
                  <li>Ảnh sẽ được lưu vào thư mục "{category}" trên Supabase Storage</li>
                  {saveToDatabase && (
                    <li className="font-semibold text-green-700">✓ Ảnh sẽ được lưu vào database và hiển thị ở Thư viện ảnh</li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          <button
            onClick={handleUpload}
            disabled={uploading || selectedFiles.length === 0}
            className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {uploading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Đang upload...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                Upload {selectedFiles.length} ảnh
              </>
            )}
          </button>
        </div>
      </div>

      {results.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Kết quả</h2>
            <button
              onClick={copyAllUrls}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
            >
              Copy tất cả URLs
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <div>
                  <p className="text-sm text-green-600 font-medium">Thành công</p>
                  <p className="text-2xl font-bold text-green-900">
                    {results.filter(r => r.success).length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <XCircle className="w-6 h-6 text-red-600" />
                <div>
                  <p className="text-sm text-red-600 font-medium">Thất bại</p>
                  <p className="text-2xl font-bold text-red-900">
                    {results.filter(r => !r.success).length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {results.map((result, index) => (
              <div
                key={index}
                className={`border rounded-lg p-3 ${
                  result.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {result.success ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-600" />
                      )}
                      <span className="font-medium text-sm">{result.filename}</span>
                    </div>
                    {result.success && result.url && (
                      <div className="mt-2">
                        <input
                          type="text"
                          value={result.url}
                          readOnly
                          onClick={(e) => e.currentTarget.select()}
                          className="w-full text-xs px-2 py-1 bg-white border border-gray-300 rounded font-mono"
                        />
                      </div>
                    )}
                    {!result.success && result.error && (
                      <p className="mt-1 text-xs text-red-600">{result.error}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkImageUpload;
