import React, { createContext, useContext, useState, useEffect } from 'react';
import { NewsItem, GlobalImages, Teacher, Club, GalleryItem } from '../types';

interface DataContextType {
  news: NewsItem[];
  addNews: (item: Omit<NewsItem, 'id'>) => void;
  updateNews: (id: number, item: Partial<NewsItem>) => void;
  deleteNews: (id: number) => void;
  
  globalImages: GlobalImages;
  updateGlobalImages: (images: GlobalImages) => void;

  teachers: Teacher[];
  addTeacher: (item: Omit<Teacher, 'id'>) => void;
  updateTeacher: (id: number, item: Partial<Teacher>) => void;
  deleteTeacher: (id: number) => void;

  clubs: Club[];
  addClub: (item: Omit<Club, 'id'>) => void;
  updateClub: (id: number, item: Partial<Club>) => void;
  deleteClub: (id: number) => void;

  gallery: GalleryItem[];
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  deleteGalleryItem: (id: number) => void;

  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Initial Mock Data (News)
const INITIAL_NEWS: NewsItem[] = [
    { 
      id: 0, 
      title: 'Trần Kim Nhật đạt giải Nhì học sinh giỏi quốc gia môn Tin học', 
      excerpt: 'Vượt qua hàng ngàn thí sinh xuất sắc trên cả nước, em Trần Kim Nhật (lớp 12A1) đã xuất sắc giành giải Nhì môn Tin học trong kỳ thi chọn Học sinh giỏi Quốc gia năm học 2025-2026.', 
      content: `
        <p>Kỳ thi chọn Học sinh giỏi Quốc gia năm học 2025-2026 do Bộ Giáo dục và Đào tạo tổ chức đã chính thức công bố kết quả. Niềm vui vỡ òa đến với thầy và trò trường THPT Hương Khê khi em <strong>Trần Kim Nhật</strong>, học sinh lớp 12A1, đã xuất sắc giành giải Nhì môn Tin học.</p>
        
        <h3>Hành trình chinh phục đỉnh cao</h3>
        <p>Để đạt được thành tích này, Nhật đã phải trải qua những ngày tháng ôn luyện miệt mài. Chia sẻ về bí quyết học tập, Nhật cho biết: <em>"Em luôn cố gắng nắm vững kiến thức cơ bản trong sách giáo khoa, sau đó tìm tòi các bài tập nâng cao trên mạng và các diễn đàn lập trình quốc tế. Sự hướng dẫn tận tình của thầy cô tổ Tin học cũng là động lực lớn giúp em vượt qua những bài toán khó."</em></p>
        
        <h3>Niềm tự hào của nhà trường</h3>
        <p>Thầy Hồ Đức Cương - Hiệu trưởng nhà trường cho biết: <em>"Thành tích của em Nhật không chỉ là niềm vinh dự cho cá nhân và gia đình em, mà còn là niềm tự hào to lớn của trường THPT Hương Khê. Đây là minh chứng rõ nét cho chất lượng đào tạo mũi nhọn của nhà trường trong những năm qua."</em></p>
        
        <p>Hy vọng rằng tấm gương của Trần Kim Nhật sẽ lan tỏa, khích lệ tinh thần học tập của toàn thể học sinh trong trường, tiếp tục viết tiếp những trang vàng truyền thống của mái trường 60 năm tuổi.</p>
      `,
      date: '20/01/2026', 
      imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop', 
      category: 'Gương sáng' 
    },
    { 
      id: 1, 
      title: 'Lễ tổng kết năm học 2024-2025 và Tri ân trưởng thành', 
      excerpt: 'Nhà trường long trọng tổ chức lễ tổng kết, đánh dấu một năm học thắng lợi với nhiều thành tích đáng tự hào.', 
      content: `
        <p>Trong không khí rực rỡ của hoa phượng đỏ và tiếng ve kêu râm ran báo hiệu mùa hè, sáng ngày 25/05/2025, trường THPT Hương Khê đã long trọng tổ chức <strong>Lễ tổng kết năm học 2024-2025 và Lễ Tri ân - Trưởng thành cho học sinh khối 12</strong>.</p>
        
        <h3>Một năm học thắng lợi</h3>
        <p>Năm học 2024-2025 là một năm học đặc biệt với nhiều thách thức và cơ hội. Tuy nhiên, với sự nỗ lực không ngừng nghỉ, thầy và trò nhà trường đã gặt hái được nhiều thành tích xuất sắc:</p>
        <ul>
          <li>Tỷ lệ học sinh đạt học lực Giỏi tăng 5% so với năm trước.</li>
          <li>Đạt 15 giải trong kỳ thi Học sinh giỏi Tỉnh.</li>
          <li>Các hoạt động văn hóa, văn nghệ, thể dục thể thao diễn ra sôi nổi, tạo sân chơi bổ ích cho học sinh.</li>
        </ul>

        <h3>Giây phút tri ân xúc động</h3>
        <p>Phần lắng đọng nhất của buổi lễ chính là Lễ Tri ân và Trưởng thành dành cho học sinh khối 12. Những bó hoa tươi thắm, những lời cảm ơn chân thành gửi đến cha mẹ, thầy cô đã khiến không khí buổi lễ trở nên vô cùng xúc động. </p>
        <p>Đại diện học sinh khối 12, em Nguyễn Thị Mai Anh (12D1) nghẹn ngào: <em>"Ba năm cấp 3 trôi qua nhanh như một giấc mơ. Chúng em xin hứa sẽ cố gắng hết mình trong kỳ thi tốt nghiệp sắp tới để không phụ lòng mong mỏi của thầy cô và cha mẹ."</em></p>
        
        <p>Tiếng trống trường khép lại năm học đã vang lên, mở ra một mùa hè ý nghĩa và một kỳ thi quan trọng phía trước. Chúc các em học sinh khối 12 chân cứng đá mềm, vượt vũ môn hóa rồng thành công!</p>
      `,
      date: '25/05/2025', 
      imageUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800&auto=format&fit=crop', 
      category: 'Hoạt động' 
    },
    { 
      id: 2, 
      title: 'Thông báo tuyển sinh vào lớp 10 năm học 2025-2026', 
      excerpt: 'Trường THPT Hương Khê thông báo kế hoạch tuyển sinh lớp 10 với 450 chỉ tiêu. Hình thức thi tuyển kết hợp xét tuyển.', 
      content: `
        <p>Căn cứ vào kế hoạch tuyển sinh của Sở Giáo dục và Đào tạo Hà Tĩnh, Trường THPT Hương Khê trân trọng thông báo kế hoạch tuyển sinh vào lớp 10 năm học 2025-2026 như sau:</p>

        <h3>1. Chỉ tiêu tuyển sinh</h3>
        <p>Tổng chỉ tiêu: <strong>450 học sinh</strong>, chia thành 10 lớp (bao gồm các lớp định hướng Khoa học Tự nhiên và Khoa học Xã hội).</p>

        <h3>2. Phương thức tuyển sinh</h3>
        <p>Thực hiện theo phương thức <strong>Thi tuyển</strong> do Sở GD&ĐT tổ chức. Thí sinh sẽ thi 3 môn bắt buộc:</p>
        <ul>
            <li><strong>Toán:</strong> Thi tự luận (90 phút).</li>
            <li><strong>Ngữ văn:</strong> Thi tự luận (90 phút).</li>
            <li><strong>Tiếng Anh:</strong> Thi trắc nghiệm kết hợp tự luận (60 phút).</li>
        </ul>

        <h3>3. Thời gian và Hồ sơ</h3>
        <p><strong>Thời gian nộp hồ sơ đăng ký dự thi:</strong> Từ ngày 01/06/2025 đến hết ngày 05/06/2025.</p>
        <p><strong>Hồ sơ bao gồm:</strong></p>
        <ul>
            <li>Đơn đăng ký dự thi (theo mẫu).</li>
            <li>Bản sao giấy khai sinh hợp lệ.</li>
            <li>Bằng tốt nghiệp THCS hoặc giấy chứng nhận tốt nghiệp tạm thời.</li>
            <li>Học bạ cấp THCS (bản chính).</li>
            <li>Giấy xác nhận chế độ ưu tiên (nếu có).</li>
        </ul>

        <p>Nhà trường khuyến khích phụ huynh và học sinh nộp hồ sơ trực tuyến qua cổng thông tin điện tử của trường để tiết kiệm thời gian.</p>
        <p><em>Mọi thắc mắc xin liên hệ Văn phòng nhà trường qua số điện thoại: (0239) 3 871 234.</em></p>
      `,
      date: '15/05/2025', 
      imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop', 
      category: 'Thông báo' 
    },
    { 
        id: 3, 
        title: 'Hội thi văn nghệ chào mừng ngày 26/3', 
        excerpt: 'Sôi nổi các hoạt động văn nghệ, thể thao chào mừng ngày thành lập Đoàn TNCS Hồ Chí Minh.', 
        content: `
          <p>Hòa chung không khí tưng bừng, phấn khởi của tuổi trẻ cả nước chào mừng kỷ niệm 94 năm Ngày thành lập Đoàn TNCS Hồ Chí Minh (26/03/1931 - 26/03/2025), Đoàn trường THPT Hương Khê đã tổ chức thành công <strong>Hội thi Văn nghệ - Thể thao học đường</strong>.</p>
          
          <h3>Sân chơi của sự sáng tạo</h3>
          <p>Hội thi năm nay quy tụ hơn 30 tiết mục văn nghệ đặc sắc đến từ các chi đoàn. Các tiết mục đa dạng về thể loại: từ đơn ca, song ca, múa đương đại, nhảy hiện đại đến kịch nói. Nhiều tiết mục được đầu tư công phu về trang phục, đạo cụ và kịch bản, thể hiện sự sáng tạo không giới hạn của học sinh trường Hương Khê.</p>

          <h3>Kết quả hội thi</h3>
          <p>Ban giám khảo đã làm việc rất vất vả để chọn ra những tiết mục xuất sắc nhất:</p>
          <ul>
            <li><strong>Giải Nhất:</strong> Chi đoàn 11A5 với tiết mục múa "Hào khí Việt Nam".</li>
            <li><strong>Giải Nhì:</strong> Chi đoàn 12D2 (Nhảy Mashup) và 10A1 (Hát múa).</li>
            <li><strong>Giải Ba:</strong> Các chi đoàn 11A2, 12A1, 10D3.</li>
          </ul>

          <p>Bên cạnh văn nghệ, các giải đấu bóng đá, bóng chuyền hơi và kéo co cũng diễn ra vô cùng kịch tính, thu hút sự cổ vũ nhiệt tình của đông đảo học sinh và giáo viên. Đây thực sự là ngày hội lớn, thắt chặt tình đoàn kết và rèn luyện kỹ năng sống cho đoàn viên thanh niên.</p>
        `,
        date: '26/03/2025', 
        imageUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=800&auto=format&fit=crop', 
        category: 'Đoàn thể' 
    },
    { 
        id: 4, 
        title: 'Hội nghị Cán bộ, Viên chức năm học mới', 
        excerpt: 'Triển khai nhiệm vụ trọng tâm năm học 2025-2026 với tinh thần đổi mới, sáng tạo và kỷ cương.', 
        content: `
          <p>Nhằm đánh giá kết quả thực hiện nhiệm vụ năm học cũ và đề ra phương hướng, nhiệm vụ cho năm học mới, ngày 05/09/2025, trường THPT Hương Khê đã long trọng tổ chức <strong>Hội nghị Cán bộ, Viên chức, Người lao động năm học 2025-2026</strong>.</p>

          <h3>Đổi mới căn bản, toàn diện</h3>
          <p>Tại hội nghị, thầy Hồ Đức Cương - Hiệu trưởng nhà trường đã trình bày báo cáo tổng kết năm học 2024-2025 và dự thảo kế hoạch năm học 2025-2026. Báo cáo nhấn mạnh việc tiếp tục thực hiện chương trình GDPT 2018, đẩy mạnh chuyển đổi số trong quản lý và dạy học, đồng thời nâng cao chất lượng giáo dục mũi nhọn.</p>

          <h3>Dân chủ - Kỷ cương - Tình thương - Trách nhiệm</h3>
          <p>Hội nghị đã diễn ra trong không khí dân chủ, cởi mở. Các đại biểu đã sôi nổi thảo luận, đóng góp nhiều ý kiến thiết thực về các vấn đề như: cải thiện đời sống giáo viên, đầu tư cơ sở vật chất, giải pháp nâng cao chất lượng ôn thi tốt nghiệp THPT...</p>
          
          <p>Kết thúc hội nghị, 100% cán bộ, viên chức đã biểu quyết nhất trí thông qua Nghị quyết Hội nghị, thể hiện sự đồng lòng, quyết tâm cao độ để hoàn thành xuất sắc nhiệm vụ năm học mới, đưa trường THPT Hương Khê ngày càng phát triển vững mạnh.</p>
        `,
        date: '05/09/2025', 
        imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop', 
        category: 'Hoạt động' 
    }
];

const INITIAL_IMAGES: GlobalImages = {
  logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=400&auto=format&fit=crop',
  homeHero: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1000&auto=format&fit=crop',
  principal: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop',
  introHistory: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop'
};

const INITIAL_TEACHERS: Teacher[] = [
  { id: 1, name: 'Thầy Hồ Đức Cương', position: 'Hiệu trưởng', subject: 'Toán học', email: 'cuonghd@huongkhe.edu.vn', department: 'Ban Giám Hiệu', imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400' },
  { id: 2, name: 'Cô Nguyễn Thị Lan', position: 'Phó Hiệu trưởng', subject: 'Ngữ văn', email: 'lannt@huongkhe.edu.vn', department: 'Ban Giám Hiệu', imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400' },
  { id: 3, name: 'Thầy Lê Văn Hùng', position: 'Tổ trưởng', subject: 'Vật lý', email: 'hunglv@huongkhe.edu.vn', department: 'Tổ Lý - Hóa', imageUrl: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=400' },
  { id: 4, name: 'Cô Phạm Minh Anh', position: 'Giáo viên', subject: 'Tiếng Anh', email: 'anhpm@huongkhe.edu.vn', department: 'Tổ Ngoại Ngữ', imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400' },
  { id: 5, name: 'Thầy Trần Quốc Tuấn', position: 'Giáo viên', subject: 'Tin học', email: 'tuantq@huongkhe.edu.vn', department: 'Tổ Toán - Tin', imageUrl: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=400' },
  { id: 6, name: 'Cô Lê Thị Mai', position: 'Giáo viên', subject: 'Lịch sử', email: 'mailt@huongkhe.edu.vn', department: 'Tổ Xã Hội', imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400' },
];

const INITIAL_CLUBS: Club[] = [
  { id: 1, name: 'CLB Tiếng Anh (HEC)', description: 'Môi trường rèn luyện kỹ năng giao tiếp tiếng Anh năng động.', members: 45, schedule: 'Thứ 5 & Chủ nhật', imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600' },
  { id: 2, name: 'CLB Bóng rổ (HKBC)', description: 'Nơi thỏa mãn đam mê với trái bóng cam.', members: 30, schedule: 'Chiều thứ 2, 4, 6', imageUrl: 'https://images.unsplash.com/photo-1519861531473-920026393112?q=80&w=600' },
  { id: 3, name: 'CLB Truyền thông (HK Media)', description: 'Đưa tin tức, sự kiện và hình ảnh nhà trường đến mọi người.', members: 20, schedule: 'Linh hoạt', imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=600' },
  { id: 4, name: 'CLB Tình nguyện (Volunteer)', description: 'Lan tỏa yêu thương qua các hoạt động thiện nguyện.', members: 60, schedule: 'Tháng 1 lần', imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=600' },
];

const INITIAL_GALLERY: GalleryItem[] = [
  { id: 1, title: 'Lễ Khai giảng năm học 2025-2026', category: 'Sự kiện', imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600' },
  { id: 2, title: 'Hội trại 26/3', category: 'Hoạt động', imageUrl: 'https://images.unsplash.com/photo-1472653431158-6364773b2a56?q=80&w=600' },
  { id: 3, title: 'Giải bóng đá học sinh', category: 'Thể thao', imageUrl: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=600' },
  { id: 4, title: 'Học sinh giỏi Quốc gia', category: 'Thành tích', imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ee2?q=80&w=600' },
];

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // News State
  const [news, setNews] = useState<NewsItem[]>(() => {
    const saved = localStorage.getItem('school_news');
    return saved ? JSON.parse(saved) : INITIAL_NEWS;
  });

  // Global Images State
  const [globalImages, setGlobalImages] = useState<GlobalImages>(() => {
    const saved = localStorage.getItem('school_images');
    return saved ? JSON.parse(saved) : INITIAL_IMAGES;
  });

  // Dynamic Data States with persistence
  const [teachers, setTeachers] = useState<Teacher[]>(() => {
    const saved = localStorage.getItem('school_teachers');
    return saved ? JSON.parse(saved) : INITIAL_TEACHERS;
  });

  const [clubs, setClubs] = useState<Club[]>(() => {
    const saved = localStorage.getItem('school_clubs');
    return saved ? JSON.parse(saved) : INITIAL_CLUBS;
  });

  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('school_gallery');
    return saved ? JSON.parse(saved) : INITIAL_GALLERY;
  });

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
      return localStorage.getItem('admin_auth') === 'true';
  });

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('school_news', JSON.stringify(news));
  }, [news]);

  useEffect(() => {
    localStorage.setItem('school_images', JSON.stringify(globalImages));
  }, [globalImages]);

  useEffect(() => {
    localStorage.setItem('school_teachers', JSON.stringify(teachers));
  }, [teachers]);

  useEffect(() => {
    localStorage.setItem('school_clubs', JSON.stringify(clubs));
  }, [clubs]);

  useEffect(() => {
    localStorage.setItem('school_gallery', JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
      localStorage.setItem('admin_auth', String(isAuthenticated));
  }, [isAuthenticated]);

  // Actions

  // News
  const addNews = (item: Omit<NewsItem, 'id'>) => {
    const newId = news.length > 0 ? Math.max(...news.map(n => n.id)) + 1 : 0;
    const newItem = { ...item, id: newId };
    setNews([newItem, ...news]);
  };
  const updateNews = (id: number, updatedItem: Partial<NewsItem>) => {
    setNews(news.map(item => item.id === id ? { ...item, ...updatedItem } : item));
  };
  const deleteNews = (id: number) => {
    setNews(news.filter(item => item.id !== id));
  };

  // Global Images
  const updateGlobalImages = (images: GlobalImages) => {
    setGlobalImages(images);
  };

  // Teachers
  const addTeacher = (item: Omit<Teacher, 'id'>) => {
    const newId = teachers.length > 0 ? Math.max(...teachers.map(t => t.id)) + 1 : 1;
    setTeachers([...teachers, { ...item, id: newId }]);
  };
  const updateTeacher = (id: number, updatedItem: Partial<Teacher>) => {
    setTeachers(teachers.map(t => t.id === id ? { ...t, ...updatedItem } : t));
  };
  const deleteTeacher = (id: number) => {
    setTeachers(teachers.filter(t => t.id !== id));
  };

  // Clubs
  const addClub = (item: Omit<Club, 'id'>) => {
    const newId = clubs.length > 0 ? Math.max(...clubs.map(c => c.id)) + 1 : 1;
    setClubs([...clubs, { ...item, id: newId }]);
  };
  const updateClub = (id: number, updatedItem: Partial<Club>) => {
    setClubs(clubs.map(c => c.id === id ? { ...c, ...updatedItem } : c));
  };
  const deleteClub = (id: number) => {
    setClubs(clubs.filter(c => c.id !== id));
  };

  // Gallery
  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    const newId = gallery.length > 0 ? Math.max(...gallery.map(g => g.id)) + 1 : 1;
    setGallery([...gallery, { ...item, id: newId }]);
  };
  const deleteGalleryItem = (id: number) => {
    setGallery(gallery.filter(g => g.id !== id));
  };

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <DataContext.Provider value={{ 
      news, addNews, updateNews, deleteNews, 
      globalImages, updateGlobalImages,
      teachers, addTeacher, updateTeacher, deleteTeacher,
      clubs, addClub, updateClub, deleteClub,
      gallery, addGalleryItem, deleteGalleryItem,
      isAuthenticated, login, logout 
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
