<template>
  <div class="red-bottom">
    <div class="rb-title">老司机拍视频都领到<span></span>啦~</div>
    <svideo v-for="item in hotList" :video="item"></svideo>
    <div class="newlist-title" v-if="newList.length != 0"></div>
    <svideo v-for="item in newList" :video="item" isUser="true"></svideo>
  </div>
</template>
<script>
import svideo from './video.vue'
export default {
  props: [
    'hotList',
    'newList'
  ],
  components: {
    svideo
  }
}
</script>
<style lang="sass">
  .red-bottom {
    min-height: 500px;
    background-image: url(../assets/img/vediotop.jpg), url(../assets/img/bg1.jpg);
    background-repeat: no-repeat, repeat-y;
    background-size: 750px 302px, 750px 1443px;
    background-position: left top, 0 300px;
    overflow: hidden;
    
    .rb-title {
      margin: 210px 0 80px 0;
      text-align: center;
      font-size: 45.5px;
      color: #000;
      position: relative;
      span{
          display: inline-block;
          width: 80px;
          height: 48px;
          margin: 0 5px;
          background-image: url(../assets/img/black.png);
          background-repeat: no-repeat;
          background-size: contain;
          vertical-align: text-bottom;
      }
    }
    .newlist-title{
      height: 124px;
      background-image: url(../assets/img/newtext.png);
      background-repeat: no-repeat;
      background-size: contain;
    }
    .rb-title:after {
      content: '';
      position: absolute;
      bottom: -40px;
      left: 50%;
      font-size: 28px;
      width: 431px;
      height: 30px;
      transform: translate(-50%, 0);
      background-image: url(../assets/img/b.png);
      background-repeat: no-repeat;
      background-size: contain;
    }
  }
</style>
