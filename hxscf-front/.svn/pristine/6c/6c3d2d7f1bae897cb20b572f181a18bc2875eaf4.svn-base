 <template>
    <div class="template-container" v-loading="loading">
        <el-row :gutter="14" class="content-box">
            <el-col :span="8">
                <el-card class="box-card">
                    <div slot="header">
                        <b class="header-title">资信调查进度统计</b>
                    </div>
                    <div class="card-content center">
                        <el-row>
                            <el-col :span="8" :offset="1">
                                <div class="progress">
                                    <p class="number">
                                        <count-to :startVal="0" :endVal="homeData.creditProgress.survey || 0" :duration="1000" />
                                    </p>
                                    <p class="info">待送审</p>
                                </div>
                            </el-col>
                            <el-col :span="8" :offset="6">
                                <div class="progress">
                                    <p class="number">
                                        <count-to :startVal="0" :endVal="homeData.creditProgress.return || 0" :duration="1000" />
                                    </p>
                                    <p class="info">审核中</p>
                                </div>
                            </el-col>
                        </el-row>
                        <div class="sub-gap"></div>
                        <div class="sub-gap"></div>
                        <div class="sub-gap"></div>
                        <el-row>
                            <el-col :span="8" :offset="1">
                                <div class="progress">
                                    <p class="number">
                                        <count-to :startVal="0" :endVal="homeData.creditProgress.success || 0" :duration="1000" />
                                    </p>
                                    <p class="info">已通过</p>
                                </div>
                            </el-col>
                            <el-col :span="8" :offset="6">
                                <div class="progress">
                                    <p class="number">
                                        <count-to :startVal="0" :endVal="homeData.creditProgress.fail || 0" :duration="1000" />
                                    </p>
                                    <p class="info">已拒绝</p>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-card class="box-card">
                    <div slot="header">
                        <b class="header-title">合作企业趋势图(单位：千万)</b>
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
                        <scatter-chart :dataSource="homeData.ceTrendList" id="assetsEchatrs" height="250px" />
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <div class="sub-gap"></div>
        <el-row :gutter="14">
            <el-col :span="12">
                <el-card class="box-card">
                    <div slot="header">
                        <b class="header-title">合作企业行业分布</b>
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
                        <bar-chart :dataSource="homeData.ceIndustryList" id="activityEchats" height="250px" />
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="box-card">
                    <div slot="header">
                        <b style="header-title">合作企业资信调查分布</b>
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
                        <pie-chart :dataSource="homeData.ceCreditInvestList" id="activityTypelEchats" height="250px" />
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
import countTo from "vue-count-to";
@Component({
    name: "creditManageAnalysis",
    components: {
        barChart,
        pieChart,
        scatterChart,
        countTo,
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
    created() {
        this.getHomeData();
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
        height: 250px;
        .progress {
            cursor: pointer;
            margin: 10px;
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
</style>