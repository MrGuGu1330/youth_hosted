<template>
  <div class="commentsBar">
    <h3>评论</h3>
    <div v-for="(item, i) in comments" :key="i" class="comments">
      <div>
        <img :src="url + item.user_avatar" alt="" />
        <span>{{
						$moment(parseInt(item.comment_time * 1000)).format(
							'YYYY-MM-DD HH:mm:ss'
						)
					}}
        </span>
      </div>
      <div class="pingfeng">
        <el-rate :value="item.comment_score - 0" disabled></el-rate>
        <p>{{ item.comment_content }}</p>
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
    supplier_id: '',
  },
  watch: {
    supplier_id: function (newVal, oldVal) {
      this.supplier_id = newVal; //newVal即是chartData
      getComments({ supplier_id: this.supplier_id }).then(res => {
        this.comments = res.data.data;
        // console.log(this.comments);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.commentsBar {
  padding: 20px;
  h3 {
    border-bottom: rgb(221, 221, 221) 1px solid;
    margin-bottom: 20px;
  }
  .comments {
    margin: 20px 0;
    display: flex;
    border-bottom: 1px solid rgb(235, 231, 231);
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
</style>
