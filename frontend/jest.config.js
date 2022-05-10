console.log('\njest.config.js')

// const { defaults } = require('jest-config');

// console.log(defaults)

const jestConfig = {
  verbose: true,
  testEnvironment: 'jsdom',
  transform: {
    // "\\.jsx?$": "babel-jest"
    "^.+\\.[t|j]sx?$": "babel-jest"
  },
  // transformIgnorePatterns: ["/node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)"],
  transformIgnorePatterns: [
    '/node_modules/(?!uuid)',
    // '/node_modules/(?!react-native)',
  ],
  // plugins: ["@babel/plugin-transform-modules-commonjs"],
  setupFilesAfterEnv: [
    '<rootDir>/src/jest-setup.js'
  ]
}

module.exports = jestConfig
