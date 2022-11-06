import axios from 'axios'// 引入axios
import { Message } from 'element-ui'
const service = axios.create({
  // 如果执行 npm run dev  值为 /api正确 /api 这个代理只是给开发环境配置的代理
  // 如果执行 npm run build 值为 /prod-api 生产环境
  baseURL: process.env.VUE_APP_BASE_API, // 设置axios请求的基地址
  timeout: 5000// 设置超时时间
})// 创建axios实例
// 请求拦截器
service.interceptors.request.use()
// 响应拦截器
service.interceptors.response.use(response => {
  const { success, message, data } = response.data
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
  Message.error(error.message)// 提示错误信息
})
export default service// 导出axios实例
