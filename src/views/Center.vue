<template>
    <div>
        个人中心:
        <div>欢迎：{{$store.state.user.name}} <a href="javascript:;" @touchstart="handleToLogout">退出</a></div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'center',
  methods: {
    handleToLogout () {
      axios({
        url: '/api2/users/logout'
      }).then((res) => {
        var status = res.data.status
        if (status === 0) {
          this.$store.commit('user/USER_NAME', { name: '' })
          this.$router.push('/login')
        }
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    axios.get('/api2/users/getUser').then((res) => {
      var status = res.data.status
      // console.log(res)
      if (status === 0) {
        next(vm => {
          vm.$store.commit('user/USER_NAME', { name: res.data.data.username })
        })
      } else {
        next('/login')
      }
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
