import request from '@/utils/request'

/*
* 登录
* */
export function login(data) {
  // 返回一个axios对象 => promise  // 返回了一个promise对象
  return request({
    url: '/sys/login', // 因为所有的接口都要跨域 表示所有的接口要带 /api
    method: 'post',
    data
  })
}

/*
* 获取用户基本信息
* */
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}
/*
* 获取头像
* */
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
