/**
 * Authentication & Session Management Module
 * Uses sessionStorage to simulate secure browser session state.
 */
const Auth = (() => {
  'use strict';

  /**
   * Store logged-in username and role.
   * @param {string} username
   * @param {string} role
   */
  function login(username, role = 'Security Member (Level 1)') {
    sessionStorage.setItem(APP_CONFIG.SESSION_KEY, username);
    sessionStorage.setItem(APP_CONFIG.ROLE_KEY, role);
  }

  /** Clear current session */
  function logout() {
    sessionStorage.removeItem(APP_CONFIG.SESSION_KEY);
    sessionStorage.removeItem(APP_CONFIG.ROLE_KEY);
  }

  /** @returns {string|null} */
  function getUser() {
    return sessionStorage.getItem(APP_CONFIG.SESSION_KEY);
  }

  /** @returns {string} */
  function getRole() {
    return sessionStorage.getItem(APP_CONFIG.ROLE_KEY) || 'Security Member (Level 1)';
  }

  /** @returns {boolean} */
  function isAuthenticated() {
    return Boolean(getUser());
  }

  /** Redirect unauthenticated visitors to login */
  function requireAuth() {
    if (!isAuthenticated()) {
      window.location.replace(APP_CONFIG.ROUTES.LOGIN);
    }
  }

  /** Redirect authenticated visitors to portal home */
  function redirectIfAuthenticated() {
    if (isAuthenticated()) {
      window.location.replace(APP_CONFIG.ROUTES.HOME);
    }
  }

  return {
    login,
    logout,
    getUser,
    getRole,
    isAuthenticated,
    requireAuth,
    redirectIfAuthenticated,
  };
})();