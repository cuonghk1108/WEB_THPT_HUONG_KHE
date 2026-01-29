# 🔥 FIREBASE CONSOLE - HƯỚNG DẪN CẤU HÌNH CHI TIẾT

## 📋 Thông Tin Của Bạn
```
Project ID: studio-3056748778-59cdc
Tên Project: studio
```

---

## ✅ BƯỚC 1: Kiểm Tra Realtime Database Đã Bật Chưa

### 1.1 Truy cập Firebase Console
1. Mở: **https://console.firebase.google.com/**
2. Chọn project: **studio-3056748778-59cdc**

### 1.2 Kiểm tra Realtime Database
1. Sidebar trái → **Build** → **Realtime Database**
2. Nếu chưa có, click **Create Database**
3. Chọn:
   - **Location**: **Southeast Asia (Singapore)** 
   - **Security Rules**: **Start in test mode** (sau sẽ đổi)
4. Click **Create**

✅ Khi xong, bạn sẽ thấy URL:
```
https://studio-3056748778-59cdc.firebaseio.com
```

---

## ✅ BƯỚC 2: Cấu Hình Security Rules

### 2.1 Vào Tab "Rules"
1. Realtime Database → Tab **"Rules"**
2. Xoá hết nội dung hiện tại
3. Paste đoạn code dưới đây:

```json
{
  "rules": {
    ".read": true,
    ".write": true,
    "news": {
      ".indexOn": ["timestamp", "updatedAt"]
    },
    "events": {
      ".indexOn": ["timestamp", "createdAt"]
    },
    "gallery": {
      ".indexOn": ["uploadedAt"]
    },
    "teachers": {
      ".indexOn": ["name"]
    },
    "clubs": {
      ".indexOn": ["name"]
    },
    "achievements": {
      ".indexOn": ["year", "createdAt"]
    },
    "messages": {
      "contact": {
        ".indexOn": ["createdAt"]
      }
    }
  }
}
```

### 2.2 Xuất bản Rules
1. Click **"Publish"**
2. Xác nhận **"Publish"**

✅ Rules đã được áp dụng!

---

## ✅ BƯỚC 3: Kiểm Tra Database URL

### 3.1 Xem Database URL
1. Realtime Database → Tab **"Data"**
2. Ở dòng đầu, bạn sẽ thấy URL (giống hình dưới):

```
https://studio-3056748778-59cdc.firebaseio.com/
```

### 3.2 So sánh với .env.local
Kiểm tra file `.d:\AI\.env.local` có giá trị này không:
```env
VITE_FIREBASE_DATABASE_URL=https://studio-3056748778-59cdc.firebaseio.com
```

✅ Nếu khớp, bạn đã cấu hình đúng!

---

## ✅ BƯỚC 4: Bật Realtime Database Indexing (Tùy Chọn)

Nếu bạn muốn query nhanh hơn:

1. Realtime Database → Tab **"Indexes"**
2. Nếu hiện lỗi, click **"Create Index"** theo hướng dẫn
3. Bỏ qua bước này nếu không cần

---

## ✅ BƯỚC 5: Kiểm Tra Kết Nối

### 5.1 Mở Terminal
```bash
cd d:\AI
npm run dev
```

### 5.2 Kiểm Tra Console
1. Mở trình duyệt: **http://localhost:3000**
2. Nhấn **F12** mở Developer Tools
3. Tab **Console**
4. Tìm log một trong những dòng này:
   - ✅ `🔄 Bắt đầu migration dữ liệu...`
   - ✅ `✅ Migration hoàn tất!`
   - ✅ `✅ Dữ liệu đã được migrate trước đó`

**Nếu thấy:**
```
❌ Error: auth/api-key-invalid-format
```
→ Kiểm tra lại .env.local

**Nếu thấy:**
```
❌ Permission denied
```
→ Kiểm tra lại Security Rules

### 5.3 Xem Dữ Liệu Trong Firebase
1. Quay lại Firebase Console
2. Realtime Database → Tab **"Data"**
3. Bạn sẽ thấy cấu trúc dữ liệu xuất hiện:
   ```
   root
   ├── news/
   ├── events/
   ├── gallery/
   ├── teachers/
   ├── clubs/
   ├── achievements/
   ├── library/
   ├── studentPortal/
   └── ...
   ```

✅ Nếu thấy, cấu hình Firebase hoàn tất!

---

## 🔒 BƯỚC 6: Bảo Mật (Production)

**⚠️ Lưu ý:** Security Rules hiện đang cho phép tất cả read/write. Để bảo vệ:

### 6.1 Sử dụng Firebase Authentication (Tuỳ chọn)

Nếu muốn chỉ admin mới được upload:

1. **Build** → **Authentication**
2. Click **Get Started**
3. Chọn **Email/Password**
4. Click **Enable**

### 6.2 Cấu Hình Rules An Toàn Hơn

```json
{
  "rules": {
    ".read": true,
    ".write": {
      ".auth": {
        "uid": "admin_uid"
      }
    },
    "messages": {
      ".write": true
    }
  }
}
```

*(Thay "admin_uid" bằng UID thực tế từ Authentication)*

---

## 📊 Cấu Trúc Database Của Bạn

Khi setup xong, database sẽ có cấu trúc:

```
studio-3056748778-59cdc
│
├── news/
│   ├── news_1234567890: { title, content, images, updatedAt }
│   └── news_1234567891: { ... }
│
├── events/
│   ├── event_1234567890: { title, date, location, createdAt }
│   └── event_1234567891: { ... }
│
├── gallery/
│   ├── gallery_1234567890: { url, title, uploadedAt }
│   └── gallery_1234567891: { ... }
│
├── teachers/
│   ├── teacher_1234567890: { name, subject, bio, image }
│   └── teacher_1234567891: { ... }
│
├── clubs/
│   ├── club_1234567890: { name, description, members }
│   └── club_1234567891: { ... }
│
├── achievements/
│   ├── achievement_1234567890: { title, year, description }
│   └── achievement_1234567891: { ... }
│
├── library/
│   ├── doc_1234567890: { title, url, category, uploadedAt }
│   └── doc_1234567891: { ... }
│
├── studentPortal/
│   └── studentPortalData: { info, grades, assignments }
│
├── lunchMenu/
│   ├── menu_1234567890: { date, meals }
│   └── menu_1234567891: { ... }
│
├── messages/
│   └── contact/
│       ├── msg_1234567890: { name, email, message, createdAt }
│       └── msg_1234567891: { ... }
│
└── settings/
    ├── schoolName: "THPT Hương Khê"
    ├── schoolEmail: "..."
    └── maintenanceMode: false
```

---

## 🆘 Troubleshooting

| Lỗi | Nguyên Nhân | Giải Pháp |
|-----|-----------|----------|
| `auth/api-key-invalid-format` | API Key sai | Kiểm tra lại .env.local |
| `Permission denied` | Security Rules không cho phép | Thay đổi Rules thành `.write: true` |
| Dữ liệu không sync | Migration chưa chạy | Xóa `firebase_migration_completed` từ localStorage, reload |
| Database URL không có | Realtime Database chưa tạo | Vào **Build → Realtime Database → Create Database** |
| Quá nhiều request | Vượt giới hạn miễn phí | Nâng cấp plan hoặc tối ưu queries |

---

## 📞 Support

- 📖 [Firebase Docs](https://firebase.google.com/docs)
- 🐛 [Firebase Realtime Database Guide](https://firebase.google.com/docs/database)
- 💬 [StackOverflow - Firebase](https://stackoverflow.com/questions/tagged/firebase)

---

## ✅ Checklist Hoàn Tất

- [ ] Realtime Database đã bật
- [ ] Security Rules đã cấu hình
- [ ] .env.local có đủ tất cả credentials
- [ ] npm run dev chạy không lỗi
- [ ] Console (F12) không có Firebase error
- [ ] Firebase Console xác nhận dữ liệu đã upload
- [ ] Có thể xem dữ liệu trong tab "Data"
- [ ] Realtime sync hoạt động (thay đổi dữ liệu, reload trang vẫn thấy)

---

🎉 **Khi hoàn tất tất cả, Firebase của bạn sẵn sàng sử dụng!**
