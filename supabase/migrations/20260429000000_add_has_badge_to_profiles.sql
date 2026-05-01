-- Add badge purchase flag to profiles
-- Users who purchase the LinkedIn/GitHub badge add-on have this set to true
ALTER TABLE profiles
    ADD COLUMN IF NOT EXISTS has_badge BOOLEAN DEFAULT false NOT NULL;
