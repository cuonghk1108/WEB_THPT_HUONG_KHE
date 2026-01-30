import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Home, RefreshCw } from 'lucide-react';

interface Error500Props {
  error?: string;
}

const Error500: React.FC<Error500Props> = ({ error = 'Lỗi máy chủ nội bộ' }) => {
  const navigate = useNavigate();

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <AlertCircle className="h-20 w-20 text-red-400 mx-auto mb-4" />
          <h1 className="text-6xl font-bold text-white mb-4">500</h1>
          <h2 className="text-2xl font-bold text-white mb-2">Lỗi Máy Chủ</h2>
          <p className="text-slate-300 mb-8">{error}</p>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={handleReload}
            className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
          >
            <RefreshCw className="h-5 w-5" />
            Tải lại trang
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-medium px-6 py-3 rounded-lg transition-colors"
          >
            <Home className="h-5 w-5" />
            Về Trang chủ
          </button>
        </div>

        <div className="mt-12 p-6 bg-slate-800 rounded-lg border border-slate-700">
          <p className="text-slate-400 text-sm">
            Chúng tôi đã được thông báo về vấn đề này. <br />
            Vui lòng thử lại sau một vài phút.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Error500;
