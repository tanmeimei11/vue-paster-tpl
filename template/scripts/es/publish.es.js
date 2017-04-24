/* globals exec */
import {
  request
} from 'http'
import {
  blue,
  red
} from 'chalk'

const JENKINS_TOKEN = exec('npm config get JENKINS_TOKEN', {
  silent: true
}).stdout.trim()
let post = (options, fun = () => {}) => {
  return request(options, res => {
    let rawData = ''
    res.setEncoding('utf8')
    res.on('data', chunk => (rawData += chunk))
    res.on('end', () => {
      fun(rawData)
    })
  })
}
// curl - X POST http: //10.10.106.240:8001/jenkins/view/InPromo/job/InPromo_onekey_deploy/build\
//   --user diandi: bdc9e35667a993f74838e0022f8fPUT /projects/:id/merge_request/:merge_request_id/merge1d73\
//   --data - urlencode json = '{"parameter": [{"name": "BRANCH", "value": "develop"}, {"name": "deploy_env", "value": "QA"}]}'
let jenkisPost = body => new Promise((resolve, reject) => {
  var bodyString = `json=${encodeURIComponent(JSON.stringify(body))}`
  let req = post({
    port: 8001,
    hostname: '10.10.106.240',
    method: 'POST',
    auth: JENKINS_TOKEN,
    headers: {
      'Content-Length': Buffer.byteLength(bodyString),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    path: '/jenkins/view/InPromo/job/InPromo_onekey_deploy/build?'
  }, res => {
    if (res.length) {
      reject(new Error('发布失败'))
    } else {
      resolve(res)
    }
  })
  req.write(bodyString)
  req.end()
})

const BRANCH = process.argv.slice(-1)[0] 
const jenkinsPromise = () => {
  console.log(blue(`开始发布....分支${BRANCH}`))
  jenkisPost({
    'parameter': [{
      'name': 'BRANCH',
      'value': BRANCH
    }, {
      'name': 'deploy_env',
      'value': 'QA'
    }]
  }).then(res => {
    console.log(blue('QA发布成功'))
    console.log(blue('webtest发布中....'))
    return jenkisPost({
      'parameter': [{
        'name': 'BRANCH',
        'value': BRANCH
      }, {
        'name': 'deploy_env',
        'value': 'webtest'
      }]
    })
  }).then(res => {
    console.log(blue('webtest发布成功'))
  }).catch(error => {
    console.log(red(error))
  })
}
jenkinsPromise()
