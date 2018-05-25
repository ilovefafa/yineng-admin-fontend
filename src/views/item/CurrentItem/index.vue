<template>
  <div class="main">
    <div class="operator" :class="navBarFixed == true ? 'navBarWrap' :''">
      <router-link to="/ProjectManagement/NewItem" >
        <el-button type="primary" >新建项目</el-button>
      </router-link>
      <el-button type="primary" @click="queryItem">查询项目</el-button>
      <el-input v-model="queryItemData" clearable placeholder="请输入项目名称" style="width:200px;" ></el-input>
    </div>
    <el-table
      :data="item"
      style="width: 100%"
      :row-class-name="tableRowClassName"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="table-expand">
            <el-form-item label="创建日期">
              <span>{{ props.row.date }}</span>
            </el-form-item>
            <el-form-item label="项目名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="业务员">
              <span>{{ props.row.salesman }}</span>
            </el-form-item>
            <el-form-item label="技术负责人">
              <span>{{ props.row.technicalDirector }}</span>
            </el-form-item>
            <el-form-item label="商品分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="客户">
              <span>{{ props.row.client }}</span>
            </el-form-item>
            <el-form-item label="客户电话">
              <span>{{ props.row.clientPhone }}</span>
            </el-form-item>
            <el-form-item label="状态">
              <span>{{ props.row.status }}</span>
            </el-form-item>
            <el-form-item label="要求">
              <span>{{ props.row.demand }}</span>
            </el-form-item>
            <el-form-item label="备注">
              <span>{{ props.row.remarks }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="项目名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="salesman"
        label="业务员">
      </el-table-column>
      <el-table-column
        prop="technicalDirector"
        label="技术负责人">
      </el-table-column>
      <el-table-column
        prop="offerExpirationDate"
        label="报价截止时间">
      </el-table-column>
      <el-table-column
        prop="status"
        label="进度">
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
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      item: [],
      navBarFixed: false,
      queryItemData: ''
    }
  },
  mounted() {
    this.getItem()
    // 事件监听滚动条
    window.addEventListener('scroll', this.watchScroll)
  },
  watch: {
    queryItemData(newVal, oldVal) {
      if (newVal === '') {
        this.getItem()
      }
    }
  },
  methods: {
    getItem() {
      this.$request({
        url: 'item/get',
        method: 'get'
      })
        .then(res => {
          this.item = res.data.item
        })
    },
    async queryItem() {
      const res = await this.$request({
        url: 'item/currentQuery',
        method: 'get',
        params: {
          queryItemData: this.queryItemData
        }
      })
      this.item = res.data.item
    },
    tableRowClassName({ row, rowIndex }) {
      if (moment().isAfter(row.offerExpirationDate)) {
        return 'danger-row'
      }
      if (moment().add(2, 'days').isAfter(row.offerExpirationDate)) {
        return 'warning-row'
      }
      return ''
    },
    handleEdit(index, row) {
      this.$router.push({
        path: `/ProjectManagement/EditItem`,
        query: { id: row._id }
      })
    },
    async handleDelete(index, row) {
      try {
        await this.$confirm('此操作将永久删除该项目信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          cancelButtonClass: 'cancelButtonClass',
          lockScroll: false
        })
        await this.$request({
          url: 'item/delete',
          method: 'post',
          data: {
            id: row._id
          }
        })
        await this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getItem()
      } catch (err) {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
    },
    watchScroll() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      //  当滚动超过 50 时，实现吸顶效果
      if (scrollTop > 49) {
        this.navBarFixed = true
      } else {
        this.navBarFixed = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  .operator {
    width: 100%;
    background-color: white;
    text-align: center;
    border-bottom: solid 1px #e6e6e6;
    padding: 10px 0 10px 20px;
  }
  .navBarWrap {
    position: fixed;
    top: 0;
    left: 36px;
    width: calc(100% - 36px);
    z-index: 1999;
  }
  .table-expand {
    font-size: 0;
    label {
      width: 90px;
      color: #99a9bf;
    }
    .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }
  }
}
</style>
