<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构内容 - 头部 -->
      <el-card class="tree-card">
        <!-- 放置结构内容 -->
        <treeTools :tree-node="company" :is-root="true"/>
        <el-tree
          :data="departs"
          :props="defaultProps"
          :default-expand-all="true"
        >
          <treeTools slot-scope="{ data }" :tree-node="data" @delDepts="getDepartments" @addDepts="addDepts"
                     @editDepts="editDepts"/>
        </el-tree>
      </el-card>
    </div>
    <!--防止新增弹出框组件-->
    <addDept :show-dialog.sync="showDialog" :tree-node="node" @addDepts="getDepartments" ref="addDept"/>
  </div>
</template>

<script>
import treeTools from "@/views/departments/components/tree-tools";
import {getDepartments} from "@/api/departments";
import {tranListToTreeData} from '@/utils'
import addDept from "@/views/departments/components/add-dept";

export default {
  name: "departments",
  components: {treeTools, addDept},
  data() {
    return {
      company: {},
      departs: [],
      defaultProps: {
        label: "name", // 表示从这个属性显示内容
      },
      showDialog: false, // 显示新增弹窗
      node: null, // 记录当前点击的node节点
      loading: false // 用来控制进度弹层的显示和隐藏
    };
  },
  created() {
    this.getDepartments();
  },
  methods: {
    // 获取新增数据
    async getDepartments() {
      this.loading = true
      let result = await getDepartments();
      this.company = {name: result.companyName, manager: '负责人', id: ''}
      this.departs = tranListToTreeData(result.depts, '') // 需要将其转化成树形结构
      this.loading = false
    },
    // treeTools中触发的点击添加是事件
    addDepts(node) {
      this.showDialog = true // 显示弹层
      this.node = node
    },
    // 编辑按钮弹框
    editDepts(node) {
      this.showDialog = true // 显示新增组件弹层
      this.node = node // 存储传递过来的node数据
      // 我们需要在这个位置 调用子组件的方法
      // 父组件 调用子组件的方法
      this.$refs.addDept.getDepartDetail(node.id) // 直接调用子组件中的方法 传入一个id
    }
  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
