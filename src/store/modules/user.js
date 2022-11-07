import {getToken, setToken} from '@/utils/auth'
import {login, getUserInfo} from '@/api/user'
// 状态
const state = {
  token: getToken(), // 设置token初始状态 token持久化=>放入缓存中
  userInfo: {} // 存储用户个人信息
}
// 修改状态
const mutations = {
  // 设置token
  setToken(state, token) {
    state.token = token // 设置token
    setToken(token)
  },
  // 修改用户信息
  setUserInfo(state, result) {
    state.userInfo = result
  },
//  退出登录 删除用户信息
  removeUserInfo(state) {
    state.userInfo = {}
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
  },
//  获取用户基本信息
  async getUserInfo(context) {
    let result = await getUserInfo()
    context.commit('setUserInfo', result)
    return result
  }
}


export default {
  // 开启命名空间
  namespaced: true,
  state,
  mutations,
  actions
}
