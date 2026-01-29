#!/usr/bin/env python3
"""Simple sync - just insert/overwrite using IDs"""

import json
import os
import requests
from pathlib import Path

SUPABASE_URL = os.getenv('VITE_SUPABASE_URL', 'https://vicqpnikodxcncyappes.supabase.co')
SUPABASE_KEY = os.getenv('VITE_SUPABASE_ANON_KEY', 'sb_publishable_fK57P65tAO6kGiszBHq3gA_fOWvSKR4')
BACKUP_FILE = Path(__file__).parent.parent / 'backup-jsonbin-2026-01-27-003104.json'

def sync_item(table, data):
    """Insert or update using POST (will fail on duplicate) then PATCH to update"""
    url = f'{SUPABASE_URL}/rest/v1/{table}'
    headers = {
        'apikey': SUPABASE_KEY,
        'Authorization': f'Bearer {SUPABASE_KEY}',
        'Content-Type': 'application/json'
    }
    
    # Try POST first
    try:
        resp = requests.post(url, json=data, headers=headers, timeout=10)
        if resp.status_code in [200, 201]:
            return True
        elif resp.status_code == 409:  # Conflict - update instead
            # PATCH by id
            patch_url = f'{url}?id=eq.{data["id"]}'
            resp = requests.patch(patch_url, json=data, headers=headers, timeout=10)
            return resp.status_code in [200, 204]
    except Exception as e:
        print(f'Error: {e}')
    return False

print('🔄 Syncing data with image URLs...\n')

with open(BACKUP_FILE, 'r', encoding='utf-8-sig') as f:
    backup = json.load(f)

# Sync News
print('📰 Syncing News...')
for news in backup.get('news', []):
    data = {
        'id': f"news-{news.get('id', 0)}",
        'title': news.get('title', ''),
        'excerpt': news.get('excerpt', ''),
        'content': news.get('content', ''),
        'images': news.get('imageUrl', ''),  # IMPORTANT: Direct URL
        'category': news.get('category', ''),
        'author': 'Imported'
    }
    if sync_item('news', data):
        print(f'  ✅ {news.get("title", "")[:50]}')

# Sync Teachers
print('\n👨‍🏫 Syncing Teachers...')
for teacher in backup.get('teachers', []):
    data = {
        'id': f"teacher-{teacher.get('id', 0)}",
        'name': teacher.get('name', ''),
        'subject': teacher.get('subject', ''),
        'image_url': teacher.get('imageUrl', ''),  # IMPORTANT: Direct URL
        'bio': teacher.get('bio', ''),
        'email': teacher.get('email', ''),
        'phone': teacher.get('phone', '')
    }
    if sync_item('teachers', data):
        print(f'  ✅ {teacher.get("name", "")}')

# Sync Clubs
print('\n🎭 Syncing Clubs...')
for club in backup.get('clubs', []):
    data = {
        'id': f"club-{club.get('id', 0)}",
        'name': club.get('name', ''),
        'description': club.get('description', ''),
        'image_url': club.get('imageUrl', ''),  # IMPORTANT: Direct URL
        'members': club.get('members', 0),
        'leader': club.get('advisor', '')
    }
    if sync_item('clubs', data):
        print(f'  ✅ {club.get("name", "")}')

# Sync Gallery
print('\n🖼️  Syncing Gallery...')
for item in backup.get('gallery', []):
    data = {
        'id': f"gallery-{item.get('id', 0)}",
        'title': item.get('title', ''),
        'image_url': item.get('imageUrl', ''),  # IMPORTANT: Direct URL
        'category': item.get('category', '')
    }
    if sync_item('gallery', data):
        print(f'  ✅ {item.get("title", "")}')

print('\n✅ Sync complete!')
