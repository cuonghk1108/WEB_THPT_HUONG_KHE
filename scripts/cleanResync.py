#!/usr/bin/env python3
"""Clear old data and sync fresh from backup"""

import json
import os
import requests
from pathlib import Path

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
            'Content-Type': 'application/json'
        }
    
    def delete_all_from_table(self, table_name):
        """Delete all records from table"""
        api_url = f'{self.url}/rest/v1/{table_name}'
        try:
            response = requests.delete(
                api_url,
                headers=self.headers,
                timeout=10
            )
            print(f'  Delete {table_name}: {response.status_code}')
            return response.status_code in [200, 204]
        except Exception as e:
            print(f'  Error deleting {table_name}: {e}')
            return False
    
    def insert_record(self, table_name, data):
        """Insert single record"""
        api_url = f'{self.url}/rest/v1/{table_name}'
        try:
            response = requests.post(
                api_url,
                json=data,
                headers=self.headers,
                timeout=10
            )
            return response.status_code in [200, 201]
        except Exception as e:
            print(f'  Error inserting: {e}')
            return False

def main():
    print('🗑️  Clearing old data and re-syncing...\n')
    
    # Load backup
    with open(BACKUP_FILE, 'r', encoding='utf-8-sig') as f:
        backup_data = json.load(f)
    
    sync = SupabaseSync(SUPABASE_URL, SUPABASE_KEY)
    
    # Delete and re-insert news
    print('📰 Clearing News...')
    sync.delete_all_from_table('news')
    
    print('📰 Re-inserting News with images...')
    for news in backup_data.get('news', []):
        record = {
            'id': f"news-{news.get('id', 0)}",
            'title': news.get('title', ''),
            'excerpt': news.get('excerpt', ''),
            'content': news.get('content', ''),
            'images': news.get('imageUrl', ''),  # Direct URL string
            'category': news.get('category', ''),
            'author': 'Imported'
        }
        if sync.insert_record('news', record):
            print(f'  ✅ {record["title"][:40]}...')
        else:
            print(f'  ❌ Failed: {record["title"][:40]}...')
    
    # Delete and re-insert teachers
    print('\n👨‍🏫 Clearing Teachers...')
    sync.delete_all_from_table('teachers')
    
    print('👨‍🏫 Re-inserting Teachers with images...')
    for teacher in backup_data.get('teachers', []):
        record = {
            'id': f"teacher-{teacher.get('id', 0)}",
            'name': teacher.get('name', ''),
            'subject': teacher.get('subject', ''),
            'image_url': teacher.get('imageUrl', ''),  # Direct URL
            'bio': teacher.get('bio', ''),
            'email': teacher.get('email', ''),
            'phone': teacher.get('phone', '')
        }
        if sync.insert_record('teachers', record):
            print(f'  ✅ {record["name"]}')
        else:
            print(f'  ❌ Failed: {record["name"]}')
    
    # Delete and re-insert clubs
    print('\n🎭 Clearing Clubs...')
    sync.delete_all_from_table('clubs')
    
    print('🎭 Re-inserting Clubs with images...')
    for club in backup_data.get('clubs', []):
        record = {
            'id': f"club-{club.get('id', 0)}",
            'name': club.get('name', ''),
            'description': club.get('description', ''),
            'image_url': club.get('imageUrl', ''),
            'members': club.get('members', 0),
            'leader': club.get('advisor', '')
        }
        if sync.insert_record('clubs', record):
            print(f'  ✅ {record["name"]}')
        else:
            print(f'  ❌ Failed: {record["name"]}')
    
    # Delete and re-insert gallery
    print('\n🖼️  Clearing Gallery...')
    sync.delete_all_from_table('gallery')
    
    print('🖼️  Re-inserting Gallery with images...')
    for item in backup_data.get('gallery', []):
        record = {
            'id': f"gallery-{item.get('id', 0)}",
            'title': item.get('title', ''),
            'image_url': item.get('imageUrl', ''),
            'category': item.get('category', ''),
            'description': ''
        }
        if sync.insert_record('gallery', record):
            print(f'  ✅ {record["title"]}')
        else:
            print(f'  ❌ Failed: {record["title"]}')
    
    print('\n✅ Re-sync complete!')

if __name__ == '__main__':
    main()
