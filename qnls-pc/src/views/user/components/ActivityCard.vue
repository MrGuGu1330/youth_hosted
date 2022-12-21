<template>
  <div>
    <el-card shadow="hover" class="box-card">
      <el-descriptions :column="1" :colon="false">
        <el-descriptions-item label="活动名称：" >{{this.activity_title}}</el-descriptions-item>
        <el-descriptions-item label="参加时间：">{{this.join_time}}</el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "ActivityCard",
  props:{
    join_time:{
      type: String,
      default: ''
    },
    activity_title:{
      type: String,
      default: ''
    }
  }


}
</script>

<style lang="scss">
  .box-card{
    position: relative;
    width: 100%;
    min-width: 610px;
    border-radius: 5px;
    margin-bottom: 8px;
  }
  .activityFont{
    font-weight: 900;
    font-size: 24px;
    line-height: 24px;
    color: #f7941c;
  }
</style>