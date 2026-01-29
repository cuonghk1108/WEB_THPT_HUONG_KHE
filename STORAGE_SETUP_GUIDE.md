# Hướng dẫn thiết lập Supabase Storage

## Bước 1: Thêm Service Role Key vào Vercel

Để API `/api/setup-storage` hoạt động, bạn cần thêm `SUPABASE_SERVICE_ROLE_KEY` vào Vercel:

1. Vào [Supabase Dashboard](https://supabase.com/dashboard/project/vicqpnikodxcncyappes/settings/api)
2. Ở phần **Project API keys**, copy **service_role** key (⚠️ **Secret** - không share)
3. Vào [Vercel Project Settings](https://vercel.com/cuongs-projects-00393bae/ai/settings/environment-variables)
4. Thêm environment variable mới:
   - **Name**: `SUPABASE_SERVICE_ROLE_KEY`
   - **Value**: `<service_role_key_đã_copy>`
   - **Environment**: ✓ Production, ✓ Preview, ✓ Development
5. Click **Save**
6. Redeploy lại project

## Bước 2: Sử dụng trang Storage Setup

Sau khi đã thêm Service Role Key:

1. Vào https://thpthuongkhe.vercel.app/admin/storage-setup
2. Click nút **"Thiết lập Storage"**
3. Hệ thống sẽ tự động:
   - Tạo bucket "images" (nếu chưa có)
   - Bật chế độ Public
   - Thiết lập policies cho phép đọc/upload ảnh

## Bước 3: Upload ảnh và dữ liệu

Sau khi Storage đã setup xong:

1. Vào https://thpthuongkhe.vercel.app/admin/data-migration
2. Click **"Bắt đầu đẩy dữ liệu"**
3. Hệ thống sẽ:
   - Tự động tải và upload **tất cả ảnh** lên Supabase Storage
   - Đẩy **toàn bộ dữ liệu** lên database
   - Ảnh sẽ hiển thị được trên web ngay lập tức

## Cách thủ công (nếu API không hoạt động)

Nếu API endpoint gặp lỗi, bạn có thể tạo bucket thủ công:

1. Vào [Supabase Storage](https://supabase.com/dashboard/project/vicqpnikodxcncyappes/storage/buckets)
2. Click **"New bucket"**
3. Cấu hình:
   - **Name**: `images`
   - **Public**: ✓ **CHECKED**
   - **File size limit**: `10 MB`
   - **Allowed MIME types**: `image/png, image/jpeg, image/jpg, image/gif, image/webp`
4. Click **"Create bucket"**
5. Vào tab **Policies**
6. Click **"New Policy"**
7. Chọn **"For full customization"**
8. Policy name: `Public Access`
9. Allowed operation: **SELECT**
10. Policy definition:
    ```sql
    bucket_id = 'images'
    ```
11. Click **"Save policy"**

Sau đó tiếp tục bước 3 ở trên để upload ảnh và dữ liệu.

## Kiểm tra ảnh đã upload

Sau khi upload xong, kiểm tra:

1. Vào [Supabase Storage Browser](https://supabase.com/dashboard/project/vicqpnikodxcncyappes/storage/buckets/images)
2. Bạn sẽ thấy các folder: `news/`, `teachers/`, `clubs/`, `gallery/`, `events/`, `achievements/`, `library/`
3. Click vào 1 ảnh và copy URL
4. Mở URL trong trình duyệt - ảnh phải hiển thị được

## URL ảnh Supabase

Ảnh upload lên Supabase sẽ có dạng:
```
https://vicqpnikodxcncyappes.supabase.co/storage/v1/object/public/images/news/1738080000000-abc123.jpg
```

Nếu ảnh không hiển thị, kiểm tra:
- ✓ Bucket "images" đã được tạo
- ✓ Bucket "images" đang ở chế độ **Public**
- ✓ Policy "Public Access" đã được thiết lập cho SELECT operation

## Lưu ý

- ⚠️ **Service Role Key** có quyền admin toàn quyền, tuyệt đối không share public
- ✅ Bucket "images" phải là **Public** để ảnh hiển thị được trên web
- ✅ Policy phải cho phép **SELECT** (read) với điều kiện `bucket_id = 'images'`
- 🔄 Sau khi thêm env variable, phải **redeploy** Vercel project
