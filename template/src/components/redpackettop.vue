<template>
  <div class="red-top">
    <div class="rt-money" v-bind:class="statusClass" v-html="moneyText"></div>
    <div class="rt-all-money">{{allMoney}}</div>
  </div>
</template>
<script>
  export default {
    props: [
      'money',
      'allMoney',
      'status'
    ],
    data () {
      return {
        statusList: [
          '',
          '领取成功',
          '领取失败',
          '您已经拆过TA的<span></span>啦~',
          '您已斩获了三个<span></span><br>快登录in领取吧',
          '啊哦~来迟了~<br>TA的<span></span>被抢光啦！'
        ],
        moneyText: ''
      }
    },
    computed: {
      'moneyText': function () {
        if (this.status === 1) {
          return `${this.money}<span>元</span>`
        }
        return this.statusList[this.status]
      },
      'statusClass': function () {
        return {
          'status1': this.status === 1,
          'status2': this.status !== 1
        }
      }
    }
  }

</script>
<style lang="sass">
  .red-top {
    width: 100%;
    height: 547px;
    background-image: url(../assets/img/page2.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
    text-align: center;

    .rt-money {
        width:414px;
        height: 185px;
        text-align: center;
        margin: 190px auto 0 auto;
        color: #010101;
        font-size: 42px;
        box-sizing: border-box;
        padding-top: 55px;
        &.status1{
          padding-top: 0;
          color: #ea2b29;
          font-size: 115px;
          position: relative;
          span{
            font-size: 52px;
            display: inline-block;
            vertical-align: middle;
         }
        }
        &.status1:before{
          content:"由in app提供";
          font-size: 28px;
          color: #000;
          font-weight: 700;
          position: absolute;
          bottom: 15px;
          left: 50%;
          transform: translate(-50%,0);
        }
        &.status2{
          span{
              display: inline-block;
              width: 80px;
              height: 48px;
              margin: 0 5px;
              background-image: url(../assets/img/black.png);
              background-repeat: no-repeat;
              background-size: contain;
              vertical-align: bottom;
          }
        }

    }
    .rt-all-money {
        display: inline-block;
        color: #ea2b29;
        vertical-align: baseline;
        font-size: 30px;
        line-height: 38px;
        background-image: url(../assets/img/lefttext.png), url(../assets/img/righttext.png);
        background-repeat: no-repeat;
        background-size: 266px 38px, 75px 38px;
        background-position: left center, right center;
        height: 38px;
        padding: 0 75px 0 266px;
    }
  }

</style>
