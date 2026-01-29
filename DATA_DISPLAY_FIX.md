# 🔧 Fix: Dữ liệu không hiển thị trên máy Client

## Vấn đề
Data không hiển thị trên client website

## Nguyên nhân
1. **Supabase không có dữ liệu** hoặc không được cấu hình đúng
2. **Biến môi trường không được load** khi dev server khởi động
3. **API keys hết hạn hoặc không hợp lệ**

## Giải pháp

### 1️⃣ Restart Dev Server
Dev server cần được restart để load lại biến môi trường từ `.env` và `.env.local`:

```bash
# Dừng server (Ctrl+C)
# Rồi khởi động lại
npm run dev
```

### 2️⃣ Kiểm tra Biến Môi Trường
Kiểm tra browser console để xem biến Supabase đã được load:

```javascript
// Mở browser DevTools (F12) > Console, chạy:
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('Supabase Key:', import.meta.env.VITE_SUPABASE_ANON_KEY);
```

### 3️⃣ Enable Debug Mode
Để xem trạng thái dữ liệu trên UI:

```javascript
// Trong browser console, chạy:
localStorage.setItem('debug_data_status', 'true');
location.reload();
```

Sẽ hiển thị widget ở góc phải dưới cùng hiển thị số lượng items đã load.

### 4️⃣ Kiểm tra Supabase Database
Nếu dữ liệu vẫn không load từ Supabase:

1. Truy cập [Supabase Dashboard](https://supabase.com/dashboard)
2. Chọn project `vicqpnikodxcncyappes`
3. Kiểm tra các table: `news`, `teachers`, `clubs`, `gallery`, `events`
4. Nếu các table rỗng, bạn cần thêm dữ liệu hoặc seed dữ liệu mẫu

### 5️⃣ Seed Dữ Liệu Mẫu (Nếu Cần)
Chạy script seed dữ liệu:

```bash
node scripts/seedSupabase.js
```

## 📊 Cơ chế Fallback Dữ liệu

Ứng dụng có hệ thống fallback 3 cấp độ:

1. **Supabase** (Ưu tiên 1) → Tải từ PostgreSQL
2. **localStorage** (Ưu tiên 2) → Tải từ cache cục bộ
3. **Initial Data** (Ưu tiên 3) → Dữ liệu mặc định hardcode

**Vì vậy, ngay cả khi Supabase gặp sự cố, dữ liệu vẫn sẽ hiển thị từ cache hoặc dữ liệu mặc định.**

## 🐛 Debug Logs
Mở browser Console (F12) để xem chi tiết quá trình load dữ liệu:

```
📡 [DataContext] Starting Supabase data load...
✅ [News] Loaded 5 items from Supabase
✅ [Teachers] Loaded 6 items from Supabase
...
✅ [DataContext] Supabase data load complete
```

## Nếu vẫn không thành công
Kiểm tra:
- ✅ Dev server đã được restart?
- ✅ Biến `.env.local` có đầy đủ không?
- ✅ Kết nối mạng bình thường?
- ✅ Supabase database có dữ liệu?

Nếu tất cả bình thường, bạn có thể mở issue hoặc contact support.
