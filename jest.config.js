module.exports = {
  preset: 'jest-playwright-preset',
  testMatch: ['**/src/**/*.test.ts'],
  collectCoverage: true,
  collectCoverageFrom: ["**/src/**/*.ts"],
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  setupFilesAfterEnv: ["<rootDir>/lib/index.js"]
};