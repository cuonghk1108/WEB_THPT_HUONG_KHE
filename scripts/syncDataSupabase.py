#!/usr/bin/env python3
"""
Sync Data to Supabase from backup JSON
Usage: python scripts/syncDataSupabase.py
"""

import json
import os
import requests
from pathlib import Path
from datetime import datetime

# Configuration
SUPABASE_URL = os.getenv('VITE_SUPABASE_URL', 'https://vicqpnikodxcncyappes.supabase.co')
SUPABASE_KEY = os.getenv('VITE_SUPABASE_ANON_KEY', 'sb_publishable_fK57P65tAO6kGiszBHq3gA_fOWvSKR4')
BACKUP_FILE = Path(__file__).parent.parent / 'backup-jsonbin-2026-01-27-003104.json'

class SupabaseSync:
    def __init__(self, url, key):
        self.url = url
        self.key = key
        self.headers = {
            'apikey': key,
            'Authorization': f'Bearer {key}',
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
        }
    
    def sync_to_table(self, table_name, data, mode='insert'):
        """Sync data to Supabase table"""
        if not data:
            return []
        
        api_url = f'{self.url}/rest/v1/{table_name}'
        results = []
        
        for item in data:
            try:
                # Use POST for insert with on_conflict header for upsert
                headers = self.headers.copy()
                headers['Prefer'] = 'resolution=merge-duplicates'
                
                response = requests.post(
                    api_url,
                    json=item,
                    headers=headers,
                    timeout=10
                )
                
                if response.status_code in [200, 201]:
                    results.append({'ok': True, 'item': item})
                elif response.status_code == 409:
                    # Duplicate key - try to update instead
                    try:
                        update_response = requests.patch(
                            f'{api_url}?id=eq.{item.get("id")}',
                            json=item,
                            headers={
                                'apikey': self.key,
                                'Authorization': f'Bearer {self.key}',
                                'Content-Type': 'application/json'
                            },
                            timeout=10
                        )
                        if update_response.status_code in [200, 204]:
                            results.append({'ok': True, 'item': item})
                        else:
                            results.append({'ok': False, 'item': item, 'error': f'Duplicate + update failed'})
                    except Exception as e:
                        results.append({'ok': False, 'item': item, 'error': f'Update error: {str(e)}'})
                else:
                    results.append({
                        'ok': False,
                        'item': item,
                        'error': f'HTTP {response.status_code}: {response.text[:100]}'
                    })
            except Exception as e:
                results.append({'ok': False, 'item': item, 'error': str(e)})
        
        return results

def convert_date(date_str):
    """Convert DD/MM/YYYY to YYYY-MM-DD"""
    if not date_str or '-' in date_str:
        return date_str or datetime.now().isoformat()
    try:
        parts = date_str.split('/')
        if len(parts) == 3:
            day, month, year = parts
            return f"{year}-{month}-{day}"
    except:
        pass
    return datetime.now().isoformat()

async def main():
    print('🔄 Starting data sync to Supabase...\n')
    
    # Load backup
    try:
        with open(BACKUP_FILE, 'r', encoding='utf-8-sig') as f:
            backup_data = json.load(f)
        print(f'✅ Loaded backup file: {BACKUP_FILE}\n')
    except Exception as e:
        print(f'❌ Error loading backup: {e}')
        return
    
    sync = SupabaseSync(SUPABASE_URL, SUPABASE_KEY)
    now = datetime.now().isoformat()
    
    # 1. Sync News
    if backup_data.get('news'):
        print('📰 Syncing News...')
        news_records = []
        for news in backup_data['news']:
            record = {
                'id': f"news-{news.get('id', 0)}",
                'title': news.get('title', ''),
                'excerpt': news.get('excerpt', ''),
                'content': news.get('content', ''),
                'date': convert_date(news.get('date', '')),
                'images': news.get('imageUrl', ''),
                'category': news.get('category', ''),
                'author': 'Imported'
            }
            news_records.append(record)
        
        results = sync.sync_to_table('news', news_records)
        success_count = sum(1 for r in results if r['ok'])
        print(f'  ✅ Synced {success_count}/{len(results)} news items')
        for r in results:
            if not r['ok']:
                print(f'    ⚠️ Error: {r.get("error", "Unknown")}')
        print()
    
    # 2. Sync Teachers
    if backup_data.get('teachers'):
        print('👨‍🏫 Syncing Teachers...')
        teacher_records = []
        for teacher in backup_data['teachers']:
            record = {
                'id': f"teacher-{teacher.get('id', 0)}",
                'name': teacher.get('name', ''),
                'subject': teacher.get('subject', ''),
                'image_url': teacher.get('imageUrl', ''),
                'bio': teacher.get('bio', ''),
                'email': teacher.get('email', ''),
                'phone': teacher.get('phone', '')
            }
            teacher_records.append(record)
        
        results = sync.sync_to_table('teachers', teacher_records)
        success_count = sum(1 for r in results if r['ok'])
        print(f'  ✅ Synced {success_count}/{len(results)} teachers')
        for r in results:
            if not r['ok']:
                print(f'    ⚠️ Error: {r.get("error", "Unknown")}')
        print()
    
    # 3. Sync Clubs
    if backup_data.get('clubs'):
        print('🎭 Syncing Clubs...')
        club_records = []
        for club in backup_data['clubs']:
            record = {
                'id': f"club-{club.get('id', 0)}",
                'name': club.get('name', ''),
                'description': club.get('description', ''),
                'image_url': club.get('imageUrl', ''),
                'members': club.get('members', 0),
                'leader': club.get('advisor', '')
            }
            club_records.append(record)
        
        results = sync.sync_to_table('clubs', club_records)
        success_count = sum(1 for r in results if r['ok'])
        print(f'  ✅ Synced {success_count}/{len(results)} clubs')
        for r in results:
            if not r['ok']:
                print(f'    ⚠️ Error: {r.get("error", "Unknown")}')
        print()
    
    # 4. Sync Gallery
    if backup_data.get('gallery'):
        print('🖼️ Syncing Gallery...')
        gallery_records = []
        for item in backup_data['gallery']:
            record = {
                'id': f"gallery-{item.get('id', 0)}",
                'title': item.get('title', ''),
                'image_url': item.get('imageUrl', ''),
                'category': item.get('category', ''),
                'description': ''
            }
            gallery_records.append(record)
        
        results = sync.sync_to_table('gallery', gallery_records)
        success_count = sum(1 for r in results if r['ok'])
        print(f'  ✅ Synced {success_count}/{len(results)} gallery items')
        for r in results:
            if not r['ok']:
                print(f'    ⚠️ Error: {r.get("error", "Unknown")}')
        print()
    
    # 5. Sync Events
    if backup_data.get('events'):
        print('📅 Syncing Events...')
        event_records = []
        for event in backup_data['events']:
            record = {
                'id': f"event-{event.get('id', 0)}",
                'title': event.get('title', ''),
                'description': event.get('description', ''),
                'date': convert_date(event.get('date', '')),
                'location': event.get('location', ''),
                'image_url': event.get('imageUrl', '')
            }
            event_records.append(record)
        
        results = sync.sync_to_table('events', event_records)
        success_count = sum(1 for r in results if r['ok'])
        print(f'  ✅ Synced {success_count}/{len(results)} events')
        for r in results:
            if not r['ok']:
                print(f'    ⚠️ Error: {r.get("error", "Unknown")}')
        print()
    
    # Summary
    print('✅ Data sync completed!')
    print('\n📊 Final Summary:')
    print(f'  - News: {len(backup_data.get("news", []))} items')
    print(f'  - Teachers: {len(backup_data.get("teachers", []))} items')
    print(f'  - Clubs: {len(backup_data.get("clubs", []))} items')
    print(f'  - Gallery: {len(backup_data.get("gallery", []))} items')
    print(f'  - Events: {len(backup_data.get("events", []))} items')
    print('\n🔗 View your site: https://thpthuongkhe.vercel.app')

if __name__ == '__main__':
    import asyncio
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print('\n⚠️ Sync cancelled by user')
