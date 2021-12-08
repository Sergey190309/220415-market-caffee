console.log('\njest.config')
const { createJestConfig } = require('@craco/craco')
const cracoConfig = require('./craco.config.js')

const jestConfig = createJestConfig(cracoConfig)

console.log('\n jestConfig ->\n', jestConfig)

// module.exports = config
module.exports = jestConfig
