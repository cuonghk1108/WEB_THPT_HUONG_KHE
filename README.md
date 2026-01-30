# 🏫 THPT Hương Khê - Website Chính Thức v3.0

<div align="center">

![Version](https://img.shields.io/badge/version-3.0.0-blue.svg)
![React](https://img.shields.io/badge/React-19.2.3-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6.svg)
![Vite](https://img.shields.io/badge/Vite-6.4.1-646cff.svg)
![Tailwind](https://img.shields.io/badge/Tailwind%20CSS-3.4-38b2ac.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

**Cổng thông tin điện tử hiện đại - Kết nối nhà trường, phụ huynh và học sinh**

[🌐 Demo Live](https://thpthuongkhe.vercel.app) · [📄 Tài liệu](./README.md) · [🐛 Báo lỗi](https://github.com/cuonghk1108/WEB_THPT_HUONG_KHE/issues) · [💬 Thảo luận](https://github.com/cuonghk1108/WEB_THPT_HUONG_KHE/discussions)

</div>

---

## ✨ Tính năng nổi bật

### 🎯 Dành cho học sinh & phụ huynh
- **🏠 Trang chủ** - Giao diện hiện đại với banner hero và thông tin nổi bật
- **📖 Giới thiệu** - Lịch sử 60+ năm phát triển và truyền thống nhà trường
- **🎓 Tuyển sinh** - Thông tin chi tiết về tuyển sinh, chỉ tiêu và hướng dẫn đăng ký
- **📰 Tin tức & Sự kiện** - Cập nhật hoạt động, thành tích và sự kiện nhà trường
- **📋 Văn bản** - Thông báo, quy định và tài liệu hành chính
- **👨‍🏫 Đội ngũ giáo viên** - Giới thiệu giáo viên và cán bộ quản lý
- **📚 Thư viện học liệu kỹ thuật số** - Tài liệu, bài tập, tài nguyên học tập
- **📅 Góc học sinh** - Tài nguyên học tập
  - ⏰ **Thời khóa biểu** - Theo từng lớp (45 lớp khối 10-12, auto-sync từ admin)
  - 📝 **Lịch kiểm tra** - Định kỳ và thi học kỳ theo lớp
  - 📄 **Biểu mẫu & Quy định** - Tất cả biểu mẫu và quy định học sinh
  - 📊 **Thành tích học sinh** - Ghi nhận các thành tích, bằng khen
- **🏆 Câu lạc bộ** - Thông tin các CLB học thuật, văn nghệ, thể thao
- **🖼️ Thư viện ảnh** - Gallery hình ảnh hoạt động theo từng chủ đề
- **🤖 Chatbot AI** - Trợ lý ảo hỗ trợ tư vấn 24/7 được hỗ trợ bởi Grok AI (xAI)
- **👥 Thống kê truy cập** - Theo dõi lượt truy cập theo ngày/tuần/năm

### 🔐 Dành cho quản trị viên
- **📊 Admin Dashboard** - Quản lý nội dung website tập trung
  - 📈 **Thống kê nhanh**: Tỷ lệ hoạt động, nội dung tổng, trạng thái website
  - 📊 **Biểu đồ truy cập**: 14 ngày gần nhất với dữ liệu live từ JSONBin
  - 🔥 **Tin tức gần đây**: Xem 3 bài viết mới nhất
- **📰 Quản lý tin tức** - Thêm, sửa, xóa bài viết với editor rich text + upload ảnh
- **🖼️ Quản lý hình ảnh** - Upload và tổ chức hình ảnh (logo, banner, thư viện)
- **👨‍🏫 Quản lý giáo viên** - Cập nhật thông tin đội ngũ giáo viên với hình ảnh
- **🏆 Quản lý câu lạc bộ** - Thêm/chỉnh sửa thông tin các CLB
- **📅 Quản lý góc học sinh** - Upload thời khóa biểu, lịch thi, biểu mẫu, thành tích
- **📚 Quản lý thư viện kỹ thuật số** - Quản lý tài liệu và tài nguyên học tập
- **🎓 Quản lý thành tích** - Ghi nhận các thành tích, bằng khen học sinh
- **🛠️ Cấu hình hệ thống** - Tùy chỉnh website, đồng bộ dữ liệu cloud

---

---

## 🚀 Công nghệ sử dụng

Website được xây dựng trên nền tảng công nghệ hiện đại, tối ưu cho hiệu suất và trải nghiệm người dùng:

### 🎨 Giao diện người dùng (Frontend)

#### **React 19.2.3** - Thư viện xây dựng giao diện
- ⚡ **Hiệu suất cao**: Render siêu nhanh với React Compiler mới nhất
- 🔄 **Cập nhật tức thì**: Tự động cập nhật nội dung khi có thay đổi
- 📱 **Responsive**: Giao diện tự động điều chỉnh trên mọi thiết bị (điện thoại, máy tính bảng, PC)

#### **TypeScript 5.7** - Ngôn ngữ lập trình
- ✅ **An toàn**: Phát hiện lỗi ngay khi code, giảm 90% bug
- 📖 **Dễ bảo trì**: Code rõ ràng, dễ đọc và bảo trì lâu dài
- 🚀 **Hiệu suất**: Biên dịch tối ưu cho tốc độ tải trang nhanh

#### **Vite 6.4.1** - Công cụ build
- ⚡ **Siêu nhanh**: Khởi động server chỉ ~200ms, build production ~2s
- 🔥 **Hot reload**: Thay đổi code hiển thị ngay lập tức không cần refresh
- 📦 **Tối ưu**: Tự động nén, minify code để website tải siêu nhanh

#### **Tailwind CSS 3.4** - Framework CSS
- 🎨 **Thiết kế linh hoạt**: Dễ dàng tùy chỉnh màu sắc, kích thước, layout
- 📱 **Mobile-first**: Ưu tiên hiển thị tốt trên điện thoại trước
- 🌓 **Dark Mode**: Hỗ trợ chế độ tối/sáng tự động

#### **React Router v7** - Điều hướng trang
- 🧭 **SPA**: Chuyển trang mượt mà không reload, trải nghiệm như app mobile
- 🔗 **SEO-friendly**: Hỗ trợ tốt cho Google tìm kiếm
- 📍 **Deep linking**: Chia sẻ link trực tiếp đến bất kỳ trang nào

### 🗄️ Backend & Cơ sở dữ liệu

#### **MongoDB Atlas** - Database NoSQL
- 💾 **Lưu trữ đám mây**: Dữ liệu an toàn, sao lưu tự động
- 🚀 **Hiệu suất cao**: Truy vấn nhanh với indexing tối ưu
- 📊 **Dễ mở rộng**: Dễ dàng thêm field mới không cần migration

#### **Node.js + Express** - Backend API
- 🔌 **RESTful API**: Chuẩn API dễ tích hợp với mọi nền tảng
- 🔐 **JWT Authentication**: Bảo mật admin với token 7 ngày
- ✅ **Validation**: Kiểm tra dữ liệu với Zod schema

#### **Socket.io 4.6** - Real-time Updates
- 🔄 **Cập nhật tức thì**: Admin đăng tin, website hiện ngay không cần F5
- 📡 **WebSocket**: Kết nối 2 chiều tốc độ cao
- 👥 **Multi-user**: Nhiều admin có thể làm việc đồng thời

#### **Cloudinary** - Quản lý hình ảnh
- 🖼️ **CDN toàn cầu**: Tải ảnh siêu nhanh từ server gần nhất
- 🔄 **Tự động tối ưu**: Resize, compress ảnh theo device
- 💰 **Miễn phí**: 25GB bandwidth/tháng (đủ cho ~100K lượt truy cập)

### 🤖 AI & Tích hợp

#### **Grok AI (xAI)** - Chatbot thông minh
- 💬 **Tư vấn 24/7**: Trả lời tự động về thông tin trường, tuyển sinh, học tập
- 🧠 **Hiểu ngữ cảnh**: Nhớ lịch sử chat, trả lời chính xác
- 🇻🇳 **Tiếng Việt**: Tối ưu cho người dùng Việt Nam

### 🔒 Bảo mật & Hiệu suất

#### **Winston Logger** - Ghi log hệ thống
- 📝 **Theo dõi hoạt động**: Log mọi request, error để debug
- 🔍 **Phát hiện lỗi**: Email thông báo khi có lỗi nghiêm trọng
- 📊 **Phân tích**: Biết user dùng tính năng nào nhiều nhất

#### **bcrypt + JWT** - Bảo mật admin
- 🔐 **Mã hóa password**: Hash SHA-256 không thể reverse
- 🎫 **Token xác thực**: JWT với expiry 7 ngày
- 🛡️ **RBAC**: Phân quyền admin/editor/viewer

### ☁️ Deploy & Hosting

#### **Vercel** - Frontend Hosting
- 🌍 **Edge Network**: Deploy lên 20+ server toàn cầu
- ⚡ **CDN tự động**: Tải trang < 1s từ mọi nơi
- 🔄 **Auto Deploy**: Push code lên GitHub → tự động deploy

#### **Railway/Render** - Backend Hosting
- 🚂 **Serverless**: Tự động scale theo traffic
- 💰 **Miễn phí**: $5 credit/tháng (đủ cho 100K requests)
- 📊 **Monitoring**: Dashboard theo dõi CPU, RAM, traffic

### 🛠️ Development Tools

- 📦 **npm** - Quản lý thư viện JavaScript
- 🔧 **ESLint** - Kiểm tra code tự động, đảm bảo chuẩn coding
- 🎭 **PostCSS** - Tự động thêm vendor prefix CSS
- 🔥 **HMR** - Hot Module Replacement, thay đổi code hiển thị ngay

### 🏗️ Kiến trúc hệ thống

```
┌─────────────────┐         ┌──────────────────┐
│   React App     │ ◄─────► │   Express API    │
│  (Port 3000)    │  HTTP   │   (Port 5000)    │
└────────┬────────┘         └────────┬─────────┘
         │                           │
         │ Socket.io                 │ Mongoose
         │                           │
         ▼                           ▼
    ┌────────────────────────────────────┐
    │         MongoDB Atlas              │
    │  (Cloud Database - Free Tier)      │
    └────────────────────────────────────┘
```

**Đặc điểm:**
- 🏗️ **Separation of Concerns**: Frontend/Backend tách biệt, dễ scale
- 🔄 **Real-time Sync**: Socket.io đồng bộ data 2 chiều
- 📱 **Mobile-first**: Thiết kế ưu tiên mobile rồi mở rộng lên desktop
- ♿ **Accessibility**: Tuân thủ WCAG 2.1 (hỗ trợ người khuyết tật)
- 🎯 **SEO Optimized**: Meta tags, sitemap, structured data

---

## 📋 Yêu Cầu Hệ Thống

```bash
Node.js >= 18.0.0
npm >= 9.0.0
# hoặc
yarn >= 3.0.0
pnpm >= 8.0.0
```

---

## 🚀 Cài Đặt & Chạy

### 1. Clone Repository
```bash
git clone https://github.com/cuonghk1108/WEB_THPT_HUONG_KHE.git
cd WEB_THPT_HUONG_KHE
```

### 2. Cài Đặt Dependencies
```bash
npm install
```

### Bước 3: Cấu hình Environment Variables
Tạo file `.env` trong thư mục gốc:

```bash
cp .env.example .env
```

Mở file `.env` và thêm các API keys:

```env
# Grok AI (xAI) (bắt buộc cho chatbot)
VITE_XAI_API_KEY=your_grok_api_key_here

# JSONBin.io (bắt buộc cho lưu trữ dữ liệu)
VITE_JSONBIN_API_KEY=your_jsonbin_api_key_here
VITE_JSONBIN_BIN_ID=your_school_data_bin_id_here
VITE_VISITOR_BIN_ID=your_visitor_counter_bin_id_here

# Cloudinary (bắt buộc cho upload ảnh)
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
VITE_CLOUDINARY_API_KEY=your_api_key_here
VITE_CLOUDINARY_API_SECRET=your_api_secret_here
```

**📚 Hướng dẫn lấy từng API key:**

#### 1️⃣ Grok AI API (xAI)
```
✓ Truy cập: https://console.x.ai
✓ Đăng nhập với X/Twitter account
✓ Navigate to API Keys → "Create API Key"
✓ Copy key vào VITE_XAI_API_KEY
✓ Model: grok-beta (advanced reasoning)
```

#### 2️⃣ JSONBin.io (Miễn phí)
```
✓ Tạo account: https://jsonbin.io
✓ Đăng nhập → Dashboard
✓ Copy "API KEY" vào VITE_JSONBIN_API_KEY
✓ Tạo 2 bins:
  • School Data Bin (chứa news, teachers, clubs, gallery, etc)
  • Visitor Counter Bin (chứa {total: 0, daily: []})
✓ Copy bin IDs vào VITE_JSONBIN_BIN_ID và VITE_VISITOR_BIN_ID
✓ Free tier: 100K requests/month
```

#### 3️⃣ Cloudinary (Miễn phí)
```
✓ Đăng ký: https://cloudinary.com/users/register/free
✓ Dashboard → Settings (nút tuỳ chọn)
✓ Tab "API Keys"
✓ Copy "Cloud Name", "API Key", "API Secret"
✓ Paste vào VITE_CLOUDINARY_CLOUD_NAME, VITE_CLOUDINARY_API_KEY, VITE_CLOUDINARY_API_SECRET
✓ Free tier: 25GB storage, 25K transformations/month
```

### Bước 4: Chạy Development Server
```bash
npm run dev
```

**Hoặc Windows:** Double-click file `run_localhost.bat`

**Truy cập:**
- 🌐 Frontend: http://localhost:3000
- 🔐 Admin: http://localhost:3000/admin/login
- **Credentials**: username: `admin`, password: `admin`

---

## 📁 Cấu trúc Dự Án

```
WEB_THPT_HUONG_KHE/
│
├── 📁 api/                          # Vercel Serverless Functions
│   ├── upload.js                   # Cloudinary image upload
│   ├── delete.js                   # Cloudinary image delete
│   ├── save-data.js                # JSONBin data export
│   └── calendar.ts                 # ICS calendar feed (Google Calendar)
│
├── 📁 components/                   # React Components
│   ├── Header.tsx                  # Navigation & branding
│   ├── Footer.tsx                  # Footer with visitor counter
│   ├── Chatbot.tsx                 # AI chatbot (Grok AI - xAI)
│   ├── VisitorCounter.tsx          # Visitor statistics badge
│   └── ...
│
├── 📁 context/                      # Global State (React Context)
│   ├── DataContext.tsx             # Central data management + CRUD
│   │   ├── news (CRUD)
│   │   ├── teachers (CRUD)
│   │   ├── clubs (CRUD)
│   │   ├── gallery (CRUD)
│   │   ├── studentCorner (CRUD)
│   │   ├── achievementYears (CRUD)
│   │   ├── digitalLibrary (CRUD)
│   │   └── studentPortal (CRUD)
│   │   ├── Cloud sync (fetch from JSONBin)
│   │   └── localStorage persistence
│   └── DarkModeContext.tsx         # Theme management
│
├── 📁 pages/                        # Page Components
│   ├── Home.tsx                    # Homepage with hero banner
│   ├── Introduction.tsx            # School history & info
│   ├── Admissions.tsx              # Admissions information
│   ├── News.tsx                    # News & events listing
│   ├── Documents.tsx               # Official documents & notices
│   ├── Teachers.tsx                # Teachers directory
│   ├── Clubs.tsx                   # Clubs & activities
│   ├── Gallery.tsx                 # Photo gallery with categories
│   ├── StudentCorner.tsx           # Student hub (schedule, exams, forms, achievements)
│   ├── Contact.tsx                 # Contact information
│   ├── DarkModeTest.tsx            # Dark mode test page
│   │
│   └── 📁 Admin/                   # Admin Dashboard
│       ├── Login.tsx               # Admin authentication
│       ├── AdminLayout.tsx         # Dashboard layout wrapper
│       ├── Dashboard.tsx           # Admin dashboard (stats, charts)
│       ├── NewsManager.tsx         # News CRUD + image upload
│       ├── ImageManager.tsx        # Global images (logo, banner)
│       ├── TeacherManager.tsx      # Teachers CRUD + avatar upload
│       ├── ClubManager.tsx         # Clubs CRUD + logo upload
│       ├── GalleryManager.tsx      # Gallery CRUD with categories
│       ├── StudentCornerManager.tsx # Schedule, exams, forms, achievements
│       ├── DigitalLibraryManager.tsx # Digital resources CRUD
│       ├── StudentPortalManager.tsx  # Student portal content
│       ├── AchievementManager.tsx    # Achievement management
│       └── Settings.tsx            # System settings & data sync
│
├── 📁 services/                     # External API Integration
│   ├── cloudStorage.ts             # JSONBin + Cloudinary API
│   │   ├── uploadImage()           # Upload to Cloudinary
│   │   ├── fetchData()             # Fetch from JSONBin
│   │   ├── saveData()              # Export to JSONBin
│   │   └── deleteImage()           # Delete from Cloudinary
│   ├── geminiService.ts            # Grok AI (xAI) Service
│   │   └── getChatResponse()       # AI chat responses
│   └── visitorCounter.ts           # Visitor tracking
│
├── 📁 public/                       # Static Assets
│   ├── 📁 data/
│   │   └── school-data.json        # Local data fallback
│   └── 📁 uploads/                 # Local upload directory
│
├── 📁 src/
│   └── index.css                   # Global styles + Tailwind
│
├── 📁 dist/                         # Production build (auto-generated)
│
├── 🔧 Configuration Files
│   ├── App.tsx                     # Root component
│   ├── index.tsx                   # App entry point
│   ├── constants.ts                # App constants
│   ├── types.ts                    # TypeScript type definitions
│   ├── vite.config.ts              # Vite configuration
│   ├── tailwind.config.js          # Tailwind CSS config
│   ├── tsconfig.json               # TypeScript config
│   ├── vercel.json                 # Vercel deployment config
│   ├── package.json                # Dependencies & scripts
│   ├── .env.example                # Environment template
│   └── .gitignore                  # Git ignore rules
│
└── 📝 Documentation
    ├── README.md                   # This file
    ├── API_SETUP.md                # API setup guide
    ├── DEPLOYMENT_SUMMARY.md       # v3.0 deployment details
    ├── ROADMAP.md                  # Development roadmap
    └── PRESENTATION.md             # 31-slide project presentation
```

### 🗂️ Data Flow
```
┌─────────────────────────────────────┐
│     React Components (Pages)        │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│   DataContext (Global State)        │
│   ├─ news, teachers, clubs, etc    │
│   ├─ CRUD operations               │
│   └─ localStorage sync             │
└──────────────┬──────────────────────┘
               │
        ┌──────┴──────┐
        ▼             ▼
    ┌──────┐      ┌─────────┐
    │ JSON │      │ Cloud-  │
    │ Bin  │      │ inary   │
    │ (DB) │      │ (Images)│
    └──────┘      └─────────┘
```

---

## 🔐 Admin Panel

### 🔑 Đăng Nhập
- **URL**: http://localhost:3000/admin/login (hoặc /admin/dashboard)
- **Default Credentials**:
  - Username: `admin`
  - Password: `admin`

### 📊 Dashboard
- **📈 Statistics**: Real-time stats (visitors, content count, activity rate)
- **📊 Chart**: 14-day visitor analytics
- **🔥 Recent News**: Latest 3 articles
- **📌 Quick Stats**: Activity rate, content total, system status

### ✨ Quản Lý Nội Dung

| Feature | Description | Buttons |
|---------|-------------|---------|
| **📰 Tin tức** | Thêm/sửa/xóa bài viết | Add, Edit, Delete |
| **🖼️ Hình ảnh** | Quản lý logo, banner | Upload, Replace |
| **👨‍🏫 Giáo viên** | Quản lý đội ngũ | Add, Edit, Delete |
| **🏆 CLB** | Quản lý câu lạc bộ | Add, Edit, Delete |
| **📅 Góc học sinh** | Thời khóa biểu, lịch thi, biểu mẫu | Manage |
| **📚 Thư viện** | Tài liệu học tập | Upload, Organize |
| **🎓 Thành tích** | Ghi nhận thành tích học sinh | Add, Edit |

### 💾 Đồng Bộ Dữ Liệu
- **One-Click Export**: Gửi tất cả dữ liệu lên JSONBin
- **Auto-Sync**: Tự động fetch dữ liệu từ cloud khi mở app
- **Backup**: Tất cả dữ liệu được sao lưu trên cloud

### 🔒 Bảo Mật
- ✅ Protected routes (chỉ admin access)
- ✅ Session management
- ✅ Input validation
- ✅ Auto logout (có thể thêm)

### 📝 Cách Sử Dụng Các Manager

**Ví dụ: Thêm Tin Tức**
```
1. Click nút "Thêm tin mới"
2. Nhập tiêu đề, danh mục, ngày đăng
3. Upload ảnh hoặc dán link
4. Nhập nội dung (hỗ trợ HTML)
5. Click "Đăng bài"
6. Dữ liệu tự động lưu vào localStorage + JSONBin
```

**Ví dụ: Cập Nhật Thời Khóa Biểu**
```
1. Vào "Góc học sinh" → Tab "Thời khóa biểu"
2. Chọn lớp từ dropdown
3. Nhập tiêu đề, mô tả
4. Thêm dòng (thứ 2, thứ 3, ...)
5. Nhập các môn học (tiết 1, tiết 2, ...)
6. Click "Lưu"
7. Học sinh sẽ thấy TKB được cập nhật ngay
```

---

## � Schema Dữ Liệu

### 📦 School Data Bin (JSONBin)
```json
{
  "globalImages": {
    "logo": "https://res.cloudinary.com/...",
    "homeHero": "https://res.cloudinary.com/...",
    "principal": "https://res.cloudinary.com/...",
    "introHistory": "https://res.cloudinary.com/..."
  },
  
  "news": [
    {
      "id": "uuid",
      "title": "Tin tức mới",
      "excerpt": "Tóm tắt bài viết",
      "content": "<p>Nội dung chi tiết...</p>",
      "imageUrl": "https://res.cloudinary.com/...",
      "category": "Hoạt động | Thông báo | Gương sáng",
      "date": "2024-01-26"
    }
  ],
  
  "teachers": [
    {
      "id": "uuid",
      "name": "Tên giáo viên",
      "subject": "Môn dạy",
      "position": "Giáo viên",
      "department": "Tổ Toán-Tin",
      "email": "email@school.edu.vn",
      "imageUrl": "https://res.cloudinary.com/..."
    }
  ],
  
  "clubs": [
    {
      "id": "uuid",
      "name": "Tên CLB",
      "description": "Mô tả hoạt động...",
      "imageUrl": "https://res.cloudinary.com/...",
      "members": 50,
      "schedule": "Thứ 5, tiết 7-9"
    }
  ],
  
  "gallery": [
    {
      "id": "uuid",
      "title": "Tên ảnh",
      "category": "Sự kiện | Hoạt động | Cơ sở",
      "imageUrl": "https://res.cloudinary.com/...",
      "date": "2024-01-26"
    }
  ],
  
  "studentCorner": {
    "scheduleData": { ... },
    "exams": [ ... ],
    "forms": [ ... ]
  },
  
  "achievementYears": [ ... ],
  
  "digitalLibrary": [
    {
      "id": "uuid",
      "title": "Tên tài liệu",
      "category": "Bài tập | Tài liệu | Video",
      "subject": "Môn học",
      "url": "https://...",
      "description": "Mô tả"
    }
  ],
  
  "lastUpdate": "2024-01-26T10:30:00Z"
}
```

### 📊 Visitor Counter Bin
```json
{
  "total": 1234,
  "lastUpdate": "2024-01-26T10:30:00Z",
  "daily": [
    { "date": "2024-01-26", "count": 156 },
    { "date": "2024-01-25", "count": 142 }
  ]
}
```

---

## � Scripts Npm

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)
npm run build            # Build for production
npm run preview          # Preview production build

# Deployment
vercel --prod           # Deploy to Vercel production

# Linting
npm run lint            # Check code quality
npm run lint:fix        # Auto-fix linting issues

# Other
npm install             # Install dependencies
npm update              # Update dependencies
```

---

## 📱 Responsive Breakpoints

| Device | Width | Test |
|--------|-------|------|
| Mobile | 320px-640px | iPhone, Android phones |
| Tablet | 640px-1024px | iPad, tablets |
| Desktop | 1024px+ | Laptops, desktops |
| Wide | 1920px+ | Large monitors |

Website tự động responsive trên tất cả kích thước màn hình.

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] Homepage loads correctly
- [ ] Navigation links work
- [ ] Admin login works
- [ ] CRUD operations work
- [ ] Image upload works
- [ ] Chat bot responds
- [ ] Dark mode toggle works
- [ ] Mobile responsiveness
- [ ] API integration works

### Performance Checklist
- [ ] Build time < 2s
- [ ] Page load < 3s
- [ ] Images optimized
- [ ] CSS/JS minified
- [ ] No console errors

---

## 🐛 Troubleshooting

### ❌ "API Key is invalid"
```
✓ Kiểm tra .env file có tất cả keys
✓ Không có khoảng trắng thừa
✓ Key phải active trên service
✓ Xóa cache browser (Ctrl+Shift+Delete)
```

### ❌ "CORS Error"
```
✓ Cloudinary: API key phải public
✓ JSONBin: Bin phải public hoặc private + API key
✓ Grok AI: API key phải hợp lệ từ xAI console
```

### ❌ "Build fails"
```
✓ Delete node_modules && npm install
✓ Clear .next/dist cache
✓ Check Node version (>= 18)
✓ npm run build --verbose
```

### ❌ "Images not loading"
```
✓ Check Cloudinary dashboard
✓ Verify image URLs are valid
✓ Check VITE_CLOUDINARY_CLOUD_NAME
✓ Verify API credentials
```

---

## 🤝 Đóng Góp

Mọi đóng góp đều được hoan nghênh! Để đóng góp:

1. **Fork** repository
2. Tạo **feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit** changes (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. Mở **Pull Request**

### Yêu cầu:
- Code phải clean và follow TypeScript best practices
- Thêm comments cho logic phức tạp
- Test kỹ trước khi submit PR
- Cập nhật README nếu thay đổi features

---

## 📞 Support & Contact

| Channel | Link/Info |
|---------|-----------|
| **Issues** | [GitHub Issues](https://github.com/cuonghk1108/WEB_THPT_HUONG_KHE/issues) |
| **Discussions** | [GitHub Discussions](https://github.com/cuonghk1108/WEB_THPT_HUONG_KHE/discussions) |
| **Email** | cuonghk1108@gmail.com |
| **Demo** | [thpthuongkhe.vercel.app](https://thpthuongkhe.vercel.app) |

---

## � License

MIT License - Tự do sử dụng cho mục đích thương mại & cá nhân.

```
Copyright © 2024-2025 cuongdev1108
All rights reserved.
```

---

## 👨‍💻 Tác Giả & Contributors

### 👤 Main Developer
- **cuongdev1108** (Võ Xuân Cường)
  - Full Stack Developer
  - GitHub: [@cuonghk1108](https://github.com/cuonghk1108)
  - Email: cuonghk1108@gmail.com

### 👥 Team
- **Team The First** - Development & Design Team

### 🙌 Cảm Ơn
Cảm ơn:
- ⚛️ [React](https://react.dev) - Tuyệt vời UI library
- ⚡ [Vite](https://vitejs.dev) - Build tool siêu nhanh
- 🎨 [Tailwind CSS](https://tailwindcss.com) - CSS framework
- ☁️ [Vercel](https://vercel.com) - Best deployment platform
- 🖼️ [Cloudinary](https://cloudinary.com) - Image CDN
- 🤖 [Grok AI (xAI)](https://x.ai) - AI API
- 📦 [JSONBin](https://jsonbin.io) - JSON storage

---

<div align="center">

### 📊 Project Stats
![GitHub stars](https://img.shields.io/github/stars/cuonghk1108/WEB_THPT_HUONG_KHE?style=flat-square)
![GitHub forks](https://img.shields.io/github/forks/cuonghk1108/WEB_THPT_HUONG_KHE?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/cuonghk1108/WEB_THPT_HUONG_KHE?style=flat-square)

---

## ⭐ Support

Nếu project hữu ích, hãy cho một **⭐ Star** để hỗ trợ!

Made with ❤️ by **cuongdev1108** & **Team The First**

[🔝 Back to Top](#-thpt-hương-khê---website-chính-thức-v30)

</div>
