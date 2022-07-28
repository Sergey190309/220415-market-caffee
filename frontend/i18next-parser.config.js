module.exports = {
  contextSeparator: '_',
  createOldCatalogs: true, // save previous translation catalogs to the \_old folder
  defaultNamespace: '',
  defaultValue: '',
  indentation: 2,
  keepRemoved: false,
  keySeparator: '.',
  lexers: {
    jsx: ['JsxLexer'], // we're writing jsx inside .js files
    default: ['JavascriptLexer']
  },
  lineEnding: 'auto',
  locales: ['en', 'ru'],
  namespaceSeparator: ':',
  output: './public/locales/$LOCALE/$NAMESPACE.json',
  input: [
    'src/**/*.{js,jsx}'
  ],
  sort: true,
  skipDefaultValues: false,
  useKeysAsDefaultValue: true,
  verbose: false,
  failOnWarnings: true,
  // --fail-on-warnings
  customValueTemplate: null
}

// i18next-conv -l [locale] -s [sourcePath] -t [targetPath]
