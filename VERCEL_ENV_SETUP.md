# Hướng dẫn thêm Environment Variables vào Vercel

## ⚠️ BẮT BUỘC - Để tính năng Storage Setup hoạt động

Vào: https://vercel.com/cuongs-projects-00393bae/ai/settings/environment-variables

## 1. VITE_SUPABASE_URL
- **Name**: `VITE_SUPABASE_URL`
- **Value**: `https://vicqpnikodxcncyappes.supabase.co`
- **Environment**: ✓ Production, ✓ Preview, ✓ Development
- Click **Save**

## 2. VITE_SUPABASE_ANON_KEY
- **Name**: `VITE_SUPABASE_ANON_KEY`
- **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpY3Fwbmlrb2R4Y25jeWFwcGVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgwNjAwNzgsImV4cCI6MjA1MzYzNjA3OH0.fOWvSKR4D7TROALvsb_publishable_fK57P65tAO6kGiszBHq3gA`
- **Environment**: ✓ Production, ✓ Preview, ✓ Development
- Click **Save**

## 3. SUPABASE_SERVICE_ROLE_KEY (🔑 QUAN TRỌNG NHẤT)
**Lấy key này từ:**
1. Vào https://supabase.com/dashboard/project/vicqpnikodxcncyappes/settings/api
2. Tìm **service_role** key (phần "Service Role" - secret key)
3. Copy key đó

**Thêm vào Vercel:**
- **Name**: `SUPABASE_SERVICE_ROLE_KEY`
- **Value**: `<service_role_key_vừa_copy>` (bắt đầu bằng `eyJhbGciOi...`)
- **Environment**: ✓ Production, ✓ Preview, ✓ Development
- Click **Save**

## 4. Redeploy

Sau khi thêm xong 3 biến trên, chạy lệnh:

```powershell
vercel --prod --yes
```

Hoặc vào Vercel Dashboard > Deployments > Click "Redeploy" trên deployment mới nhất

## Kiểm tra

Sau khi redeploy, vào:
- https://thpthuongkhe.vercel.app/admin/storage-setup
- Click "Thiết lập Storage"
- Nếu không còn lỗi "Missing Supabase credentials" → Thành công! ✅

## Lưu ý bảo mật

- ⚠️ **SUPABASE_SERVICE_ROLE_KEY** có quyền admin toàn quyền
- ❌ KHÔNG BAO GIỜ commit key này vào git
- ❌ KHÔNG chia sẻ key này công khai
- ✅ CHỈ đặt trong Vercel Environment Variables
- ✅ Key này chỉ được dùng trong serverless functions (API routes)
