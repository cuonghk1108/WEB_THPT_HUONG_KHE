# THPT Hương Khê - Website Chính Thức

Cổng thông tin điện tử trường THPT Hương Khê - Kết nối nhà trường, phụ huynh và học sinh. Tích hợp trợ lý ảo AI hỗ trợ tư vấn 24/7.

## Tính năng

- 🏠 **Trang chủ** - Banner và thông tin nổi bật
- 📖 **Giới thiệu** - Lịch sử và truyền thống nhà trường
- 🎓 **Tuyển sinh** - Thông tin tuyển sinh học sinh
- 📰 **Tin tức & Sự kiện** - Cập nhật hoạt động nhà trường
- 📋 **Văn bản** - Tài liệu và quy định
- 👨‍🏫 **Giáo viên** - Đội ngũ giáo viên và cán bộ
- 📅 **Góc học sinh** - Thời khóa biểu, lịch thi, biểu mẫu
  - Thời khóa biểu theo từng lớp (45 lớp khối 10-12)
  - Lịch kiểm tra tập trung
  - Biểu mẫu và quy định
- 🏆 **Câu lạc bộ** - Các CLB học thuật và văn nghệ
- 🖼️ **Thư viện ảnh** - Hình ảnh hoạt động
- 🤖 **Chatbot AI** - Trợ lý ảo hỗ trợ tư vấn 24/7
- 🔐 **Trang Admin** - Quản lý nội dung website

## Công nghệ sử dụng

- ⚛️ **React 19** - Frontend framework
- 📘 **TypeScript** - Type-safe development
- ⚡ **Vite** - Build tool và dev server
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🧭 **React Router** - Client-side routing
- 🤖 **Google Gemini AI** - AI chatbot integration
- ☁️ **JSONBin.io** - Cloud data storage

## Cài đặt và chạy

1. Clone repository:
   ```bash
   git clone https://github.com/cuonghk1108/AI.git
   cd AI
   ```

2. Cài đặt dependencies:
   ```bash
   npm install
   ```

3. Tạo file `.env` từ template và cấu hình API keys:
   ```bash
   cp .env.example .env
   ```
   
   Chỉnh sửa file `.env` và thêm các giá trị:
   ```env
   # Gemini AI API Key (bắt buộc cho chatbot)
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   
   # JSONBin.io credentials (tùy chọn - cho cloud storage)
   VITE_JSONBIN_API_KEY=your_jsonbin_api_key_here
   VITE_JSONBIN_BIN_ID=your_bin_id_here
   ```
   
   **Lấy API keys:**
   - Gemini AI: https://aistudio.google.com/app/apikey
   - JSONBin.io: https://jsonbin.io (tạo account miễn phí)

4. Chạy server local:
   ```bash
   npm run dev
   ```
   Hoặc double-click `run_localhost.bat`

5. Truy cập: http://localhost:3000

## Deploy

Website đã được deploy trên Vercel: https://ai-delta-ecru.vercel.app

### Deploy lên Vercel

1. Push code lên GitHub
2. Import project từ Vercel Dashboard
3. Thêm Environment Variables:
   - `VITE_GEMINI_API_KEY`
   - `VITE_JSONBIN_API_KEY`
   - `VITE_JSONBIN_BIN_ID`
4. Deploy

Hoặc dùng CLI:
```bash
npm run build
vercel --prod
```

## Cấu trúc thư mục

```
AI/
├── api/                 # API endpoints (Vercel serverless)
├── components/          # React components
├── context/            # React context (state management)
├── pages/              # Page components
│   └── Admin/          # Admin dashboard pages
├── services/           # External services (Gemini AI, JSONBin)
├── public/             # Static assets
└── src/                # Source files (CSS)
```

## Tính năng Admin

Đăng nhập admin tại: `/admin/login`

**Mật khẩu mặc định:** `cuonghk1108`

Quản lý:
- Tin tức
- Hình ảnh (logo, banner)
- Giáo viên
- Câu lạc bộ
- Thư viện ảnh
- Góc học sinh (thời khóa biểu, lịch thi)

## Bản quyền

© 2025 cuongdev1108. Tất cả quyền được bảo lưu.

Dự án này được phát triển bởi cuongdev1108. Không được sao chép, phân phối hoặc sử dụng cho mục đích thương mại mà không có sự đồng ý bằng văn bản.
