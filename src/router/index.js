import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/system',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
    children: [
      {
        path: '/system/data-upload',
        name: '数据上传',
        component: () => import('../views/Home/DataUpload.vue')
      },
      {
        path: '/system/data-list',
        name: '数据列表',
        component: () => import('../views/Home/DataList.vue')
      },
      {
        path: '/system/auth',
        name: '权限管理',
        component: () => import('../views/Home/Auth.vue')
      },
      {
        path: '/system/auth-manager',
        name: '权限管理2',
        component: () => import('../views/Home/AuthManager.vue')
      },
      {
        path: '/system/',
        name: '欢迎页',
        component: () => import('../views/Home/Welcome.vue')
      },

    ]
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/',
    component: () => import('../views/Home.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
