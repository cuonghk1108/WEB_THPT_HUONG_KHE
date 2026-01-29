import React, { useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Settings, LogOut, Bot, Users, Image as ImageIcon, BookOpen, Award, Library, Notebook, Database, HardDrive } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { ensureFaviconLinks, updateFaviconHref } from '../../utils/favicon';

const AdminLayout: React.FC = () => {
  const { logout, globalImages } = useData();
  const navigate = useNavigate();

  useEffect(() => {
    ensureFaviconLinks();
    if (globalImages?.logo) {
      updateFaviconHref(globalImages.logo);
    }
  }, [globalImages?.logo]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItemClass = ({ isActive }: { isActive: boolean }) => 
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${isActive ? 'bg-primary-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'}`;

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white text-slate-900 flex flex-col fixed h-full z-10 shadow-lg border-r border-slate-200">
        <div className="p-6 flex items-center gap-3 border-b border-slate-200">
          {globalImages?.logo ? (
            <img
              src={globalImages.logo}
              alt="Logo"
              className="h-11 w-11 rounded-lg object-cover border border-slate-300"
              loading="lazy"
            />
          ) : (
            <div className="bg-primary-600 p-2 rounded-lg shadow-lg shadow-primary-500/30">
               <Bot className="h-6 w-6 text-white" />
            </div>
          )}
          <div>
            <h1 className="font-bold font-heading text-slate-900 tracking-wide">Admin Panel</h1>
            <p className="text-xs text-slate-600 font-medium">THPT Hương Khê</p>
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

          <NavLink to="/admin/achievements" className={navItemClass}>
            <Award className="h-5 w-5" /> Thành tích
          </NavLink>

          <NavLink to="/admin/digital-library" className={navItemClass}>
            <Library className="h-5 w-5" /> Thư viện số
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

          <NavLink to="/admin/student-portal" className={navItemClass}>
            <Notebook className="h-5 w-5" /> Cổng học sinh
          </NavLink>

          <div className="pt-4 pb-2 px-4 text-xs font-bold uppercase text-slate-500 tracking-wider">Hệ thống</div>
          <NavLink to="/admin/storage-setup" className={navItemClass}>
            <HardDrive className="h-5 w-5" /> Thiết lập Storage
          </NavLink>
          <NavLink to="/admin/data-migration" className={navItemClass}>
            <Database className="h-5 w-5" /> Đẩy dữ liệu
          </NavLink>
          <NavLink to="/admin/bulk-upload" className={navItemClass}>
            <ImageIcon className="h-5 w-5" /> Upload ảnh
          </NavLink>
           <NavLink to="/admin/settings" className={navItemClass}>
            <Settings className="h-5 w-5" /> Cấu hình
          </NavLink>
        </nav>

        <div className="p-4 border-t border-slate-200">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 w-full rounded-lg transition-colors font-medium">
            <LogOut className="h-5 w-5" /> Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto bg-slate-50">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
