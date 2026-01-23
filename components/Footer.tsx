import React, { useState, useEffect } from 'react';
  // Dark mode state (moved from Header)
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
        {/* Dark mode toggle in footer */}
        <div className="flex justify-center mb-6">
          <button
            className="darkmode-toggle relative"
            aria-label="Toggle dark mode"
            onClick={() => setDarkMode((d) => !d)}
          >
            <span className="font-bold text-xs mr-2">
              {darkMode ? 'Chế độ tối' : 'Chế độ sáng'}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              {darkMode ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0112 21.75c-5.385 0-9.75-4.365-9.75-9.75 0-4.136 2.635-7.626 6.348-9.049a.75.75 0 01.908.911A7.501 7.501 0 0019.5 12c0 1.61-.508 3.104-1.385 4.335a.75.75 0 01.911.908z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1.5m0 15V21m8.485-8.485l-1.06 1.06M4.515 4.515l1.06 1.06M21 12h-1.5M4.5 12H3m15.485 7.485l-1.06-1.06M4.515 19.485l1.06-1.06M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
              )}
            </svg>
          </button>
        </div>
import React from 'react';
import { MapPin, Phone, Mail, Facebook, Youtube, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SCHOOL_ADDRESS, SCHOOL_EMAIL, SCHOOL_NAME, SCHOOL_PHONE } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10 rounded-t-[3rem] mt-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* Column 1: School Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold font-heading mb-6 inline-block text-white">
              {SCHOOL_NAME}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Ngôi trường với bề dày lịch sử hơn 60 năm, nơi ươm mầm tài năng và nuôi dưỡng nhân cách cho thế hệ trẻ.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-slate-300">
                <div className="bg-white/10 p-2 rounded-full shrink-0">
                   <MapPin className="h-4 w-4" />
                </div>
                <span className="text-sm mt-1">{SCHOOL_ADDRESS}</span>
              </li>
              <li className="flex items-center space-x-3 text-slate-300">
                <div className="bg-white/10 p-2 rounded-full shrink-0">
                  <Phone className="h-4 w-4" />
                </div>
                <a href={`tel:${SCHOOL_PHONE}`} className="text-sm hover:text-white transition font-medium">{SCHOOL_PHONE}</a>
              </li>
              <li className="flex items-center space-x-3 text-slate-300">
                <div className="bg-white/10 p-2 rounded-full shrink-0">
                   <Mail className="h-4 w-4" />
                </div>
                <a href={`mailto:${SCHOOL_EMAIL}`} className="text-sm hover:text-white transition font-medium">{SCHOOL_EMAIL}</a>
              </li>
            </ul>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:pl-10">
            <h3 className="text-xl font-bold font-heading mb-8 text-white">
              Liên kết nhanh
            </h3>
            <ul className="space-y-3">
              {[
                { to: "/gioi-thieu", label: "Giới thiệu chung" },
                { to: "/tuyen-sinh", label: "Thông tin tuyển sinh" },
                { to: "/van-ban", label: "Văn bản - Tài liệu" },
                { to: "/tin-tuc", label: "Tin tức & Sự kiện" },
                { to: "/lien-he", label: "Gửi câu hỏi" },
              ].map((link, idx) => (
                 <li key={idx}>
                    <Link to={link.to} className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                      <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all duration-300" />
                      {link.label}
                    </Link>
                 </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Social & Map */}
          <div>
             <h3 className="text-xl font-bold font-heading mb-8 text-white">
              Kết nối
            </h3>
            <div className="flex space-x-4 mb-8">
              <a 
                href="https://www.facebook.com/BanTruyenThong.HuongKheHighSchool" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-600 p-3 rounded-full hover:bg-blue-700 transition transform hover:-translate-y-1 shadow-lg shadow-blue-900/50"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-red-600 p-3 rounded-full hover:bg-red-700 transition transform hover:-translate-y-1 shadow-lg shadow-red-900/50">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
            
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Giờ làm việc</p>
              <div className="text-slate-200 text-sm space-y-1">
                <p>Thứ 2 - Thứ 7</p>
                <p>Sáng: 7:00 - 11:30</p>
                <p>Chiều: 13:30 - 17:00</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} {SCHOOL_NAME}. All rights reserved.</p>
          <p className="mt-2 md:mt-0 font-medium opacity-70">Code by cuongdev1108 _ Team The First</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;