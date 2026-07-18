// ============================================================
// CONFIGURATION
// Supabase project credentials — get from:
// Project Settings → API in your Supabase dashboard
// ============================================================
const SUPABASE_URL     = 'https://rxgeswcvzhglusggadzw.supabase.co/';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4Z2Vzd2N2emhnbHVzZ2dhZHp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ0MDQzOTYsImV4cCI6MjA5OTk4MDM5Nn0.YwAzsSNm_9w705p-ReHg6fY0Un5t3d3C7k6Kf7TYTxQ';

// ============================================================
// SONGS
// ============================================================
const SONGS = [
  "Heart of My Heart",
  "Down Our Way",
  "Let Me Call You Sweetheart",
  "Sweet Roses of Morn",
  "My Wild Irish Rose",
  "You Tell Me Your Dream",
  "Sweet and Lovely",
  "Sweet Adeline",
  "Down By The Old Mill Stream",
  "Wait Till the Sun Shines Nellie"
];

// ============================================================
// PARTS
// Each part has a key (matches DB values), a display label, and a color
// ============================================================
const PARTS = [
  { key: 'bass',     label: 'Bass',     color: '#3b82f6' }, // blue
  { key: 'baritone', label: 'Baritone', color: '#22c55e' }, // green
  { key: 'lead',     label: 'Lead',     color: '#ef4444' }, // red
  { key: 'tenor',    label: 'Tenor',    color: '#eab308' }, // yellow
];

// Star layout per active-part count:
// 1 → single centered, 2 → side by side, 3 → triangle, 4 → square
const STAR_ROW_SIZES = { 1: [1], 2: [2], 3: [2, 1], 4: [2, 2] };
