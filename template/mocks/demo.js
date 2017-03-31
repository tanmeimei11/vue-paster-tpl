module.exports = function(data) {
  var obj = {
    '$$statusCode': 401,
    '$$delay': 1000,
    '$$header': {
      'Content-Type': 'text/plain'
    },
    'message': 'hello world',
    'data': JSON.stringify(data)
  }

  //write logic here
  if (data.query.key && data.params.key && data.body.key) {
    obj = {}
  }

  return obj
}
