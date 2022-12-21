<template>
  <div class="house_detail">
    <el-descriptions border :column="1" :labelStyle="{width:'120px'}">
      <el-descriptions-item label="房型名称">{{houseDetail.house_name}}</el-descriptions-item>
      <el-descriptions-item label="房型价格">{{houseDetail.house_price}}元</el-descriptions-item>
      <el-descriptions-item label="房型地址">{{houseDetail.house_address}}</el-descriptions-item>
      <el-descriptions-item label="房型简单介绍">{{houseDetail.house_intro}}</el-descriptions-item>
      <el-descriptions-item label="房型详细介绍">{{houseDetail.house_detail}}</el-descriptions-item>
      <el-descriptions-item label="房型图片">
        <viewer>
          <div class="house_imgs">
            <img v-for="(item,index) in houseDetail.house_imgs?.split(',')" :key="index" height="300px"
              :src="baseURL + item" alt="暂无图片">
          </div>
        </viewer>
      </el-descriptions-item>
    </el-descriptions>
    <div class="btns">
      <el-button type="primary" @click="$router.go(-1)">返回上一页</el-button>
      <el-button type="primary" @click="toSupplierDetail">查看旅店详情</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'HouseDetail',
  computed: { ...mapState(['baseURL']) },
  data () {
    return {
      house_id: '',
      houseDetail: {},
    }
  },
  methods: {
    getDetail () {
      this.$http.houseApi.getHouseDetail({ house_id: this.house_id }).then(res => {
        if (res.data.code == 200) {
          this.houseDetail = res.data.data
        }
      })
    },

    toSupplierDetail () {
      this.$router.push({ path: '/home/supplier-detail', query: { id: this.houseDetail.supplier_id } })
    }
  },
  mounted () {
    this.house_id = this.$route.query.id
    if (!this.house_id) {
      this.$message.error('请先选择一间房型')
      this.$router.push('/home/house-list')
    } else {
      this.getDetail()
    }
  }
}
</script>

<style lang="scss" scoped>
.house_detail {
  .house_imgs {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    img {
      margin: 5px;
    }
  }
  .btns {
    margin-top: 20px;
    text-align: center;
  }
}
</style>