<template>
    <div>
      <div class="cities">
        <div class="city_list">
          <div class="gps">
            <p>GPS定位你所在城市</p>
            <ul>
              <li>定位失败</li>
            </ul>
          </div>
          <div class="city_hot">
            <p>热门城市</p>
            <ul>
              <li v-for="i in hotList" :key="i.cityId" @click="hanleToCity(i.name, i.cityId)">
                {{i.name}}
              </li>
            </ul>
          </div>
          <div class="city_sort" id="city_sort">
            <div v-for="item in citiesList" :key="item.firstLetter">
              <p>{{item.firstLetter}}</p>
              <ul>
                <li v-for="data in item.list" :key="data.cityId" @click="hanleToCity(data.name, data.cityId)">
                  {{data.name}}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="city_index">
          <ul>
            <li v-for="(item, index) in citiesList" :key="item.firstLetter" @click="gotoIndex(index)">
              {{item.firstLetter}}
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>
<script>
import axios from 'axios'
// import BetterScroll from 'better-scroll'
export default {
  data () {
    return {
      citiesList: [],
      hotList: []
    }
  },
  methods: {
    handleCitiesdata (data) {
    // {'A': [], 'B': [] }
      var cities = []
      var letterList = []
      for (var i = 0; i < data.length; i++) {
        if (data[i].isHot === 1) {
          this.hotList.push(data[i])
        }
      }

      for (var item = 0; item < data.length; item++) {
        var letter = data[item].pinyin.slice(0, 1).toUpperCase()
        var isthere = letterList.indexOf(letter) // 判断首字母是否已存在
        if (isthere === -1) { // 首字母还未添加的情况下进行添加
          letterList.push(letter)
          cities.push({ firstLetter: letter, list: [data[item]] })
        } else { // 首字母已存在，进行归类
          for (var j = 0; j < cities.length; j++) {
            if (cities[j].firstLetter === letter) {
              cities[j].list.push(data[item])
            }
          }
        }
      }
      cities.sort((n1, n2) => {
        if (n1.firstLetter > n2.firstLetter) {
          return 1
        } else if (n1.firstLetter < n2.firstLetter) {
          return -1
        } else {
          return 0
        }
      })
      // console.log(cities)
      this.citiesList = cities
      // 设置localStorage
      window.localStorage.setItem('citiesList', JSON.stringify(this.citiesList))
      window.localStorage.setItem('hotList', JSON.stringify(this.hotList))
    },
    gotoIndex (index) {
      var oDiv = document.getElementById('city_sort')
      var oP = oDiv.getElementsByTagName('p')
      document.documentElement.scrollTop = oP[index].offsetTop - 48
    },
    hanleToCity (nm, id) {
      this.$store.commit('city/CITY_INFO', { nm, id })
      this.$router.push('/film/nowplaying')
      window.localStorage.setItem('nowNm', nm)
      window.localStorage.setItem('nowId', id)
    }
  },
  mounted () {
    var cityList = window.localStorage.getItem('cityList')
    var hotList = window.localStorage.getItem('hotList')

    if (cityList && hotList) { // 判断localStorage是否有数据存在
      this.cityList = JSON.parse(cityList)
      this.hotList = JSON.parse(hotList)
    } else {
      axios({
        url: 'https://m.maizuo.com/gateway?k=7116268',
        headers: {
          'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"159903394860498909331457"}',
          'X-Host': 'mall.film-ticket.city.list'
        }
      }).then(res => {
        // console.log(res.data)
        var cities = res.data.data.cities
        this.handleCitiesdata(cities)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .cities{
    background-color: #F4F4F4;
    .city_list{
      .gps{
        background-color: white;
        p{
          padding-left: 17px;
          padding-bottom: 8px;
        }
        li{
            background-color: #F4F4F4;
            width: 112px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            margin-left: 39.5px;
        }
      }
      .city_hot{
        height: 119px;
        background-color: white;
        p{
          padding-left: 17px;
          padding-bottom: 8px;
        }
        ul{
          margin-left: 32px;
          li{
            background-color: #F4F4F4;
            width: 112px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            float: left;
            margin-left: 7.5px;
            margin-bottom: 15px;
          }
        }
      }
      .city_sort{
        p{
          height: 30px;
          line-height: 30px;
          padding-left: 17px;
        }
        li{
          height: 48px;
          line-height: 48px;
          padding-left: 17px;
          background-color: white;
        }
      }
    }
    .city_index{
      ul{
        background-color: white;
        position: fixed;
        top: 120px;
        right: 0;
        li{
          width: 20px;
          text-align: center;
        }
      }
    }
  }

</style>
