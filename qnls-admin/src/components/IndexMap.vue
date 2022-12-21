<template>
  <div id="index_map"></div>
</template>

<script>
import * as echarts from 'echarts'
import china from '@/utils/china.json'

export default {
  name: 'IndexMap',
  data () {
    return {
      myechart: null,
      data: []
    }
  },
  methods: {
    getAddress () {
      this.$http.indexApi.getSupplierInArea().then(res => {
        if (res.data.code == 200) {
          this.data = res.data.data
          this.init()
        }
      })
    },
    init () {
      echarts.registerMap('china', china)
      this.myechart = echarts.init(document.getElementById('index_map'))

      /*获取地图数据*/
      let geoCoordMap = {};
      let mapFeatures = echarts.getMap('china').geoJson.features;
      mapFeatures.forEach((item) => {
        let name = item.properties.name; // 地区名称
        geoCoordMap[name] = item.properties.center; // 地区经纬度
      });

      function convertData (data) {
        let res = [];
        for (let i = 0; i < data.length; i++) {
          let geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value),
            });
          }
        }
        return res;
      };

      let option = {
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            if (typeof params.value == 'object') {
              return `${params.name}:<br />${params.value[2]}家`;
            } else {
              return `${params.name}:<br />${params.value ? params.value + '家' : '暂无数据'}`;
            }
          }
        },
        geo: {
          show: true,
          map: 'china',
          label: {
            normal: { show: false },
            emphasis: { show: false }
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: '#308BA7',
              borderColor: '#57C8C8',
            },
            emphasis: { areaColor: '#57C8C8' }
          },
          zoom: 1.2
        },
        series: [
          {
            type: 'map',
            map: 'china',
            geoIndex: 0,
            aspectScale: 0.75,
            showLegendSymbol: false,
            label: {
              normal: { show: true },
              emphasis: {
                show: false,
                textStyle: { color: '#fff' }
              }
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: '#031525',
                borderColor: '#3B5077',
              },
              emphasis: {
                areaColor: '#2B91B7'
              }
            },
            animation: false,
            data: this.data
          },
          {
            name: '点',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: 'pin',
            symbolSize: 40,
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: '#fff',
                  fontSize: 9,
                },
                formatter: (data) => {
                  return data.value[2]
                },
              }
            },
            itemStyle: {
              normal: { color: '#F62157' }
            },
            data: convertData(this.data),
          },
        ]
      };
      this.myechart.setOption(option);
    }
  },
  mounted () {
    this.getAddress()
    window.onresize = () => { this.myechart.resize() }
  }
}
</script>

<style lang="scss" scoped>
#index_map {
  width: 100%;
  height: 100%;
}
</style>