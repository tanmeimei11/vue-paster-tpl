<template>
  <div class="user-wrap" :data-uid='uid' @click="getUser(uid)">
    <div class="avatar" :style="{ backgroundImage: 'url(' + avatar + ')'}"></div>
    <div class="nick ">{{nick}}</div>
  </div>
</template>
<script>
import {
  awaken
} from '../assets/utils/jsbridge.js'
export default {
  props: ['avatar', 'nick', 'uid'],
  methods: {
    'getUser' (uid) {
      awaken(`in://diary/other?userid=${uid}`, `in://diary/other?userid=${uid}`)
    }
  }
}

</script>
<style lang="sass">
  .user-wrap {
    box-sizing: border-box;
    margin:  0 34px 40px 34px;
    padding: 30px 10px;
    height: 115px;
    white-space: nowrap;
    background-color: rgb(234, 43, 41);
   
    div {
      display: inline-block;
    }
    .avatar {
      width: 55px;
      height: 55px;
      border-radius: 50%;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      /*vertical-align: super;*/
    }
    .nick {
      margin-left: 15px;
      color: #fff;
      max-width: 450px;
      line-height: 55px;
      font-size: 30px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: top;
    }
  }

</style>
