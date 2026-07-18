// ============================================================
// CHORUS SELECTION
// Depends on: state.js, utils.js, spreadsheet.js
// ============================================================

/** Render the chorus-selection screen and populate the list. */
async function showChorusSelection() {
  showSection('chorus-section');
  const listEl = document.getElementById('chorus-list');
  listEl.innerHTML = '<div class="loading-inline">Loading…</div>';

  const { data: choruses, error } = await db
    .from('choruses')
    .select('*')
    .order('name');

  if (error || !choruses || choruses.length === 0) {
    listEl.innerHTML = '<p class="error-text">No choruses found. Ask an admin to add one in the database.</p>';
    return;
  }

  listEl.innerHTML = '';
  choruses.forEach(chorus => {
    const btn       = document.createElement('button');
    btn.textContent = chorus.name;
    btn.className   = 'chorus-btn';
    if (currentProfile && currentProfile.chorus_id === chorus.id) {
      btn.classList.add('active');
    }
    btn.addEventListener('click', () => selectChorus(chorus.id, chorus.name));
    listEl.appendChild(btn);
  });
}

/** Persist the user's chosen chorus and proceed to the main app. */
async function selectChorus(chorusId, chorusName) {
  document.getElementById('chorus-error').textContent = '';

  const { error } = await db
    .from('profiles')
    .update({ chorus_id: chorusId })
    .eq('id', currentUser.id);

  if (error) {
    document.getElementById('chorus-error').textContent = error.message;
    return;
  }

  currentProfile.chorus_id   = chorusId;
  currentProfile.chorus_name = chorusName;
  await loadApp();
}

/** Header button — return to chorus selection. */
async function handleChangeChorus() {
  await showChorusSelection();
}
