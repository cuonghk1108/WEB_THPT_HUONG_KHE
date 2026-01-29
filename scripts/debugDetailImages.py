#!/usr/bin/env python3
"""Debug script - Check all fields in detail"""

import os
import requests
import json

SUPABASE_URL = os.getenv('VITE_SUPABASE_URL', 'https://vicqpnikodxcncyappes.supabase.co')
SUPABASE_KEY = os.getenv('VITE_SUPABASE_ANON_KEY', 'sb_publishable_fK57P65tAO6kGiszBHq3gA_fOWvSKR4')

def get_first_item(table_name):
    """Get first item with all details"""
    url = f'{SUPABASE_URL}/rest/v1/{table_name}?limit=1'
    headers = {
        'apikey': SUPABASE_KEY,
        'Authorization': f'Bearer {SUPABASE_KEY}'
    }
    
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        data = response.json()
        if data:
            return data[0]
    return None

print('📋 Full data dump:\n')

# News
news = get_first_item('news')
if news:
    print('NEWS:')
    print(json.dumps(news, indent=2, ensure_ascii=False))

print('\n' + '='*80 + '\n')

# Teachers  
teacher = get_first_item('teachers')
if teacher:
    print('TEACHERS:')
    print(json.dumps(teacher, indent=2, ensure_ascii=False))

print('\n' + '='*80 + '\n')

# Check sync script logic
print('SYNC LOGIC CHECK:')
print(f'news[images] value would be: "{news.get("images", "MISSING")}"')
print(f'Expected imageUrl from sync: Image URL from backup')
print(f'Teacher image_url: "{teacher.get("image_url", "MISSING")}"')
