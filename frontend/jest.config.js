console.log('\njest.config')
const { createJestConfig } = require('@craco/craco')
// console.log('\n createJestConfig ->', createJestConfig)
const cracoConfig = require('./craco.config.js')
// console.log('\n cracoConfig ->', cracoConfig)
const jestConfig = createJestConfig(cracoConfig)
// console.log('\n jestConfig ->', jestConfig)

// module.exports = config
module.exports = jestConfig
