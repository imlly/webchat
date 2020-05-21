import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import chat from '@/components/chat'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
      meta:{
        title:'Login',    // 网页标题名
      }
    },
    {
      path: '/chat',
      name: 'chat',
      component: chat,
      meta:{
        title:'Chat',
        needLogin:true,   // 需要登录才能进入
      }
    }
  ]
})
