module.exports = {
  // contextSeparator: '.',
  createOldCatalogs: true, // save previous translation catalogs to the \_old folder

  lexers: {
    jsx: ['JsxLexer'], // we're writing jsx inside .js files
    default: ['JavascriptLexer'],
  },

  locales: ['en', 'ru', 'cn'],
  // An array of the locales in your applications

  namespaceSeparator: ':',
  // Namespace separator used in your translation keys
  // If you want to use plain english keys, separators such as `.` and `:` will conflict. You might want to set `keySeparator: false` and `namespaceSeparator: false`. That way, `t('Status: Loading...')` will not think that there are a namespace and three separator dots for instance.

  keySeparator: '.',
  // Key separator used in your translation keys

  sort: true,
  // Whether or not to sort the catalog

  // defaultValue: 'to be translated',
  // Default value to give to empty keys
  useKeysAsDefaultValue: true,
  // Whether to use the keys as the default value; ex. "Hello": "Hello", "World": "World"

  verbose: true,

  indentation: 2,
  // Indentation of the catalog files

  output: './public/locales/$LOCALE/$NAMESPACE.json',
  // Supports $LOCALE and $NAMESPACE injection
  // Supports JSON (.json) and YAML (.yml) file formats
  // Where to write the locale files relative to process.cwd()

  input: [
      'src/**/*.{js,jsx}',
  ],
  // An array of globs that describe where to look for source files
  // relative to the location of the configuration file
  // Globs syntax: https://github.com/isaacs/node-glob#glob-primer
}