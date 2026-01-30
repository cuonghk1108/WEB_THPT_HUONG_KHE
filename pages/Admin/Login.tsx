import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { AuthService } from '../../services/authService';
import { Lock, User, AlertCircle, Loader } from 'lucide-react';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useData();
  const navigate = useNavigate();

  // Check if already logged in
  useEffect(() => {
    if (AuthService.isAuthenticated()) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await AuthService.login(username, password);
      login();
      navigate('/admin/dashboard');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Đăng nhập thất bại';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-slate-200">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-heading text-slate-800">Đăng nhập Quản trị</h1>
          <p className="text-slate-500 text-sm mt-2">Hệ thống quản lý website THPT Hương Khê</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg text-sm flex gap-3">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Tên đăng nhập</label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none disabled:bg-slate-100"
                placeholder="admin"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Mật khẩu</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none disabled:bg-slate-100"
                placeholder="Nhập mật khẩu"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader className="h-5 w-5 animate-spin" />
                Đang xử lý...
              </>
            ) : (
              'Đăng nhập'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
