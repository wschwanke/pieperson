module.exports = {
  modulePaths: [
    '<rootDir>/client/',
  ],
  verbose: true,
  testEnvironment: 'node',
  rootDir: '.',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  globals: {
    document: '',
    'ts-jest': {
      tsConfigFile: 'tsconfig.jest.json',
    },
  },
  // We aren't using this yet, but its ready to use when we need it.
  // snapshotSerializers: [
  //   'enzyme-to-json/serializer'
  // ]
};
