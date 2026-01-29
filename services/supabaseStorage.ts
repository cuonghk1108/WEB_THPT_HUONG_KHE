import { supabase } from './supabaseService';

const BUCKET_NAME = 'images'; // Tên bucket trong Supabase Storage

/**
 * Upload ảnh lên Supabase Storage
 * @param file - File ảnh cần upload
 * @param folder - Thư mục lưu trữ (vd: 'news', 'gallery', 'teachers')
 * @returns URL công khai của ảnh
 */
export async function uploadImageToSupabase(file: File, folder: string = 'uploads'): Promise<string> {
  try {
    // Tạo tên file unique
    const fileExt = file.name.split('.').pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;

    // Upload file
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      throw error;
    }

    // Lấy URL công khai
    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileName);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading to Supabase Storage:', error);
    throw error;
  }
}

/**
 * Xóa ảnh khỏi Supabase Storage
 * @param filePath - Đường dẫn file cần xóa
 */
export async function deleteImageFromSupabase(filePath: string): Promise<void> {
  try {
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filePath]);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error deleting from Supabase Storage:', error);
    throw error;
  }
}

/**
 * Upload ảnh từ URL (vd: Unsplash) lên Supabase Storage
 * @param imageUrl - URL của ảnh cần upload
 * @param folder - Thư mục lưu trữ
 * @returns URL công khai của ảnh
 */
export async function uploadImageFromUrl(imageUrl: string, folder: string = 'uploads'): Promise<string> {
  try {
    console.log(`📥 Fetching image from URL: ${imageUrl}`);

    // Fetch ảnh từ URL với proper headers
    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'image/*',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    // Kiểm tra MIME type
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    
    if (!contentType.startsWith('image/')) {
      throw new Error(`Invalid MIME type: ${contentType}. Expected image, got ${contentType}`);
    }

    // Convert response to blob
    const blob = await response.blob();
    
    // Tạo File object
    const fileExt = contentType.split('/')[1] || 'jpg';
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;

    console.log(`📤 Uploading to Supabase Storage: ${fileName}`);

    // Upload
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, blob, {
        contentType: contentType,
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('❌ Upload error:', error);
      throw new Error(`Upload failed: ${error.message}`);
    }

    console.log('✅ Upload successful:', data);

    // Lấy URL công khai
    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileName);

    if (!urlData || !urlData.publicUrl) {
      throw new Error('Failed to get public URL');
    }

    console.log('🔗 Public URL:', urlData.publicUrl);
    return urlData.publicUrl;
  } catch (error: any) {
    console.error('❌ Error uploading image from URL:', error);
    console.error('Error details:', error.message);
    throw error;
  }
}

/**
 * Upload base64 image lên Supabase Storage
 * @param base64String - Chuỗi base64 của ảnh
 * @param folder - Thư mục lưu trữ
 * @returns URL công khai của ảnh
 */
export async function uploadBase64ToSupabase(base64String: string, folder: string = 'uploads'): Promise<string> {
  try {
    // Convert base64 to blob
    const base64Data = base64String.split(',')[1];
    const mimeType = base64String.split(';')[0].split(':')[1];
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });

    // Tạo File object
    const fileExt = mimeType.split('/')[1];
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
    
    console.log(`📤 Uploading to Supabase Storage: ${fileName}`);
    
    // Upload
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, blob, {
        contentType: mimeType,
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('❌ Upload error:', error);
      throw new Error(`Upload failed: ${error.message}`);
    }

    console.log('✅ Upload successful:', data);

    // Lấy URL công khai
    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileName);

    if (!urlData || !urlData.publicUrl) {
      throw new Error('Failed to get public URL');
    }

    console.log('🔗 Public URL:', urlData.publicUrl);
    return urlData.publicUrl;
  } catch (error: any) {
    console.error('❌ Error uploading base64 to Supabase Storage:', error);
    console.error('Error details:', error.message);
    throw error;
  }
}
