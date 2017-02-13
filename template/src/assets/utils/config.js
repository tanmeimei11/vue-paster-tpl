
var host = ''

if (process.env.NODE_ENV === 'production') {
  host = '//www.in66.com'
}
if (/^qa/.test(location.host)) {
  host = '//qa.in66.com'
}

export const CHAI = `${host}/promo/redpacketapi/index`
export const HOT = `${host}/promo/redpacketapi/recvideos`
export const VIDEO = `${host}/promo/redpacketapi/videos`
export const HOTLIST = [{
  'cover_url': '//inimg01.jiuyan.info/in/2017/01/20/13AF9492-6C55-98BF-B36D-C486D677544B.jpg',
  'url': '//inimg02.jiuyan.info/in/2017/01/19/1CEBF467-FEB2-9F49-5351-F9CE14270B6B.mp4'
},
{
  'cover_url': '//inimg05.jiuyan.info/in/2017/01/20/7F2250B1-F059-0540-E4F4-0C147176DFB3.jpg',
  'url': '//inimg01.jiuyan.info/in/2017/01/19/B8EA217B-0A63-DD77-F9D8-45F5C44C832C.mp4'
},
{
  'cover_url': '//inimg05.jiuyan.info/in/2017/01/20/ECBB6DD6-BBF6-40A6-9F2B-13CBF73E8911.jpg',
  'url': '//inimg02.jiuyan.info/in/2017/01/19/32E942B9-9A1A-EA80-C37D-973514BA8823.mp4 '
},
{
  'cover_url': '//inimg05.jiuyan.info/in/2017/01/20/97B22B8B-CFEB-2558-F657-9BADF8AD3315.jpg',
  'url': '//inimg05.jiuyan.info/in/2017/01/19/B0E81823-88F3-C0C4-4F2D-B42EC965E66D.mp4'
},
{
  'cover_url': '//inimg01.jiuyan.info/in/2017/01/20/658B4D87-F23C-869E-A4D5-032B8E577A8C.jpg',
  'url': '//inimg02.jiuyan.info/in/2017/01/19/F979B52C-0BC0-B1BC-47BC-9427CDE43C68.mp4'
}
]
export const GIFLIST = [{
  title: '你可以',
  stitle: '扫财神领',
  url: '//inimg05.jiuyan.info/in/2017/01/20/7F98DA7E-BEC3-CB17-25AC-78C2961AADB1.jpg'
},
{
  title: '你可以',
  stitle: '变身萌宝拜大年',
  url: '//inimg02.jiuyan.info/in/2017/01/20/CBE07B86-6719-2E1A-A672-42C79B3B8FED.jpg'
},
{
  title: '你可以',
  stitle: '抬手机看视频拆福利',
  url: '//inimg05.jiuyan.info/in/2017/01/20/11284E7E-4839-9268-D098-310E3CC128A6.jpg'
}
]
window.appUrlObj = {
  'iosMessage': 'in://camera?type=ar&scene=shopping_mall_red_packet',
  'androidMessage': 'in://camera?type=ar&scene=shopping_mall_red_packet'
}
