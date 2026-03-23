-- Add admin flag for dashboard access (run on existing projects that already have profiles)
ALTER TABLE profiles
    ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false NOT NULL;
