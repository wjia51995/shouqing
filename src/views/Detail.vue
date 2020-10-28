<template>
  <div class="filminfo" v-if="filminfo">
      <div :style="{height: screenWidth / 1.777 + 'px'}" class="container">
        <div class="iconfont iconarrow-left-bold back" @click="goBack"></div>
        <img :src="filminfo.poster" alt="" class="poster" ref="posterimg">
      </div>

      <div>
        <div class="filmmessage">
          <div class="filmname">
            {{filminfo.name}}
            <span class="type">{{filminfo.item.name}}</span>
            </div>
          <p style="line-height: 19px">{{filminfo.category}}</p>
          <p style="line-height: 19px">{{ filminfo.premiereAt | timefilter | detltime }}上映</p>
          <p style="line-height: 19px" class="nation">{{filminfo.nation}}</p>
          <p style="line-height: 19px" class="runtime">{{filminfo.runtime}}分钟</p>
          <p class="synopsis">{{filminfo.synopsis | synopsisfilter}}</p>
        </div>
      </div>

      <div class="member">
        <p>演职人员</p>
      </div>

      <!-- 轮播组件 -->
      <div class="outside">
        <div class="swiper" style="background-color: white">
          <!-- 此处myclassname将属性传给DetailSwiper以识别两个swiper组件 -->
          <swiper perview="4" class="actorswiper" myclassname="actorswiper">
            <div class="swiper-slide" v-for="(data,index) in filminfo.actors" :key="index">
              <img :src="data.avatarAddress" alt="">
              <p>{{data.name}}</p>
            </div>
          </swiper>
        </div>
      </div>

      <div class="stagephoto">
        <p>剧照</p>
      </div>

      <swiper perview="3" class="photoswiper" myclassname="photoswiper" style="background-color: white">
        <div class="swiper-slide" v-for="(data,index) in filminfo.photos" :key="index">
          <img :src="data" alt="">
        </div>
      </swiper>
      <p style="height: 50px"></p>
  </div>
</template>
<script>
import axios from 'axios'
import swiper from './Detail/DetailSwiper'
import Vue from 'vue'
Vue.filter('detltime', function (timeobject) {
  if (timeobject.month < 10) {
    timeobject.month = '0' + timeobject.month
  }
  if (timeobject.day < 10) {
    timeobject.day = '0' + timeobject.day
  }
  return timeobject.year + '-' + timeobject.month + '-' + timeobject.day
})
Vue.filter('synopsisfilter', function (str) {
  return str.slice(0, 62)
})
// import bus from '@/bus'
export default {
  data () {
    return {
      filminfo: null,
      screenWidth: document.body.clientWidth
    }
  },
  methods: {
    goBack () {
      this.$router.back()
      // window.history.back()
    }
  },
  props: ['id'],
  components: {
    swiper
  },
  fliters: {
    synopsisfilter (str) {
      return str.slice(0, 63)
    }
  },
  beforeMount () {
    // bus.$emit('showTabbar', false)
    this.$store.commit('HideMaizuoTabbar', false) // 第一个参数就是mutation名字
  },
  mounted () {
    // console.log(this.$route)
    // console.log('要id获取详情信息', this.$route.params.id, this.id)
    axios({
      url: `https://m.maizuo.com/gateway?filmId=${this.id}&k=7821154`,
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1598062479827670262710273","bc":"441900"}',
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then(res => {
      // console.log(res.data)
      this.filminfo = res.data.data.film
    })
  },
  beforeDestroy () {
    // bus.$emit('showTabbar', true)
    this.$store.commit('ShowMaizuoTabbar', true)
  }
}
</script>
<style lang="scss" scoped>
  .filminfo{
    position: relative;
    background-color: #F4F4F4;
    .back{
      width: 31px;
      height: 31px;
      line-height: 31px;
      text-align: center;
      font-size: 20px;
      border-radius: 50%;
      position: absolute;
      left: 5px;
      top: 5px;
      background-color:#b6b5b4;
    }
  }
  .container{
    overflow: hidden;
    .poster{
      width: 100%;
    }
  }
  .filmmessage{
    background-color: white;
    width: 92.75136vw;
    // height: 37.68024vw;
    padding: 3.6231vw;
    .filmname{
      font-size: 19px;
    }
    p{
      color:#797D82;
      font-size: 13px;
    }
    .nation{
      display: inline;
      border-right: solid 1px ;
      padding-right: 10px;
    }
    .runtime{
      display: inline;
      margin-left: 10px;
    }
    .synopsis{
      margin-top: 10px;
    }
    .outside{
      background-color: white;
      overflow: hidden;
      height: 140px;
    }
  }
  .member{
    background-color: white;
    margin-top: 10px;
    height: 22.5px;
    padding: 15px;
  }
  .stagephoto{
    background-color: white;
    margin-top: 10px;
    height: 62px;
    line-height: 62px;
    padding-left: 15px;
  }
  .type{
    display: inline-block;
    width: 24px;
    height: 18.72px;
    line-height: 20px;
    text-align: center;
    background: gray;
    font-size: 10px;
    color: white;
    border-radius: 3px;
  }
</style>
