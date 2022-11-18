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
          <treeTools slot-scope="{ data }" :tree-node="data" @delDepts="getDepartments" @addDepts="addDepts"/>
        </el-tree>
      </el-card>
    </div>
    <!--防止新增弹出框组件-->
    <addDept :show-dialog="showDialog"/>
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
      node: null // 记录当前点击的node节点
    };
  },
  created() {
    this.getDepartments();
  },
  methods: {
    async getDepartments() {
      let result = await getDepartments();
      // console.log(result);
      this.company = {name: result.companyName, manager: '负责人', id: ''}
      this.departs = tranListToTreeData(result.depts, '') // 需要将其转化成树形结构
    },
    // treeTools中触发的点击添加是事件
    addDepts() {
      this.showDialog = true // 显示弹层
      // 因为node是当前的点击的部门， 此时这个部门应该记录下来,
      this.node = node
    }
  },
};
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
