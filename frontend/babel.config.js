console.log('babel.config.js')

// const { defaults } = require('jest-config');

// console.log(defaults)

const babelConfig = {
  // moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  // verbose: true,
  // transform: {},
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    // ['@babel/preset-react', {runtime: 'automatic'}],
  ],
  plugins: [
    // "@babel/plugin-transform-modules-commonjs"
    '@babel/plugin-transform-runtime',
    '@babel/plugin-transform-async-to-generator',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from'
  ]
}

module.exports = babelConfig
