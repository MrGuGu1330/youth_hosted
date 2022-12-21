<template>
  <div>
    <div class="membership-one">
      <!-- 会员卡信息 -->
      <slot name="title"></slot>
      <!-- 用户信息 -->
      <div class="payfor">
        <div class="login" v-if="type==0">
          <div class="avatar">
            <img src="@/assets/imgs/vip_img/touxiang.png" alt="" />
          </div>
          <el-button type="primary" round @click="login">立即登录</el-button>
          <p>---------您还没有登录哦---------</p>
        </div>
        <div class="isvip" v-else-if="type==1">
          <div class="avatar">
            <img :src="avatar" alt="" />
          </div>
          <p>---------会员卡仅对用户开放---------</p>
        </div>
        <div class="isvip" v-else-if="type==2">
          <div class="avatar">
            <img :src="avatar" alt="" />
          </div>
          <p>---------您已经是会员啦---------</p>
        </div>
        <div class="isvip" v-else>
          <div class="avatar">
            <img :src="avatar" alt="" />
          </div>
          <!-- <img src="../../assets/imgs/vip_img/zhifubao.png" alt="" /> -->
          <el-button type="success" @click="becomeVIP">确认开通</el-button>
        </div>
      </div>
    </div>
    <div class="membership-two"></div>
  </div>
</template>

<script>
import { judgeVIP, becomeVIP } from '@/network/vip'
// import { payment } from '@/network/pay'

export default {
  name: 'VipBase',
  data () {
    return {
      type: 0, // 0未登录 1旅店登录 2已是会员
      avatar: '',
      user_id: null,
    }
  },
  methods: {
    login () {
      this.$router.push('/login')
    },
    becomeVIP () {
      console.log(1)
      becomeVIP({
        user_id: this.user_id,
        order_id: this.user_id + Date.now(),
        order_price: '50',
      }).then(res => {
        if (res.data.code == 200) {
          window.location.href = res.data.result
        } else {
          console.log(res.data.msg)
        }
      })
    },
  },
  mounted () {
    this.avatar = this.$store.state.user.avatar ? this.$store.state.baseURL + this.$store.state.user.avatar : require('@/assets/imgs/vip_img/touxiang.png')
    this.user_id = this.$store.state.user.id || null

    // 未登录时
    if (this.$store.state.type == 0) this.type = 0
    // 旅店登录时
    else if (this.$store.state.type == 2) this.type = 1
    // 用户登录时
    else {
      // 判断是否是vip
      judgeVIP({ user_id: this.user_id }).then(res => {
        if (res.data.data.isvip == 1) this.type = 2
        else this.type = 3
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.membership-one {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 700px;
  background: url("@/assets/imgs/vip_img/one.webp") no-repeat center;
  background-size: cover;
  > .payfor {
    display: flex;
    justify-content: center;
    width: 580px;
    height: 500px;
    margin-left: 20px;
    padding-top: 100px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.7);
    > .login {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 400px;
      height: 200px;
      border-radius: 10px;
      background: url("@/assets/imgs/vip_img/touxiang_bg.png") no-repeat center;
      background-size: 100% 100%;
      color: #fff;
      > .avatar {
        width: 100px;
        height: 100px;
        margin-top: -50px;
        margin-bottom: 20px;
        border-radius: 50%;
        // background-size: contain;
        > img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
        }
      }
      > p {
        margin: 20px 0;
      }
    }
    > .isvip {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 400px;
      height: 200px;
      border-radius: 10px;
      background: url("@/assets/imgs/vip_img/touxiang_bg.png") no-repeat center;
      background-size: 100% 100%;
      color: #fff;
      > .avatar {
        width: 100px;
        height: 100px;
        margin-top: -50px;
        margin-bottom: 20px;
        border-radius: 50%;
        // background-size: contain;
        > img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
        }
      }
      > p {
        margin: 20px 0;
      }
    }
    > .vipbuy {
      display: flex;
      flex-direction: column;
      align-items: center;
      > img {
        margin: 10px;
      }
    }
  }
}
.membership-two {
  height: calc(100vh - 700px - 50px);
  background-color: #2b2119;
}
</style>
