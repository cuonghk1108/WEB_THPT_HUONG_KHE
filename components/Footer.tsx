import React from 'react';
import { MapPin, Phone, Mail, Facebook, Youtube, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SCHOOL_ADDRESS, SCHOOL_EMAIL, SCHOOL_NAME, SCHOOL_PHONE } from '../constants';
import { VisitorCounter } from './VisitorCounter';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-white pt-20 pb-10 rounded-t-[3rem] mt-10 border-t border-slate-300 dark:border-slate-900">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* Column 1: School Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold font-heading mb-6 inline-block text-slate-900 dark:text-white">
              {SCHOOL_NAME}
            </h3>
            <p className="text-slate-600 dark:text-slate-500 text-sm leading-relaxed mb-6">
              Ngôi trường với bề dày lịch sử hơn 60 năm, nơi ươm mầm tài năng và nuôi dưỡng nhân cách cho thế hệ trẻ.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-slate-700 dark:text-slate-300">
                <div className="bg-blue-200 dark:bg-white/10 p-2 rounded-full shrink-0">
                   <MapPin className="h-4 w-4 text-blue-700 dark:text-white" />
                </div>
                <span className="text-sm mt-1">{SCHOOL_ADDRESS}</span>
              </li>
              <li className="flex items-center space-x-3 text-slate-700 dark:text-slate-300">
                <div className="bg-blue-200 dark:bg-white/10 p-2 rounded-full shrink-0">
                  <Phone className="h-4 w-4 text-blue-700 dark:text-white" />
                </div>
                <a href={`tel:${SCHOOL_PHONE}`} className="text-sm hover:text-slate-900 dark:hover:text-white transition font-medium">{SCHOOL_PHONE}</a>
              </li>
              <li className="flex items-center space-x-3 text-slate-700 dark:text-slate-300">
                <div className="bg-blue-200 dark:bg-white/10 p-2 rounded-full shrink-0">
                   <Mail className="h-4 w-4 text-blue-700 dark:text-white" />
                </div>
                <a href={`mailto:${SCHOOL_EMAIL}`} className="text-sm hover:text-slate-900 dark:hover:text-white transition font-medium">{SCHOOL_EMAIL}</a>
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
                    <Link to={link.to} className="group flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                      <ArrowRight className="h-3 w-3 text-slate-500 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all duration-300" />
                      {link.label}
                    </Link>
                 </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Social & Map */}
          <div>
             <h3 className="text-xl font-bold font-heading mb-8 text-slate-900 dark:text-white">
              Kết nối
            </h3>
            <div className="flex space-x-4 mb-8">
              <a 
                href="https://www.facebook.com/BanTruyenThong.HuongKheHighSchool" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-600 p-3 rounded-full hover:bg-blue-700 transition transform hover:-translate-y-1 shadow-lg shadow-blue-900/50"
              >
                <Facebook className="h-5 w-5 text-white" />
              </a>
              <a href="#" className="bg-red-600 p-3 rounded-full hover:bg-red-700 transition transform hover:-translate-y-1 shadow-lg shadow-red-900/50">
                <Youtube className="h-5 w-5 text-white" />
              </a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-200 dark:bg-white/5 p-6 rounded-2xl border border-slate-300 dark:border-white/10">
                <p className="text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Giờ làm việc</p>
                <div className="text-slate-700 dark:text-slate-200 text-sm space-y-1">
                  <p>Thứ 2 - Thứ 7</p>
                  <p>Sáng: 7:00 - 11:30</p>
                  <p>Chiều: 13:30 - 17:00</p>
                </div>
              </div>
              
              <VisitorCounter />
            </div>
          </div>
        </div>

        <div className="border-t border-slate-300 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-600 dark:text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} {SCHOOL_NAME}. All rights reserved.</p>
          <p className="mt-2 md:mt-0 font-medium opacity-70">Code by cuongdev1108 _ Team The First</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
