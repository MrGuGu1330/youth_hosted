<template>
  <div>
    <div class="header"><h3>修改房型</h3></div>

    <el-form
      ref="form"
      :rules="rules"
      :model="houseInfo"
      label-width="110px"
      style="margin-top: 20px"
    >
      <el-form-item label="旅店图片：" prop="house_imgs">
        <Upload
          :limit="limit"
          :filename="filename"
          :action="action"
          :delURL="delURL"
          :defaultfileList="defaultfileList"
          @sendImgsList="getImgsList"
        />
      </el-form-item>
      <el-form-item label="房型名称:" prop="house_name">
        <el-input v-model="houseInfo.house_name"></el-input>
      </el-form-item>
      <el-form-item label="房型介绍:" prop="house_intro">
        <el-input v-model="houseInfo.house_intro"></el-input>
      </el-form-item>
      <el-form-item label="详细介绍:" prop="house_detail">
        <el-input v-model="houseInfo.house_detail"></el-input>
      </el-form-item>
      <el-form-item label="地址:" prop="house_address">
        <el-input v-model="houseInfo.house_address"></el-input>
      </el-form-item>
      <el-form-item label="价格:" prop="house_price">
        <el-input v-model="houseInfo.house_price"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Upload from '@/components/upload'
import {
  addSupplierHouses,
  getHousesInfo,
  updateSupplierHouses,
} from '@/network/supplier'

export default {
  data() {
    return {
      houseInfo: {},
      newHouse: {
        house_name: '',
        house_intro: '',
        house_detail: '',
        house_price: '',
        house_address: '',
        house_imgs: '',
        supplier_id: '',
      },

      // 上传图片
      limit: 4,
      filename: 'supplier_imgs',
      action: '/upload/uploadSupplierImgs', // 上传图片接口
      delURL: '/upload/deleteSupplierImgs', // 删除图片接口
      defaultfileList: [], // 已有的图片

      rules: {
        house_name: { required: true, message: '必填', trigger: 'blur' },
        house_intro: { required: true, message: '必填', trigger: 'blur' },
        house_detail: { required: true, message: '必填', trigger: 'blur' },
        house_price: { required: true, message: '必填', trigger: 'blur' },
        house_address: { required: true, message: '必填', trigger: 'blur' },
        house_imgs: { required: true, message: '必填', trigger: 'blur' },
      },
    }
  },
  components: {
    Upload,
  },
  computed: {
    ...mapState(['user', 'baseURL']),
  },
  methods: {
    onSubmit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          console.log(1111)
          updateSupplierHouses(this.houseInfo).then(res => {
            console.log('修改房型', res)
            if (res.data.code == 200) {
              this.$message({
                message: '修改成功！！',
                type: 'success',
              })
              this.$router.push('/supplier/supplierinfo/list')
            }
          })
        }
      })
    },

    // 获取修改后的图片信息
    getImgsList(val) {
      this.houseInfo.house_imgs = val.join(',')
      console.log(this.houseInfo.house_imgs) // 这里是结果, 返回的是数组形式
    },
  },
  mounted() {
    this.houseInfo.supplier_id = this.user.id
    let houseId = this.$route.params.house_id
    console.log(houseId)
    getHousesInfo({ house_id: houseId }).then(res => {
      console.log(res)
      this.houseInfo = res.data.data

      res.data.data.house_imgs.split(',').forEach((item, index) => {
        this.defaultfileList.push({
          uid: index,
          url: this.baseURL + item,
          status: 'success',
          data: item,
        })
      })
    })
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
      content: '';
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
