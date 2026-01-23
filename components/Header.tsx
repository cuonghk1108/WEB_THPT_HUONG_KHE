import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { NAV_LINKS, SCHOOL_NAME } from '../constants';
import { useData } from '../context/DataContext';

const Header: React.FC = () => {
  const { globalImages } = useData();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
    <header className="fixed top-0 w-full z-50 bg-transparent py-2">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-start items-center">
          <Link to="/" onClick={handleLinkClick} className="flex items-center cursor-pointer">
            <img src={globalImages.logo} alt="Logo THPT Hương Khê" className="h-12 w-12 object-contain" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;