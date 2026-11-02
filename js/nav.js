/**
 * Navigation & Global Shell Helpers
 * - Wires user display chip and role
 * - Controls mobile navigation menu
 * - Wires logout button
 * - Provides lightweight toast notification service
 */
const Nav = (() => {
  'use strict';

  function init() {
    initUserDisplay();
    initLogout();
    initMobileMenu();
    initToastSystem();
  }

  function initUserDisplay() {
    const userDisplay = document.getElementById('userDisplay');
    const userRoleBadge = document.getElementById('userRoleBadge');
    const username = Auth.getUser();
    const role = Auth.getRole();

    if (userDisplay && username) {
      userDisplay.textContent = username;
    }
    if (userRoleBadge && role) {
      userRoleBadge.textContent = role;
    }
  }

  function initLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('Logging out of secure session...', 'info');
        setTimeout(() => {
          Auth.logout();
          window.location.replace(APP_CONFIG.ROUTES.LOGIN);
        }, 400);
      });
    }
  }

  function initMobileMenu() {
    const toggleBtn = document.getElementById('mobileNavToggle');
    const navLinks = document.querySelector('.nav-links');

    if (toggleBtn && navLinks) {
      toggleBtn.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-open');
      });

      // Close menu if clicking outside
      document.addEventListener('click', (e) => {
        if (!toggleBtn.contains(e.target) && !navLinks.contains(e.target)) {
          navLinks.classList.remove('mobile-open');
        }
      });
    }
  }

  function initToastSystem() {
    if (!document.querySelector('.toast-container')) {
      const container = document.createElement('div');
      container.className = 'toast-container';
      container.setAttribute('aria-live', 'polite');
      document.body.appendChild(container);
    }
  }

  /**
   * Display a clean toast message
   * @param {string} message
   * @param {'success'|'info'|'error'} type
   * @param {number} duration
   */
  function showToast(message, type = 'info', duration = 3000) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      initToastSystem();
      container = document.querySelector('.toast-container');
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let icon = 'ℹ️';
    if (type === 'success') icon = '🛡️';
    if (type === 'error') icon = '⚠️';

    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  // Expose toast globally
  window.showToast = showToast;

  return { init, showToast };
})();