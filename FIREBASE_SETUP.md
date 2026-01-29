# 🔥 Hướng dẫn Cài đặt Firebase Database

## Vấn đề cần giải quyết
Toàn bộ dữ liệu website (tin tức, sự kiện, ảnh, giáo viên, câu lạc bộ, v.v.) cần được lưu trên một cơ sở dữ liệu trực tuyến duy nhất để đồng bộ giữa các máy và thiết bị.

## Giải pháp: Firebase Realtime Database
Firebase là dịch vụ của Google cung cấp:
- ✅ **Cơ sở dữ liệu trực tuyến** - Lưu trữ dữ liệu JSON
- ✅ **Cập nhật thời gian thực** - Dữ liệu đồng bộ tức thì trên tất cả thiết bị
- ✅ **Miễn phí** - 100GB lưu trữ, 1GB tải xuống/tháng miễn phí
- ✅ **Bảo mật** - Quy tắc Firebase Security giúp bảo vệ dữ liệu
- ✅ **Dễ sử dụng** - API đơn giản và tài liệu chi tiết

---

## Bước 1: Tạo tài khoản Firebase

### 1.1 Truy cập Firebase Console
1. Đi đến: **https://console.firebase.google.com/**
2. Đăng nhập bằng **Gmail** của bạn

### 1.2 Tạo dự án mới
1. Click **"Tạo dự án"** hoặc **"Add project"**
2. Điền thông tin:
   - **Tên dự án**: `school-website` hoặc tên bạn chọn
   - **ID dự án**: Sẽ tự tạo
   - **Quốc gia**: Chọn **Việt Nam**
3. Bỏ tick **"Enable Google Analytics"** (không cần cho website đơn giản)
4. Click **"Tạo dự án"** và chờ xong (khoảng 1-2 phút)

---

## Bước 2: Lấy Firebase Config

### 2.1 Thêm ứng dụng web
1. Trong **Firebase Console**, click biểu tượng **"</>** (Web)
2. Điền tên ứng dụng: `School Website`
3. Bỏ tick **"Set up Firebase Hosting"**
4. Click **"Đăng ký ứng dụng"**

### 2.2 Sao chép Firebase Config
Bạn sẽ nhận được config tương tự:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyDxxxxxx...",
  authDomain: "school-website-xxxxx.firebaseapp.com",
  projectId: "school-website-xxxxx",
  storageBucket: "school-website-xxxxx.appspot.com",
  messagingSenderId: "123456789...",
  appId: "1:123456789...:web:xxxxx..."
};
```

**Sao chép toàn bộ config này!**

---

## Bước 3: Tạo Realtime Database

### 3.1 Bật Realtime Database
1. Ở sidebar trái, chọn **"Build"** > **"Realtime Database"**
2. Click **"Tạo cơ sở dữ liệu"**
3. Chọn:
   - **Vị trí**: Chọn gần Việt Nam nhất (hoặc **Southeast Asia**)
   - **Chế độ bảo mật**: Chọn **"Bắt đầu trong chế độ kiểm tra"** (sau sẽ cấu hình)
4. Click **"Kích hoạt"**

### 3.2 Lấy Database URL
Database URL sẽ có dạng:
```
https://school-website-xxxxx.firebaseio.com
```

Lưu lại URL này!

---

## Bước 4: Cấu hình Biến Môi Trường (.env)

### 4.1 Tạo file `.env.local`
Tại thư mục gốc dự án, tạo file tên **`.env.local`** với nội dung:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyDxxxxxx...
VITE_FIREBASE_AUTH_DOMAIN=school-website-xxxxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=school-website-xxxxx
VITE_FIREBASE_STORAGE_BUCKET=school-website-xxxxx.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789...
VITE_FIREBASE_APP_ID=1:123456789...:web:xxxxx...
VITE_FIREBASE_DATABASE_URL=https://school-website-xxxxx.firebaseio.com

# Giữ nguyên các biến cũ của Cloudinary
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_API_KEY=your_api_key
VITE_CLOUDINARY_API_SECRET=your_api_secret
```

**Thay thế các giá trị `xxxxx...` bằng giá trị thực tế từ Firebase!**

### 4.2 Thêm `.env.local` vào `.gitignore`
Để bảo vệ thông tin bảo mật, mở file `.gitignore` và thêm dòng:
```
.env.local
```

---

## Bước 5: Cấu hình Firebase Security Rules

Để bảo vệ dữ liệu, thiết lập quy tắc bảo mật:

### 5.1 Truy cập Firebase Console
1. Chọn **"Realtime Database"**
2. Click tab **"Quy tắc"**

### 5.2 Cấu hình quy tắc
Thay thế nội dung với quy tắc sau (cho phép tất cả trong chế độ phát triển):

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

**Lưu ý**: Đây là cấu hình cho phát triển. Trong production, cần cấu hình tighter security rules.

### 5.3 Xuất bản quy tắc
Click **"Xuất bản"**

---

## Bước 6: Kiểm tra Kết nối

### 6.1 Chạy ứng dụng
```bash
npm run dev
```

### 6.2 Mở console trình duyệt (F12)
- Kiểm tra có lỗi gì không
- Nếu kết nối thành công, sẽ không có lỗi Firebase

### 6.3 Kiểm tra trong Firebase Console
1. Trở lại **Realtime Database** trong Firebase
2. Bạn sẽ thấy dữ liệu được thêm vào database nếu kết nối thành công

---

## Bước 7: Sử dụng Firebase Service trong Components

### 7.1 Import Firebase Service
```typescript
import { 
  saveNews, 
  getAllNews, 
  onNewsChange 
} from '../services/firebaseService';
```

### 7.2 Ví dụ: Lưu tin tức
```typescript
const handleSaveNews = async (newsData) => {
  try {
    await saveNews(newsId, newsData);
    console.log('Tin tức đã lưu!');
  } catch (error) {
    console.error('Lỗi:', error);
  }
};
```

### 7.3 Ví dụ: Lắng nghe thay đổi theo thời gian thực
```typescript
useEffect(() => {
  const unsubscribe = onNewsChange((data) => {
    setNews(Object.values(data));
  });
  return unsubscribe;
}, []);
```

---

## Bước 8: Triển khai Production

### 8.1 Cấu hình Security Rules cho Production
Thay thế quy tắc với cấu hình an toàn hơn:

```json
{
  "rules": {
    ".read": true,
    ".write": {
      ".auth": {
        "uid": "admin_uid"
      }
    },
    "news": {
      ".indexOn": ["timestamp"]
    },
    "events": {
      ".indexOn": ["timestamp"]
    },
    "gallery": {
      ".indexOn": ["uploadedAt"]
    }
  }
}
```

### 8.2 Sử dụng Firebase Authentication (Tùy chọn)
Nếu muốn bảo vệ admin panel:
1. Bật **Authentication** trong Firebase Console
2. Cấu hình đăng nhập bằng Email/Password
3. Cập nhật Security Rules để chỉ admin mới được write

---

## 📊 Cấu trúc Database

Database của bạn sẽ có cấu trúc:

```
school-website-xxxxx
├── news/
│   ├── news_1/
│   │   ├── title: "..."
│   │   ├── content: "..."
│   │   └── updatedAt: "2025-01-28..."
│   └── news_2/...
├── events/
│   ├── event_1/...
│   └── event_2/...
├── gallery/
│   ├── image_1/...
│   └── image_2/...
├── teachers/
│   ├── teacher_1/...
│   └── teacher_2/...
├── clubs/
│   ├── club_1/...
│   └── club_2/...
├── library/
│   ├── doc_1/...
│   └── doc_2/...
├── achievements/
│   ├── ach_1/...
│   └── ach_2/...
├── studentPortal/
│   ├── item_1/...
│   └── item_2/...
├── lunchMenu/
│   ├── menu_1/...
│   └── menu_2/...
├── messages/
│   └── contact/
│       ├── msg_1/...
│       └── msg_2/...
└── settings/
    ├── schoolName: "THPT Hương Khê"
    ├── schoolEmail: "..."
    └── ...
```

---

## 🔧 Troubleshooting

### Lỗi: "Firebase: Error (auth/api-key-invalid-format)"
**Nguyên nhân**: Config Firebase không đúng
**Giải pháp**: 
- Kiểm tra lại API Key trong `.env.local`
- Đảm bảo sao chép đúng từ Firebase Console

### Lỗi: "Permission denied" khi write database
**Nguyên nhân**: Security Rules không cho phép
**Giải pháp**: 
- Kiểm tra Firebase Security Rules
- Chắc chắn không bao gồm `"rules": {}` trống

### Dữ liệu không đồng bộ giữa các tab
**Nguyên nhân**: Chưa thiết lập real-time listeners
**Giải pháp**: 
- Sử dụng `onNewsChange`, `onEventsChange`, v.v.
- Kiểm tra console có lỗi không

---

## 📚 Tài liệu Thêm

- 📖 [Firebase Documentation](https://firebase.google.com/docs)
- 🎓 [Firebase Realtime Database Tutorials](https://firebase.google.com/docs/database)
- 💻 [JavaScript SDK Reference](https://firebase.google.com/docs/reference/js/database)

---

## 🚀 Bước Tiếp Theo

1. ✅ Thiết lập Firebase
2. ✅ Cấu hình environment variables
3. ⬜ Cập nhật các components để sử dụng Firebase
4. ⬜ Migrate dữ liệu từ localStorage sang Firebase
5. ⬜ Test toàn bộ ứng dụng
6. ⬜ Triển khai lên production

---

**Hãy liên hệ nếu gặp vấn đề!** 🎉
