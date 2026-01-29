import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { SCHOOL_ADDRESS, SCHOOL_EMAIL, SCHOOL_PHONE } from '../constants';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      
      // Reset status after showing success message for a while
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-2xl mx-auto">
           <h1 className="text-3xl md:text-4xl font-bold font-heading text-slate-900 mb-4">Liên hệ với chúng tôi</h1>
           <p className="text-slate-600 text-lg">
             Mọi thắc mắc hoặc đóng góp ý kiến, xin vui lòng liên hệ theo thông tin bên dưới hoặc gửi tin nhắn trực tuyến.
           </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
             <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center text-primary-600 mb-4">
                  <MapPin className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Địa chỉ</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{SCHOOL_ADDRESS}</p>
             </div>

             <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center text-primary-600 mb-4">
                  <Phone className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Điện thoại</h3>
                <p className="text-slate-600 text-sm">{SCHOOL_PHONE}</p>
             </div>

             <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center text-primary-600 mb-4">
                  <Mail className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Email</h3>
                <p className="text-slate-600 text-sm">{SCHOOL_EMAIL}</p>
             </div>
          </div>

          {/* Form and Map */}
          <div className="lg:col-span-2 space-y-8">
             {/* Form */}
             <div className="bg-white dark:bg-slate-800 p-8 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm relative overflow-hidden">
                {status === 'success' ? (
                  <div className="absolute inset-0 bg-white flex flex-col items-center justify-center z-10 animate-fade-in">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle2 className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Gửi thành công!</h3>
                    <p className="text-slate-600 text-center max-w-md">
                      Cảm ơn bạn đã liên hệ. Nhà trường đã nhận được tin nhắn và sẽ phản hồi trong thời gian sớm nhất.
                    </p>
                    <button 
                      onClick={() => setStatus('idle')}
                      className="mt-6 px-6 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 font-medium rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                    >
                      Gửi tin nhắn khác
                    </button>
                  </div>
                ) : null}

                <h2 className="text-xl font-bold text-slate-900 mb-6">Gửi tin nhắn trực tuyến</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Họ và tên <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2.5 bg-white border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all placeholder-slate-400"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Nguyễn Văn A"
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email <span className="text-red-500">*</span></label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-2.5 bg-white border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all placeholder-slate-400"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="example@email.com"
                    />
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Số điện thoại</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-2.5 bg-white border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all placeholder-slate-400"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="09xx xxx xxx"
                    />
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Nội dung <span className="text-red-500">*</span></label>
                    <textarea
                      required
                      rows={4}
                      className="w-full px-4 py-2.5 bg-white border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none placeholder-slate-400"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Nhập nội dung cần hỗ trợ..."
                    ></textarea>
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className={`inline-flex items-center justify-center gap-2 bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg transition-all ${
                        status === 'submitting' ? 'opacity-75 cursor-not-allowed' : 'hover:bg-primary-800 hover:shadow-md'
                      }`}
                    >
                      {status === 'submitting' ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> Đang gửi...
                        </>
                      ) : (
                        <>
                          Gửi tin nhắn <Send className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
             </div>

             {/* Map */}
             <div className="bg-white p-2 rounded-xl border border-slate-100 shadow-sm h-64">
               <iframe 
                title="Google Map - THPT Hương Khê"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.5442828885937!2d105.69862883184445!3d18.175913211664728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDEwJzMzLjMiTiAxMDXCsDQxJzU1LjEiRQ!5e0!3m2!1svi!2s!4v1674000000000"
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen={true} 
                loading="lazy"
                className="rounded-lg grayscale-[20%]"
              ></iframe>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;