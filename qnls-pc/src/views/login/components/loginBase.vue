<template>
  <div class="login_page">
    <!-- 登录注册区域 -->
    <div :class="['login_area', changeMood?changeMood:'']">
      <!-- 登录 -->
      <div class="login_area_from login_area_signin">
        <div class="from">
          <h2 class="from_title">欢迎登录</h2>
          <slot name="login"></slot>
        </div>
      </div>
      <!-- 注册框 -->
      <div class="login_area_from login_area_signup">
        <div class="from">
          <h2 class="from_title">注册账号</h2>
          <slot name="register"></slot>
        </div>
      </div>
      <!-- 是否存在账号 -->
      <div class="login_area_overlay">
        <div class="overlay">
          <div class="overlay_panel overlay_left">
            <button class="btn" @click="signBtn">已有账号，直接登录</button>
          </div>
          <div class="overlay_panel overlay_right">
            <button class="btn" @click="signBtn('right_panel_active')">
              没有账号，点击注册
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginBase",
  data () {
    return {
      changeMood: "",
    };
  },
  methods: {
    signBtn (changeMood) {
      this.changeMood = changeMood || "";
      this.$parent.resetForm('loginForm')
      this.$parent.resetForm('registerForm')
    },
  },
};
</script>

<style lang="scss" scoped>
.login_page {
  display: grid;
  place-items: center;
  height: 100vh;
  background: url("@/assets/imgs/login/background_oeuhe7.png") no-repeat center;
  background-size: cover;
  .login_area {
    position: relative;
    width: 758px;
    height: 420px;
    border-radius: 20px;
    background-color: #e9e9e9;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
    overflow: hidden;
    > div {
      position: absolute;
      top: 0;
      height: 100%;
    }
    .login_area_from {
      &.login_area_signin {
        left: 0;
        width: 50%;
      }
      &.login_area_signup {
        right: 0;
        width: 50%;
      }
      .from {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        padding: 0 36px;
        background-color: #e9e9e9;
        .from_title {
          font-weight: 300;
          margin-bottom: 25px;
        }
      }
    }
    .login_area_overlay {
      left: 50%;
      width: 50%;
      overflow: hidden;
      transition: transform 0.6s ease-in-out;
      z-index: 100;
      .overlay {
        position: relative;
        left: -100%;
        width: 200%;
        height: 100%;
        background: url("@/assets/imgs/login/background_oeuhe7.png") no-repeat
          center;
        background-size: cover;
        transform: translateX(0);
        transition: transform 0.6s ease-in-out;
        .overlay_panel {
          position: absolute;
          top: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50%;
          height: 100%;
          transform: translateX(0);
          transition: transform 0.6s ease-in-out;
          &.overlay_left {
            transform: translateX(-20%);
          }
          &.overlay_right {
            right: 0;
            transform: translateX(0);
          }
        }
      }
    }
  }
  .right_panel_active {
    .login_area_overlay {
      transform: translateX(-100%);
      .overlay {
        transform: translateX(50%);
        .overlay_panel {
          &.overlay_left {
            transform: translateX(0);
          }
          &.overlay_right {
            transform: translateX(20%);
          }
        }
      }
    }
  }
  .btn {
    padding: 0.9rem 4rem;
    background-color: rgba(0, 0, 0, 0.69);
    border-radius: 20px;
    color: #e9e9e9;
    font-size: 0.8rem;
    font-weight: bold;
    letter-spacing: 0.1rem;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
    box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, 0.69);
    &:active {
      transform: scale(0.95);
    }
    &.btn_top {
      margin-top: 30px;
    }
  }
}
@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }
  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}
</style>