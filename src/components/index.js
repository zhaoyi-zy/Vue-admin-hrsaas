// 公共的组件的全局注册
import PageTools from './PageTools'

export default {
  install(Vue) {
    //  注册全局的通用栏组件对象
    Vue.component('PageTools', PageTools)
  }
}
