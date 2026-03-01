-- Supabase Schema for TypeApp

-- 1. test_results table
CREATE TABLE test_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    duration_seconds INTEGER NOT NULL,
    gross_wpm INTEGER NOT NULL,
    net_wpm INTEGER NOT NULL,
    accuracy NUMERIC NOT NULL,
    errors INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own test results"
    ON test_results FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own test results"
    ON test_results FOR SELECT
    USING (auth.uid() = user_id);

-- 2. lesson_progress table
CREATE TABLE lesson_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    lesson_id TEXT NOT NULL,
    best_wpm INTEGER,
    best_accuracy NUMERIC,
    completed BOOLEAN DEFAULT false,
    completed_tasks INTEGER[] DEFAULT '{}'::INTEGER[],
    task_scores JSONB DEFAULT '{}'::JSONB,
    completed_at TIMESTAMP WITH TIME ZONE,
    -- Prevent duplicate rows for the same user and lesson
    UNIQUE(user_id, lesson_id)
);

ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own lesson progress"
    ON lesson_progress FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own lesson progress"
    ON lesson_progress FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own lesson progress"
    ON lesson_progress FOR UPDATE
    USING (auth.uid() = user_id);

-- 3. certificates table
CREATE TABLE certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    certificate_code TEXT UNIQUE NOT NULL,
    net_wpm INTEGER NOT NULL,
    accuracy NUMERIC NOT NULL,
    duration_seconds INTEGER NOT NULL,
    issued_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own certificates"
    ON certificates FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own certificates"
    ON certificates FOR SELECT
    USING (auth.uid() = user_id);
