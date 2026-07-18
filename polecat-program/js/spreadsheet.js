// ============================================================
// SPREADSHEET — Data loading and table rendering
// Depends on: config.js, state.js, utils.js
// ============================================================

/** Show the main app section, update the header, and load the spreadsheet. */
async function loadApp() {
  showSection('app-section');

  const { data: chorus } = await db
    .from('choruses')
    .select('name')
    .eq('id', currentProfile.chorus_id)
    .single();

  document.getElementById('header-user-name').textContent   = currentProfile.display_name;
  document.getElementById('header-chorus-name').textContent = chorus?.name || '';

  await loadSpreadsheet();
}

/** Fetch all chorus members and their song progress, then render the table. */
async function loadSpreadsheet() {
  document.getElementById('loading-msg').classList.remove('hidden');
  document.getElementById('table-wrapper').classList.add('hidden');

  const { data: profiles, error: profileErr } = await db
    .from('profiles')
    .select('*')
    .eq('chorus_id', currentProfile.chorus_id)
    .order('display_name');

  if (profileErr) {
    document.getElementById('loading-msg').textContent =
      'Error loading data: ' + profileErr.message;
    return;
  }

  allProfiles = profiles || [];

  if (allProfiles.length > 0) {
    const userIds = allProfiles.map(p => p.id);
    const { data: progress } = await db
      .from('song_progress')
      .select('*')
      .in('user_id', userIds);
    allProgress = progress || [];
  } else {
    allProgress = [];
  }

  renderTable();
  document.getElementById('loading-msg').classList.add('hidden');
  document.getElementById('table-wrapper').classList.remove('hidden');
}

/** Build the full tracker table from cached allProfiles and allProgress. */
function renderTable() {
  const headerRow = document.getElementById('header-row');
  const tableBody = document.getElementById('table-body');

  // Header row
  headerRow.innerHTML = '<th class="name-col sticky-col">Singer</th>';
  SONGS.forEach(song => {
    const th      = document.createElement('th');
    th.className  = 'song-col';
    th.title      = song;
    th.innerHTML  = `<span class="song-header-text">${escHtml(song)}</span>`;
    headerRow.appendChild(th);
  });

  // Data rows
  tableBody.innerHTML = '';
  allProfiles.forEach(profile => {
    const isMe = profile.id === currentUser.id;
    const row  = document.createElement('tr');
    if (isMe) row.classList.add('my-row');

    // Name cell
    const nameCell   = document.createElement('td');
    nameCell.className = 'name-col sticky-col';
    nameCell.innerHTML =
      `<span class="singer-name">${escHtml(profile.display_name)}</span>` +
      (isMe ? ' <span class="you-badge">you</span>' : '');
    row.appendChild(nameCell);

    // One cell per song
    SONGS.forEach(song => {
      const cell = document.createElement('td');
      cell.className = 'song-cell';

      const cellProgress = allProgress.filter(
        p => p.user_id === profile.id && p.song_name === song
      );

      cell.appendChild(buildStarGrid(cellProgress));

      if (isMe) {
        cell.classList.add('editable');
        cell.title = `Edit — ${song}`;
        cell.addEventListener('click', () => openEditModal(song, cellProgress));
      }

      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });
}

/**
 * Build the star display for a single song cell.
 * Layout adapts to the number of active parts:
 *   1 → centered   2 → side by side   3 → triangle   4 → square
 */
function buildStarGrid(progressItems) {
  const gridEl = document.createElement('div');
  gridEl.className = 'star-grid';

  // Collect only active parts, preserving PARTS order
  const active = PARTS
    .map(part => progressItems.find(p => p.part === part.key))
    .filter(Boolean);

  const count = active.length;
  if (count === 0) return gridEl;

  const rowSizes = STAR_ROW_SIZES[count] || [count];
  let idx = 0;

  rowSizes.forEach(size => {
    const rowEl = document.createElement('div');
    rowEl.className = 'star-row';
    for (let i = 0; i < size; i++) {
      const item    = active[idx++];
      const partDef = PARTS.find(p => p.key === item.part);
      const span    = document.createElement('span');
      span.className   = `star ${item.status} ${item.part}`;
      span.textContent = item.status === 'complete' ? '★' : '☆';
      span.title       = `${partDef.label}: ${capitalize(item.status)}`;
      rowEl.appendChild(span);
    }
    gridEl.appendChild(rowEl);
  });

  return gridEl;
}
