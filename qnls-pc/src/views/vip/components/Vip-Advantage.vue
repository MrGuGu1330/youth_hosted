<template>
  <div class="vip-advantage">
    <div>
      <img :src="pic" alt="" />
    </div>

    <h3>{{ advantage }}</h3>
    <p>{{ detail }}</p>
  </div>
</template>

<script>
export default {
  props: {
    pic: {
      // 声明属性，指定需要显示的头像路径
      type: String,
      default: ``,
    },
    advantage: {
      // 声明属性，指定需要显示的昵称
      type: String, //数据的数据类型
      default: '标题', // 默认值
      // required: true, //属性是否必填属性
      // validata: '' 通过正则验证属性值的格式
    },
    // 可以用以下替代，不限制数据类型
    // props:['avatar','name']
    detail: {
      type: String,
      default: '详情',
    },
  },
}
</script>

<style lang="scss" scoped>
.vip-advantage {
  display: inline-flex;
  margin: 5px;
  // border: 1px solid #ccc;
  flex-direction: column;
  align-items: center;
  // text-align: center;
  width: 270px;
  border-radius: 5px;

  > div {
    margin-bottom: 20px;
    border-radius: 5px;
    overflow: hidden;

    > img {
      width: 270px;
      height: 270px;
      display: block;
      transition: 0.3s;
    }
    &:hover {
      img {
        transform: scale(1.1);
      }
    }
  }
  > h3 {
    font-size: 16px;
    margin-bottom: 10px;
    font-weight: bold;
  }
  > P {
    margin: 5px 0;
    font-size: 14px;
    padding: 0 5px;
  }
}
</style>
