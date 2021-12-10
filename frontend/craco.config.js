console.log('\ncraco.config\n')
// const { defaults } = require('jest-config');
// module.exports = require('./babel.config.js')
const SemanicLessPlugin = require('@semantic-ui-react/craco-less')

const cracoConfig = {
  plugins: [
    { plugin: SemanicLessPlugin }
  ]
  // plugins: [{ plugin: require('@semantic-ui-react/craco-less') }],
  // babel: {
  //   // presets: [['@babel/preset-env', { targets: { node: 'current' } }]]
  //   presets: ['@babel/preset-env', '@babel/preset-react']
  // },
//   jest: {
//     watchPlugins: [
//       'jest-watch-typeahead/filename',
//       'jest-watch-typeahead/testname'
//     ],
//     globals: {
//       CONFIG: true
//     },
//     setupFilesAfterEnv: [
//       'jest-extended',
//       '<rootDir>/src/setupTests.js'
//     ],
//     // "coveragePathIgnorePatterns": [...defaults.coveragePathIgnorePatterns, '<rootDir>/src/index.js'],
//     // "snapshotSerializers": ["enzyme-to-json/serializer"],
//     verbose: true,
//     testEnvironment: 'jsdom',
//     moduleNameMapper: {
//       'react-i18next': '<rootDir>/src/__mock__/react-i18next.js'
//       // 'i18next': '<rootDir>/__mock__/i18next.js'
//     }
//   }
}
// const { createJestConfig } = require('@craco/craco')
// const jestConfig = createJestConfig(cracoConfig)
// console.log(cracoConfig)

module.exports = cracoConfig
