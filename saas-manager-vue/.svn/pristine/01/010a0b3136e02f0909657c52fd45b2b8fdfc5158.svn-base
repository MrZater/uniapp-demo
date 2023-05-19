<template>
  <div
    :class="className"
    :style="{ height: height, width: width }"
  />
</template>

<script>
const echarts = require('echarts')
require('echarts/theme/macarons')
import resize from './mixins/resize'

export default {
  name: 'Chart',
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions({ xData, series, legend } = {}) {
      let option = {
        xAxis: {
          data: xData,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 10,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: legend
        },
        series: []
      }
      this.series.forEach((item) => {
        let series = {
          name: item.name,
          smooth: true,
          type: item.type,
          data: item.data,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        }
        option.put(series)
      })
    }
  }
}
</script>

<style scoped>
</style>
