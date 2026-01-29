/**
 * Sync Data Script - Đồng bộ dữ liệu từ backup JSON vào Supabase
 * Usage: node scripts/syncData.js
 */

const fs = require('fs');
const path = require('path');

// Import Supabase client
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://vicqpnikodxcncyappes.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_fK57P65tAO6kGiszBHq3gA_fOWvSKR4';

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Load backup data
const backupFile = path.join(__dirname, '../backup-jsonbin-2026-01-27-003104.json');
const backupData = JSON.parse(fs.readFileSync(backupFile, 'utf-8'));

async function syncData() {
  console.log('🔄 Starting data sync to Supabase...\n');

  try {
    // 1. Sync News
    if (backupData.news && Array.isArray(backupData.news)) {
      console.log('📰 Syncing News...');
      for (const newsItem of backupData.news) {
        try {
          const { error } = await supabase
            .from('news')
            .upsert({
              id: `news-${newsItem.id}`,
              title: newsItem.title,
              excerpt: newsItem.excerpt,
              content: newsItem.content,
              date: newsItem.date,
              image: newsItem.imageUrl,
              category: newsItem.category,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }, { onConflict: 'id' });

          if (error) {
            console.error(`  ❌ Error syncing news ${newsItem.id}:`, error.message);
          } else {
            console.log(`  ✅ Synced news: "${newsItem.title.substring(0, 50)}..."`);
          }
        } catch (err) {
          console.error(`  ❌ Exception syncing news ${newsItem.id}:`, err.message);
        }
      }
      console.log();
    }

    // 2. Sync Teachers
    if (backupData.teachers && Array.isArray(backupData.teachers)) {
      console.log('👨‍🏫 Syncing Teachers...');
      for (const teacher of backupData.teachers) {
        try {
          const { error } = await supabase
            .from('teachers')
            .upsert({
              id: `teacher-${teacher.id}`,
              name: teacher.name,
              subject: teacher.subject,
              image: teacher.imageUrl,
              bio: teacher.bio || '',
              email: teacher.email || '',
              phone: teacher.phone || '',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }, { onConflict: 'id' });

          if (error) {
            console.error(`  ❌ Error syncing teacher ${teacher.id}:`, error.message);
          } else {
            console.log(`  ✅ Synced teacher: ${teacher.name}`);
          }
        } catch (err) {
          console.error(`  ❌ Exception syncing teacher ${teacher.id}:`, err.message);
        }
      }
      console.log();
    }

    // 3. Sync Clubs
    if (backupData.clubs && Array.isArray(backupData.clubs)) {
      console.log('🎭 Syncing Clubs...');
      for (const club of backupData.clubs) {
        try {
          const { error } = await supabase
            .from('clubs')
            .upsert({
              id: `club-${club.id}`,
              name: club.name,
              description: club.description,
              image: club.imageUrl,
              members: club.members || 0,
              advisor: club.advisor || '',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }, { onConflict: 'id' });

          if (error) {
            console.error(`  ❌ Error syncing club ${club.id}:`, error.message);
          } else {
            console.log(`  ✅ Synced club: ${club.name}`);
          }
        } catch (err) {
          console.error(`  ❌ Exception syncing club ${club.id}:`, err.message);
        }
      }
      console.log();
    }

    // 4. Sync Gallery
    if (backupData.gallery && Array.isArray(backupData.gallery)) {
      console.log('🖼️ Syncing Gallery...');
      for (const item of backupData.gallery) {
        try {
          const { error } = await supabase
            .from('gallery')
            .upsert({
              id: `gallery-${item.id}`,
              title: item.title,
              image: item.imageUrl,
              category: item.category,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }, { onConflict: 'id' });

          if (error) {
            console.error(`  ❌ Error syncing gallery ${item.id}:`, error.message);
          } else {
            console.log(`  ✅ Synced gallery: ${item.title}`);
          }
        } catch (err) {
          console.error(`  ❌ Exception syncing gallery ${item.id}:`, err.message);
        }
      }
      console.log();
    }

    // 5. Sync Events
    if (backupData.events && Array.isArray(backupData.events)) {
      console.log('📅 Syncing Events...');
      for (const event of backupData.events) {
        try {
          const { error } = await supabase
            .from('events')
            .upsert({
              id: `event-${event.id}`,
              title: event.title,
              description: event.description,
              date: event.date,
              time: event.time || '',
              location: event.location || '',
              image: event.imageUrl,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }, { onConflict: 'id' });

          if (error) {
            console.error(`  ❌ Error syncing event ${event.id}:`, error.message);
          } else {
            console.log(`  ✅ Synced event: ${event.title}`);
          }
        } catch (err) {
          console.error(`  ❌ Exception syncing event ${event.id}:`, err.message);
        }
      }
      console.log();
    }

    console.log('✅ Data sync completed successfully!\n');
    console.log('📊 Summary:');
    console.log(`  - News: ${backupData.news?.length || 0} items`);
    console.log(`  - Teachers: ${backupData.teachers?.length || 0} items`);
    console.log(`  - Clubs: ${backupData.clubs?.length || 0} items`);
    console.log(`  - Gallery: ${backupData.gallery?.length || 0} items`);
    console.log(`  - Events: ${backupData.events?.length || 0} items`);

  } catch (error) {
    console.error('❌ Fatal error during sync:', error);
    process.exit(1);
  }
}

// Run sync
syncData().catch(err => {
  console.error('❌ Sync failed:', err);
  process.exit(1);
});
