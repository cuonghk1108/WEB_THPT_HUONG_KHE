import React, { useState } from 'react';
import { Upload, Database, CheckCircle, XCircle, Loader, AlertTriangle, Image as ImageIcon } from 'lucide-react';
// import { saveNews, saveEvent, saveTeacher, saveClub, saveGalleryImage, saveAchievement, saveLibraryDocument, saveStudentPortalData } from '../../services/supabaseService';
// import { uploadImageToSupabase } from '../../services/supabaseStorage';

interface MigrationResult {
  type: string;
  success: number;
  failed: number;
  errors: string[];
}

interface ImageUploadResult {
  originalUrl: string;
  newUrl: string;
  success: boolean;
  error?: string;
}

const DataMigration: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<MigrationResult[]>([]);
  const [currentStep, setCurrentStep] = useState('');
  const [uploadingImages, setUploadingImages] = useState(false);
  const [imageResults, setImageResults] = useState<ImageUploadResult[]>([]);

  // Helper function to download image from URL and convert to File
  const downloadImageAsFile = async (url: string, filename: string): Promise<File | null> => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return new File([blob], filename, { type: blob.type });
    } catch (error) {
      console.error(`Failed to download image from ${url}:`, error);
      return null;
    }
  };

  // Helper function to get filename from URL
  const getFilenameFromUrl = (url: string, prefix: string, id: string): string => {
    try {
      const urlObj = new URL(url);
      const extension = urlObj.pathname.split('.').pop() || 'jpg';
      return `${prefix}-${id}-${Date.now()}.${extension}`;
    } catch {
      return `${prefix}-${id}-${Date.now()}.jpg`;
    }
  };

  // Upload all images to Supabase Storage
  const uploadAllImages = async (data: any): Promise<Map<string, string>> => {
    const urlMapping = new Map<string, string>(); // originalUrl -> newUrl
    const imageUploadResults: ImageUploadResult[] = [];
    setUploadingImages(true);

    try {
      // Collect all image URLs from data
      const imagesToUpload: { url: string; folder: string; filename: string }[] = [];

      // Global images
      if (data.globalImages) {
        Object.entries(data.globalImages).forEach(([key, url]) => {
          if (typeof url === 'string' && url.startsWith('http')) {
            imagesToUpload.push({
              url,
              folder: 'global',
              filename: getFilenameFromUrl(url, 'global', key)
            });
          }
        });
      }

      // News images
      if (data.news) {
        data.news.forEach((item: any) => {
          if (item.image && item.image.startsWith('http')) {
            imagesToUpload.push({
              url: item.image,
              folder: 'news',
              filename: getFilenameFromUrl(item.image, 'news', item.id)
            });
          }
        });
      }

      // Teachers images
      if (data.teachers) {
        data.teachers.forEach((item: any) => {
          if (item.image && item.image.startsWith('http')) {
            imagesToUpload.push({
              url: item.image,
              folder: 'teachers',
              filename: getFilenameFromUrl(item.image, 'teacher', item.id)
            });
          }
        });
      }

      // Clubs images
      if (data.clubs) {
        data.clubs.forEach((item: any) => {
          if (item.image && item.image.startsWith('http')) {
            imagesToUpload.push({
              url: item.image,
              folder: 'clubs',
              filename: getFilenameFromUrl(item.image, 'club', item.id)
            });
          }
        });
      }

      // Gallery images
      if (data.gallery) {
        data.gallery.forEach((item: any) => {
          if (item.url && item.url.startsWith('http')) {
            imagesToUpload.push({
              url: item.url,
              folder: 'gallery',
              filename: getFilenameFromUrl(item.url, 'gallery', item.id)
            });
          }
        });
      }

      // Events images
      if (data.events) {
        data.events.forEach((item: any) => {
          if (item.image && item.image.startsWith('http')) {
            imagesToUpload.push({
              url: item.image,
              folder: 'events',
              filename: getFilenameFromUrl(item.image, 'event', item.id)
            });
          }
        });
      }

      // Achievements images
      if (data.achievements) {
        data.achievements.forEach((item: any) => {
          if (item.image && item.image.startsWith('http')) {
            imagesToUpload.push({
              url: item.image,
              folder: 'achievements',
              filename: getFilenameFromUrl(item.image, 'achievement', item.id)
            });
          }
        });
      }

      // Digital Library cover images
      if (data.digitalLibrary) {
        data.digitalLibrary.forEach((item: any) => {
          if (item.coverImage && item.coverImage.startsWith('http')) {
            imagesToUpload.push({
              url: item.coverImage,
              folder: 'library',
              filename: getFilenameFromUrl(item.coverImage, 'library', item.id)
            });
          }
        });
      }

      setCurrentStep(`Đang upload ${imagesToUpload.length} ảnh lên Supabase Storage...`);

      // Upload each image
      let successCount = 0;
      for (let i = 0; i < imagesToUpload.length; i++) {
        const { url, folder, filename } = imagesToUpload[i];
        setCurrentStep(`Đang upload ảnh ${i + 1}/${imagesToUpload.length}: ${filename}`);

        try {
          // Skip if already processed
          if (urlMapping.has(url)) {
            continue;
          }

          // Download image
          const file = await downloadImageAsFile(url, filename);
          if (!file) {
            imageUploadResults.push({
              originalUrl: url,
              newUrl: '',
              success: false,
              error: 'Không thể tải ảnh'
            });
            continue;
          }

          // Upload to Supabase Storage
          const newUrl = await uploadImageToSupabase(file, folder);
          urlMapping.set(url, newUrl);
          imageUploadResults.push({
            originalUrl: url,
            newUrl,
            success: true
          });
          successCount++;
        } catch (error: any) {
          console.error(`Failed to upload ${url}:`, error);
          imageUploadResults.push({
            originalUrl: url,
            newUrl: '',
            success: false,
            error: error.message
          });
        }
      }

      setImageResults(imageUploadResults);
      setCurrentStep(`✅ Đã upload ${successCount}/${imagesToUpload.length} ảnh thành công!`);
    } catch (error) {
      console.error('Error uploading images:', error);
      setCurrentStep('❌ Lỗi khi upload ảnh');
    } finally {
      setUploadingImages(false);
    }

    return urlMapping;
  };

  const migrateData = async () => {
    setLoading(true);
    setResults([]);
    setImageResults([]);
    setCurrentStep('Đang tải dữ liệu từ school-data.json...');

    try {
      // Load data from school-data.json
      const response = await fetch('/data/school-data.json');
      const data = await response.json();

      // STEP 1: Upload all images to Supabase Storage
      const urlMapping = await uploadAllImages(data);

      // Helper function to replace image URLs
      const replaceImageUrl = (url: string | undefined): string => {
        if (!url) return '';
        return urlMapping.get(url) || url;
      };

      const migrationResults: MigrationResult[] = [];

      // Migrate News
      if (data.news && data.news.length > 0) {
        setCurrentStep(`Đang upload ${data.news.length} tin tức...`);
        const newsResult: MigrationResult = {
          type: 'Tin tức',
          success: 0,
          failed: 0,
          errors: []
        };

        for (const news of data.news) {
          try {
            await saveNews({
              id: news.id,
              title: news.title,
              excerpt: news.excerpt,
              content: news.content,
              date: news.date,
              category: news.category,
              image: replaceImageUrl(news.image),
              author: news.author
            });
            newsResult.success++;
          } catch (error: any) {
            newsResult.failed++;
            newsResult.errors.push(`${news.title}: ${error.message}`);
          }
        }
        migrationResults.push(newsResult);
      }

      // Migrate Events
      if (data.events && data.events.length > 0) {
        setCurrentStep(`Đang upload ${data.events.length} sự kiện...`);
        const eventsResult: MigrationResult = {
          type: 'Sự kiện',
          success: 0,
          failed: 0,
          errors: []
        };

        for (const event of data.events) {
          try {
            await saveEvent({
              id: event.id,
              title: event.title,
              description: event.description,
              date: event.date,
              location: event.location,
              image: replaceImageUrl(event.image),
              category: event.category
            });
            eventsResult.success++;
          } catch (error: any) {
            eventsResult.failed++;
            eventsResult.errors.push(`${event.title}: ${error.message}`);
          }
        }
        migrationResults.push(eventsResult);
      }

      // Migrate Teachers
      if (data.teachers && data.teachers.length > 0) {
        setCurrentStep(`Đang upload ${data.teachers.length} giáo viên...`);
        const teachersResult: MigrationResult = {
          type: 'Giáo viên',
          success: 0,
          failed: 0,
          errors: []
        };

        for (const teacher of data.teachers) {
          try {
            await saveTeacher({
              id: teacher.id,
              name: teacher.name,
              subject: teacher.subject,
              image: replaceImageUrl(teacher.image),
              bio: teacher.bio,
              email: teacher.email,
              phone: teacher.phone
            });
            teachersResult.success++;
          } catch (error: any) {
            teachersResult.failed++;
            teachersResult.errors.push(`${teacher.name}: ${error.message}`);
          }
        }
        migrationResults.push(teachersResult);
      }

      // Migrate Clubs
      if (data.clubs && data.clubs.length > 0) {
        setCurrentStep(`Đang upload ${data.clubs.length} câu lạc bộ...`);
        const clubsResult: MigrationResult = {
          type: 'Câu lạc bộ',
          success: 0,
          failed: 0,
          errors: []
        };

        for (const club of data.clubs) {
          try {
            await saveClub({
              id: club.id,
              name: club.name,
              description: club.description,
              image: replaceImageUrl(club.image),
              members: club.members,
              advisor: club.advisor
            });
            clubsResult.success++;
          } catch (error: any) {
            clubsResult.failed++;
            clubsResult.errors.push(`${club.name}: ${error.message}`);
          }
        }
        migrationResults.push(clubsResult);
      }

      // Migrate Gallery
      if (data.gallery && data.gallery.length > 0) {
        setCurrentStep(`Đang upload ${data.gallery.length} ảnh thư viện...`);
        const galleryResult: MigrationResult = {
          type: 'Thư viện ảnh',
          success: 0,
          failed: 0,
          errors: []
        };

        for (const image of data.gallery) {
          try {
            await saveGalleryImage({
              id: image.id,
              url: replaceImageUrl(image.url),
              title: image.title,
              category: image.category,
              description: image.description
            });
            galleryResult.success++;
          } catch (error: any) {
            galleryResult.failed++;
            galleryResult.errors.push(`${image.title}: ${error.message}`);
          }
        }
        migrationResults.push(galleryResult);
      }

      // Migrate Achievements
      if (data.achievements && data.achievements.length > 0) {
        setCurrentStep(`Đang upload ${data.achievements.length} thành tích...`);
        const achievementsResult: MigrationResult = {
          type: 'Thành tích',
          success: 0,
          failed: 0,
          errors: []
        };

        for (const achievement of data.achievements) {
          try {
            await saveAchievement({
              id: achievement.id,
              title: achievement.title,
              description: achievement.description,
              date: achievement.date,
              category: achievement.category,
              image: replaceImageUrl(achievement.image),
              students: achievement.students
            });
            achievementsResult.success++;
          } catch (error: any) {
            achievementsResult.failed++;
            achievementsResult.errors.push(`${achievement.title}: ${error.message}`);
          }
        }
        migrationResults.push(achievementsResult);
      }

      // Migrate Digital Library
      if (data.digitalLibrary && data.digitalLibrary.length > 0) {
        setCurrentStep(`Đang upload ${data.digitalLibrary.length} tài liệu thư viện...`);
        const digitalLibraryResult: MigrationResult = {
          type: 'Thư viện số',
          success: 0,
          failed: 0,
          errors: []
        };

        for (const item of data.digitalLibrary) {
          try {
            await saveLibraryDocument({
              id: item.id,
              title: item.title,
              description: item.description,
              category: item.category,
              file_url: item.fileUrl,
              cover_image: replaceImageUrl(item.coverImage),
              author: item.author,
              upload_date: item.uploadDate
            });
            digitalLibraryResult.success++;
          } catch (error: any) {
            digitalLibraryResult.failed++;
            digitalLibraryResult.errors.push(`${item.title}: ${error.message}`);
          }
        }
        migrationResults.push(digitalLibraryResult);
      }

      // Migrate Student Portal
      if (data.studentPortal && data.studentPortal.length > 0) {
        setCurrentStep(`Đang upload ${data.studentPortal.length} tài liệu cổng học sinh...`);
        const studentPortalResult: MigrationResult = {
          type: 'Cổng học sinh',
          success: 0,
          failed: 0,
          errors: []
        };

        for (const item of data.studentPortal) {
          try {
            await saveStudentPortalData({
              id: item.id,
              title: item.title,
              description: item.description,
              category: item.category,
              link: item.link,
              icon: item.icon
            });
            studentPortalResult.success++;
          } catch (error: any) {
            studentPortalResult.failed++;
            studentPortalResult.errors.push(`${item.title}: ${error.message}`);
          }
        }
        migrationResults.push(studentPortalResult);
      }

      setResults(migrationResults);
      setCurrentStep('Hoàn thành!');
    } catch (error: any) {
      console.error('Migration error:', error);
      setCurrentStep(`Lỗi: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getTotalSuccess = () => results.reduce((sum, r) => sum + r.success, 0);
  const getTotalFailed = () => results.reduce((sum, r) => sum + r.failed, 0);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-3 mb-6">
          <Database className="w-8 h-8 text-primary-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Đẩy dữ liệu lên Supabase</h1>
            <p className="text-gray-600 mt-1">Upload toàn bộ dữ liệu từ school-data.json lên database</p>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <p className="font-semibold mb-1">Lưu ý:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Tất cả ảnh sẽ được upload lên Supabase Storage trước</li>
                <li>Dữ liệu sẽ được đồng bộ từ file <code className="bg-yellow-100 px-1 rounded">public/data/school-data.json</code></li>
                <li>Nếu dữ liệu đã tồn tại (cùng ID), nó sẽ được cập nhật</li>
                <li>Quá trình có thể mất vài phút tùy thuộc vào lượng dữ liệu và ảnh</li>
              </ul>
            </div>
          </div>
        </div>

        <button
          onClick={migrateData}
          disabled={loading}
          className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              Đang xử lý...
            </>
          ) : (
            <>
              <Upload className="w-5 h-5" />
              Bắt đầu đẩy dữ liệu
            </>
          )}
        </button>

        {currentStep && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800 font-medium">{currentStep}</p>
          </div>
        )}
      </div>

      {results.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Kết quả</h2>

          {/* Image Upload Results */}
          {imageResults.length > 0 && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <ImageIcon className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-blue-900">Upload ảnh lên Supabase Storage</h3>
              </div>
              <div className="flex items-center gap-4 text-sm mb-2">
                <span className="text-green-600">✓ {imageResults.filter(r => r.success).length} thành công</span>
                <span className="text-red-600">✗ {imageResults.filter(r => !r.success).length} thất bại</span>
              </div>
              {imageResults.filter(r => !r.success).length > 0 && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-sm text-red-700 font-medium">
                    Xem ảnh upload thất bại
                  </summary>
                  <ul className="mt-2 space-y-1 text-sm text-red-600 list-disc list-inside">
                    {imageResults.filter(r => !r.success).map((result, i) => (
                      <li key={i}>{result.originalUrl}: {result.error}</li>
                    ))}
                  </ul>
                </details>
              )}
            </div>
          )}

          {/* Data Migration Results */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <div>
                  <p className="text-sm text-green-600 font-medium">Dữ liệu thành công</p>
                  <p className="text-2xl font-bold text-green-900">{getTotalSuccess()}</p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <XCircle className="w-6 h-6 text-red-600" />
                <div>
                  <p className="text-sm text-red-600 font-medium">Dữ liệu thất bại</p>
                  <p className="text-2xl font-bold text-red-900">{getTotalFailed()}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {results.map((result, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{result.type}</h3>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-green-600">✓ {result.success}</span>
                    {result.failed > 0 && (
                      <span className="text-red-600">✗ {result.failed}</span>
                    )}
                  </div>
                </div>

                {result.errors.length > 0 && (
                  <div className="mt-2 p-2 bg-red-50 rounded text-sm">
                    <p className="font-medium text-red-800 mb-1">Lỗi:</p>
                    <ul className="list-disc list-inside space-y-1 text-red-700">
                      {result.errors.map((error, i) => (
                        <li key={i}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DataMigration;
