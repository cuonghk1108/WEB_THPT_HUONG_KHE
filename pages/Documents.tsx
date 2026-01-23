import React, { useState } from 'react';
import { FileText, Download, Filter, Check } from 'lucide-react';
import { DocumentItem } from '../types';

const Documents: React.FC = () => {
  const [filterType, setFilterType] = useState('Tất cả');

  // Mock Data
  const documents: DocumentItem[] = [
    { id: 1, title: 'Kế hoạch giáo dục năm học 2025-2026', number: '123/KH-THPT', date: '20/08/2025', type: 'PDF', size: '2.4 MB' },
    { id: 2, title: 'Nội quy học sinh (Sửa đổi)', number: '05/NQ-THPT', date: '15/08/2025', type: 'PDF', size: '1.1 MB' },
    { id: 3, title: 'Quy chế chi tiêu nội bộ năm 2025', number: '12/QC-THPT', date: '10/01/2025', type: 'DOC', size: '500 KB' },
    { id: 4, title: 'Công khai chất lượng giáo dục học kỳ I', number: '45/CK-THPT', date: '15/01/2025', type: 'PDF', size: '3.2 MB' },
    { id: 5, title: 'Biểu mẫu đăng ký tham gia CLB', number: 'BM-01', date: '05/09/2025', type: 'DOC', size: '200 KB' },
  ];

  const docTypes = ['Tất cả', 'Văn bản quy phạm', 'Kế hoạch - Báo cáo', 'Công khai giáo dục', 'Biểu mẫu', 'Tài liệu học tập'];

  // This is a simple mock filter. In a real app, 'type' in DocumentItem would match these categories more closely.
  // For demo, we just return all if 'Tất cả' or shuffle results for effect.
  const filteredDocuments = filterType === 'Tất cả' 
    ? documents 
    : documents.filter(d => Math.random() > 0.3); // Mock filtering simulation

  const handleDownload = (docTitle: string) => {
      alert(`Đang bắt đầu tải xuống: ${docTitle}`);
  }

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen pb-16">
      {/* Header Banner */}
      <div className="bg-primary-900 text-white pt-32 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold font-heading mb-4">Văn bản & Tài liệu</h1>
          <p className="text-primary-200">Kho lưu trữ văn bản hành chính, quy chế và tài liệu học tập</p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main List */}
          <div className="lg:w-3/4">
             <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                   <h2 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                       Danh sách văn bản {filterType !== 'Tất cả' && <span className="text-primary-600 font-normal text-sm">({filterType})</span>}
                   </h2>
                   <button onClick={() => setFilterType('Tất cả')} className="text-slate-500 hover:text-primary-600 flex items-center gap-1 text-sm font-medium">
                      <Filter className="h-4 w-4" /> Đặt lại bộ lọc
                   </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-semibold uppercase tracking-wider">
                      <tr>
                        <th className="p-4 border-b border-slate-100 w-16">Loại</th>
                        <th className="p-4 border-b border-slate-100">Tên văn bản / Số hiệu</th>
                        <th className="p-4 border-b border-slate-100">Ngày ban hành</th>
                        <th className="p-4 border-b border-slate-100 text-right">Tải về</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredDocuments.length > 0 ? filteredDocuments.map((doc) => (
                        <tr key={doc.id} className="hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors group">
                          <td className="p-4 align-middle">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs ${
                              doc.type === 'PDF' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                            }`}>
                              {doc.type}
                            </div>
                          </td>
                          <td className="p-4 align-middle">
                            <h3 className="text-slate-900 font-semibold text-sm group-hover:text-primary-700 transition-colors cursor-pointer" onClick={() => handleDownload(doc.title)}>
                              {doc.title}
                            </h3>
                            <p className="text-slate-500 text-xs mt-1">Số: {doc.number}</p>
                          </td>
                          <td className="p-4 align-middle text-sm text-slate-600">
                            {doc.date}
                          </td>
                          <td className="p-4 align-middle text-right">
                             <button 
                                onClick={() => handleDownload(doc.title)}
                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-primary-50 hover:text-primary-700 hover:border-primary-200 transition-all"
                            >
                                <Download className="h-3.5 w-3.5" />
                                <span>{doc.size}</span>
                             </button>
                          </td>
                        </tr>
                      )) : (
                          <tr>
                              <td colSpan={4} className="p-8 text-center text-slate-500">
                                  Không tìm thấy văn bản nào trong mục này.
                              </td>
                          </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination (Simple) */}
                <div className="p-4 border-t border-slate-100 flex justify-center">
                   <div className="text-xs text-slate-500">Hiển thị {filteredDocuments.length} văn bản</div>
                </div>
             </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/4 space-y-6">
             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <h3 className="font-bold text-lg mb-4">Loại văn bản</h3>
                <ul className="space-y-1">
                  {docTypes.map((type) => (
                     <li key={type}>
                       <button 
                        onClick={() => setFilterType(type)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between group ${
                            filterType === type 
                            ? 'bg-primary-50 text-primary-700 font-bold' 
                            : 'text-slate-600 hover:bg-slate-100 hover:text-primary-700'
                        }`}
                       >
                         <div className="flex items-center gap-2">
                            <FileText className={`h-4 w-4 ${filterType === type ? 'text-primary-600' : 'opacity-50'}`} />
                            {type}
                         </div>
                         {filterType === type && <Check className="h-3.5 w-3.5" />}
                       </button>
                     </li>
                  ))}
                </ul>
             </div>

             <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                <h3 className="font-bold text-blue-900 mb-2 text-sm uppercase">Lưu ý</h3>
                <p className="text-blue-800 text-xs leading-relaxed">
                  Để xem được các văn bản định dạng PDF, vui lòng cài đặt phần mềm Adobe Reader hoặc sử dụng trình duyệt hỗ trợ đọc PDF.
                </p>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Documents;
