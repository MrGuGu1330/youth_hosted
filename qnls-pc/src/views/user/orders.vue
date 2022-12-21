<template>
  <div>
    <div class="order_area">
      <el-tabs v-model="index" tab-position="top" type="card" style="height: 200px;" @tab-click="getOrdersByIndex">
        <!--  渲染订单  -->
        <el-tab-pane label="全部订单" name="0" >
          <order-card
              v-for="(item,i) in orders" :key="i"
              :order_id="item.order_id"
              :total="item.order_orgin_price"
              :payment="item.order_price"
              :resident="item.user_name"
              :phone="item.user_phone"
              :is_comment="item.is_comment"
          ></order-card>
        </el-tab-pane>
        <el-tab-pane label="待评价" name="1" >
          <order-card
              v-for="(item,i) in orders" :key="i"
              :order_id="item.order_id"
              :total="item.order_orgin_price"
              :payment="item.order_price"
              :resident="item.user_name"
              :phone="item.user_phone"
              :is_comment="item.is_comment"
          ></order-card>
        </el-tab-pane>
        <el-tab-pane label="已评价" name="2" >
          <order-card
              v-for="(item,i) in orders" :key="i"
              :order_id="item.order_id"
              :total="item.order_orgin_price"
              :payment="item.order_price"
              :resident="item.user_name"
              :phone="item.user_phone"
              :is_comment="item.is_comment"
          ></order-card>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!--  分页  -->
    <el-pagination
        background
        layout="->,prev, pager, next"
        :current-page="this.ordersDate.pageCurrent"
        :page-size="this.ordersDate.pageSize"
        :total="this.ordersDate.total"
        @current-change="pageChange">
    </el-pagination>
  </div>
</template>

<script>
import {getOrders} from "@/network/user";
import OrderCard from "@/views/user/components/OrderCard";
export default {
  components: {OrderCard},
  props:['uid'],
  data() {
    return {
      index:'0',
      orders: [], // 存储订单列表数据
      ordersDate:{ // 绑定订单分页数据
        pageCurrent:1,
        pageSize:3,
        total: 0
      },
    }
  },
  methods: {
    // 按照标签类型查找订单
    getOrdersByIndex(){
      // console.log(this.index)
      this.ordersDate.pageCurrent = 1
      this.getOrder()
    },
    // 查询订单列表
    getOrder(){
      getOrders({type:this.index, user_id:this.uid, pageCurrent:this.ordersDate.pageCurrent, pageSize:this.ordersDate.pageSize}).then(res => {
        this.ordersDate.total = res.data.total
        this.orders = res.data.data
      })
    },
    // 实现分页功能
    pageChange(page){
      // console.log(page)
      this.ordersDate.pageCurrent = page
      this.getOrder()
    }

  },
  mounted() {
    // 记载全部订单列表
    getOrders({type:this.index,user_id:this.uid}).then(res => {
      console.log(res)
      this.ordersDate.pageCurrent = res.data.pageCurrent
      this.ordersDate.pageSize = res.data.pageSize
      this.ordersDate.total = res.data.total
      this.orders = res.data.data
    })
    // console.log(this.ordersDate)
  }
}
</script>

<style lang="scss" scoped>
  .order_area{
    height: 580px;
    margin-bottom: 8px;
  }
</style>