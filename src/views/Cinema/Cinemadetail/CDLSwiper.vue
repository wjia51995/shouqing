<template>
  <div>
      <div class="swiper-container date-container">
        <div class="swiper-wrapper">
            <slot></slot>
        </div>
      </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/swiper-bundle.css'
export default {
  mounted () {
    // console.log(_this)
    /* eslint-disable no-new */
    new Swiper('.date-container', {
      slidesPerView: 4,
      spaceBetween: 20,
      slideToClickedSlide: true
    })
  }
}
</script>

<style scoped>

</style>
