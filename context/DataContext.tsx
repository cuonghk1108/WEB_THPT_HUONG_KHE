import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { NewsItem, GlobalImages, Teacher, Club, GalleryItem, StudentCornerData, ExamItem, FormItem, Event, Achievement, AchievementYear, DigitalResource, StudentPortalData, GradeItem, AssignmentItem, Announcement } from '../types';
import { cloudStorage } from '../services/cloudStorage';
import { getBackupImageUrl } from '../utils/backupImageLoader';
import { 
  subscribeToNews, 
  subscribeToTeachers, 
  subscribeToClubs, 
  subscribeToGallery, 
  subscribeToEvents, 
  unsubscribeAll 
} from '../services/supabaseRealtimeService';
import { 
  saveNews as saveNewsToSupabase, 
  saveTeacher as saveTeacherToSupabase, 
  saveClub as saveClubToSupabase, 
  saveGalleryImage as saveGalleryToSupabase, 
  saveEvent as saveEventToSupabase, 
  saveAchievement as saveAchievementToSupabase,
  getAllNews as getAllNewsFromSupabase,
  getAllTeachers as getAllTeachersFromSupabase,
  getAllClubs as getAllClubsFromSupabase,
  getAllGalleryImages as getAllGalleryFromSupabase,
  getAllEvents as getAllEventsFromSupabase,
  deleteNews as deleteNewsFromSupabase,
  deleteTeacher as deleteTeacherFromSupabase,
  deleteClub as deleteClubFromSupabase,
  deleteGalleryImage as deleteGalleryFromSupabase,
  deleteEvent as deleteEventFromSupabase,
  deleteAchievement as deleteAchievementFromSupabase
} from '../services/supabaseService';

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

  studentCorner: StudentCornerData;
  updateStudentCorner: (data: StudentCornerData) => void;
  addExam: (exam: Omit<ExamItem, 'id'>) => void;
  deleteExam: (id: number) => void;
  addForm: (form: Omit<FormItem, 'id'>) => void;
  deleteForm: (id: number) => void;

  events: Event[];
  addEvent: (item: Omit<Event, 'id'>) => void;
  updateEvent: (id: number, item: Partial<Event>) => void;
  deleteEvent: (id: number) => void;

  achievements: Achievement[];
  addAchievement: (item: Omit<Achievement, 'id'>) => void;
  updateAchievement: (id: number, item: Partial<Achievement>) => void;
  deleteAchievement: (id: number) => void;

  achievementYears: AchievementYear[];
  addAchievementYear: (year: number) => void;
  updateAchievementStats: (year: number, stats: AchievementYear['stats']) => void;
  addAchievementToYear: (year: number, item: Omit<Achievement, 'id'>) => void;
  updateAchievementInYear: (year: number, id: number, item: Partial<Achievement>) => void;
  deleteAchievementInYear: (year: number, id: number) => void;

  digitalLibrary: DigitalResource[];
  addResource: (item: Omit<DigitalResource, 'id'>) => void;
  updateResource: (id: number, item: Partial<DigitalResource>) => void;
  deleteResource: (id: number) => void;

  studentPortal: StudentPortalData;
  updateStudentInfo: (info: StudentPortalData['info']) => void;
  addGrade: (grade: GradeItem) => void;
  updateGrade: (index: number, grade: Partial<GradeItem>) => void;
  deleteGrade: (index: number) => void;
  addAssignment: (assignment: AssignmentItem) => void;
  updateAssignment: (index: number, assignment: Partial<AssignmentItem>) => void;
  deleteAssignment: (index: number) => void;

  announcements: Announcement[];
  addAnnouncement: (item: Omit<Announcement, 'id'>) => void;
  updateAnnouncement: (id: number, item: Partial<Announcement>) => void;
  deleteAnnouncement: (id: number) => void;

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
        
        <h3>Hành trình bền bỉ và chiến lược ôn luyện</h3>
        <p>Để đạt được thành tích này, Nhật đã phải trải qua những ngày tháng ôn luyện miệt mài. Em chủ động xây dựng lộ trình học tập gồm ba giai đoạn: củng cố nền tảng, luyện kỹ thuật, và mô phỏng thi. Ở mỗi giai đoạn, Nhật đều đặt mục tiêu cụ thể như hoàn thành bộ đề theo từng chủ đề (graph, DP, number theory), ghi chép lỗi sai và rút ra quy tắc "không lặp lại sai lầm".</p>
        <p>Nhật chia sẻ: <em>"Em luôn cố gắng nắm vững kiến thức cơ bản trong sách giáo khoa, sau đó tìm tòi các bài tập nâng cao trên mạng và các diễn đàn lập trình quốc tế. Sự hướng dẫn tận tình của thầy cô tổ Tin học cũng là động lực lớn giúp em vượt qua những bài toán khó."</em> Bên cạnh đó, em còn dành thời gian rèn tư duy thuật toán bằng cách giải thích lời giải cho bạn cùng lớp, bởi <em>"giải thích được tức là hiểu sâu"</em>.</p>
        
        <h3>Khoảnh khắc trên bục vinh quang</h3>
        <p>Khi được xướng tên tại lễ trao giải, Nhật xúc động gửi lời cảm ơn tới gia đình, thầy cô và bạn bè: <em>"Không có sự tin tưởng và động viên của mọi người, em khó có thể đi đường dài."</em> Đại diện nhà trường đã trao tặng giấy khen và phần thưởng nhằm ghi nhận nỗ lực không ngừng của em.</p>
        
        <h3>Niềm tự hào của nhà trường</h3>
        <p>Thầy Hồ Đức Cương - Hiệu trưởng nhà trường cho biết: <em>"Thành tích của em Nhật không chỉ là niềm vinh dự cho cá nhân và gia đình em, mà còn là niềm tự hào to lớn của trường THPT Hương Khê. Đây là minh chứng rõ nét cho chất lượng đào tạo mũi nhọn của nhà trường trong những năm qua."</em></p>
        <p>Nhà trường sẽ tiếp tục đầu tư cho các đội tuyển, xây dựng môi trường học thuật cởi mở để học sinh có thể phát huy tối đa năng lực. Sắp tới, tổ Tin học dự kiến tổ chức chuỗi workshop "Thuật toán ứng dụng" để lan tỏa tinh thần học tập và chia sẻ kinh nghiệm.</p>
        
        <h3>Thông điệp gửi tới các bạn học sinh</h3>
        <p>Thành công của Nhật là câu chuyện về kỷ luật, sự kiên trì và tinh thần tự học. Hy vọng tấm gương của em sẽ lan tỏa, khích lệ tinh thần học tập của toàn thể học sinh trong trường, tiếp tục viết tiếp những trang vàng truyền thống của mái trường 60 năm tuổi.</p>
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
        
        <h3>Một năm học thắng lợi với nhiều dấu ấn</h3>
        <p>Năm học 2024-2025 là một năm học đặc biệt với nhiều thách thức và cơ hội. Tuy nhiên, với sự nỗ lực không ngừng nghỉ, thầy và trò nhà trường đã gặt hái được nhiều thành tích xuất sắc:</p>
        <ul>
          <li>Tỷ lệ học sinh đạt học lực Giỏi tăng 5% so với năm trước.</li>
          <li>Đạt 15 giải trong kỳ thi Học sinh giỏi Tỉnh.</li>
          <li>Nhiều đề tài nghiên cứu khoa học học sinh được ứng dụng vào thực tế.</li>
          <li>Các hoạt động văn hóa, văn nghệ, thể dục thể thao diễn ra sôi nổi, tạo sân chơi bổ ích cho học sinh.</li>
        </ul>
        <p>Ngoài thành tích học tập, nhà trường chú trọng giáo dục giá trị sống, kỹ năng mềm, tinh thần trách nhiệm cộng đồng thông qua các chương trình ngoại khóa, tình nguyện, hướng nghiệp.</p>

        <h3>Giây phút tri ân xúc động</h3>
        <p>Phần lắng đọng nhất của buổi lễ chính là Lễ Tri ân và Trưởng thành dành cho học sinh khối 12. Những bó hoa tươi thắm, những lời cảm ơn chân thành gửi đến cha mẹ, thầy cô đã khiến không khí buổi lễ trở nên vô cùng xúc động. </p>
        <p>Đại diện học sinh khối 12, em Nguyễn Thị Mai Anh (12D1) nghẹn ngào: <em>"Ba năm cấp 3 trôi qua nhanh như một giấc mơ. Chúng em xin hứa sẽ cố gắng hết mình trong kỳ thi tốt nghiệp sắp tới để không phụ lòng mong mỏi của thầy cô và cha mẹ."</em></p>
        
        <h3>Hướng tới tương lai</h3>
        <p>Tiếng trống trường khép lại năm học đã vang lên, mở ra một mùa hè ý nghĩa và một kỳ thi quan trọng phía trước. Chúc các em học sinh khối 12 chân cứng đá mềm, vượt vũ môn hóa rồng thành công! Nhà trường luôn đồng hành, hỗ trợ các em trong chặng đường phía trước.</p>
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
        <p>Tổng chỉ tiêu: <strong>450 học sinh</strong>, chia thành 10 lớp (bao gồm các lớp định hướng Khoa học Tự nhiên và Khoa học Xã hội). Nhà trường ưu tiên tạo điều kiện cho học sinh có năng khiếu tham gia các câu lạc bộ học thuật, nghệ thuật và thể thao.</p>

        <h3>2. Phương thức tuyển sinh</h3>
        <p>Thực hiện theo phương thức <strong>Thi tuyển</strong> do Sở GD&ĐT tổ chức. Thí sinh sẽ thi 3 môn bắt buộc và có thể có các môn tự chọn theo định hướng:</p>
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

        <h3>4. Quyền lợi học sinh</h3>
        <p>Học sinh trúng tuyển sẽ được tham gia môi trường học tập hiện đại với phòng thí nghiệm, thư viện số, câu lạc bộ đa dạng. Nhà trường có các chương trình học bổng khuyến học dành cho học sinh xuất sắc và hoàn cảnh khó khăn.</p>

        <p>Nhà trường khuyến khích phụ huynh và học sinh nộp hồ sơ trực tuyến qua cổng thông tin điện tử của trường để tiết kiệm thời gian. <em>Mọi thắc mắc xin liên hệ Văn phòng nhà trường qua số điện thoại: (0239) 3 871 234.</em></p>
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
            <p>Bên cạnh các tiết mục văn nghệ, khu vực trưng bày ảnh, sản phẩm handmade, truyền thông số do CLB Media thực hiện đã thu hút sự quan tâm lớn của học sinh và phụ huynh. Sự phối hợp giữa văn nghệ và công nghệ đã tạo nên một ngày hội đa sắc màu.</p>

          <h3>Kết quả hội thi</h3>
          <p>Ban giám khảo đã làm việc rất vất vả để chọn ra những tiết mục xuất sắc nhất:</p>
          <ul>
            <li><strong>Giải Nhất:</strong> Chi đoàn 11A5 với tiết mục múa "Hào khí Việt Nam".</li>
            <li><strong>Giải Nhì:</strong> Chi đoàn 12D2 (Nhảy Mashup) và 10A1 (Hát múa).</li>
            <li><strong>Giải Ba:</strong> Các chi đoàn 11A2, 12A1, 10D3.</li>
          </ul>
          
            <h3>Lan tỏa tinh thần đoàn kết</h3>
            <p>Bên cạnh văn nghệ, các giải đấu bóng đá, bóng chuyền hơi và kéo co cũng diễn ra vô cùng kịch tính, thu hút sự cổ vũ nhiệt tình của đông đảo học sinh và giáo viên. Đây thực sự là ngày hội lớn, thắt chặt tình đoàn kết và rèn luyện kỹ năng sống cho đoàn viên thanh niên.</p>
            <p>Đoàn trường khẳng định sẽ duy trì các hoạt động định kỳ, mở rộng thêm các sân chơi về STEM, khởi nghiệp và truyền thông, để mỗi học sinh đều có cơ hội tỏa sáng ở lĩnh vực mình yêu thích.</p>
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
            <p>Nhà trường đặt mục tiêu xây dựng hệ sinh thái số phục vụ quản trị, giảng dạy và đánh giá, hướng tới mô hình “Trường học thông minh”. Các tổ chuyên môn sẽ triển khai dạy học dự án, tăng cường trải nghiệm thực tế và kết nối với doanh nghiệp địa phương.</p>

          <h3>Dân chủ - Kỷ cương - Tình thương - Trách nhiệm</h3>
            <p>Hội nghị đã diễn ra trong không khí dân chủ, cởi mở. Các đại biểu đã sôi nổi thảo luận, đóng góp nhiều ý kiến thiết thực về các vấn đề như: cải thiện đời sống giáo viên, đầu tư cơ sở vật chất, giải pháp nâng cao chất lượng ôn thi tốt nghiệp THPT...</p>
            <p>Kết thúc hội nghị, 100% cán bộ, viên chức đã biểu quyết nhất trí thông qua Nghị quyết Hội nghị, thể hiện sự đồng lòng, quyết tâm cao độ để hoàn thành xuất sắc nhiệm vụ năm học mới, đưa trường THPT Hương Khê ngày càng phát triển vững mạnh.</p>
          
            <h3>Hành động cụ thể</h3>
            <p>Ngay sau hội nghị, nhà trường triển khai kế hoạch tu sửa cơ sở vật chất, bổ sung trang thiết bị phòng học, cải thiện cảnh quan xanh – sạch – đẹp, và phát động phong trào thi đua năm học mới. Tất cả hướng tới mục tiêu: mỗi giờ lên lớp là một giờ học chất lượng.</p>
        `,
        date: '05/09/2025', 
        imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop', 
        category: 'Hoạt động' 
    }
];

const INITIAL_ACHIEVEMENT_YEARS: AchievementYear[] = [
  {
    year: 2024,
    stats: [
      { label: 'Giải Quốc gia', value: 9, color: 'from-yellow-400 to-orange-500' },
      { label: 'Giải Tỉnh', value: 22, color: 'from-blue-400 to-cyan-500' },
      { label: 'Học sinh vinh danh', value: 33, color: 'from-purple-400 to-pink-500' },
      { label: 'Đạt học lực giỏi', value: '85%', color: 'from-green-400 to-emerald-500' },
    ],
    items: [
      { id: 1, title: 'Giải Ba HSG Quốc gia - Vật lý', description: 'Phạm Quang Huy (12A1)', date: '18/03/2024', level: 'Quốc gia', icon: 'trophy', category: 'Quốc gia' },
      { id: 2, title: 'Giải Nhất Toán tỉnh', description: '5 học sinh', date: '20/02/2024', level: 'Tỉnh', icon: 'star', category: 'Tỉnh' },
      { id: 3, title: 'Giải Nhì KHKT Quốc gia', description: 'Nhóm STEM HK', date: '28/03/2024', level: 'Quốc gia', icon: 'award', category: 'Quốc gia' },
      { id: 4, title: 'Giải Nhì Olympic Tiếng Anh tỉnh', description: '3 học sinh', date: '10/04/2024', level: 'Tỉnh', icon: 'medal', category: 'Tỉnh' },
    ],
  },
  {
    year: 2025,
    stats: [
      { label: 'Giải Quốc gia', value: 11, color: 'from-yellow-400 to-orange-500' },
      { label: 'Giải Tỉnh', value: 25, color: 'from-blue-400 to-cyan-500' },
      { label: 'Học sinh vinh danh', value: 40, color: 'from-purple-400 to-pink-500' },
      { label: 'Đạt học lực giỏi', value: '86%', color: 'from-green-400 to-emerald-500' },
    ],
    items: [
      { id: 1, title: 'Giải Nhất HSG Quốc gia - Tin học', description: 'Lê Minh Đức (12A1)', date: '12/02/2025', level: 'Quốc gia', icon: 'trophy', category: 'Quốc gia' },
      { id: 2, title: 'Giải Ba HSG Quốc gia - Sinh học', description: 'Trần Thu Hà (11A3)', date: '25/02/2025', level: 'Quốc gia', icon: 'medal', category: 'Quốc gia' },
      { id: 3, title: 'Giải Nhì Vật lý tỉnh', description: '7 học sinh', date: '05/03/2025', level: 'Tỉnh', icon: 'star', category: 'Tỉnh' },
      { id: 4, title: 'Giải Nhất Olympic Toán tỉnh', description: '5 học sinh', date: '20/04/2025', level: 'Tỉnh', icon: 'award', category: 'Tỉnh' },
    ],
  },
  {
    year: 2026,
    stats: [
      { label: 'Giải Quốc gia', value: 13, color: 'from-yellow-400 to-orange-500' },
      { label: 'Giải Tỉnh', value: 30, color: 'from-blue-400 to-cyan-500' },
      { label: 'Học sinh vinh danh', value: 48, color: 'from-purple-400 to-pink-500' },
      { label: 'Đạt học lực giỏi', value: '88%', color: 'from-green-400 to-emerald-500' },
    ],
    items: [
      { id: 1, title: 'Giải Nhì HSG Quốc gia - Tin học', description: 'Trần Kim Nhật (12A1)', date: '20/01/2026', level: 'Quốc gia', icon: 'trophy', category: 'Quốc gia' },
      { id: 2, title: 'Giải Nhất Violympic Toán', description: 'Nguyễn Văn A (11A2)', date: '15/01/2026', level: 'Quốc gia', icon: 'medal', category: 'Quốc gia' },
      { id: 3, title: 'Giải Ba Tiếng Anh - Quốc tế', description: 'Lê Thị B (12B1)', date: '10/01/2026', level: 'Quốc tế', icon: 'trophy', category: 'Quốc tế' },
      { id: 4, title: 'Giải Nhất Toán tỉnh', description: '5 học sinh', date: '25/12/2026', level: 'Tỉnh', icon: 'star', category: 'Tỉnh' },
    ],
  },
];

const INITIAL_RESOURCES: DigitalResource[] = [
  { id: 1, title: 'Hóa học lớp 12 - Sách giáo khoa', author: 'NXB Giáo dục', category: 'Sách giáo khoa', year: 2024, type: 'PDF', views: 2450, url: '#' },
  { id: 2, title: 'Toán nâng cao - Giải phương trình', author: 'GS. Lê Quý Đôn', category: 'Tham khảo', year: 2024, type: 'PDF', views: 1820, url: '#' },
  { id: 3, title: 'Tiếng Anh - IELTS Preparation', author: 'Cambridge', category: 'E-book', year: 2023, type: 'EPUB', views: 3200, url: '#' },
  { id: 4, title: 'Vật lý - Cơ học và Sóng', author: 'PGS. Trần Hữu Dân', category: 'Sách giáo khoa', year: 2024, type: 'PDF', views: 1650, url: '#' },
  { id: 5, title: 'Lịch sử Việt Nam', author: 'TS. Phạm Văn Sơn', category: 'Tham khảo', year: 2023, type: 'PDF', views: 980, url: '#' },
  { id: 6, title: 'Sinh học tế bào và di truyền', author: 'NXB Khoa học', category: 'Tài liệu học tập', year: 2024, type: 'PDF', views: 1340, url: '#' },
];

const INITIAL_STUDENT_PORTAL: StudentPortalData = {
  info: {
    name: 'Nguyễn Văn A',
    class: '12A1',
    gpa: '8.5',
    attendanceRate: '97%',
    credits: '145/160',
  },
  grades: [
    { subject: 'Toán học', midterm: '8.5', final: '8.8' },
    { subject: 'Tiếng Anh', midterm: '8.0', final: '8.3' },
    { subject: 'Lịch sử', midterm: '9.0', final: '9.2' },
    { subject: 'Hóa học', midterm: '7.5', final: '8.0' },
  ],
  assignments: [
    { subject: 'Tiếng Anh', title: 'Essay on Climate Change', dueDate: '30/01/2026', status: 'submitted' },
    { subject: 'Toán học', title: 'Calculus Problem Set', dueDate: '02/02/2026', status: 'pending' },
    { subject: 'Sinh học', title: 'Project Report', dueDate: '05/02/2026', status: 'not-started' },
  ],
};

// Auto-expansion: if news content is too short, enrich with longer content
const EXPANDED_NEWS_BY_ID: Record<number, { excerpt?: string; content?: string }> = {
  0: {
    excerpt: 'Hành trình bền bỉ của Trần Kim Nhật với thuật toán, kỷ luật và niềm đam mê đã mang về giải Nhì Quốc gia môn Tin học – niềm tự hào lớn của THPT Hương Khê.',
  },
  1: {
    excerpt: 'Lễ tổng kết năm học: điểm lại thành tựu, tri ân phụ huynh – thầy cô, và tiếp thêm động lực cho học sinh khối 12 bước vào kỳ thi quan trọng phía trước.',
  },
  2: {
    excerpt: 'Thông tin tuyển sinh lớp 10 năm học 2025-2026: chỉ tiêu, phương thức thi, thời gian – hồ sơ và quyền lợi dành cho học sinh trúng tuyển.',
  },
  3: {
    excerpt: 'Ngày hội Văn nghệ – Thể thao chào mừng 26/3: sân chơi sáng tạo, kết quả nổi bật và thông điệp đoàn kết cho tuổi trẻ THPT Hương Khê.',
  },
  4: {
    excerpt: 'Hội nghị Cán bộ, Viên chức năm học mới: định hướng đổi mới, chuyển đổi số và hành động cụ thể để nâng cao chất lượng giáo dục toàn diện.',
  },
};

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

const DEFAULT_WEEK_SCHEDULE: ScheduleRow[] = [
  { day: 'Thứ 2', periods: ['Chào cờ', 'Toán', 'Toán', 'Lý', 'Hóa'] },
  { day: 'Thứ 3', periods: ['Văn', 'Văn', 'Anh', 'Sử', 'Địa'] },
  { day: 'Thứ 4', periods: ['Tin', 'Tin', 'Sinh', 'GDCD', 'CN'] },
  { day: 'Thứ 5', periods: ['Toán', 'Toán', 'Văn', 'Anh', 'Thể dục'] },
  { day: 'Thứ 6', periods: ['Lý', 'Hóa', 'Sinh', 'Công nghệ', 'Âm nhạc'] },
  { day: 'Thứ 7', periods: ['Sử', 'Địa', 'GDQP', 'Hoạt động trải nghiệm', 'Sinh hoạt lớp'] },
];

const CLASS_NAMES = [
  '10A1', '10A2', '10A3', '10A4', '10A5', '10A6', '10A7', '10A8', '10A9',
  '10C1', '10C2', '10C3', '10C4', '10C5', '10C6',
  '11A1', '11A2', '11A3', '11A4', '11A5', '11A6', '11A7', '11A8',
  '11C1', '11C2', '11C3', '11C4', '11C5', '11C6', '11C7',
  '12A1', '12A2', '12A3', '12A4', '12A5', '12A6', '12A7',
  '12C1', '12C2', '12C3', '12C4', '12C5', '12C6', '12C7', '12C8',
];

const SUBJECT_POOL = [
  'Toán', 'Văn', 'Anh', 'Lý', 'Hóa', 'Sinh', 'Sử', 'Địa', 'GDCD', 'Tin',
  'Công nghệ', 'Thể dục', 'Âm nhạc', 'Mỹ thuật', 'GDQP', 'Công dân số', 'STEM',
  'Hoạt động trải nghiệm', 'Sinh hoạt lớp', 'Tự chọn'
];

const hashClassName = (name: string) => name.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
const rotateArray = <T,>(arr: T[], offset: number): T[] => arr.map((_, idx) => arr[(idx + offset) % arr.length]);
const applyFixedSlots = (periods: string[], day: string) => {
  const next = [...periods];
  if (day === 'Thứ 2' && next.length > 0) next[0] = 'Chào cờ';
  if (day === 'Thứ 7' && next.length > 4) next[4] = 'Sinh hoạt lớp';
  return next;
};
const createScheduleForClass = (className: string): ScheduleRow[] => {
  const basePeriods = DEFAULT_WEEK_SCHEDULE[0]?.periods.length || 5;
  const hash = hashClassName(className);
  return DEFAULT_WEEK_SCHEDULE.map((row, dayIdx) => {
    const dayShift = (hash + dayIdx * 7) % SUBJECT_POOL.length;
    const dayPool = rotateArray(SUBJECT_POOL, dayShift);
    const periods = applyFixedSlots(dayPool.slice(0, basePeriods), row.day);
    return { day: row.day, periods };
  });
};
const buildScheduleByClass = () => CLASS_NAMES.map(className => ({ className, scheduleRows: createScheduleForClass(className) }));

const schedulesEqual = (rows: ScheduleRow[], target: ScheduleRow[]) => {
  if (rows.length !== target.length) return false;
  return rows.every((row, idx) =>
    row.day === target[idx].day &&
    row.periods.length === target[idx].periods.length &&
    row.periods.every((p, pIdx) => p === target[idx].periods[pIdx])
  );
};

const INITIAL_STUDENT_CORNER: StudentCornerData = {
  scheduleTitle: 'Thời khóa biểu (Áp dụng từ tuần 5)',
  scheduleDescription: 'Lịch học chi tiết cho từng lớp',
  scheduleByClass: buildScheduleByClass(),
  scheduleNote: '* Đây là thời khóa biểu mẫu. Học sinh vui lòng xem chi tiết theo từng lớp tại bảng tin nhà trường.',
  examTitle: 'Lịch kiểm tra tập trung',
  exams: [
    { id: 1, date: '15/10/2025', subject: 'Toán học (1 tiết)', time: '7:00 - 7:45' },
    { id: 2, date: '16/10/2025', subject: 'Ngữ văn (2 tiết)', time: '8:00 - 9:30' },
    { id: 3, date: '18/10/2025', subject: 'Tiếng Anh (1 tiết)', time: '9:45 - 10:30' },
  ],
  formTitle: 'Biểu mẫu & Quy định',
  forms: [
    { id: 1, name: 'Đơn xin nghỉ học có phép' },
    { id: 2, name: 'Đơn xin phúc khảo bài thi' },
    { id: 3, name: 'Giấy xác nhận học sinh' },
    { id: 4, name: 'Bản cam kết an toàn giao thông' },
    { id: 5, name: 'Nội quy học sinh (Sửa đổi 2025)' },
  ],
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // News State
  const [news, setNews] = useState<NewsItem[]>(() => {
    try {
      const saved = localStorage.getItem('school_news');
      if (saved) {
        const parsed = JSON.parse(saved);
        return (parsed && parsed.length > 0) ? parsed : INITIAL_NEWS;
      }
    } catch (error) {
      console.error('Error loading news from localStorage:', error);
    }
    return INITIAL_NEWS;
  });



  // Global Images State
  const [globalImages, setGlobalImages] = useState<GlobalImages>(() => {
    try {
      const saved = localStorage.getItem('school_images');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Check if parsed data has actual values
        if (parsed && parsed.homeHero && parsed.logo) {
          return parsed;
        }
      }
    } catch (error) {
      console.error('Error loading images from localStorage:', error);
    }
    return INITIAL_IMAGES;
  });

  // Dynamic Data States with persistence
  const [teachers, setTeachers] = useState<Teacher[]>(() => {
    try {
      const saved = localStorage.getItem('school_teachers');
      if (saved) {
        const parsed = JSON.parse(saved);
        return (parsed && parsed.length > 0) ? parsed : INITIAL_TEACHERS;
      }
    } catch (error) {
      console.error('Error loading teachers from localStorage:', error);
    }
    return INITIAL_TEACHERS;
  });

  const [clubs, setClubs] = useState<Club[]>(() => {
    try {
      const saved = localStorage.getItem('school_clubs');
      if (saved) {
        const parsed = JSON.parse(saved);
        return (parsed && parsed.length > 0) ? parsed : INITIAL_CLUBS;
      }
    } catch (error) {
      console.error('Error loading clubs from localStorage:', error);
    }
    return INITIAL_CLUBS;
  });

  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem('school_gallery');
      if (saved) {
        const parsed = JSON.parse(saved);
        return (parsed && parsed.length > 0) ? parsed : INITIAL_GALLERY;
      }
    } catch (error) {
      console.error('Error loading gallery from localStorage:', error);
    }
    return INITIAL_GALLERY;
  });

  const [studentCorner, setStudentCorner] = useState<StudentCornerData>(() => {
    try {
      const saved = localStorage.getItem('school_student_corner');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.scheduleByClass && parsed.scheduleRows) {
          // Legacy format: only one scheduleRows -> wrap as a single class
          parsed.scheduleByClass = [{ className: 'Chung', scheduleRows: parsed.scheduleRows }];
          delete parsed.scheduleRows;
        }
        const hasCompleteSchedule = parsed.scheduleByClass
          && parsed.scheduleByClass.length === CLASS_NAMES.length
          && parsed.scheduleByClass.every((cls: ClassSchedule) => cls.scheduleRows && cls.scheduleRows.length >= DEFAULT_WEEK_SCHEDULE.length);
        if (hasCompleteSchedule) {
          const allDefaultLike = parsed.scheduleByClass.every((cls: ClassSchedule) => schedulesEqual(cls.scheduleRows, DEFAULT_WEEK_SCHEDULE));
          if (allDefaultLike) {
            return { ...parsed, scheduleByClass: buildScheduleByClass() };
          }
          return parsed;
        }
      }
    } catch (error) {
      console.error('Error loading student corner from localStorage:', error);
    }
    return INITIAL_STUDENT_CORNER;
  });

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
      return localStorage.getItem('admin_auth') === 'true';
  });

  const [achievementYears, setAchievementYears] = useState<AchievementYear[]>(() => {
    try {
      const saved = localStorage.getItem('school_achievement_years');
      if (saved) {
        const parsed = JSON.parse(saved);
        return (parsed && parsed.length > 0) ? parsed : INITIAL_ACHIEVEMENT_YEARS;
      }
    } catch (error) {
      console.error('Error loading achievement years from localStorage:', error);
    }
    return INITIAL_ACHIEVEMENT_YEARS;
  });

  const [digitalLibrary, setDigitalLibrary] = useState<DigitalResource[]>(() => {
    try {
      const saved = localStorage.getItem('school_digital_library');
      if (saved) {
        const parsed = JSON.parse(saved);
        return (parsed && parsed.length > 0) ? parsed : INITIAL_RESOURCES;
      }
    } catch (error) {
      console.error('Error loading digital library from localStorage:', error);
    }
    return INITIAL_RESOURCES;
  });

  const [studentPortal, setStudentPortal] = useState<StudentPortalData>(() => {
    try {
      const saved = localStorage.getItem('school_student_portal');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed && parsed.info ? parsed : INITIAL_STUDENT_PORTAL;
      }
    } catch (error) {
      console.error('Error loading student portal from localStorage:', error);
    }
    return INITIAL_STUDENT_PORTAL;
  });

  const hasLoadedSupabaseRef = useRef(false);

  // Normalize data from Supabase (convert snake_case to camelCase)
  const normalizeNews = (newsArray: any[]): NewsItem[] => {
    return newsArray.map(item => ({
      id: typeof item.id === 'string' ? parseInt(item.id.replace('news-', '')) || 0 : item.id,
      title: item.title || '',
      excerpt: item.excerpt || '',
      content: item.content || '',
      date: item.date || '',
      // Handle images field - can be URL string or array, with backup fallback
      imageUrl: (typeof item.images === 'string' && item.images) 
        ? item.images 
        : item.imageUrl || getBackupImageUrl(typeof item.id === 'string' ? parseInt(item.id.replace('news-', '')) || 0 : item.id, 'news') || '',
      category: item.category || ''
    }));
  };

  const normalizeTeachers = (teachersArray: any[]): Teacher[] => {
    return teachersArray.map(item => ({
      id: typeof item.id === 'string' ? parseInt(item.id.replace('teacher-', '')) || 0 : item.id,
      name: item.name || '',
      subject: item.subject || '',
      imageUrl: item.image_url || item.imageUrl || getBackupImageUrl(typeof item.id === 'string' ? parseInt(item.id.replace('teacher-', '')) || 0 : item.id, 'teachers') || '',
      bio: item.bio || '',
      email: item.email || '',
      phone: item.phone || ''
    }));
  };

  const normalizeClubs = (clubsArray: any[]): Club[] => {
    return clubsArray.map(item => ({
      id: typeof item.id === 'string' ? parseInt(item.id.replace('club-', '')) || 0 : item.id,
      name: item.name || '',
      description: item.description || '',
      imageUrl: item.image_url || item.imageUrl || getBackupImageUrl(typeof item.id === 'string' ? parseInt(item.id.replace('club-', '')) || 0 : item.id, 'clubs') || '',
      members: item.members || 0
    }));
  };

  const normalizeGallery = (galleryArray: any[]): GalleryItem[] => {
    return galleryArray.map(item => ({
      id: typeof item.id === 'string' ? parseInt(item.id.replace('gallery-', '')) || 0 : item.id,
      title: item.title || '',
      imageUrl: item.image_url || item.imageUrl || getBackupImageUrl(typeof item.id === 'string' ? parseInt(item.id.replace('gallery-', '')) || 0 : item.id, 'gallery') || '',
      category: item.category || ''
    }));
  };

  // Load from Supabase on first mount (primary source)
  useEffect(() => {
    const loadSupabaseData = async () => {
      console.log('📡 [DataContext] Starting Supabase data load...');
      try {
        const [newsData, teachersData, clubsData, galleryData, eventsData] = await Promise.all([
          getAllNewsFromSupabase(),
          getAllTeachersFromSupabase(),
          getAllClubsFromSupabase(),
          getAllGalleryFromSupabase(),
          getAllEventsFromSupabase()
        ]);

        // Use Supabase data if available, otherwise use localStorage or initial data
        if (newsData && newsData.length > 0) {
          const normalized = normalizeNews(newsData);
          console.log(`✅ [News] Loaded ${normalized.length} items from Supabase`);
          setNews(normalized);
          localStorage.setItem('school_news', JSON.stringify(normalized));
        } else {
          console.log('⚠️ [News] Supabase returned empty, using fallback...');
          // Fallback: use localStorage if available, otherwise use initial data
          const saved = localStorage.getItem('school_news');
          if (saved) {
            try {
              const parsed = JSON.parse(saved);
              if (parsed && parsed.length > 0) {
                console.log(`✅ [News] Loaded ${parsed.length} items from localStorage`);
                setNews(parsed);
              }
            } catch (e) {
              console.error('Error parsing news from localStorage:', e);
            }
          }
        }

        if (teachersData && teachersData.length > 0) {
          const normalized = normalizeTeachers(teachersData);
          console.log(`✅ [Teachers] Loaded ${normalized.length} items from Supabase`);
          setTeachers(normalized);
          localStorage.setItem('school_teachers', JSON.stringify(normalized));
        } else {
          console.log('⚠️ [Teachers] Supabase returned empty, using fallback...');
          const saved = localStorage.getItem('school_teachers');
          if (saved) {
            try {
              const parsed = JSON.parse(saved);
              if (parsed && parsed.length > 0) {
                console.log(`✅ [Teachers] Loaded ${parsed.length} items from localStorage`);
                setTeachers(parsed);
              }
            } catch (e) {
              console.error('Error parsing teachers from localStorage:', e);
            }
          }
        }

        if (clubsData && clubsData.length > 0) {
          const normalized = normalizeClubs(clubsData);
          console.log(`✅ [Clubs] Loaded ${normalized.length} items from Supabase`);
          setClubs(normalized);
          localStorage.setItem('school_clubs', JSON.stringify(normalized));
        } else {
          console.log('⚠️ [Clubs] Supabase returned empty, using fallback...');
          const saved = localStorage.getItem('school_clubs');
          if (saved) {
            try {
              const parsed = JSON.parse(saved);
              if (parsed && parsed.length > 0) {
                console.log(`✅ [Clubs] Loaded ${parsed.length} items from localStorage`);
                setClubs(parsed);
              }
            } catch (e) {
              console.error('Error parsing clubs from localStorage:', e);
            }
          }
        }

        if (galleryData && galleryData.length > 0) {
          const normalized = normalizeGallery(galleryData);
          console.log(`✅ [Gallery] Loaded ${normalized.length} items from Supabase`);
          setGallery(normalized);
          localStorage.setItem('school_gallery', JSON.stringify(normalized));
        } else {
          console.log('⚠️ [Gallery] Supabase returned empty, using fallback...');
          const saved = localStorage.getItem('school_gallery');
          if (saved) {
            try {
              const parsed = JSON.parse(saved);
              if (parsed && parsed.length > 0) {
                console.log(`✅ [Gallery] Loaded ${parsed.length} items from localStorage`);
                setGallery(parsed);
              }
            } catch (e) {
              console.error('Error parsing gallery from localStorage:', e);
            }
          }
        }

        if (eventsData && eventsData.length > 0) {
          console.log(`✅ [Events] Loaded ${eventsData.length} items from Supabase`);
          setEvents(eventsData);
          localStorage.setItem('school_events', JSON.stringify(eventsData));
        } else {
          console.log('⚠️ [Events] Supabase returned empty, using fallback...');
          const saved = localStorage.getItem('school_events');
          if (saved) {
            try {
              const parsed = JSON.parse(saved);
              if (parsed && parsed.length > 0) {
                console.log(`✅ [Events] Loaded ${parsed.length} items from localStorage`);
                setEvents(parsed);
              }
            } catch (e) {
              console.error('Error parsing events from localStorage:', e);
            }
          }
        }

        hasLoadedSupabaseRef.current = true;
        console.log('✅ [DataContext] Supabase data load complete');
      } catch (error) {
        console.error('❌ [DataContext] Error loading Supabase data:', error);
        // If Supabase fails completely, ensure we at least use localStorage/initial data
        // The initial state should already be set from the useState initializers
        hasLoadedSupabaseRef.current = true;
      }
    };

    loadSupabaseData();
  }, []);

  // Setup real-time subscriptions
  useEffect(() => {
    console.log('🔴 [Real-time] Setting up Supabase real-time subscriptions...');

    // Create a callback to refresh data when changes occur
    const handleDataUpdate = async () => {
      console.log('🔄 [Real-time] Data changed detected, refreshing...');
      
      try {
        const [newsData, teachersData, clubsData, galleryData, eventsData] = await Promise.all([
          getAllNewsFromSupabase(),
          getAllTeachersFromSupabase(),
          getAllClubsFromSupabase(),
          getAllGalleryFromSupabase(),
          getAllEventsFromSupabase()
        ]);

        // Update state with new data
        if (newsData && newsData.length > 0) {
          const normalized = normalizeNews(newsData);
          setNews(normalized);
          localStorage.setItem('school_news', JSON.stringify(normalized));
          console.log('✅ [Real-time] News updated');
        }

        if (teachersData && teachersData.length > 0) {
          const normalized = normalizeTeachers(teachersData);
          setTeachers(normalized);
          localStorage.setItem('school_teachers', JSON.stringify(normalized));
          console.log('✅ [Real-time] Teachers updated');
        }

        if (clubsData && clubsData.length > 0) {
          const normalized = normalizeClubs(clubsData);
          setClubs(normalized);
          localStorage.setItem('school_clubs', JSON.stringify(normalized));
          console.log('✅ [Real-time] Clubs updated');
        }

        if (galleryData && galleryData.length > 0) {
          const normalized = normalizeGallery(galleryData);
          setGallery(normalized);
          localStorage.setItem('school_gallery', JSON.stringify(normalized));
          console.log('✅ [Real-time] Gallery updated');
        }

        if (eventsData && eventsData.length > 0) {
          setEvents(eventsData);
          localStorage.setItem('school_events', JSON.stringify(eventsData));
          console.log('✅ [Real-time] Events updated');
        }
      } catch (error) {
        console.error('❌ [Real-time] Error refreshing data:', error);
      }
    };

    // Subscribe to real-time changes
    subscribeToNews(handleDataUpdate);
    subscribeToTeachers(handleDataUpdate);
    subscribeToClubs(handleDataUpdate);
    subscribeToGallery(handleDataUpdate);
    subscribeToEvents(handleDataUpdate);

    console.log('✅ [Real-time] All subscriptions active');

    // Cleanup: unsubscribe when component unmounts
    return () => {
      console.log('🔴 [Real-time] Cleaning up subscriptions...');
      unsubscribeAll();
    };
  }, []);

  // Load from cloud on first mount (non-blocking)
  useEffect(() => {
    cloudStorage.fetchData().then(cloudData => {
      if (!cloudData) return;

      if (cloudData.globalImages && Object.keys(cloudData.globalImages).length > 0) {
        setGlobalImages(cloudData.globalImages);
        localStorage.setItem('school_images', JSON.stringify(cloudData.globalImages));
      }
      if (!hasLoadedSupabaseRef.current && cloudData.gallery && cloudData.gallery.length > 0) {
        setGallery(cloudData.gallery);
        localStorage.setItem('school_gallery', JSON.stringify(cloudData.gallery));
      }
      if (!hasLoadedSupabaseRef.current && cloudData.news && cloudData.news.length > 0) {
        setNews(cloudData.news);
        localStorage.setItem('school_news', JSON.stringify(cloudData.news));
      }
      if (!hasLoadedSupabaseRef.current && cloudData.teachers && cloudData.teachers.length > 0) {
        setTeachers(cloudData.teachers);
        localStorage.setItem('school_teachers', JSON.stringify(cloudData.teachers));
      }
      if (!hasLoadedSupabaseRef.current && cloudData.clubs && cloudData.clubs.length > 0) {
        setClubs(cloudData.clubs);
        localStorage.setItem('school_clubs', JSON.stringify(cloudData.clubs));
      }
      if (cloudData.studentCorner && cloudData.studentCorner.scheduleByClass) {
        setStudentCorner(cloudData.studentCorner);
        localStorage.setItem('school_student_corner', JSON.stringify(cloudData.studentCorner));
      }
      if (cloudData.achievementYears && cloudData.achievementYears.length > 0) {
        setAchievementYears(cloudData.achievementYears);
        localStorage.setItem('school_achievement_years', JSON.stringify(cloudData.achievementYears));
      }
      if (cloudData.digitalLibrary && cloudData.digitalLibrary.length > 0) {
        setDigitalLibrary(cloudData.digitalLibrary);
        localStorage.setItem('school_digital_library', JSON.stringify(cloudData.digitalLibrary));
      }
      if (cloudData.studentPortal && cloudData.studentPortal.info) {
        setStudentPortal(cloudData.studentPortal);
        localStorage.setItem('school_student_portal', JSON.stringify(cloudData.studentPortal));
      }
    }).catch(() => {}); // Silently fail, use localStorage
  }, []);

  useEffect(() => {
    localStorage.setItem('school_images', JSON.stringify(globalImages));
    const timer = setTimeout(() => {
      cloudStorage.saveData({ globalImages }).catch(() => {});
    }, 2000);
    return () => clearTimeout(timer);
  }, [globalImages]);

  useEffect(() => {
    localStorage.setItem('school_news', JSON.stringify(news));
    const timer = setTimeout(() => {
      cloudStorage.saveData({ news }).catch(() => {});
    }, 3000);
    return () => clearTimeout(timer);
  }, [news]);

  useEffect(() => {
    localStorage.setItem('school_teachers', JSON.stringify(teachers));
    const timer = setTimeout(() => {
      cloudStorage.saveData({ teachers }).catch(() => {});
    }, 3000);
    return () => clearTimeout(timer);
  }, [teachers]);

  useEffect(() => {
    localStorage.setItem('school_clubs', JSON.stringify(clubs));
    const timer = setTimeout(() => {
      cloudStorage.saveData({ clubs }).catch(() => {});
    }, 3000);
    return () => clearTimeout(timer);
  }, [clubs]);

  useEffect(() => {
    localStorage.setItem('school_gallery', JSON.stringify(gallery));
    const timer = setTimeout(() => {
      cloudStorage.saveData({ gallery }).catch(() => {});
    }, 3000);
    return () => clearTimeout(timer);
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem('school_student_corner', JSON.stringify(studentCorner));
    const timer = setTimeout(() => {
      cloudStorage.saveData({ studentCorner }).catch(() => {});
    }, 3000);
    return () => clearTimeout(timer);
  }, [studentCorner]);

  useEffect(() => {
    localStorage.setItem('school_achievement_years', JSON.stringify(achievementYears));
  }, [achievementYears]);

  useEffect(() => {
    localStorage.setItem('school_digital_library', JSON.stringify(digitalLibrary));
  }, [digitalLibrary]);

  useEffect(() => {
    localStorage.setItem('school_student_portal', JSON.stringify(studentPortal));
  }, [studentPortal]);

  useEffect(() => {
      localStorage.setItem('admin_auth', String(isAuthenticated));
  }, [isAuthenticated]);

  // Actions

  // News
  const addNews = async (item: Omit<NewsItem, 'id'>) => {
    const newId = news.length > 0 ? Math.max(...news.map(n => n.id)) + 1 : 0;
    const newItem = { ...item, id: newId };
    setNews([newItem, ...news]);
    
    // Save to Supabase
    try {
      await saveNewsToSupabase({
        id: `news-${Date.now()}-${newId}`,
        title: newItem.title,
        excerpt: newItem.excerpt,
        content: newItem.content,
        date: newItem.date,
        category: newItem.category,
        image: newItem.imageUrl,
        author: 'Admin'
      });
      console.log('✅ News saved to Supabase');
    } catch (error) {
      console.error('❌ Failed to save news to Supabase:', error);
    }
  };
  const updateNews = async (id: number, updatedItem: Partial<NewsItem>) => {
    setNews(news.map(item => item.id === id ? { ...item, ...updatedItem } : item));
    
    // Update in Supabase
    const newsItem = news.find(n => n.id === id);
    if (newsItem) {
      try {
        await saveNewsToSupabase({
          id: `news-${Date.now()}-${id}`,
          title: updatedItem.title || newsItem.title,
          excerpt: updatedItem.excerpt || newsItem.excerpt,
          content: updatedItem.content || newsItem.content,
          date: updatedItem.date || newsItem.date,
          category: updatedItem.category || newsItem.category,
          image: updatedItem.imageUrl || newsItem.imageUrl,
          author: 'Admin'
        });
        console.log('✅ News updated in Supabase');
      } catch (error) {
        console.error('❌ Failed to update news in Supabase:', error);
      }
    }
  };
  const deleteNews = async (id: number) => {
    const newsItem = news.find(n => n.id === id);
    setNews(news.filter(item => item.id !== id));
    
    // Delete from Supabase
    if (newsItem) {
      try {
        await deleteNewsFromSupabase(`news-${Date.now()}-${id}`);
        console.log('✅ News deleted from Supabase');
      } catch (error) {
        console.error('❌ Failed to delete news from Supabase:', error);
      }
    }
  };

  // Global Images
  const updateGlobalImages = (images: GlobalImages) => {
    setGlobalImages(images);
  };

  // Teachers
  const addTeacher = async (item: Omit<Teacher, 'id'>) => {
    const newId = teachers.length > 0 ? Math.max(...teachers.map(t => t.id)) + 1 : 1;
    setTeachers([...teachers, { ...item, id: newId }]);
    
    // Save to Supabase
    try {
      await saveTeacherToSupabase({
        id: `teacher-${Date.now()}-${newId}`,
        name: item.name,
        subject: item.subject,
        image: item.imageUrl,
        bio: item.bio || '',
        email: '',
        phone: ''
      });
      console.log('✅ Teacher saved to Supabase');
    } catch (error) {
      console.error('❌ Failed to save teacher to Supabase:', error);
    }
  };
  const updateTeacher = async (id: number, updatedItem: Partial<Teacher>) => {
    setTeachers(teachers.map(t => t.id === id ? { ...t, ...updatedItem } : t));
    
    const teacher = teachers.find(t => t.id === id);
    if (teacher) {
      try {
        await saveTeacherToSupabase({
          id: `teacher-${Date.now()}-${id}`,
          name: updatedItem.name || teacher.name,
          subject: updatedItem.subject || teacher.subject,
          image: updatedItem.imageUrl || teacher.imageUrl,
          bio: updatedItem.bio || teacher.bio || '',
          email: '',
          phone: ''
        });
        console.log('✅ Teacher updated in Supabase');
      } catch (error) {
        console.error('❌ Failed to update teacher in Supabase:', error);
      }
    }
  };
  const deleteTeacher = async (id: number) => {
    setTeachers(teachers.filter(t => t.id !== id));
    
    try {
      await deleteTeacherFromSupabase(`teacher-${Date.now()}-${id}`);
      console.log('✅ Teacher deleted from Supabase');
    } catch (error) {
      console.error('❌ Failed to delete teacher from Supabase:', error);
    }
  };

  // Clubs
  const addClub = async (item: Omit<Club, 'id'>) => {
    const newId = clubs.length > 0 ? Math.max(...clubs.map(c => c.id)) + 1 : 1;
    setClubs([...clubs, { ...item, id: newId }]);
    
    // Save to Supabase
    try {
      await saveClubToSupabase({
        id: `club-${Date.now()}-${newId}`,
        name: item.name,
        description: item.description,
        image: item.imageUrl,
        members: 0,
        advisor: ''
      });
      console.log('✅ Club saved to Supabase');
    } catch (error) {
      console.error('❌ Failed to save club to Supabase:', error);
    }
  };
  const updateClub = async (id: number, updatedItem: Partial<Club>) => {
    setClubs(clubs.map(c => c.id === id ? { ...c, ...updatedItem } : c));
    
    const club = clubs.find(c => c.id === id);
    if (club) {
      try {
        await saveClubToSupabase({
          id: `club-${Date.now()}-${id}`,
          name: updatedItem.name || club.name,
          description: updatedItem.description || club.description,
          image: updatedItem.imageUrl || club.imageUrl,
          members: 0,
          advisor: ''
        });
        console.log('✅ Club updated in Supabase');
      } catch (error) {
        console.error('❌ Failed to update club in Supabase:', error);
      }
    }
  };
  const deleteClub = async (id: number) => {
    setClubs(clubs.filter(c => c.id !== id));
    
    try {
      await deleteClubFromSupabase(`club-${Date.now()}-${id}`);
      console.log('✅ Club deleted from Supabase');
    } catch (error) {
      console.error('❌ Failed to delete club from Supabase:', error);
    }
  };

  // Gallery
  const addGalleryItem = async (item: Omit<GalleryItem, 'id'>) => {
    const newId = gallery.length > 0 ? Math.max(...gallery.map(g => g.id)) + 1 : 1;
    setGallery([...gallery, { ...item, id: newId }]);
    
    // Save to Supabase
    try {
      await saveGalleryToSupabase({
        id: `gallery-${Date.now()}-${newId}`,
        url: item.imageUrl,
        title: item.title,
        category: item.category,
        description: '',
        uploaded_at: new Date().toISOString()
      });
      console.log('✅ Gallery image saved to Supabase');
    } catch (error) {
      console.error('❌ Failed to save gallery image to Supabase:', error);
    }
  };
  const deleteGalleryItem = async (id: number) => {
    setGallery(gallery.filter(g => g.id !== id));
    
    try {
      await deleteGalleryFromSupabase(`gallery-${Date.now()}-${id}`);
      console.log('✅ Gallery item deleted from Supabase');
    } catch (error) {
      console.error('❌ Failed to delete gallery item from Supabase:', error);
    }
  };

  // StudentCorner
  const updateStudentCorner = (data: StudentCornerData) => {
    setStudentCorner(data);
  };
  const addExam = (exam: Omit<ExamItem, 'id'>) => {
    const newId = studentCorner.exams.length > 0 ? Math.max(...studentCorner.exams.map(e => e.id)) + 1 : 1;
    setStudentCorner({
      ...studentCorner,
      exams: [...studentCorner.exams, { ...exam, id: newId }]
    });
  };
  const deleteExam = (id: number) => {
    setStudentCorner({
      ...studentCorner,
      exams: studentCorner.exams.filter(e => e.id !== id)
    });
  };
  const addForm = (form: Omit<FormItem, 'id'>) => {
    const newId = studentCorner.forms.length > 0 ? Math.max(...studentCorner.forms.map(f => f.id)) + 1 : 1;
    setStudentCorner({
      ...studentCorner,
      forms: [...studentCorner.forms, { ...form, id: newId }]
    });
  };
  const deleteForm = (id: number) => {
    setStudentCorner({
      ...studentCorner,
      forms: studentCorner.forms.filter(f => f.id !== id)
    });
  };

  // Events State
  const [events, setEvents] = useState<Event[]>([]);
  const addEvent = (item: Omit<Event, 'id'>) => {
    const newId = Math.max(0, ...events.map(e => e.id), 0) + 1;
    setEvents([...events, { ...item, id: newId }]);
  };
  const updateEvent = (id: number, item: Partial<Event>) => {
    setEvents(events.map(e => e.id === id ? { ...e, ...item } : e));
  };
  const deleteEvent = (id: number) => {
    setEvents(events.filter(e => e.id !== id));
  };

  // Achievements State
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const addAchievement = (item: Omit<Achievement, 'id'>) => {
    const newId = Math.max(0, ...achievements.map(a => a.id), 0) + 1;
    setAchievements([...achievements, { ...item, id: newId }]);
  };
  const updateAchievement = (id: number, item: Partial<Achievement>) => {
    setAchievements(achievements.map(a => a.id === id ? { ...a, ...item } : a));
  };
  const deleteAchievement = (id: number) => {
    setAchievements(achievements.filter(a => a.id !== id));
  };

  // Achievement years (yearly datasets)
  const addAchievementYear = (year: number) => {
    if (achievementYears.some(y => y.year === year)) return;
    setAchievementYears([...achievementYears, { year, stats: [], items: [] }]);
  };
  const updateAchievementStats = (year: number, stats: AchievementYear['stats']) => {
    setAchievementYears(achievementYears.map(y => y.year === year ? { ...y, stats } : y));
  };
  const addAchievementToYear = (year: number, item: Omit<Achievement, 'id'>) => {
    setAchievementYears(achievementYears.map(y => {
      if (y.year !== year) return y;
      const newId = y.items.length > 0 ? Math.max(...y.items.map(a => a.id)) + 1 : 1;
      return { ...y, items: [...y.items, { ...item, id: newId }] };
    }));
  };
  const updateAchievementInYear = (year: number, id: number, item: Partial<Achievement>) => {
    setAchievementYears(achievementYears.map(y => y.year === year ? { ...y, items: y.items.map(a => a.id === id ? { ...a, ...item } : a) } : y));
  };
  const deleteAchievementInYear = (year: number, id: number) => {
    setAchievementYears(achievementYears.map(y => y.year === year ? { ...y, items: y.items.filter(a => a.id !== id) } : y));
  };

  // Digital library
  const addResource = (item: Omit<DigitalResource, 'id'>) => {
    const newId = digitalLibrary.length > 0 ? Math.max(...digitalLibrary.map(r => r.id)) + 1 : 1;
    setDigitalLibrary([...digitalLibrary, { ...item, id: newId }]);
  };
  const updateResource = (id: number, item: Partial<DigitalResource>) => {
    setDigitalLibrary(digitalLibrary.map(r => r.id === id ? { ...r, ...item } : r));
  };
  const deleteResource = (id: number) => {
    setDigitalLibrary(digitalLibrary.filter(r => r.id !== id));
  };

  // Student portal
  const updateStudentInfo = (info: StudentPortalData['info']) => {
    setStudentPortal({ ...studentPortal, info });
  };
  const addGrade = (grade: GradeItem) => {
    setStudentPortal({ ...studentPortal, grades: [...studentPortal.grades, grade] });
  };
  const updateGrade = (index: number, grade: Partial<GradeItem>) => {
    setStudentPortal({
      ...studentPortal,
      grades: studentPortal.grades.map((g, i) => i === index ? { ...g, ...grade } : g)
    });
  };
  const deleteGrade = (index: number) => {
    setStudentPortal({
      ...studentPortal,
      grades: studentPortal.grades.filter((_, i) => i !== index)
    });
  };
  const addAssignment = (assignment: AssignmentItem) => {
    setStudentPortal({ ...studentPortal, assignments: [...studentPortal.assignments, assignment] });
  };
  const updateAssignment = (index: number, assignment: Partial<AssignmentItem>) => {
    setStudentPortal({
      ...studentPortal,
      assignments: studentPortal.assignments.map((a, i) => i === index ? { ...a, ...assignment } : a)
    });
  };
  const deleteAssignment = (index: number) => {
    setStudentPortal({
      ...studentPortal,
      assignments: studentPortal.assignments.filter((_, i) => i !== index)
    });
  };

  // Announcements State
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const addAnnouncement = (item: Omit<Announcement, 'id'>) => {
    const newId = Math.max(0, ...announcements.map(a => a.id), 0) + 1;
    setAnnouncements([...announcements, { ...item, id: newId }]);
  };
  const updateAnnouncement = (id: number, item: Partial<Announcement>) => {
    setAnnouncements(announcements.map(a => a.id === id ? { ...a, ...item } : a));
  };
  const deleteAnnouncement = (id: number) => {
    setAnnouncements(announcements.filter(a => a.id !== id));
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
      studentCorner, updateStudentCorner, addExam, deleteExam, addForm, deleteForm,
      events, addEvent, updateEvent, deleteEvent,
      achievements, addAchievement, updateAchievement, deleteAchievement,
      achievementYears, addAchievementYear, updateAchievementStats, addAchievementToYear, updateAchievementInYear, deleteAchievementInYear,
      digitalLibrary, addResource, updateResource, deleteResource,
      studentPortal, updateStudentInfo, addGrade, updateGrade, deleteGrade, addAssignment, updateAssignment, deleteAssignment,
      announcements, addAnnouncement, updateAnnouncement, deleteAnnouncement,
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
