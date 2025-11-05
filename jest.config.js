module.exports = {
    transform: {
      '^.+\\.(js|jsx|ts|tsx|mjs)$': 'babel-jest',
    },
    transformIgnorePatterns: [
      '/node_modules/(?!lodash-es)', // Add other problematic modules here
    ],
  };