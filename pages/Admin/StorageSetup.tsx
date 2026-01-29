import React, { useState } from 'react';
import { Database, CheckCircle, XCircle, Loader, AlertTriangle, ExternalLink } from 'lucide-react';

const StorageSetup: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const setupStorage = async () => {
    setLoading(true);
    setResult(null);
    setError('');

    try {
      console.log('🔧 Bắt đầu thiết lập storage...');
      
      const response = await fetch('/api/setup-storage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('📡 Response status:', response.status);
      
      const data = await response.json();
      console.log('📦 Response data:', data);

      if (!response.ok) {
        throw new Error(data.error || data.details || `HTTP ${response.status}: Failed to setup storage`);
      }

      setResult(data);
      console.log('✅ Storage setup thành công!');
    } catch (err: any) {
      console.error('❌ Setup error:', err);
      setError(err.message || 'Không thể kết nối đến server upload! Vui lòng thử lại hoặc chạy SQL thủ công.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-3 mb-6">
          <Database className="w-8 h-8 text-primary-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Thiết lập Supabase Storage</h1>
            <p className="text-gray-600 mt-1">Tự động tạo bucket "images" với quyền public</p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">Chức năng này sẽ:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Tạo bucket "images" trong Supabase Storage (nếu chưa có)</li>
                <li>Bật chế độ Public cho bucket</li>
                <li>Thiết lập policies cho phép public đọc ảnh</li>
                <li>Cho phép upload/update/delete ảnh (authenticated users)</li>
              </ul>
            </div>
          </div>
        </div>

        <button
          onClick={setupStorage}
          disabled={loading}
          className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              Đang thiết lập...
            </>
          ) : (
            <>
              <Database className="w-5 h-5" />
              Thiết lập Storage
            </>
          )}
        </button>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start gap-2">
              <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <p className="text-red-800 font-semibold">Lỗi thiết lập</p>
                <p className="text-red-700 text-sm mt-1">{error}</p>
                
                <div className="mt-3 p-3 bg-red-100 rounded text-xs text-red-900">
                  <p className="font-semibold mb-2">💡 Cách khắc phục:</p>
                  <ol className="list-decimal list-inside space-y-1 mb-2">
                    <li>Mở Console (F12) → Tab "Console" để xem chi tiết lỗi</li>
                    <li>
                      Kiểm tra Vercel Environment Variables:
                      <br />
                      <a 
                        href="https://vercel.com/cuongs-projects-00393bae/ai/settings/environment-variables"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 hover:underline inline-flex items-center gap-1"
                      >
                        Vercel Env Settings
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </li>
                    <li>
                      Đảm bảo có 3 biến:
                      <ul className="list-disc list-inside ml-4">
                        <li>VITE_SUPABASE_URL</li>
                        <li>VITE_SUPABASE_ANON_KEY</li>
                        <li>SUPABASE_SERVICE_ROLE_KEY</li>
                      </ul>
                    </li>
                    <li>Nếu vẫn lỗi, chạy SQL thủ công bên dưới</li>
                  </ol>
                  
                  <p className="font-semibold mt-2 mb-1">🔧 Hoặc chạy SQL thủ công:</p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>
                      Vào{' '}
                      <a 
                        href="https://supabase.com/dashboard/project/vicqpnikodxcncyappes/sql/new"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 hover:underline inline-flex items-center gap-1"
                      >
                        Supabase SQL Editor
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </li>
                    <li>Paste SQL commands từ bên dưới</li>
                    <li>Click "Run" để chạy</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        )}

        {result && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-green-800 font-semibold">Thiết lập thành công!</p>
                <p className="text-green-700 text-sm mt-1">{result.message}</p>

                {result.bucket && (
                  <div className="mt-3 p-3 bg-green-100 rounded text-sm">
                    <p className="font-semibold text-green-900 mb-1">Thông tin Bucket:</p>
                    <ul className="space-y-1 text-green-800">
                      <li>• Tên: <code className="bg-green-200 px-1 rounded">{result.bucket.name}</code></li>
                      <li>• Trạng thái: {result.bucket.exists ? '✓ Đã tồn tại' : '✓ Mới tạo'}</li>
                      <li>• Public: {result.bucket.public ? '✓ Có' : '✗ Không'}</li>
                    </ul>
                  </div>
                )}

                {result.policies && result.policies.length > 0 && (
                  <div className="mt-3 p-3 bg-white border border-green-200 rounded text-sm">
                    <p className="font-semibold text-gray-900 mb-2">Policies:</p>
                    <div className="space-y-1">
                      {result.policies.map((policy: any, index: number) => (
                        <div key={index} className="flex items-center gap-2 text-xs">
                          {policy.status === 'created' && (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          )}
                          {policy.status.includes('pending') && (
                            <AlertTriangle className="w-4 h-4 text-yellow-600" />
                          )}
                          {policy.status === 'error' && (
                            <XCircle className="w-4 h-4 text-red-600" />
                          )}
                          <span className={
                            policy.status === 'created' ? 'text-green-700' :
                            policy.status.includes('pending') ? 'text-yellow-700' :
                            'text-red-700'
                          }>
                            {policy.policy}: {policy.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Show SQL commands if policies need manual setup */}
                {result.sqlCommands && result.sqlCommands.length > 0 && 
                 result.policies.some((p: any) => p.status.includes('pending')) && (
                  <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
                    <p className="font-semibold text-yellow-900 text-sm mb-2">
                      Chạy SQL này trong Supabase SQL Editor:
                    </p>
                    <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs overflow-x-auto">
                      <pre>{result.sqlCommands.join('\n\n')}</pre>
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(result.sqlCommands.join('\n\n'));
                        alert('Đã copy SQL commands!');
                      }}
                      className="mt-2 px-3 py-1 bg-yellow-600 text-white text-xs rounded hover:bg-yellow-700"
                    >
                      Copy SQL
                    </button>
                    <a
                      href="https://supabase.com/dashboard/project/vicqpnikodxcncyappes/sql/new"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 inline-flex items-center gap-1"
                    >
                      Mở SQL Editor
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}

                {result.instructions && (
                  <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm">
                    <AlertTriangle className="w-4 h-4 text-yellow-600 inline mr-2" />
                    <span className="text-yellow-800">{result.instructions}</span>
                  </div>
                )}

                <div className="mt-4">
                  <a
                    href="https://supabase.com/dashboard/project/vicqpnikodxcncyappes/storage/buckets"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    Mở Supabase Storage Dashboard
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-3">Hướng dẫn sử dụng</h2>
        <div className="prose prose-sm max-w-none text-gray-700">
          <ol className="space-y-2">
            <li>Click nút "Thiết lập Storage" ở trên</li>
            <li>Đợi hệ thống tự động tạo bucket và policies</li>
            <li>Sau khi hoàn tất, vào trang <a href="/admin/data-migration" className="text-primary-600 hover:underline">Data Migration</a></li>
            <li>Click "Bắt đầu đẩy dữ liệu" để upload toàn bộ ảnh và dữ liệu</li>
            <li>Ảnh sẽ tự động hiển thị trên web sau khi upload thành công</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default StorageSetup;
