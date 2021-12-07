// babel.config.js
console.log('\nbabel.config.js')
module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }]]
  // presets: ['@babel/preset-env', '@babel/preset-react']
}
