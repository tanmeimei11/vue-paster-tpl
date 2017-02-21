import webpack from 'webpack'
import {
  cyan
} from 'chalk'
import cfg from './webpack.prod.config'

if (test('-e', cfg.output.path)) {
  rm('-rf', cfg.output.path)
}
webpack(cfg, function (err, stats) {
   if (err) throw err
   process.stdout.write(stats.toString({
     colors: true,
     modules: false,
     children: false,
     chunks: false,
     chunkModules: false
   }) + '\n\n')
   console.log(cyan('  Build complete.\n'))
})
