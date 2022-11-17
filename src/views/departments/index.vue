<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构内容 - 头部 -->
      <el-card class="tree-card">
        <!-- 放置结构内容 -->
        <treeTools :tree-node="company" :is-root="true" />
        <el-tree
          :data="departs"
          :props="defaultProps"
          :default-expand-all="true"
        >
          <treeTools slot-scope="{ data }" :tree-node="data" />
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import treeTools from "@/views/departments/components/tree-tools";

export default {
  name: "departments",
  components: { treeTools },
  data() {
    return {
      company: { name: "xxx科技有限公司", manager: "负责人" },
      departs: [
        {
          name: "总裁办",
          manager: "张三",
          children: [{ name: "董事会", manager: "赵六" }],
        },
        { name: "行政部", manager: "李四" },
        { name: "人事部", manager: "王五" },
      ],
      defaultProps: {
        label: "name", // 表示从这个属性显示内容
      },
    };
  },
};
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
