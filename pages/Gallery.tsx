import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Maximize2, X } from 'lucide-react';

const Gallery: React.FC = () => {
  const { gallery } = useData();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen pb-16">
      <div className="pt-32 pb-12 container mx-auto px-4">
        <h1 className="text-3xl md:text-5xl font-bold font-heading mb-4 text-slate-900 dark:text-white">Thư viện hình ảnh</h1>
        <p className="text-slate-600 dark:text-slate-400">Lưu giữ những khoảnh khắc đáng nhớ của thầy và trò trường THPT Hương Khê.</p>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px]">
          {gallery.map((item, idx) => (
            <div 
              key={item.id} 
              onClick={() => setSelectedImage(item.imageUrl)}
              className={`relative rounded-xl overflow-hidden cursor-pointer group ${idx % 3 === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
            >
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                 <span className="text-primary-400 text-xs font-bold uppercase mb-1 tracking-wider">{item.category}</span>
                 <h3 className="text-white font-bold text-lg">{item.title}</h3>
                 <div className="absolute top-4 right-4 bg-white/20 p-2 rounded-full backdrop-blur-sm">
                    <Maximize2 className="h-5 w-5 text-white" />
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in" onClick={() => setSelectedImage(null)}>
           <button 
             onClick={() => setSelectedImage(null)}
             className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2"
           >
             <X className="h-8 w-8" />
           </button>
           <img 
             src={selectedImage} 
             alt="Full View" 
             className="max-w-full max-h-[90vh] rounded shadow-2xl animate-scale-up"
             onClick={(e) => e.stopPropagation()} 
           />
        </div>
      )}
    </div>
  );
};

export default Gallery;
