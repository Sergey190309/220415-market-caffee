console.log('\ncraco.config')
// const { defaults } = require('jest-config');
// module.exports = require('./babel.config.js')
module.exports = {
  plugins: [{ plugin: require('@semantic-ui-react/craco-less') }],
  babel: {
    // presets: [['@babel/preset-env', { targets: { node: 'current' } }]]
    presets: ['@babel/preset-env', '@babel/preset-react']
  },
  jest: {
    babel: {
      addPresets: true,
      addPlugins: true
    },
    watchPlugins: [
      'jest-watch-typeahead/filename',
      'jest-watch-typeahead/testname'
    ],
    configure: {
      globals: {
        CONFIG: true
      },
      setupFilesAfterEnv: ['jest-extended', '<rootDir>/src/setupTests.js'],
      // "coveragePathIgnorePatterns": [...defaults.coveragePathIgnorePatterns, '<rootDir>/src/index.js'],
      // "snapshotSerializers": ["enzyme-to-json/serializer"],
      verbose: true,
      testEnvironment: 'jsdom',
      moduleNameMapper: {
        'react-i18next': '<rootDir>/__mock__/react-i18next.js'
        // 'i18next': '<rootDir>/__mock__/i18next.js'
      }
    }
  }
}
