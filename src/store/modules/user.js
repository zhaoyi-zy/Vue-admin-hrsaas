import {getToken, setToken} from '@/utils/auth'
import {login} from '@/api/user'
// 状态
const state = {
  token: getToken()// 设置token初始状态 token持久化=》放入缓存中
}
// 修改状态
const mutations = {
  // 设置token
  setToken(state, token) {
    state.token = token // 设置token
    setToken(token)
  }
}
// 执行异步
const actions = {
  // 定义login action 也需要参数 调用action时 传递过来的参数
  async login(context, data) {
    const result = await login(data)
    // 登录成功 用户名和密码验证通过,响应拦截器中已经做了判断
    // 把登录成功的用户token存储到vuex
    context.commit('setToken', result)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
