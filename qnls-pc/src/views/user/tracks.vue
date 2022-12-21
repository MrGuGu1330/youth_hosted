<template>
  <el-tabs tab-position="top" style="height: 200px;">
    <el-tab-pane label="我的评价">
      <div class="comment-area">
        <comment-card v-for="(item,i) in comments" :key="i" :supplier_name="item.supplier_name"
          :supplier_imgs="item.supplier_imgs" :grade="item.comment_score" :comment_time="item.comment_time"
          :content="item.comment_content" :order_id="item.order_id" :comment_id="item.comment_id">
        </comment-card>
      </div>
      <el-pagination background layout="->,prev, pager, next" :current-page="this.commentsDate.pageCurrent"
        :page-size="this.commentsDate.pageSize" :total="this.commentsDate.total" @current-change="cPageChange">
      </el-pagination>
    </el-tab-pane>
    <el-tab-pane label="我的活动">
      <el-tabs v-model="index" tab-position="left" style="height: 500px;" @tab-click="getActivityByIndex">
        <el-tab-pane label="全  部" name="0">
          <activity-card v-for="(item,i) in activities" :key="i" :activity_title="item.activity_title"
            :join_time="item.join_time"></activity-card>
        </el-tab-pane>
        <el-tab-pane label="未使用" name="1">
          <activity-card v-for="(item,i) in activities" :key="i" :activity_title="item.activity_title"
            :join_time="item.join_time"></activity-card>
        </el-tab-pane>
        <el-tab-pane label="已使用" name="2">
          <activity-card v-for="(item,i) in activities" :key="i" :activity_title="item.activity_title"
            :join_time="item.join_time"></activity-card>
        </el-tab-pane>
        <el-tab-pane label="已过期" name="3">
          <activity-card v-for="(item,i) in activities" :key="i" :activity_title="item.activity_title"
            :join_time="item.join_time"></activity-card>
        </el-tab-pane>
      </el-tabs>
      <!--  分页  -->
      <el-pagination background layout="->,prev, pager, next" :current-page="this.activitiesDate.pageCurrent"
        :page-size="this.activitiesDate.pageSize" :total="this.activitiesDate.total" @current-change="aPageChange">
      </el-pagination>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { getActivities, getComments } from "@/network/user";
import ActivityCard from "@/views/user/components/ActivityCard";
import moment from "moment";
import CommentCard from "@/views/user/components/CommentCard";

export default {
  name: "tracks",
  components: { CommentCard, ActivityCard },
  props: ['uid'],
  data () {
    return {
      index: '0',
      activities: [], //存储活动列表数据
      activitiesDate: { // 绑定活动分页数据
        pageCurrent: 1,
        pageSize: 3,
        total: 0
      },
      comments: [], // 存储评论列表数据
      commentsDate: { // 绑定评论分页数据
        pageCurrent: 1,
        pageSize: 3,
        total: 0
      },
    }
  },
  methods: {
    // 获取活动列表
    getActivity () {
      getActivities({ type: this.index, user_id: this.uid, pageCurrent: this.activitiesDate.pageCurrent, pageSize: this.activitiesDate.pageSize }).then(res => {
        // console.log(res)
        this.activities = res.data.data
        this.activitiesDate.total = res.data.total
        for (let i = 0; i < this.activities.length; i++) {
          this.activities[i].join_time = moment(this.activities[i].join_time * 1000).format('YYYY-MM-DD')
        }
      })
    },
    // 根据标签获取活动列表
    getActivityByIndex () {
      // console.log(this.index)
      this.activitiesDate.pageCurrent = 1
      this.getActivity()
    },
    // 实现活动分页功能
    aPageChange (page) {
      console.log(page)
      this.activitiesDate.pageCurrent = page
      this.getActivity()
    },
    getComment () {
      getComments({ user_id: this.uid, pageCurrent: this.commentsDate.pageCurrent, pageSize: this.commentsDate.pageSize }).then(res => {
        this.comments = res.data.data
        for (let i = 0; i < this.comments.length; i++) {
          this.comments[i].comment_time = moment(this.comments[i].comment_time * 1000).format('YYYY-MM-DD')
        }
      })
    },
    // 实现评论分页功能
    cPageChange (page) {
      // console.log(page)
      this.commentsDate.pageCurrent = page
      this.getComment()
    }

  },
  mounted () {
    // 预加载活动列表
    getActivities({ type: this.index, user_id: this.uid }).then(res => {
      // console.log(res)
      this.activitiesDate.pageCurrent = res.data.pageCurrent
      this.activitiesDate.pageSize = res.data.pageSize
      this.activitiesDate.total = res.data.total
      this.activities = res.data.data
      for (let i = 0; i < this.activities.length; i++) {
        this.activities[i].join_time = moment(this.activities[i].join_time * 1000).format('YYYY-MM-DD')
      }
    })
    // 预加载评论列表
    getComments({ user_id: this.uid }).then(res => {
      console.log(res)
      this.commentsDate.pageCurrent = res.data.pageCurrent
      this.commentsDate.pageSize = res.data.pageSize
      this.commentsDate.total = res.data.total
      this.comments = res.data.data
      for (let i = 0; i < this.comments.length; i++) {
        this.comments[i].comment_time = moment(this.comments[i].comment_time * 1000).format('YYYY-MM-DD')
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.comment-area {
  height: 564px;
  margin-bottom: 8px;
}
</style>