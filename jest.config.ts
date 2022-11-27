/** @type {import('ts-jest').JestConfigWithTsJest} */
export = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@path/(.*)$': ['<rootDir>/core/$1'],
  },
};
