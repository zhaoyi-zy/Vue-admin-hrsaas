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

/*
* 获取部门的详情
* */
export function getDepartDetail(id) {
  return request({
    url: `/company/department/${id}`

  })
}

/*
* 获取编辑部门接口
* */
export function updateDepartments(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}
