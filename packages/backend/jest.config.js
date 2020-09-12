// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  runner: 'groups',
  testPathIgnorePatterns: ['/__mocks__/', '/__fixtures__/'],
};