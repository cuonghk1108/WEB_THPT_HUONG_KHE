import React, { useState, useEffect } from 'react';
import { Search, Calendar, ChevronRight, X, Clock, Share2, Filter, Tag, ChevronLeft } from 'lucide-react';
import { NewsItem } from '../types';
import { useData } from '../context/DataContext';

const News: React.FC = () => {
  const { news } = useData();
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const ITEMS_PER_PAGE = 6;
  const categories = ['Tất cả', 'Hoạt động', 'Thông báo', 'Đoàn thể', 'Học vụ', 'Gương sáng'];

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  // Filter Logic
  const filteredNews = news.filter(item => {
    const matchesCategory = activeCategory === 'Tất cả' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Tách bài nổi bật (chỉ khi đang ở tab Tất cả và không tìm kiếm)
  const isDefaultView = activeCategory === 'Tất cả' && searchQuery === '';
  const featuredArticle = isDefaultView && filteredNews.length > 0 ? filteredNews[0] : null;
  
  // Danh sách bài viết (trừ bài nổi bật nếu đang ở chế độ default)
  const listArticles = isDefaultView ? filteredNews.slice(1) : filteredNews;

  // Pagination Logic
  const totalPages = Math.ceil(listArticles.length / ITEMS_PER_PAGE);
  const paginatedArticles = listArticles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE, 
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Compact */}
      <div className="bg-white pt-28 pb-8 border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end gap-4">
            <div>
               <p className="text-primary-600 font-bold text-sm uppercase tracking-wider mb-2">Cổng thông tin điện tử</p>
               <h1 className="text-3xl md:text-4xl font-bold font-heading text-slate-900">Tin tức & Sự kiện</h1>
            </div>
            <div className="text-slate-600 text-sm font-medium">
               Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT COLUMN: Main Content (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* 1. Featured Article Section */}
            {featuredArticle && currentPage === 1 && (
              <div 
                className="group relative rounded-[2rem] overflow-hidden shadow-xl cursor-pointer h-[400px] md:h-[500px]"
                onClick={() => setSelectedArticle(featuredArticle)}
              >
                <img 
                  src={featuredArticle.imageUrl} 
                  alt={featuredArticle.title} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 text-white">
                  <span className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-bold uppercase rounded mb-3 shadow-md">
                    Tin nổi bật
                  </span>
                  <div className="flex items-center gap-3 text-sm text-slate-200 mb-3 font-medium">
                    <span className="bg-white/20 px-2 py-0.5 rounded text-white">{featuredArticle.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {featuredArticle.date}</span>
                  </div>
                  <h2 className="text-2xl md:text-4xl font-bold font-heading leading-tight mb-3 group-hover:text-primary-200 transition-colors">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-slate-200 line-clamp-2 md:line-clamp-2 max-w-2xl text-base md:text-lg opacity-95 font-medium">
                    {featuredArticle.excerpt}
                  </p>
                </div>
              </div>
            )}

            {/* 2. Article Grid List */}
            <div>
               {!isDefaultView && (
                 <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                   <Filter className="h-5 w-5 text-primary-600" />
                   Kết quả lọc: {listArticles.length} bài viết
                 </h3>
               )}
               
               {paginatedArticles.length > 0 ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                   {paginatedArticles.map((item) => (
                     <article key={item.id} className="group flex flex-col h-full bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer" onClick={() => setSelectedArticle(item)}>
                       <div className="aspect-[16/10] overflow-hidden relative rounded-t-2xl">
                         <img 
                           src={item.imageUrl} 
                           alt={item.title} 
                           className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                           loading="lazy"
                         />
                         <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">
                           {item.category}
                         </div>
                       </div>
                       <div className="p-6 flex flex-col flex-grow">
                         <div className="text-xs text-slate-500 font-bold uppercase mb-2 flex items-center gap-2">
                            <Calendar className="h-3 w-3" /> {item.date}
                         </div>
                         <h3 className="text-lg font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors leading-snug">
                           {item.title}
                         </h3>
                         <p className="text-slate-600 text-sm line-clamp-3 flex-grow mb-4 leading-relaxed font-medium">
                           {item.excerpt}
                         </p>
                         <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-primary-700 text-xs font-bold uppercase flex items-center gap-1 group-hover:gap-2 transition-all">
                              Xem chi tiết <ChevronRight className="h-3 w-3" />
                            </span>
                         </div>
                       </div>
                     </article>
                   ))}
                 </div>
               ) : (
                 <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300">
                    <div className="inline-block p-4 rounded-full bg-slate-50 mb-4">
                        <Search className="h-8 w-8 text-slate-400" />
                    </div>
                    <p className="text-slate-700 font-medium">Không tìm thấy bài viết nào.</p>
                    <button onClick={() => {setSearchQuery(''); setActiveCategory('Tất cả')}} className="mt-4 text-primary-600 text-sm font-bold hover:underline">
                        Xóa bộ lọc
                    </button>
                 </div>
               )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
               <div className="flex justify-center pt-8 border-t border-slate-200">
                  <nav className="flex gap-2">
                    <button 
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-transparent"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                          currentPage === page 
                          ? 'bg-primary-600 text-white shadow-md shadow-primary-500/30' 
                          : 'border border-slate-300 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button 
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-transparent"
                    >
                       <ChevronRight className="h-5 w-5" />
                    </button>
                  </nav>
               </div>
            )}
          </div>

          {/* RIGHT COLUMN: Sidebar (4 cols) - Sticky */}
          <div className="lg:col-span-4 space-y-8">
            <div className="sticky top-28 space-y-8">
                
                {/* Search Widget */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                   <h3 className="font-heading font-bold text-lg text-slate-900 mb-4">Tìm kiếm</h3>
                   <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Nhập từ khóa..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none text-sm transition-all text-slate-900 font-medium"
                      />
                      <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-500" />
                   </div>
                </div>

                {/* Categories Widget */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                   <h3 className="font-heading font-bold text-lg text-slate-900 mb-4 pb-4 border-b border-slate-100">Chuyên mục</h3>
                   <div className="space-y-1">
                      {categories.map(cat => (
                        <button
                          key={cat}
                          onClick={() => setActiveCategory(cat)}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                             activeCategory === cat 
                             ? 'bg-primary-50 text-primary-800 font-bold' 
                             : 'text-slate-700 hover:bg-slate-50 hover:text-primary-700'
                          }`}
                        >
                          <span>{cat}</span>
                          {activeCategory === cat && <ChevronRight className="h-4 w-4" />}
                        </button>
                      ))}
                   </div>
                </div>

                {/* Mini Trending/Tags Widget */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                   <h3 className="font-heading font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
                     <Tag className="h-4 w-4 text-primary-600" /> Chủ đề nóng
                   </h3>
                   <div className="flex flex-wrap gap-2">
                      {['Tuyển sinh 10', 'Học sinh giỏi', 'Hoạt động đoàn', 'Lịch thi', 'Học phí', 'Tốt nghiệp 2025'].map(tag => (
                        <span 
                          key={tag} 
                          onClick={() => setSearchQuery(tag)}
                          className="px-3 py-1.5 bg-slate-50 text-slate-700 text-xs font-bold rounded-lg hover:bg-primary-50 hover:text-primary-800 cursor-pointer transition-colors border border-slate-200"
                        >
                           #{tag}
                        </span>
                      ))}
                   </div>
                </div>

            </div>
          </div>
        </div>
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-[1.5rem] w-full max-w-4xl max-h-[95vh] overflow-y-auto shadow-2xl relative animate-scale-up flex flex-col">
            
            {/* Modal Header Actions */}
            <div className="sticky top-0 z-20 flex justify-between items-center px-6 py-4 bg-white/90 backdrop-blur-md border-b border-slate-200">
               <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Chi tiết bài viết</span>
               <div className="flex items-center gap-2">
                  <button onClick={() => alert('Đã sao chép liên kết!')} className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors" title="Chia sẻ">
                     <Share2 className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => setSelectedArticle(null)}
                    className="p-2 text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-full transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
               </div>
            </div>
            
            <div className="p-0">
               {/* Hero Image */}
               <div className="w-full h-64 md:h-96 relative">
                  <img 
                    src={selectedArticle.imageUrl} 
                    alt={selectedArticle.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full p-6 md:p-10">
                    <span className="inline-block px-3 py-1 bg-primary-600 text-white text-xs font-bold rounded mb-3">
                      {selectedArticle.category}
                    </span>
                    <h2 className="text-2xl md:text-4xl font-bold text-white font-heading leading-tight shadow-sm">
                      {selectedArticle.title}
                    </h2>
                  </div>
               </div>

               {/* Content Body */}
               <div className="px-6 py-8 md:px-12 md:py-10 max-w-3xl mx-auto">
                  {/* Meta Info */}
                  <div className="flex items-center gap-6 text-slate-600 text-sm border-b border-slate-200 pb-6 mb-8 font-medium">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" /> <span>{selectedArticle.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" /> <span>5 phút đọc</span>
                    </div>
                  </div>

                  {/* HTML Content */}
                  <div className="prose prose-lg prose-slate max-w-none text-slate-800">
                    <p className="lead font-bold text-lg text-slate-900 not-italic">
                      {selectedArticle.excerpt}
                    </p>
                    <div 
                      className="mt-6 font-medium"
                      dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
                    />
                  </div>
               </div>
            </div>
            
            {/* Modal Footer */}
            <div className="p-6 bg-slate-50 border-t border-slate-200 text-center">
              <button 
                onClick={() => setSelectedArticle(null)}
                className="px-8 py-3 bg-white border border-slate-300 rounded-full text-slate-800 font-bold shadow-sm hover:bg-slate-100 hover:border-slate-400 transition-all"
              >
                Đóng bài viết
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default News;
