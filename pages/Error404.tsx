import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react';

const Error404: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <AlertTriangle className="h-20 w-20 text-yellow-400 mx-auto mb-4" />
          <h1 className="text-6xl font-bold text-white mb-4">404</h1>
          <h2 className="text-2xl font-bold text-white mb-2">Không tìm thấy trang</h2>
          <p className="text-slate-300 mb-8">Trang bạn tìm kiếm có thể đã bị xóa hoặc không tồn tại.</p>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
          >
            <Home className="h-5 w-5" />
            Về Trang chủ
          </button>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-medium px-6 py-3 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Quay lại
          </button>
        </div>

        <div className="mt-12 p-6 bg-slate-800 rounded-lg border border-slate-700">
          <p className="text-slate-400 text-sm">
            Nếu bạn cho rằng đây là lỗi, vui lòng <br />
            <a href="/lien-he" className="text-primary-400 hover:text-primary-300 underline">
              liên hệ với chúng tôi
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Error404;
