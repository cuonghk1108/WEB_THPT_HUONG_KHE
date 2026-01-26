import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { NAV_LINKS, SCHOOL_NAME } from '../constants';
import { useData } from '../context/DataContext';
import { useDarkMode } from '../context/DarkModeContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { globalImages } = useData();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

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
        className={`fixed top-0 w-full z-50 transition-all duration-300 ease-out ${
          scrolled 
            ? 'bg-white dark:bg-slate-950/90 backdrop-blur-md shadow-md py-3' 
            : 'bg-white dark:bg-transparent py-6'
        }`}
        style={{ willChange: 'padding, background-color, box-shadow' }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
<div className={`flex justify-between items-center bg-white dark:bg-slate-900/30 backdrop-blur-sm border border-transparent dark:border-slate-700/40 rounded-full px-6 py-2 transition-colors duration-200 ease-out shadow-none dark:shadow-none`}>
            
            {/* Logo Section */}
            <Link to="/" onClick={handleLinkClick} className="flex items-center space-x-3 cursor-pointer group">
              <img 
                src={globalImages.logo} 
                alt="Logo THPT Hương Khê" 
                className={`h-8 w-8 object-cover transition-transform duration-300 group-hover:scale-110 ${
                  scrolled ? 'rotate-0' : '-rotate-3'
                }`}
                style={{ willChange: 'transform' }}
              /> 
              <div className="flex flex-col">
                <h1 className={`text-xl font-bold font-heading leading-none transition-colors duration-200 ${scrolled ? 'text-slate-900 dark:text-white' : 'text-slate-800 dark:text-slate-100'}`}>
                  {SCHOOL_NAME}
                </h1>
                <span className="text-[9px] font-bold tracking-wide text-primary-600 uppercase mt-0.5">60 NĂM HÌNH THÀNH VÀ PHÁT TRIỂN</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 bg-white dark:bg-slate-800/50 p-1.5 rounded-full border border-transparent dark:border-slate-700/50 backdrop-blur-sm">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={handleLinkClick}
                  className={({ isActive }) => `px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 ease-out ${
                    isActive 
                      ? 'bg-white dark:bg-slate-700 text-primary-700 dark:text-white shadow-md transform scale-105' 
                      : 'text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-white/60 dark:hover:bg-slate-700/60 hover:scale-105'
                  }`}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Mobile Menu Button & Dark Mode */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={toggleDarkMode}
                className="text-slate-900 dark:text-yellow-400 hover:text-primary-600 dark:hover:text-yellow-300 focus:outline-none p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title={isDarkMode ? 'Light mode' : 'Dark mode'}
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <button
                onClick={toggleMenu}
                className="text-slate-900 dark:text-slate-100 hover:text-primary-600 dark:hover:text-primary-400 focus:outline-none p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

            {/* Dark Mode Toggle (Desktop) */}
            <button
              onClick={toggleDarkMode}
              className="hidden md:flex items-center justify-center text-slate-900 dark:text-yellow-400 hover:text-primary-600 dark:hover:text-yellow-300 focus:outline-none p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={isDarkMode ? 'Light mode' : 'Dark mode'}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <>
          <div 
            className="fixed inset-0 z-40 bg-black/30 dark:bg-black/50 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
          <nav className="fixed left-0 right-0 top-20 z-50 md:hidden bg-white dark:bg-slate-800 shadow-2xl border-t border-slate-200 dark:border-slate-700">
            <div className="px-4 py-4 space-y-2 max-h-96 overflow-y-auto">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={handleLinkClick}
                  className={({ isActive }) => `block px-4 py-3 rounded-lg font-semibold transition-all ${
                    isActive 
                      ? 'bg-primary-600 text-white shadow-md' 
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </nav>
        </>
      )}
    </>
  );
};

export default Header;