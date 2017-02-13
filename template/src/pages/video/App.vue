<template>
  <div id="page-index">
    <transition name="fade">
      <div class="c-page-1" v-if="page === 1"> 
        <video id="video"
          :poster="vposter"
          :src="vurl"
          x-webkit-airplay="allow" 
          x5-video-player-fullscreen="true" 
          x5-video-player-type="h5" 
          playsinline="" 
          webkit-playsinline=""></video>
          <div class="s-video-curtain" id="videocurtain" @click="videoClick" :class="{'paused' : isPause  }">          
            <div class="s-in" v-if="sence !='yuanxiao'"></div>
            <div class="yuanxiao-btn" v-if="sence =='yuanxiao'" @click="yuanxiaoClick"></div>
            <div class="s-timer" v-if="sence !='yuanxiao'">
              <div class="s-chai chai" @click="chaiClick"></div>
            </div>
          </div>
      </div>
    </transition>
    <transition  name="fade">
      <div class="c-page-2" v-if="page === 2">
        <Redpkettop :money="money" :all-money="allMoney" :status="status"></Redpkettop>
        <Videomid :redpacket="redpacket"></Videomid>
        <Redpketbottom :hot-list="hotList" :new-list="newList"></Redpketbottom>
        <Btn></Btn>
        <Modal v-if="isModal">
          <!--<p></p>-->
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