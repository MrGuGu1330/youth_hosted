<template>
  <div class="footer">
    <div class="footer_box">
      <div class="footer_content">
        <p>E-Mail：service@jiuzhu.com</p>
        <p>杭州市xxxxxxxxxxxxx</p>
        <div class="share">
          <a href="">wechat</a>
          <a href="">weibo</a>
        </div>
        <p class="link">
          <a href=""> xxx |</a>
          <a href=""> xxxx |</a>
          <a href=""> xx |</a>
          <a href=""> xxx |</a>
        </p>
        <p class="copyright">
          版权所有 © 九驻青年旅舍
          <a href="https://beian.miit.gov.cn/" target="_blank">
            粤ICP备05005462号</a>
          <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44010602004069"><img
              src="" style="float: left" />粤公网安备 44010602004069号</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style lang="scss" scoped>
.footer {
  position: relative;
  height: var(--footer-height);
  background: #333;
  z-index: 1000;
  color: #fff;

  .footer_box {
    text-align: right;
    // 固定高度
    height: 100%;
    .footer_content {
      // 固定高度
      height: 100%;
      padding: 50px 110px;
      color: #999;

      .share {
        a {
          color: #fff;
        }
      }

      .link {
        a {
          color: #666;
        }
      }

      .copyright {
        color: #666;
        a {
          color: #666;
        }
      }
    }
  }
}
</style>