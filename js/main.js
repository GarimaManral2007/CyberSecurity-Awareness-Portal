/**
 * Main application bootstrap script.
 * Handles login authentication, demo accounts autofill, and page initializations.
 */
(function bootstrap() {
  'use strict';

  const isLoginPage = document.body.classList.contains('auth-page');

  if (isLoginPage) {
    initLoginPage();
  } else {
    initAppPage();
  }

  // --------------------------------------------------------------------------
  // Login Page Controller
  // --------------------------------------------------------------------------
  function initLoginPage() {
    Auth.redirectIfAuthenticated();

    const form = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMsg = document.getElementById('loginError');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const demoPills = document.querySelectorAll('.demo-pill-btn');

    // Password visibility toggle
    if (togglePasswordBtn && passwordInput) {
      togglePasswordBtn.addEventListener('click', () => {
        const isPassword = passwordInput.getAttribute('type') === 'password';
        passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
        togglePasswordBtn.textContent = isPassword ? '👁️' : '🔒';
        togglePasswordBtn.setAttribute('title', isPassword ? 'Hide password' : 'Show password');
      });
    }

    // Quick-Fill Demo Buttons
    if (demoPills.length > 0) {
      demoPills.forEach((btn) => {
        btn.addEventListener('click', () => {
          const userType = btn.getAttribute('data-demo-type');
          const demoData = APP_CONFIG.DEMO_USERS[userType];
          if (demoData) {
            usernameInput.value = demoData.username;
            passwordInput.value = demoData.password;
            if (errorMsg) {
              errorMsg.classList.remove('visible');
              errorMsg.textContent = '';
            }
            if (window.showToast) {
              window.showToast(`Loaded credentials for ${demoData.role}`, 'info');
            }
          }
        });
      });
    }

    // Form submission
    if (!form) return;

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      if (errorMsg) {
        errorMsg.classList.remove('visible');
        errorMsg.textContent = '';
      }

      const username = usernameInput.value.trim();
      const password = passwordInput.value.trim();

      if (!username || !password) {
        showError('Please enter both username and password.');
        return;
      }

      if (password.length < APP_CONFIG.MIN_PASSWORD_LENGTH) {
        showError(`Password must be at least ${APP_CONFIG.MIN_PASSWORD_LENGTH} characters.`);
        return;
      }

      // Check if it matches a known demo user to assign their role, or default to Member
      let userRole = 'Security Member (Level 1)';
      for (const key in APP_CONFIG.DEMO_USERS) {
        const demo = APP_CONFIG.DEMO_USERS[key];
        if (demo.username.toLowerCase() === username.toLowerCase()) {
          userRole = demo.role;
          break;
        }
      }

      // Simulated security verification
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Verifying Credentials...</span>';
      submitBtn.disabled = true;

      setTimeout(() => {
        Auth.login(username, userRole);
        window.location.replace(APP_CONFIG.ROUTES.HOME);
      }, 500);
    });

    function showError(message) {
      if (!errorMsg) return;
      errorMsg.textContent = message;
      errorMsg.classList.add('visible');
    }
  }

  // --------------------------------------------------------------------------
  // App Pages Controller
  // --------------------------------------------------------------------------
  function initAppPage() {
    Auth.requireAuth();
    Nav.init();
  }
})();