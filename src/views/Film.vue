<template>
    <div>
        <!-- <swiper>
            <div class="swiper-slide" v-for="n in 10" :key="n">{{n}}</div>
        </swiper> -->
        <filmHeader :class="isFixed?'fixed':''" :isFixed="isFixed"></filmHeader>
        <router-view></router-view>
    </div>
</template>

<script>
// import swiper from '@/views/Film/Swiper'
import filmHeader from '@/views/Film/FilmHeader'
export default {
  data () {
    return {
      isFixed: false
    }
  },
  methods: {
    handleScroll () {
      if (document.documentElement.scrollTop >= 40) {
        this.isFixed = true
      } else {
        this.isFixed = false
      }
    }
  },
  components: {
    // swiper
    filmHeader
  },
  mounted () {
    window.onscroll = this.handleScroll
  },
  beforeDestroy () {
    window.onscroll = null // 解绑事件
  }
}
</script>
