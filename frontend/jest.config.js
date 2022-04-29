console.log('\njest.config.js')

const jestConfig = {
  verbose: true,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    '<rootDir>/src/jest-setup.js'
  ]
}

module.exports = jestConfig
