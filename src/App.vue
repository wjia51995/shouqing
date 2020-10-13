<template>
  <div>
    <tabbar v-if="$store.state.isTabbarShow"></tabbar>
    <router-view></router-view>
  </div>
</template>

<script>

// import axios from 'axios'
import tabbar from '@/components/Tabbar'
// import bus from '@/bus'
export default {
  data () {
    return {
      isShow: true
    }
  },
  methods: {

  },
  components: {
    tabbar
  }
  // beforeMount () {
  //   bus.$on('showTabbar', (data) => {
  //     this.isShow = data
  //   })
  // }
}
</script>
<style lang="scss">
  *{
    margin: 0;
    padding: 0;
  }

  html{
    height: 100%;
  }
  li{
    list-style: none;
  }
</style>
