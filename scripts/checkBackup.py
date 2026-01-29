#!/usr/bin/env python3
"""
Sync Data to Supabase from backup JSON
"""

import json
import os
from pathlib import Path

# Configuration
SUPABASE_URL = os.getenv('VITE_SUPABASE_URL', 'https://vicqpnikodxcncyappes.supabase.co')
SUPABASE_KEY = os.getenv('VITE_SUPABASE_ANON_KEY', 'sb_publishable_fK57P65tAO6kGiszBHq3gA_fOWvSKR4')
BACKUP_FILE = Path(__file__).parent.parent / 'backup-jsonbin-2026-01-27-003104.json'

print(f"📖 Reading backup file: {BACKUP_FILE}")
print(f"📍 File exists: {BACKUP_FILE.exists()}\n")

# Read and parse backup
try:
    with open(BACKUP_FILE, 'r', encoding='utf-8-sig') as f:
        backup_data = json.load(f)
    print("✅ Backup file loaded successfully!\n")
except Exception as e:
    print(f"❌ Error reading backup file: {e}\n")
    exit(1)

# Summary
print('📊 Data Summary:')
print(f"  - News items: {len(backup_data.get('news', []))}")
print(f"  - Teachers: {len(backup_data.get('teachers', []))}")
print(f"  - Clubs: {len(backup_data.get('clubs', []))}")
print(f"  - Gallery items: {len(backup_data.get('gallery', []))}")
print(f"  - Events: {len(backup_data.get('events', []))}")
if 'achievements' in backup_data:
    print(f"  - Achievements: {len(backup_data.get('achievements', []))}")

# Display first news item as example
if backup_data.get('news'):
    print(f"\n📝 First news item:")
    news = backup_data['news'][0]
    print(f"  Title: {news.get('title', 'N/A')}")
    print(f"  Date: {news.get('date', 'N/A')}")
    print(f"  Category: {news.get('category', 'N/A')}")
    print(f"  Image URL: {news.get('imageUrl', 'N/A')}")
