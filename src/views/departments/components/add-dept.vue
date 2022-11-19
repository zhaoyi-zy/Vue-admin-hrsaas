<template>
  <!--新增部门弹窗-->
  <el-dialog title="新增部门" :visible="showDialog">
    <!--表单数据-->
    <el-form label-width="120px">
      <el-form-item label="部门名称" prop="name">
        <el-input style="width:80%" placeholder="1-50个字符" v-model="formData.name"/>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input style="width:80%" placeholder="1-50个字符" v-model="formData.code"/>
      </el-form-item>
      <el-form-item label="部门负责人" prop="manger">
        <el-select style="width:80%" placeholder="请选择" v-model="formData.manager">
          <el-option v-for="item in peoples" :key="item.id" :label="item.username" :value="item.username"/>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input style="width:80%" placeholder="1-300个字符" type="textarea" v-model="formData.introduce"/>
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
import {getDepartments} from "@/api/departments";
import {getEmployeeSimple} from "@/api/employees";

export default {
  name: "add-dept",
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      default: null
    }
  },
  data() {
    // 检查部门名称是否重复
    const checkNameRepeat = async (rule, value, cb) => {
      // value 部门名称 要去和同级部门比较 有没有相同的 有相同的 不能过 / 不相同就可以过
      const { depts } = await getDepartments()
      // 去找同级部门下 有没有和value相同的数据
      // 找到所有的子部门
      const isRepeat = depts.filter(item => item.pid === this.treeNode.id).some(item => item.name === value)
      isRepeat ? cb(new Error(`同级部门下已存在${value}部门`)) : cb()
    }
    // 检查部门编码是否重复
    const checkCodeRepeat = async (rule, value, cb) => {
      const { depts } = await getDepartments()
      const isRepeat = depts.some(item => item.code === value && value)
      isRepeat ? cb(new Error(`同级部门下已存在${value}编码`)) : cb()
    }
    return {
      // 定义表单数据
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      // 定义校验规则
      rules: {
        name: [
          {required: true, message: '部门名称不能为空', trigger: 'blur'},
          {min: 1, max: 50, message: '部门名称要求1-50个字符', trigger: 'blur'},
          {trigger: "blur", validator: checkNameRepeat}
        ],
        code: [
          {required: true, message: '部门编码不能为空', trigger: 'blur'},
          {min: 1, max: 50, message: '部门编码要求1-50个字符', trigger: 'blur'},
          {trigger: "blur", validator: checkCodeRepeat}
        ],
        manager: [
          {required: true, message: '部门负责人不能为空', trigger: 'blur'}
        ],
        introduce: [
          {required: true, message: '部门介绍不能为空', trigger: 'blur'},
          {min: 1, max: 300, message: '部门介绍要求1-300个字符', trigger: 'blur'}
        ]
      },
      // 员工数据列表
      peoples: []
    }
  },
  methods:{
    // 获取员工列表
    async getEmployeeSimple(){
      this.peoples = await getEmployeeSimple()
    }
  }
}
</script>

<style scoped>

</style>
