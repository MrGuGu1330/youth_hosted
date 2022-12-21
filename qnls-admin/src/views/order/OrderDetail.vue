<template>
  <div class="supplier_detail">
    <el-descriptions border :column="1" :labelStyle="{ width: '200px', height: '200px' }" :title="`订单编号：${order_id}`">
      <el-descriptions-item :label="item.house_name" v-for="(item, i) in orderDetail" :key="i">
        <el-descriptions :column="1" :labelStyle="{ width: '100px' }">
          <el-descriptions-item label="介绍">{{
            item.house_intro
          }}</el-descriptions-item>
          <el-descriptions-item label="房型描述">{{
            item.house_detail
          }}</el-descriptions-item>
          <el-descriptions-item label="入住人数">{{
            `男：${item.male}  女：${item.female}  小孩：${item.children}`
          }}</el-descriptions-item>
          <el-descriptions-item label="入住时间">
            {{
              `${new Date(parseInt(item.check_in) * 1000)
                .toLocaleString()
                .replace(/:\d{1,2}$/, " ")}-${new Date(
                parseInt(item.check_out) * 1000
              )
                .toLocaleString()
                .replace(/:\d{1,2}$/, " ")} 共${item.days}天`
            }}
          </el-descriptions-item>
          <el-descriptions-item label="地址">{{
            item.house_address
          }}</el-descriptions-item>
          <el-descriptions-item label="单价">{{
            item.house_price
          }}</el-descriptions-item>
          <el-descriptions-item label="房间总价">{{
            item.total_price
          }}</el-descriptions-item>
        </el-descriptions>
      </el-descriptions-item>
      <el-descriptions-item label="折扣后总价" :labelStyle="{ height: '20px' }"><span
          style="font-size: 30px; color: orange">{{ total_price }}</span>
        &nbsp;元</el-descriptions-item>
    </el-descriptions>
    <div class="btns">
      <el-button type="primary" @click="$router.go(-1)">返回上一页</el-button>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "OrderDetail",
  data () {
    return {
      orderDetail: [],
      order_id: "",
      total_price: 0,
    };
  },
  methods: {
    // 获取订单详情
    getDetail () {
      let params = { order_id: this.$route.query.order_id };
      console.log(params);
      this.$http.orderApi.getOrderDetail(params).then((res) => {
        console.log(res);
        this.orderDetail = res.data.data[0];
        console.log(this.orderDetail);
        this.order_id = this.orderDetail[0].order_id;

        this.total_price = res.data.data[1][0].order_price;
      });
    },
    toHouseList () { },
  },
  mounted () {
    if (this.$route.query.order_id) {
      this.getDetail();
    } else {
      this.$message.error("请先选择订单");
      this.$router.push("/home/order-list");
    }
  },
};
</script>

<style lang="scss" scoped>
.btns {
  margin-top: 20px;
  text-align: center;
}
</style>
