module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@Lib/(.*)$': '<rootDir>/api/lib/$1',
    '^@Controllers/(.*)$': '<rootDir>/api/controllers/$1',
    '^@Api/(.*)$': '<rootDir>/api/api/$1',
  },
};
