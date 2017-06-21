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
    track
  } from 'iMixins/inPromo'
  import {
    api 
  } from 'mixins/api'

  import { mapActions } from 'vuex'
  export default {
    mixins: [diary, track, api],
    methods: mapActions([
      'getUser'
    ]),
    created () {
      this.$track('aaa111aa')
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
