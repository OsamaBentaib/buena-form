// jest.config.js
module.exports = {
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
    },
    setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
    moduleNameMapper: {
      "\\.(css|scss)$": "identity-obj-proxy",
    },
  };
  