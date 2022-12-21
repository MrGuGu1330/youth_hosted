// 整体布局
import Layout from '../layout/layout.vue'

const aboutRoutes = [
  {
    path: '/about',
    component: Layout,
    redirect: '/about/aboutus',
    children: [
      {
        path: '/about/aboutus',
        name: 'aboutus',
        component: () => import('../views/about/about.vue'),
        meta: {
          title: '关于我们'
        },
      }
    ]
  }
]

export default aboutRoutes