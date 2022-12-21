<template>
  <div id="index_vip"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'IndexVIP',
  data () {
    return {
      myechart: null,
      data: [],
    }
  },
  methods: {
    getVIP () {
      this.$http.indexApi.getVIPcount().then(res => {
        if (res.data.code == 200) {
          this.data = res.data.data
          this.init()
        }
      })
    },

    init () {
      this.myechart = echarts.init(document.getElementById('index_vip'))
      let colorList = ['#57C5BE', '#578CC5', "rgba(250,250,250,0.5)"];
      let sportsIcon = { a: require("@/assets/Index/vip.png"), b: require("@/assets/Index/no_vip.png"), };

      let option = {
        // 中心区域
        title: {
          text: this.data[0].value + this.data[1].value,
          subtext: '总人数(人)',
          x: 'center',
          y: 'center',
          textStyle: {
            fontSize: 30,
            fontWeight: 'normal',
            color: '#333'
          },
          subtextStyle: {
            color: '#666',
            fontSize: 16
          },
        },
        grid: { bottom: 50 },
        legend: {
          show: true,
          orient: 'vertical',
          bottom: '50%',
          left: "5%",
          textStyle: {
            color: '#aaa',
            fontSize: 20,

          },
          icon: 'roundRect'
        },
        // 主要部分
        series: [
          {
            radius: ['25%', '50%'],
            center: ['50%', '50%'],
            type: 'pie',
            itemStyle: {
              normal: { color: params => colorList[params.dataIndex] }
            },
            labelLine: {
              normal: {
                show: true,
                length: 20,
                length2: 160,
                lineStyle: {
                  color: '#d3d3d3'
                },
                align: 'right'
              },
              color: "#000",
              emphasis: { show: true }
            },
            label: {
              normal: {
                formatter: function (params) {
                  var str = '';
                  switch (params.name) {
                    case '会员': str = '{a|}\n{nameStyle|会员 }' + '{rate|' + params.value + '人}'; break;
                    case '非会员': str = '{b|}\n{nameStyle|非会员 }' + '{rate|' + params.value + '人}'; break;
                  }
                  return str
                },
                padding: [0, -50],
                height: 165,
                rich: {
                  a: {
                    width: 38,
                    height: 38,
                    backgroundColor: { image: sportsIcon.a },
                  },
                  b: {
                    width: 38,
                    height: 38,
                    backgroundColor: { image: sportsIcon.b },
                    align: 'left'
                  },
                  nameStyle: {
                    fontSize: 16,
                    color: "#555",
                    align: 'left'
                  },
                  rate: {
                    fontSize: 20,
                    color: "#1ab4b8",
                    align: 'left'
                  }
                }
              }
            },
            data: this.data,
          },
          // 边框的设置
          {
            radius: ['47%', '50%'],
            center: ['50%', '50%'],
            type: 'pie',
            label: {
              normal: { show: false },
              emphasis: { show: false }
            },
            labelLine: {
              normal: { show: false },
              emphasis: { show: false }
            },
            animation: false,
            tooltip: { show: false },
            itemStyle: {
              normal: { color: 'rgba(250,250,250,0.5)' }
            },
            data: [{ value: 1 }],
          }
        ]
      };

      this.myechart.setOption(option);
    }
  },
  mounted () {
    this.getVIP()
    window.onresize = () => { this.myechart.resize() }
  }
}
</script>

<style lang="scss" scoped>
#index_vip {
  width: 100%;
  height: 100%;
}
</style>