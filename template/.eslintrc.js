module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'standard',
  plugins: [
    'html'
  ],
  env: {
    'browser': true
  },
  globals: {
    'lib' : true
  },
  rules: {
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    "no-extra-parens":0,
  }
}
