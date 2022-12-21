<template>
  <div class="supplier_detail">
    <el-descriptions border :column="2" :labelStyle="{width:'100px'}">
      <el-descriptions-item label="旅店名称">{{supplierDetail.supplier_name}}</el-descriptions-item>
      <el-descriptions-item label="旅店手机号">{{supplierDetail.supplier_phone}}</el-descriptions-item>
      <el-descriptions-item label="旅店邮箱">{{supplierDetail.supplier_email}}</el-descriptions-item>
      <el-descriptions-item label="旅店地址">{{supplierDetail.supplier_address}}</el-descriptions-item>
      <el-descriptions-item label="旅店最低价">{{supplierDetail.min_price}}元</el-descriptions-item>
      <el-descriptions-item label="加盟状态">{{supplierDetail.is_agree == 1 ? '已加盟' : '未加盟'}}</el-descriptions-item>
      <el-descriptions-item label="旅店设施" :span="2">
        <div class="facilities" v-for="item in facilities" :key="item.field">
          <div>{{item.title}}：</div>
          <div>
            <span v-if="!item.tags.length">暂无该设施</span>
            <el-tag class="tag" v-for="tag in item.tags" :key="tag">{{tag}}</el-tag>
          </div>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="旅店介绍" :span="2">{{supplierDetail.supplier_intro}}</el-descriptions-item>
      <el-descriptions-item label="旅店图片" :span="2">
        <viewer>
          <img width="500px" :src="baseURL + supplierDetail.supplier_imgs" alt="暂无图片">
        </viewer>
      </el-descriptions-item>
    </el-descriptions>
    <div class="btns">
      <el-button type="primary" @click="$router.go(-1)">返回上一页</el-button>
      <el-button type="primary" @click="toHouseList">查看房型列表</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SupplierDetail',
  data () {
    return {
      supplier_id: '',
      supplierDetail: {},
      facilities: []
    }
  },
  computed: { ...mapState(['baseURL']) },
  methods: {
    getDetail () {
      this.$http.supplierApi.getSupplierDetail({ supplier_id: this.supplier_id }).then(res => {
        if (res.data.code == 200) {
          this.supplierDetail = res.data.data
        }
      })
    },
    getFac () {
      this.$http.supplierApi.getFacilities({ supplier_id: this.supplier_id }).then(res => {
        if (res.data.code == 200) {
          this.facilities = res.data.data
          console.log(this.facilities)
        }
      })
    },

    toHouseList () {
      this.$router.push({ path: '/home/house-list', query: { supplier_name: this.supplierDetail.supplier_name } })
    }
  },
  mounted () {
    this.supplier_id = this.$route.query.id
    if (!this.supplier_id) {
      this.$message.error('请先选择一家旅店')
      this.$router.push('/home/supplier-list')
    } else {
      this.getDetail()
      this.getFac()
    }
  }
}
</script>

<style lang="scss" scoped>
.supplier_detail {
  .btns {
    margin-top: 20px;
    text-align: center;
  }
  .facilities {
    display: flex;
    align-items: center;
    margin: 5px 0;
  }
  .tag {
    margin: 0 5px;
  }
}
</style>