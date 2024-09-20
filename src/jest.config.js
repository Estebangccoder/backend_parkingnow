module.exports = {
    roots: ['<rootDir>/src'],
    testMatch: ['**/*.spec.ts'],
    transform: {
      '^.+\\.ts$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  };
  