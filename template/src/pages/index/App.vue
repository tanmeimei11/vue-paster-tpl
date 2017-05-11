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
  } from 'mixins/protocol'
  export default {
    mixins: [diary],
    methods: {
      ...mapActions([
        'increment',
        'decrement'
      ])
    },
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
