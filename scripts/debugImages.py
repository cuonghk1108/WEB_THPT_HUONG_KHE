#!/usr/bin/env python3
"""Debug script - Check image URLs in Supabase"""

import os
import json
import requests
from datetime import datetime

SUPABASE_URL = os.getenv('VITE_SUPABASE_URL', 'https://vicqpnikodxcncyappes.supabase.co')
SUPABASE_KEY = os.getenv('VITE_SUPABASE_ANON_KEY', 'sb_publishable_fK57P65tAO6kGiszBHq3gA_fOWvSKR4')

def check_table(table_name):
    """Check data in a specific table"""
    url = f'{SUPABASE_URL}/rest/v1/{table_name}?limit=1'
    headers = {
        'apikey': SUPABASE_KEY,
        'Authorization': f'Bearer {SUPABASE_KEY}'
    }
    
    try:
        response = requests.get(url, headers=headers, timeout=10)
        if response.status_code == 200:
            data = response.json()
            print(f'\n📊 Table: {table_name}')
            if data:
                item = data[0]
                print(f'Sample item keys: {list(item.keys())}')
                
                # Check image fields
                if 'image_url' in item:
                    print(f'  ✓ image_url: {item["image_url"][:50] if item["image_url"] else "NULL"}...')
                if 'images' in item:
                    images_val = item['images']
                    if images_val:
                        print(f'  ✓ images: {str(images_val)[:50]}...')
                        print(f'    Type: {type(images_val)}')
                if 'imageUrl' in item:
                    print(f'  ✓ imageUrl: {item["imageUrl"][:50] if item["imageUrl"] else "NULL"}...')
                
                print(f'  Total rows: {len(data)}')
                return item
            else:
                print(f'  Empty table')
        else:
            print(f'  ❌ Error: {response.status_code} - {response.text[:200]}')
    except Exception as e:
        print(f'  ❌ Exception: {e}')
    
    return None

print('🔍 Checking Supabase data format...\n')
check_table('news')
check_table('teachers')
check_table('clubs')
check_table('gallery')

print('\n✅ Debug complete!')
