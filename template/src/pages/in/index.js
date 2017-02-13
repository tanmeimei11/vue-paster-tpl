import Redpkettop from '../../components/redpackettop.vue'
import Redpketmid from '../../components/redpacketmid.vue'
import Redpketbottom from '../../components/redpacketbottom.vue'
import Btn from '../../components/btn.vue'
import Modal from '../../components/modal.vue'
import Loginodal from '../../components/loginmodal.vue'
import { HOTLIST, GIFLIST, HOT } from '../../assets/utils/config'
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
      page: 2,
      hotPage: 1,
      money: '0',
      allMoney: '0',
      isModal: false,
      status: 1,
      notLogin: false,
      modalText: '微信',
      gifs: GIFLIST,
      hotList: HOTLIST,
      isFetch: false,
      newList: [],
      cursor: '',
      giftype: 1
    }
  },
  computed: {
    gifclass: function () {
      this.giftype = Number(common.query._giftype) || 1
      // console.log(this.giftype, common.query._giftype)
      return {
        'gifs1': this.giftype === 1,
        'gifs2': this.giftype === 2,
        'gifs3': this.giftype === 3
      }
    }
  },
  methods: {
    'getPage' () {
      if (this.isFetch) {
        return false
      }
      this.isFetch = true
      fetch(`${HOT}?page=${this.hotPage}&cursor=${this.cursor}`, {
        credentials: 'include'
      })
      .then(res => res.json())
      .then((res) => {
        if (!res.data || !res.data.list.length) {
          this.isFetch = true
          return false
        }
        this.cursor = res.data.cursor
        this.newList.push.apply(this.newList, res.data.list)
        this.hotPage++
        this.isFetch = false
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
    track('h5_entry_ar_in_index')
    // 绑定事件
    Event.$on('change-modal', this.changeModal)
    // 微博设置
    common.weibo && (document.title = 'in AR魔法春节')
    // this.getPage()
    // 下拉加载
    window.onscroll = () => {
      var wh = window.screen.availHeight
      var dh = document.body.clientHeight
      var st = document.body.scrollTop
      // console.log(dh, wh, st)
      if (dh - wh - st < 400) {
        this.getPage()
      }
    }

    share.config = {
      shareTitle: '幸福来的太突然！红包领到手抽筋！',
      shareDesc: '走起…继续抢红包了',
      shareLink: '//h5.in66.com/inpromo/2017/ar-share/index.html',
      shareImg: 'http://inimg01.jiuyan.info/in/2017/01/20/0109C048-592C-ED60-2E69-8835379165B2.png'
    }
    
  }
}