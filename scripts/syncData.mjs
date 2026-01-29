#!/usr/bin/env node

/**
 * Sync Data to Supabase - Simple version
 * Reads backup JSON and updates Supabase via REST API
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://vicqpnikodxcncyappes.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_fK57P65tAO6kGiszBHq3gA_fOWvSKR4';
const BACKUP_FILE = path.join(__dirname, '../backup-jsonbin-2026-01-27-003104.json');

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

// Helper function to make API requests to Supabase
async function supabaseApi(table, method, data) {
  const url = `${SUPABASE_URL}/rest/v1/${table}`;
  const options = {
    method,
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': method === 'POST' ? 'return=representation' : 'return=minimal'
    }
  };

  if (data) {
    options.body = JSON.stringify(Array.isArray(data) ? data : [data]);
  }

  try {
    const response = await fetch(url, options);
    const text = await response.text();
    
    if (!response.ok) {
      console.error(`  ❌ API Error (${response.status}):`, text);
      return null;
    }
    
    return { ok: true, status: response.status };
  } catch (error) {
    console.error(`  ❌ Network Error:`, error.message);
    return null;
  }
}

async function syncData() {
  console.log('🔄 Starting data sync to Supabase...\n');

  try {
    // Load backup data
    const backupJson = fs.readFileSync(BACKUP_FILE, 'utf-8');
    const backupData = JSON.parse(backupJson);

    // 1. Sync News
    if (backupData.news && Array.isArray(backupData.news)) {
      console.log('📰 Syncing News...');
      for (const newsItem of backupData.news) {
        const record = {
          id: `news-${newsItem.id}`,
          title: newsItem.title,
          excerpt: newsItem.excerpt,
          content: newsItem.content,
          date: newsItem.date,
          image: newsItem.imageUrl,
          category: newsItem.category,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        const result = await supabaseApi('news', 'POST', record);
        if (result) {
          console.log(`  ✅ Synced news: "${newsItem.title.substring(0, 50)}..."`);
        }
      }
      console.log();
    }

    // 2. Sync Teachers
    if (backupData.teachers && Array.isArray(backupData.teachers)) {
      console.log('👨‍🏫 Syncing Teachers...');
      for (const teacher of backupData.teachers) {
        const record = {
          id: `teacher-${teacher.id}`,
          name: teacher.name,
          subject: teacher.subject,
          image: teacher.imageUrl,
          bio: teacher.bio || '',
          email: teacher.email || '',
          phone: teacher.phone || '',
          position: teacher.position || '',
          department: teacher.department || '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        const result = await supabaseApi('teachers', 'POST', record);
        if (result) {
          console.log(`  ✅ Synced teacher: ${teacher.name}`);
        }
      }
      console.log();
    }

    // 3. Sync Clubs
    if (backupData.clubs && Array.isArray(backupData.clubs)) {
      console.log('🎭 Syncing Clubs...');
      for (const club of backupData.clubs) {
        const record = {
          id: `club-${club.id}`,
          name: club.name,
          description: club.description,
          image: club.imageUrl,
          members: club.members || 0,
          advisor: club.advisor || '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        const result = await supabaseApi('clubs', 'POST', record);
        if (result) {
          console.log(`  ✅ Synced club: ${club.name}`);
        }
      }
      console.log();
    }

    // 4. Sync Gallery
    if (backupData.gallery && Array.isArray(backupData.gallery)) {
      console.log('🖼️ Syncing Gallery...');
      for (const item of backupData.gallery) {
        const record = {
          id: `gallery-${item.id}`,
          title: item.title,
          image: item.imageUrl,
          category: item.category,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        const result = await supabaseApi('gallery', 'POST', record);
        if (result) {
          console.log(`  ✅ Synced gallery: ${item.title}`);
        }
      }
      console.log();
    }

    // 5. Sync Events
    if (backupData.events && Array.isArray(backupData.events)) {
      console.log('📅 Syncing Events...');
      for (const event of backupData.events) {
        const record = {
          id: `event-${event.id}`,
          title: event.title,
          description: event.description,
          date: event.date,
          time: event.time || '',
          location: event.location || '',
          image: event.imageUrl,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        const result = await supabaseApi('events', 'POST', record);
        if (result) {
          console.log(`  ✅ Synced event: ${event.title}`);
        }
      }
      console.log();
    }

    console.log('✅ Data sync completed!\n');
    console.log('📊 Summary:');
    console.log(`  - News: ${backupData.news?.length || 0} items`);
    console.log(`  - Teachers: ${backupData.teachers?.length || 0} items`);
    console.log(`  - Clubs: ${backupData.clubs?.length || 0} items`);
    console.log(`  - Gallery: ${backupData.gallery?.length || 0} items`);
    console.log(`  - Events: ${backupData.events?.length || 0} items`);

  } catch (error) {
    console.error('❌ Fatal error:', error.message);
    process.exit(1);
  }
}

// Run sync
syncData();
