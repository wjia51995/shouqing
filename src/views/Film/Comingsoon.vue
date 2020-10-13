<template>
    <div>
        <ul>
            <li  v-for="data in $store.state.comingList" :key="data.filmId" @click="handleChangePage(data.filmId)">
                <img :src="data.poster" alt="">
                <h3>
                  {{data.name}}
                  <span class="type">{{data.item.name}}</span>
                </h3>
                <p class="actors" v-if="data.actors">主演：{{data.actors | actorfilter}}</p>
                <p v-else>暂无主演</p>
                <p>上映日期：{{ data.premiereAt | timefilter | cmstime }}</p>
            </li>
            <li style="height: 50px"></li>
        </ul>
    </div>
</template>
<script>
import Vue from 'vue'
Vue.filter('timefilter', function (time) {
  var d = new Date(time * 1000)
  var year = d.getFullYear()
  var month = d.getMonth() + 1
  var day = d.getDate()
  var week = chineseFromNum(d.getDay())
  return {
    year: year,
    month: month,
    day: day,
    week: week
  }
})
Vue.filter('cmstime', function (timeobject) {
  return '周' + timeobject.week + ' ' + timeobject.month + '月' + timeobject.day + '日'
})
function chineseFromNum (num) {
  var arr = ['日', '一', '二', '三', '四', '五', '六']
  return arr[num]
}
export default {
  data () {
    return {

    }
  },
  methods: {
    handleChangePage (id) {
      // console.log(id)
      this.$router.push(`/detail/${id}`)
    }
  },
  mounted () {
    var cityId = this.$store.state.city.id
    if (this.$store.state.comingList.length === 0) {
      // ajax请求
      this.$store.dispatch('getComingListAction', { cityId: cityId })
    } else {
      console.log('使用缓存数据')
    }
    console.log()
  }
//   methods: {
//     handleChangePage (id) {
//       console.log(id)
//       this.$router.push(`/detail/${id}`)
//     }
//   }
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
        margin-top: 20px;
      }
    }
  }
</style>
