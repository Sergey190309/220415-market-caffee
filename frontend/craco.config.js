module.exports = {
  plugins: [{ plugin: require('@semantic-ui-react/craco-less') }],
  jest: {
    configure: {
        globals: {
            "CONFIG": true
        }
    }
  }
}
