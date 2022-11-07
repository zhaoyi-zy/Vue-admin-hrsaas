import {login} from "@/api/user";
import {getToken, setToken, removeToken} from "@/utils/auth";

export default {
  // 开启命名空间
  namespaced: true,

  state: {
    token: getToken()
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
    }
  },
  actions: {
    async login(context, data) {
      const result = await login(data)
      context.commit('setToken', result)
    }
  }
}
