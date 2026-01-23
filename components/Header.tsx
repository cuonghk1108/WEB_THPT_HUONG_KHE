import React, { useState, useEffect } from 'react';
import { Menu, X, GraduationCap } from 'lucide-react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { NAV_LINKS, SCHOOL_NAME } from '../constants';
import { useData } from '../context/DataContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { globalImages, imageVersion, getImageSrc } = useData();
  const logoSrc = getImageSrc(globalImages.logo);

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
            <Link to="/" onClick={handleLinkClick} className="flex items-center space-x-2 md:space-x-3 cursor-pointer group">
              <div className={`relative overflow-hidden rounded-xl transition-all duration-500 shadow-lg group-hover:scale-110 ${
                scrolled 
                  ? 'bg-gradient-to-br from-primary-600 to-primary-800 rotate-0' 
                  : 'bg-gradient-to-br from-primary-500 to-primary-700 -rotate-3'
              }`}>
                {globalImages.logo ? (
                  <img 
                    key={logoSrc}
                    src={logoSrc} 
                    alt="Logo THPT Hương Khê" 
                    className="h-6 w-6 md:h-8 md:w-8 object-cover" 
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        const icon = document.createElement('div');
                        icon.innerHTML = '<svg class="h-4 w-4 md:h-5 md:w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>';
                        parent.appendChild(icon.firstChild as Node);
                      }
                    }}
                  />
                ) : (
                  <GraduationCap className="h-4 w-4 md:h-5 md:w-5 text-white p-1.5 md:p-2" />
                )}
              </div>
              <div className="flex flex-col">
                <h1 className={`text-lg md:text-xl font-bold font-heading leading-none transition-colors ${scrolled ? 'text-slate-900' : 'text-slate-800'}`}>
                  <span className="hidden sm:inline">{SCHOOL_NAME}</span>
                  <span className="sm:hidden">THPT Hương Khê</span>
                </h1>
                <span className="text-[8px] md:text-[9px] font-bold tracking-wide text-primary-600 uppercase mt-0.5 hidden md:inline">60 NĂM HÌNH THÀNH VÀ PHÁT TRIỂN</span>
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
      <div className={`fixed inset-0 z-40 bg-white/95 backdrop-blur-xl transition-transform duration-500 ease-in-out md:hidden flex flex-col justify-center items-center space-y-8 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button
          onClick={toggleMenu}
          className="absolute top-6 right-6 text-slate-600 hover:text-slate-800 p-2"
        >
          <X className="h-8 w-8" />
        </button>
        <div className="flex items-center space-x-3 mb-8">
          <div className="h-10 w-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center overflow-hidden">
            {globalImages.logo ? (
              <img 
                key={logoSrc}
                src={logoSrc} 
                alt="Logo THPT Hương Khê" 
                className="h-full w-full object-cover" 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    const icon = document.createElement('div');
                    icon.innerHTML = '<svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>';
                    parent.appendChild(icon.firstChild as Node);
                  }
                }}
              />
            ) : (
              <GraduationCap className="h-6 w-6 text-white" />
            )}
          </div>
          <div className="text-center">
            <h2 className="text-lg font-bold text-slate-800">THPT Hương Khê</h2>
            <p className="text-xs text-primary-600">60 NĂM HÌNH THÀNH</p>
          </div>
        </div>
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