-- ================================================================
-- Song Completion Tracker — Supabase Database Setup
-- ================================================================
-- Instructions:
--   1. Create a free account at https://supabase.com
--   2. Create a new project (choose any region, set a strong DB password)
--   3. Open Database > SQL Editor and paste + run this entire file
--   4. Go to Project Settings > API to copy your URL and anon key
--   5. Paste them into app.js (SUPABASE_URL and SUPABASE_ANON_KEY)
--
-- Optional but recommended:
--   In Authentication > Settings, disable "Enable email confirmations"
--   so members can log in immediately after registering without
--   needing to click a confirmation email.
-- ================================================================


-- ----------------------------------------------------------------
-- TABLES
-- ----------------------------------------------------------------

-- Choruses (groups of singers)
CREATE TABLE public.choruses (
    id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name       TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Singer profiles (one per auth user)
CREATE TABLE public.profiles (
    id           UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    display_name TEXT NOT NULL,
    chorus_id    UUID REFERENCES public.choruses(id),
    created_at   TIMESTAMPTZ DEFAULT now()
);

-- Song progress (one row per singer × song × part)
CREATE TABLE public.song_progress (
    id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id    UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    song_name  TEXT NOT NULL,
    part       TEXT NOT NULL CHECK (part IN ('bass', 'baritone', 'lead', 'tenor')),
    status     TEXT NOT NULL CHECK (status IN ('learning', 'complete')),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE (user_id, song_name, part)
);

-- Auto-update updated_at on changes
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER song_progress_updated_at
  BEFORE UPDATE ON public.song_progress
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


-- ----------------------------------------------------------------
-- AUTO-CREATE PROFILE ON SIGNUP
-- When a user registers, Supabase inserts a row in auth.users.
-- This trigger automatically creates their profile row using the
-- display_name passed from the registration form.
-- ----------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (
    NEW.id,
    COALESCE(
      NEW.raw_user_meta_data->>'display_name',
      split_part(NEW.email, '@', 1)   -- fallback: use email prefix
    )
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ----------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS)
-- All tables are locked down; policies grant minimum necessary access.
-- ----------------------------------------------------------------

ALTER TABLE public.choruses      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.song_progress ENABLE ROW LEVEL SECURITY;

-- Choruses: any authenticated user can read (needed for chorus selection screen)
CREATE POLICY "auth_read_choruses"
    ON public.choruses FOR SELECT
    USING (auth.uid() IS NOT NULL);

-- Profiles: any authenticated user can read all profiles
-- (chorus filtering is handled in the app)
CREATE POLICY "auth_read_profiles"
    ON public.profiles FOR SELECT
    USING (auth.uid() IS NOT NULL);

-- Profiles: each user can insert and update only their own row
CREATE POLICY "own_insert_profile"
    ON public.profiles FOR INSERT
    WITH CHECK (id = auth.uid());

CREATE POLICY "own_update_profile"
    ON public.profiles FOR UPDATE
    USING (id = auth.uid());

-- Song progress: any authenticated user can read all progress
CREATE POLICY "auth_read_progress"
    ON public.song_progress FOR SELECT
    USING (auth.uid() IS NOT NULL);

-- Song progress: each user can only insert / delete their own rows
CREATE POLICY "own_insert_progress"
    ON public.song_progress FOR INSERT
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "own_delete_progress"
    ON public.song_progress FOR DELETE
    USING (user_id = auth.uid());


-- ----------------------------------------------------------------
-- SEED DATA — Add/rename choruses as needed
-- ----------------------------------------------------------------

INSERT INTO public.choruses (name) VALUES
    ('Main Chorus');

-- Add more choruses by uncommenting and editing:
-- INSERT INTO public.choruses (name) VALUES ('Harmony Chorus');
-- INSERT INTO public.choruses (name) VALUES ('Guest Chorus');
