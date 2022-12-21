// 整体布局
import Layout from '../layout/layout.vue';

const supplierRoutes = [
  {
    path: '/supplier',
    component: Layout,

    beforeEnter: (to, from, next) => {
      // let type = JSON.parse(localStorage.getItem('vuex')).type
      let type = JSON.parse(sessionStorage.getItem('vuex')).type
      // if (localStorage.getItem('token') && type == 2) next()
      if (sessionStorage.getItem('token') && type == 2) next()
      else {
        next('/login')
      }
    },
    redirect: '/supplier/supplierinfo',
    children: [
      {
        path: 'supplierinfo',
        component: () => import('../views/supplier/supplier.vue'),

        meta: {
          title: '旅店信息',
        },
        children: [
          {
            path: '/',
            name: 'aside',
            component: () =>
              import('../views/supplier/components/supplyInfo.vue'),
            meta: {
              title: '侧边栏',
            },
          },
          {
            path: 'order',
            name: '/supplier/supplierinfo/order',
            component: () =>
              import('../views/supplier/components/supplyorder.vue'),
            meta: {
              title: '订单',
            },
          },
          {
            path: 'equip',
            name: '/supplier/supplierinfo/equip',
            component: () =>
              import('../views/supplier/components/supplyequip.vue'),
            meta: {
              title: '旅店设施',
            },
          },
          {
            path: 'list',
            name: '/supplier/supplierinfo/list',
            component: () =>
              import(
                '../views/supplier/components/supplymanage/supplylist.vue'
              ),
            meta: {
              title: '房型列表',
            },
          },
          {
            path: 'publish',
            name: '/supplier/supplierinfo/publish',
            component: () =>
              import(
                '../views/supplier/components/supplymanage/supplypublish.vue'
              ),
            meta: {
              title: '房型发布',
            },
          },
          {
            path: 'updatehouse/:house_id',
            name: '/supplier/supplierinfo/updatehouse',
            component: () =>
              import(
                '../views/supplier/components/supplymanage/updatehouse.vue'
              ),
            meta: {
              title: '房型修改',
            },
          },
        ],
      },
    ],
  },
  {
    path: '/supplier',
    component: () => import('../views/supplier/supplier.vue'),
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/user/refreshUser.vue'),
  },
]

export default supplierRoutes;
