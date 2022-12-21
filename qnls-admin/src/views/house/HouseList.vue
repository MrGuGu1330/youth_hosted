<template>
  <div>
    <!-- 搜索区域 -->
    <el-form :inline="true" :model="searchForm">
      <el-form-item label="房型名称：">
        <el-input clearable v-model="searchForm.house_name" placeholder="请输入房型名称" @keyup.enter.native="search">
        </el-input>
      </el-form-item>
      <el-form-item label="旅店名称：">
        <el-input clearable v-model="searchForm.supplier_name" placeholder="请输入旅店名称" @keyup.enter.native="search">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
    </el-form>

    <!-- 列表区域 -->
    <el-table ref="houseTable" size="small" style="width: 100%" :data="houseData"
      :header-cell-style="{ background: '#eee' }" v-loading="loading">
      <el-table-column align="center" type="index" :index="indexMethod" label="序号">
      </el-table-column>
      <el-table-column align="center" prop="house_name" label="房型名称">
      </el-table-column>
      <el-table-column align="center" prop="house_intro" label="房型简单介绍">
      </el-table-column>
      <el-table-column align="center" prop="house_price" label="房型价格">
      </el-table-column>
      <el-table-column align="center" prop="supplier_name" label="旅店名称">
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button style="margin-right:5px;" size="mini" icon="el-icon-view" circle
            @click="toDetail(scope.row.house_id)">
          </el-button>

          <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" icon="el-icon-info" icon-color="red"
            title="删除后不可恢复, 确定删除吗？" @confirm="toDelete(scope.row.house_id)">
            <el-button slot="reference" size="mini" type="danger" icon="el-icon-delete" circle></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <div style="margin-top: 10px; text-align: right">
      <el-pagination layout="total, prev, pager, next, jumper" :current-page="pageCurrent" :page-size="pageSize"
        :total="total" @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HouseList',
  data () {
    return {
      loading: false,
      searchForm: {
        house_name: '',
        supplier_name: '',
      },
      houseData: [],
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
      this.$http.houseApi.getHouseList({
        ...this.searchForm,
        pageCurrent: this.pageCurrent,
        pageSize: this.pageSize,
      }).then(res => {
        if (res.data.code == 200) {
          this.loading = false
          this.houseData = res.data.data
          this.total = res.data.total
        } else {
          console.log('出错了')
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
      return (this.pageCurrent - 1) * this.pageSize + index + 1
    },

    // 查看详情
    toDetail (id) {
      this.$router.push({ path: '/home/house-detail', query: { id } })
    },

    // 删除
    toDelete (id) {
      this.$http.houseApi.deleteHouse({ house_id: id }).then(res => {
        if (res.data.code == 200) {
          this.$message.success('删除成功')
          this.getList()
        }
      })
    },
  },
  mounted () {
    this.searchForm.supplier_name = this.$route.query.supplier_name || ''
    this.getList()
  },
}
</script>

<style lang="scss" scoped></style>
