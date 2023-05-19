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
            <el-tabs v-model="activeName">
                <el-tab-pane label="行业基础数据导入" name="first">
                    <BasicInformation ref="basicInfo"></BasicInformation>
                </el-tab-pane>
                <el-tab-pane label="行业信息录入" name="second">
                    <TradeInformation ref="tradeInfo"></TradeInformation>
                </el-tab-pane>
                <el-tab-pane label="客户风险系数" name="third">
                    <CustomRiskCoefficient ref="custRisk"></CustomRiskCoefficient>
                </el-tab-pane>
            </el-tabs>
        </div>

        <div class="sub-gap"></div>

        <div class="template-content">
            <div class="template-bottom-button">
                <el-button type="primary" size="small" @click="onClose">关闭</el-button>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
const common = namespace("common");
import BasicInformation from "./steps/basicInformation.vue";
import TradeInformation from "./steps/tradeInformation.vue";
import CustomRiskCoefficient from "./steps/customRiskCoefficient.vue";

@Component({
    name: "createCustRiskFactor",
    components: {
        BasicInformation,
        TradeInformation,
        CustomRiskCoefficient,
    },
})
export default class creditInvestigation extends Vue {
    @common.State tags;
    public activeName: string = "first";

    public loading: boolean = false;

    public data: any = {
        bizApplyMap: {},
        modelTableVos: [],
    };

    onClose() {
        /* 
        1、目的：
            推断 关闭按钮 的 路由去向
        2、方法：
            通过 判断 是否存在缓存的 route query 参数，
        3、步骤：
            3.1 判断 是否存在 缓存的 route query 参数
                1.存在：
                    1.1 通过 vuex 中存储的 tags(已打开的页面 ) ,判断源页面（行业详情页面）是否已经被关闭，
                    1.2 如果未被关闭，则携带 缓存参数 跳转到此页面（行业详情页面）
                    1.3 如果已经被关闭，则 直接跳转到列表页（行业信息管理列表）
                2 不存在：
                    说明入口为客户风险系数列表页面，则返回到客户风险系数列表页面即可     
        */
        let { cacheRouteQuery } = this.$route.query;
        if (cacheRouteQuery) {
            let tag = this.tags.find((item) => item.name === "tradeDetail");
            let url: string = "/tradeInfoManage";
            let data: any = {};
            if (tag) {
                let data =
                    typeof cacheRouteQuery === "string"
                        ? JSON.parse(cacheRouteQuery)
                        : {};
                url = "/tradeInfoManage/tradeDetail";
            }
            this.goRouter(url, data);
            return;
        }
        this.goRouter("/customRiskCoefficient");
    }

    goRouter(url, query?) {
        this.$bus.$emit("jumpToTag", {
            path: this.$route.path,
            tag: url,
            query: query,
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
