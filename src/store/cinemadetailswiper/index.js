const state = {
  index: 0
}
const actions = {

}

const mutations = {
  CDSWIPER_INFO (state, payload) {
    state.index = payload.index
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
