import React, { useMemo, useState } from 'react';
import { BookOpen, Search, Download, Eye } from 'lucide-react';
import { useData } from '../context/DataContext';

const DigitalLibrary: React.FC = () => {
  const { digitalLibrary } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = useMemo(() => {
    const unique = Array.from(new Set(digitalLibrary.map(r => r.category)));
    return ['all', ...unique];
  }, [digitalLibrary]);

  const filtered = digitalLibrary.filter(r =>
    (selectedCategory === 'all' || r.category === selectedCategory) &&
    (r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     r.author.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <section className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Thư viện Điện tử</h2>
          <p className="text-slate-600 dark:text-slate-300">Truy cập ngàn tài liệu học tập chất lượng cao</p>
        </div>

        {/* Search & Filter */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 mb-8 border border-slate-200 dark:border-slate-700">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm kiếm sách, tác giả..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-slate-700 dark:text-white"
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-primary-600 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600'
                  }`}
                >
                  {cat === 'all' ? 'Tất cả' : cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filtered.map((resource) => (
            <div key={resource.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <BookOpen className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                <span className="text-xs px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full">
                  {resource.type}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-2">
                {resource.title}
              </h3>
              
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{resource.author}</p>
              
              <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-500 mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
                <span>{resource.year}</span>
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {resource.views}
                </span>
              </div>

              <div className="flex gap-2">
                <a
                  href={resource.url || '#'}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Eye className="h-4 w-4" />
                  Đọc
                </a>
                <a
                  href={resource.url || '#'}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-medium hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Download className="h-4 w-4" />
                  Tải
                </a>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600 dark:text-slate-400">Không tìm thấy tài liệu nào</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default DigitalLibrary;
