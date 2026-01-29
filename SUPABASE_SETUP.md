# 🚀 SUPABASE SETUP - HƯỚNG DẪN CHI TIẾT

## ✨ Supabase là gì?

Supabase là **Firebase alternative** dùng **PostgreSQL** mạnh mẽ:
- ✅ **500MB miễn phí** (học sinh/đơn vị giáo dục)
- ✅ **Real-time sync** như Firebase
- ✅ **PostgreSQL** - SQL queries mạnh mẽ
- ✅ **Auth, Storage** tích hợp
- ✅ **Open source** và dễ mở rộng

---

## 📋 BƯỚC 1: Tạo Tài Khoản Supabase

### 1.1 Truy cập Supabase
1. Mở: **https://supabase.com/**
2. Click **"Start your project"** hoặc **"Sign In"**
3. Đăng ký bằng **GitHub, Google, hoặc Email**

### 1.2 Tạo Dự Án Mới
1. Click **"New Project"**
2. Điền thông tin:
   - **Project name**: `school-website` hoặc tên bạn chọn
   - **Database password**: Tạo password mạnh (lưu lại!)
   - **Region**: Chọn **Singapore** (gần Việt Nam)
3. Click **"Create new project"**
4. **Chờ 1-2 phút** để Supabase khởi tạo database

---

## 📊 BƯỚC 2: Lấy Connection Credentials

Sau khi project được tạo:

### 2.1 Lấy Supabase URL
1. Sidebar → **Settings** → **API**
2. Tìm mục **"Project URL"**
3. Sao chép URL (dạng: `https://xxxxx.supabase.co`)

### 2.2 Lấy Anon Key
1. Ở mục **"Project API keys"**
2. Tìm **"anon"** (công khai, an toàn)
3. Click copy icon

### 2.3 Lấy Service Role Key (Tuỳ chọn)
- Nếu cần backend, copy **"service_role"** key

---

## 🗂️ BƯỚC 3: Tạo Database Tables

### 3.1 Truy cập Database
1. Sidebar → **SQL Editor**
2. Click **"New query"**

### 3.2 Tạo Bảng

Chạy SQL code dưới đây (**copy toàn bộ**):

```sql
-- Create news table
CREATE TABLE news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  images JSONB,
  author TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create events table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  date DATE,
  location TEXT,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create gallery table
CREATE TABLE gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  image_url TEXT,
  category TEXT,
  description TEXT,
  uploaded_at TIMESTAMP DEFAULT NOW()
);

-- Create teachers table
CREATE TABLE teachers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  subject TEXT,
  bio TEXT,
  image_url TEXT,
  phone TEXT,
  email TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create clubs table
CREATE TABLE clubs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  members INTEGER,
  leader TEXT,
  image_url TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create library table
CREATE TABLE library (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  document_url TEXT,
  category TEXT,
  description TEXT,
  uploaded_at TIMESTAMP DEFAULT NOW()
);

-- Create achievements table
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  year INTEGER,
  student TEXT,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create lunch_menu table
CREATE TABLE lunch_menu (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE,
  meals JSONB,
  notes TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create student_portal table
CREATE TABLE student_portal (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  info JSONB,
  grades JSONB,
  assignments JSONB,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create contact_messages table
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create settings table
CREATE TABLE settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE clubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE library ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE lunch_menu ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_portal ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "allow_public_read" ON news FOR SELECT USING (true);
CREATE POLICY "allow_public_read" ON events FOR SELECT USING (true);
CREATE POLICY "allow_public_read" ON gallery FOR SELECT USING (true);
CREATE POLICY "allow_public_read" ON teachers FOR SELECT USING (true);
CREATE POLICY "allow_public_read" ON clubs FOR SELECT USING (true);
CREATE POLICY "allow_public_read" ON library FOR SELECT USING (true);
CREATE POLICY "allow_public_read" ON achievements FOR SELECT USING (true);
CREATE POLICY "allow_public_read" ON lunch_menu FOR SELECT USING (true);
CREATE POLICY "allow_public_read" ON student_portal FOR SELECT USING (true);
CREATE POLICY "allow_public_read" ON settings FOR SELECT USING (true);

-- Allow authenticated users to write
CREATE POLICY "allow_authenticated_write" ON news FOR INSERT WITH CHECK (true);
CREATE POLICY "allow_authenticated_update" ON news FOR UPDATE USING (true);
CREATE POLICY "allow_authenticated_delete" ON news FOR DELETE USING (true);
```

### 3.3 Chạy SQL
1. Paste code trên vào query editor
2. Click **"Run"** hoặc **Ctrl+Enter**
3. Chờ khi xong, sẽ thấy **"Success"** ✅

---

## 🔐 BƯỚC 4: Cấu Hình Row Level Security (RLS)

### 4.1 Bật Public Access
1. Sidebar → **Authentication** → **Policies**
2. Cho mỗi table, tạo policy:
   - **SELECT**: Public read access ✅ (đã tạo ở trên)
   - **INSERT/UPDATE/DELETE**: Cho authenticated users ✅ (đã tạo ở trên)

---

## 🔑 BƯỚC 5: Cấu Hình Environment Variables

### 5.1 Cập nhật `.env.local`
```bash
# Supabase
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here

# Cloudinary (nếu dùng)
VITE_CLOUDINARY_CLOUD_NAME=dxfly0qxr
VITE_CLOUDINARY_API_KEY=
VITE_CLOUDINARY_API_SECRET=
```

### 5.2 Thay thế giá trị:
- `VITE_SUPABASE_URL` → Project URL từ Supabase Console
- `VITE_SUPABASE_ANON_KEY` → Anon Key từ Supabase Console

---

## 📝 BƯỚC 6: Thêm Dữ Liệu Mẫu

### 6.1 Tạo script thêm dữ liệu

Tôi sẽ tạo script: `npm run supabase:seed`

### 6.2 Chạy script
```bash
npm run supabase:seed
```

---

## ✅ BƯỚC 7: Test Kết Nối

### 7.1 Chạy ứng dụng
```bash
npm run dev
```

### 7.2 Kiểm tra Console (F12)
- Mở http://localhost:3000
- Nhấn F12 → Console
- Kiểm tra không có error Supabase

### 7.3 Xem dữ liệu
1. Quay lại Supabase Console
2. Sidebar → **Table Editor**
3. Xem các table được populate

---

## 📊 Cấu Trúc Database

```
school_database
├── news
│   ├── id (UUID)
│   ├── title (TEXT)
│   ├── excerpt (TEXT)
│   ├── content (TEXT)
│   ├── images (JSONB)
│   ├── author (TEXT)
│   ├── created_at (TIMESTAMP)
│   └── updated_at (TIMESTAMP)
│
├── events
│   ├── id (UUID)
│   ├── title (TEXT)
│   ├── date (DATE)
│   ├── location (TEXT)
│   ├── description (TEXT)
│   └── created_at (TIMESTAMP)
│
├── gallery
│   ├── id (UUID)
│   ├── title (TEXT)
│   ├── image_url (TEXT)
│   ├── category (TEXT)
│   └── uploaded_at (TIMESTAMP)
│
├── teachers
│   ├── id (UUID)
│   ├── name (TEXT)
│   ├── subject (TEXT)
│   ├── bio (TEXT)
│   ├── image_url (TEXT)
│   └── email (TEXT)
│
├── clubs
│   ├── id (UUID)
│   ├── name (TEXT)
│   ├── description (TEXT)
│   ├── members (INTEGER)
│   └── leader (TEXT)
│
└── ... và các table khác
```

---

## 🔒 Bảo Mật

### Policies mặc định:
- ✅ **Tất cả user** có thể READ (công khai)
- ✅ **Authenticated user** có thể CREATE/UPDATE/DELETE
- ⚠️ Thay đổi nếu muốn chỉ admin edit

### Tạo User Admin (Tuỳ chọn):
1. Sidebar → **Authentication** → **Users**
2. Click **"Add user"**
3. Điền email admin
4. Tạo policies cho admin-only tables

---

## 🆘 Troubleshooting

| Lỗi | Giải Pháp |
|-----|----------|
| `Couldn't parse the JWT` | Anon Key sai, kiểm tra .env.local |
| `RLS policy violation` | Tạo policies, xem hướng dẫn trên |
| `Relation not found` | Table chưa được tạo, chạy SQL lại |
| `Connection refused` | Kiểm tra database_url, đảm bảo đúng |
| `401 Unauthorized` | Kiểm tra Supabase credentials |

---

## 📞 Support

- 📖 [Supabase Docs](https://supabase.com/docs)
- 🆘 [Supabase Community](https://github.com/supabase/supabase/discussions)
- 🐛 [Supabase Discord](https://discord.supabase.com)

---

## ✅ Checklist Hoàn Thành

- [ ] Tài khoản Supabase được tạo
- [ ] Project được tạo
- [ ] Credentials (URL & Anon Key) được copy
- [ ] Database tables được tạo (SQL script chạy thành công)
- [ ] RLS policies được setup
- [ ] .env.local được cấu hình
- [ ] npm run dev không có lỗi
- [ ] Supabase Console xác nhận dữ liệu

---

**🎉 Khi hoàn tất, bạn sẽ có PostgreSQL database mạnh mẽ với real-time sync!**
