import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { NAV_LINKS, SCHOOL_NAME } from '../constants';
import { useData } from '../context/DataContext';

const Header: React.FC = () => {
  const { globalImages } = useData();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
    // Dark mode state
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
          scrolled 
            ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex justify-between items-center bg-white/50 backdrop-blur-sm border border-white/40 rounded-full px-6 py-2 transition-all duration-300 ${scrolled ? 'bg-transparent border-none p-0' : 'shadow-sm'}`}>
            
            {/* Logo Section */}
            <Link to="/" onClick={handleLinkClick} className="flex items-center space-x-3 cursor-pointer group">

              <div className="transition-all duration-500 group-hover:scale-110 overflow-hidden">
                 <img src={globalImages.logo} alt="Logo THPT Hương Khê" className="h-8 w-8 object-cover" />
              </div>
              <div className="flex flex-col">
                <h1 className={`text-xl font-bold font-heading leading-none transition-colors ${scrolled ? 'text-slate-900' : 'text-slate-800'}`}>
                  {SCHOOL_NAME}
                </h1>
                <span className="text-[9px] font-bold tracking-wide text-primary-600 uppercase mt-0.5">60 NĂM HÌNH THÀNH VÀ PHÁT TRIỂN</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 bg-slate-100/50 p-1.5 rounded-full border border-slate-200/50 backdrop-blur-sm">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={handleLinkClick}
                  className={({ isActive }) => `px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                    isActive 
                      ? 'bg-white text-primary-700 shadow-md transform scale-105' 
                      : 'text-slate-600 hover:text-primary-600 hover:bg-white/60'
                  }`}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-slate-700 hover:text-primary-600 focus:outline-none p-2 rounded-full hover:bg-slate-100 transition-colors"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-white/95 backdrop-blur-xl transition-transform duration-500 ease-in-out md:hidden flex flex-col justify-center items-center space-y-6 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
         {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={handleLinkClick}
              className={({ isActive }) => `text-2xl font-bold transition-all ${
                isActive ? 'text-primary-600 scale-110' : 'text-slate-400 hover:text-slate-800'
              }`}
            >
              {link.label}
            </NavLink>
         ))}
      </div>
    </>
  );
};

export default Header;