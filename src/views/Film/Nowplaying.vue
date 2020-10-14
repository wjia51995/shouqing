<template>
    <div>
        <ul>
            <li v-for="data in $store.state.nowplayingList" :key="data.filmId" @click="handleChangePage(data.filmId)">
                <img :src="data.poster" alt="">
                <div class="buy">购票</div>
                <h3>
                  {{data.name}}
                  <span class="type">{{data.item.name}}</span>
                </h3>
                <p v-if="data.grade">
                  观众评分
                  <span style="color: #FFB232">{{data.grade}}</span>
                </p>
                <p v-else class="empty"></p>
                <p class="actors" v-if="data.actors">主演：{{data.actors | actorfilter}}</p>
                <p v-else>暂无主演</p>
                <p class="nation">{{data.nation}}</p>
                <p class="runtime">{{data.runtime}}分钟</p>
            </li>
            <li style="height: 50px"></li>
        </ul>
    </div>
</template>
<script>
import axios from 'axios'
import Vue from 'vue'
Vue.filter('actorfilter', function (data) {
  var newList = data.map(item => item.name)
  newList = newList.join(' ')
  if (newList.length > 18) {
    newList = newList.slice(0, 17) + '...'
  }
  return newList
})
export default {
  data () {
    return {
      dataList: []
    }
  },
  mounted () {
    var cityId = this.$store.state.city.id
    if (this.$store.state.nowplayingList.length === 0) {
      axios({
        url: 'https://m.maizuo.com/gateway?cityId=' + cityId + '&pageNum=1&pageSize=40&type=1&k=4333510',
        headers: {
          'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1598062479827670262710273","bc":"440100"}',
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then(res => {
        // console.log(res.data)
        this.dataList = res.data.data.films
        this.$store.commit('nowplayingMutation', res.data.data.films)
      })
    }
  },
  methods: {
    handleChangePage (id) {
      // console.log(id)
      this.$router.push(`/detail/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
  ul{
    :first-child{
      border-top: solid 1px #EDEDED;
    }
    li{
      margin-left: 15px;
      border-bottom: solid 1px #EDEDED;
      height: 110.765px;
      padding-top: 13.235px;
      overflow: hidden;
      img{
        float: left;
        width: 66px;
        margin-right: 10px;
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
      h3{
        font-size: 16px;
        line-height: 30px;
      }
      p{
        color:#797D82;
        font-size: 13px;
      }
      .actors{
        margin-top: 4px;
      }
      .empty{
        margin-top: 4px;
        height: 13px;
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
      .buy{
        height: 25px;
        line-height: 25px;
        width: 50px;
        color: #ff5f16;
        font-size: 13px;
        text-align: center;
        border: solid 1px #ff5f16;
        border-radius: 2px;
        float: right; margin-right: 10px; margin-top: 41px
      }
    }
  }
</style>
