import React from 'react';
import { useData } from '../context/DataContext';

const Introduction: React.FC = () => {
  const { globalImages } = useData();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen pb-16">
      <div className="bg-primary-900 text-white pt-32 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold font-heading mb-4 text-center">Giới thiệu về nhà trường</h1>
          <p className="text-center text-primary-200 max-w-2xl mx-auto">
            Hơn 60 năm xây dựng và trưởng thành, tự hào là cái nôi đào tạo nhân tài cho quê hương đất nước.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm sticky top-24 border border-slate-100 dark:border-slate-700">
              <h3 className="font-bold text-lg mb-4 border-b pb-2">Mục lục</h3>
              <ul className="space-y-3 text-gray-600 cursor-pointer">
                <li><a onClick={() => scrollToSection('lich-su')} className="hover:text-primary-600 block">Lịch sử hình thành</a></li>
                <li><a onClick={() => scrollToSection('tam-nhin')} className="hover:text-primary-600 block">Tầm nhìn & Sứ mệnh</a></li>
                <li><a onClick={() => scrollToSection('to-chuc')} className="hover:text-primary-600 block">Cơ cấu tổ chức</a></li>
                <li><a onClick={() => scrollToSection('thanh-tich')} className="hover:text-primary-600 block">Thành tích nổi bật</a></li>
              </ul>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 space-y-12">
            <section id="lich-su" className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
              <h2 className="text-2xl font-bold text-primary-900 mb-6 flex items-center gap-2">
                <span className="w-2 h-8 bg-primary-600 rounded"></span> Lịch sử hình thành & Phát triển
              </h2>
              <div className="prose max-w-none text-gray-700 space-y-4 text-justify">
                <p>
                  <strong>Tháng 8 năm 1964</strong>, Trường cấp 3 Hương Khê (nay là Trường THPT Hương Khê) chính thức được thành lập. Ra đời trên mảnh đất "chảo lửa túi mưa", lại đúng vào thời điểm cuộc chiến tranh phá hoại của đế quốc Mỹ diễn ra ác liệt nhất tại miền Bắc, thầy và trò nhà trường đã phải trải qua những năm tháng khởi đầu vô cùng gian khổ nhưng cũng đầy vẻ vang.
                </p>
                
                <div className="my-6 border-l-4 border-primary-200 pl-4 italic text-gray-600 bg-gray-50 p-4 rounded-r-lg">
                  "Những ngày đầu mới thành lập, trường chỉ có vẻn vẹn 2 lớp 8 với 96 học sinh và 6 cán bộ giáo viên. Cơ sở vật chất đơn sơ, lớp học tranh tre nứa lá, phải sơ tán nhiều nơi để đảm bảo an toàn cho việc dạy và học."
                </div>

                <img src={globalImages.introHistory} alt="Lớp học thời chiến" className="w-full rounded-lg shadow-md my-6 object-cover h-64" />

                <h3 className="text-xl font-bold text-primary-800 mt-6">Giai đoạn 1964 - 1975: Vượt qua mưa bom bão đạn</h3>
                <p>
                  Trong suốt những năm tháng chiến tranh, dù phải đội mũ rơm đi học, đào hầm hào trú ẩn ngay cạnh lớp học, phong trào thi đua <em>"Dạy tốt - Học tốt"</em> vẫn luôn được giữ vững. Tiếng giảng bài vẫn vang lên hào sảng lấn át tiếng bom đạn kẻ thù. Hàng trăm học sinh của trường đã gác bút nghiên lên đường nhập ngũ theo tiếng gọi thiêng liêng của Tổ quốc, nhiều người đã anh dũng hy sinh hoặc để lại một phần xương máu nơi chiến trường, tô thắm thêm truyền thống vẻ vang của nhà trường.
                </p>

                <h3 className="text-xl font-bold text-primary-800 mt-6">Giai đoạn 1975 - Nay: Đổi mới và Hội nhập</h3>
                <p>
                  Đất nước thống nhất, trường bước vào giai đoạn kiến thiết và phát triển. Được sự quan tâm của các cấp lãnh đạo và nhân dân huyện nhà, cơ sở vật chất nhà trường ngày càng khang trang, hiện đại. Từ những phòng học cấp 4 đơn sơ, nay trường đã có những dãy nhà cao tầng kiên cố, phòng học bộ môn chuẩn chức năng, thư viện tiên tiến, sân chơi bãi tập và khuôn viên xanh - sạch - đẹp.
                </p>
                <p>
                  Chất lượng giáo dục toàn diện và mũi nhọn không ngừng được nâng cao. Tỷ lệ học sinh đậu tốt nghiệp hàng năm luôn ở mức cao, số lượng học sinh giỏi tỉnh, giỏi quốc gia và đỗ vào các trường Đại học danh tiếng ngày càng tăng. Trường THPT Hương Khê đã trở thành địa chỉ tin cậy, là cái nôi đào tạo nhân tài cho quê hương, đất nước, xứng đáng với niềm tin yêu của nhân dân.
                </p>

                <div id="thanh-tich" className="bg-primary-100 dark:bg-primary-900/30 p-6 rounded-lg mt-8 border border-primary-200 dark:border-primary-700">
                  <h3 className="text-lg font-bold text-primary-900 mb-4 flex items-center">
                    <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded mr-2 text-xs font-bold uppercase shadow-sm">Thành tích</span> 
                    Các phần thưởng cao quý
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-2">
                    <li><strong>Huân chương Lao động hạng Ba</strong> (năm 1994).</li>
                    <li><strong>Huân chương Lao động hạng Nhì</strong> (năm 1999).</li>
                    <li><strong>Huân chương Lao động hạng Nhất</strong> (năm 2004).</li>
                    <li>Nhiều năm liền đạt danh hiệu <em>Tập thể Lao động Xuất sắc</em>, được Thủ tướng Chính phủ, Bộ GD&ĐT và UBND tỉnh tặng Bằng khen.</li>
                    <li>Được công nhận là <strong>Trường chuẩn Quốc gia</strong>.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="tam-nhin" className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
              <h2 className="text-2xl font-bold text-primary-900 mb-6 flex items-center gap-2">
                 <span className="w-2 h-8 bg-secondary-500 rounded"></span> Tầm nhìn & Sứ mệnh
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-primary-100 dark:bg-primary-900/30 p-6 rounded-lg border-l-4 border-primary-600 dark:border-primary-400">
                  <h3 className="font-bold text-lg text-primary-900 mb-2">Tầm nhìn</h3>
                  <p className="text-gray-700">Trở thành trường THPT chất lượng cao, tiệm cận chuẩn quốc tế, là địa chỉ tin cậy của phụ huynh và học sinh.</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-600">
                  <h3 className="font-bold text-lg text-green-900 mb-2">Sứ mệnh</h3>
                  <p className="text-gray-700">Đào tạo những công dân toàn cầu có phẩm chất đạo đức tốt, tư duy sáng tạo, kỹ năng sống vững vàng và khát vọng cống hiến.</p>
                </div>
              </div>
            </section>

            <section id="to-chuc" className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
              <h2 className="text-2xl font-bold text-primary-900 mb-6 flex items-center gap-2">
                <span className="w-2 h-8 bg-primary-600 rounded"></span> Cơ cấu tổ chức
              </h2>
              <div className="flex flex-col items-center">
                 {/* Simplified Organizational Chart Visualization */}
                 <div className="border border-gray-200 p-4 rounded-lg text-center w-64 bg-primary-100 font-bold mb-8 relative shadow-sm">
                   Ban Giám Hiệu
                   <div className="absolute left-1/2 -bottom-8 w-px h-8 bg-gray-300 transform -translate-x-1/2"></div>
                 </div>
                 <div className="flex gap-4 flex-wrap justify-center">
                   {['Tổ Toán', 'Tổ Lý - Hóa - CN', 'Tổ Văn', 'Tổ Ngoại Ngữ', 'Tổ Sử - Địa - CD', 'Tổ Sinh - Thể - QP', 'Tổ Văn Phòng'].map(org => (
                     <div key={org} className="border border-gray-200 p-3 rounded bg-white shadow-sm min-w-[120px] text-center text-sm font-medium hover:bg-gray-50 transition">
                       {org}
                     </div>
                   ))}
                 </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
