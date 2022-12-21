<template>
  <el-dialog title="选择地址" :visible.sync="dialogVisible" width="600px" :close-on-click-modal='false' destroy-on-close>
    <div class="search_area">
      <el-input placeholder="请输入地址" v-model="address" @keyup.enter.native="makerAddr" />
      <el-button type="primary" icon="el-icon-search" @click="makerAddr">搜索</el-button>
    </div>

    <div id="container"></div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader';
import { mapState } from 'vuex'

export default {
  name: 'SelectAddr',
  data () {
    return {
      dialogVisible: false,
      map: null,
      marker: null,
      geocoder: null,
      address: ''
    }
  },
  computed: { ...mapState(['center']) },
  mounted () {
  },
  methods: {
    showDialog () {
      this.dialogVisible = true
      this.initMap()
    },

    // 初始化地图
    initMap () {
      AMapLoader.load({
        key: "8c10dcbccd5d0c6b8fe424c288ebf0cc",
        version: "2.0",
        plugins: ['AMap.Geocoder'],
      }).then((AMap) => {
        this.map = new AMap.Map("container", {
          zoom: 8,
          center: this.center,
        });

        this.marker = new AMap.Marker({
          position: this.center
        });

        this.geocoder = new AMap.Geocoder()

        this.map.add(this.marker);
        this.map.on('click', this.clickHandler);
      }).catch(e => {
        console.log(e);
      })
    },

    // 点击地图获取地址
    clickHandler (e) {
      let lnglat = [e.lnglat.getLng(), e.lnglat.getLat()]

      this.geocoder.getAddress(lnglat, (status, result) => {
        if (status === 'complete' && result.info === 'OK') {
          this.address = result.regeocode.formattedAddress
          this.map.setCenter(lnglat)
          this.marker.setPosition(lnglat)
        }
      })
    },

    // 根据输入地址获取地图位置
    makerAddr () {
      if (this.address) {
        this.geocoder.getLocation(this.address, (status, result) => {
          if (status === 'complete' && result.info === 'OK') {
            let lnglat = [result.geocodes[0].location.lng, result.geocodes[0].location.lat]

            this.map.setCenter(lnglat)
            this.marker.setPosition(lnglat)
          } else {
            this.$message.error('输入的地址有误')
          }
        })
      }
    },

    //确定
    onSubmit () {
      if (this.address) {
        this.geocoder.getLocation(this.address, (status, result) => {
          if (status === 'complete' && result.info === 'OK') {
            if (result.geocodes[0].level == '省' || result.geocodes[0].level == '市' || result.geocodes[0].level == "区县") {
              this.$message.error('请输入完整地址')
            } else {
              this.dialogVisible = false
              this.$emit('sendAddr', this.address)
            }
          } else {
            this.$message.error('输入的地址有误')
          }
        })
      } else {
        this.dialogVisible = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#container {
  width: 100%;
  height: 400px;
  margin-top: 20px;
}
.search_area {
  display: flex;
}
</style>