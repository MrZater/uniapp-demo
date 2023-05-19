<template>
    <div>
        <div :id="id" :style="'height:'+height"></div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import echarts from "echarts";
@Component
export default class pieChart extends Vue {
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
            series: [
                {
                    type: "pie",
                    radius: [30, 60],
                    center: ["50%", "50%"],
                    roseType: "radius",
                    data: data && data.map((i) => i),
                },
            ],
        });
    }
}
</script>

<style lang="scss" scoped>
</style>