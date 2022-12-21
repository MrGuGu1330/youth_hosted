<template>
  <div class="about">
    <el-table ref="aboutTable" size='small' :data="anoutData" style="width: 100%"
      :header-cell-style="{background:'#eee'}" v-loading="loading">
      <el-table-column align="center" type="index" :index="indexMethod" label="序号">
      </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <viewer>
            <img width="200px" :src="baseURL + scope.row.about_img" alt="">
          </viewer>
        </template>
      </el-table-column>
      <el-table-column prop="about_title" label="标题">
      </el-table-column>
      <el-table-column prop="about_content" label="内容">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit" circle @click="toEdit(scope.row.about_id)">
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'about',
  computed: { ...mapState(['baseURL']) },
  data () {
    return {
      loading: false,
      anoutData: []
    }
  },
  methods: {
    // 获取关于我们列表
    getList () {
      this.loading = true
      this.$http.aboutApi.getAboutList().then(res => {
        if (res.data.code == 200) {
          this.loading = false
          this.anoutData = res.data.data
        }
      })
    },

    // 列表序号
    indexMethod (index) {
      return index + 1;
    },

    toEdit (id) {
      this.$router.push({ path: '/home/about-edit', query: { id } })
    }
  },
  mounted () {
    this.getList()
  }
};
</script>

<style lang='scss' scoped>
</style>
