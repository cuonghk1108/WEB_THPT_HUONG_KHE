import React from 'react';
import { useData } from '../context/DataContext';
import { Users, Calendar, ArrowRight } from 'lucide-react';

const Clubs: React.FC = () => {
  const { clubs, getImageSrc } = useData();

  const handleRegister = (clubName: string) => {
    alert(`Cảm ơn bạn đã quan tâm đến ${clubName}. Vui lòng liên hệ Văn phòng Đoàn trường để nhận đơn đăng ký!`);
  };

  const handlePropose = () => {
    alert('Vui lòng gửi bản kế hoạch chi tiết về email của Đoàn trường: doantruong@huongkhe.edu.vn');
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      <div className="bg-gradient-to-br from-purple-700 to-indigo-800 text-white pt-32 pb-16">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-white/20 text-xs font-bold uppercase mb-4 backdrop-blur-sm">Hoạt động ngoại khóa</span>
          <h1 className="text-3xl md:text-5xl font-bold font-heading mb-4">Câu lạc bộ & Đội nhóm</h1>
          <p className="text-purple-100 max-w-2xl mx-auto">
            Nơi đam mê tỏa sáng. Hãy tham gia để rèn luyện kỹ năng, kết nối bạn bè và tạo nên những kỷ niệm thanh xuân rực rỡ.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {clubs.map(club => (
            <div key={club.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group flex flex-col md:flex-row h-full md:h-64">
              <div className="md:w-2/5 h-48 md:h-full relative overflow-hidden">
                <img 
                  src={getImageSrc(club.imageUrl)} 
                  alt={club.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-purple-900/20 group-hover:bg-purple-900/0 transition-colors"></div>
              </div>
              <div className="p-6 md:w-3/5 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-purple-700 transition-colors">{club.name}</h3>
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed">{club.description}</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-wide">
                     <div className="flex items-center gap-1">
                       <Users className="h-4 w-4" /> {club.members} thành viên
                     </div>
                     <div className="flex items-center gap-1">
                       <Calendar className="h-4 w-4" /> {club.schedule}
                     </div>
                  </div>
                  <button 
                    onClick={() => handleRegister(club.name)}
                    className="text-purple-600 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all hover:underline"
                  >
                    Đăng ký tham gia <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="mt-16 bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Bạn muốn thành lập CLB mới?</h3>
            <p className="text-slate-600 mb-6">Chúng tôi luôn khuyến khích những ý tưởng mới mẻ và sáng tạo từ học sinh.</p>
            <button 
                onClick={handlePropose}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-full transition-colors"
            >
                Gửi đề xuất ngay
            </button>
        </div>
      </div>
    </div>
  );
};

export default Clubs;
