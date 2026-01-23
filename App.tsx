import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import Introduction from './pages/Introduction';
import Admissions from './pages/Admissions';
import Contact from './pages/Contact';
import News from './pages/News';
import Documents from './pages/Documents';
import Teachers from './pages/Teachers';
import StudentCorner from './pages/StudentCorner';
import Clubs from './pages/Clubs';
import Gallery from './pages/Gallery';

// Admin Imports
import Login from './pages/Admin/Login';
import AdminLayout from './pages/Admin/AdminLayout';
import NewsManager from './pages/Admin/NewsManager';
import ImageManager from './pages/Admin/ImageManager';
import TeacherManager from './pages/Admin/TeacherManager';
import ClubManager from './pages/Admin/ClubManager';
import GalleryManager from './pages/Admin/GalleryManager';
import Settings from './pages/Admin/Settings';
import { DataProvider, useData } from './context/DataContext';

// ScrollToTop Component handles window scroll on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Layout for Public Site (Header + Footer)
const PublicLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-800">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useData();
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <DataProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/gioi-thieu" element={<Introduction />} />
            <Route path="/tuyen-sinh" element={<Admissions />} />
            <Route path="/tin-tuc" element={<News />} />
            <Route path="/van-ban" element={<Documents />} />
            <Route path="/lien-he" element={<Contact />} />
            <Route path="/giao-vien" element={<Teachers />} />
            <Route path="/hoc-sinh" element={<StudentCorner />} />
            <Route path="/cau-lac-bo" element={<Clubs />} />
            <Route path="/thu-vien-anh" element={<Gallery />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
             <Route path="dashboard" element={<div className="p-8 text-center text-slate-500">Chào mừng đến với trang quản trị! Chọn các mục bên trái để bắt đầu chỉnh sửa nội dung website.</div>} />
             <Route path="news" element={<NewsManager />} />
             <Route path="images" element={<ImageManager />} />
             <Route path="teachers" element={<TeacherManager />} />
             <Route path="clubs" element={<ClubManager />} />
             <Route path="gallery" element={<GalleryManager />} />
             <Route path="settings" element={<Settings />} />
             <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
};

export default App;
