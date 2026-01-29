# Fix Supabase Storage - Images Not Displaying

## Issue
✅ Upload works (no 401 error)  
❌ Images don't display on client (other machines)

## Solution
The bucket might not have proper PUBLIC READ policies. Run these SQL commands in Supabase SQL Editor:

### Step 1: Go to Supabase Dashboard
1. Open: https://supabase.com/dashboard/project/vicqpnikodxcncyappes/sql/new
2. Create NEW query

### Step 2: Drop Old Policies (if they exist with wrong names)
```sql
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete" ON storage.objects;
```

### Step 3: Create NEW Policies with Correct Permissions
```sql
-- Allow PUBLIC READ (CRITICAL for displaying images)
CREATE POLICY "Allow public read" ON storage.objects
FOR SELECT USING (bucket_id = 'images');

-- Allow ANYONE to UPLOAD
CREATE POLICY "Allow anyone upload" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'images');

-- Allow AUTHENTICATED users to UPDATE
CREATE POLICY "Allow authenticated update" ON storage.objects
FOR UPDATE TO authenticated USING (bucket_id = 'images');

-- Allow AUTHENTICATED users to DELETE
CREATE POLICY "Allow authenticated delete" ON storage.objects
FOR DELETE TO authenticated USING (bucket_id = 'images');
```

### Step 4: Verify Bucket Settings
Go to: https://supabase.com/dashboard/project/vicqpnikodxcncyappes/storage/buckets

Check:
- ✅ Bucket name: `images`
- ✅ Visibility: `Public` (green toggle ON)
- ✅ File size limit: At least 10 MB

### Step 5: Test
1. Clear browser cache (Ctrl + Shift + Delete)
2. Go to: https://thpthuongkhe.vercel.app/admin/images
3. Upload 1 test image
4. Open DevTools (F12) → Console tab
5. Look for logs:
   - `📤 Uploading to Supabase Storage: ...`
   - `✅ Upload successful: ...`
   - `🔗 Public URL: https://vicqpnikodxcncyappes.supabase.co/storage/v1/object/public/images/...`

### Step 6: Check Public URL
Take the Public URL from console log and:
1. Open it in new browser tab
2. Should see the image OR download option
3. If 403/404, policies are wrong

### Step 7: If Still Not Working
Open Console (F12) → Network tab:
1. Upload image again
2. Look for failed requests with status 403 or 404
3. Check the response message
4. Share error message with me

## Common Issues

| Problem | Cause | Fix |
|---------|-------|-----|
| 403 Forbidden | Policies missing or wrong | Run all 4 SQL commands above |
| 404 Not Found | File not uploaded | Check upload console logs for errors |
| CORS Error | Bucket CORS not configured | Supabase handles this auto, check policies first |
| Image won't load on page | URL in database is wrong | Check console logs for actual URL used |

## Quick Checklist
- [ ] Dropped old policies
- [ ] Created 4 new policies (especially "Allow public read")
- [ ] Verified bucket is PUBLIC (green toggle)
- [ ] Cleared browser cache
- [ ] Tested with /admin/images
- [ ] Checked console logs for correct Public URL
- [ ] Tested direct access to Public URL in browser
