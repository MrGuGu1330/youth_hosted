<template>
  <div>
    <!-- 搜索区域 -->
    <el-form :inline="true" :model="searchForm">
      <el-form-item label="订单编号：">
        <el-input
          clearable
          v-model="searchForm.order_id"
          placeholder="请输入订单编号"
          @keyup.enter.native="search"
        >
        </el-input>
      </el-form-item>

      <el-form-item label="客户名称：">
        <el-input
          clearable
          v-model="searchForm.user_name"
          placeholder="请输入客户名称"
          @keyup.enter.native="search"
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
    </el-form>

    <!-- 列表区域 -->
    <el-table
      ref="supplierTable"
      size="small"
      style="width: 100%"
      :data="orderData"
      :header-cell-style="{ background: '#eee' }"
      v-loading="loading"
    >
      <el-table-column
        align="center"
        type="index"
        :index="indexMethod"
        label="序号"
      >
      </el-table-column>
      <el-table-column align="center" prop="order_id" label="订单编号">
      </el-table-column>
      <el-table-column align="center" prop="user_name" label="客户名称">
      </el-table-column>
      <el-table-column align="center" prop="user_phone" label="手机号">
      </el-table-column>
      <el-table-column align="center" prop="supplier_name" label="入住旅店">
      </el-table-column>
      <el-table-column align="center" prop="order_price" label="价格">
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            style="margin-right: 5px"
            size="mini"
            icon="el-icon-view"
            circle
            @click="toDetail(scope.row.order_id)"
          >
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <div style="margin-top: 10px; text-align: right">
      <el-pagination
        layout="total, prev, pager, next, jumper"
        :current-page="pageCurrent"
        :page-size="pageSize"
        :total="total"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderList",
  data() {
    return {
      loading: false,
      searchForm: {
        order_id: "",
        user_name: "",
      },
      orderData: [],
      pageCurrent: 1,
      pageSize: 10,
      total: 0,
    };
  },
  methods: {
    // 搜索
    search() {
      this.pageCurrent = 1;
      this.getList();
    },

    // 获取列表
    getList() {
      this.loading = true;
      this.$http.orderApi
        .getOrderList({
          ...this.searchForm,
          pageCurrent: this.pageCurrent,
          pageSize: this.pageSize,
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.loading = false;
            this.orderData = res.data.data;
            // console.log(" res.data.data:", res.data.data);
            this.total = res.data.total;
          }
        });
    },

    // 跳转至pageCurrent页
    handleCurrentChange(pageCurrent) {
      this.pageCurrent = pageCurrent;
      this.getList();
    },

    // 列表序号
    indexMethod(index) {
      return (this.pageCurrent - 1) * this.pageSize + index + 1;
    },

    // 查看详情
    toDetail(id) {
      this.$router.push({
        path: "/home/order-detail",
        query: { order_id: id },
      });
    },
  },
  mounted() {
    this.getList();
  },
};
</script>

<style lang="scss" scoped></style>
