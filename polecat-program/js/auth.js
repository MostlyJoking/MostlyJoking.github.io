// ============================================================
// AUTH — Initialization, Login, Register, Logout
// Depends on: config.js, state.js, utils.js, chorus.js, spreadsheet.js
// ============================================================

window.addEventListener('DOMContentLoaded', async () => {
  if (SUPABASE_URL === 'https://your-project-id.supabase.co') {
    document.getElementById('config-warning').classList.remove('hidden');
    return;
  }

  db = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // Close the edit modal on Escape
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // Check for an existing session on page load
  const { data: { session } } = await db.auth.getSession();
  if (session) {
    await afterLogin(session.user);
  } else {
    showSection('auth-section');
  }

  // Handle login / logout events (also covers email-confirmation redirects)
  db.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' && !currentUser) {
      await afterLogin(session.user);
    } else if (event === 'SIGNED_OUT') {
      currentUser    = null;
      currentProfile = null;
      showSection('auth-section');
    }
  });
});

/** Called after a successful sign-in. Loads the user's profile and routes them. */
async function afterLogin(user) {
  currentUser = user;

  // Retry once to allow for DB trigger propagation on brand-new registrations
  let profile = null;
  for (let attempt = 0; attempt < 2; attempt++) {
    const { data } = await db
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    if (data) { profile = data; break; }
    if (attempt === 0) await new Promise(r => setTimeout(r, 800));
  }

  if (!profile) {
    showSection('auth-section');
    document.getElementById('login-error').textContent =
      'Profile not found. Please try logging in again, or re-register.';
    await db.auth.signOut();
    return;
  }

  currentProfile = profile;
  if (!profile.chorus_id) {
    await showChorusSelection();
  } else {
    await loadApp();
  }
}

/** Switch between Login and Register tabs. */
function showTab(tab) {
  document.getElementById('login-form').classList.toggle('hidden', tab !== 'login');
  document.getElementById('register-form').classList.toggle('hidden', tab !== 'register');
  document.querySelectorAll('#auth-tabs .tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tab);
  });
  document.querySelectorAll('.error-text').forEach(el => (el.textContent = ''));
}

async function handleLogin(event) {
  event.preventDefault();
  const btn = document.getElementById('login-btn');
  btn.disabled    = true;
  btn.textContent = 'Logging in…';
  document.getElementById('login-error').textContent = '';

  const email    = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;

  const { error } = await db.auth.signInWithPassword({ email, password });
  if (error) {
    document.getElementById('login-error').textContent = error.message;
    btn.disabled    = false;
    btn.textContent = 'Login';
  }
  // On success, onAuthStateChange fires SIGNED_IN and calls afterLogin
}

async function handleRegister(event) {
  event.preventDefault();
  const btn = document.getElementById('register-btn');
  btn.disabled    = true;
  btn.textContent = 'Creating account…';
  document.getElementById('register-error').textContent = '';

  const name     = document.getElementById('reg-name').value.trim();
  const email    = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;

  const { data, error } = await db.auth.signUp({
    email,
    password,
    options: { data: { display_name: name } },
  });

  if (error) {
    document.getElementById('register-error').textContent = error.message;
    btn.disabled    = false;
    btn.textContent = 'Create Account';
    return;
  }

  if (!data.user) {
    document.getElementById('register-error').textContent = 'Registration failed. Please try again.';
    btn.disabled    = false;
    btn.textContent = 'Create Account';
    return;
  }

  if (data.session) {
    // Email confirmation is disabled — user is auto-signed in.
    // Upsert the profile in case the DB trigger hasn't fired yet.
    await db.from('profiles').upsert({ id: data.user.id, display_name: name });
    // onAuthStateChange SIGNED_IN will call afterLogin
  } else {
    // Email confirmation is enabled — show instructions
    document.getElementById('register-form').innerHTML =
      `<div class="success-msg">
        Account created! Please check your email to confirm your address,
        then come back and log in.
      </div>`;
  }
}

async function handleLogout() {
  await db.auth.signOut();
}
