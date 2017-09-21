<template>
    <div>
        <div @click="down">aa {{index.nickName}}</div>
         <dva-link to="share?c=b" replace>share</dva-link>
    </div>
</template>
<script>
    export default {
      connect: true,
      methods: {
        down () {
          this.dispatch({type: 'index/getUser', payload: 'aa'}).then(() => console.log('done'))
        }
      }
    }
</script>
<style lang="scss">
 .page {
   background: #fff;
   @include size(100px);
 }
</style>
