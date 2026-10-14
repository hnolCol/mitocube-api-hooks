module.exports = {
    testEnvironment: "jsdom",
    transform: {
      '^.+\\.(js|jsx|ts|tsx|mjs)$': 'babel-jest',
    },
    transformIgnorePatterns: [
      '/node_modules/(?!lodash-es)', // Add other problematic modules here
    ],
    testPathIgnorePatterns: [
      '/node_modules/',
      'src/test/integration/', // Integration tests require a live backend and a test.config; run them locally only
    ],
  };
