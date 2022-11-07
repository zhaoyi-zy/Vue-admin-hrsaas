import {login, getUserInfo} from "@/api/user";
import {getToken, setToken, removeToken} from "@/utils/auth";

export default {
  // 开启命名空间
  namespaced: true,

  state: {
    // 存储token
    token: getToken(),
    // 存储用户信息
    userInfo: {}
  },
  mutations: {
    // 设置token
    setToken(state, token) {
      state.token = token // 设置token  只是修改state的数据  123 =》 1234
      // vuex变化 => 缓存数据
      setToken(token) // vuex和 缓存数据的同步
    },
    // 删除缓存
    removeToken(state) {
      state.token = null // 删除vuex的token
      removeToken() // 先清除 vuex  再清除缓存 vuex和 缓存数据的同步
    },
    // 设置用户信息
    setUserInfo(state, userInfo) {
      state.userInfo = { ...userInfo } // 用 浅拷贝的方式去赋值对象 因为这样数据更新之后，才会触发组件的更新
    },
    // 删除用户信息
    removeUserInfo(state) {
      state.userInfo = {}
    }
  },
  actions: {
    // 登录
    async login(context, data) {
      const result = await login(data)
      context.commit('setToken', result)
    },
    // 获取用户资料action
    async getUserInfo(context) {
      const result = await getUserInfo()  // 获取返回值
      context.commit('setUserInfo', result) // 将整个的个人信息设置到用户的vuex数据中
      return result // 这里为什么要返回 为后面埋下伏笔
    }
  }
}
