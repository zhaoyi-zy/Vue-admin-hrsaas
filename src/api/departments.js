import request from '@/utils/request'

/*
* 获取组织架构数据
* */
export function getDepartments() {
  return request({
    url: '/company/department'
  })
}

/*
* 获取删除部门接口
* */
export function delDepartments(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}
