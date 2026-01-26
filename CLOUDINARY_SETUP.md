# 🖼️ Hướng dẫn Setup Cloudinary

## Bước 1: Tạo tài khoản Cloudinary (Miễn phí)

1. Truy cập: https://cloudinary.com/users/register_free
2. Đăng ký tài khoản (Email hoặc Google)
3. Xác nhận email

**Free Tier bao gồm:**
- ✅ 25GB Storage
- ✅ 25GB Bandwidth/tháng
- ✅ 25 credits/tháng
- ✅ CDN toàn cầu nhanh
- ✅ Tự động tối ưu ảnh

## Bước 2: Lấy Cloud Name

1. Sau khi đăng nhập, vào **Dashboard**
2. Ở góc trên, bạn sẽ thấy:
   ```
   Cloud name: your-cloud-name
   ```
3. Copy `Cloud name` này

## Bước 3: Tạo Upload Preset (Unsigned)

1. Vào **Settings** (biểu tượng ⚙️) → **Upload**
2. Scroll xuống phần **Upload presets**
3. Click **Add upload preset**
4. Cấu hình:
   - **Preset name**: `school_uploads` (hoặc tên bạn muốn)
   - **Signing Mode**: Chọn **Unsigned** ⚠️ (quan trọng!)
   - **Folder**: Để trống hoặc nhập `school` (tùy chọn)
   - **Use filename**: ✅ Bật nếu muốn giữ tên file
   - **Unique filename**: ✅ Bật để tránh trùng
5. Click **Save**
6. Copy **Preset name** vừa tạo

## Bước 4: Cấu hình Environment Variables

1. Tạo file `.env` trong thư mục gốc (nếu chưa có):
   ```bash
   copy .env.example .env
   ```

2. Mở file `.env` và thêm:
   ```env
   VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
   VITE_CLOUDINARY_UPLOAD_PRESET=school_uploads
   ```

   Ví dụ:
   ```env
   VITE_CLOUDINARY_CLOUD_NAME=dab1234xyz
   VITE_CLOUDINARY_UPLOAD_PRESET=school_uploads
   ```

## Bước 5: Chạy lại ứng dụng

```bash
npm run dev
```

## ✨ Tính năng mới

### 1. Upload ảnh với folder organization:
```typescript
// Upload vào folder 'gallery'
await cloudStorage.uploadImage(base64Image, 'gallery');

// Upload vào folder 'teachers'
await cloudStorage.uploadImage(base64Image, 'teachers');
```

### 2. Tối ưu ảnh tự động:
```typescript
// Lấy ảnh tối ưu với width 800px, chất lượng auto
const optimizedUrl = cloudStorage.getOptimizedUrl(imageUrl, {
  width: 800,
  quality: 'auto',
  format: 'webp'
});
```

### 3. Ảnh được lưu trên CDN toàn cầu
- Tốc độ load nhanh
- Tự động resize và optimize
- Không giới hạn số lần xem

## 🎯 Folders được tổ chức:

- `school/gallery/` - Ảnh thư viện
- `school/teachers/` - Ảnh giáo viên
- `school/news/` - Ảnh tin tức
- `school/clubs/` - Ảnh câu lạc bộ
- `school/images/` - Ảnh chung

## 🔧 Troubleshooting

### Lỗi: "Cloudinary credentials not configured"
- Kiểm tra file `.env` đã có đủ 2 biến
- Restart lại dev server: `Ctrl+C` rồi `npm run dev`

### Lỗi: "Upload failed"
- Kiểm tra **Upload Preset** đã đặt **Signing Mode = Unsigned**
- Kiểm tra tên preset trong `.env` đúng với tên đã tạo

### Ảnh không hiển thị
- Mở console (F12) xem lỗi
- Kiểm tra URL ảnh có format: `https://res.cloudinary.com/...`

## 📊 Quản lý ảnh trên Cloudinary

1. Vào **Media Library** để xem tất cả ảnh
2. Có thể xóa, rename, organize folders
3. Xem thống kê bandwidth usage

## 🚀 Deploy lên Vercel/Netlify

Thêm Environment Variables trên hosting:
- Key: `VITE_CLOUDINARY_CLOUD_NAME`
- Value: `your-cloud-name`
- Key: `VITE_CLOUDINARY_UPLOAD_PRESET`  
- Value: `school_uploads`

---

**Lưu ý bảo mật:**
- ⚠️ Không commit file `.env` lên GitHub
- ✅ Chỉ commit file `.env.example`
- ✅ Unsigned preset an toàn cho client-side upload
