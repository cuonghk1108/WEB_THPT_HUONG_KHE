import React, { useEffect, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import ErrorBoundary from './components/ErrorBoundary';
import { DataProvider, useData } from './context/DataContext';
import { DarkModeProvider } from './context/DarkModeContext';
import FaviconUpdater from './components/FaviconUpdater';
// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'));
const Introduction = lazy(() => import('./pages/Introduction'));
const Admissions = lazy(() => import('./pages/Admissions'));
const Contact = lazy(() => import('./pages/Contact'));
const News = lazy(() => import('./pages/News'));
const Documents = lazy(() => import('./pages/Documents'));
const Teachers = lazy(() => import('./pages/Teachers'));
const StudentCorner = lazy(() => import('./pages/StudentCorner'));
const Clubs = lazy(() => import('./pages/Clubs'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Events = lazy(() => import('./pages/Events'));
const StudentPortal = lazy(() => import('./pages/StudentPortal'));
const DigitalLibrary = lazy(() => import('./pages/DigitalLibrary'));
const LunchMenu = lazy(() => import('./pages/LunchMenu'));
const Achievements = lazy(() => import('./pages/Achievements'));
const DarkModeTest = lazy(() => import('./pages/DarkModeTest'));
const Dashboard = lazy(() => import('./pages/Admin/Dashboard'));

// Admin Imports (lazy)
const Login = lazy(() => import('./pages/Admin/Login'));
const AdminLayout = lazy(() => import('./pages/Admin/AdminLayout'));
const NewsManager = lazy(() => import('./pages/Admin/NewsManager'));
const ImageManager = lazy(() => import('./pages/Admin/ImageManager'));
const TeacherManager = lazy(() => import('./pages/Admin/TeacherManager'));
const ClubManager = lazy(() => import('./pages/Admin/ClubManager'));
const GalleryManager = lazy(() => import('./pages/Admin/GalleryManager'));
const StudentCornerManager = lazy(() => import('./pages/Admin/StudentCornerManager'));
const AchievementManager = lazy(() => import('./pages/Admin/AchievementManager'));
const DigitalLibraryManager = lazy(() => import('./pages/Admin/DigitalLibraryManager'));
const StudentPortalManager = lazy(() => import('./pages/Admin/StudentPortalManager'));
const Settings = lazy(() => import('./pages/Admin/Settings'));

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
      <FaviconUpdater />
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
    <ErrorBoundary>
      <DataProvider>
        <DarkModeProvider>
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
                <Route path="/cong-hoc-sinh" element={<StudentPortal />} />
                <Route path="/cau-lac-bo" element={<Clubs />} />
                <Route path="/thu-vien-anh" element={<Gallery />} />
                <Route path="/su-kien" element={<Events />} />
                <Route path="/thanh-tich" element={<Achievements />} />
                <Route path="/thuc-don" element={<LunchMenu />} />
                <Route path="/thu-vien" element={<DigitalLibrary />} />
                <Route path="/test-darkmode" element={<DarkModeTest />} />
              </Route>

              {/* Admin Routes */}
              <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="/admin/login" element={<Login />} />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                 <Route path="dashboard" element={<Dashboard />} />
                 <Route path="news" element={<NewsManager />} />
                 <Route path="images" element={<ImageManager />} />
                 <Route path="teachers" element={<TeacherManager />} />
                 <Route path="clubs" element={<ClubManager />} />
                 <Route path="gallery" element={<GalleryManager />} />
                 <Route path="achievements" element={<AchievementManager />} />
                 <Route path="digital-library" element={<DigitalLibraryManager />} />
                 <Route path="student-corner" element={<StudentCornerManager />} />
                 <Route path="student-portal" element={<StudentPortalManager />} />
                 <Route path="settings" element={<Settings />} />
                 <Route path="*" element={<Navigate to="dashboard" replace />} />
              </Route>

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </DarkModeProvider>
      </DataProvider>
    </ErrorBoundary>
  );
};

export default App;
