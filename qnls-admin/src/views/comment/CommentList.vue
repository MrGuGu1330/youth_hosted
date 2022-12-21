<template>
  <div>
    <!-- 搜索区域 -->
    <el-form :inline="true" :model="searchForm">
      <el-form-item label="旅店名称：">
        <el-input clearable v-model="searchForm.supplier_name" placeholder="请输入旅店名称" @keyup.enter.native="search">
        </el-input>
      </el-form-item>
      <el-form-item label="用户名称：">
        <el-input clearable v-model="searchForm.user_name" placeholder="请输入用户名称" @keyup.enter.native="search">
        </el-input>
      </el-form-item>
      <el-form-item label="评论内容：">
        <el-input clearable v-model="searchForm.comment_content" placeholder="请输入评论内容" @keyup.enter.native="search">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
    </el-form>

    <!-- 列表区域 -->
    <el-table ref="commentTable" size="small" style="width: 100%" :data="commentData"
      :header-cell-style="{ background: '#eee' }" v-loading="loading">
      <el-table-column align="center" type="index" :index="indexMethod" label="序号">
      </el-table-column>
      <el-table-column align="center" prop="supplier_name" label="旅店名称">
      </el-table-column>
      <el-table-column align="center" prop="user_name" label="用户名称">
      </el-table-column>
      <el-table-column align="center" prop="comment_content" label="评论内容">
      </el-table-column>
      <el-table-column align="center" prop="comment_score" label="评分">
        <template slot-scope="scope">
          <el-rate :value="scope.row.comment_score*1" disabled text-color="#ff9900">
          </el-rate>
        </template>
      </el-table-column>
      <el-table-column align="center" label="时间">
        <template slot-scope="scope">
          <span>{{moment(scope.row.comment_time * 1000).format('YYYY-MM-DD')}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" icon="el-icon-info" icon-color="red"
            title="删除后不可恢复, 确定删除吗？" @confirm="toDelete(scope.row.comment_id)">
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
import moment from 'moment'

export default {
  name: 'CommentList',
  data () {
    return {
      loading: false,
      searchForm: {
        supplier_name: '',
        user_name: '',
        comment_content: ''
      },
      commentData: [],
      pageCurrent: 1,
      pageSize: 10,
      total: 0,
    }
  },
  methods: {
    moment,

    // 搜索
    search () {
      this.pageCurrent = 1
      this.getList()
    },

    // 获取列表
    getList () {
      this.loading = true
      this.$http.commentApi.getCommentList({
        ...this.searchForm,
        pageCurrent: this.pageCurrent,
        pageSize: this.pageSize,
      }).then(res => {
        if (res.data.code == 200) {
          this.loading = false
          this.commentData = res.data.data
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

    // 删除用户评论
    toDelete (id) {
      this.$http.commentApi.deleteComment({ comment_id: id }).then(res => {
        if (res.data.code == 200) {
          this.$message.success('删除成功')
          this.getList()
        }
      })
    },
  },
  mounted () {
    this.getList()
  },
}
</script>

<style lang="scss" scoped></style>
