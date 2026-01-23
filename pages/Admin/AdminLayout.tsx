import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Settings, LogOut, Bot, Users, Image as ImageIcon, BookOpen } from 'lucide-react';
import { useData } from '../../context/DataContext';

const AdminLayout: React.FC = () => {
  const { logout } = useData();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItemClass = ({ isActive }: { isActive: boolean }) => 
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${isActive ? 'bg-primary-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`;

  return (
    <div className="flex h-screen bg-white dark:bg-slate-900 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col fixed h-full z-10 shadow-2xl">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="bg-primary-600 p-2 rounded-lg shadow-lg shadow-primary-500/30">
             <Bot className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold font-heading text-white tracking-wide">Admin Panel</h1>
            <p className="text-xs text-slate-300 font-medium">THPT Hương Khê</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <NavLink to="/admin/dashboard" className={navItemClass}>
            <LayoutDashboard className="h-5 w-5" /> Tổng quan
          </NavLink>
          
          <div className="pt-4 pb-2 px-4 text-xs font-bold uppercase text-slate-500 tracking-wider">Nội dung</div>
          
          <NavLink to="/admin/news" className={navItemClass}>
            <FileText className="h-5 w-5" /> Quản lý Tin tức
          </NavLink>
          <NavLink to="/admin/images" className={navItemClass}>
            <ImageIcon className="h-5 w-5" /> Hình ảnh chung
          </NavLink>
          <NavLink to="/admin/gallery" className={navItemClass}>
            <ImageIcon className="h-5 w-5" /> Thư viện ảnh
          </NavLink>

          <div className="pt-4 pb-2 px-4 text-xs font-bold uppercase text-slate-500 tracking-wider">Dữ liệu</div>
          
          <NavLink to="/admin/teachers" className={navItemClass}>
            <Users className="h-5 w-5" /> Đội ngũ giáo viên
          </NavLink>
          <NavLink to="/admin/clubs" className={navItemClass}>
            <Users className="h-5 w-5" /> Câu lạc bộ
          </NavLink>
          <NavLink to="/admin/student-corner" className={navItemClass}>
            <BookOpen className="h-5 w-5" /> Góc học sinh
          </NavLink>

          <div className="pt-4 pb-2 px-4 text-xs font-bold uppercase text-slate-500 tracking-wider">Hệ thống</div>
           <NavLink to="/admin/settings" className={navItemClass}>
            <Settings className="h-5 w-5" /> Cấu hình
          </NavLink>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-red-300 hover:bg-red-500/20 hover:text-red-200 w-full rounded-lg transition-colors font-medium">
            <LogOut className="h-5 w-5" /> Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
