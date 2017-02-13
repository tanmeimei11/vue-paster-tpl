<template>
  <div class="btn-contanner">
    <div class="bc-btn">
      <div class="bc-text" @click="btnClick"></div>
    </div>
  </div>
</template>
<script>
  import {
    track,
    default as common
  } from '../assets/utils/common'
  import Event from '../assets/utils/event.js'
  import {
    awaken
  } from '../assets/utils/jsbridge.js'
  export default {
    methods: {
      btnClick () {
        track('h5_entry_ar_morefive')
        if (common.InApp) {
          if (common.LessThanVer('2.9.98')) {
            alert('你个小妖孽，升级版本才能体验最新服务哦～')
            location.href = 'http://www.in66.com/download'
            return false
          }
          // 调用协议
          // 29-30
          var _day = new Date().getDate()
          var _pro = 'in://camera?type=ar&scene=new_year_red_packet'
          if (_day > 28 && _day < 31) {
            _pro = 'in://camera?type=ar&scene=give_new_year_greeting'
          } else if (_day > 30 || _day < 4) {
            _pro = 'in://camera?type=ar&scene=find_god_of_fortune'
          }

          if (_day === 27) {
            _pro = 'in://camera?type=ar&scene=give_new_year_greeting'
          } else if (_day === 28) {
            _pro = 'in://camera?type=ar&scene=find_god_of_fortune'
          }
          // console.log(_pro)
          awaken(_pro)
          return false
        }
        let text = common.weixin ? '微信' : '微博'
        Event.$emit('change-modal', text)
      }
    }
  }

</script>
<style lang="sass">
  .btn-contanner {
    position: fixed;
    z-index: 100;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 270px;
    background: linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%);
    .bc-btn {
      width: 526px;
      height: 168px;
      margin: 48px auto 0 auto;
      background-image: url(../assets/img/big-btn.png);
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      position: relative;
      cursor: pointer;
    }
    .bc-btn:before {
      content: "";
      width: 270px;
      height: 178px;
      position: absolute;
      z-index: 100;
      bottom: 35px;
      left: -37px;
      background-image: url(../assets/img/pig-btn.png);
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
    }
    .bc-text {
      width: 100%;
      height: 108px;
      box-sizing: border-box;
      padding-left: 35px;
      position: absolute;
      bottom: 6px;
      left: 0;
      line-height: 108px;
      z-index: 100;
      text-align: center;
      color: #fff;
      font-size: 40px;
      span {
        color: #ffe051;
      }
    }
  }

</style>
