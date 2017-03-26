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
    'lib' : true,
    'vue': true
  },
  rules: {
    'no-new':0,
    'no-debugger':0,
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    "no-extra-parens":0,
    "space-before-function-paren": ["error", "always"],
    "space-after-function-paren": ["error", {
        "anonymous": "always",
        "named": "always",
        "asyncArrow": "ignore"
    }],
  }
}
