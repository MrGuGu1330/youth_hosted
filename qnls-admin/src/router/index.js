import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home/index",
  },
  {
    path: "/admin/login",
    name: "/admin/login",
    component: () => import("../views/admin/Login.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
    children: [{
      path: 'index',
      name: '/home/index',
      component: () => import('../views/Index.vue'),
      meta: {
        nav: ['首页']
      }
    }, {
      path: 'supplier-list',
      name: '/home/supplier-list',
      component: () => import('../views/supplier/SupplierList.vue'),
      meta: {
        nav: ['旅店管理', '旅店列表']
      }
    }, {
      path: 'supplier-detail',
      name: '/home/supplier-detail',
      component: () => import('../views/supplier/SupplierDetail.vue'),
      meta: {
        nav: ['旅店管理', '旅店列表', '旅店详情']
      }
    }, {
      path: 'house-list',
      name: '/home/house-list',
      component: () => import('../views/house/HouseList.vue'),
      meta: {
        nav: ['房型管理', '房型列表']
      }
    }, {
      path: 'house-detail',
      name: '/home/house-detail',
      component: () => import('../views/house/HouseDetail.vue'),
      meta: {
        nav: ['房型管理', '房型详情']
      }
    }, {
      path: 'user-list',
      name: '/home/user-list',
      component: () => import('../views/user/UserList.vue'),
      meta: {
        nav: ['用户管理', '用户列表']
      }
    }, {
      path: 'order-list',
      name: '/home/order-list',
      component: () => import('../views/order/OrderList.vue'),
      meta: {
        nav: ['订单管理', '订单列表']
      }
    }, {
      path: "order-detail",
      name: "/home/order-detail",
      component: () => import("../views/order/OrderDetail.vue"),
      meta: {
        nav: ["订单管理", "订单详情"],
      },
    }, {
      path: 'comment-list',
      name: '/home/comment-list',
      component: () => import('../views/comment/CommentList.vue'),
      meta: {
        nav: ['评论管理', '评论列表']
      }
    }, {
      path: 'activity-list',
      name: '/home/activity-list',
      component: () => import('../views/activity/ActivityList.vue'),
      meta: {
        nav: ['活动管理', '活动列表']
      }
    }, {
      path: 'activity-edit',
      name: '/home/activity-edit',
      component: () => import('../views/activity/ActivityEdit.vue'),
      meta: {
        nav: ['活动管理', '编辑活动']
      }
    }, {
      path: 'about-list',
      name: '/home/about-list',
      component: () => import('../views/about/AboutList.vue'),
      meta: {
        nav: ['关于我们', '关于我们详情']
      }
    }, {
      path: 'about-edit',
      name: '/home/about-edit',
      component: () => import('../views/about/AboutEdit.vue'),
      meta: {
        nav: ['关于我们', '修改关于我们']
      }
    }, {
      path: 'admin',
      name: '/home/admin',
      component: () => import('../views/admin/Admin.vue'),
      meta: {
        nav: ['管理员', '管理员详情']
      }
    }]
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path == "/admin/login") {
    next();
  } else {
    if (store.state.user) {
      next();
    } else {
      router.push("/admin/login");
    }
  }
});

export default router;
