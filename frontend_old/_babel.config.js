// babel.config.js
console.log('\nbabel.config.js\n')
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-react'
  ]
  // presets: ['@babel/preset-env', '@babel/preset-react'],
  // env: {
  //   test: {
  //     plugins: [
  //       '@babel/plugin-transform-modules-commonjs'
  //     ]
  //   }
  // }
}
