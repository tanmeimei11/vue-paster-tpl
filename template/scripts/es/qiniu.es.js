/* globals ls,test,cat */
import {
  request,
  get
} from 'https'
import {
  dirname,
  basename
} from 'path'
import {
  blue,
  red
} from 'chalk'
import {
  readFileSync,
  appendFileSync
} from 'fs'
import getEtag from '../plugins/qiniuHash.js'
import {
  build
} from '../../config'
const qiniuTokenUrl = 'https://www.in66.com/promo/commonapi/qiniutoken'

const qiniuUpload = (path, tokenRes) => new Promise((resolve, reject) => {
  let req = request({
    hostname: 'up.qbox.me',
    port: 443,
    path: `/putb64/-1/key/${tokenRes.key}`,
    method: 'POST',
    headers: {
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
      Authorization: `UpToken ${tokenRes.token}`,
      contentType: 'application/octet-stream'
    }
  }, uploadRes => {
    let resInfo = ''
    uploadRes.on('data', chunk => {
      resInfo += chunk
    }).on('end', () => {
      resInfo = JSON.parse(resInfo.toString())
      resolve({
        url: tokenRes.urlTpl.replace('%QiniuUploadImg%', resInfo.key).replace(/\?[^?]+$/, '')
      })
    })
  })
  req.write(readFileSync(path).toString('base64'))
  req.end()
})

const qiniuToken = () => new Promise((resolve, reject) => {
  get(qiniuTokenUrl, tokenRes => {
    let resInfo = ''
    tokenRes.on('data', chunk => {
      resInfo += chunk
    }).on('end', () => {
      resInfo = JSON.parse(resInfo.toString())
      if (resInfo.succ) {
        resolve(resInfo.data)
      } else {
        reject(resInfo.data.msg)
        console.log(`Upload Error '${red(resInfo.data.msg)}'.....`)
      }
    })
  })
})

const qiniuYun = (path, name, hash) => {
  let prefixDir = `/usr/src/app/${path}`
  let relativeName = `${path}/${name}`
  let qiniuPath = `${prefixDir}/qiniu.json`
  if (!test('-f', qiniuPath)) {
    appendFileSync(qiniuPath, '{}', {
      flag: 'w'
    })
  }
  var qiniu = JSON.parse(cat(qiniuPath))
  if (relativeName in qiniu && qiniu[`${relativeName}`].hash === hash) {
    console.log(`UploadDone '${blue(relativeName)}'.....`)
  } else {
    console.log(`StartUpload '${blue(relativeName)}'.....`)
    qiniuToken()
      .then(data => qiniuUpload(`${prefixDir}/${name}`, data))
      .then(res => {
        let _qiniuData = JSON.parse(cat(qiniuPath))
        _qiniuData[`${relativeName}`] = {
          hash: hash,
          qiniuUrl: res.url
        }
        appendFileSync(qiniuPath, JSON.stringify(_qiniuData, null, '\t'), {
          flag: 'w'
        })
        console.log(`UploadDone '${blue(relativeName)}'.....`)
      })
      .catch(error => {
        console.log(`Upload Error '${red(error)}'.....`)
      })
  }
}
ls(build.imgRegx.qiniu).forEach(file => {
  qiniuYun(dirname(file), basename(file), getEtag(file))
})
