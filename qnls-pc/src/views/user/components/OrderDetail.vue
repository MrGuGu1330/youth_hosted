<template>
  <div>
    <el-descriptions :column="2" :colon="false">
      <el-descriptions-item label-class-name="labels" content-class-name="labels" label="预订房间：">{{this.room_name}}  {{this.num}}间</el-descriptions-item>
      <el-descriptions-item></el-descriptions-item>
      <el-descriptions-item label-class-name="labels" content-class-name="labels" label="入住时间：">{{this.check_in}}</el-descriptions-item>
      <el-descriptions-item label-class-name="labels" content-class-name="labels" label="退房时间：">{{this.check_out}}</el-descriptions-item>
      <el-descriptions-item label-class-name="labels" content-class-name="labels" label="入住天数：">{{this.days}} 天</el-descriptions-item>
      <el-descriptions-item label-class-name="labels" content-class-name="labels" label="入住人员：">
        男：{{this.male}}人
        女：{{this.female}}人
        儿童：{{this.children}}人
      </el-descriptions-item>
      <el-descriptions-item label-class-name="labels" content-class-name="totalFont" label="房间单价：">{{this.price}} 元</el-descriptions-item>
      <el-descriptions-item label-class-name="labels" content-class-name="totalFont" label="小计：">{{this.subtotal}} 元</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>

export default {
  name: "OrderDetail", //房间订单信息组件
  props:{
    room_name:{
      type: String,
      default: ''
    },
    male:{
      type: Number,
      default: 0
    },
    female:{
      type: Number,
      default: 0
    },
    children:{
      type: Number,
      default: 0
    },
    num:{
      type: Number,
      default: 1
    },
    check_in:{
      type: String,
      default: ''
    },
    check_out:{
      type: String,
      default: ''
    },
    days:{
      type: Number,
      default: 1
    },
    price:{
      type: String,
      default: ''
    },
    subtotal:{
      type: String,
      default: ''
    }
  },
}
</script>

<style lang="scss">
  .labels{
    font-size: 14px;
    line-height: 30px;
  }
  .totalFont{
    color: #333333;
    font-weight: 900;
    font-size: 16px;
    line-height: 28px;
  }
</style>