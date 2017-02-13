<template>
  <div id="page-index">
    <transition name="fade">
      <div class="c-page-1" v-if="page === 1"> 
        <div class="s-star"></div>
        <div class="s-clound"></div>
        <div class="s-clound-red"></div>
        <div class="s-clound-green"></div>
        <div class="s-swing"></div>
        <div class="s-women-1"></div>
        <div class="s-fuzi"></div>
        <div class="s-women-2"></div>
        <div class="s-bag-back"></div>
        <div class="s-person-snow"></div>
        <div class="s-person-sit"></div>
        <div class="s-repacket"></div>
        <div class="s-pig"></div>

        <!--拆-->
        <div class="s-chai" @click="chaiClick"></div>
      </div>
    </transition>
    <transition  name="fade">
      <div class="c-page-2" v-if="page === 2">
        <Redpkettop :money="money" :all-money="allMoney" :status="status"></Redpkettop>
        <Redpketmid v-for="item in gifs" :item="item"></Redpketmid>
        <Redpketbottom :hot-list="hotList" :new-list="[]"></Redpketbottom>
        <Btn></Btn>
        <Modal v-if="isModal">
          <div class="some-text">请用当前{{modalText}}登录in app或<br>绑定已有in号</div>
        </Modal>
      </div>
    </transition>

    <transition  name="fade">
      <div class="c-page-3" v-if="page === 3">
        <Loginodal ></Loginodal>
      </div>
    </transition>
  
  </div>
</template>
<script src='./index.js'></script>
<style lang="sass" src='./index.scss'></style>
