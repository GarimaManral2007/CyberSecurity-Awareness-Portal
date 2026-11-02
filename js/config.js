/**
 * Global configuration and constants for CyberAware Portal.
 * Pure Vanilla JavaScript configuration.
 */
const APP_CONFIG = Object.freeze({
  APP_NAME: 'CyberAware Portal',
  SESSION_KEY: 'cyberaware_user',
  ROLE_KEY: 'cyberaware_role',
  ROUTES: Object.freeze({
    LOGIN: 'index.html',
    HOME: 'home.html',
    THREATS: 'threats.html',
    BEST_PRACTICES: 'best-practices.html',
    QUIZ: 'quiz.html',
    RESOURCES: 'resources.html',
  }),
  MIN_PASSWORD_LENGTH: 4,
  DEMO_USERS: Object.freeze({
    ANALYST: {
      username: 'analyst.smith',
      password: 'CyberDefense#2026',
      role: 'Security Analyst (Level 2)'
    },
    EMPLOYEE: {
      username: 'alex.turner',
      password: 'SafePassword123!',
      role: 'Staff Member (Level 1)'
    },
    ADMIN: {
      username: 'ciso.officer',
      password: 'FortressAdmin#99',
      role: 'Security Officer (Level 3)'
    }
  })
});
