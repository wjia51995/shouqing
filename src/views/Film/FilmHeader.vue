<template>
    <div>
        <div v-if="isFixed" class="cityhead">
            <router-link to="/cinema" class="city" tag="div">{{$store.state.city.nm}}▼</router-link>
            <div class="word">电影</div>
            <div class="empty"></div>
        </div>
        <ul>
            <router-link to="/film/nowplaying" tag="li" activeClass="active">正在热映</router-link>
            <router-link to="/film/comingsoon" tag="li" activeClass="active">即将上映</router-link>
        </ul>
    </div>
</template>

<script>
export default {
  props: ['isFixed']
}
</script>

<style lang="scss" scoped>
    .cityhead{
        display: flex;
        height: 44px;
        line-height: 44px;
        border-bottom: solid 1px  #EDEDED;
        .city{
            margin-left: 15px;
            width: 62.09px;
            font-size: 14px;
        }
        .word{
            flex: 1;
            text-align: center;
            font-size: 17px;
        }
        .empty{
            width: 77.09px;
        }
    }
    ul{
        display: flex;
        li{
            flex: 1;
            height: 49px;
            line-height: 49px;
            text-align: center;
            background: white;
            font-size: 14px;
        }
    }
    .active{
        color:#FF5F16;
    }
    .fixed{
        position: fixed;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 49px;
        background: white;
        z-index: 1
    }
</style>
