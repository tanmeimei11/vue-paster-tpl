<template>
  <div class="page">
    <button @click="diaryOpen('1aVMwEbE')">in记</button>
  </div>
</template>
<script>
  import {
    diary
  } from 'iMixins/inProtocol'
  import {
    api 
  } from 'mixins/api'

  // import { mapActions } from 'vuex'
  export default {
    mixins: [api, diary],
    created () {
      this.$track('Hello world!')
      // this.$api.getUser({page: 1, page_size: 3})
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
