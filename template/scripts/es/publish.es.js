/* globals exec,head */
import {
  request
} from 'http'
import {
  blue,
  red
} from 'chalk'
const GIT_TOKEN = exec('npm config get GIT_TOKEN', {
  silent: true
}).stdout.trim()
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

// POST /projects/:id/merge_requests
// PUT /projects/:id/merge_request/:merge_request_id/merge
// If merge success you get 200 OK.
// If it has some conflicts and can not be merged - you get 405 and error message 'Branch cannot be merged'
// If merge request is already merged or closed - you get 405 and error message 'Method Not Allowed'
// If you don't have permissions to accept this merge request - you'll get a 401
let gitPost = (path, body) => new Promise((resolve, reject) => {
  var bodyString = JSON.stringify(body)
  let req = post({
    hostname: 'githost.in66.cc',
    method: /merge$/.test(path) ? 'PUT' : 'POST',
    headers: {
      'PRIVATE-TOKEN': GIT_TOKEN,
      'Content-Length': Buffer.byteLength(bodyString),
      'Content-Type': 'application/json'
    },
    path: `/api/v3/projects/1045/${path}`
  }, res => {
    let json = JSON.parse(res)
    if (json.message) {
      reject(new Error(json.message))
    } else {
      resolve(json)
    }
  })
  req.write(bodyString)
  req.end()
})

const jenkinsPromise = () => {
  console.log(blue('开始发布....'))
  jenkisPost({
    'parameter': [{
      'name': 'BRANCH',
      'value': 'develop'
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
        'value': 'develop'
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

const BRANCH = head({'-n': 1}, '.git/HEAD').split('/').slice(-1)[0].trim()
if (BRANCH === '') {
  console.log(red(`合并请求分支没有找到`))
} else if (~['develop', 'master'].indexOf(BRANCH)) {
  console.log(red(`${['develop', 'master'].join(' ')} 分支不能发起合并请求`))
} else {
  console.log(blue(`开始发起合并请求...分支${BRANCH} to develop`))
  gitPost('merge_requests', {
    title: `auto merge ${BRANCH} to develop for npm run publish`,
    source_branch: BRANCH,
    target_branch: 'develop'
  }).then(json => {
    console.log(blue(`自动合并请求...分支${BRANCH} to develop`))
    return gitPost(`merge_request/${json.id}/merge`, {})
  }).then(res => {
    console.log(blue(`合并请求成功`))
    jenkinsPromise()
  }).catch(error => {
    console.log(red(error))
  })
}
