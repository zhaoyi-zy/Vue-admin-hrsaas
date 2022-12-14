<template>
  <!--新增部门弹窗-->
  <el-dialog :title="showTitle" :visible="showDialog" @close="btnCancel">
    <!--表单数据-->
    <el-form label-width="120px" :rules="rules" :model="formData" ref="deptForm">
      <el-form-item label="部门名称" prop="name">
        <el-input style="width:80%" placeholder="1-50个字符" v-model="formData.name"/>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input style="width:80%" placeholder="1-50个字符" v-model="formData.code"/>
      </el-form-item>
      <el-form-item label="部门负责人" prop="manger">
        <el-select style="width:80%" placeholder="请选择" v-model="formData.manager" @focus="getEmployeeSimple">
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
        <el-button size="small" @click="btnCancel">取消</el-button>
        <el-button type="primary" size="small" @click="btnOk">确认</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import {getDepartments, addDepts, getDepartDetail, updateDepartments} from "@/api/departments";
import {getEmployeeSimple} from "@/api/employees";
import item from "@/layout/components/Sidebar/Item";

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
    // 检查部门 名称 是否重复
    const checkNameRepeat = async (rule, value, cb) => {
      // value 部门名称 要去和同级部门比较 有没有相同的 有相同的 不能过 / 不相同就可以过
      const {depts} = await getDepartments()
      // 去找同级部门下 有没有和value相同的数据
      // 找到所有的子部门
      let isRepeat = false
      if (this.formData.id) {
        // 编辑模式
        isRepeat = depts.filter(item => item.pid === this.treeNode.pid && item.id !== this.treeNode.id).some(item => item.name === value)
      } else {
        // 新增模式
        isRepeat = depts.filter(item => item.pid === this.treeNode.id).some(item => item.name === value)
      }
      isRepeat ? cb(new Error(`同级部门下已存在${value}部门`)) : cb()
    }
    // 检查部门 编码 是否重复
    const checkCodeRepeat = async (rule, value, cb) => {
      const {depts} = await getDepartments()
      let isRepeat = false
      if (this.formData.id) {
        // 编辑模式
        isRepeat = depts.filter(item=>item.id !== this.treeNode.id).some(item => item.code === value && value)
      } else {
        // 新增模式
        isRepeat = depts.some(item => item.code === value && value)
      }
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
  computed: {
    showTitle() {
      return this.formData.id ? '编辑部门' : '新增子部门'
    }
  },
  methods: {
    // 获取员工列表
    async getEmployeeSimple() {
      this.peoples = await getEmployeeSimple()
    },
    // 获取详情方法
    async getDepartDetail(id) {
      this.formData = await getDepartDetail(id)
    },
    //  点击确定触发
    btnOk() {
      this.$refs.deptForm.validate(async isOK => {
        if (isOK) {
          if (this.formData.id) {
            // 调用编辑接口
            await updateDepartments(this.formData)
          } else {
            // 表示可以提交
            // 调用新增接口 添加部门的id
            await addDepts({...this.formData, pid: this.treeNode.id})
          }

          // 通知父组件
          this.$emit('addDepts') // 触发自定义事件
          this.$emit('update:showDialog', false) // 关闭
          this.$message({type: 'success', message: '添加成功'}) // 提示
        }
      })
    },
    btnCancel() {
      // 重置数据
      this.formData = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }

      this.$refs.deptForm.resetFields() // 重置校验字段
      this.$emit('update:showDialog', false) // 关闭
    }
  }
}
</script>

<style scoped>

</style>
