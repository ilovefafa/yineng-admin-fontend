<template>
  <div class="main">

    <el-form
      class="itemForm"
      ref="item"
      :model="item"
      label-position="right"
      label-width="100px"
      :rules="offerRules"
    >
      <div class="left">
        <el-alert
          title="报价阶段信息"
          type="info"
          center
          show-icon
          :closable="false">
        </el-alert>
        <el-form-item label="项目名称" prop="name" >
          <el-input v-model="item.name" ></el-input>
        </el-form-item>
        <el-form-item label="客户名称" prop="client" >
          <el-input v-model="item.client"></el-input>
        </el-form-item>
        <el-form-item label="业务员" prop="salesman" >
          <el-input v-model="item.salesman"></el-input>
        </el-form-item>
        <el-form-item label="技术负责人" prop="technicalDirector" >
          <el-input v-model="item.technicalDirector" placeholder="如非本公司报价，直接填写报价公司名称，如：吉控"></el-input>
        </el-form-item>
        <el-form-item label="品牌指定">
          <el-input v-model="item.brand"></el-input>
        </el-form-item>
        <el-form-item label="报价范围" >
          <el-select v-model="item.scope" placeholder="请选择报价范围" >
            <el-option label="三箱" value="三箱"></el-option>
            <el-option label="三箱+低压柜" value="三箱+低压柜"></el-option>
            <el-option label="低压柜" value="低压柜"></el-option>
            <el-option label="高低压柜" value="高低压柜"></el-option>
            <el-option label="全部" value="全部"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目进度"  prop="status" :rules=" { required: true, message: '请输选择', trigger: 'change' }">
          <el-select v-model="item.status" placeholder="请选择项目进度" >
            <el-option label="待定" value="待定"></el-option>
            <el-option label="报价中" value="报价中"></el-option>
            <el-option label="报价完成" value="报价完成"></el-option>
            <el-option label="生产中" value="生产中"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="报价期限"  prop="offerExpirationDate" :rules="offerExpirationDate">
          <el-date-picker type="date" placeholder="选择日期" v-model="item.offerExpirationDate" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item  label="备注">
          <el-input autosize="" type="textarea" v-model="item.remarks"></el-input>
        </el-form-item>
      </div>
      <div class="right">
        <el-alert
          title="生产阶段信息"
          type="success"
          center
          show-icon
          :closable="false">
        </el-alert>
        <el-form-item  label="生产期限" :rules="manufactureExpirationDate" prop="manufactureExpirationDate">
          <el-date-picker type="date" placeholder="选择日期" v-model="item.manufactureExpirationDate" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="收货人信息" >
          <el-input v-model="item.consignee" placeholder="收货人 137xxxxxx"></el-input>
        </el-form-item>
        <el-form-item label="收货地址" >
          <el-input v-model="item.address" placeholder="" type="textarea" autosize=""></el-input>
        </el-form-item>
      </div>
      <el-form-item  class="operation">
        <el-button type="primary" @click="submitForm('item')">创建</el-button>
        <router-link to="/ProjectManagement/CurrentItem">
          <el-button type="">取消</el-button>
        </router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: {
        name: '',
        client: '',
        salesman: '',
        status: '',
        scope: '全部',
        manufactureExpirationDate: ''
      },
      offerRules: {
        name: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        client: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        salesman: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        technicalDirector: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    offerExpirationDate() {
      if (this.item.status !== '生产中') {
        const a = { type: 'string', required: true, message: '请选择日期', trigger: 'change' }
        return a
      } else {
        return {}
      }
    },
    manufactureExpirationDate() {
      if (this.item.status === '生产中') {
        const a = { type: 'string', required: true, message: '请选择日期', trigger: 'change' }
        return a
      } else {
        return {}
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$request({
            url: '/item/save',
            method: 'post',
            data: {
              item: this.item
            }
          }).then(res => {
            this.$router.push('/ProjectManagement/CurrentItem')
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  margin: 20px 0 50px 0;
  font-size: 0;
  .left {
    width: 48%;
    display: inline-block;
    margin: 0 1%;
  }
  .right {
    width: 48%;
    display: inline-block;
    margin: 0 1%;
    vertical-align: top;
  }
  .operation {
    text-align: center;
    a {
      margin-left: 10px;
    }
  }
}
</style>
