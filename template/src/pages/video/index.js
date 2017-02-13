import Redpkettop from '../../components/redpackettop.vue'
import Videomid from '../../components/videomid.vue'
import Redpketbottom from '../../components/redpacketbottom.vue'
import Btn from '../../components/btn.vue'
import Modal from '../../components/modal.vue'
import Loginodal from '../../components/loginmodal.vue'
import { CHAI, HOT, VIDEO, HOTLIST } from '../../assets/utils/config'
import {default as common, share, track} from '../../assets/utils/common'
import Event from '../../assets/utils/event.js'

export default {
  name: 'app',
  components: {
    Redpkettop,
    Videomid,
    Redpketbottom,
    Modal,
    Loginodal,
    Btn
  },

  data () {
    return {
      vid: 0,
      vurl: '',
      vposter: '',
      isPause: true,
      video: null,
      page: 1,
      hotPage: 1,
      money: '0',
      allMoney: '0',
      redpacket: [],
      status: 1,
      isFetch: false,
      isModal: false,
      modalText: '微信',
      hotList: HOTLIST,
      newList: [],
      sence: ''
    }
  },
  methods: {
    'videoClick' (e) {
      this.video.play()
      this.isPause = false
      this.video.onended = this.videoOver
      this.videoClick = this.changeVstatus
    },
    'yuanxiaoClick' () {
      track('h5_entry_ar_play')
      // console.log(`in://webview?url=${encodeURIComponent('http://h5.in66.com/inpromo/2017/ar-share/video.html?sence=yuanxiao&vid=')}${this.vid}`)
      window.appUrlObj = {
        iosMessage: `in://webview?url=${encodeURIComponent(encodeURIComponent('http://h5.in66.com/inpromo/2017/ar-share/video.html?sence=yuanxiao&vid='))}${this.vid}`,
        androidMessage: `in://webview?url=${encodeURIComponent('http://h5.in66.com/inpromo/2017/ar-share/video.html?sence=yuanxiao&vid=')}${this.vid}`
      }
      common.openInApp()
    },
    'changeVstatus' (e) {
      if (e.target === document.getElementById('videocurtain')) {
        this.isPause = !this.video.paused
        this.video.paused ? this.video.play() : this.video.pause()
      }
    },
    'chaiClick' (e) {
      track('h5_entry_ar_chaiclick')
      e && (e.preventDefault(), e.stopPropagation())
      // 不在微信和微博 in 的时候
      if (!(common.weixin || common.weibo || common.InApp)) {
        this.page = 3
        return false
      }

      fetch(`${CHAI}?vid=${this.vid}&h5url=${common.curUrl}${encodeURIComponent('&vid=' + this.vid)}`, {
        credentials: 'include'
      })
      .then(res => res.json())
      .then((res) => {
        // 没授权
        if (!res.succ) {
          location.href = res.data.authUrl
          return false
        }

        this.money = res.data.money
        this.allMoney = res.data.total_money
        this.status = res.data.receive_status
        this.redpacket = res.data.redpacket_user.slice(0, 4)
        this.page = 2

        // 下拉加载  仙岳说不要了
        // window.onscroll = () => {
        //   let dh = document.body.clientHeight
        //   let wh = window.screen.availHeight
        //   let st = document.body.scrollTop
        //   if (dh - (wh + st) < 200) {
        //     this.getHotPage()
        //   }
        // }

        // this.getHotPage()
      })
    },
    'getHotPage' () {
      if (this.isFetch) { return false }
      this.isFetch = true

      // 热门视频
      fetch(`${HOT}?page=${this.hotPage}`, {
        credentials: 'include'
      })
      .then(res => res.json())
      .then((res) => {
        if (!res.data.new.length) { return false }
        this.newList.push.apply(this.newList, res.data.new)
        this.hotPage++
        this.isFetch = false
      })
    },
    'changeModal' () {
      this.isModal = !this.isModal
    }
  },
  created () {
    if (common.weibo) {
      this.modalText = '微博'
    }
    console.log(this.modalText)

    track('h5_entry_ar_index')
    this.vid = common.query.vid
    if (!this.vid) {
      return false
    }
    // 2.9 元宵场景
    if (common.query.sence === 'yuanxiao') {
      this.sence = common.query.sence
    }
    // 绑定事件
    Event.$on('change-modal', this.changeModal)
    // 获取当前视频
    fetch(`${VIDEO}?vids=${this.vid}`, {
      credentials: 'include'
    })
    .then(res => res.json())
    .then((res) => {
      this.vurl = res.data[this.vid].video_url
      this.vposter = res.data[this.vid].cover_url
      this.video = document.getElementById('video')
      window.v = this.video
    })

    // 微博设置
    common.weibo && (document.title = 'AR魔法祝福视频')
     // 自动跳到第二页
    if (common.token && common.query.shareauth) {
      this.chaiClick()
    }
    share.config = {
      shareTitle: '别再说我没给你发福(hong)利(bao)啦！都在这个魔法祝福视频里～',
      shareDesc: '远离老掉牙群发祝福，献上创意和诚意，看视频也能致富！看你手气啦～',
      shareLink: `//h5.in66.com/inpromo/2017/ar-share/video.html?vid=${this.vid}`,
      shareImg: '//inimg01.jiuyan.info/in/2017/01/20/0109C048-592C-ED60-2E69-8835379165B2.png'
    }
  }
}
