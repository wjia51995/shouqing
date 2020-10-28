import Vue from 'vue'
import VueRouter from 'vue-router'
import Film from '@/views/Film'
import Nowplaying from '@/views/Film/Nowplaying'
import Comingsoon from '@/views/Film/Comingsoon'
import Cinema from '@/views/Cinema'
import Clist from '@/views/Cinema/Clist'
import Cinemadetail from '@/views/Cinema/Cinemadetail'
// import CinemadetailList from '@/views/Cinema/Cinemadetail/CinemadetailList'
import Detail from '@/views/Detail'
import Center from '@/views/Center'
import Register from '@/components/Register'
import Login from '@/components/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/film',
    component: Film,
    children: [
      {
        path: '/film/nowplaying',
        component: Nowplaying
      },
      {
        path: '/film/comingsoon',
        component: Comingsoon
      },
      {
        path: '',
        redirect: '/film/nowplaying'
      }
    ]
  },
  {
    path: '/cinema',
    component: Cinema
  },
  {
    path: '/cinema/clist',
    component: Clist
  },
  {
    path: '/cinemadetail/:id',
    component: Cinemadetail,
    props: true
  },
  {
    path: '/detail/:id', //  /detail/aa 动态路由
    component: Detail,
    props: true
  },
  {
    path: '/center',
    component: Center
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '*',
    redirect: '/film'
  }

]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  base: 'shouqing',
  routes
})

export default router
