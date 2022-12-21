import Vue from 'vue'
import VueRouter from 'vue-router'
// 整体布局
import Layout from '../layout/layout.vue'

// 首页
import Home from '../views/home/home.vue'
// 在线预定
import bookingRoutes from './booking'
// 会员卡
import vipRoutes from './vip'
// 最新活动
import activityRoutes from './activity'
// 关于我们
import aboutRoutes from './about'
// 个人中心 - 用户
import userRoutes from './user'
// 个人中心 - 旅店
import supplierRoutes from './supplier'

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: '404',
    component: () => import('../views/404/404.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue')
  },
  {
    path: '/vipPayResult',
    name: 'vipPayResult',
    component: () => import('../views/pay/vipPayResult.vue')
  },
  {
    path: '/bookingPayResult',
    name: 'bookingPayResult',
    component: () => import('../views/pay/bookingPayResult.vue')
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
          title: '首页'
        },
      },
      {
        path: '/home/homeDifferent.vue',
        name: 'home/homeDifferent.vue',
        component: () => import('../views/home/homeDifferent.vue'),
        meta: {
          title: '不同之处'
        },
      },
      {
        path: '/home/applyForJoining.vue',
        name: 'home/applyForJoining.vue',
        component: () => import('../views/home/ApplyForJoining.vue'),
        meta: {
          title: '旅店入驻'
        },
      },

      // {
      //   path: '/home/joincost.vue',
      //   name: 'home/joincost.vue',
      //   component: () => import('../views/home/JoinCost.vue'),
      //   meta: {
      //     title: '首页'
      //   },
      // },
    ]
  },
  ...bookingRoutes,
  ...vipRoutes,
  ...activityRoutes,
  ...aboutRoutes,
  ...userRoutes,
  ...supplierRoutes,
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
