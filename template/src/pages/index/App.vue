<template>
  <div class="page">
    Welcome
    <iAvatar src="//inimg01.jiuyan.info/in/2015/12/06/50E0D236-8186-87D4-278E-184399C6B81D-1ndoVWb.jpg"></iAvatar>
    {{$store.state.count }}
    <button @click="increment">加一{{$store.state.increTimes}}</button>
    <button @click="decrement">减一{{$store.state.decreTimes}}</button>
    <div>
      userid:{{$store.state.user.id}} <br>name:{{$store.state.user.name}}
    </div>
  </div>
</template>
<script>
  import {
    mapActions
  } from 'vuex'
  export default {
    methods: mapActions([
      'increment',
      'decrement'
    ]),
    created () {
      this.$store.dispatch('getUser')
    }
  }

</script>
<style lang="scss">
  .page {
    background: #fff;
  }

</style>
