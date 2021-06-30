module.exports = {
  globalSetup: "./config/global-setup.js",
  globalTeardown: "./config/global-teardown.js",
  preset: "jest-playwright-preset",
  testMatch: ["**/src/**/*.test.ts"],
  collectCoverage: true,
  collectCoverageFrom: ["**/src/**/*.ts", "!**/tests/*"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  setupFilesAfterEnv: ["<rootDir>/src/index.ts"],
}
