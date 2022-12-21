<template>
  <div>
    <!-- 搜索区域 -->
    <el-form :inline="true" :model="searchForm">
      <el-form-item label="用户名：">
        <el-input clearable v-model="searchForm.user_name" placeholder="请输入用户名" @keyup.enter.native="search">
        </el-input>
      </el-form-item>
      <el-form-item label="会员状态：">
        <el-select v-model="searchForm.isvip" @change="search">
          <el-option label="非会员" :value="0"></el-option>
          <el-option label="会员" :value="1"></el-option>
          <el-option label="全部" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
    </el-form>

    <!-- 列表区域 -->
    <el-table ref="activityTable" size="small" style="width: 100%" :data="activityData"
      :header-cell-style="{ background: '#eee' }" v-loading="loading">
      <el-table-column align="center" type="index" :index="indexMethod" label="序号">
      </el-table-column>
      <el-table-column align="center" label="用户头像">
        <template slot-scope="scope">
          <el-avatar :size="50" :src="
              scope.row.user_avatar
                ? baseURL + scope.row.user_avatar
                : require('@/assets/avatar.png')
            "></el-avatar>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="user_name" label="用户名">
      </el-table-column>
      <el-table-column align="center" prop="user_phone" label="手机号">
      </el-table-column>
      <el-table-column align="center" prop="user_email" label="邮箱">
      </el-table-column>
      <el-table-column align="center" label="注册时间">
        <template slot-scope="scope">
          <span>{{
            moment(scope.row.register_time * 1000).format("YYYY-MM-DD")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="会员状态">
        <template slot-scope="scope">
          <span>{{
            scope.row.vip_expire_time > moment().format("X") ? "会员" : "非会员"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" icon="el-icon-info" icon-color="red"
            title="删除后不可恢复, 确定删除吗？" @confirm="toDelete(scope.row.user_id)">
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
import { mapState } from "vuex";
import moment from "moment";

export default {
  name: "UserList",
  computed: { ...mapState(["baseURL"]) },
  data () {
    return {
      loading: false,
      searchForm: {
        user_name: "",
        isvip: 2,
      },
      activityData: [],
      pageCurrent: 1,
      pageSize: 10,
      total: 0,
    };
  },

  methods: {
    moment,

    // 搜索
    search () {
      this.pageCurrent = 1;
      this.getList();
    },

    // 获取列表
    getList () {
      this.loading = true;
      this.$http.userApi.getUserList({
        ...this.searchForm,
        pageCurrent: this.pageCurrent,
        pageSize: this.pageSize,
      }).then((res) => {
        if (res.data.code == 200) {
          this.loading = false;
          this.activityData = res.data.data;
          this.total = res.data.total;
        }
      });
    },

    // 列表序号
    indexMethod (index) {
      return (this.pageCurrent - 1) * this.pageSize + index + 1;
    },

    // 跳转至pageCurrent页
    handleCurrentChange (pageCurrent) {
      this.pageCurrent = pageCurrent;
      this.getList();
    },

    // 删除列表
    toDelete (id) {
      this.$http.userApi.deleteUser({ user_id: id }).then((res) => {
        this.$message.success('删除成功');
        this.getList();
      });
    },
  },

  mounted () {
    this.getList();
  },
};
</script>

<style lang="scss" scoped>
</style>