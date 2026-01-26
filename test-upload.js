// Test script để kiểm tra upload
import fs from 'fs';
import fetch from 'node-fetch';

// Tạo fake base64 image nhỏ
const fakeBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

async function testUpload() {
  console.log('🧪 Testing Cloudinary upload...\n');
  
  try {
    const response = await fetch('http://localhost:3333/api/cloudinary/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: fakeBase64,
        folder: 'test'
      })
    });

    const data = await response.json();
    console.log('📦 Response status:', response.status);
    console.log('📦 Response data:', JSON.stringify(data, null, 2));

    if (response.ok && data.success) {
      console.log('\n✅ Upload successful!');
      console.log('URL:', data.url);
    } else {
      console.log('\n❌ Upload failed!');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testUpload();
