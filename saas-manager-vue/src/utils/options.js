export let adminEchartsOption = {
  tooltip: {
    trigger: 'axis',
    formatter: (params) => {
      let str = ''
      params.forEach((item, index) => {
        let temp = {}
        if (
          item.seriesName == '收益' ||
                    item.seriesName == 'eCPM' ||
                    item.seriesName == '预估收益' ||
                    item.seriesName == 'ARPDAU'
        ) {
          temp.value = '￥' + item.value
        } else if (item.seriesName == '渗透率') {
          temp.value = item.value + '%'
        } else {
          temp.value = item.value
        }
        str += item.marker + item.seriesName + ': ' + temp.value + '<br>'
      })
      return params[0].axisValue + '<br>' + str
    }
  },
  legend: {
    data: []
  },
  grid: {
    top: '2%',
    left: '0%',
    right: '2%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [],
    axisLine: {
      lineStyle: {
        color: '#000',
        width: 0.5
      }
    }
  },
  yAxis: [
    // 0
    {
      type: 'value',
      axisLabel: {
        formatter: '￥{value}'
      },
      position: '',
      axisLine: {
        lineStyle: {
          color: '#666',
          width: 0.5
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },

      axisLabel: {
        show: false
      }
    },
    // 1
    {
      type: 'value',
      position: '',
      axisLine: {
        lineStyle: {
          color: '#666',
          width: 0.5
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },

      axisLabel: {
        show: false
      }
    },
    // 2
    {
      type: 'value',
      position: '',
      axisLine: {
        lineStyle: {
          color: '#666',
          width: 0.5
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      }
    },
    // 3
    {
      type: 'value',
      position: '',
      axisLine: {
        lineStyle: {
          color: '#666',
          width: 0.5
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      }
    },
    // 4
    {
      type: 'value',
      position: '',
      axisLine: {
        lineStyle: {
          color: '#666',
          width: 0.5
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      }
    },
    // 5
    {
      type: 'value',
      position: '',
      axisLine: {
        lineStyle: {
          color: '#666',
          width: 0.5
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      }
    },
    // 6
    {
      type: 'value',
      position: '',
      axisLine: {
        lineStyle: {
          color: '#666',
          width: 0.5
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      }
    },
    // 7
    {
      type: 'value',
      position: '',
      axisLine: {
        lineStyle: {
          color: '#666',
          width: 0.5
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      }
    },
    // 8
    {
      type: 'value',
      position: '',
      axisLine: {
        lineStyle: {
          color: '#666',
          width: 0.5
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      }
    },
    // 9
    {
      type: 'value',
      position: '',
      axisLine: {
        lineStyle: {
          color: '#666',
          width: 0.5
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      }
    },
    // 10
    {
      type: 'value',
      position: '',
      axisLine: {
        lineStyle: {
          color: '#666',
          width: 0.5
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      }
    },
    // 11
    {
      type: 'value',
      position: '',
      axisLine: {
        lineStyle: {
          color: '#666',
          width: 0.5
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      }
    },
    // 12
    {
      type: 'value',
      position: '',
      axisLine: {
        lineStyle: {
          color: '#666',
          width: 0.5
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      }
    }
  ],
  series: [
    // 展示
    {
      name: '',
      type: 'line',
      smooth: true,
      yAxisIndex: 0,
      data: [],
      symbol: 'circle', // 设定为实心点
      symbolSize: 6, // 设定实心点的大小
      itemStyle: {
        normal: {
          color: '#0055ff',
          lineStyle: {
            color: '#0055ff',
            width: 2
          }
        }
      }
    },
    // DAU
    {
      name: '',
      type: 'line',
      smooth: true,
      yAxisIndex: 1,
      data: [],
      symbol: 'circle', // 设定为实心点
      symbolSize: 6, // 设定实心点的大小
      itemStyle: {
        normal: {
          color: '#ffab31',
          lineStyle: {
            color: '#ffab31',
            width: 2
          }
        }
      }
    },
    // 预估收益
    {
      name: '',
      type: 'line',
      smooth: true,
      yAxisIndex: 2,
      data: [],
      symbol: 'circle', // 设定为实心点
      symbolSize: 6, // 设定实心点的大小
      itemStyle: {
        normal: {
          color: '#39da61',
          lineStyle: {
            color: '#39da61',
            width: 2
          }
        }
      }
    },
    // 预估eCPM
    {
      name: '',
      type: 'line',
      smooth: true,
      yAxisIndex: 3,
      data: [],
      symbol: 'circle', // 设定为实心点
      symbolSize: 6, // 设定实心点的大小
      itemStyle: {
        normal: {
          color: '#ff6688',
          lineStyle: {
            color: '#ff6688',
            width: 2
          }
        }
      }
    },
    // 展示/DAU
    {
      name: '',
      type: 'line',
      smooth: true,
      yAxisIndex: 4,
      data: [],
      symbol: 'circle', // 设定为实心点
      symbolSize: 6, // 设定实心点的大小
      itemStyle: {
        normal: {
          color: '#a8a8ff',
          lineStyle: {
            color: '#a8a8ff',
            width: 2
          }
        }
      }
    },
    // 收益
    {
      name: '',
      type: 'line',
      smooth: true,
      yAxisIndex: 5,
      data: [],
      symbol: 'circle', // 设定为实心点
      symbolSize: 6, // 设定实心点的大小
      itemStyle: {
        normal: {
          color: '#de7af9',
          lineStyle: {
            color: '#de7af9',
            width: 2
          }
        }
      }
    },
    // ecpm
    {
      name: '',
      type: 'line',
      smooth: true,
      yAxisIndex: 6,
      data: [],
      symbol: 'circle', // 设定为实心点
      symbolSize: 7, // 设定实心点的大小
      itemStyle: {
        normal: {
          color: 'rgb(0, 118, 143)',
          lineStyle: {
            color: 'rgb(0, 118, 143)',
            width: 2
          }
        }
      }
    },
    // DEU
    {
      name: '',
      type: 'line',
      smooth: true,
      yAxisIndex: 7,
      data: [],
      symbol: 'circle', // 设定为实心点
      symbolSize: 7, // 设定实心点的大小
      itemStyle: {
        normal: {
          color: 'rgb(76, 180, 231)',
          lineStyle: {
            color: 'rgb(76, 180, 231)',
            width: 2
          }
        }
      }
    },
    // 渗透率
    {
      name: '',
      type: 'line',
      smooth: true,
      yAxisIndex: 8,
      data: [],
      symbol: 'circle', // 设定为实心点
      symbolSize: 7, // 设定实心点的大小
      itemStyle: {
        normal: {
          color: 'rgb(255, 192, 159)',
          lineStyle: {
            color: 'rgb(255, 192, 159)',
            width: 2
          }
        }
      }
    },
    // 流量请求
    {
      name: '',
      type: 'line',
      smooth: true,
      yAxisIndex: 9,
      data: [],
      symbol: 'circle', // 设定为实心点
      symbolSize: 7, // 设定实心点的大小
      itemStyle: {
        normal: {
          color: 'rgb(145, 78, 0)',
          lineStyle: {
            color: 'rgb(145, 78, 0)',
            width: 2
          }
        }
      }
    },
    // ARPDAU
    {
      name: '',
      type: 'line',
      smooth: true,
      yAxisIndex: 10,
      data: [],
      symbol: 'circle', // 设定为实心点
      symbolSize: 6, // 设定实心点的大小
      itemStyle: {
        normal: {
          color: '#ff746c',
          lineStyle: {
            color: '#ff746c',
            width: 2
          }
        }
      }
    },
    // 展示 / deu
    {
      name: '',
      type: 'line',
      smooth: true,
      yAxisIndex: 11,
      data: [],
      symbol: 'circle', // 设定为实心点
      symbolSize: 6, // 设定实心点的大小
      itemStyle: {
        normal: {
          color: 'rgb(59, 203, 213)',
          lineStyle: {
            color: 'rgb(59, 203, 213)',
            width: 2
          }
        }
      }
    },
    // ARPDEU
    {
      name: '',
      type: 'line',
      smooth: true,
      yAxisIndex: 12,
      data: [],
      symbol: 'circle', // 设定为实心点
      symbolSize: 6, // 设定实心点的大小
      itemStyle: {
        normal: {
          color: '#ff4400',
          lineStyle: {
            color: '#ff4400',
            width: 2
          }
        }
      }
    }
  ]
}

export let adminDateOption = {
  disabledDate(time) {
    return time.getTime() > Date.now() || time.getTime() < 1633017600000
  },
  shortcuts: [{
    text: '最近一周',
    onClick(picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit('pick', [start, end])
    }
  },
  {
    text: '最近14天',
    onClick(picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 14)
      picker.$emit('pick', [start, end])
    }
  },
  {
    text: '最近一个月',
    onClick(picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      picker.$emit('pick', [start, end])
    }
  }
  ]
}

export let pieChartOption = {
  tooltip: {
    trigger: 'item'

  },
  legend: {
    bottom: '3%',
    left: 'center'
  },
  series: [{
    // name: 'Access From',
    type: 'pie',
    radius: ['45%', '70%'],
    center: ['50%', '40%'],
    avoidLabelOverlap: true,
    itemStyle: {
      borderRadius: 0,
      borderColor: '#fff',
      borderWidth: 2

    },
    label: { // 饼图中间文字设置

      normal: {
        show: true,
        position: 'center',
        color: '#000',
        formatter: '汇总：123',
        fontSize: '18',
        fontWeight: 300
      },
      emphasis: { // 中间文字显示
        show: true
      }
    },
    emphasis: {
      label: {
        show: false,
        fontSize: '40',
        fontWeight: 'bold'
      }
    },
    labelLine: {
      show: true
    },

    data: [{
      value: 1048,
      name: 'Search Engine',
      itemStyle: {
        color: 'rgb(255, 192, 159)'
      }
    },
    {
      value: 735,
      name: 'Direct',
      itemStyle: {
        color: 'rgb(145, 78, 0)'
      }
    },
    {
      value: 580,
      name: 'Email',
      itemStyle: {
        color: '#de7af9'
      }
    },
    {
      value: 484,
      name: 'Union Ads',
      itemStyle: {
        color: 'rgb(0, 118, 143)'
      }
    },
    {
      value: 300,
      name: 'Video Ads',
      itemStyle: {
        color: '#a8a8ff'
      }
    }
    ]
  }]
}
