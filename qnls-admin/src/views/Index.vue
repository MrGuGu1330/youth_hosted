<template>
  <div class="index">
    <el-row :gutter="20">
      <el-col :span="8">
        <IndexCard :title="'旅店总数'" :value="supplierCount" :src="require('@/assets/images/supplier.svg')"
          :weight="'家'" />
      </el-col>
      <el-col :span="8">
        <IndexCard :title="'房型总数'" :value="houseCount" :src="require('@/assets/images/house.svg')" :weight="'个'" />
      </el-col>
      <el-col :span="8">
        <IndexCard :title="'用户总数'" :value="userCount" :src="require('@/assets/images/user.svg')" :weight="'位'" />
      </el-col>
    </el-row>

    <div class="echart_area">
      <el-row :gutter="20">
        <el-col style="height: 100%;" :span="12">
          <div class="echart_item">
            <div class="data_title">旅店分布图</div>
            <IndexMap />
          </div>
        </el-col>
        <el-col style="height: 100%;" :span="12">
          <div class="echart_item">
            <div class="data_title">会员占比图</div>
            <IndexVIP />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import IndexCard from '@/components/IndexCard.vue'
import IndexVIP from '@/components/IndexVIP.vue'
import IndexMap from '@/components/IndexMap.vue'

export default {
  name: 'Index',
  components: { IndexCard, IndexVIP, IndexMap },
  data () {
    return {
      supplierCount: 0,
      houseCount: 0,
      userCount: 0,
      addressData: []
    }
  },
  methods: {
    getSupplier () {
      this.$http.indexApi.getSuplierCount().then(res => {
        if (res.data.code == 200) {
          this.supplierCount = res.data.data.total
        }
      })
    },

    getHouse () {
      this.$http.indexApi.getHouseCount().then(res => {
        if (res.data.code == 200) {
          this.houseCount = res.data.data.total
        }
      })
    },

    getUser () {
      this.$http.indexApi.getUserCount().then(res => {
        if (res.data.code == 200) {
          this.userCount = res.data.data.total
        }
      })
    },
  },
  mounted () {
    this.getSupplier()
    this.getHouse()
    this.getUser()
  }
};
</script>

<style lang="scss" scoped>
@font-face {
  font-family: SanJi;
  src: url("@/assets/fonts/SanJiLiJunLiLiangTi-Cu-2.ttf");
}

.el-row,
.el-col {
  margin: 0 !important;
}
.index {
  height: calc(100% - 20px);
  padding: 10px;
  .echart_area {
    display: flex;
    justify-content: space-between;
    height: calc(100% - 200px - 20px - 40px);
    margin-top: 20px;
    .el-row {
      width: 100%;
      .el-col {
        height: calc(100% - 200px - 20px - 40px);
        .echart_item {
          height: 100%;
          box-shadow: 0 0 5px 5px #eee;
          overflow: hidden;
          .data_title {
            margin: 20px;
          }
        }
      }
    }
  }
}

.data_title {
  position: relative;
  padding-left: 10px;
  font-size: 22px;
  font-family: SanJi;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    width: 5px;
    height: 100%;
    background: #3bd2d0;
  }
}
</style>