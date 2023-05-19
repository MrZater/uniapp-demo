/*
 * @Author: mingliang.zhu 
 * @Date: 2020-09-21 13:15:06 
 * @Last Modified by: mingliang.zhu
 * @Last Modified time: 2020-09-21 15:29:39
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
export default class barChart extends Vue {
    @Prop() dataSource;
    @Prop(String) id;
    @Prop(String) height;

    @Watch("dataSource")
    onchanged(val) {
        this.renderCharts(val);
    }

    chart: any = null;

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

    renderCharts(data) {
        this.chart.clear();
        this.chart.setOption({
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "shadow",
                },
                formatter: (info) => {
                    let params = info[0];
                    return `${params.marker}${params.name}<br/>数量：${params.value}<br/>`;
                },
            },
            color: ["#409EFF"],
            xAxis: {
                type: "category",
                data: data && data.map((i) => i.month),
                splitLine: {
                    lineStyle: {
                        type: "dashed",
                    },
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: "#666",
                    },
                },
                axisLine: {
                    lineStyle: {
                        color: "#E4E7ED",
                    },
                },
            },
            yAxis: {
                type: "value",
                nameTextStyle: {
                    color: "#666",
                },
                splitLine: {
                    lineStyle: {
                        type: "dashed",
                    },
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: "#666",
                    },
                },
                axisLine: {
                    lineStyle: {
                        color: "#E4E7ED",
                    },
                },
            },
            grid: {
                top: 10,
                left: 40,
                right: 10,
                bottom: 60,
            },
            dataZoom: [
                {
                    type: "slider",
                    start: 0,
                    end: 40,
                    showDataShadow: false,
                    bottom: 8,
                    height: 20,
                    borderColor: "transparent",
                    backgroundColor: "#e2e2e2",
                    handleIcon:
                        "M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z", // jshint ignore:line
                    handleSize: 20,
                    handleStyle: {
                        shadowBlur: 6,
                        shadowOffsetX: 1,
                        shadowOffsetY: 2,
                        shadowColor: "#aaa",
                    },
                },
            ],
            series: [
                {
                    data: data && data.map((i) => i.count),
                    type: "bar",
                    barWidth: 10,
                    itemStyle: {
                        barBorderRadius: 5,
                    },
                },
                {
                    data: data && data.map((i) => i.count),
                    type: "line",
                    smooth: true,
                    itemStyle: {
                        normal: {
                            color: "#409EFF",
                            lineStyle: {
                                color: "#409EFF",
                                borderColor: "#409EFF",
                                shadowColor: "#409EFF",
                            },
                        },
                    },
                },
            ],
        });
    }
}
</script>

<style lang="scss" scoped>
</style>