module.exports = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ["./lib/index.js"],
  testEnvironment: 'node',
  testMatch: ['**/src/**/*.test.ts'],
};