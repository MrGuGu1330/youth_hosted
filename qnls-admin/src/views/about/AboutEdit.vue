<template>
  <div class="about_edit">
    <el-form ref="aboutForm" :model="aboutDetail" :rules="aboutRules" label-width="100px" style="width:500px">
      <el-form-item label="标题" prop="about_title">
        <el-input type="text" v-model="aboutDetail.about_title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="about_content">
        <el-input type="textarea" :rows="5" v-model="aboutDetail.about_content" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <el-upload name="about_img" :action="baseURL + '/upload/uploadAboutImgs'" :show-file-list="false"
          :on-change="handleChange" :before-upload="beforeUpload">
          <img width="500px" v-if="aboutDetail.about_img" :src="baseURL + aboutDetail.about_img">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button size="middle" type="primary" @click="onSubmit">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AboutEdit',
  computed: { ...mapState(['baseURL']) },
  data () {
    return {
      about_id: 0,
      aboutDetail: {},
      aboutRules: {
        about_title: { required: true, trigger: 'blur', message: '请输入标题' },
        about_content: { required: true, trigger: 'blur', message: '请输入内容' },
      },

      delImgs: [],
    }
  },
  methods: {
    // 获取关于我们详情
    getDetail () {
      this.$http.aboutApi.getAboutDetail({ about_id: this.about_id }).then(res => {
        if (res.data.code == 200) {
          this.aboutDetail = res.data.data
          this.imageUrl = this.baseURL + res.data.data.about_img
        }
      })
    },

    // 图片格式限制
    beforeUpload (file) {
      const isJPG =
        file.type === 'image/jpeg' ||
        file.type === 'image/jpg' ||
        file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG、JPEG、PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },

    // 上传图片
    handleChange (file) {
      if (file.status == 'success') {
        this.aboutDetail.about_img = file.response.data
        this.delImgs.push(file.response.data)
        this.$message.success('上传成功')
      }
    },

    // 确定修改
    onSubmit () {
      this.$refs.aboutForm.validate(valid => {
        if (valid) {
          this.$http.aboutApi.updateAbout(this.aboutDetail).then(res => {
            if (res.data.code == 200) {
              this.$message.success('修改成功')
              this.$router.push('/home/about-list')
              this.delImgs.pop()
            }
          })
        } else {
          return false
        }
      })
    },

    // 删除多余图片
    deleteImgs () {
      console.log({ delImgs: this.delImgs.join(',') })
      this.$http.aboutApi.deleteAboutImgs({ delImgs: this.delImgs.join(',') }).then(res => {
        if (res.data.code == 200) {
          console.log('删除多余图片成功')
        } else {
          console.log('删除多余图片失败')
        }
      })
    }
  },
  mounted () {
    this.about_id = this.$route.query.id
    if (!this.about_id) {
      this.$router.push('/home/about-list')
      this.$message.error('请先选择一条关于我们信息')
    } else {
      this.getDetail()
    }
  },

  beforeDestroy () {
    this.deleteImgs()
  }
}
</script>

<style lang="scss" scoped>
.el-upload-list__item-thumbnail {
  width: 500px;
}
</style>