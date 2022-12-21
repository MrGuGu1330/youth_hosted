<template>
  <div class="activity_edit">
    <el-form ref="activityForm" :model="activityForm" :rules="activityRules" label-width="100px">
      <el-form-item label="活动标题" prop="activity_title">
        <el-input class="width" type="text" v-model="activityForm.activity_title" placeholder="请输入活动标题"></el-input>
      </el-form-item>
      <el-form-item label="活动时间" prop="activity_time">
        <el-date-picker class="width" v-model="activityForm.activity_time" type="daterange" range-separator="至"
          start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="活动折扣" prop="activity_discount">
        <el-input class="width" type="number" :min="0" :max="10" v-model="activityForm.activity_discount"
          placeholder="请输入折扣">
          <span slot="append">折</span>
        </el-input>
      </el-form-item>
      <el-form-item label="活动面向对象">
        <el-radio-group v-model="activityForm.activity_face_to">
          <el-radio :label="0">所有用户</el-radio>
          <el-radio :label="1">仅会员</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动封面" prop="activity_cover">
        <el-upload name="activity_imgs" :action="baseURL + '/upload/uploadActivityImgs'" :show-file-list="false"
          :on-change="handleChange" :before-upload="beforeUpload">
          <img width="300px" v-if="activityForm.activity_cover" :src="baseURL + activityForm.activity_cover">
          <i v-else class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="活动正文" prop="activity_content">
        <div style="border: 1px solid #ccc; margin-top: 10px">
          <!-- 工具栏 -->
          <Toolbar style="border-bottom: 1px solid #ccc" :editor="editor" />
          <!-- 编辑器 -->
          <Editor style="height: 400px; overflow-y: hidden" :defaultConfig="editorConfig"
            v-model="activityForm.activity_content" @onCreated="onCreated" />
        </div>
      </el-form-item>
    </el-form>

    <div class="activity_bottom">
      <el-button v-if="!activity_id" size="middle" type="primary" @click="onSubmit(0)">新增</el-button>
      <el-button v-if="activity_id" size="middle" type="primary" @click="onSubmit(1)">修改</el-button>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { mapState } from 'vuex'
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

export default {
  name: 'ActivityEdit',
  computed: { ...mapState(['baseURL']) },
  components: { Editor, Toolbar },
  data () {
    const validateDis = (rule, value, callback) => {
      if (!value) callback(new Error('折扣不能为空'))
      else if (value < 0 || value > 10)
        callback(new Error('折扣金额错误'))
      else callback()
    }

    return {
      activity_id: 0,
      activityForm: {
        activity_title: '',
        activity_time: null,
        activity_discount: 10,
        activity_face_to: 0,
        activity_cover: '',
        activity_content: ''
      },
      activityRules: {
        activity_title: { required: true, message: '标题不能为空', trigger: 'blur' },
        activity_time: { required: true, message: '时间不能为空', trigger: 'onchange' },
        activity_discount: { required: true, validator: validateDis, trigger: 'blur' },
        activity_cover: { required: true, message: '封面不能为空', trigger: 'blur' },
        activity_content: { required: true, message: '正文不能为空', trigger: 'blur' },
      },

      delImgs: [],

      editor: null,
      delImgs2: [],
      editorConfig: {
        placeholder: "请输入内容",
        MENU_CONF: {
          uploadImage: {
            server: 'http://127.0.0.1:3000/upload/uploadActivityImgs',
            fieldName: 'activity_imgs',
            customInsert: (res, insertFn) => {
              this.delImgs2.push(res.data)
              insertFn(this.baseURL + res.data)
            },
          },
        },
      },
    }
  },
  methods: {
    // 获取详情
    getDetail () {
      this.$http.activityApi.getActivityDetail({ activity_id: this.activity_id }).then(res => {
        if (res.data.code == 200) {
          let t1 = new Date(res.data.data.activity_start_time * 1000)
          let t2 = new Date(res.data.data.activity_end_time * 1000)

          this.activityForm = {
            activity_title: res.data.data.activity_title,
            activity_time: [t1, t2],
            activity_discount: res.data.data.activity_discount * 10,
            activity_face_to: res.data.data.activity_face_to * 1,
            activity_cover: res.data.data.activity_cover,
            activity_content: res.data.data.activity_content,
          }
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

    // 上传封面图片
    handleChange (file) {
      if (file.status == 'success') {
        this.activityForm.activity_cover = file.response.data
        this.delImgs.push(file.response.data)
        this.$message.success('上传成功')
      }
    },

    // 初始化编辑器
    onCreated (editor) {
      this.editor = Object.seal(editor);
    },

    // 删除图片
    delImage (html = "") {
      // 获取目前文章里所有的img标签
      const imgReg = /<img.*?(?:>|\/>)/gi;
      let arr = html.match(imgReg);

      // 获取其中图片路径
      const srcReg = /src=[\\"]?([^\\"]*)[\\"]?/i;
      let imgs = [];
      if (arr) {
        for (let i = 0; i < arr.length; i++) {
          let src = arr[i].match(srcReg)[1];
          imgs.push(src.split(":3000")[1]);
        }
      }

      // 现有图片与原有图片比对
      let delArr = Array.from(
        new Set(this.delImgs2.filter((item) => !imgs.includes(item)))
      );
      this.delImgs.push(delArr)

      this.$http.activityApi.deleteActivityImgs({ delImgs: this.delImgs.join(',') }).then(res => {
        if (res.data.code == 200) {
          console.log('删除多余封面图片成功')
        } else {
          console.log('删除多余封面图片失败')
        }
      })
    },

    onSubmit (type) {
      this.$refs.activityForm.validate((valid) => {
        if (valid) {
          if (this.delImgs.length) this.delImgs.pop()

          let data = {
            activity_title: this.activityForm.activity_title,
            activity_cover: this.activityForm.activity_cover,
            activity_start_time: moment(this.activityForm.activity_time[0]).format('X'),
            activity_end_time: moment(this.activityForm.activity_time[1]).format('X'),
            activity_content: this.activityForm.activity_content,
            activity_discount: this.activityForm.activity_discount / 10,
            activity_face_to: this.activityForm.activity_face_to,
          }

          if (type == 0) this.addActivity(data)
          if (type == 1) this.updateActivity({ activity_id: this.activity_id, ...data })

        } else {
          return false;
        }
      });
    },
    // 新增
    addActivity (data) {
      this.$http.activityApi.addActivity(data).then(res => {
        if (res.data.code == 200) {
          this.$message.success('添加成功')
          this.$router.push('/home/activity-list')
        } else {
          console.log('出错了')
        }
      })
    },
    // 修改
    updateActivity (data) {
      this.$http.activityApi.updateActivity(data).then(res => {
        if (res.data.code == 200) {
          this.$message.success('修改成功')
          this.$router.push('/home/activity-list')
        } else {
          console.log('出错了')
        }
      })
    },
  },

  mounted () {
    this.activity_id = this.$route.query.id
    if (this.$route.query.id) {
      this.getDetail()
    }
  },

  beforeDestroy () {
    this.delImage(this.activityForm.activity_content)

    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁 editor
  }
}
</script>

<style lang="scss" scoped>
.activity_edit {
  .width {
    width: 500px;
  }
  .activity_bottom {
    margin: 20px 0;
    text-align: center;
  }
}
</style>