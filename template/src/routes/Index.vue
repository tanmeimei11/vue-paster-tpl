<template>
    <div>
        <div @click="down">aa {{index.nickName}}</div>
         <router-link to="share?c=b" replace>share</router-link>
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
