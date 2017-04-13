<template>
  <div class="page">
    Welcome
    <iAvatar src="//inimg01.jiuyan.info/in/2015/12/06/50E0D236-8186-87D4-278E-184399C6B81D-1ndoVWb.jpg"></iAvatar>
    {{#if_eq vuex "yes"}}
    \{{$store.state.count }}
    <button @click="increment">加一\{{$store.state.increTimes}}</button>
    <button @click="decrement">减一\{{$store.state.decreTimes}}</button>
    <div>
      userid:\{{$store.state.user.id}} <br>name:\{{$store.state.user.name}}
    </div>
    {{/if_eq}}
  </div>
</template>
<script>
  {{#if_eq vuex "yes"}}
  import {
    mapActions
  } from 'vuex'
  {{/if_eq}}
  export default {
    {{#if_eq vuex "yes"}}
    methods: mapActions([
      'increment',
      'decrement'
    ]),
    created () {
      this.$store.dispatch('getUser')
    }
    {{/if_eq}}
  }

</script>
<style lang="scss">
  .page {
    background: #fff;
  }

</style>
