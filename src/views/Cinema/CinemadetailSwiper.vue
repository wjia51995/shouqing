<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/swiper-bundle.css'
export default {
  mounted () {
    var _this = this
    // console.log(_this)
    /* eslint-disable no-new */
    new Swiper('.filmlist-container', {
      slidesPerView: 4,
      spaceBetween: 20,
      centeredSlides: true,
      slideToClickedSlide: true,
      // 解决刷新后swiper滑动失效问题（数据还没有完全加载的时候就已经渲染swiper了）
      observer: true, // 修改swiper自己或子元素时，自动初始化swiper
      observeParents: true, // 修改swiper的父元素时，自动初始化swiper
      on: {
        slideChangeTransitionStart: function () { // 将activeIndex通过状态管理传给Cinemadetail组件
          var index = this.activeIndex
          _this.$store.commit('cinemadetailswiper/CDSWIPER_INFO', { index })
        }
      }
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
