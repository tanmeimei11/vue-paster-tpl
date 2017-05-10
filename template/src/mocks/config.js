/**
 * mock的配置
 */
const mockMap = {
  //   '/promo/userapi/currentuser': require('./json/user.json'),
  '/promo/userapi/currentuser': [{
    params: {
      'promo_name': '{{ name }}'
    },
    data: require('./json/user.json')
  }]
}
export default mockMap
