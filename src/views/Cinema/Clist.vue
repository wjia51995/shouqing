<template>
    <div>
        <div class="header">
            <div class="cinemahead">
                <router-link to="/cinema" class="city" tag="div">{{$store.state.city.nm}}▼</router-link>
                <div class="word">影院</div>
                <div class="empty"></div>
            </div>
            <ul>
                <li>全城▼</li>
                <li>APP订票▼</li>
                <li>最近去过▼</li>
            </ul>
        </div>

        <div class="cinema_body">
            <ul>
                <li v-for="item in cinemaInfo" :key="item.cinemaId">
                    {{item.name}}
                    <span class="price">￥{{item.lowPrice/100}}起</span>
                </li>
                <li class="empty"></li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      cinemaInfo: []
    }
  },
  mounted () {
    var cityId = this.$store.state.city.id
    axios({
      url: 'https://m.maizuo.com/gateway?cityId=' + cityId + '&ticketFlag=1&k=410771',
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16021445142742955093786625","bc":"110100"}',
        'X-Host': 'mall.film-ticket.cinema.list'
      }
    }).then(res => {
      console.log(res.data)
      this.cinemaInfo = res.data.data.cinemas
    })
  }
}
</script>

<style lang="scss" scoped>
    .header{
        position: sticky;
        top: 0px;
        background-color: white;
        .cinemahead{
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
    }
    .cinema_body{
        ul{
            li{
                padding: 15px;
                height: 45px;
                .price{
                    float: right;
                    color: #FF7131;
                }
            }
            .empty{height: 50px;}
        }
    }

</style>
