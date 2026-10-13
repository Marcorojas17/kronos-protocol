// ═══════════════════════════════════════════════════════════════
//  ▓▒░ JEST.CONFIG.JS · ARKHÉ ZERO · ◯_● · 51/49/100 ░▒▓
// ═══════════════════════════════════════════════════════════════

export default {
  testEnvironment: 'node',
  testMatch: [
    '**/tests/**/*.test.js',
    '**/tests/**/*.spec.js',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/archive/',
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'crypto/**/*.js',
    'cimiento/**/*.js',
    'provenance/**/*.js',
    'agents/**/*.js',
    'certificacion/**/*.js',
    'gobernanza/**/*.js',
    '!**/node_modules/**',
    '!**/dist/**',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 75,
      lines: 80,
      statements: 80,
    },
  },
  verbose: true,
  bail: false,
  silent: false,
};

// ◯_● · 51/49/100 · KRONOS