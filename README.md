# 🏫 THPT Hương Khê - Website Chính Thức

<div align="center">

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![React](https://img.shields.io/badge/React-19.2.3-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

**Cổng thông tin điện tử hiện đại - Kết nối nhà trường, phụ huynh và học sinh**

[Demo Live](https://thpthuongkhe.vercel.app) · [Báo lỗi](https://github.com/cuonghk1108/WEB_THPT_HUONG_KHE/issues) · [Yêu cầu tính năng](https://github.com/cuonghk1108/WEB_THPT_HUONG_KHE/issues)

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
- **📅 Góc học sinh** - Tài nguyên học tập
  - ⏰ Thời khóa biểu theo từng lớp (45 lớp khối 10-12)
  - 📝 Lịch kiểm tra định kỳ và thi học kỳ
  - 📄 Biểu mẫu và quy định học sinh
- **🏆 Câu lạc bộ** - Thông tin các CLB học thuật, văn nghệ, thể thao
- **🖼️ Thư viện ảnh** - Gallery hình ảnh hoạt động theo từng chủ đề
- **🤖 Chatbot AI** - Trợ lý ảo hỗ trợ tư vấn 24/7 được hỗ trợ bởi Google Gemini
- **👥 Thống kê truy cập** - Theo dõi lượt truy cập theo ngày/tuần/năm

### 🔐 Dành cho quản trị viên
- **📊 Admin Dashboard** - Quản lý nội dung website tập trung
- **📰 Quản lý tin tức** - Thêm, sửa, xóa bài viết với editor rich text
- **🖼️ Quản lý hình ảnh** - Upload và tổ chức hình ảnh (logo, banner, thư viện)
- **👨‍🏫 Quản lý giáo viên** - Cập nhật thông tin đội ngũ giáo viên
- **🏆 Quản lý câu lạc bộ** - Thêm/chỉnh sửa thông tin các CLB
- **📅 Quản lý góc học sinh** - Upload thời khóa biểu và lịch thi
- **⚙️ Cài đặt** - Cấu hình chung và dark mode

### 🎨 UX/UI Features
- **🌓 Dark Mode** - Giao diện tối/sáng với animation mượt mà
- **📱 Responsive Design** - Tương thích mọi thiết bị (mobile, tablet, desktop)
- **⚡ Fast Performance** - Tối ưu tốc độ tải trang với Vite và code splitting
- **♿ Accessibility** - Tuân thủ chuẩn WCAG 2.1 cho người khuyết tật
- **🔍 SEO Optimized** - Meta tags và structured data cho SEO

---

## 🚀 Công nghệ sử dụng

### Frontend
- ⚛️ **React 19.2.3** - Modern UI library với React Compiler
- 📘 **TypeScript 5.7** - Type safety và developer experience tốt hơn
- ⚡ **Vite 6.4.1** - Lightning-fast build tool và HMR
- 🎨 **Tailwind CSS 3.4** - Utility-first CSS framework
- 🧭 **React Router v7** - Declarative routing cho SPA

### Backend & Services
- 🖼️ **Cloudinary** - Cloud image storage và CDN (25GB free)
- 💾 **JSONBin.io** - Cloud JSON storage (100K requests/month free)
- 🤖 **Google Gemini AI** - Advanced chatbot với natural language processing
- ☁️ **Vercel** - Serverless deployment và edge functions

### Development Tools
- 📦 **npm** - Package manager
- 🔧 **ESLint** - Code linting
- 🎭 **PostCSS** - CSS transformations
- 🔥 **Hot Module Replacement** - Instant dev feedback

---

## 📦 Cài đặt

### Yêu cầu hệ thống
- Node.js >= 18.0.0
- npm >= 9.0.0

### Bước 1: Clone repository
```bash
git clone https://github.com/cuonghk1108/WEB_THPT_HUONG_KHE.git
cd WEB_THPT_HUONG_KHE
```

### Bước 2: Cài đặt dependencies
```bash
npm install
```

### Bước 3: Cấu hình environment variables
```bash
cp .env.example .env
```

Chỉnh sửa file `.env` và thêm các API keys:

```env
# Google Gemini AI (bắt buộc cho chatbot)
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# JSONBin.io (bắt buộc cho lưu trữ dữ liệu)
VITE_JSONBIN_API_KEY=your_jsonbin_api_key_here
VITE_JSONBIN_BIN_ID=your_school_data_bin_id_here
VITE_VISITOR_BIN_ID=your_visitor_counter_bin_id_here

# Cloudinary (bắt buộc cho upload ảnh)
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
VITE_CLOUDINARY_API_KEY=your_api_key_here
VITE_CLOUDINARY_API_SECRET=your_api_secret_here
```

**Hướng dẫn lấy API keys:**

1. **Google Gemini AI**: 
   - Truy cập: https://aistudio.google.com/app/apikey
   - Đăng nhập với Google account
   - Tạo API key mới (miễn phí)

2. **JSONBin.io**:
   - Tạo account tại: https://jsonbin.io
   - Copy API Key từ dashboard
   - Tạo 2 bins:
     - **School Data Bin**: Paste JSON template từ phần "Cấu trúc dữ liệu"
     - **Visitor Counter Bin**: `{"total": 0, "lastUpdate": "", "daily": []}`

3. **Cloudinary**:
   - Đăng ký miễn phí tại: https://cloudinary.com
   - Copy Cloud Name, API Key, API Secret từ Dashboard

### Bước 4: Chạy development server
```bash
npm run dev
```

Hoặc double-click file `run_localhost.bat` (Windows)

Truy cập: **http://localhost:3000**

---

## 🏗️ Build & Deploy

### Build cho production
```bash
npm run build
```

Build output sẽ được tạo trong thư mục `dist/`

### Preview production build
```bash
npm run preview
```

### Deploy lên Vercel (Recommended)

#### Method 1: Vercel Dashboard
1. Push code lên GitHub
2. Truy cập [Vercel Dashboard](https://vercel.com/new)
3. Import repository
4. Thêm Environment Variables (tất cả biến trong `.env`)
5. Deploy!

#### Method 2: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

**Lưu ý**: Đảm bảo đã thêm đầy đủ environment variables trên Vercel trước khi deploy!

---

## 📁 Cấu trúc dự án

```
WEB_THPT_HUONG_KHE/
├── api/                      # Vercel serverless functions
│   ├── upload.js            # Cloudinary upload endpoint
│   ├── delete.js            # Cloudinary delete endpoint
│   └── visitors.js          # Visitor counter API
├── components/               # React components
│   ├── Header.tsx           # Navigation header
│   ├── Footer.tsx           # Footer with visitor counter
│   ├── Chatbot.tsx          # AI chatbot component
│   └── VisitorCounter.tsx   # Visitor statistics
├── context/                  # React Context providers
│   ├── DataContext.tsx      # Global data management
│   └── DarkModeContext.tsx  # Dark mode state
├── pages/                    # Page components
│   ├── Home.tsx             # Homepage
│   ├── Introduction.tsx     # School introduction
│   ├── Admissions.tsx       # Admissions info
│   ├── News.tsx             # News & events
│   ├── Documents.tsx        # Documents & announcements
│   ├── Teachers.tsx         # Teachers directory
│   ├── StudentCorner.tsx    # Student resources
│   ├── Clubs.tsx            # Clubs & activities
│   ├── Gallery.tsx          # Photo gallery
│   ├── Contact.tsx          # Contact information
│   └── Admin/               # Admin dashboard
│       ├── Login.tsx        # Admin login
│       ├── AdminLayout.tsx  # Admin layout wrapper
│       ├── NewsManager.tsx  # News management
│       ├── ImageManager.tsx # Image management
│       ├── TeacherManager.tsx
│       ├── ClubManager.tsx
│       ├── GalleryManager.tsx
│       ├── StudentCornerManager.tsx
│       └── Settings.tsx     # Admin settings
├── services/                 # External service integrations
│   ├── cloudStorage.ts      # JSONBin & Cloudinary API
│   ├── geminiService.ts     # Google Gemini AI
│   └── visitorCounter.ts    # Visitor tracking
├── public/                   # Static assets
│   ├── data/
│   │   └── school-data.json # Local data fallback
│   └── uploads/             # Local upload directory
├── src/
│   └── index.css            # Global styles
├── App.tsx                   # Main app component
├── index.tsx                # App entry point
├── constants.ts             # App constants
├── types.ts                 # TypeScript types
├── server.js                # Express + Vite dev server
├── .env.example             # Environment variables template
├── vercel.json              # Vercel configuration
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies & scripts
```

---

## 🔐 Trang Admin

### Đăng nhập
- **URL**: http://localhost:3000/admin/login
- **Mật khẩu mặc định**: `admin`

### Chức năng quản lý
- ✅ **Tin tức**: Thêm/sửa/xóa bài viết, upload ảnh đại diện
- ✅ **Hình ảnh toàn cục**: Cập nhật logo, banner, ảnh hiệu trưởng
- ✅ **Giáo viên**: Quản lý thông tin giáo viên với ảnh chân dung
- ✅ **Câu lạc bộ**: Thêm/chỉnh sửa CLB với mô tả và hình ảnh
- ✅ **Thư viện ảnh**: Upload hình ảnh theo danh mục (Sự kiện, Hoạt động, Cơ sở vật chất)
- ✅ **Góc học sinh**: Upload thời khóa biểu PDF, lịch thi theo lớp
- ✅ **Cài đặt**: Toggle dark mode, cấu hình hệ thống

### Bảo mật
- 🔒 Protected routes với authentication check
- 🔑 Password-based access control
- 🚫 Auto-redirect nếu chưa đăng nhập

---

## 📊 Cấu trúc dữ liệu

### School Data Bin (JSONBin)
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
      "id": "unique_id",
      "title": "Tiêu đề tin tức",
      "content": "Nội dung chi tiết...",
      "image": "https://res.cloudinary.com/...",
      "date": "2024-01-26",
      "category": "Sự kiện"
    }
  ],
  "teachers": [
    {
      "id": "unique_id",
      "name": "Tên giáo viên",
      "subject": "Môn học",
      "role": "Chức vụ",
      "image": "https://res.cloudinary.com/...",
      "bio": "Tiểu sử..."
    }
  ],
  "clubs": [
    {
      "id": "unique_id",
      "name": "Tên câu lạc bộ",
      "description": "Mô tả hoạt động...",
      "image": "https://res.cloudinary.com/...",
      "members": 50,
      "advisor": "Giáo viên phụ trách"
    }
  ],
  "gallery": [
    {
      "id": "unique_id",
      "title": "Tên hình ảnh",
      "category": "Sự kiện | Hoạt động | Cơ sở vật chất",
      "image": "https://res.cloudinary.com/...",
      "date": "2024-01-26"
    }
  ],
  "lastUpdate": "2024-01-26T00:00:00Z"
}
```

### Visitor Counter Bin (JSONBin)
```json
{
  "total": 1234,
  "lastUpdate": "2024-01-26T10:30:00Z",
  "daily": [
    {
      "date": "2024-01-26",
      "count": 156
    }
  ]
}
```

---

## 🤝 Đóng góp

Mọi đóng góp đều được hoan nghênh! Nếu bạn muốn cải thiện dự án:

1. Fork repository
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

---

## 🐛 Báo lỗi

Phát hiện bug? [Tạo issue mới](https://github.com/cuonghk1108/WEB_THPT_HUONG_KHE/issues) với:
- Mô tả chi tiết lỗi
- Các bước tái hiện
- Screenshots (nếu có)
- Môi trường (browser, OS)

---

## 📝 License

Copyright © 2024-2025 [cuongdev1108](https://github.com/cuonghk1108)

Dự án này được phát hành dưới giấy phép **MIT License** - xem file [LICENSE](LICENSE) để biết thêm chi tiết.

---

## 👨‍💻 Tác giả

**cuongdev1108** - *Full Stack Developer*
- GitHub: [@cuonghk1108](https://github.com/cuonghk1108)
- Email: cuonghk1108@gmail.com

**Team The First** - *Development Team*

---

## 🙏 Lời cảm ơn

- [React](https://react.dev/) - UI framework tuyệt vời
- [Vite](https://vitejs.dev/) - Build tool siêu nhanh
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework hiện đại
- [Vercel](https://vercel.com/) - Platform deployment tốt nhất
- [Cloudinary](https://cloudinary.com/) - Image hosting & CDN
- [Google Gemini](https://ai.google.dev/) - AI chatbot integration
- [JSONBin.io](https://jsonbin.io/) - Simple JSON storage

---

<div align="center">

**⭐ Nếu dự án hữu ích, hãy cho một star! ⭐**

Made with ❤️ by cuongdev1108 & Team The First

</div>