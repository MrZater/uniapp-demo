 <template>
    <div class="template-container" v-loading="loading">
        <el-row :gutter="14" class="content-box">
            <el-col :span="8">
                <el-card class="box-card">
                    <div slot="header">
                        <b class="header-title">动态追踪进度统计</b>
                    </div>
                    <div class="card-content center">
                        <el-row type="flex" align="middle">
                            <el-col :span="8">
                                <div class="progress">
                                    <p class="number">
                                        <count-to :startVal="0" :endVal="homeData.creditProgress.survey || 0" :duration="1000" />
                                    </p>
                                    <p class="info">追踪中</p>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="progress">
                                    <p class="number">
                                        <count-to :startVal="0" :endVal="homeData.creditProgress.success || 0" :duration="1000" />
                                    </p>
                                    <p class="info">已通过</p>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="progress">
                                    <p class="number">
                                        <count-to :startVal="0" :endVal="homeData.creditProgress.return || 0" :duration="1000" />
                                    </p>
                                    <p class="info">已退回</p>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card class="box-card">
                    <div slot="header">
                        <b class="header-title">消息通知</b>
                        <div class="header-title-sub">
                            <el-button style="float: right; padding: 3px 0" type="text">查看全部</el-button>
                        </div>
                    </div>

                    <div class="card-content">
                        <div v-for="(sub,subIndex) in homeData.messageList.slice(0,2)" :key="subIndex" class="message">
                            <div class="subTitle">{{sub.title}}</div>

                            <div class="info">
                                {{sub.info}}
                            </div>
                            <time class="time">{{ $moment(sub.date).format("YYYY-MM-DD HH:mm:ss") }}</time>
                            <el-divider v-if="subIndex != 1"></el-divider>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card class="box-card">
                    <div slot="header">
                        <b class="header-title">快速企业风险动态追踪</b>
                    </div>
                    <div class="card-content">
                        <el-form :model="searchForm" ref="searchForm">
                            <el-form-item prop="comName" class="br-form-item-label">
                                <el-input placeholder="请输入企业名称" v-model.trim="searchForm.comName"></el-input>
                            </el-form-item>
                            <el-form-item class="br-form-item-label">
                                <el-button type="primary" style="width:100%" @click="onSubmit">开始授信调查</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <div class="sub-gap"></div>
        <el-row :gutter="14">
            <el-col :span="8">
                <el-card class="box-card">
                    <div slot="header">
                        <b class="header-title">当前监控/历史监控</b>
                        <div class="header-title-sub">
                            <el-select v-model="value" placeholder="请选择" class="br-select-linkage">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <i class="t_l triangle"></i>
                    <i class="t_r triangle"></i>
                    <i class="b_l triangle"></i>
                    <i class="b_r triangle"></i>
                    <div class="card-content">
                        <bar-chart :dataSource="homeData.ceIndustryList" id="activityEchats" height="216px" />
                    </div>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-card class="box-card">
                    <div slot="header">
                        <b style="header-title">企业风险趋势图</b>
                        <div class="header-title-sub">
                            <el-select v-model="value" placeholder="请选择" class="br-select-linkage">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <i class="t_l triangle"></i>
                    <i class="t_r triangle"></i>
                    <i class="b_l triangle"></i>
                    <i class="b_r triangle"></i>
                    <div class="card-content">
                        <pie-chart :dataSource="homeData.ceCreditInvestList" id="activityTypelEchats" height="216px" />
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <div class="sub-gap"></div>
        <el-row :gutter="14" class="content-box">
            <el-col :span="24">
                <el-card class="box-card">
                    <div slot="header">
                        <b class="header-title">风险来源统计</b>
                        <div class="header-title-sub">
                            <el-select v-model="value" placeholder="请选择" class="br-select-linkage">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <i class="t_l triangle"></i>
                    <i class="t_r triangle"></i>
                    <i class="b_l triangle"></i>
                    <i class="b_r triangle"></i>
                    <div class="card-content">
                        <scatter-chart :dataSource="homeData.ceTrendList" id="assetsEchatrs" height="190px" />
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <div class="sub-gap"></div>
        <el-row :gutter="14" class="content-box">
            <el-col :span="24">
                <el-card class="box-card">
                    <div slot="header">
                        <b class="header-title">风险命中情况</b>
                    </div>
                    <i class="t_l triangle"></i>
                    <i class="t_r triangle"></i>
                    <i class="b_l triangle"></i>
                    <i class="b_r triangle"></i>
                    <div class="card-content">
                        <risk-hit />
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
const creditManageAnalysis = namespace("creditManageAnalysis");
import echarts from "echarts";
import barChart from "./components/barChart.vue";
import pieChart from "./components/pieChart.vue";
import scatterChart from "./components/scatterChart.vue";
import riskHit from "./components/riskHit.vue";
import countTo from "vue-count-to";
@Component({
    name: "creditManageAnalysis",
    components: {
        barChart,
        pieChart,
        scatterChart,
        countTo,
        riskHit,
    },
})
export default class index extends Vue {
    @creditManageAnalysis.Action getHomeData;
    @creditManageAnalysis.State homeData;
    @creditManageAnalysis.State loading;
    value: string = "1";
    public options: any = [
        {
            value: "1",
            label: "近14天",
        },
        {
            value: "2",
            label: "近30天",
        },
    ];
    public searchForm: any = {};
    created() {
        this.getHomeData();
    }
    onSubmit() {
        this.getHomeData(this.searchForm);
    }
}
</script>
<style scoped lang="scss">
$shadowColor: rgba(0, 0, 0, 0.1);
$fontSize: 14px;
.template-container {
    padding: 18px;
    background: #fff;
}
.box-card {
    border-radius: 0;
    box-shadow: none;
    box-shadow: 0px 0px 10px 0px $shadowColor inset;
    position: relative;
    .header-title {
        font-size: $fontSize;
    }
    .header-title-sub {
        float: right;
    }
    .center {
        text-align: center;
    }
    .card-content {
        height: 190px;
        margin-top: 30px;
        .progress {
            cursor: pointer;
            margin: 20px;
            .number {
                margin-bottom: 5px;
                background: linear-gradient(to right, #ee9ca7, #ffdde1);
                border-radius: 5px;
                span {
                    font-size: 30px;
                    font-weight: bolder;
                    letter-spacing: 2px;
                }
            }
            .info {
                border-radius: 3px;
                font-size: 14px;
                background: linear-gradient(to right, #74ebd5, #acb6e5);
            }
        }
        .message {
            cursor: pointer;
            .subTitle {
                font-weight: bold;
                font-size: 17px;
                padding: 0;
            }
            .info {
                color: #909399;
                padding: 10px 0px;
                font-size: 14px;
            }
            .time {
                padding: 0px;
                color: #999;
            }
        }
        /deep/ .el-divider--horizontal {
            margin: 15px 0;
        }
    }
    .triangle {
        position: absolute;
        width: 0;
        height: 0;
    }
    .t_l {
        left: 2px;
        top: 2px;
        border-top: 8px solid $shadowColor;
        border-right: 8px solid transparent;
    }
    .t_r {
        right: 2px;
        top: 2px;
        border-top: 8px solid $shadowColor;
        border-left: 8px solid transparent;
    }
    .b_l {
        left: 2px;
        bottom: 2px;
        border-bottom: 8px solid $shadowColor;
        border-right: 8px solid transparent;
    }
    .b_r {
        right: 2px;
        bottom: 2px;
        border-bottom: 8px solid $shadowColor;
        border-left: 8px solid transparent;
    }
}
.content-echarts {
    height: 240px;
}
</style>