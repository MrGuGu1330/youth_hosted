<template>
  <div>
    <div class="header">
      <h3>房型列表</h3>
    </div>
    <el-table :data="roomList" style="width: 1000px">
      <el-table-column label="图片" prop="house_imgs">
        <template slot-scope="scope">
          <el-carousel trigger="click" height="80px" indicator-position="none">
            <el-carousel-item v-for="(item, i) in scope.row.house_imgs" :key="i">
              <img :src="baseURL + item" alt="" style="width: 100%; height: 100%" />
            </el-carousel-item>
          </el-carousel>
        </template>
      </el-table-column>
      <el-table-column label="名称" width="120" prop="house_name">
      </el-table-column>
      <el-table-column label="介绍" width="120" prop="house_intro">
      </el-table-column>
      <el-table-column label="细节" width="180" prop="house_detail">
      </el-table-column>
      <el-table-column label="地址" width="180" prop="house_address">
      </el-table-column>
      <el-table-column label="价格" width="50" prop="house_price">
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle size="small" title="修改房型"
            @click="$router.push(`/supplier/supplierinfo/updatehouse/${scope.row.house_id}`)"></el-button>
          <el-button type="success" icon="el-icon-s-promotion" circle size="small" title="查看房型"
            @click="getHouseDetail(scope.row.house_id)"></el-button>

          <el-button type="warning" icon="el-icon-delete" circle size="small" title="删除房型"
            @click="handleDelete(scope.row.house_id)">
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="房型详情" :visible.sync="dialogVisible">
      <el-carousel trigger="click" height="400px" style="width: 60%; margin: 0 auto" indicator-position="none">
        <el-carousel-item v-for="item in houseInfo.house_imgs" :key="item">
          <img :src="baseURL + item" alt="" style="width: 100%; height: 400px" />
        </el-carousel-item>
      </el-carousel>
      <el-form ref="form" label-width="80px">
        <el-form-item label="房型名称:">
          <h2>
            {{ houseInfo.house_name }}
          </h2>
        </el-form-item>
        <el-form-item label="房型介绍:">
          <p>{{ houseInfo.house_intro }}</p>
        </el-form-item>
        <el-form-item label="详细介绍:">
          <p>{{ houseInfo.house_detail }}</p>
        </el-form-item>
        <el-form-item label="地址:">
          <p>{{ houseInfo.house_address }}</p>
        </el-form-item>
        <el-form-item label="价格:">
          <h1 style="color: orange">{{ houseInfo.house_price }}/天</h1>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  getSupplierHouses,
  deleteSupplierHouses,
  getHousesInfo,
} from '@/network/supplier'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      dialogVisible: false,
      formLabelWidth: '120px',
      houseInfo: {},
      roomList: [
        {
          house_id: '',
          house_name: '',
          house_intro: '',
          house_detail: '',
          house_price: '',
          house_address: '',
          house_imgs: '',
        },
      ],
    }
  },
  computed: {
    ...mapState(['user', 'baseURL']),
  },
  methods: {
    // 查询房型详情
    getHouseDetail (id) {
      this.dialogVisible = true
      getHousesInfo({ house_id: id }).then(res => {
        console.log(res)
        this.houseInfo = res.data.data
        this.houseInfo.house_imgs = res.data.data.house_imgs.split(',')
      })
    },
    // 删除房型
    handleDelete (id) {
      this.$confirm('此操作将删除该房型, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          deleteSupplierHouses({ house_id: id }).then(res => {
            if (res.data.code == 200) {
              this.getHousesList()
            }
          })
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },

    // 封装获取房型列表
    getHousesList () {
      getSupplierHouses({ supplier_id: this.user.id }).then(res => {
        if (res.data.code == 200) {
          // console.log("获取房型列表", res.data.data);
          this.roomList = res.data.data
          res.data.data.forEach((item, i) => {
            // console.log(item.house_imgs.split(","));
            this.roomList[i].house_imgs = item.house_imgs.split(',')
            // console.log(this.roomList);
          })
        }
      })
    },
  },
  mounted () {
    this.getHousesList()
  },
}
</script>

<style lang="scss" scoped>
.header {
  height: 40px;
  border-bottom: 2px solid #ccc;
  > h3 {
    line-height: 40px;
    position: relative;
    font-weight: 500;
    color: var(--color-primary);

    > &::after {
      content: "";
      display: block;
      width: 4em;
      height: 4px;
      background-color: var(--color-primary);
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
}
</style>
