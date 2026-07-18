// ============================================================
// EDIT MODAL — Open, render options, save, close
// Depends on: config.js, state.js, utils.js, spreadsheet.js (renderTable)
// ============================================================

/** Open the edit modal for the current user's cell on a given song. */
function openEditModal(songName, currentProgress) {
  editState.songName = songName;
  editState.parts    = {};
  PARTS.forEach(p => { editState.parts[p.key] = 'none'; });
  currentProgress.forEach(p => { editState.parts[p.part] = p.status; });

  document.getElementById('modal-song-name').textContent = songName;
  document.getElementById('save-btn').disabled    = false;
  document.getElementById('save-btn').textContent = 'Save';
  renderModalParts();

  document.getElementById('edit-modal').classList.remove('hidden');
  document.getElementById('modal-overlay').classList.remove('hidden');
}

/** Re-render the four part rows inside the modal, reflecting current editState. */
function renderModalParts() {
  const container = document.getElementById('modal-parts');
  container.innerHTML = '';

  PARTS.forEach(part => {
    const rowEl = document.createElement('div');
    rowEl.className = 'modal-row';

    const label       = document.createElement('span');
    label.className   = `modal-part-label ${part.key}`;
    label.textContent = part.label;
    rowEl.appendChild(label);

    const btnGroup   = document.createElement('div');
    btnGroup.className = 'modal-btn-group';

    [
      { value: 'none',     display: '—', title: 'Not started'          },
      { value: 'learning', display: '☆', title: 'Learning in progress' },
      { value: 'complete', display: '★', title: 'Complete'             },
    ].forEach(option => {
      const btn     = document.createElement('button');
      btn.className = 'status-btn' + (editState.parts[part.key] === option.value ? ' selected' : '');
      btn.title     = option.title;

      if (option.value === 'none') {
        btn.textContent = '—';
      } else {
        const starSpan       = document.createElement('span');
        starSpan.className   = `star ${option.value} ${part.key}`;
        starSpan.textContent = option.display;
        btn.appendChild(starSpan);
      }

      btn.addEventListener('click', () => {
        editState.parts[part.key] = option.value;
        renderModalParts();
      });

      btnGroup.appendChild(btn);
    });

    rowEl.appendChild(btnGroup);
    container.appendChild(rowEl);
  });
}

/** Persist the current editState to the database, update local cache, re-render. */
async function saveProgress() {
  const saveBtn       = document.getElementById('save-btn');
  saveBtn.disabled    = true;
  saveBtn.textContent = 'Saving…';

  const { songName } = editState;
  const userId       = currentUser.id;

  // Delete all existing entries for this user + song, then re-insert
  const { error: delErr } = await db
    .from('song_progress')
    .delete()
    .eq('user_id', userId)
    .eq('song_name', songName);

  if (delErr) {
    alert('Error saving: ' + delErr.message);
    saveBtn.disabled    = false;
    saveBtn.textContent = 'Save';
    return;
  }

  const newEntries = PARTS
    .filter(p => editState.parts[p.key] !== 'none')
    .map(p => ({ user_id: userId, song_name: songName, part: p.key, status: editState.parts[p.key] }));

  if (newEntries.length > 0) {
    const { error: insErr } = await db.from('song_progress').insert(newEntries);
    if (insErr) {
      alert('Error saving: ' + insErr.message);
      saveBtn.disabled    = false;
      saveBtn.textContent = 'Save';
      return;
    }
  }

  // Update local cache so the table re-renders without a network round-trip
  allProgress = allProgress.filter(
    p => !(p.user_id === userId && p.song_name === songName)
  );
  allProgress.push(...newEntries);

  closeModal();
  renderTable();
}

/** Close the edit modal and reset editState. */
function closeModal() {
  document.getElementById('edit-modal').classList.add('hidden');
  document.getElementById('modal-overlay').classList.add('hidden');
  editState = { songName: null, parts: {} };
}
