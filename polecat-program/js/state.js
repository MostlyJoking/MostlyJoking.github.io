// ============================================================
// SHARED APPLICATION STATE
// All mutable values shared across modules live here.
// Scripts that read or write these must load after this file.
// ============================================================

let db             = null;  // Supabase client instance (set in auth.js init)
let currentUser    = null;  // Supabase auth user object
let currentProfile = null;  // Row from public.profiles for the logged-in user
let allProfiles    = [];    // All profiles in the current chorus
let allProgress    = [];    // All song_progress rows for the current chorus
let editState      = { songName: null, parts: {} }; // Active modal edit state
