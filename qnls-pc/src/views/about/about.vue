<template>
  <SmallLayout :img="require('@/assets/imgs/about/about_banner.jpg')">
    <!-- 标题 -->
    <template slot="title">
      <div class="about_title">
        <h1>关于九驻青年旅舍</h1>
        <p>
          九驻青年旅舍，不仅汇集了全国各地的品质青旅供您挑选，更具有人文关怀，邀您在旅途中找到归属感。
        </p>
      </div>
    </template>
    <!-- 关于我们详情 -->
    <template slot="content" v-if="aboutDetail.length">
      <div class="img_area">
        <img :src="baseURL+aboutDetail[0].about_img" alt="" />
        <div class="para p1">
          <h2>{{aboutDetail[0].about_title}}</h2>
          <p>{{aboutDetail[0].about_content}}</p>
        </div>
      </div>
      <div class="small_imgs">
        <div class="img_area">
          <img :src="baseURL+aboutDetail[1].about_img" alt="" />
          <div class="para p2">
            <h2>{{aboutDetail[1].about_title}}</h2>
            <p>{{aboutDetail[1].about_content}}</p>
          </div>
        </div>
        <div class="img_area">
          <img :src="baseURL+aboutDetail[2].about_img" alt="" />
          <div class="para p3">
            <h2>{{aboutDetail[2].about_title}}</h2>
            <p>{{aboutDetail[2].about_content}}</p>
          </div>
        </div>
      </div>
    </template>
  </SmallLayout>
</template>

<script>
import SmallLayout from "@/components/smallLayout.vue";
import { getAboutsList } from '@/network/about'
import { mapState } from 'vuex'

export default {
  name: "About",
  components: { SmallLayout },
  computed: { ...mapState(['baseURL']) },
  data () {
    return {
      aboutDetail: []
    }
  },
  mounted () {
    this.getDetail()
  },
  methods: {
    // 获取关于我们详情
    getDetail () {
      getAboutsList().then(res => {
        if (res.data.code == 200) {
          this.aboutDetail = res.data.data
        } else {
          console.log(res.data.msg)
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.about_title {
  h1 {
    font-weight: normal;
    padding-bottom: 10px;
  }
}
.img_area {
  position: relative;
  overflow: hidden;
  &:hover .para {
    transform: translateY(0%);
    bottom: 0px;
  }
  img {
    width: 100%;
  }
  .para {
    position: absolute;
    bottom: 60px;
    width: 100%;
    padding: 18px 20px;
    color: #fff;
    transition: 0.4s;
    transform: translateY(100%);
    h2 {
      padding-bottom: 10px;
    }
  }
}
.small_imgs {
  display: flex;
  margin-top: 20px;
  margin-bottom: 50px;
  justify-content: space-between;

  > div {
    width: 48.5%;
  }
}
.p1 {
  background: #87c524;
}
.p2 {
  background: #f7941c;
}
.p3 {
  background: #4b8fcc;
}
</style>