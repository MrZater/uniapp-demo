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
                            <div class="title">{{ data.bizApplyMap.bizName  || '---'}}</div>
                            <el-row>
                                <el-col :span="12">
                                    <div class="mb20">所属行业：{{data.bizApplyMap.tradeName || '---'}}</div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="mb20">业务人员：{{data.bizApplyMap.businessUserName || '---'}}</div>
                                </el-col>
                                <el-col :span="12">
                                    <div>业务部门：{{data.bizApplyMap.businessOrgName || '---'}}</div>
                                </el-col>
                                <el-col :span="12">
                                    <div>企业角色：{{handelRole(data.bizApplyMap.bizRoleList)}}</div>
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div>
                            <el-button type="primary" class="br-btn-large">查看企业基础信息</el-button>
                        </div>
                    </el-col>
                </div>
            </el-row>
        </div>
        <div class="setps">
            <el-row type="flex" justify="center" align="middle">
                <el-col :span="22">
                    <el-steps :active="active" class="custom" finish-status="success">
                        <el-step title="资信信息录入" icon="el-icon-edit"></el-step>
                        <el-step title="生成资信报告" icon="el-icon-picture"></el-step>
                        <el-step title="提交审核" icon="el-icon-circle-check"></el-step>
                    </el-steps>
                </el-col>
            </el-row>
        </div>
        <div class="tags" v-show="active === 0 ">
            <el-tabs v-model="activeName">
                <el-tab-pane :label="item.modelTableConfig.tableCname" :name="String(index)" v-for="(item,index) in data.modelTableVos" :key="index">
                    <el-form :model="item" :rules="rules" ref="forms" size="small">
                        <el-table stripe :data="item.modelColumnVoList" class="br-table" border style="width: 100%">
                            <el-table-column label="字段名称" prop="columCname"></el-table-column>
                            <el-table-column label="录入信息" prop="columValue">
                                <template slot-scope="scope">
                                    <el-form-item :prop="'modelColumnVoList.' + scope.$index + '.columValue' " class="br-form-item-label" :rules="scope.row.requiredFlag == '1' ? rules.columValue : []"
                                        v-if="scope.row.inputModel =='01'">
                                        <el-input v-model.trim="scope.row.columValue" type="textarea" class="br-textarea-large" :maxlength="scope.row.columLength" show-word-limit></el-input>
                                    </el-form-item>
                                    <el-form-item :prop="'modelColumnVoList.' + scope.$index + '.columValue' " class="br-form-item-label"
                                        :rules="scope.row.requiredFlag == '1' ? rules.columValueSelect : []" v-else>
                                        <el-select v-model="scope.row.columValue" placeholder="请选择" class="br-select-large" :multiple="scope.row.inputModel=='03'" clearable>
                                            <el-option v-for="(item,index) in scope.row.columDicConfigList || []" :key="index" :label="item.dictName" :value="item.dictCode"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </template>
                            </el-table-column>
                            <el-table-column label="说明" prop="remark">
                                <template slot-scope="{row}">
                                    <el-form-item class="br-form-item-label">
                                        <el-input v-model="row.remark" type="textarea" class="br-textarea__full" size="mini" maxlength="200" show-word-limit>
                                        </el-input>
                                    </el-form-item>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="财务数据" :name="String(data.modelTableVos.length)">财务数据</el-tab-pane>
                <el-tab-pane label="关联人信息" :name="String(data.modelTableVos.length+1)">
                    <RelatedPersonInfor ref="relatedPerson" :bizApplyMap="data.bizApplyMap" :bizRelevancePerson="data.bizRelevancePerson"></RelatedPersonInfor>
                </el-tab-pane>
                <el-tab-pane label="附件" :name="String(data.modelTableVos.length+2)">
                    <Upload ref="upload" :fileList.sync="data.fileList"></Upload>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="tags" v-if="active === 1">
            <Report :data="reportData" :reportLoading="reportLoading"></Report>
        </div>
        <div class="sub-gap"></div>

        <div class="template-content" v-if="active == 0">
            <div class="template-bottom-button">
                <template>
                    <el-button type="primary" size="small" @click="onSave">保存</el-button>
                    <el-button type="primary" size="small" @click="next">下一步</el-button>
                </template>
            </div>
        </div>
        <div class="template-content fixed" v-if="active == 1">
            <div class="template-bottom-button">
                <template>
                    <el-button type="primary" size="small" @click="previous">上一步</el-button>
                    <el-button type="primary" size="small" @click="onSave">保存</el-button>
                    <el-button type="primary" size="small" @click="onSubmit">提交审核</el-button>
                </template>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import ContentWrapper from "@/components/ContentWrapper.vue";

import { namespace } from "vuex-class";
const enterInfoManage = namespace("enterpriseInfoManage");
const enterpriseCreditManage = namespace("enterpriseCreditManage");

import RelatedPersonInfor from "./relatedPersonInfor/index.vue";
import Upload from "./Upload.vue";
import Report from "./Report.vue";

@Component({
    components: {
        ContentWrapper,
        RelatedPersonInfor,
        Upload,
        Report,
    },
})
export default class creditInvestigation extends Vue {
    @enterInfoManage.Action showCreditTemplateDetail; //获取资信调查模板数据
    @enterInfoManage.Action addOrUpdateCreditStandFN; //保存
    @enterInfoManage.Action queryResultDataFN; //获取决策结果
    @enterInfoManage.Action queryProcessAudit; //提交审核
    @enterpriseCreditManage.Action queryList;
    @enterpriseCreditManage.State searchData;
    active = 0; // 步骤条
    loading: boolean = false;
    reportLoading: boolean = false;
    activeName: string = "0"; // 页签
    data: any = {
        bizApplyMap: {},
        modelTableVos: [],
        bizRelevancePerson: [],
    };
    reportData: any = {};
    rules = {
        columValue: [{ required: true, message: "请输入", trigger: "blur" }],
        columValueSelect: [
            { required: true, message: "请选择", trigger: "change" },
        ],
    };
    cacheResponseData: any = {};
    created() {
        /* 获取基本信息 */
        let {
            custId,
            surveyId,
            creditCode,
            tradeKeyNo,
            modelKeyNo,
            modelType = "02",
        } = this.$route.query;
        this.getDetailData({
            surveyId: surveyId,
            custId: custId,
            creditCode: creditCode,
            tradeKeyNo: tradeKeyNo,
            modelKeyNo: modelKeyNo,
            modelType,
        });
    }

    // 格式化角色
    handelRole(roleArr = []) {
        if (roleArr && roleArr.length == 0) return "---";
        if (roleArr && roleArr.length) {
            let cacheArr: any = [];
            roleArr.forEach((item) => {
                cacheArr.push(this.$code("bizRoles", item));
            });
            return cacheArr.join("，");
        }
    }
    // 获取详情数据
    getDetailData(params) {
        this.loading = true;
        this.showCreditTemplateDetail({ ...params })
            .then((data) => {
                this.$set(this.data, "bizApplyMap", data.bizApplyMap || {});
                this.$set(this.data, "modelTableVos", data.modelTableVos || []);
                this.$set(
                    this.data,
                    "bizRelevancePerson",
                    data.bizRelevancePerson || []
                );

                let fileList: any = [];
                data.loanSysArchInfoList &&
                    data.loanSysArchInfoList.forEach((item) => {
                        fileList.push({
                            noUpload: true,
                            keyNo: item.keyNo,
                            name: item.fileName,
                            url: item.url,
                        });
                    });
                this.$set(this.data, "fileList", fileList || []);
            })
            .finally(() => (this.loading = false));
    }

    onSave() {
        if (this.validateForms()) this.getData("save", false);
    }
    // 表单校验
    validateForms() {
        /**
         *
         * 1、因为是动态生成的 form，所有通过 ref 获取的是一个 集合 $elArr
         * 2、生成一个长度为 $elArr.length ，值为 false 的临时数组 arr
         * 3、循环 ref 集合 ，每通过一个校验，则将临时数组对应位置的值 设置为 true
         * 4、当所有表单校验成功后，才发起 ajax 请求
         * 5、如果未通过校验，则将 当前激活的 tab 设置为临时数组 中 第一个 为 false 的位置(注意数据类型转换)
         *  */

        // 1、获取 ref 集合
        let $elArr: any = this.$refs["forms"];
        // 2、生成一个长度为 $elArr.length，值为 false 的数组
        let arr = new Array($elArr.length).fill(false);
        // 3、循环 ref 集合
        for (let i = 0; i < $elArr.length; i++) {
            // 4、动态校验每个表单
            $elArr[i].validate((valid) => {
                if (valid) {
                    // 5、如果当前表单通过校验，则将临时数组中的值更改为 true
                    arr[i] = true;
                } else {
                    // 7、获取未通过校验的数组下标
                    let index = arr.indexOf(false);

                    // 8、当前激活的 tab，不等于 未通过 校验表单的 index 时，更改当前激活 tab
                    if (this.activeName != String(index)) {
                        this.activeName = String(index);
                    }
                    return false;
                }
            });
        }
        // 校验关联人信息
        arr.push(false);
        let $el2: any = (this.$refs["relatedPerson"] as RelatedPersonInfor)
            .$refs["forms"];
        $el2.validate((valid) => {
            if (valid) {
                arr[arr.length - 1] = true;
            } else {
                this.activeName = String(arr.length);
            }
        });
        // 6、所有表单都通过校验后，发起 ajax 请求
        return arr.every((item) => item);
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
                let params = {
                    surveyId: this.cacheResponseData.surveyId,
                    custId: this.cacheResponseData.custId,
                    approveAdvise: data.value,
                    decisionResult: this.reportData.decisionResult || {},
                };

                this.queryProcessAudit(params).then((msg) => {
                    this.$message({ type: "success", message: msg });
                    this.goRouter();
                    this.queryList(this.searchData);
                });
            })
            .catch(() => {});
    }
    // 下一步
    next() {
        if (this.validateForms()) {
            this.$confirm(
                "将基于您填写的数据生成企业信用报告，请确认是否提交？",
                "温馨提示",
                {
                    confirmButtonText: "确定",
                    cancelButtonText: "检查一下",
                    type: "warning",
                }
            )
                .then(() => {
                    this.getData("next", true);
                })
                .catch(() => {});
        }
    }
    // 上一步
    previous() {
        this.getDetailData({
            ...this.cacheResponseData,
            modelType: "02",
        });
        this.active--;
    }

    getData(type, isOnlyJump) {
        let formData = new FormData();

        let $refUpload: any = this.$refs["upload"];

        let $fileList = $refUpload.fileList;
        let $deleteFileInfoList = $refUpload.deleteFileInfoList;
        // 获取需要上传的文件
        let target = $fileList.filter((item) => !item.noUpload);
        let saveFileInfoList: any = [];
        if (target.length > 0) {
            target.forEach((file) => {
                formData.append("file", file.raw, file.name);
                saveFileInfoList.push({ fileName: file.name });
            });
        }

        let modelTableDate: object[] = [];
        for (let i = 0; i < this.data.modelTableVos.length; i++) {
            let item = this.data.modelTableVos[i];
            // 1、获取 tab 表头信息
            let loanCreditBizSurveyType = {
                tableCname: item.modelTableConfig.tableCname,
                tableCode: item.modelTableConfig.tableCode,
            };

            // 2、获取 tab 表格信息
            let loanCreditBizSurveyInfo: object[] = [];
            for (let j = 0; j < item.modelColumnVoList.length; j++) {
                let subItem = item.modelColumnVoList[j];
                let obj = {
                    columCname: subItem.columCname,
                    columCode: subItem.columCode,
                    columValue: subItem.columValue,
                    surveyInfoKeyNo: subItem.surveyInfoKeyNo,
                    remark: subItem.remark,
                };
                loanCreditBizSurveyInfo.push(obj);
            }

            let obj = {
                loanCreditBizSurveyInfo: loanCreditBizSurveyInfo,
                loanCreditBizSurveyType: loanCreditBizSurveyType,
            };
            modelTableDate.push(obj);
        }
        // 关联人信息
        let $refRelatedInfo: any = this.$refs["relatedPerson"];
        let bizRelevancePerson = $refRelatedInfo.formData.list;

        let params = {
            deleteFileInfoList: $deleteFileInfoList,
            loanCreditBizSurveyApply: this.data.bizApplyMap,
            modelTableDate: modelTableDate,
            surveyId: this.$route.query.surveyId,
            saveFileInfoList: saveFileInfoList,
            bizRelevancePerson: bizRelevancePerson,
        };

        formData.append("fileType", "01");
        formData.append("params", JSON.stringify(params));
        type == "next"
            ? formData.append("buttonType", "yxb")
            : formData.append("buttonType", "bc");
        this.loading = true;
        this.addOrUpdateCreditStandFN(formData)
            .then((res) => {
                if (isOnlyJump) {
                    // 缓存数据
                    this.cacheResponseData = res;
                    this.active++;
                    this.getResultData();
                } else {
                    this.$message({ type: "success", message: res });
                    this.goRouter();
                    this.queryList(this.searchData);
                }
            })
            .finally(() => (this.loading = false));
    }

    // 获取决策结果
    getResultData() {
        this.reportLoading = true;
        let { custId, creditCode, surveyId } = this.$route.query;
        let params = {
            custId,
            creditCode,
            surveyId,
        };
        this.queryResultDataFN(params)
            .then((res) => {
                this.$set(this, "reportData", res);
            })
            .finally(() => {
                this.$nextTick(() => (this.reportLoading = false));
            });
    }

    // 回到列表
    goRouter() {
        this.$bus.$emit("jumpToTag", {
            path: this.$route.path,
            tag: "/enterpriseCreditManage",
        });
    }
}
</script>

<style scoped lang="scss">
.mb20 {
    margin-bottom: 20px;
}
.tops {
    background: #fff;
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
    }
}
.setps {
    margin: 20px 0;
    height: 100px;
    background: #fff;
    width: 100%;
}

.tags {
    background: #fff;
    padding: 20px;
}
.template-container .fixed {
    position: absolute !important;
    bottom: 0 !important;
    z-index: 1;
    width: 94.5%;
}
</style>
