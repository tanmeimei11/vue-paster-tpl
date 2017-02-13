<template>
    <div class="video-middle">
        <div class="vm-main-panel">
            <div class="vm-one-line" v-for="item in redpacket">
                <div class="vm-avatar" :style="{backgroundImage: 'url(' + item.avatar + ')'}"></div>
                <div class="vm-nick">{{item.nick_name}}</div>
                <div class="vm-money">斩获了<span>{{item.money}}</span>元现金</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  props: ['redpacket']
}
</script>
<style lang="sass">
.video-middle{
    margin-top:-2PX;
    width: 100%;
    position: relative;
    overflow: hidden;
    background-color: rgb(234, 43, 41);
    .vm-main-panel{
        width: 638px;
        margin: 20px auto 80px auto;
        position: relative;
        overflow: hidden;
    }
    .vm-one-line{
        height: 62px;
        padding: 25px 0;
        background-image: url(../assets/img/line.png);
        background-repeat: no-repeat;
        background-size: 634px 17px; 
        background-position:bottom center;
    }
    .vm-avatar{
        display: inline-block;
        vertical-align: middle;
        width: 62px;
        height: 62px;
        border-radius: 50%;
        margin-right: 20px;
        background-image: url(../assets/img/pig.png);
        background-repeat: no-repeat;
        background-size: cover; 
        background-position: center;
    }
    .vm-nick{
        display: inline-block;
        vertical-align: middle;
        line-height: 62px;
        font-size: 28px;
        color: #ffe9d8;
        max-width: 280px;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
    }
    .vm-money{
        float: right;
        vertical-align: middle;
        line-height: 62px;
        font-size: 28px;
        color: #ffe9d8;
        max-width: 250px;
        white-space: nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
        span{
            color: #ffca00;
        }
    }
}
/*.video-middle:before{
    content:attr(data-title);
    position: absolute;
    top:30px;
    left: 50%;
    transform:translate(-50%,0);
    color: #ffe051;
    font-size: 28px;
}
.video-middle:after{
    content:attr(data-s-title);
    position: absolute;
    top: 70px;
    left: 50%;
    transform:translate(-50%,0);
    color: #ffe051;
    font-size: 40px;
}*/
</style>