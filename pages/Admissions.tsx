import React, { useState } from 'react';
import { Calendar, FileText, HelpCircle, CheckCircle, ArrowRight, X, Loader2 } from 'lucide-react';

const Admissions: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    // Simulate API
    setTimeout(() => {
        setSubmitStatus('success');
    }, 1500);
  }

  const resetForm = () => {
    setSubmitStatus('idle');
    setIsModalOpen(false);
  }

  return (
    <div className="bg-gray-50 min-h-screen">
       <div className="bg-secondary-600 text-white pt-32 pb-20 relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/3"></div>

        <div className="container mx-auto px-4 text-center relative z-10 flex flex-col items-center">
          <h1 className="text-3xl md:text-5xl font-bold font-heading mb-6 drop-shadow-sm">Tuyển Sinh 2025 - 2026</h1>
          <p className="text-xl opacity-90 mb-10 max-w-2xl font-light">
             Chào đón các em học sinh khóa 61. Hãy trở thành một phần của đại gia đình THPT Hương Khê.
          </p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-white text-secondary-700 font-bold py-3.5 px-8 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all text-lg"
          >
            Đăng ký hồ sơ trực tuyến <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Calendar className="text-secondary-600" /> Thông tin chung
              </h2>
              <div className="space-y-4 text-gray-700">
                <div className="flex justify-between border-b border-gray-100 pb-3">
                  <span className="font-semibold">Chỉ tiêu:</span>
                  <span>450 học sinh (10 lớp)</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-3">
                  <span className="font-semibold">Đối tượng:</span>
                  <span>Học sinh tốt nghiệp THCS trên địa bàn huyện</span>
                </div>
                 <div className="flex justify-between border-b border-gray-100 pb-3">
                  <span className="font-semibold">Hình thức:</span>
                  <span>Thi tuyển theo đề của Sở GD&ĐT Hà Tĩnh</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FileText className="text-secondary-600" /> Hồ sơ nhập học
              </h2>
              <ul className="space-y-3 text-gray-700">
                {[
                  "Đơn xin nhập học (theo mẫu của trường)",
                  "Học bạ THCS (bản chính)",
                  "Giấy khai sinh (bản sao công chứng)",
                  "Giấy chứng nhận tốt nghiệp tạm thời",
                  "Các giấy tờ ưu tiên (nếu có)"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar / FAQ */}
          <div className="lg:col-span-1">
             <div className="bg-primary-900 text-white p-6 rounded-xl shadow-lg mb-8 sticky top-24">
               <h3 className="font-bold text-lg mb-4">Cần tư vấn ngay?</h3>
               <p className="text-primary-200 text-sm mb-4">Chat ngay với trợ lý ảo AI ở góc màn hình hoặc liên hệ hotline.</p>
               <div className="bg-white/10 p-3 rounded-center font-bold text-xl mb-4 text-center">
                 0239 3 871 234
               </div>
               <button 
                 onClick={() => setIsModalOpen(true)}
                 className="w-full py-2 bg-secondary-500 hover:bg-secondary-400 text-white font-semibold rounded-lg transition-colors"
               >
                 Đăng ký tư vấn
               </button>
             </div>

             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
               <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                 <HelpCircle className="h-5 w-5 text-secondary-600" /> Câu hỏi thường gặp
               </h3>
               <div className="space-y-4">
                 {[
                   { q: "Thời gian nộp hồ sơ khi nào?", a: "Dự kiến từ ngày 15/6 đến 30/6/2025." },
                   { q: "Điểm chuẩn năm ngoái là bao nhiêu?", a: "Điểm chuẩn năm 2024 là 25.5 điểm." },
                   { q: "Trường có bán trú không?", a: "Hiện tại trường chưa tổ chức mô hình bán trú." }
                 ].map((faq, idx) => (
                   <div key={idx} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                     <p className="font-semibold text-gray-800 text-sm mb-1">{faq.q}</p>
                     <p className="text-gray-600 text-sm">{faq.a}</p>
                   </div>
                 ))}
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl relative animate-scale-up overflow-hidden">
             
             {submitStatus === 'success' ? (
                <div className="p-8 flex flex-col items-center justify-center text-center h-full">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle className="h-10 w-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Đăng ký thành công!</h3>
                    <p className="text-slate-600 mb-6">
                      Thông tin của bạn đã được ghi nhận. Nhà trường sẽ liên hệ lại qua số điện thoại để hướng dẫn chi tiết các bước tiếp theo.
                    </p>
                    <button 
                      onClick={resetForm}
                      className="px-8 py-2.5 bg-secondary-600 text-white font-semibold rounded-lg hover:bg-secondary-700 transition-colors"
                    >
                      Đóng cửa sổ
                    </button>
                </div>
             ) : (
                <>
                    <div className="bg-secondary-600 p-4 px-6 flex justify-between items-center text-white">
                        <h3 className="font-bold text-lg">Đăng ký hồ sơ trực tuyến</h3>
                        <button onClick={() => setIsModalOpen(false)} className="hover:bg-white/20 p-1.5 rounded-full transition-colors">
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                    
                    <form onSubmit={handleRegister} className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Họ và tên HS</label>
                                <input required type="text" className="w-full px-3 py-2 bg-white border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-secondary-200 focus:border-secondary-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Ngày sinh</label>
                                <input required type="date" className="w-full px-3 py-2 bg-white border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-secondary-200 focus:border-secondary-500 outline-none" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Trường THCS đã học</label>
                            <input required type="text" className="w-full px-3 py-2 bg-white border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-secondary-200 focus:border-secondary-500 outline-none" placeholder="Ví dụ: THCS Chu Văn An" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                             <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">SĐT Phụ huynh</label>
                                <input required type="tel" className="w-full px-3 py-2 bg-white border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-secondary-200 focus:border-secondary-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Điểm TB lớp 9</label>
                                <input type="number" step="0.1" className="w-full px-3 py-2 bg-white border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-secondary-200 focus:border-secondary-500 outline-none" placeholder="Không bắt buộc" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Ghi chú thêm</label>
                            <textarea rows={3} className="w-full px-3 py-2 bg-white border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-secondary-200 focus:border-secondary-500 outline-none resize-none"></textarea>
                        </div>

                        <button 
                            type="submit" 
                            disabled={submitStatus === 'submitting'}
                            className="w-full py-3 bg-secondary-600 hover:bg-secondary-700 text-white font-bold rounded-lg transition-colors shadow-sm flex justify-center items-center gap-2"
                        >
                            {submitStatus === 'submitting' ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Gửi thông tin đăng ký'}
                        </button>
                        <p className="text-xs text-slate-500 text-center mt-2">
                            *Đây là form đăng ký sơ bộ. Nhà trường sẽ liên hệ để xác nhận.
                        </p>
                    </form>
                </>
             )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admissions;