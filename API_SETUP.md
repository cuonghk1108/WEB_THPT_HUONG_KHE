# Hướng dẫn lấy API Keys để đồng bộ ảnh giữa các máy

## Vấn đề hiện tại
Hiện tại ảnh chỉ lưu trên localStorage của từng máy, nên máy admin upload được nhưng máy khác không thấy. Để đồng bộ giữa các máy, cần sử dụng cloud storage.

## Giải pháp
Sử dụng 2 dịch vụ miễn phí:
1. **ImgBB** - Lưu trữ ảnh (miễn phí không giới hạn)
2. **JSONBin.io** - Lưu trữ dữ liệu JSON (miễn phí 100K requests/tháng)

---

## Bước 1: Lấy API Key ImgBB (Upload ảnh)

### 1.1 Đăng ký tài khoản
- Truy cập: https://imgbb.com/
- Click **Sign up** (góc phải trên)
- Đăng ký bằng email hoặc Facebook/Google

### 1.2 Lấy API Key
- Sau khi đăng nhập, truy cập: https://api.imgbb.com/
- Điền thông tin:
  - **Name**: Tên ứng dụng của bạn (ví dụ: School Website)
  - **Description**: Mô tả (ví dụ: Image upload for school website)
  - **Email**: Email của bạn
- Click **Get API Key**
- **Sao chép API Key** (dạng: abc123def456...)

---

## Bước 2: Lấy API Key JSONBin.io (Lưu dữ liệu)

### 2.1 Đăng ký tài khoản
- Truy cập: https://jsonbin.io/
- Click **Sign Up** (góc phải trên)
- Đăng ký bằng email

### 2.2 Lấy API Key
- Sau khi đăng nhập, click vào tên của bạn (góc phải trên)
- Chọn **Account Settings**
- Tab **API Keys**
- Click **Create Access Key**
  - **Name**: School Data
  - **Permissions**: Chọn **Read & Write**
- Click **Create Key**
- **Sao chép API Key** (dạng: $2a$10$abc123...)

### 2.3 Tạo Bin (nơi lưu dữ liệu)
- Quay lại trang chủ JSONBin.io
- Click **Create New Bin**
- Paste nội dung sau:
```json
{
  "globalImages": {
    "logo": "",
    "homeHero": "",
    "introImage": "",
    "aboutImage": "",
    "contactImage": ""
  },
  "news": [],
  "teachers": [],
  "clubs": [],
  "gallery": []
}
```
- Click **Create**
- **Sao chép Bin ID** từ URL (sau `/b/`, ví dụ: `65abc123def456789...`)

---

## Bước 3: Cập nhật API Keys vào code

Mở file `d:\AI\services\cloudStorage.ts`

### 3.1 Thay ImgBB API Key
Tìm dòng:
```typescript
const imgbbKey = 'YOUR_IMGBB_API_KEY_HERE';
```

Thay bằng:
```typescript
const imgbbKey = 'abc123def456...'; // API Key từ bước 1.2
```

### 3.2 Thay JSONBin API Key
Tìm dòng:
```typescript
const JSONBIN_API_KEY = '$2a$10$YOUR_JSONBIN_KEY_HERE';
```

Thay bằng:
```typescript
const JSONBIN_API_KEY = '$2a$10$abc123...'; // API Key từ bước 2.2
```

### 3.3 Thay Bin ID
Tìm dòng:
```typescript
const BIN_ID = 'YOUR_BIN_ID_HERE';
```

Thay bằng:
```typescript
const BIN_ID = '65abc123def456789...'; // Bin ID từ bước 2.3
```

---

## Bước 4: Deploy lên Vercel

Sau khi cập nhật API keys:

```bash
# Build project
npm run build

# Deploy to Vercel
vercel --prod
```

Hoặc chạy file:
```bash
run_localhost.bat
```

---

## Kiểm tra hoạt động

1. **Trên máy Admin**:
   - Đăng nhập admin
   - Upload ảnh mới
   - Xem console (F12) → Không có lỗi "Cloud upload failed"

2. **Trên máy khác**:
   - Mở website
   - Refresh trang (Ctrl+F5)
   - Ảnh mới phải hiển thị

---

## Troubleshooting

### Lỗi "Cloud upload failed"
- Kiểm tra API keys có đúng không
- Kiểm tra Bin ID có đúng không
- Xem console để biết lỗi cụ thể

### Ảnh vẫn không đồng bộ
- Xóa localStorage: F12 → Console → Chạy `localStorage.clear()` → Refresh
- Kiểm tra JSONBin.io → Bin của bạn → Xem dữ liệu có cập nhật không

### Giới hạn miễn phí
- ImgBB: Không giới hạn số ảnh, nhưng mỗi ảnh tối đa 32MB
- JSONBin.io: 100K requests/tháng (đủ dùng cho website nhỏ)

---

## Lưu ý bảo mật

**QUAN TRỌNG**: Sau khi lấy API keys:
1. Không chia sẻ API keys với người khác
2. Không push file `cloudStorage.ts` lên GitHub public (nếu có)
3. Nên tạo file `.env` để lưu API keys riêng

### Cách sử dụng .env (nâng cao)
1. Tạo file `d:\AI\.env`:
```
VITE_IMGBB_KEY=abc123def456...
VITE_JSONBIN_KEY=$2a$10$abc123...
VITE_BIN_ID=65abc123def456789...
```

2. Sửa `cloudStorage.ts`:
```typescript
const imgbbKey = import.meta.env.VITE_IMGBB_KEY || 'YOUR_IMGBB_API_KEY_HERE';
const JSONBIN_API_KEY = import.meta.env.VITE_JSONBIN_KEY || '$2a$10$YOUR_JSONBIN_KEY_HERE';
const BIN_ID = import.meta.env.VITE_BIN_ID || 'YOUR_BIN_ID_HERE';
```

3. Thêm vào Vercel:
```bash
vercel env add VITE_IMGBB_KEY
vercel env add VITE_JSONBIN_KEY
vercel env add VITE_BIN_ID
```
