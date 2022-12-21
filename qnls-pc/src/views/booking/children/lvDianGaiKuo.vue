<template>
  <div class="lvDianGaiKuo">
    <div class="lvDianLeft">
      <div class="left1">
        <img :src="url + lvdian.supplier_imgs" alt="" />
        <div>
          <h2>{{ lvdian.supplier_name }}</h2>
          <p>{{ lvdian.supplier_intro }}</p>
        </div>
      </div>
      <div class="left2">
        <h3>评论</h3>
        <div v-for="(item, i) in comments" :key="i" class="comments">
          <div>
            <img :src="url + item.user_avatar" alt="" />
            <span>{{
								$moment(
									parseInt(item.comment_time * 1000)
								).format('YYYY-MM-DD HH:mm:ss')
							}}
            </span>
          </div>
          <div class="pingfeng">
            <el-rate :value="item.comment_score - 0" disabled></el-rate>
            <p>{{ item.comment_content }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="lvDianRight">
      <div class="right1">
        <h3>营业时间</h3>
        <h5>前台 :00:00:00 到 23:55:00</h5>
        <h5>入住时间:00:14:00后</h5>
        <h5>房间保留到 23:55:00前</h5>
      </div>
      <div class="right2">
        <h3>设施与服务</h3>
        <p>
          公共休息室 |花园 |阳台/露台/天井 |台球桌 |无线网络 |自助厨房
          |空调 |自助洗衣 |阅读室/阅览角 |小卖部 |带锁储物柜 |行李房
          |附近有网吧 |当地市场 |购物区/商城 |超市/食品店 |餐厅
          |电影院 |博物馆/艺术馆 |戏院 |公园/绿地 |旅游/旅游服务台
          |便利店 |
        </p>
      </div>
      <div class="right3">
        <h3>联系我们</h3>
        <h5>{{ lvdian.supplier_name }}</h5>
        <h5>地址：{{ lvdian.supplier_address }}</h5>
        <h5>邮编：510600</h5>
      </div>
    </div>
  </div>
</template>

<script>
import { getComments } from '@/network/booking';
export default {
  data () {
    return {
      url: this.$store.state.baseURL,
      comments: [],
    };
  },
  props: {
    lvdian: {},
  },
  watch: {
    lvdian: function (newVal, oldVal) {
      this.lvdian = newVal; //newVal即是chartData
      getComments({ supplier_id: this.lvdian.supplier_id }).then(res => {
        this.comments = res.data.data;
        console.log(this.comments);
      });
    },
  },
  mounted () { },
};
</script>

<style lang="scss" scoped>
.lvDianGaiKuo {
  display: flex;
  justify-content: space-around;
  h3 {
    border-bottom: rgb(221, 221, 221) 1px solid;
    margin-bottom: 20px;
  }
  > .lvDianLeft {
    width: 620px;
    padding: 20px 10px;
    > .left1 {
      display: flex;
      > img {
        width: 205px;
        height: 128px;
      }
      > div {
        margin-left: 10px;
        > h3 {
          color: #333;
        }
        > p {
          color: #666;
        }
      }
    }
    .left2 {
      margin-top: 20px;
      .comments {
        display: flex;
        margin: 20px 0;
        justify-content: space-between;
        > div {
          width: 120px;
          > span {
            font-size: 12px;
            color: #999999;
          }
        }
        img {
          width: 100px;
          height: 100px;
          border-radius: 50px;
        }
        .pingfeng {
          width: 460px;
        }
      }
    }
  }
  > .lvDianRight {
    width: 390px;
    > div {
      margin-top: 20px;
    }
  }
}
</style>
