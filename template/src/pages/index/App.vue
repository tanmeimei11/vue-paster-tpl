<template>
  <div class="page">
    <button v-iLinkUser="`1aVMwEbE`" >in记</button>
  </div>
</template>
<script>
  // api 通过mixin的方式引用
  import {
    api 
  } from 'mixins/api'
  // 协议通过指令的方式引用
  import iLinkUser from 'iProtocols/User'

  export default {
    mixins: [api],
    directives: { 
      iLinkUser
    },
    created () {
      this.$track('helloWorld!')
      this.$api.getUser({page: 1, page_size: 3})
      this.$api.getUserPost({page: 1, page_size: 3})
      // this.polling({name: 'getUser'})
      // this.getUser()
    }
  }
</script>
<style lang="scss">
  .page {
    background: #fff;
  }
</style>
