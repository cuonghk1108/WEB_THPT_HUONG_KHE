import { initializeApp } from 'firebase/app';
import { 
  getDatabase, 
  ref, 
  set,
  get
} from 'firebase/database';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Firebase Config từ .env.local
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  databaseURL: process.env.VITE_FIREBASE_DATABASE_URL
};

// Initialize Firebase
console.log('🔧 Initializing Firebase...');
console.log('Project ID:', firebaseConfig.projectId);
console.log('Database URL:', firebaseConfig.databaseURL);

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Cấu trúc dữ liệu mặc định
const defaultData = {
  news: {
    news_sample_1: {
      id: 1,
      title: 'Chào mừng đến với hệ thống quản lý trường học',
      excerpt: 'Đây là tin tức mẫu đầu tiên của hệ thống',
      content: '<p>Nội dung tin tức mẫu</p>',
      images: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  },
  events: {},
  gallery: {},
  teachers: {},
  clubs: {},
  library: {},
  achievements: {},
  lunchMenu: {},
  messages: {
    contact: {}
  },
  settings: {
    schoolName: 'THPT Hương Khê',
    schoolEmail: 'info@huongkhe.edu.vn',
    schoolPhone: '0123456789',
    maintenanceMode: false,
    darkModeEnabled: false
  }
};

async function createDatabase() {
  try {
    console.log('\n📊 Tạo cấu trúc Database...\n');

    // Kiểm tra xem database đã có dữ liệu chưa
    const snapshot = await get(ref(db, '/'));
    
    if (snapshot.exists()) {
      console.log('⚠️  Database đã có dữ liệu!');
      console.log('❓ Bạn có muốn thay thế không? (yes/no)');
      console.log('Current data keys:', Object.keys(snapshot.val()));
      return;
    }

    // Tạo từng collection
    for (const [collectionName, collectionData] of Object.entries(defaultData)) {
      console.log(`📝 Tạo collection: ${collectionName}...`);
      await set(ref(db, collectionName), collectionData);
      console.log(`✅ ${collectionName} - Thành công`);
    }

    console.log('\n🎉 Database đã được tạo thành công!');
    console.log('\n📍 Các collection đã được tạo:');
    Object.keys(defaultData).forEach(key => {
      console.log(`   ✓ ${key}`);
    });

    console.log('\n✨ Bạn có thể xem dữ liệu tại:');
    console.log(`   https://console.firebase.google.com/project/${firebaseConfig.projectId}/database`);

  } catch (error) {
    console.error('❌ Lỗi khi tạo database:', error);
    process.exit(1);
  }
}

// Chạy
createDatabase().then(() => {
  process.exit(0);
}).catch(error => {
  console.error(error);
  process.exit(1);
});
