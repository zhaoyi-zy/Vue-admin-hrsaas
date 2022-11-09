import axios from 'axios'
import {Message} from 'element-ui'
import store from '@/store'
import router from '@/router'
import {getTimeStamp} from '@/utils/auth'

const TimeOut = 3600 // 定义超时时间

const service = axios.create({
  // 如果执行 npm run dev  值为 /api正确 /api 这个代理只是给开发环境配置的代理
  // 如果执行 npm run build 值为 /prod-api 生产环境
  baseURL: process.env.VUE_APP_BASE_API, // 设置axios请求的基地址
  timeout: 5000// 设置过期时间
})// 创建axios实例

// 请求拦截器
service.interceptors.request.use(config => {
  // 在这个位置需要统一的去注入token
  if (store.getters.token) {
    // 只有在有token的情况下 才有必要去检查时间戳是否超时
    if (IsCheckTimeOut()) {
      // 如果它为true表示 token过期了
      // 删除token，清除缓存（登出操作已包含二者）
      store.dispatch('user/logout') // 登出操作
      // 跳转到登录页
      router.push('/login')
      return Promise.reject(new Error('Token expired, please log in again!'))
    }
    // 如果token存在 注入token
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config // 必须返回配置
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(response => {
  const {success, message, data} = response.data
  // 要根据success的成功与否决定下面操作
  if (success) {
    // 成功，返回data
    return data
  } else {
    // 走到这里业务已经错误了
    Message.error(message)// 提示错误信息
    return Promise.reject(message)
  }
}, error => {
  // error 信息里 response 对象
  if (error.response && error.response.data && error.response.data.code === 1002) {
    store.dispatch('user/logout') // 退出登录，包含清除token
    router.push('/login')
  } else {
    Message.error(error.message)// 提示错误信息
  }
  return Promise.reject(error)
})
// 是否过期
// 超时逻辑  (当前时间  - 缓存中的时间) 是否大于 时间差
function IsCheckTimeOut() {
  var currentTime = Date.now() // 当前时间戳
  var timeStamp = getTimeStamp() // 缓存时间戳
  return (currentTime - timeStamp) / 1000 > TimeOut
}

export default service// 导出axios实例
