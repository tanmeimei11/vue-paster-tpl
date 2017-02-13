import Redpkettop from '../../components/redpackettop.vue'
import Redpketmid from '../../components/redpacketmid.vue'
import Redpketbottom from '../../components/redpacketbottom.vue'
import Btn from '../../components/btn.vue'
import Modal from '../../components/modal.vue'
import Loginodal from '../../components/loginmodal.vue'
import { CHAI, HOTLIST, GIFLIST } from '../../assets/utils/config'
import Event from '../../assets/utils/event.js'
import { share, track, default as common } from '../../assets/utils/common.js'

export default {
  name: 'app',
  components: {
    Redpkettop,
    Redpketmid,
    Redpketbottom,
    Btn,
    Modal,
    Loginodal
  },

  data () {
    return {
      page: 1,
      money: '0',
      allMoney: '0',
      isModal: false,
      status: 1,
      notLogin: false,
      modalText: '微信',
      gifs: GIFLIST,
      hotList: HOTLIST
    }
  },
  methods: {
    'chaiClick' () {
      track('h5_entry_ar_chaiclick')
      // 不在微信和微博 in 的时候
      if (!(common.weixin || common.weibo || common.InApp)) {
        this.page = 3
        return false
      }
      // 第一次请求数据
      fetch(`${CHAI}?vid=1&h5url=${common.curUrl}`, {
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
        this.page = 2
      })
      .catch(res => {
        console.log('网络开小差了~')
      })
    },
    'changeModal' (text) {
      this.isModal = !this.isModal
      this.modalText = text
    }
  },
  created () {
    if (common.weibo) {
      this.modalText = '微博'
    }

    // 埋点请求
    track('h5_entry_ar_index')
    // 绑定事件
    Event.$on('change-modal', this.changeModal)
    // 微博设置
    console.log(common)
    common.weibo && (document.title = 'in AR魔法春节')

    // 自动跳到第二页
    if (common.token && common.query.shareauth) {
      this.chaiClick()
    }
    console.log(share)
    share.config = {
      shareTitle: '幸福来的太突然！红包领到手抽筋！',
      shareDesc: '走起…继续抢红包了',
      shareLink: '//h5.in66.com/inpromo/2017/ar-share/index.html',
      shareImg: 'http://inimg01.jiuyan.info/in/2017/01/20/0109C048-592C-ED60-2E69-8835379165B2.png'
    }
  }
}
