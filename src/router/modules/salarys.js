// 员工模块路由

import Layout from "@/layout";

export default {
  path: '/salarys', // 路径
  name: 'salarys', // 给路由规则加一个name, 后面做权限使用
  component: Layout, // 组件
  // 配置二级路的路由表
  children: [{
    path: '', // 当二级路由的path什么都不写 表示该路由为当前二级路由的默认路由
    component: () => import('@/views/salarys'),
    // 路由元信息  其实就是存储数据的对象 可以在这里放置一些信息
    meta: {
      title: '工资' // meta属性的里面的属性 随意定义 为什么用title， 左侧导航会读取我们的路由里的meta里面的title作为显示菜单名称
    }
  }]
}
