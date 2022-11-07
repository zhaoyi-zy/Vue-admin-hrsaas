import {login, getUserInfo, getUserDetailById} from "@/api/user";
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
      state.userInfo = {...userInfo} // 用 浅拷贝的方式去赋值对象 因为这样数据更新之后，才会触发组件的更新
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
      const result = await getUserInfo() // result就是用户的基本资料
      const baseInfo = await getUserDetailById(result.userId) // 为了获取头像
      const baseResult = {...result, ...baseInfo} // 将两个接口结果合并
      // 此时已经获取到了用户的基本资料 迫不得已 为了头像再次调用一个接口
      context.commit('setUserInfo', baseResult) // 提交mutations
      // 加一个点睛之笔  这里这一步，暂时用不到，但是请注意，这给我们后边会留下伏笔
      return baseResult
    },
    // 退出登录
    logout(context) {
      //  删除token
      context.commit('removeToken')
      //  删除用户信息
      context.commit('removeUserInfo')
    }
  }
}
