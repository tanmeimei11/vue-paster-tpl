<template>
  <div class="console">
    <transition name="console">
      <ul v-if="show" class="logs">
        <li v-for="(log,idx) in logs" v-if="idx<20" :class="log.level">{{log.msg}}</li>
      </ul>
    </transition>
    <a class="logsbtn" href="javascript:;" @click="show = !show" 
       @touchstart="_touchStart" @touchmove.prevent="_touchMove" @touchend="_touchEnd"></a>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        show: false,
        logs: []
      }
    },
    mounted () {
      let oldLog = console.log
      console.log = (...log) => {
        this.logs.unshift({
          level: 'info',
          msg: log.join(' ')
        })
        oldLog.apply(console, log)
      }
    },
    methods: {
      _touchStart (event) {
        var touches = event.touches || event.originalEvent.touches
        if (!touches.length) return
        this.isMoveMode = true
        this.startX = Math.floor(touches[0].pageX)
        this.startY = Math.floor(touches[0].pageY)
      },
      _touchMove (event) {
        var touches = event.touches || event.originalEvent.touches
        if (!touches.length || !this.isMoveMode) return
        let nowX = Math.floor(touches[0].pageX)
        let nowY = Math.floor(touches[0].pageY)
        let style = window.getComputedStyle(event.target)
        event.target.setAttribute('style',
          `right:${(parseInt(style.right) - nowX + this.startX)}px;bottom:${(parseInt(style.bottom) - nowY + this.startY)}px`
        )
        this.startX = nowX
        this.startY = nowY
      },
      _touchEnd (event) {
        this.isMoveMode = false
      }
    }
  }

</script>
<style lang="scss" scoped>
  .console {
    .logsbtn {
      position: fixed;
      right: 10px;
      bottom: 10px;
      @include size(100px);
      border-radius: 20px;
      background: rgb(202, 195, 195);
      &::before {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        @include size(80px);
        border-radius: 50%;
        background: radial-gradient(rgba(255, 255, 255, 1) 80%, rgba(210, 207, 207, 1) 85%, rgba(210, 207, 207, 1) 90%);
      }
    }
    .console-enter-active,
    .console-leave-active {
      transition: transform 0.25s ease-out;
    }
    .console-enter ,
    .console-leave-to {
      transform: translateY(100%)
    }
    .logs {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      max-height: 50%;
      overflow: scroll;
      list-style: none;
      padding: 0;
      margin: 0;
      padding: 0 20px;
      box-sizing: border-box;
      background: #d6d5d4;
      color: #089c08;
      opacity: .8;
      li {
        padding: 20px 0;
        font-size: 24px;
        border-bottom: 1PX solid rgba(0, 0, 0, .4);
        &:last-child {
          border-bottom: none;
        }
      }
    }
  }

</style>
