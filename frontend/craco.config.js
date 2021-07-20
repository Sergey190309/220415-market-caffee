// const { defaults } = require('jest-config');

module.exports = {
  plugins: [{ plugin: require('@semantic-ui-react/craco-less') }],
  jest: {
    configure: {
      globals: {
        CONFIG: true,
      },
      setupFilesAfterEnv: ['jest-extended', '<rootDir>/src/setupTests.js'],
      // "coveragePathIgnorePatterns": [...defaults.coveragePathIgnorePatterns, '<rootDir>/src/index.js'],
      // "snapshotSerializers": ["enzyme-to-json/serializer"],
      verbose: true,
      testEnvironment: 'jsdom',
      // moduleNameMapper: {
      //   'react-i18next': '<rootDir>/__mock__/react-i18next.js',
      //   'i18next': '<rootDir>/__mock__/i18next.js'
      // },
    },
  },
};
