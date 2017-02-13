<template>
  <div id="page-index">
    <transition  name="fade">
      <div class="c-page-2 in-page" v-if="page === 2">
        <div class="in-top">
          <div class="it-gifs" :class="gifclass"></div>
          <div class="s-star"></div>
          <div class="s-clound"></div>
          <div class="s-clound-red"></div>
          <div class="s-clound-green"></div>
          <div class="s-swing"></div>
          <div class="s-fuzi"></div>
          <div class="s-women-2"></div>
          <div class="s-bag-back"></div>
          <div class="s-person-snow"></div>
          <div class="s-person-sit1"></div>
          <div class="s-person-sit2"></div>
        </div>
        <Redpketbottom :hot-list="hotList" :new-list="newList"></Redpketbottom>
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
