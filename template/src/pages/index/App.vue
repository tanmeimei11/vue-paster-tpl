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

  export default {
    mixins: [diary, track, api],
    created () {
      this.$track('aaa111aa')
      this.$api.getUser()
    }
  }

</script>
<style lang="scss">
  .page {
    background: #fff;
  }

</style>
