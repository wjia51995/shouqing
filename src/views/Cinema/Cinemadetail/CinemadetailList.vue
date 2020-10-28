<template>
  <div>
    <swiper class="swiper">
      <div class="swiper-slide" v-for="item in showDate" :key="item">
        {{item | timefilter | listtime}}
      </div>
    </swiper>
  </div>
</template>

<script>
import swiper from './CDLSwiper'
import Vue from 'vue'
Vue.filter('listtime', function (timeobject) {
  if (timeobject.month < 10) {
    timeobject.month = '0' + timeobject.month
  }
  if (timeobject.day < 10) {
    timeobject.day = '0' + timeobject.day
  }
  return timeobject.month + '月' + timeobject.day + '日'
})
export default {
  props: ['showDate'],
  components: {
    swiper
  }
}
</script>

<style scoped>

</style>
