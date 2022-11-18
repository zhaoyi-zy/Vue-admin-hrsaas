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
* 删除部门接口
* */
export function delDepartments(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}

/*
* 新增部门接口
* */
export function addDepts(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}
