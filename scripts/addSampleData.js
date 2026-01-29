import { initializeApp } from 'firebase/app';
import { 
  getDatabase, 
  ref, 
  set,
  push
} from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  databaseURL: process.env.VITE_FIREBASE_DATABASE_URL
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Dữ liệu mẫu
const sampleData = {
  news: [
    {
      title: 'Trần Kim Nhật đạt giải Nhì học sinh giỏi quốc gia',
      excerpt: 'Em Trần Kim Nhật lớp 12A1 giành giải Nhì môn Tin học',
      content: '<h2>Thành tích xuất sắc</h2><p>Em Trần Kim Nhật đã giành giải Nhì trong kỳ thi chọn Học sinh giỏi Quốc gia năm 2025-2026...</p>',
      images: []
    },
    {
      title: 'Kỳ thi tuyển sinh lớp 10 năm 2026',
      excerpt: 'Thông báo kỳ thi tuyển sinh vào lớp 10',
      content: '<p>Kỳ thi tuyển sinh lớp 10 diễn ra vào tháng 6/2026...</p>',
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
      level: 'Trường',
      description: 'Ghi nhận những thành tích nổi bật'
    }
  ]
};

async function addSampleData() {
  try {
    console.log('🚀 Thêm dữ liệu mẫu vào Firebase...\n');

    // Thêm tin tức
    console.log('📰 Thêm tin tức mẫu...');
    for (const news of sampleData.news) {
      const newsRef = ref(db, `news/news_${uuidv4()}`);
      await set(newsRef, {
        ...news,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }
    console.log(`✅ Đã thêm ${sampleData.news.length} tin tức\n`);

    // Thêm sự kiện
    console.log('📅 Thêm sự kiện mẫu...');
    for (const event of sampleData.events) {
      const eventRef = ref(db, `events/event_${uuidv4()}`);
      await set(eventRef, {
        ...event,
        createdAt: new Date().toISOString()
      });
    }
    console.log(`✅ Đã thêm ${sampleData.events.length} sự kiện\n`);

    // Thêm giáo viên
    console.log('👨‍🏫 Thêm giáo viên mẫu...');
    for (const teacher of sampleData.teachers) {
      const teacherRef = ref(db, `teachers/teacher_${uuidv4()}`);
      await set(teacherRef, {
        ...teacher,
        createdAt: new Date().toISOString()
      });
    }
    console.log(`✅ Đã thêm ${sampleData.teachers.length} giáo viên\n`);

    // Thêm câu lạc bộ
    console.log('🎭 Thêm câu lạc bộ mẫu...');
    for (const club of sampleData.clubs) {
      const clubRef = ref(db, `clubs/club_${uuidv4()}`);
      await set(clubRef, {
        ...club,
        createdAt: new Date().toISOString()
      });
    }
    console.log(`✅ Đã thêm ${sampleData.clubs.length} câu lạc bộ\n`);

    // Thêm thành tích
    console.log('🏆 Thêm thành tích mẫu...');
    for (const achievement of sampleData.achievements) {
      const achRef = ref(db, `achievements/achievement_${uuidv4()}`);
      await set(achRef, {
        ...achievement,
        createdAt: new Date().toISOString()
      });
    }
    console.log(`✅ Đã thêm ${sampleData.achievements.length} thành tích\n`);

    console.log('🎉 Hoàn tất thêm dữ liệu mẫu!');
    console.log('\n📍 Xem dữ liệu tại Firebase Console:');
    console.log(`https://console.firebase.google.com/project/${firebaseConfig.projectId}/database/data`);

  } catch (error) {
    console.error('❌ Lỗi:', error);
    process.exit(1);
  }
}

addSampleData().then(() => {
  process.exit(0);
}).catch(error => {
  console.error(error);
  process.exit(1);
});
