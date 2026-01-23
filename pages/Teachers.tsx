import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Mail, Search, BookOpen } from 'lucide-react';

const Teachers: React.FC = () => {
  const { teachers } = useData();
  const [selectedDept, setSelectedDept] = useState('Tất cả');
  const departments = ['Tất cả', 'Ban Giám Hiệu', 'Tổ Toán - Tin', 'Tổ Lý - Hóa', 'Tổ Ngoại Ngữ', 'Tổ Xã Hội'];

  const filteredTeachers = teachers.filter(t => 
    selectedDept === 'Tất cả' || t.department === selectedDept
  );

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Banner */}
      <div className="bg-primary-900 text-white pt-32 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold font-heading mb-4">Đội ngũ giáo viên</h1>
          <p className="text-primary-200 max-w-2xl mx-auto">
            Tâm huyết - Trách nhiệm - Sáng tạo. Những người lái đò thầm lặng đưa các thế hệ học sinh cập bến tri thức.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {departments.map(dept => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                selectedDept === dept 
                ? 'bg-primary-600 text-white shadow-lg' 
                : 'bg-white text-slate-600 hover:bg-primary-50 hover:text-primary-700 border border-slate-200'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredTeachers.map(teacher => (
            <div key={teacher.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-slate-100">
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={teacher.imageUrl} 
                  alt={teacher.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                  <a href={`mailto:${teacher.email}`} className="bg-white text-primary-900 px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-primary-50">
                    <Mail className="h-4 w-4" /> Liên hệ
                  </a>
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-slate-900 mb-1">{teacher.name}</h3>
                <p className="text-primary-600 font-medium text-sm mb-3 uppercase tracking-wide">{teacher.position}</p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-full text-xs font-semibold text-slate-600">
                  <BookOpen className="h-3 w-3" /> {teacher.subject}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Teachers;
