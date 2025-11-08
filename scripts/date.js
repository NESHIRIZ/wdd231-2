// Simple date helpers: populate #year and #lastModified with graceful fallbacks

(function () {
  const yearEl = document.getElementById('year');
  const lmEl = document.getElementById('lastModified');

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  if (lmEl) {
    // Use document.lastModified (client-side); if empty, fallback to current date
    const last = document.lastModified && document.lastModified !== '' ? new Date(document.lastModified) : null;
    if (last) {
      lmEl.textContent = last.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
    } else {
      lmEl.textContent = new Date().toLocaleString(undefined, { dateStyle: 'medium' });
    }
  }
})();