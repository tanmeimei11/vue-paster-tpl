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
  export default {
    mixins: [diary, track],
    created () {
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
