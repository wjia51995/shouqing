import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import city from './city'
import user from './user'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 自定义的共享状态
    isTabbarShow: true,
    comingList: [],
    nowplayingList: []
  },
  mutations: { // 唯一修改状态的位置
    HideMaizuoTabbar (state, data) {
      state.isTabbarShow = data
    },
    ShowMaizuoTabbar (state, data) {
      state.isTabbarShow = data
    },
    comingListMutation (state, data) {
      state.comingList = data
    },
    nowplayingMutation (state, data) {
      state.nowplayingList = data
    }
  },
  actions: {
    // 异步处理
    getComingListAction (store, { object }) {
      axios({
        url: 'https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=40&type=2&k=6367644',
        headers: {
          'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1598062479827670262710273"}',
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then(res => {
        // console.log(res.data)
        store.commit('comingListMutation', res.data.data.films)
      })
    }
  },
  modules: {
    city,
    user
  }
})
