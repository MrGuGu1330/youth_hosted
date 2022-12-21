// 整体布局
import Layout from '../layout/layout.vue'

const userRoutes = [
  {
    path: '/user',
    component: Layout,
    beforeEnter: (to, from, next) => {
      // let type = JSON.parse(localStorage.getItem('vuex')).type
      let type = JSON.parse(sessionStorage.getItem('vuex')).type
      // if (localStorage.getItem('token') && type == 1) next()
      if (sessionStorage.getItem('token') && type == 1) next()
      else { next('/login') }
    },
    children: [
      {
        path: '/user',
        component: () => import('../views/user/user.vue'),
        redirect: '/user/userInfo',
        children: [
          {
            path: 'userInfo',
            name: 'userInfo',
            component: () => import('../views/user/userinfo.vue'),
            meta: {
              title: '用户信息'
            },

          },
          {
            path: 'orders',
            name: 'orders',
            component: () => import('../views/user/orders.vue'),
            meta: {
              title: '订单信息内容'
            }
          },
          {
            path: 'tracks',
            name: 'tracks',
            component: () => import('../views/user/tracks.vue'),
            meta: {
              title: '足迹内容页'
            },
          },
        ]
      },
      {
        path: '/refreshUser',
        name: 'refreshUser',
        component: () => import('../views/user/refreshUser.vue')
      },
      {
        path: '/refreshOrder',
        name: 'refreshOrder',
        component: () => import('../views/user/refreshOrder.vue')
      },
      {
        path: '/refreshComment',
        name: 'refreshComment',
        component: () => import('../views/user/refreshComment.vue')
      }
    ]
  },
]

export default userRoutes