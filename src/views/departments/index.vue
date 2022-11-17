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
          <treeTools slot-scope="{ data }" :tree-node="data"/>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import treeTools from "@/views/departments/components/tree-tools";
import {getDepartments} from "@/api/departments";

export default {
  name: "departments",
  components: {treeTools},
  data() {
    return {
      company: {},
      departs: [],
      defaultProps: {
        label: "name", // 表示从这个属性显示内容
      },
    };
  },
  created() {
    this.getDepartments();
  },
  methods: {
    async getDepartments() {
      let result = await getDepartments();
      console.log(result);
      this.company = {name: result.companyName, manager: '负责人'}
      this.departs = result.depts // 需要将其转化成树形结构
    },
  },
};
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
