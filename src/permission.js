// 配置权限拦截 导航守卫

import router from "@/router"; // 引入路由器
import store from "@/store"; // 引入仓库
import nprogress from 'nprogress' // 引入进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式

const whiteList = ['/login', '/404'] // 定义白名单 不受权限控制的页面

// 前置守卫
router.beforeEach(async (to, from, next) => {
  // 开启进度条
  nprogress.start()

  // 判断是否有token
  if (store.getters.token) {
    // 如果有token 免登陆
    if (to.path === '/login') {
      // 是否访问 登录页
      next('/')// 是 ? 跳到主页
    } else {
      if (!store.getters.userId) {
        // 如果没有id这个值 才会调用 vuex的获取资料的action
        await store.dispatch('user/getUserInfo')
        // 为什么要写await 因为我们想获取完资料再去放行
      }
      next() // 不是 ? 放行
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) > -1) {
      // 去的地址在白名单 直接放行
      next()
    } else {
      // 不在白名单 跳到登录页
      next('/login')
    }
  }
  nprogress.done()//代码执行完毕手动关闭一次进度条
})

// 后置守卫
router.afterEach(() => {
  nprogress.done() // 关闭进度条
})
