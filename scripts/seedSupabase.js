import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Sample data
const sampleData = {
  news: [
    {
      title: 'Trần Kim Nhật đạt giải Nhì học sinh giỏi quốc gia',
      excerpt: 'Em Trần Kim Nhật lớp 12A1 giành giải Nhì môn Tin học',
      content: '<h2>Thành tích xuất sắc</h2><p>Em Trần Kim Nhật đã giành giải Nhì trong kỳ thi chọn Học sinh giỏi Quốc gia năm 2025-2026...</p>',
      author: 'Admin',
      images: []
    },
    {
      title: 'Kỳ thi tuyển sinh lớp 10 năm 2026',
      excerpt: 'Thông báo kỳ thi tuyển sinh vào lớp 10',
      content: '<p>Kỳ thi tuyển sinh lớp 10 diễn ra vào tháng 6/2026...</p>',
      author: 'Admin',
      images: []
    }
  ],
  events: [
    {
      title: 'Lễ khai giảng năm học 2025-2026',
      date: '2025-09-01',
      location: 'Sân trường THPT Hương Khê',
      description: 'Lễ khai giảng chính thức năm học mới'
    },
    {
      title: 'Hội thao Đại hội thể dục thể thao',
      date: '2025-10-15',
      location: 'Sân vận động trường',
      description: 'Các hoạt động thể thao của toàn trường'
    }
  ],
  teachers: [
    {
      name: 'Thầy Hồ Đức Cương',
      subject: 'Tin học',
      bio: 'Hiệu trưởng nhà trường, giáo viên Tin học có kinh nghiệm',
      phone: '0123456789',
      email: 'ho.duc.cuong@huongkhe.edu.vn'
    },
    {
      name: 'Cô Nguyễn Thị Hương',
      subject: 'Ngôn ngữ Việt',
      bio: 'Giáo viên Ngôn ngữ Việt, tâm huyết với công tác giáo dục',
      phone: '0987654321',
      email: 'nguyen.thi.huong@huongkhe.edu.vn'
    }
  ],
  clubs: [
    {
      name: 'Câu lạc bộ Tin học',
      description: 'Nơi rèn luyện kỹ năng lập trình và khoa học máy tính',
      members: 30,
      leader: 'Thầy Hồ Đức Cương'
    },
    {
      name: 'Câu lạc bộ Tiếng Anh',
      description: 'Phát triển kỹ năng ngoại ngữ cho học sinh',
      members: 50,
      leader: 'Cô Nguyễn Thị Hương'
    }
  ],
  achievements: [
    {
      title: 'Giải Nhì Học sinh giỏi Quốc gia - Tin học',
      year: 2025,
      student: 'Trần Kim Nhật',
      description: 'Đạt giải Nhì trong kỳ thi chọn Học sinh giỏi Quốc gia'
    },
    {
      title: 'Đặc cách điểm thi đạo tạo - Bộ Giáo dục',
      year: 2024,
      student: 'Nhiều học sinh',
      description: 'Ghi nhận những thành tích nổi bật'
    }
  ],
  settings: [
    { key: 'schoolName', value: { value: 'THPT Hương Khê' } },
    { key: 'schoolEmail', value: { value: 'info@huongkhe.edu.vn' } },
    { key: 'schoolPhone', value: { value: '0123456789' } },
    { key: 'maintenanceMode', value: { value: false } }
  ]
};

async function seedDatabase() {
  try {
    console.log('🚀 Bắt đầu seed dữ liệu Supabase...\n');

    // Seed news
    console.log('📰 Thêm tin tức mẫu...');
    const { data: newsData, error: newsError } = await supabase
      .from('news')
      .insert(sampleData.news);
    if (newsError) throw newsError;
    console.log(`✅ Đã thêm ${sampleData.news.length} tin tức\n`);

    // Seed events
    console.log('📅 Thêm sự kiện mẫu...');
    const { data: eventsData, error: eventsError } = await supabase
      .from('events')
      .insert(sampleData.events);
    if (eventsError) throw eventsError;
    console.log(`✅ Đã thêm ${sampleData.events.length} sự kiện\n`);

    // Seed teachers
    console.log('👨‍🏫 Thêm giáo viên mẫu...');
    const { data: teachersData, error: teachersError } = await supabase
      .from('teachers')
      .insert(sampleData.teachers);
    if (teachersError) throw teachersError;
    console.log(`✅ Đã thêm ${sampleData.teachers.length} giáo viên\n`);

    // Seed clubs
    console.log('🎭 Thêm câu lạc bộ mẫu...');
    const { data: clubsData, error: clubsError } = await supabase
      .from('clubs')
      .insert(sampleData.clubs);
    if (clubsError) throw clubsError;
    console.log(`✅ Đã thêm ${sampleData.clubs.length} câu lạc bộ\n`);

    // Seed achievements
    console.log('🏆 Thêm thành tích mẫu...');
    const { data: achievementsData, error: achievementsError } = await supabase
      .from('achievements')
      .insert(sampleData.achievements);
    if (achievementsError) throw achievementsError;
    console.log(`✅ Đã thêm ${sampleData.achievements.length} thành tích\n`);

    // Seed settings
    console.log('⚙️ Thêm cài đặt mẫu...');
    const { data: settingsData, error: settingsError } = await supabase
      .from('settings')
      .insert(sampleData.settings);
    if (settingsError) throw settingsError;
    console.log(`✅ Đã thêm cài đặt\n`);

    console.log('🎉 Hoàn tất seed dữ liệu!');
    console.log('\n📍 Xem dữ liệu tại Supabase Console:');
    console.log(`   ${supabaseUrl}/dashboard`);

  } catch (error) {
    console.error('❌ Lỗi seed dữ liệu:', error);
    process.exit(1);
  }
}

seedDatabase().then(() => {
  process.exit(0);
}).catch(error => {
  console.error(error);
  process.exit(1);
});
