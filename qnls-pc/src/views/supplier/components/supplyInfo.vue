<template>
  <div>
    <div class="header"><h3>旅店信息</h3></div>
    <el-form
      :model="supplyInfo"
      :rules="rules1"
      ref="supplyInfo"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="旅店图片：" prop="supplier_imgs" label-width="110px">
        <img
          style="
            width: 146px;
            height: 146px;
            border-radius: 10px;
            border: 1px solid #ccc;
          "
          v-if="!isupdate"
          :src="baseURL + supplyInfo.supplier_imgs"
          alt=""
        />
        <Upload
          v-else
          :limit="limit"
          :filename="filename"
          :action="action"
          :delURL="delURL"
          :defaultfileList="defaultfileList"
          @sendImgsList="getImgsList"
        />
      </el-form-item>
      <el-form-item label="旅店名称：" prop="supplier_name" label-width="110px">
        <span v-if="!isupdate">{{ supplyInfo.supplier_name }}</span>
        <el-input v-model="supplyInfo.supplier_name" v-else></el-input>
      </el-form-item>
      <el-form-item
        label="旅店手机号："
        prop="supplier_phone"
        label-width="110px"
      >
        <span v-if="!isupdate">{{ supplyInfo.supplier_phone }}</span>
        <el-input v-model="supplyInfo.supplier_phone" v-else></el-input>
      </el-form-item>
      <el-form-item label="邮箱：" prop="supplier_email" label-width="110px">
        <span v-if="!isupdate">{{ supplyInfo.supplier_email }}</span>
        <el-input v-model="supplyInfo.supplier_email" v-else></el-input>
      </el-form-item>

      <el-form-item label="地址：" prop="supplier_address" label-width="110px">
        <span v-if="!isupdate">{{ supplyInfo.supplier_address }}</span>
        <el-input v-model="supplyInfo.supplier_address" v-else></el-input>
      </el-form-item>

      <el-form-item label="简介：" prop="supplier_intro" label-width="110px">
        <span v-if="!isupdate">{{ supplyInfo.supplier_intro }}</span>
        <el-input
          class="intro"
          type="textarea"
          placeholder="请输入内容"
          v-model="supplyInfo.supplier_intro"
          maxlength="300"
          show-word-limit
          :autosize="{ minRows: 4, maxRows: 4 }"
          v-else
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-show="!isupdate" @click="isupdate = true"
          >修改</el-button
        >

        <el-button v-show="isupdate" @click="cancelUpdateInfo">取消</el-button>
        <el-button type="primary" v-show="isupdate" @click="onSubmit"
          >保存</el-button
        >
      </el-form-item>
    </el-form>

    <el-divider content-position="left">修改密码</el-divider>
    <el-form
      :model="pwdForm"
      :rules="rules2"
      ref="updatePwd"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="新密码：" prop="pwd" label-width="100px">
        <el-input v-model="pwdForm.pwd" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码：" prop="checkPwd" label-width="100px">
        <el-input v-model="pwdForm.checkPwd" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updatePWD">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  getSupplyInfo,
  updateInfo,
  updateSupplierPass,
} from "@/network/supplier";
import { mapState, mapMutations } from "vuex";
import Upload from "@/components/upload";

export default {
  data() {
    var Pass1 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.pwdForm.checkPwd !== "") {
          this.$refs.updatePwd.validateField("checkPwd");
        }
        callback();
      }
    };
    var Pass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.pwdForm.pwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      isupdate: false,
      supplyInfo: {},
      resetInfo: {},

      pwdForm: {
        pwd: "",
        checkPwd: "",
      },

      rules1: {
        supplier_name: { required: true, message: "必填", trigger: "blur" },
        supplier_phone: { required: true, message: "必填", trigger: "blur" },
        supplier_address: { required: true, message: "必填", trigger: "blur" },
      },
      rules2: {
        pwd: [{ validator: Pass1, trigger: "blur" }],
        checkPwd: [{ validator: Pass2, trigger: "blur" }],
      },

      limit: 1,
      filename: "supplier_imgs",
      action: "/upload/uploadSupplierImgs", // 上传图片接口
      delURL: "/upload/deleteSupplierImgs", // 删除图片接口
      defaultfileList: [], // 已有的图片
    };
  },
  computed: {
    ...mapState(["user", "baseURL"]),
  },
  components: {
    Upload,
  },
  methods: {
    ...mapMutations(["setUser"]),
    handleRemove(file, fileList) {
      // console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    cancelUpdateInfo() {
      this.isupdate = false;
      this.supplyInfo = this.resetInfo;
      this.$router.go(0);
    },
    onSubmit() {
      // console.log(this.$refs['supplyInfo'])
      this.$refs["supplyInfo"].validate((valid) => {
        if (valid) {
          this.$confirm("是否确认修改?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              updateInfo(this.supplyInfo).then((res) => {
                if (res.data.code == 200) {
                  this.isupdate = false;
                  // console.log(res)
                  // this.user
                  this.setUser({
                    id: this.user.id,
                    name: this.supplyInfo.supplier_name,
                    avatar: this.user.avatar,
                  });
                }
              });
              this.$message({
                type: "success",
                message: "修改成功!",
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消修改",
              });
            });
        }
      });
    },
    updatePWD() {
      this.$refs["updatePwd"].validate((valid) => {
        if (valid) {
          this.$confirm("是否确认修改?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              //发送修改密码请求
              let params = {
                supplier_id: this.user.id,
                supplier_pwd: this.pwdForm.pwd,
              };
              updateSupplierPass(params).then((res) => {
                console.log(res);
                if (res.data.code == 200) {
                  this.$message({
                    type: "success",
                    message: "修改成功!",
                  });
                  this.$refs.updatePwd.resetFields();
                }
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消修改",
              });
            });
        }
      });
    },

    // 获取修改后的图片信息
    getImgsList(val) {
      this.supplyInfo.supplier_imgs = val.join(",");
      console.log(this.supplyInfo.supplier_imgs); // 这里是结果, 返回的是数组形式
    },
  },
  mounted() {
    getSupplyInfo({ supplier_id: this.user.id }).then((res) => {
      this.supplyInfo = res.data.data;
      console.log(res.data.data);

      this.supplyInfo.supplier_imgs.split(",").forEach((item, index) => {
        this.defaultfileList.push({
          uid: index,
          url: this.baseURL + item,
          status: "success",
          data: item,
        });
      });

      this.resetInfo = res.data.data;
    });
  },
};
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
.el-form {
  margin-top: 20px;
}
</style>
