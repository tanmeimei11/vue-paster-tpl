export const env = {
  port: 8018,
  autoOpenBrowser: true,
  proxyTable: {
    'api': {
      target: 'http://www.example.org'
    }
  }
}

export const build = {
  entryGlobs: 'src/pages/**/entry.js',
  entryTpl: 'tpl.pug',
  entryRule: ['entry.js', 'tpl.pug'],
  remUnit: 75,
  bundleAnalyzerReport: false
}
