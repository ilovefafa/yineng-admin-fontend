<template>
  <div>
    <el-form
      class="itemForm"
      ref="item"
      :model="item"
      label-position="right"
      label-width="100px"
    >
      <el-form-item label="项目名称" >
        <el-input v-model="item.name"></el-input>
      </el-form-item>
      <el-form-item label="客户名称">
        <el-input v-model="item.client"></el-input>
      </el-form-item>
      <el-form-item label="业务员">
        <el-input v-model="item.salesman"></el-input>
      </el-form-item>
      <el-form-item label="技术负责人">
        <el-input v-model="item.technicalDirector"></el-input>
      </el-form-item>
      <el-form-item  label="项目要求">
        <el-input autosize="" type="textarea" v-model="item.demand"></el-input>
      </el-form-item>
      <el-form-item  label="报价截止时间">
        <el-date-picker type="date" placeholder="选择日期" v-model="item.offerExpirationDate" value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
      <el-form-item label="项目进度">
        <el-select v-model="item.status" placeholder="请选择项目进度" >
          <el-option label="待定" value="待定"></el-option>
          <el-option label="报价中" value="报价中"></el-option>
          <el-option label="报价完成" value="报价完成"></el-option>
          <el-option label="生产中" value="生产中"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item  label="备注">
        <el-input autosize="" type="textarea" v-model="item.remarks"></el-input>
      </el-form-item>
      <div class="operation">
        <el-button type="primary" @click="updateItem">更新</el-button>
        <el-button type="">取消</el-button>
      </div>

    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: {}
    }
  },
  mounted() {
    this.editItem()
  },
  methods: {
    editItem() {
      this.$request({
        url: 'item/edit',
        method: 'get',
        params: {
          id: this.$route.query.id
        }
      }).then(res => {
        this.item = res.data.item
      })
    },
    updateItem() {
      this.$request({
        url: 'item/update',
        method: 'post',
        data: {
          item: this.item
        }
      }).then(res => {
        this.$router.push(`/ProjectManagement/CurrentItem`)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
