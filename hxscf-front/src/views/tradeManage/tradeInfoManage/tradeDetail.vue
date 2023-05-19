<template>
    <div class="template-container" v-loading="loading">
        <div class="tops">
            <el-row :gutter="20">
                <div class="paddings">
                    <el-col :span="2">
                        <div>
                            <img style="width: 100px; height: 100px" src="@/assets/images/company.png" />
                        </div>
                    </el-col>
                    <el-col :span="18">
                        <div>
                            <div class="title">{{ $route.query.tradeName  || '---'}}</div>
                            <div class="msg">
                                <el-row>
                                    <el-col :span="8">
                                        <div class="mb20">组织名称：{{$route.query.orgName || '---'}}</div>
                                    </el-col>
                                    <el-col :span="8">
                                        <div class="mb20">创建时间：{{$route.query.createTime | time}}</div>
                                    </el-col>
                                    <el-col :span="8">
                                        <div>创建人：{{$route.query.createUser || '---'}}</div>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="4">
                    </el-col>
                </div>
            </el-row>
        </div>
        <div class="setps">
            <el-tabs v-model="active">
                <el-tab-pane label="行业基础信息" name="first">
                    <BasicInformation ref="basicInfo" />
                </el-tab-pane>
                <el-tab-pane label="行业信息录入" name="second">
                    <TradeInformation />
                </el-tab-pane>
                <el-tab-pane label="客户风险系数记录" name="third">
                    <CustomRiskCoefficientRecord />
                </el-tab-pane>
                <el-tab-pane label="行业BI分析" name="fourth">
                    行业BI分析
                </el-tab-pane>
                <el-tab-pane label="头部企业信息" name="five">
                    <HeaderTradeInformation />
                </el-tab-pane>
            </el-tabs>
        </div>

        <div class="sub-gap"></div>

        <div class="template-content">
            <div class="template-bottom-button">
                <el-button type="primary" size="small" @click="goRouter">关闭</el-button>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import BasicInformation from "./tabs/basicInformation.vue";
import TradeInformation from "./tabs/tradeInformation.vue";
import HeaderTradeInformation from "./tabs/headerTradeInformation.vue";
import CustomRiskCoefficientRecord from "./tabs/customRiskCoefficientRecord/index.vue";

@Component({
    name: "tradeDetail",
    components: {
        BasicInformation,
        TradeInformation,
        HeaderTradeInformation,
        CustomRiskCoefficientRecord,
    },
})
export default class creditInvestigation extends Vue {
    public loading: boolean = false;
    public active: string = "first";

    // 回到列表
    goRouter() {
        this.$bus.$emit("jumpToTag", {
            path: this.$route.path,
            tag: "/tradeInfoManage",
        });
    }
}
</script>

<style scoped lang="scss">
.tops {
    background: #fff;
    width: 100%;
    height: 120px;

    .paddings {
        padding: 10px 20px;
        display: flex;
        align-items: center;
        justify-content: center;

        .title {
            font-size: 17px;
            font-weight: bold;
            margin-bottom: 20px;
        }

        .msg {
            width: 100%;

            .mb20 {
                margin-bottom: 20px;
            }
        }
    }
}

.setps {
    margin-top: 20px;
    background: #fff;
    padding: 20px;
}
</style>
