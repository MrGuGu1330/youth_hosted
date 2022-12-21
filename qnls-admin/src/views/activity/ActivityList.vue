<template>
  <div>
    <!-- 搜索区域 -->
    <el-form :inline="true" :model="searchForm">
      <el-form-item label="活动标题：">
        <el-input clearable v-model="searchForm.activity_title" placeholder="请输入活动名称" @keyup.enter.native="search">
        </el-input>
      </el-form-item>
      <el-form-item label="开始时间：">
        <el-date-picker clearable v-model="startTime" type="date" placeholder="选择开始日期" @change="search">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间：">
        <el-date-picker clearable v-model="endTime" type="date" placeholder="选择结束日期" @change="search">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="面向对象：">
        <el-select v-model="searchForm.activity_face_to" @change="search">
          <el-option label="所有用户" :value="0"></el-option>
          <el-option label="仅会员" :value="1"></el-option>
          <el-option label="全部" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
    </el-form>

    <!-- 列表区域 -->
    <el-table ref="activityTable" size='small' style="width: 100%" :data="activityData"
      :header-cell-style="{background:'#eee'}" v-loading="loading">
      <el-table-column align="center" type="index" :index="indexMethod" label="序号">
      </el-table-column>
      <el-table-column align="center" prop="activity_title" label="活动标题">
      </el-table-column>
      <el-table-column align="center" label="活动开始时间">
        <template slot-scope="scope">
          <span>{{moment(scope.row.activity_start_time * 1000).format('YYYY-MM-DD')}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="活动结束时间">
        <template slot-scope="scope">
          <span>{{moment(scope.row.activity_end_time * 1000).format('YYYY-MM-DD')}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="活动折扣">
        <template slot-scope="scope">
          <span>{{scope.row.activity_discount * 10}}折</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="活动面向对象">
        <template slot-scope="scope">
          <span>{{scope.row.activity_face_to ==  1 ? '仅会员' : '所有用户'}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button style="margin-right:5px;" type="primary" size="mini" icon="el-icon-edit" circle
            @click="toEdit(scope.row.activity_id)">
          </el-button>

          <el-popconfirm confirm-button-text='确定' cancel-button-text='取消' icon="el-icon-info" icon-color="red"
            title="删除后不可恢复, 确定删除吗？" @confirm="toDelete(scope.row.activity_id)">
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
import moment from 'moment'

export default {
  name: 'ActivityList',
  data () {
    return {
      loading: false,

      searchForm: {
        activity_title: '',
        activity_start_time: '',
        activity_end_time: '',
        activity_face_to: 2
      },
      startTime: '',
      endTime: '',

      activityData: [],
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

      if (this.startTime) this.searchForm.activity_start_time = moment(this.startTime).format('X')
      else this.searchForm.activity_start_time = ''

      if (this.endTime) this.searchForm.activity_end_time = moment(this.endTime).format('X')
      else this.searchForm.activity_end_time = ''

      this.getList()
    },

    // 获取列表
    getList () {
      this.loading = true
      this.$http.activityApi.getActivityList({
        ...this.searchForm,
        pageCurrent: this.pageCurrent,
        pageSize: this.pageSize
      }).then(res => {
        if (res.data.code == 200) {
          this.loading = false
          this.activityData = res.data.data
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

    // 编辑
    toEdit (id) {
      this.$router.push({ path: '/home/activity-edit', query: { id } })
    },

    // 删除
    toDelete (id) {
      this.$http.activityApi.deleteActivity({ activity_id: id }).then(res => {
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