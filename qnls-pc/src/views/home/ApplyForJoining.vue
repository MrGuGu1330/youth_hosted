<template>
  <div class="apply_forJoining">
    <div class="apply_forJoining_center">
      <el-form ref="supplierForm" label-width="100px" :model="supplierForm" :rules="supplierRules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="旅店名称" prop="supplier_name">
              <el-input v-model="supplierForm.supplier_name" placeholder="请输入旅店名称"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="旅店电话" prop="supplier_phone">
              <el-input v-model="supplierForm.supplier_phone" placeholder="请输入旅店电话"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="旅店邮箱" prop="supplier_email">
              <el-input v-model="supplierForm.supplier_email" placeholder="请输入旅店邮箱"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="旅店最低价" prop="min_price">
              <el-input v-model="supplierForm.min_price" placeholder="请输入旅店最低价"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item class="addr_form" label="旅店地址" prop="supplier_address">
              <el-input v-model="supplierForm.supplier_address" disabled placeholder="请选择地址"></el-input>
              <el-button @click="showAddrDialog">选择地址</el-button>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="旅店介绍" prop="supplier_intro">
              <el-input type="textarea" :rows="4" v-model="supplierForm.supplier_intro" placeholder="请输入旅店介绍">
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="旅店图片" prop="supplier_imgs">
              <span style="color:#fff">请上传一张不超过2M的JPG/JPEG/PNG格式的图片</span>
              <Upload :limit="1" :filename="'supplier_imgs'" :action="'/upload/uploadSupplierImgs'"
                :delURL="'/upload/deleteSupplierImgs'" :defaultfileList="[]" @sendImgsList="getImgsList" />
            </el-form-item>
          </el-col>

        </el-row>
        <el-button type="primary" round @click="onSubmit">立即加盟</el-button>
      </el-form>
    </div>

    <SelectAddr ref="selectAddr" @sendAddr="getAddr" />
  </div>
</template>

<script>
import Upload from '@/components/upload.vue'
import SelectAddr from '@/components/selectAddr.vue'
import { addSupplier } from '../../network/home'

const defaultForm = {
  supplier_name: '',
  supplier_phone: '',
  supplier_email: '',
  supplier_address: '',
  supplier_intro: '',
  min_price: '',
  supplier_imgs: ''
}

export default {
  name: 'ApplyForJoining',
  components: { Upload, SelectAddr },
  data () {
    const validatePhone = (rule, value, callback) => {
      var reg = /^1[3-9]\d{9}$/
      if (!value) callback(new Error('旅店手机号不能为空'))
      else if (!reg.test(value)) callback(new Error('旅店手机号格式错误'))
      else callback()
    }
    const validateEmail = (rule, value, callback) => {
      var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
      if (!value) callback(new Error('旅店邮箱不能为空'))
      else if (!reg.test(value)) callback(new Error('旅店邮箱格式错误'))
      else callback()
    }
    const validatePrice = (rule, value, callback) => {
      var reg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/
      if (!value) callback(new Error('旅店最低价不能为空'))
      else if (!reg.test(value)) callback(new Error('价格格式错误'))
      else callback()
    }
    return {
      supplierForm: Object.assign({}, defaultForm),
      supplierRules: {
        supplier_name: [{ required: true, message: "旅店名称不能为空", trigger: "blur" }],
        supplier_phone: [{ required: true, trigger: "blur", validator: validatePhone }],
        supplier_email: [{ required: true, trigger: "blur", validator: validateEmail }],
        supplier_address: [{ required: true, message: "旅店地址不能为空", trigger: "blur" }],
        supplier_intro: [{ required: true, message: "旅店介绍不能为空", trigger: "blur" }],
        min_price: [{ required: true, trigger: "blur", validator: validatePrice }],
        supplier_imgs: [{ required: true, message: "旅店图片不能为空", trigger: "blur" }],
      },
    };
  },
  methods: {
    // 打开地图选址
    showAddrDialog () {
      this.$refs.selectAddr.showDialog()
    },

    // 获取地址
    getAddr (val) {
      if (val) {
        let i1 = val.indexOf('省') + 1
        let i2 = val.indexOf('市') + 1
        let i3 = val.indexOf('区') + 1 || val.indexOf('县') + 1

        this.supplierForm.supplier_address = `${val.slice(0, i1)}-${val.slice(i1, i2)}-${val.slice(i2, i3)}-${val.slice(i3)}`
      }
    },

    // 获取图片
    getImgsList (val) {
      this.supplierForm.supplier_imgs = val.join(',')
    },

    // 确定
    onSubmit () {
      this.$refs.supplierForm.validate(valid => {
        if (valid) {
          addSupplier(this.supplierForm).then(res => {
            if (res.data.code == 200) {
              this.$message.success('已申请')

              this.supplierForm = Object.assign({}, defaultForm)
              this.$router.push('/')
            }
          })
        } else {
          return false
        }
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.apply_forJoining {
  height: calc(100vh - var(--footer-height));
  padding-top: var(--header-height);
  background: url("@/assets/imgs/home/JoinMe01.jpg");
  .apply_forJoining_center {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    padding: 0 20px;
    padding-top: var(--header-height);
    background-color: rgba(105, 130, 158, 0.637);
    .el-button.is-round {
      display: block;
      width: 400px;
      margin: 0 auto;
      color: #000;
      background-color: #409eff;
    }
  }
}
</style>

<style lang="scss">
.apply_forJoining {
  .el-form-item__label {
    color: white !important;
  }
  .el-form-item__error {
    color: rgb(255, 0, 0);
    font-size: 15px;
  }
}

.addr_form {
  .el-form-item__content {
    display: flex;
  }
}
</style>