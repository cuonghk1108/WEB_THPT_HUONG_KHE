# 🚀 Hướng dẫn Deploy Production

## Bước 1: Deploy Backend lên Render

### 1.1. Tạo Git Repository cho Backend (nếu chưa có)
```bash
cd d:\AI\backend
git init
git add .
git commit -m "Initial backend commit"
```

### 1.2. Push lên GitHub
```bash
# Tạo repo mới trên GitHub: thpt-huong-khe-backend
git remote add origin https://github.com/cuongdev1108/thpt-huong-khe-backend.git
git branch -M main
git push -u origin main
```

### 1.3. Deploy trên Render
1. Đăng nhập https://render.com
2. **New** → **Web Service**
3. Connect GitHub repo: `cuongdev1108/thpt-huong-khe-backend`
4. Cấu hình:
   - **Name**: `web-thpt-huong-khe`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

5. **Environment Variables** (Add từng biến):
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://cuongdev1108:cuongdev200811@cluster0.askv2r4.mongodb.net/
   ```

6. Click **Create Web Service**
7. Đợi deploy xong → Copy URL: `https://web-thpt-huong-khe.onrender.com`

---

## Bước 2: Deploy Frontend lên Vercel

### 2.1. Cập nhật Environment Variables trên Vercel

1. Đăng nhập https://vercel.com
2. Vào project: `thpthuongkhe`
3. **Settings** → **Environment Variables**
4. Thêm/Update các biến:

```
VITE_API_URL=https://web-thpt-huong-khe.onrender.com/api
VITE_SOCKET_URL=https://web-thpt-huong-khe.onrender.com
```

5. **Save**

### 2.2. Redeploy Frontend

#### Option A: Từ Vercel Dashboard
1. Vào **Deployments**
2. Click menu ⋮ → **Redeploy**

#### Option B: Từ Git (Recommended)
```bash
cd d:\AI
git add .
git commit -m "Update to MongoDB backend with Socket.io"
git push
```
Vercel sẽ tự động build lại.

---

## Bước 3: Cấu hình CORS cho Production

Cập nhật `backend/server.js` để accept Vercel domain:

```javascript
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://thpthuongkhe.vercel.app'  // ✅ Production domain
  ],
  credentials: true
};
```

Push lại lên GitHub → Render tự động redeploy.

---

## Bước 4: Test Production

1. Vào https://thpthuongkhe.vercel.app
2. Mở Admin Gallery Manager
3. Upload ảnh
4. **Mở tab khác** cùng URL → Ảnh phải xuất hiện realtime

### Check Logs nếu lỗi:
- **Render**: Dashboard → Logs
- **Vercel**: Project → Deployments → View Function Logs
- **Browser**: F12 → Console

---

## ⚠️ Lưu ý quan trọng

### Socket.io trên Render Free Tier
- Render Free spin down sau 15 phút không dùng
- Khi spin down, WebSocket disconnect
- **Giải pháp**: Dùng polling fallback (đã implement trong `DataContext.tsx`)

### MongoDB Atlas Network Access
- Whitelist IP: `0.0.0.0/0` (Allow from anywhere)
- Hoặc thêm Render IP vào whitelist

### Environment Variables
- **KHÔNG commit** `.env` files lên Git
- Luôn set variables trên Render/Vercel dashboard

---

## 🔄 Flow Hoàn Chỉnh

```
User Upload Ảnh (Client A)
    ↓
Frontend call mongoService.addGalleryImage()
    ↓
Backend API /api/gallery (POST)
    ↓
MongoDB Atlas lưu data
    ↓
Socket.io broadcast "gallery:created"
    ↓
Client B/C/D nhận event
    ↓
Auto update state
    ↓
Hiển thị ảnh ngay lập tức
```

---

## 📋 Checklist Deploy

- [ ] Backend repo pushed lên GitHub
- [ ] Render Web Service created
- [ ] MongoDB URI configured trên Render
- [ ] Backend deploy thành công (check logs)
- [ ] Vercel env vars updated với production URLs
- [ ] Frontend redeployed
- [ ] CORS config có Vercel domain
- [ ] Test upload ảnh trên production
- [ ] Test realtime sync giữa 2 tabs

---

## 🆘 Troubleshooting

### Backend không connect MongoDB
```bash
# Check MongoDB Atlas Network Access
# Allow 0.0.0.0/0 hoặc add Render IP
```

### Frontend không connect backend
```bash
# Check Vercel env vars
# VITE_API_URL phải có /api suffix
# VITE_SOCKET_URL không có /api
```

### Socket.io không hoạt động
```bash
# Check browser console: "Socket.io connected"
# Check backend logs: "User connected"
# Render Free tier có thể timeout → dùng polling fallback
```
