
'use strict'

const spawnSync = require('cross-spawn').sync
/* istanbul ignore next */
module.exports = (cmd, args, opts) => {
  opts = opts || {}

  const errMessage = opts.errorMessage
  const command = spawnSync(cmd, args || [], opts)

  if (command.status === 1) {
    if (command.stderr) {
      console.fatal(errMessage || command.stderr.toString())
    }
    process.exit(1)
  }

  return command
}