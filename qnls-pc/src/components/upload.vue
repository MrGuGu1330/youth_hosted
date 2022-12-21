<template>
  <el-upload list-type="picture-card" :name="filename" :action="baseURL + action" :file-list="fileList" :limit="limit"
    :on-change="handleChange" :on-remove="handleRemove" :before-upload="beforeUpload">
    <i slot="default" class="el-icon-plus"></i>
  </el-upload>
</template>

<script>
import { deleteImgs } from '@/network/deletePic'
import { mapState } from "vuex";

export default {
  name: 'Upload',
  props: {
    limit: {
      type: Number,
      default: 1,
    },
    filename: {
      type: String,
    },
    action: {
      type: String,
    },
    delURL: {
      type: String,
    },
    defaultfileList: {
      type: Array,
      default: [],
    },
  },
  computed: { ...mapState(['baseURL']) },
  data () {
    return {
      fileList: [...this.defaultfileList],
    }
  },
  watch: {
    defaultfileList (val) {
      this.fileList = [...this.defaultfileList]
    },
  },
  methods: {
    handleRemove (file) {
      deleteImgs(this.delURL, { imgURL: file.data }).then(res => {
        if (res.data.code == 200) {
          this.fileList = this.fileList.filter(item => {
            return item.uid !== file.uid
          })

          this.sendResult()
        }
      })
    },

    handleChange (file) {
      if (file.status == 'success') {
        this.fileList.push({
          uid: file.uid,
          url: file.url,
          data: file.response.data,
        })

        this.sendResult()
      }
    },

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

    sendResult () {
      let arr = []
      this.fileList.forEach(item => {
        arr.push(item.data)
      })
      this.$emit('sendImgsList', arr)
    },
  },
}
</script>

<style lang="scss" scoped></style>
