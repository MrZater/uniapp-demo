/*
 * @Author: mingliang.zhu 
 * @Date: 2020-09-21 13:15:12 
 * @Last Modified by:   mingliang.zhu 
 * @Last Modified time: 2020-09-21 13:15:12 
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
export default class radarChart extends Vue {
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
        this.chart.setOption({
            color: ["#409EFF", "#67C23A", "#F5A623", "#A840FF"],
            tooltip: {
                trigger: "item",
                formatter: (info) => {
                    return `${info.marker}${info.name}<br/>数量：${info.value}<br/>占比：${info.percent}%`;
                },
            },
            radar: [
                {
                    indicator: [
                        { text: "经营规模", max: 100 },
                        { text: "成长性", max: 100 },
                        { text: "负面消息", max: 100 },
                        { text: "基本面", max: 100 },
                        { text: "稳定性", max: 100 },
                    ],
                    center: ["45%", "50%"],
                    radius: "80%",
                },
            ],
            series: [
                {
                    type: "radar",
                    areaStyle: {},
                    data: data && data.map((i) => i),
                },
            ],
        });
    }
}
</script>

<style lang="scss" scoped>
</style>