<template>
  <div class="dialog-wrap">
    <div class="dialog-main">
      <div class="d-text">在微信或微博才能领红包哟~赶快分享吧</div>
    </div>
  </div>
</template>
<script>
  export default {
  }

</script>
<style lang="sass">
  .dialog-wrap {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
    overflow: hidden;
  }
  .dialog-main{
    width: 308*2px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 16*2px;
    .d-text{
      margin: 100px auto;
      width: 246*2px;
      text-align: center;
      font-family: HYQiHei-EES;
      font-size: 16*2px;
      line-height: 45px;
      color: #333333;
    }
  }

</style>
