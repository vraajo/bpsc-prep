export const Utils = {
  initTheme() {
    const savedTheme = localStorage.getItem('bpsc_theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
  },

  toggleTheme() {
    const current = document.body.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', next);
    localStorage.setItem('bpsc_theme', next);
  },

  initCountdown(targetDateString, elementId) {
    const targetDate = new Date(targetDateString).getTime();
    const update = () => {
      const now = new Date().getTime();
      const diff = targetDate - now;
      const el = document.getElementById(elementId);
      if (!el) return;

      if (diff <= 0) {
        el.textContent = "Exam Day!";
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      el.textContent = `${d}d ${h}h ${m}m ${s}s`;
    };
    update();
    setInterval(update, 1000);
  },

  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(err => console.log('SW registration failed:', err));
      });
    }
  }
};
