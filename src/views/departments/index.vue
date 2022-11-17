<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构内容 - 头部 -->
      <el-card class="tree-card">
        <!-- 放置结构内容 -->
        <el-row
          type="flex"
          justify="space-between"
          align="middle"
          style="height: 40px, width: 100%"
        >
          <el-col>
            <!-- 左侧的内容 -->
            <span>易优科技有限公司</span>
          </el-col>
        </el-row>
        <el-tree
          :data="departs"
          :props="defaultProps"
          :default-expand-all="true"
        >
          <!-- 作用域插槽 slot-scope='obj' 接收传递给插槽的数据 data 每个节点的数据对象  -->
          <el-row
            slot-scope="{ data }"
            type="flex"
            justify="space-between"
            align="middle"
            style="height: 40px; width: 100%"
          >
            <el-col>
              <span>{{ data.name }}</span>
            </el-col>
            <el-col :span="4">
              <el-row type="flex" justify="end">
                <el-col>{{ data.manager }}</el-col>
                <el-col>
                  <!-- 下拉菜单 -->
                  <el-dropdown>
                    <!-- 内容 -->
                    <span>
                      操作
                      <i class="el-icon-arrow-down"></i>
                    </span>
                    <!-- 具名插槽 -->
                    <el-dropdown-menu slot="dropdown">
                      <!-- 下拉选项 -->
                      <el-dropdown-item>添加子部门</el-dropdown-item>
                      <el-dropdown-item>编辑子部门</el-dropdown-item>
                      <el-dropdown-item>删除子部门</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>
              </el-row>
              <!-- 右侧内容 -->
            </el-col>
          </el-row>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "departments",
  data() {
    return {
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
