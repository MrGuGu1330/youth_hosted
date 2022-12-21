<template>
  <div>
    <!-- 搜索区域 -->
    <el-form :inline="true" :model="searchForm">
      <el-form-item label="旅店名称：">
        <el-input clearable v-model="searchForm.supplier_name" placeholder="请输入旅店名称" @keyup.enter.native="search">
        </el-input>
      </el-form-item>
      <el-form-item label="省份：">
        <el-select clearable v-model="searchForm.supplier_address" placeholder="请选择省份" @change="search">
          <el-option v-for="item in provinces" :key="item.id" :label="item.name" :value="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="加盟：">
        <el-select v-model="searchForm.is_agree" @change="search">
          <el-option label="未加盟" :value="0"></el-option>
          <el-option label="已加盟" :value="1"></el-option>
          <el-option label="全部" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
    </el-form>

    <!-- 列表区域 -->
    <el-table ref="supplierTable" size='small' style="width: 100%" :data="supplierData"
      :header-cell-style="{background:'#eee'}" v-loading="loading">
      <el-table-column align="center" type="index" :index="indexMethod" label="序号">
      </el-table-column>
      <el-table-column align="center" prop="supplier_name" label="旅店名称">
      </el-table-column>
      <el-table-column align="center" prop="supplier_phone" label="旅店手机号">
      </el-table-column>
      <el-table-column align="center" prop="supplier_email" label="旅店邮箱">
      </el-table-column>
      <el-table-column align="center" prop="supplier_address" label="旅店地址">
      </el-table-column>
      <el-table-column align="center" prop="min_price" label="旅店最低价/元">
      </el-table-column>
      <el-table-column align="center" label="加盟状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.is_agree" active-value="1" inactive-value="0" active-text="已加盟"
            inactive-text="未加盟" @change='updateAgreeStatus(scope.row.is_agree, scope.row.supplier_id)'>
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button style="margin-right:5px;" size="mini" icon="el-icon-view" circle
            @click="toDetail(scope.row.supplier_id)">
          </el-button>

          <el-popconfirm confirm-button-text='确定' cancel-button-text='取消' icon="el-icon-info" icon-color="red"
            title="删除后不可恢复, 确定删除吗？" @confirm="toDelete(scope.row.supplier_id)">
            <el-button slot="reference" size="mini" type="danger" icon="el-icon-delete" circle></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <div style="margin-top:10px;text-align:right;">
      <el-pagination layout="total, prev, pager, next, jumper" :current-page="pageCurrent" :page-size="pageSize"
        :total="total" @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { provinces } from '../../utils/provinces'

export default {
  name: 'SupplierList',
  data () {
    return {
      provinces,
      loading: false,
      searchForm: {
        supplier_name: '',
        supplier_address: null,
        is_agree: 2
      },
      supplierData: [],
      pageCurrent: 1,
      pageSize: 10,
      total: 0,
    }
  },
  methods: {
    // 搜索
    search () {
      this.pageCurrent = 1
      this.getList()
    },

    // 获取列表
    getList () {
      this.loading = true
      this.$http.supplierApi.getSupplierList({
        ...this.searchForm,
        pageCurrent: this.pageCurrent,
        pageSize: this.pageSize
      }).then(res => {
        if (res.data.code == 200) {
          this.loading = false
          this.supplierData = res.data.data
          console.log(" res.data.data:", res.data.data);
          this.total = res.data.total
        }
      })
    },

    // 跳转至pageCurrent页
    handleCurrentChange (pageCurrent) {
      this.pageCurrent = pageCurrent
      this.getList()
    },

    // 列表序号
    indexMethod (index) {
      return (this.pageCurrent - 1) * this.pageSize + index + 1;
    },

    // 修改加盟状态
    updateAgreeStatus (is_agree, supplier_id) {
      this.$http.supplierApi.updateSupplierAgree({ is_agree, supplier_id }).then(res => {
        if (res.data.code == 200) {
          this.$message.success('修改成功')
        }
      })
    },

    // 查看详情
    toDetail (id) {
      this.$router.push({ path: '/home/supplier-detail', query: { id } })
    },

    // 删除
    toDelete (id) {
      this.$http.supplierApi.deleteSupplier({ supplier_id: id }).then(res => {
        if (res.data.code == 200) {
          this.$message.success('删除成功')
          this.getList()
        }
      })
    }
  },
  mounted () {
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
</style>