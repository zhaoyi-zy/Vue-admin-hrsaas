<template>
  <el-row
    type="flex"
    justify="space-between"
    align="middle"
    style="height: 40px; width: 100%"
  >
    <el-col>
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <!-- 下拉菜单 -->
          <el-dropdown @command="operateDepts">
            <!-- 内容 -->
            <span>
              操作
              <i class="el-icon-arrow-down"></i>
            </span>
            <!-- 具名插槽 -->
            <el-dropdown-menu slot="dropdown">
              <!-- 下拉选项 -->
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">编辑子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del">删除子部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
      <!-- 右侧内容 -->
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "treeTools",
  props: {
    // 定义传入属性
    treeNode: {
      required: true,
      type: Object,
    },
    // 是否对根节点进行控制
    isRoot: {
      default: false,
      type: Boolean,
    },
  },
  methods: {
    // 点击 编辑 新增 删除 的操作
    operateDepts(type) {
      if (type === 'add') { // 新增
      } else if (type === 'edit') { // 班级
      } else { // 删除
      }
    }
  }
};
</script>

<style>
</style>
