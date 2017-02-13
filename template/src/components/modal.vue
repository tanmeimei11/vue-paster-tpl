<template>
  <div class="judy_package">
    <div class="judy_close" @click="close"></div>
    <div class="judy_pop">
      <slot>
         <div class="some-text">请用当前账号登录in 即可领取</div>
      </slot>
      <div class="judy-in"></div>
    </div>
    <a class="go_down" href="http://www.in66.com/download" @click="goDown"></a>
    <div class="has_in" @click="openInApp"></div>
  </div>
</template>
<script>
import Event from '../assets/utils/event.js'
import { track, default as common } from '../assets/utils/common'
export default{
  methods: {
    'close' () {
      Event.$emit('change-modal')
    },
    'openInApp' () {
      track('h5_entry_ar_openin')
      common.openInApp()
    },
    'goDown' () {
      track('h5_entry_ar_downin')
      common.WeiBo && common.openInApp()
    }
  }
}
</script>
<style lang="sass">
  .judy_package {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    background: rgba(0, 0, 0, 0.7);
    .judy_close {
      width: 53px;
      height: 49px;
      background-size: contain;
      background-image: url(../assets/img/judy_close.png);
      background-repeat: no-repeat;
      position: absolute;
      left: 577px;
      top: 158px;
    }
    .judy_pop {
      width: 750px;
      height: 612px;
      margin: 190px auto 0;
      background-size: contain;
      background-image: url(../assets/img/judy_pop.png);
      background-repeat: no-repeat;
      position: relative;
      p {
        width: 466px;
        height: 45px;
        position: absolute;
        left: 140px;
        top: 356px;
        background-image: url(../assets/img/goin.png);
        background-size: contain;
        background-repeat: no-repeat;
      }
      .some-text{
        position: absolute;
        width: 100%;
        left: 0;
        top: 330px;
        font-size: 30px;
        color: #ffe9d8;
        text-align: center;
        line-height: 1.4;
      }
     p + .some-text{
        position: absolute;
        left: 145px;
        top: 430px;
        font-size: 30px;
        color: #ffe9d8;
        text-align: center;
        line-height: 1.4;
      }
      .judy-in{
        width: 239px;
        height: 121px;
        position: absolute;
        left: 50%;
        top: 420px;
        transform: translate(-50%,0);
        background-image: url(../assets/img/modal.png);
        background-size: contain;
        background-repeat: no-repeat;
      }
    }
    .go_down {
      width: 281px;
      height: 94px;
      background-size: contain;
      background-image: url(../assets/img/go_down.png);
      background-repeat: no-repeat;
      position: absolute;
      left: 75px;
      top: 863px;
    }
    .has_in {
      width: 281px;
      height: 94px;
      background-size: contain;
      background-image: url(../assets/img/has_in.png);
      background-repeat: no-repeat;
      position: absolute;
      left: 386px;
      top: 863px;
    }
  }

</style>
