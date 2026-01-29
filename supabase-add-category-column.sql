-- Add category column to news table
ALTER TABLE news ADD COLUMN IF NOT EXISTS category VARCHAR(100);

-- Optional: Set default value for existing rows
UPDATE news SET category = 'Tin tức' WHERE category IS NULL;
