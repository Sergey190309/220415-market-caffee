console.log('\njest.config')
// const { createJestConfig } = require('@craco/craco')
// console.log('\n createJestConfig ->', createJestConfig)
// const cracoConfig = require('./craco.config.js')
// console.log('\n cracoConfig ->', cracoConfig)

// module.exports = require('./babel.config.js')

const { defaults } = require('jest-config')

const jestConfig = {
  globals: {
    CONFIG: true
  },
  transform: {},
  testEnvironment: 'jest-environment-node',
  // testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    'jest-extended',
    '<rootDir>/src/setupTests.js'
  ],
  // "coveragePathIgnorePatterns": [...defaults.coveragePathIgnorePatterns, '<rootDir>/src/index.js'],
  // "snapshotSerializers": ["enzyme-to-json/serializer"],
  verbose: true,
  moduleNameMapper: {
    'react-i18next': '<rootDir>/src/__mocks__/react-i18next.js'
    // 'i18next': '<rootDir>/__mock__/i18next.js'
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ]
}
// const jestConfig = createJestConfig(cracoConfig)
console.log('\n defaults ->\n', defaults)
console.log('\n jestConfig ->\n', jestConfig)

// module.exports = config
module.exports = jestConfig
