import { supabase } from '../services/supabaseService.ts';

async function setupSupabaseStorage() {
  console.log('🚀 Setting up Supabase Storage...');

  try {
    // Kiểm tra bucket đã tồn tại chưa
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error('❌ Error listing buckets:', listError);
      return;
    }

    const imagesBucket = buckets?.find(b => b.name === 'images');

    if (imagesBucket) {
      console.log('✅ Bucket "images" đã tồn tại');
    } else {
      console.log('📦 Đang tạo bucket "images"...');
      
      // Tạo bucket mới
      const { data, error } = await supabase.storage.createBucket('images', {
        public: true,
        fileSizeLimit: 10485760, // 10MB
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp']
      });

      if (error) {
        console.error('❌ Lỗi tạo bucket:', error);
        console.log('\n📝 Vui lòng tạo bucket thủ công:');
        console.log('1. Vào Supabase Dashboard → Storage');
        console.log('2. Click "New bucket"');
        console.log('3. Tên: images');
        console.log('4. Public bucket: BẬT');
        console.log('5. Click Create bucket');
      } else {
        console.log('✅ Đã tạo bucket "images" thành công!');
      }
    }

    console.log('\n✅ Setup hoàn tất!');
    console.log('📸 Giờ bạn có thể upload ảnh vào Supabase Storage');

  } catch (error) {
    console.error('❌ Lỗi:', error);
    console.log('\n📝 Hướng dẫn tạo bucket thủ công:');
    console.log('1. Truy cập: https://supabase.com/dashboard/project/vicqpnikodxcncyappes/storage/buckets');
    console.log('2. Click nút "New bucket"');
    console.log('3. Điền:');
    console.log('   - Name: images');
    console.log('   - Public: ✓ (checked)');
    console.log('   - File size limit: 10 MB');
    console.log('4. Click "Create bucket"');
    console.log('5. Sau đó chạy lại: npm run setup:storage');
  }
}

// Chạy script
setupSupabaseStorage();
