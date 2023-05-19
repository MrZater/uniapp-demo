<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="12">
                <div class="box">
                    <b class="header-title">筛选器</b>
                    <b class="title-sub">维度</b>
                    <div style="margin-top: 10px">
                        <el-row class="ali" :gutter="10">
                            <el-col :span="4" v-for="(item,index) in radioList" :key="index">
                                <el-radio class="radioStyle" :label="item.key" v-model="radio" size="mini" border>{{item.value}}</el-radio>
                            </el-col>
                        </el-row>
                    </div>
                    <b class="title-sub">风险等级</b>
                    <div>
                        <el-select v-model="optionsValue" placeholder="请选择" size="mini">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </div>

                    <b class="title-sub">时间</b>
                    <div>
                        <el-select v-model="timeValue" placeholder="请选择" size="mini">
                            <el-option v-for="item in times" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </div>
                </div>
            </el-col>

            <el-col :span="12">
                <div class="progress" v-for="(item,index) in progressData" :key="index">
                    <el-row type="flex" class="row-sz" justify="space-between">
                        <el-col :span="12">
                            <div class="sz">{{item.value}}</div>
                        </el-col>
                        <el-col :span="12">
                            <div class="textRight sz">{{item.key}}</div>
                        </el-col>
                    </el-row>
                    <el-progress :percentage="item.number" :format="format" style="width:100%"></el-progress>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import echarts from "echarts";
@Component
export default class riskHit extends Vue {
    radio = 1;
    optionsValue = "1";
    timeValue = "1";
    times = [
        {
            value: "1",
            label: "7天",
        },
        {
            value: "2",
            label: "14天",
        },
        {
            value: "3",
            label: "一个月",
        },
    ];
    options = [
        {
            value: "1",
            label: "双皮奶",
        },
        {
            value: "2",
            label: "蚵仔煎",
        },
        {
            value: "3",
            label: "龙须面",
        },
        {
            value: "4",
            label: "北京烤鸭",
        },
    ];
    progressData = [
        {
            key: 1,
            value: "上海",
            number: 14,
        },
        {
            key: 2,
            value: "上海1",
            number: 17,
        },
        {
            key: 3,
            value: "上海2",
            number: 55,
        },
        {
            key: 4,
            value: "上海3",
            number: 35,
        },
        {
            key: 5,
            value: "上海4",
            number: 74,
        },
        {
            key: 6,
            value: "上海5",
            number: 26,
        },
        {
            key: 7,
            value: "上海6",
            number: 32,
        },
        // {
        //   key: 8,
        //   value: "上海7",
        //   number: 77,
        // },
        // {
        //   key: 9,
        //   value: "上海8",
        //   number: 77,
        // },
        // {
        //   key: 10,
        //   value: "上海9",
        //   number: 72,
        // },
        // {
        //   key: 11,
        //   value: "上海10",
        //   number: 71,
        // },
    ];
    radioList = [
        {
            key: 1,
            value: "上海",
        },
        {
            key: 2,
            value: "上海1",
        },
        {
            key: 3,
            value: "上海2",
        },
        {
            key: 4,
            value: "上海3",
        },
        {
            key: 5,
            value: "上海4",
        },
        {
            key: 6,
            value: "上海5",
        },
        {
            key: 7,
            value: "上海6",
        },
        {
            key: 8,
            value: "上海7",
        },
        {
            key: 9,
            value: "上海8",
        },
        {
            key: 10,
            value: "上海9",
        },
    ];

    // 进度条
    format(percentage) {
        return "";
    }
}
</script>

<style lang="scss" scoped>
$size: 16px;
.header-title {
    font-size: $size;
}
// .box-card {
//     border-radius: 0;
//     box-shadow: none;
//     box-shadow: 0px 0px 10px 0px  rgba(0, 0, 0, 0.1) inset;
// }
.box {
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    margin-bottom: 20px;
    padding: 10px;
    .title-sub {
        font-size: $size;
        display: block;
        padding: 10px 0;
    }
}
.title-sub {
    color: #8b8b8b;
}

.ali {
    text-align: center;
}
.radioStyle {
    margin: 5px;
    width: 100%;
}
.progress {
    margin: 10px 0;
    font-weight: bold;

    .textRight {
        text-align: right;
    }
    .sz {
        font-size: 15px;
        display: block;
    }
}
/deep/ .el-progress-bar {
    padding-right: 0;
}
</style>