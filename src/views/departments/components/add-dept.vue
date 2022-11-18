<template>
  <!--新增部门弹窗-->
  <el-dialog title="新增部门" :visible="showDialog">
    <!--表单数据-->
    <el-form label-width="120px">
      <el-form-item label="部门名称">
        <el-input style="width:80%" placeholder="1-50个字符"/>
      </el-form-item>
      <el-form-item label="部门编码">
        <el-input style="width:80%" placeholder="1-50个字符"/>
      </el-form-item>
      <el-form-item label="部门负责人">
        <el-select style="width:80%" placeholder="请选择" value=""/>
      </el-form-item>
      <el-form-item label="部门介绍">
        <el-input style="width:80%" placeholder="1-300个字符" type="textarea"/>
      </el-form-item>
    </el-form>
    <!--确定消息-->
    <el-row type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small">取消</el-button>
        <el-button type="primary" size="small">确认</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  name: "add-dept",
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
}
</script>

<style scoped>

</style>
