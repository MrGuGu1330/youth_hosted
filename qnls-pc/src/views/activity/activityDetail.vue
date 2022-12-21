<template>
  <SmallLayout :img="require('@/assets/imgs/activity/activity_banner.jpg')">
    <!-- 活动标题 -->
    <template slot="title">
      <h2 class="title">{{ activityInfo.activity_title }}</h2>
    </template>
    <!-- 活动内容 -->
    <template slot="content">
      <div class="a_info">
        <h3 class="atitle">活动内容</h3>
        <div class="acontent" v-html="activityInfo.activity_content"></div>
        <h3 class="atitle">活动折扣</h3>
        <div class="acontent">
          <p>
            所有参与活动者可享受打<span>{{
              activityInfo.activity_discount * 10
            }}</span>折优惠
          </p>
        </div>
        <h3 class="atitle">活动对象</h3>
        <div class="acontent">
          <p>
            {{ activityInfo.activity_face_to == 0 ? "所有用户" : "所有会员" }}
          </p>
        </div>
        <h3 class="atitle">活动时间</h3>
        <div class="acontent">
          <p>
            开始时间：{{
              moment(activityInfo.activity_start_time * 1000).format(
                "YYYY-MM-DD"
              )
            }}
          </p>
          <p>
            结束时间：{{
              moment(activityInfo.activity_end_time * 1000).format("YYYY-MM-DD")
            }}
          </p>
        </div>
        <div class="btns">
          <el-button :disabled="btn !== 1" type="primary" @click="participate">{{
              btn == 0 ? "活动未开始" : btn == 1 ? "点击参加" : "活动已结束"
            }}
          </el-button>
        </div>
      </div>
    </template>
  </SmallLayout>
</template>

<script>
import SmallLayout from "@/components/smallLayout.vue";
import moment from "moment";
import { getActivityByAid, joinActivity } from "@/network/activity";
import { judgeVIP } from "@/network/vip";
import { mapState } from "vuex";

export default {
  name: "ActivityDetail",
  components: { SmallLayout },
  computed: { ...mapState(["type", "user"]) },
  data () {
    return {
      activity_id: null, // 当前活动aid
      btn: 0, // 活动状态 0 未开始 1正在进行 2已结束
      activityInfo: "", // 活动详情
    };
  },
  mounted () {
    this.activity_id = this.$route.query.activity_id;
    this.getDetail();
  },
  methods: {
    moment,

    // 获取活动详情
    getDetail () {
      getActivityByAid({ activity_id: this.activity_id }).then((res) => {
        if (res.data.code == 200) {
          this.activityInfo = res.data.data;
          let time = Math.floor(Date.now() / 1000);

          console.log(res.data.data.activity_start_time)

          // 判断活动状态
          if (res.data.data.activity_start_time > time) this.btn = 0;
          if (
            res.data.data.activity_start_time < time &&
            res.data.data.activity_end_time > time
          )
            this.btn = 1;
          if (res.data.data.activity_end_time < time) this.btn = 2;
        } else {
          console.log(res.data.msg);
        }
      });
    },

    // 判断是否能够参加活动
    participate () {
      // 未登录提示'请先登录'
      if (this.type == 0) return this.$message.error("请先登录");

      // 旅店登录提示'此活动仅限用户参加'
      if (this.type == 2) return this.$message.error("此活动仅限用户参加");

      // 判断活动面向对象 ato=1面向会员 ato=0面向所有用户
      if (this.activityInfo.activity_face_to == 1) {
        // 判断用户是否为会员 isvip=0非会员 isvip=1会员
        judgeVIP({ user_id: this.user.id }).then((res) => {
          if (res.data.code == 200) {
            let isvip = res.data.data.isvip;
            if (isvip == 0) this.$message.error("此活动仅限会员参加");
            else {
              this.joinActivity();
            }
          } else {
            console.log(res.data.msg);
          }
        });
      } else {
        this.joinActivity();
      }
    },

    // 参加活动
    joinActivity () {
      joinActivity({
        user_id: this.user.id,
        activity_id: this.activity_id,
      }).then((res) => {
        if (res.data.code == 200) {
          this.$message.success("参加成功");
        } else {
          this.$message.error("您已参与本次活动，请勿重复参加");
          console.log(res.data.msg);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 32px;
  font-family: KeBianTi;
}
.a_info {
  padding-bottom: 50px;
  .atitle {
    margin-bottom: 10px;
  }
  .acontent {
    margin-bottom: 5px;
  }
  p {
    span {
      font-size: 18px;
      font-weight: 700;
      font-style: italic;
      margin: 0 5px;
      color: #f00;
    }
  }
}
</style>

<style lang="scss">
.acontent {
  p {
    margin: 10px 0;
    text-indent: 2em;
  }
  img {
    width: 60%;
    margin: 0 auto;
  }
}
</style>