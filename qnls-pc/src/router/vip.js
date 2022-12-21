// 整体布局
import Layout from '../layout/layout.vue'

const vipRoutes = [
  {
    path: '/vip',
    component: Layout,
    // redirect: '/vip/vipbuy',
    children: [
      {
        path: '/',
        name: 'vip',
        component: () => import('../views/vip/vip.vue'),
        meta: {
          title: '会员卡',
        },
      },
      {
        path: 'vipbuy',
        name: 'vip/vipbuy',
        component: () => import('../views/vip/vipbuy.vue'),
        meta: {
          title: '会员卡',
        },
      },
      {
        path: 'viprenew',
        name: 'vip/viprenew',
        component: () => import('../views/vip/viprenew.vue'),
        meta: {
          title: '续费',
        },
      },
      {
        path: 'vippolicy',
        name: 'vip/vippolicy',
        component: () => import('../views/vip/vippolicy.vue'),
        meta: {
          title: '优惠',
        },
      },
      {
        path: 'vipquestion',
        name: '/vip/vipquestion',
        component: () => import('../views/vip/vipquestion.vue'),
        meta: {
          title: '问答',
        },
      },
    ],
  },
]

export default vipRoutes
