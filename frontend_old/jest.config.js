console.log('\njest.config')
// const { createJestConfig } = require('@craco/craco')
// const cracoConfig = require('./craco.config.js')

const jestConfig = {
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ],
  globals: {
    CONFIG: true
  },
  clearMocks: true,
  setupFilesAfterEnv: [
    'jest-extended',
    '<rootDir>/src/setupTests.js'
  ],
  // "coveragePathIgnorePatterns": [...defaults.coveragePathIgnorePatterns, '<rootDir>/src/index.js'],
  verbose: true,
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/src/__mocks__/imagesMock.js',
    'react-i18next': '<rootDir>/src/__mocks__/react-i18next.js'
    // 'i18next': '<rootDir>/__mock__/i18next.js'
  }
}

// const jestConfig = createJestConfig(cracoConfig)

console.log('jestConfig ->\n', jestConfig)

// module.exports = config
module.exports = jestConfig
