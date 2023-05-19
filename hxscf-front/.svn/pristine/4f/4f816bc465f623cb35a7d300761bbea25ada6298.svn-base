<!--
 * @Author: zhiqiang.qiao
 * @Date: 2020-05-25 13:48:34
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-06-12 10:15:12
 * @Description: echart案例
 -->
<template>
    <div class="template-container">
        <content-wrapper>
            <template slot="grid">
                <el-row :gutter="4">
                    <el-col :span="12">
                        <div class="chartBox" id="chart1"></div>
                    </el-col>
                    <el-col :span="12">
                        <div class="chartBox" id="chart2"></div>
                    </el-col>
                    <el-col :span="12" class="mT5">
                        <div class="chartBox" id="chart3"></div>
                    </el-col>
                    <el-col :span="12" class="mT5">
                        <div class="chartBox" id="chart4"></div>
                    </el-col>
                    <el-col :span="12" class="mT5">
                        <div class="chartBox" id="chart5"></div>
                    </el-col>
                    <el-col :span="12" class="mT5">
                        <div class="chartBox" id="chart6"></div>
                    </el-col>
                </el-row>
            </template>
        </content-wrapper>
    </div>
</template>

<script lang="ts">
import echarts from "echarts";
import "../../../node_modules/echarts/map/js/china";
import { Vue, Component, Watch } from "vue-property-decorator";
import { namespace, State } from "vuex-class";
import ContentWrapper from "@/components/ContentWrapper.vue";

@Component({
    components: {
        "content-wrapper": ContentWrapper
    }
})
export default class EchartDemo extends Vue {
    public fileList = [];
    public myChart1 = {};
    public myChart2 = {};
    public myChart3 = {};
    public myChart4 = {};
    public myChart5 = {};
    public myChart6 = {};

    mounted() {
        // 折线柱状图
        let container: any = document.getElementById("chart1");
        this.myChart1 = echarts.init(document.getElementById("chart1"));
        this.setChart1();
        // 饼图
        this.myChart2 = echarts.init(document.getElementById("chart2"));
        this.setChart2();
        // 散点图
        this.myChart3 = echarts.init(document.getElementById("chart3"));
        this.setChart3();
        // 雷达图
        this.myChart4 = echarts.init(document.getElementById("chart4"));
        this.setChart4();
        // 矩形树图
        this.myChart5 = echarts.init(document.getElementById("chart5"));
        this.setChart5();
        // 地图
        this.myChart6 = echarts.init(document.getElementById("chart6"));
        this.setChart6();
        let self = this;
        //实现自适应部分
        window.addEventListener("resize", () => {
            if (this.$route.name === "EchartDemo") {
                self.myChart1["resize"]();
                self.myChart2["resize"]();
                self.myChart3["resize"]();
                self.myChart4["resize"]();
                self.myChart5["resize"]();
                self.myChart6["resize"]();
            }
        });
        this.$bus.$on("menuCollapse", () => {
            if (this.$route.name === "EchartDemo") {
                setTimeout(() => {
                    let newContainer: Array<any> = [];
                    for (let i = 1; i <= 6; i++) {
                        newContainer[i] = document.getElementById(`chart${i}`);
                        self[`myChart${i}`]["resize"]({
                            width: newContainer[i]["clientWidth"],
                            height: newContainer[i]["clientHeight"]
                        });
                    }
                    // self.myChart2["resize"]();
                    // self.myChart3["resize"]();
                    // self.myChart4["resize"]();
                    // self.myChart5["resize"]();
                    // self.myChart6["resize"]();
                }, 500);
            }
        });
    }
    setChart1() {
        this.myChart1["setOption"]({
            title: {
                text: "堆叠/柱状区域图",
                left: "center",
                top: 10
            },
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "cross",
                    label: {
                        backgroundColor: "#6a7985"
                    }
                }
            },
            legend: {
                data: [
                    "邮件营销",
                    "联盟广告",
                    "视频广告",
                    "直接访问",
                    "搜索引擎"
                ],
                bottom: 10
            },
            toolbox: {
                feature: {
                    saveAsImage: {},
                    restore: {},
                    dataView: {},
                    dataZoom: {},
                    magicType: {
                        type: ["line", "bar", "stack", "tiled"]
                    }
                }
            },
            grid: {
                show: true,
                left: "3%",
                right: "4%",
                bottom: 50,
                containLabel: true
            },
            xAxis: [
                {
                    type: "category",
                    boundaryGap: false,
                    data: [
                        "周一",
                        "周二",
                        "周三",
                        "周四",
                        "周五",
                        "周六",
                        "周日"
                    ]
                }
            ],
            yAxis: [
                {
                    type: "value"
                }
            ],
            series: [
                {
                    name: "邮件营销",
                    type: "line",
                    stack: "总量",
                    areaStyle: {},
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: "联盟广告",
                    type: "line",
                    stack: "总量",
                    areaStyle: {},
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: "视频广告",
                    type: "line",
                    stack: "总量",
                    areaStyle: {},
                    data: [150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name: "直接访问",
                    type: "line",
                    stack: "总量",
                    areaStyle: {},
                    data: [320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name: "搜索引擎",
                    type: "line",
                    stack: "总量",
                    label: {
                        normal: {
                            show: true,
                            position: "top"
                        }
                    },
                    areaStyle: {},
                    data: [820, 932, 901, 934, 1290, 1330, 1320]
                }
            ]
        });
    }
    setChart2() {
        this.myChart2["setOption"]({
            title: {
                text: "环图、饼图",
                left: "center",
                top: 10
            },
            tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                // orient: "vertical",
                bottom: 10,
                data: [
                    "直达",
                    "营销广告",
                    "搜索引擎",
                    "邮件营销",
                    "联盟广告",
                    "视频广告",
                    "百度",
                    "谷歌",
                    "必应",
                    "其他"
                ]
            },
            series: [
                {
                    name: "访问来源",
                    type: "pie",
                    selectedMode: "single",
                    radius: [0, "30%"],

                    label: {
                        position: "inner"
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        { value: 335, name: "直达", selected: true },
                        { value: 679, name: "营销广告" },
                        { value: 1548, name: "搜索引擎" }
                    ]
                },
                {
                    name: "访问来源",
                    type: "pie",
                    radius: ["40%", "55%"],
                    label: {
                        formatter:
                            "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
                        backgroundColor: "#eee",
                        borderColor: "#aaa",
                        borderWidth: 1,
                        borderRadius: 4,
                        rich: {
                            a: {
                                color: "#999",
                                lineHeight: 22,
                                align: "center"
                            },
                            hr: {
                                borderColor: "#aaa",
                                width: "100%",
                                borderWidth: 0.5,
                                height: 0
                            },
                            b: {
                                fontSize: 16,
                                lineHeight: 33
                            },
                            per: {
                                color: "#eee",
                                backgroundColor: "#334455",
                                padding: [2, 4],
                                borderRadius: 2
                            }
                        }
                    },
                    data: [
                        { value: 335, name: "直达" },
                        { value: 310, name: "邮件营销" },
                        { value: 234, name: "联盟广告" },
                        { value: 135, name: "视频广告" },
                        { value: 1048, name: "百度" },
                        { value: 251, name: "谷歌" },
                        { value: 147, name: "必应" },
                        { value: 102, name: "其他" }
                    ]
                }
            ]
        });
    }
    setChart3() {
        var data = [
            [1, 4862.4],
            [2, 5294.7],
            [3, 5934.5],
            [4, 7171.0],
            [5, 8964.4],
            [6, 10202.2],
            [7, 11962.5],
            [8, 14928.3],
            [9, 16909.2],
            [10, 18547.9],
            [11, 21617.8],
            [12, 26638.1],
            [13, 34634.4],
            [14, 46759.4],
            [15, 58478.1],
            [16, 67884.6],
            [17, 74462.6],
            [18, 79395.7]
        ];
        this.myChart3["setOption"]({
            title: {
                text: "缩放散点图",
                subtext: "By ecStat.regression",
                sublink: "https://github.com/ecomfe/echarts-stat",
                left: "center",
                top: 10
            },
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "cross"
                }
            },
            xAxis: {
                type: "value",
                splitLine: {
                    lineStyle: {
                        type: "dashed"
                    }
                },
                splitNumber: 20
            },
            yAxis: {
                type: "value",
                splitLine: {
                    lineStyle: {
                        type: "dashed"
                    }
                }
            },
            grid: {
                top: 70
            },
            // 区域缩放
            dataZoom: [
                {
                    type: "inside"
                },
                {
                    type: "slider"
                }
            ],
            series: [
                {
                    name: "scatter",
                    type: "scatter",
                    emphasis: {
                        label: {
                            show: true,
                            position: "left",
                            color: "blue",
                            fontSize: 16
                        }
                    },
                    data: data
                }
            ]
        });
    }
    setChart4() {
        this.myChart4["setOption"]({
            title: {
                text: "基础雷达图",
                left: "left"
            },
            tooltip: {},
            legend: {
                data: [
                    "预算分配（Allocated Budget）",
                    "实际开销（Actual Spending）"
                ],
                right: 10,
                orient: "vertical"
            },
            radar: {
                // shape: 'circle',
                name: {
                    textStyle: {
                        color: "#fff",
                        backgroundColor: "#999",
                        borderRadius: 3,
                        padding: [3, 5]
                    }
                },
                indicator: [
                    { name: "销售（sales）", max: 6500 },
                    { name: "管理（Administration）", max: 16000 },
                    { name: "信息技术（Information Techology）", max: 30000 },
                    { name: "客服（Customer Support）", max: 38000 },
                    { name: "研发（Development）", max: 52000 },
                    { name: "市场（Marketing）", max: 25000 }
                ]
            },
            series: [
                {
                    name: "预算 vs 开销（Budget vs spending）",
                    type: "radar",
                    // areaStyle: {normal: {}},
                    data: [
                        {
                            value: [4300, 10000, 28000, 35000, 50000, 19000],
                            name: "预算分配（Allocated Budget）"
                        },
                        {
                            value: [5000, 14000, 28000, 31000, 42000, 21000],
                            name: "实际开销（Actual Spending）"
                        }
                    ]
                }
            ]
        });
    }
    setChart5() {
        this.myChart5["setOption"]({
            series: [
                {
                    type: "treemap",
                    data: [
                        {
                            name: "nodeA", // First tree
                            value: 10,
                            children: [
                                {
                                    name: "nodeAa", // First leaf of first tree
                                    value: 4
                                },
                                {
                                    name: "nodeAb", // Second leaf of first tree
                                    value: 6
                                }
                            ]
                        },
                        {
                            name: "nodeB", // Second tree
                            value: 20,
                            children: [
                                {
                                    name: "nodeBa", // Son of first tree
                                    value: 20,
                                    children: [
                                        {
                                            name: "nodeBa1", // Granson of first tree
                                            value: 20
                                        },
                                        {
                                            name: "nodeBa2", // Granson of first tree
                                            value: 40
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            name: "nodeC", // Second tree
                            value: 40,
                            children: [
                                {
                                    name: "nodeCa", // Son of first tree
                                    value: 10,
                                    children: [
                                        {
                                            name: "nodeCa1", // Granson of first tree
                                            value: 20
                                        },
                                        {
                                            name: "nodeCa2", // Granson of first tree
                                            value: 40
                                        }
                                    ]
                                },
                                {
                                    name: "nodeCb", // Son of first tree
                                    value: 50,
                                    children: [
                                        {
                                            name: "nodeCb1", // Granson of first tree
                                            value: 50
                                        },
                                        {
                                            name: "nodeCb2", // Granson of first tree
                                            value: 20
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        });
    }
    setChart6() {
        this.myChart6["setOption"]({
            // 进行相关配置
            backgroundColor: "#02AFDB",
            tooltip: {
                trigger: "item",
                formatter: "{a}<br/>{b} : {c} (次)"
            },
            visualMap: {
                min: 800,
                max: 50000,
                text: ["High", "Low"],
                realtime: false,
                calculable: true,
                inRange: {
                    color: ["lightskyblue", "yellow", "orangered"]
                }
            },
            dataRange: {
                show: false,
                min: 0,
                max: 1000,
                text: ["High", "Low"],
                realtime: true,
                calculable: true,
                color: ["orangered", "yellow", "lightskyblue"]
            },
            geo: {
                // 这个是重点配置区
                map: "china", // 表示中国地图
                roam: true,
                label: {
                    normal: {
                        show: true, // 是否显示对应地名
                        textStyle: {
                            color: "rgba(0,0,0,0.4)",
                            fontSize: 10
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        borderColor: "rgba(0, 0, 0, 0.2)"
                    },
                    emphasis: {
                        areaColor: null,
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        shadowBlur: 20,
                        borderWidth: 0,
                        shadowColor: "rgba(0, 0, 0, 0.5)"
                    }
                }
            },
            series: [
                {
                    type: "scatter",
                    coordinateSystem: "geo" // 对应上方配置
                },
                {
                    name: "启动次数", // 浮动框的标题
                    type: "map",
                    geoIndex: 0,
                    data: [
                        {
                            name: "北京",
                            value: 599
                        },
                        {
                            name: "上海",
                            value: 142
                        },
                        {
                            name: "黑龙江",
                            value: 44
                        },
                        {
                            name: "深圳",
                            value: 92
                        },
                        {
                            name: "湖北",
                            value: 810
                        },
                        {
                            name: "四川",
                            value: 453
                        }
                    ]
                }
            ]
        });
    }
}
</script>

<style scoped lang="scss">
.chartBox {
    width: 100%;
    height: 400px;
    border: 1px dotted #ccc;
    border-radius: 10px;
}
.mT5 {
    margin-top: 5px;
}
</style>