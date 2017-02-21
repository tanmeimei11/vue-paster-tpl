
export const env = {
  port: 8018
}

export const build = {
  entryGlobs: 'src/pages/**/entry.js',
  entryTpl: 'tpl.ejs',
  entryRule: ['entry.js', 'tpl.ejs'],
  remUnit: 75
}
