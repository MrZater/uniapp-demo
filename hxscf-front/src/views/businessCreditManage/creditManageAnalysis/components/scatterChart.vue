/*
 * @Author: mingliang.zhu 
 * @Date: 2020-09-21 13:15:01 
 * @Last Modified by: mingliang.zhu
 * @Last Modified time: 2020-09-21 15:43:59
 */

<template>
    <div>
        <div :id="id" :style="'height:'+height"></div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import echarts from "echarts";
@Component
export default class scatterChart extends Vue {
    @Prop() dataSource;
    @Prop(String) id;
    @Prop(String) height;

    @Watch("dataSource")
    onchanged(val) {
        this.renderCharts(val);
        this.assetObj = val && val[0];
    }

    chart: any = null;
    assetObj: any = {
        value: "",
        day: "",
        sameCompare: "",
        sequential: "",
        flagSame: "",
        flagSequential: "",
        date: "",
    };

    mounted() {
        let container: any = document.getElementById(this.id);

        this.chart = echarts.init(container, "", {
            width: container.clientWidth,
            height: container.clientHeight,
        });

        if (this.dataSource) {
            this.renderCharts(this.dataSource);
        }

        this.$bus.$on("menuCollapse", () => {
            if (this.$route.name == "home") {
                setTimeout(() => {
                    let newcontainer: any = document.getElementById(this.id);
                    this.chart.resize({
                        width: newcontainer.clientWidth,
                        height: newcontainer.clientHeight,
                    });
                }, 400);
            }
        });
        window.addEventListener("resize", () => {
            if (this.$route.name == "home") {
                setTimeout(() => {
                    let newcontainer: any = document.getElementById(this.id);
                    this.chart.resize({
                        width: newcontainer.clientWidth,
                        height: newcontainer.clientHeight,
                    });
                }, 400);
            }
        });
    }
    // 处理颜色
    colorChange(val) {
        let colorNum = "";
        if (val && val == "jian") {
            colorNum = "color: #F56C6C";
        } else {
            colorNum = "color: #67C23A";
        }
        return colorNum;
    }
    renderCharts(data) {
        this.chart.setOption({
            tooltip: {
                trigger: "item",
                formatter: (info) => {
                    let data = info;
                    return `${data.marker}${data.data.date}<br/>合作企业数量：${data.value}`;
                },
            },
            grid: {
                top: 10,
                left: 40,
                right: 10,
                bottom: 30,
            },
            xAxis: {
                type: "category",
                calculable: false,
                data: data && data.map((i) => i.date.split("月")[1]),
                splitLine: {
                    lineStyle: {
                        type: "dashed",
                    },
                },
                axisLabel: {
                    show: true,
                    interval: 0,
                    textStyle: {
                        color: "#666",
                    },
                },
                axisLine: {
                    lineStyle: {
                        color: "#E4E7ED",
                    },
                },
                triggerEvent: true, // 点击事件
            },
            yAxis: {
                type: "value",
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: "#666",
                    },
                    formatter: "{value}",
                },
                nameTextStyle: {
                    color: "#666",
                },
                splitLine: {
                    lineStyle: {
                        type: "dashed",
                    },
                },
                axisLine: {
                    lineStyle: {
                        color: "#E4E7ED",
                    },
                },
            },
            color: ["#67C23A"],
            series: [
                {
                    type: "effectScatter",
                    symbolSize: function (val) {
                        return val / 10;
                    },
                    rippleEffect: {
                        //涟漪特效相关配置
                        brushType: "stroke", //波纹的绘制方式
                    },
                    hoverAnimation: true, //鼠标移入放大圆
                    data: data && data.map((i) => i),
                    itemStyle: {
                        normal: {
                            label: {
                                color: "#000",
                                formatter: function (params) {
                                    return params.value + "k";
                                },
                            },
                        },
                    },
                },
            ],
        });

        this.chart.on("click", (value) => {
            this.assetObj = {
                value: value.data.value,
                day: value.data.day,
                sameCompare: value.data.sameCompare,
                sequential: value.data.sequential,
                flagSame: value.data.flagSame,
                flagSequential: value.data.flagSequential,
                date: value.data.date,
            };
        });
    }
}
</script>

<style lang="scss" scoped>
.content-text {
    height: 50px;
    .content-left {
        line-height: 28px;
        float: left;
        font-weight: 700;
        font-size: 20px;
    }

    .rateContent {
        float: left;
        margin-left: 15px;
    }
}
</style>