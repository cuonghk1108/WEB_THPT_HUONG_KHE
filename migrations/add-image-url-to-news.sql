-- Add image_url column to news table for better image handling
ALTER TABLE news ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Update news table with image_url from existing data
-- If you have image URLs stored in images JSONB, you can migrate them:
-- UPDATE news SET image_url = images->0->>'url' WHERE images IS NOT NULL;
