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
            <el-row type="flex" justify="center" align="middle">
                <el-col :span="22">
                    <el-steps :active="active" class="custom" finish-status="success">
                        <el-step title="行业基础数据导入" icon="el-icon-upload"></el-step>
                        <el-step title="行业信息录入" icon="el-icon-edit"></el-step>
                        <el-step title="客户风险系数" icon="el-icon-document"></el-step>
                        <el-step title="提交审核" icon="el-icon-circle-check"></el-step>
                    </el-steps>
                </el-col>
            </el-row>
        </div>
        <BasicInformation v-if="active === 0" ref="basicInfo"></BasicInformation>
        <TradeInformation v-if="active === 1" ref="tradeInfo"></TradeInformation>
        <CustomRiskCoefficient v-if="active === 2" ref="custRisk"></CustomRiskCoefficient>

        <div class="sub-gap"></div>

        <div class="template-content">
            <div class="template-bottom-button">
                <template v-if="active === 0">
                    <el-button type="primary" size="small" @click="onSave(true)">保存</el-button>
                    <el-button type="primary" size="small" @click="next">下一步</el-button>
                </template>
                <template v-if="active === 1">
                    <el-button type="primary" size="small" @click="previous">上一步</el-button>
                    <el-button type="primary" size="small" @click="onSave(true)">保存</el-button>
                    <el-button type="primary" size="small" @click="next">下一步</el-button>
                </template>
                <template v-if="active === 2">
                    <el-button type="primary" size="small" @click="previous">上一步</el-button>
                    <el-button type="primary" size="small" @click="onSave(true)">保存</el-button>
                    <el-button type="primary" size="small" @click="onSubmit">提交审核</el-button>
                </template>

            </div>
        </div>

    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
const tradeInfoManage = namespace("tradeInfoManage");
import BasicInformation from "./steps/basicInformation.vue";
import TradeInformation from "./steps/tradeInformation.vue";
import CustomRiskCoefficient from "./steps/customRiskCoefficient.vue";
import cloneDeep from "lodash.clonedeep";

@Component({
    name: "createCustRiskFactor",
    components: {
        BasicInformation,
        TradeInformation,
        CustomRiskCoefficient,
    },
})
export default class creditInvestigation extends Vue {
    @tradeInfoManage.Action queryList;
    @tradeInfoManage.Action addAndUpdateRiskTradeBase;
    @tradeInfoManage.Action addAndUpdateTradsurvey;
    @tradeInfoManage.State riskId;
    @tradeInfoManage.Mutation saveRiskId;

    public active = 0; // 步骤条

    public loading: boolean = false;

    public data: any = {
        bizApplyMap: {},
        modelTableVos: [],
    };

    onSave(isSave) {
        if (this.active === 0) {
            /* 从子组件中获取值，进行判断，是否可以进行下一步操作 */
            let oDom: any = this.$refs["basicInfo"];
            oDom.$refs["form"].validate((valid) => {
                if (valid) {
                    let data = cloneDeep(oDom.data);
                    delete data.indexDate;
                    delete data.loanRiskRatioapply;
                    let arr: any[] = Object.values(data);
                    let result = arr.every((item) => item.length === 0);
                    if (result) {
                        this.$message({
                            type: "error",
                            message: "请导入数据！",
                        });
                        return;
                    }
                    let params = {
                        loanRiskRatioapply: {
                            riskId: this.riskId,
                            orgPcode: this.$route.query.orgPcode,
                            keyNo: this.$route.query.keyNo,
                        },
                        indexDate: oDom.queryForm.indexDate,
                    };
                    this.addAndUpdateRiskTradeBase(params).then((res) => {
                        isSave ? this.goRouter() : this.active++;
                    });
                } else {
                    return false;
                }
            });
        }
        if (this.active === 1) {
            let oDom: any = this.$refs["tradeInfo"] as TradeInformation;
            if (oDom.validateForms()) {
                this.$confirm(
                    "将基于您填写的数据生成行业评级信息，请确认是否提交？",
                    "温馨提示",
                    {
                        confirmButtonText: "确定",
                        cancelButtonText: "检查一下",
                        type: "warning",
                    }
                )
                    .then(() => {
                        let params = oDom.handleParams();
                        this.addAndUpdateTradsurvey(params).then((res) => {
                            isSave ? this.goRouter() : this.active++;
                        });
                    })
                    .catch(() => {});
            }
        }
        if (this.active === 2) {
            let $el: any = this.$refs["custRisk"];
            $el.submit();
        }
    }
    // 提交审核
    onSubmit() {
        this.$prompt("送审说明", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            inputPattern: /^.*[^\s]+.*$/,
            inputErrorMessage: "送审说明不能为空",
        })
            .then((data: any) => {
                this.next();
            })
            .catch(() => {});
    }
    // 下一步
    next() {
        this.onSave(false);
    }
    // 上一步
    previous() {
        this.active--;
    }

    // 回到列表
    goRouter() {
        this.saveRiskId("");
        this.$bus.$emit("jumpToTag", {
            path: this.$route.path,
            tag: "/customRiskCoefficient",
        });
    }

    beforeDestroy() {
        this.saveRiskId("");
    }
}
</script>

<style scoped lang="scss">
.mt10 {
    margin: 10px 0;
}
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
    margin-bottom: 20px;
    bottom: 20px;
    height: 100px;
    background: #fff;
    width: 100%;
}

.tags {
    background: #fff;
    padding: 20px;
}
</style>
