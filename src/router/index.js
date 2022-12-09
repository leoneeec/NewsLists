import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入并安装组件库
import Vant from 'vant'
import 'vant/lib/index.css'

import Home from '@/views/Home/Home.vue'
import User from '@/views/User/User.vue'

Vue.use(Vant)

Vue.use(VueRouter)

const routes = [

  // Home组件路由规则
  { path: '/', component: Home },

  // User路由组件的规则
  { path: '/user', component: User }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
