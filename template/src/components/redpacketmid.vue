<template>
    <div class="red-middle" :data-title="item.title" :data-s-title="item.stitle">
        <div class="rm-main-panel" :style="{ backgroundImage: 'url(' + item.url + ')'}">
        </div>
    </div>
</template>
<script>
export default {
  props: ['item']
}
</script>
<style lang="sass">
.red-middle{
    margin-top:-2PX;
    width: 100%;
    height: 821px;
    background-image: url(../assets/img/gifmain.jpg);
    background-repeat: no-repeat;
    background-size:cover; 
    position: relative;
    overflow: hidden;
    .rm-main-panel{
        width: 624px;
        height: 654px;
        background-color: #fff;
        margin: 135px auto 0 auto;
        position: relative;
        background-repeat: no-repeat;
        background-size: cover; 
    }
    .rm-main-panel:before{
        content:"";
        position: absolute;
        width: 585px;
        height: 619px;
        top:0;
        left: 0;
        right: 0;
        bottom:0;
        margin: auto;
        background-image: url(../assets/img/kuang.png);
        background-repeat: no-repeat;
        background-size:cover; 
    }
    
}
.red-middle:nth-child(2){
    .rm-main-panel{
        animation: gifs1 4s steps(27,end) infinite;
    }
}
.red-middle:nth-child(3){
    .rm-main-panel{
        animation: gifs 5s steps(22,start) infinite;
    }
}
.red-middle:nth-child(4){
    .rm-main-panel{
        animation: gifs 5s steps(16,start) infinite;
    }
}
.red-middle:before{
    content:attr(data-title);
    position: absolute;
    top:30px;
    left: 50%;
    transform:translate(-50%,0);
    color: #ffe051;
    font-size: 28px;
}
.red-middle:after{
    content:attr(data-s-title);
    position: absolute;
    top: 70px;
    left: 50%;
    transform:translate(-50%,0);
    color: #ffe051;
    font-size: 40px;
}
.red-middle:nth-child(2):after{
    padding-right:75px;
    background-image: url(../assets/img/red.png);
    background-repeat: no-repeat;
    background-size: 73px 44px;
    background-position: right center;
}
@keyframes gifs{
    0%{
        background-position: 0 0;
    }
    100%{
        background-position: 100% 0;
    }
}
@keyframes gifs1{
    0%{
        background-position: 0 0;
    }
    80%{
        background-position: 100% 0;
    }
    100%{
        background-position: 100% 0;
    }
}
</style>