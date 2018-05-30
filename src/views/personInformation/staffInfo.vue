<template>
  <div class="main">
    <ceiling-operator>
      <el-button type="primary" @click="openForm">新建职员</el-button>
      <!-- <el-button type="primary" @click="queryClient">查询职员</el-button> -->
      <!-- <el-input v-model="queryClientData" clearable placeholder="请输入职员名称" style="width:200px;" ></el-input> -->
    </ceiling-operator>
    <el-table
      style="width: 100%"
      height="475"
      :data="staffTable"
    >
      <el-table-column
        prop="date"
        label="创建日期"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="职员全称"
      >
      </el-table-column>
      <el-table-column
        prop="jobTitle"
        label="职位"
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
      <el-form :model="staffForm" ref="form">
        <el-form-item label="职员全称" :label-width="'80px'">
          <el-input v-model="staffForm.name" ></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="'80px'">
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
      staffTable: [],
      staffForm: {
        name: '',
        phoneNumber: '',
        remarks: '',
        jobTitle: ''
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
    openForm() {
      this.dialogFormVisible = true
      this.toggleButton = true
    },
    async getClient() {
      const res = await this.$request({
        url: 'staff/get',
        method: 'get'
      })
      this.staffTable = res.data.staff
    },
    async updateClient() {
      try {
        await this.$request(
          { url: 'staff/update',
            method: 'post',
            data: {
              form: this.staffForm
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
      this.staffForm.id = row._id
      this.staffForm.name = row.name
      this.staffForm.phoneNumber = row.phoneNumber
      this.staffForm.remarks = row.remarks
      this.staffForm.jobTitle = row.jobTitle
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
          url: 'staff/delete',
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
        url: 'staff/create',
        method: 'post',
        data: {
          form: this.staffForm
        }
      })
      this.staffForm = {}
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
