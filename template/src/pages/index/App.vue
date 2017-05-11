<template>
  <div class="page">
    Welcome
    {{$store.state.count}}
    <button @click="increment" >加一{{$store.state.increTimes}}</button>
    <button @click="decrement">减一{{$store.state.decreTimes}}</button>
    <div>
      userid:{{$store.state.user.id}} <br>name:{{$store.state.user.name}}
    </div>
    <Console></Console>
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
