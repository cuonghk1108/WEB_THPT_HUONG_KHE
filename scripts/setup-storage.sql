-- ===================================
-- SETUP SUPABASE STORAGE BUCKET
-- ===================================
-- Chạy SQL này trong Supabase SQL Editor để tạo bucket và policies

-- 1. Tạo bucket 'images' (chạy trong Supabase Dashboard → Storage → Policies)
-- Hoặc tạo thủ công qua UI:
--    - Vào Storage → New bucket
--    - Name: images
--    - Public: ✓ (checked)
--    - Click Create

-- 2. Tạo policies cho bucket (chạy SQL này)

-- Policy: Cho phép mọi người đọc ảnh
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'images' );

-- Policy: Cho phép authenticated users upload ảnh
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'images' AND auth.role() = 'authenticated' );

-- Policy: Cho phép authenticated users xóa ảnh của họ
CREATE POLICY "Users can delete own images"
ON storage.objects FOR DELETE
USING ( bucket_id = 'images' AND auth.role() = 'authenticated' );

-- Policy: Cho phép authenticated users update ảnh
CREATE POLICY "Users can update images"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'images' AND auth.role() = 'authenticated' );

-- Hoặc nếu muốn cho phép anonymous upload (không cần đăng nhập):
-- Xóa policy cũ và tạo mới:
DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;

CREATE POLICY "Anyone can upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'images' );

-- ===================================
-- HƯỚNG DẪN TẠO BUCKET QUA UI (Dễ hơn):
-- ===================================
-- 1. Vào: https://supabase.com/dashboard/project/vicqpnikodxcncyappes/storage/buckets
-- 2. Click "New bucket"
-- 3. Điền:
--    - Name: images
--    - Public: ✓ (BẬT)
--    - File size limit: 10 MB
--    - Allowed MIME types: image/png, image/jpeg, image/jpg, image/gif, image/webp
-- 4. Click "Create bucket"
-- 5. Bucket đã sẵn sàng!
