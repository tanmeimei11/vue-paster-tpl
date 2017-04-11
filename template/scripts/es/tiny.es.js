/* globals ls */
import {
  request,
  get
} from 'https'
import {
  dirname,
  basename
} from 'path'
import {
  blue
} from 'chalk'
import {
  createReadStream,
  createWriteStream
} from 'fs'
import {
  build
} from '../../config'
const option = {
  hostname: 'tinypng.com',
  port: 443,
  path: '/site/shrink',
  method: 'POST',
  headers: {
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
  }
}
const compress = (path, name) => {
  let prefixDir = '/usr/src/app'
  console.log(`StartUpload '${blue(`${path}/${name}`)}'.....`)
  createReadStream(`${prefixDir}/${path}/${name}`).pipe(request(option, (res) => {
    res.on('data', resInfo => {
      resInfo = JSON.parse(resInfo.toString())
      var oldSize = (resInfo.input.size / 1024).toFixed(2)
      var newSize = (resInfo.output.size / 1024).toFixed(2)
      get(resInfo.output.url, imgRes => {
        let distName = `${build.imgCompress.prefix}${name}`
        imgRes.pipe(createWriteStream(`${prefixDir}/${path}/${distName}`))
        imgRes.on('end', () => {
          console.log(`CompressSize ${blue(`${oldSize}KB ==> ${newSize}KB -${Math.floor(((oldSize - newSize) / oldSize * 100))}% `)}`)
          console.log(`CompressDone '${blue(`${path}/${distName}`)}'.....`)
        })
      })
    })
  }))
}
ls(build.imgCompress.regx).forEach(file => {
  let name = basename(file)
  if (!/.(png|jpg)$/.test(name)) return ''
  if (RegExp(`^${build.imgCompress.prefix}`).test(name)) return ''
  compress(dirname(file), name)
})
