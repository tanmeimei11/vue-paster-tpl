<template>
  <div class="page">
    Welcome {{$store.state.count}}
    <button class="add" @click="increment">加一{{$store.state.increTimes}}</button>
    <button @click="decrement">减一{{$store.state.decreTimes}}</button>
    <button @click="diaryOpen('1aVMwEbE')">in记</button>
    <div>
      userid:{{$store.state.user.id}} <br>name:{{$store.state.user.name}}
    </div>
  </div>
</template>
<script>
  import {
    mapActions
  } from 'vuex'
  import {
    diary
  } from 'iMixins/inProtocol'
  import {
    track
  } from 'iMixins/inPromo'
  export default {
    mixins: [diary, track],
    methods: {
      ...mapActions([
        'increment',
        'decrement'
      ])
    },
    created () {
      this.$store.dispatch('getUser')
      this.$utils.track('aa')
      this.$track('aaa111aa')
    }
  }

</script>
<style lang="scss">
  .page {
    background: #fff;
  }

</style>
