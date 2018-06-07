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
          <el-autocomplete
            v-model="item.client"
            @click="toggle='client'"
            :fetch-suggestions="queryAsync('client')"
            placeholder="请输入内容"
            @select="handleSelect"
            value-key="name"
          ></el-autocomplete>
          <el-button type="primary" @click="dialogClient=true">新建</el-button>
        </el-form-item>
        <el-form-item label="业务员" prop="salesman" >
          <el-autocomplete
            v-model="item.salesman"
            @click="toggle='salesman'"
            :fetch-suggestions="queryAsync('staff','salesman')"
            placeholder="请输入内容"
            @select="handleSelect"
            value-key="name"
          ></el-autocomplete>
          <el-button type="primary" @click="dialogStaff=true,getOnce.salesman=false">新建</el-button>
        </el-form-item>
        <el-form-item label="技术负责人" prop="technicalDirector" >
          <el-autocomplete
            v-model="item.technicalDirector"
            @click="toggle='technicalDirector'"
            :fetch-suggestions="queryAsync('staff','technicalDirector')"
            placeholder="请输入内容"
            @select="handleSelect"
            value-key="name"
          ></el-autocomplete>
          <el-button type="primary" @click="dialogStaff=true,getOnce.technicalDirector=false">新建</el-button>
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
    <el-dialog
      title="收货地址"
      :visible.sync="dialogClient"
      :before-close="closeClient"
    >
      <el-form :model="clientForm">
        <el-form-item label="客户全称" :label-width="'80px'">
          <el-input v-model="clientForm.name" ></el-input>
        </el-form-item>
        <el-form-item label="联系人" :label-width="'80px'">
          <el-input v-model="clientForm.linkMan" ></el-input>
        </el-form-item>
        <el-form-item label="联系号码" :label-width="'80px'">
          <el-input v-model="clientForm.phoneNumber" ></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="'80px'">
          <el-input v-model="clientForm.remarks" ></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="right-cancel"  @click="closeClient">取 消</el-button>
        <el-button   type="primary" @click="createClient">创 建</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="收货地址"
      :visible.sync="dialogStaff"
      :before-close="closeStaff"
    >
      <el-form :model="staffForm" ref="form">
        <el-form-item label="职员全称" :label-width="'80px'">
          <el-input v-model="staffForm.name" ></el-input>
        </el-form-item>
        <el-form-item label="职位" :label-width="'80px'">
          <el-select v-model="staffForm.jobTitle" placeholder="请选择职位">
            <el-option label="电气工程师" value="电气工程师"></el-option>
            <el-option label="业务员" value="业务员"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系方式" :label-width="'80px'">
          <el-input v-model="staffForm.phoneNumber" ></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="'80px'">
          <el-input v-model="staffForm.remarks" ></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="right-cancel"  @click="closeStaff">取 消</el-button>
        <el-button   type="primary" @click="createStaff">创 建</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  mounted() {
  },
  data() {
    const validator = (role) => {
      return (rule, value, callback, source, options) => {
        var filter = this[role].filter(item => { return item.name === value })
        clearTimeout(this.filterTimeout[role])
        if (filter.length === 0) {
          this.filterTimeout[role] = setTimeout(() => {
            callback(new Error('请输入已录入系统的名称'))
          }, 1000)
        } else {
          callback()
        }
      }
    }
    return {
      clientForm: {},
      staffForm: {},
      dialogClient: false,
      dialogStaff: false,
      client: [],
      salesman: [],
      technicalDirector: [],
      filterTimeout: {
        client: '',
        salesman: '',
        technicalDirector: ''
      },
      timeout: '',
      getOnce: {
        client: false,
        salesman: false,
        technicalDirector: false
      },
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
          { required: true, validator: validator('client'), trigger: 'change' }
        ],
        salesman: [
          { required: true, validator: validator('salesman'), trigger: 'change' }
        ],
        technicalDirector: [
          { required: true, validator: validator('technicalDirector'), trigger: 'change' }
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
    async createClient() {
      await this.$request({
        url: 'client/create',
        method: 'post',
        data: {
          form: this.clientForm
        }
      })
      this.clientForm = {}
      this.dialogClient = false
      this.getOnce.client = false
      this.$message({
        message: '创建成功',
        type: 'success'
      })
    },
    async createStaff() {
      await this.$request({
        url: 'staff/create',
        method: 'post',
        data: {
          form: this.staffForm
        }
      })
      this.staffForm = {}
      this.dialogStaff = false
      this.$message({
        message: '创建成功',
        type: 'success'
      })
    },
    closeClient() {
      this.dialogClient = false
      this.$message('取消操作')
    },
    closeStaff() {
      this.dialogStaff = false
      this.$message('取消操作')
    },
    queryAsync(role, staffRole = '') {
      const url = role
      if (staffRole) {
        role = staffRole
      }
      return async(queryString, cb) => {
        if (!this.getOnce[role]) {
          const res = await this.$request({
            url: `${url}/get${staffRole}`,
            method: 'get'
          })
          this.getOnce[role] = true
          this[role] = res.data[role]
        }
        var results = queryString ? this[role].filter(this.createStateFilter(queryString)) : this[role]
        cb(results)
      }
    },
    async querySearchAsync(queryString, cb) {
      if (!this.getOnce.client) {
        const res = await this.$request({
          url: `client/get`,
          method: 'get'
        })
        this.getOnce.client = true
        this.client = res.data.client
      }
      var results = queryString ? this.client.filter(this.createStateFilter(queryString)) : this.client
      cb(results)
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect(item) {
    },
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
