<template>
  <SmallLayout :img="require('@/assets/imgs/activity/activity_banner.jpg')">
    <!-- 活动导航 -->
    <template slot="title">
      <div class="title">精彩活动</div>
      <div class="nav_items">
        <div v-for="(item, index) in navList" :key="index" @click="changeNav(index)">
          <ActivityBtn :title="item" :class="['activity_btn', active == index ? 'active' : '']"></ActivityBtn>
        </div>
      </div>
    </template>
    <!-- 活动列表 -->
    <template slot="content">
      <div v-loading="loading">
        <el-empty v-if="!activityList.length" description="暂无活动"></el-empty>
        <div v-if="activityList.length" class="activity_items">
          <div v-for="item in activityList" class="activity_item" :key="item.activity_id"
            @click="toDetail(item.activity_id)">
            <img :src="baseURL + item.activity_cover" alt="" />
            <div class="activity_title">{{ item.activity_title }}</div>
            <div class="activity_time">
              开始时间：{{
                  moment(item.activity_start_time * 1000).format("YYYY-MM-DD")
                }}
            </div>
            <div class="activity_time">
              结束时间：{{
                  moment(item.activity_end_time * 1000).format("YYYY-MM-DD")
                }}
            </div>
          </div>
        </div>
        <div class="page_area">
          <el-pagination background layout="prev, pager, next" :page-size="6" :current-page="pageCurrent"
            :total="total - 0" @current-change="handleCurrentChange">
          </el-pagination>
        </div>
      </div>
    </template>
  </SmallLayout>
</template>

<script>
import SmallLayout from "@/components/smallLayout.vue";
import ActivityBtn from "./components/activityBtn.vue";
import moment from "moment";
import { mapState } from "vuex";
import { getActivityList } from "@/network/activity";

export default {
  name: "ActivityList",
  components: { SmallLayout, ActivityBtn },
  computed: { ...mapState(["baseURL"]) },
  data () {
    return {
      navList: ["全部", "正在进行", "未开始", "已结束"],
      active: 0, // 0全部 1正在进行 2未开始 3已结束
      loading: false, // 加载
      activityList: [], // 活动列表
      pageCurrent: 1, // 当前页码
      total: 0, // 总条数
      pageCount: 0, // 总页数
    };
  },
  mounted () {
    this.getList();
  },
  methods: {
    moment,
    // 切换导航
    changeNav (i) {
      this.active = i;
      this.pageCurrent = 1;
      this.getList();
    },

    // 获取活动列表
    getList () {
      this.loading = true;
      getActivityList({
        type: this.active,
        pageCurrent: this.pageCurrent,
        pageSize: 6,
      }).then((res) => {
        if (res.data.code == 200) {
          this.loading = false;
          this.activityList = res.data.data;
          this.total = res.data.total;
          this.pageCount = res.data.pageCount;
        } else {
          console.log(res.data.msg)
        }
      });
    },

    // 切换当前页
    handleCurrentChange (pageCurrent) {
      this.pageCurrent = pageCurrent;
      this.getList();
    },

    // 查看详情
    toDetail (activity_id) {
      this.$router.push({ path: "/activity/activityDetail", query: { activity_id } });
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 32px;
  font-weight: bold;
}
.nav_items {
  display: flex;
}
.activity_btn {
  margin-right: 10px;
}
.activity_items {
  display: flex;
  flex-wrap: wrap;
  @media screen and (min-width: 1500px) {
    .activity_item {
      width: calc((100% - 40px) / 3);
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(3n) {
        margin-right: 0px;
      }
    }
  }
  @media screen and (max-width: 1500px) {
    .activity_item {
      width: calc((100% - 15px) / 2);
      margin-right: 15px;
      margin-bottom: 15px;
      &:nth-child(2n) {
        margin-right: 0px;
      }
    }
  }
  .activity_item {
    padding: 15px;
    border-radius: 15px;
    background: #fff;
    transition: 0.3s;
    cursor: pointer;
    &:hover {
      box-shadow: 0 4px 10px 4px #ddd;
      transform: translateY(-5px) scale(1.01);
    }
    > img {
      width: 100%;
      height: 200px;
      border-radius: 15px;
    }
    .activity_title {
      width: 100%;
      margin: 15px 0;
      font-size: 20px;
      font-family: KeBianTi;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .activity_time {
      font-size: 12px;
      color: #aaa;
    }
  }
}
.page_area {
  margin: 20px 0 50px;
  text-align: center;
}
</style>