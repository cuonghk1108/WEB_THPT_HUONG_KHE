import React from 'react';
import { Users, BookOpen, Award, ArrowRight, Star, Sparkles, Trophy, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

const Home: React.FC = () => {
  const { news, globalImages } = useData();
  
  // Get top 3 latest news
  const homeNews = news.slice(0, 3);

  return (
    <div className="overflow-x-hidden bg-white dark:bg-slate-950">
      {/* Hero Section - Organic Shapes */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white dark:bg-slate-900">
        {/* Background Blobs */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-primary-100/50 dark:bg-primary-900/30 rounded-full blur-3xl opacity-60 animate-float"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-secondary-100/50 dark:bg-secondary-900/30 rounded-full blur-3xl opacity-60 animate-float" style={{ animationDelay: '2s' }}></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Text Content */}
            <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-primary-100 dark:border-primary-900 text-primary-700 dark:text-primary-400 text-sm font-bold shadow-sm animate-fade-in-up">
                <Sparkles className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span>Chào mừng năm học 2025 - 2026</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 dark:text-white leading-tight font-heading tracking-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                Ươm mầm <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">Tri Thức Việt</span>
              </h1>
              
              <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg mx-auto lg:mx-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Hơn 60 năm đồng hành cùng các thế hệ học sinh. Môi trường giáo dục thân thiện, hiện đại và đầy cảm hứng.
              </p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <Link to="/tuyen-sinh" className="group bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600 text-white font-bold py-4 px-8 rounded-full transition-all shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 hover:-translate-y-1 flex items-center gap-2">
                  Đăng ký tuyển sinh <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/gioi-thieu" className="bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold py-4 px-8 rounded-full border border-slate-200 dark:border-slate-700 transition-all hover:border-primary-300 dark:hover:border-primary-600 hover:text-primary-600 dark:hover:text-primary-400">
                  Về chúng tôi
                </Link>
              </div>
            </div>

            {/* Hero Image - Creative Shape */}
            <div className="lg:w-1/2 relative animate-fade-in-up flex justify-center lg:block" style={{ animationDelay: '0.4s' }}>
              <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary-900/10 border-8 border-white dark:border-slate-800">
                <img 
                  src={globalImages.homeHero || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1000&auto=format&fit=crop'} 
                  alt="Khuôn viên trường học" 
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-1000"
                />
              </div>
              {/* Decorative Elements */}
              <div className="absolute top-8 -right-4 lg:-right-8 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-float z-20 hidden md:flex">
                 <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-full">
                    <Trophy className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                 </div>
                 <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase">Thành tích</p>
                    <p className="font-bold text-slate-900 dark:text-white">Huân chương Lao động</p>
                 </div>
              </div>
              <div className="absolute -bottom-6 -left-4 lg:-left-8 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-float z-20 hidden md:flex" style={{ animationDelay: '1.5s' }}>
                 <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-full">
                    <Heart className="h-6 w-6 text-red-600 dark:text-red-400 fill-red-600 dark:fill-red-400" />
                 </div>
                 <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase">Hài lòng</p>
                    <p className="font-bold text-slate-900 dark:text-white">98% Phụ huynh</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Floating Cards */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: BookOpen, val: "60+", label: "Năm truyền thống", color: "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" },
              { icon: Users, val: "1500+", label: "Học sinh ưu tú", color: "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400" },
              { icon: Award, val: "100%", label: "Giáo viên đạt chuẩn", color: "bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400" }
            ].map((item, idx) => (
              <div key={idx} className="group bg-white p-8 rounded-[2rem] shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300 hover:-translate-y-2 border border-slate-100 dark:bg-slate-800 dark:border-slate-700 dark:shadow-slate-900/50">
                <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-2 font-heading">{item.val}</h3>
                <p className="text-lg font-medium text-slate-600 dark:text-slate-400">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principal's Message - Modern Quote */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-primary-900 to-slate-900 rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden shadow-2xl">
             {/* Background Pattern */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl -ml-16 -mb-16"></div>
             
             <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
               <div className="w-32 h-32 md:w-48 md:h-48 flex-shrink-0">
                  <img 
                    src={globalImages.principal}
                    alt="Hiệu trưởng" 
                    className="w-full h-full rounded-full border-4 border-white/20 shadow-lg object-cover" 
                  />
               </div>
               <div className="text-center md:text-left">
                 <Star className="h-8 w-8 text-yellow-400 fill-yellow-400 mb-6 mx-auto md:mx-0 opacity-80" />
                 <p className="text-2xl md:text-3xl font-light italic leading-relaxed mb-8 text-slate-100">
                   "Giáo dục không chỉ là việc truyền thụ kiến thức, mà là khơi dậy niềm đam mê sáng tạo và nuôi dưỡng tâm hồn nhân ái trong mỗi học sinh."
                 </p>
                 <div>
                   <h4 className="text-xl font-bold font-heading text-white">Thầy Hồ Đức Cương</h4>
                   <p className="text-primary-200">Hiệu trưởng nhà trường</p>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Latest News - Clean Grid */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <span className="inline-block py-1 px-3 rounded-full bg-primary-100 text-primary-700 text-xs font-bold uppercase tracking-wider mb-3">Tin tức & Sự kiện</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white font-heading">Hoạt động nổi bật</h2>
            </div>
            <Link to="/tin-tuc" className="group flex items-center gap-2 bg-white dark:bg-slate-800 px-6 py-3 rounded-full text-slate-700 dark:text-slate-300 font-bold shadow-sm hover:shadow-md hover:text-primary-600 dark:hover:text-primary-400 transition-all">
              Xem tất cả <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {homeNews.map((item) => (
              <Link to="/tin-tuc" key={item.id} className="group bg-white dark:bg-slate-800 rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 hover:-translate-y-2 transition-all duration-300 block h-full flex flex-col border border-slate-100 dark:border-slate-700">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={item.imageUrl || '/uploads/images/placeholder.svg'}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/uploads/images/placeholder.svg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                    {item.category}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-bold uppercase tracking-wide mb-3">
                    <span>{item.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
                    {item.excerpt}
                  </p>
                  <span className="text-primary-600 dark:text-primary-400 text-sm font-bold flex items-center gap-2">
                    Đọc tiếp <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
