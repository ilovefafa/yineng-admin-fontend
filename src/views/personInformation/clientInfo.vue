<template>
  <div class="main">
    <div v-if="navBarFixed" style="height:61px"></div>
    <ceiling-operator>
      <el-button type="primary" @click="dialogFormVisible=true,toggleButton=true">新建客户</el-button>
      <!-- <el-button type="primary" @click="queryClient">查询职员</el-button> -->
      <!-- <el-input v-model="queryClientData" clearable placeholder="请输入职员名称" style="width:200px;" ></el-input> -->
    </ceiling-operator>
    <el-table
      style="width: 100%"
      height="475"
      :data="clientTable"
    >
      <el-table-column
        prop="date"
        label="创建日期"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="客户全称"
      >
      </el-table-column>
      <el-table-column
        prop="linkMan"
        label="联系人"
      >
      </el-table-column>
      <el-table-column
        prop="phoneNumber"
        label="联系号码"
      >
      </el-table-column>
      <el-table-column
        prop="remarks"
        label="备注"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="收货地址"
      :visible.sync="dialogFormVisible"
      :before-close="handleClose"
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
        <el-button class="right-cancel"  @click="handleClose">取 消</el-button>
        <el-button v-if="toggleButton"  type="primary" @click="createClient">创 建</el-button>
        <el-button v-if ="!toggleButton" type="primary" @click="updateClient">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ceilingOperator from '@/components/ceilingOperator'

export default {
  components: {
    ceilingOperator
  },
  data() {
    return {
      queryClientData: '',
      clientTable: [],
      clientForm: {
        name: '',
        phoneNumber: '',
        linkMan: '',
        remarks: ''
      },
      navBarFixed: false,
      dialogFormVisible: false,
      toggleButton: true
    }
  },
  mounted() {
    this.getClient()
  },
  methods: {
    async getClient() {
      const res = await this.$request({
        url: 'client/get',
        method: 'get'
      })
      this.clientTable = res.data.client
    },
    async updateClient() {
      try {
        await this.$request(
          { url: 'client/update',
            method: 'post',
            data: {
              form: this.clientForm
            }
          })
        this.$message({
          message: '创建成功',
          type: 'success'
        })
        this.dialogFormVisible = false
        this.getClient()
      } catch (err) {
        this.$message({
          message: '创建失败',
          type: 'error'
        })
      }
    },
    queryClient() {

    },
    async handleEdit(index, row) {
      this.toggleButton = false
      this.dialogFormVisible = true
      this.clientForm.id = row._id
      this.clientForm.name = row.name
      this.clientForm.linkMan = row.linkMan
      this.clientForm.phoneNumber = row.phoneNumber
      this.clientForm.remarks = row.remarks
    },
    async handleDelete(index, row) {
      try {
        await this.$confirm('此操作将永久删除该项目信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          cancelButtonClass: 'right-cancel',
          lockScroll: false
        })
        await this.$request({
          url: 'client/delete',
          method: 'post',
          data: {
            id: row._id
          }
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getClient()
      } catch (err) {
        console.log(err)
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
    },
    handleClose() {
      this.dialogFormVisible = false
      this.$message('取消操作')
    },
    async createClient() {
      await this.$request({
        url: 'client/create',
        method: 'post',
        data: {
          form: this.clientForm
        }
      })
      this.clientForm = {}
      this.dialogFormVisible = false
      this.createButton = false
      this.$message({
        message: '创建成功',
        type: 'success'
      })
      this.getClient()
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
