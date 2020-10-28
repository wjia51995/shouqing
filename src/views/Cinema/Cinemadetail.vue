<template>
  <div>
    <div class="header-left">
      <img src="@/assets/img/left.png" @click="goBack">
    </div>
    <div class="header-title">{{cinemaInfo.name}}</div>
    <div class="cinema-info">
        <ul>
            <li v-for="(item,index) in cinemaInfo.services" :key="index">
                {{item.name}}
            </li>
            <li v-if="cinemaInfo.services">&gt;</li>
        </ul>
        <div class="adress">
            <img src="@/assets/img/location.png"/>
            <div class="address-info" v-if="cinemaInfo">{{cinemaInfo.address | addressfilter }}</div>
        </div>
    </div>
    <swiper class="swiper">
      <div class="swiper-container filmlist-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item, index) in filmsInfo" :key="index">
            <img :src="item.poster">
          </div>
        </div>
      </div>
    </swiper>
    <div class="film-info" v-for="(item, index) in filmsInfo" :key="index" @click="turnTodetail(item.filmId)">
      <div class="film-head" v-if="index===$store.state.cinemadetailswiper.index">
        <span class="film-name">{{item.name}}</span>
        <span class="film-grade">{{item.grade}}</span>
        <span class="film-grade-unit">分</span>
        <span class="film-right">&gt;</span>
      </div>
      <div class="film-desc" v-if="index===$store.state.cinemadetailswiper.index">
        <span>{{fDetail(item.category, item.runtime, item.director, item.synopsis)}}</span>
      </div>
      <div class="film-time-list" v-if="index===$store.state.cinemadetailswiper.index">
        <cinemadetaillist :show-date="item.showDate"></cinemadetaillist>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import swiper from './CinemadetailSwiper'
import cinemadetaillist from './Cinemadetail/CinemadetailList'
Vue.filter('addressfilter', function (str) {
  if (str.length > 22) {
    str = str.slice(0, 22) + '...'
  }
  return str
})
export default {
  data () {
    return {
      cinemaInfo: '',
      filmsInfo: ''
    }
  },
  methods: {
    goBack () {
      window.history.back()
    },
    fDetail (category, runtime, director, synopsis) {
      var str = category + '|' + String(runtime) + '分钟' + '|' + director + '|' + synopsis
      if (str.length > 28) {
        str = str.slice(0, 28) + '...'
      }
      return str
    },
    turnTodetail (id) {
      this.$router.push(`/detail/${id}`)
    }
  },
  components: {
    swiper,
    cinemadetaillist
  },
  props: ['id'],
  beforeMount () {
    // 进入该页面时，tabbar组件不显示
    this.$store.commit('HideMaizuoTabbar', false)
  },
  mounted () {
    axios({
      url: 'https://m.maizuo.com/gateway/?cinemaId=' + this.id + '&k=1485300',
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1602199108314726613516289","bc":"310100"}',
        'X-Host': 'mall.film-ticket.cinema.info'
      }
    }).then(res => {
      this.cinemaInfo = res.data.data.cinema
    })
    axios({
      url: 'https://m.maizuo.com/gateway/?cinemaId=' + this.id + '&k=737964',
      headers: {
        'X-Client-Info': ' {"a":"3000","ch":"1002","v":"5.0.4","e":"1602199108314726613516289","bc":"310100"}',
        'X-Host': 'mall.film-ticket.film.cinema-show-film'
      }
    }).then(res => {
      console.log(res.data.data.films)
      this.filmsInfo = res.data.data.films
    })
  },
  beforeDestroy () {
    this.$store.commit('ShowMaizuoTabbar', true)
  }
}
</script>

<style lang="scss" scoped>
    .header-left{
       height: 18px;
       padding: 13px;
       img{
         width: 11px;
         height: 18px;
       }
    }
    .header-title{
        width: 100%;
        height: 44px;
        line-height: 44px;
        text-align: center;
        font-size: 17px;
    }
    .cinema-info{
        ul{
            display: flex;
            justify-content: center;
            :last-child{
                border: none;
            }
            li{
                float: left;
                padding: 0 6px;
                margin: 0 2.5px;
                color: #ffb232;
                font-size: 10px;
                border: solid 1px #ffb232;
            }
        }
    }
    .adress{
        width: 100%;
        height: 50px;
        margin-top: 25px;
        img{
            width: 14px;
            height: 21px;
            float: left;
            margin-left: 15px;
        }
        div{
            margin-left: 40px;
        }
    }
  .swiper-wrapper{
    img{
    width: 100%;
    }
  }
  .swiper-container {
    width: 100%;
    height: 100%;
  }
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  transition: 300ms;
  transform: scale(0.8);
  }
  .swiper-slide-active,.swiper-slide-duplicate-active{
    transform: scale(1);
  }
  .film-info{
    .film-head{
      position: relative;
      text-align: center;
      margin-top: 10px;
      .film-grade{
        font-size: 16px;
        font-style: italic;
        color: #ffb232;
        margin-left: 10px;
      }
      .film-grade-unit{
        font-size: 10px;
        color: #ffb232;
        margin-left: 5px;
      }
      .film-right{
        position: absolute;
        top: 10px;
        right: 15px;
        color: #797d82;
      }
    }
    .film-desc{
      margin-top: 5px;
      text-align: center;
      span{
        font-size: 13px;
        color: #797d82;
      }
    }
    .film-time-list{
      margin-top: 20px;
    }
  }
</style>
