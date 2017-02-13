<template>
  <div class="video-user-wrap">
    <div class="video-wrap" :class="{userin:isUser}">
      <video 
      :src="video.url" 
      :poster="video.cover_url" 
      x-webkit-airplay="allow" 
      x5-video-player-fullscreen="true" 
      x5-video-player-type="h5" 
      @click="videoPaused"
      ></video>
      <div class="rb-play"  v-if="isPlay" @click="videoPlay" :style="{backgroundImage: 'url(https://inimg02.jiuyan.info/in/2017/01/19/A5FADECD-1453-825F-8552-96C12EC387A8.png),url(' +video.cover_url + ')'}"></div>
    </div>
    <user-line v-if="isUser" :avatar="video.avatar" :nick="video.nick_name" :uid="video.user_id"></user-line>  
  </div>
</template>
<script>
import UserLine from './user.vue'
export default {
  props: ['video', 'isUser'],
  components: {
    UserLine
  },
  data () {
    return {
      isPlay: true,
      _video: {}
    }
  },
  methods: {
    'videoPlay' (e) {
      this._video = e.target.previousElementSibling
      this._video.play()
      this.isPlay = false
      this._video.onended = this._video.onpause = () => {
        console.log('end')
        this.isPlay = true
      }
    },
    'videoPaused' () {
      this._video.paused ? this._video.play() : this._video.pause()
    }
  }
}

</script>
<style lang="sass">
.video-user-wrap{position: relative}
  .video-wrap {
    width: 682px;
    height: 430px;
    margin: 0 auto 40px auto;
    position: relative;
    box-sizing: border-box;
    &.userin{
      margin: 0 auto;
      border: 6px solid rgb(234,43,41)!important;
    }
    video {
      width: 100%;
      height: 100%;
    }
    .rb-play {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      /*background-color: rgba(0, 0, 0, 0.8);*/
      background-image: url(https://inimg02.jiuyan.info/in/2017/01/19/A5FADECD-1453-825F-8552-96C12EC387A8.png);
      background-repeat: no-repeat;
      background-size: 110px 110px, cover;
      background-position: center;
      /*pointer-events: none;*/
    }
  }
  .video-user-wrap:nth-child(odd) .video-wrap{
    border: 6px solid rgb(218,166,9); 
  }
  .video-user-wrap:nth-child(even) .video-wrap{
    border: 6px solid rgb(234,43,41); 
  }
  .video-user-wrap:last-child{
    margin-bottom: 300px;
  }

</style>
