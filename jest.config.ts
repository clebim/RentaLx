export default {
  bail: true,
  clearMocks: true,
  coverageProvider: 'v8',
  preset: 'ts-jest',
  testMatch: ['**/*.test.ts?(x)', '**/*.spec.ts?(x)'],
  transformIgnorePatterns: ['node_modules/'],
  testEnvironment: 'node',
  cacheDirectory: '<rootDir>/target/jest-cache',
  coverageDirectory: '<rootDir>/target/test-results/',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: './target/test-results/',
        outputName: 'TESTS-results-jest.xml',
      },
    ],
  ],
};
