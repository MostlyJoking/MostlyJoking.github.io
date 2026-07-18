// ============================================================
// UTILITY FUNCTIONS
// Pure helpers with no side-effects or external dependencies.
// ============================================================

/** Show one named section; hide the other two. */
function showSection(id) {
  ['auth-section', 'chorus-section', 'app-section'].forEach(s => {
    document.getElementById(s).classList.toggle('hidden', s !== id);
  });
}

/** Capitalize the first letter of a string. */
function capitalize(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}

/** Safely escape a plain-text string for use inside HTML. */
function escHtml(str) {
  const d = document.createElement('div');
  d.appendChild(document.createTextNode(str));
  return d.innerHTML;
}
