// 整体布局
import Layout from '../layout/layout.vue'

const activityRoutes = [
  {
    path: '/activity',
    component: Layout,
    redirect: '/activity/activityList',
    children: [
      {
        path: '/activity/activityList',
        name: 'activityList',
        component: () => import('../views/activity/activityList.vue'),
        meta: {
          title: '活动列表'
        },
      },
      {
        path: '/activity/activityDetail',
        name: 'activityDetail',
        component: () => import('../views/activity/activityDetail.vue'),
        meta: {
          title: '活动详情'
        }
      }
    ]
  },
]

export default activityRoutes