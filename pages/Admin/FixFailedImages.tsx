import React, { useState } from 'react';
import { Upload, CheckCircle, XCircle, Loader, RefreshCw } from 'lucide-react';
// import { uploadImageFromUrl } from '../../services/supabaseStorage';
// import { saveGalleryImage } from '../../services/supabaseService';

interface FailedImage {
  url: string;
  reason: string;
}

const FixFailedImages: React.FC = () => {
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState<Array<{ url: string; success: boolean; newUrl?: string; error?: string }>>([]);

  // Images that failed to upload due to MIME type issues
  const failedImages: FailedImage[] = [
    {
      url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=400&auto=format&fit=crop',
      reason: 'mime type text/html is not supported'
    },
    {
      url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop',
      reason: 'mime type text/html is not supported'
    }
  ];

  const handleRetryUpload = async () => {
    setUploading(true);
    const uploadResults: Array<{ url: string; success: boolean; newUrl?: string; error?: string }> = [];

    for (const failed of failedImages) {
      try {
        console.log(`🔄 Retrying: ${failed.url}`);
        
        // Try with different approach - add cache buster
        const urlWithCacheBuster = `${failed.url}&_=${Date.now()}`;
        
        // Upload using the new function
        const newUrl = await uploadImageFromUrl(urlWithCacheBuster, 'images');

        // Save to database
        await saveGalleryImage({
          id: `gallery-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          url: newUrl,
          title: 'Reupload - Logo/Building',
          category: 'images',
          description: `Reupload successful on ${new Date().toLocaleDateString('vi-VN')}`,
          uploaded_at: new Date().toISOString()
        });

        uploadResults.push({
          url: failed.url,
          success: true,
          newUrl
        });

        console.log(`✅ Successfully reupload: ${failed.url}`);
      } catch (error: any) {
        uploadResults.push({
          url: failed.url,
          success: false,
          error: error.message
        });

        console.error(`❌ Failed to reupload: ${failed.url}`, error);
      }
    }

    setResults(uploadResults);
    setUploading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-full">
                <RefreshCw className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
              Fix Failed Image Uploads
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Retry uploading images that failed due to MIME type issues
            </p>
          </div>

          {/* Failed Images List */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Failed Images ({failedImages.length})
            </h2>
            
            <div className="space-y-3">
              {failedImages.map((img, idx) => (
                <div key={idx} className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-sm font-mono text-slate-700 dark:text-slate-300 break-all mb-2">
                    {img.url}
                  </p>
                  <p className="text-sm text-red-600 dark:text-red-400">
                    ❌ {img.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="mb-8">
            <button
              onClick={handleRetryUpload}
              disabled={uploading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition"
            >
              {uploading ? (
                <>
                  <Loader className="h-5 w-5 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-5 w-5" />
                  Retry Upload ({failedImages.length} images)
                </>
              )}
            </button>
          </div>

          {/* Results */}
          {results.length > 0 && (
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Upload Results
              </h2>

              <div className="space-y-3">
                {results.map((result, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg border-l-4 ${
                      result.success
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-500'
                        : 'bg-red-50 dark:bg-red-900/20 border-red-500'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {result.success ? (
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
                      )}
                      <div className="flex-grow">
                        <p className="text-sm font-mono text-slate-700 dark:text-slate-300 break-all mb-1">
                          {result.url}
                        </p>
                        {result.success && result.newUrl && (
                          <div className="mt-2">
                            <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">New URL:</p>
                            <p className="text-xs font-mono text-green-600 dark:text-green-400 break-all">
                              {result.newUrl}
                            </p>
                            <a
                              href={result.newUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-600 dark:text-blue-400 hover:underline mt-2 inline-block"
                            >
                              View in Supabase Storage →
                            </a>
                          </div>
                        )}
                        {!result.success && result.error && (
                          <p className="text-sm text-red-600 dark:text-red-400">
                            Error: {result.error}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                      {results.filter(r => r.success).length}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Successful</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                      {results.filter(r => !r.success).length}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Failed</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">ℹ️ What's happening:</h3>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• Fetching images from Unsplash with proper headers</li>
              <li>• Verifying MIME type is valid (image/jpeg, image/png, etc.)</li>
              <li>• Uploading to Supabase Storage</li>
              <li>• Saving to database with new Supabase URLs</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixFailedImages;
