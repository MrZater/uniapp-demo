<template>
    <div class="template-container" v-loading="loading">
        <!-- 1、表单项 -->
        <template>
            <div class="template-content">
                <div class="grid-title">
                    <div class="sub-title">
                        {{ handleType == "add" ? "新建模板" : "编辑模板"}}
                    </div>

                    <div class="sub-gap"></div>
                </div>
                <el-form :inline="true" :model="formData" label-width="100px" ref="formData" :rules="rules" size="small">
                    <el-form-item label="模板名称" prop="template.modelName" class="br-form-item-label">
                        <el-input class="br-input-large" placeholder="请输入模板名称" v-model.trim="formData.template.modelName"></el-input>
                    </el-form-item>
                    <!-- 行业特殊模板才有 行业名称 -->
                    <el-form-item class="br-form-item-label" label="行业名称" prop="template.tradeKeyNo" v-if="modelFlag == '1'">
                        <el-select v-model.trim="formData.template.tradeKeyNo" placeholder="请选择行业名称" class="br-select">
                            <el-option v-for="item in tradeList" :key="item.keyNo" :label="item.tradeName" :value="item.keyNo"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div class="sub-gap"></div>
        </template>

        <!-- 2、按钮组(通用模板) -->
        <template v-if="modelFlag == '0'">
            <div class="template-content">
                <div class="template-content-title">
                    <div class="template-content-title-extra">
                        <el-button type="primary" class="br-btn" @click="openAdd">新建页签</el-button>
                        <el-button type="primary" class="br-btn" @click="openUpdate">编辑页签</el-button>
                    </div>
                </div>
            </div>
            <div class="sub-gap"></div>
        </template>
        <!-- 3、页签列表 -->
        <!-- {{formData.modelTableVos.length}} -->
        <div class="template-content" v-if="formData.modelTableVos.length">
            <el-tabs v-model="activeName">
                <div class="sub-gap"></div>
                <el-tab-pane :label="item.modelTableConfig.tableCname" :name="String(index)" v-for="(item,index) in formData.modelTableVos" :key="index">
                    <div class="template-content-title">
                        列表
                        <div class="template-content-title-extra">
                            <el-button class="br-btn" type="primary" @click="onTableAdd(item)">新增</el-button>
                        </div>
                    </div>
                    <div class="template-content-main">
                        <el-form :model="item" :rules="rules" ref="forms" size="small">
                            <el-table stripe :data="item.modelColumnVoList" class="br-table" border style="width: 100%">
                                <el-table-column label="字段名称" prop="columCname" min-width="230">
                                    <template slot-scope="scope">
                                        <el-form-item :prop="'modelColumnVoList.' + scope.$index + '.columCname' " class="br-form-item-label" :rules="rules.columCname">
                                            <el-input v-model.trim="scope.row.columCname" class="br-input"></el-input>
                                        </el-form-item>
                                    </template>
                                </el-table-column>
                                <el-table-column label="英文名称" prop="columCode" min-width="230" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <el-form-item :prop="'modelColumnVoList.' + scope.$index + '.columCode' " class="br-form-item-label" :rules="rules.columCode">
                                            <el-input v-model.trim="scope.row.columCode" class="br-input"></el-input>
                                        </el-form-item>
                                    </template>
                                </el-table-column>
                                <el-table-column label="输入方式" prop="inputModel" width="150" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <el-form-item class="br-form-item-label">
                                            <el-radio-group v-model="scope.row.inputModel" @change="(val)=>onInputModelChange(scope.row,val)">
                                                <div class="mt10" v-for="(item,index) in $select('inputModelType')" :key="index">
                                                    <el-radio :label="item.value">{{item.text}}</el-radio>
                                                </div>
                                            </el-radio-group>
                                        </el-form-item>
                                    </template>
                                </el-table-column>
                                <el-table-column label="字段长度" prop="columLength" min-width="230" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <el-form-item :prop="'modelColumnVoList.' + scope.$index + '.columLength' " class="br-form-item-label" :rules="rules.columLength">
                                            <el-input-number v-model.trim="scope.row.columLength" :min="10" :max="200"></el-input-number>
                                        </el-form-item>
                                    </template>
                                </el-table-column>
                                <el-table-column label="是否必填" prop="requiredFlag" width="150" show-overflow-tooltip>
                                    <template slot-scope="{row}">
                                        <el-radio-group v-model="row.requiredFlag">
                                            <div class="mt10" v-for="(item,index) in $select('yesOrNo')" :key="index">
                                                <el-radio :label="item.value">{{item.text}}</el-radio>
                                            </div>
                                        </el-radio-group>
                                    </template>
                                </el-table-column>
                                <el-table-column label="字段值" prop="columType" width="150">
                                    <template slot-scope="{row}">
                                        <template v-if="row.inputModel == '01'">
                                            <el-radio-group v-model="row.columType">
                                                <div class="mt10" v-for="(item,index) in $select('columType')" :key="index">
                                                    <el-radio :label="item.value">{{item.text}}</el-radio>
                                                </div>
                                            </el-radio-group>
                                        </template>
                                        <template v-else>
                                            <el-link type="primary" :underline="false" @click="openDic(row)">编辑字典项</el-link>
                                        </template>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作" width="100">
                                    <template slot-scope="scope">
                                        <el-popconfirm title="确认删除该数据吗？" @onConfirm="onRemove(scope.$index,item.modelColumnVoList)">
                                            <el-button type="text" size="mini" slot="reference">删除</el-button>
                                        </el-popconfirm>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-form>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <div class="template-bottom-button">
                <el-button class="br-btn" @click="onSubmit('01')">保 存</el-button>
                <el-button class="br-btn" type="primary" @click="onSubmit('02')">提交审核</el-button>
            </div>
        </div>
        <!-- 4、Empty -->
        <div class="template-content" v-else>
            <Empty></Empty>
        </div>
        <!-- 5、操作记录(重新提交) -->
        <template v-if="$route.query.isShowLog == '1'">
            <div class="sub-gap"></div>
            <div class="template-content">
                <div class="grid-title">
                    <div class="sub-title">操作记录</div>
                </div>
                <el-table stripe :data="formData.historyApprove || []" class="br-table" border style="width: 100%">
                    <el-table-column label="操作时间" prop="approvetime" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            {{row.approvetime | time}}
                        </template>
                    </el-table-column>
                    <el-table-column label="组织名称" prop="orgName" show-overflow-tooltip></el-table-column>
                    <el-table-column label="操作人" prop="approvename" show-overflow-tooltip></el-table-column>
                    <el-table-column label="审核结果" prop="approveresult" show-overflow-tooltip>
                        <template slot-scope="{row}">
                            {{$code("approveResult",row.approveresult)}}
                        </template>
                    </el-table-column>
                    <el-table-column label="审核意见" prop="approveadvise" show-overflow-tooltip></el-table-column>
                </el-table>
            </div>
        </template>
        <AddDialog ref="addDialog" @addTabs="addTabs"></AddDialog>
        <UpdateDialog ref="updateDialog" @updateTabs="updateTabs" :list="formData.modelTableVos"></UpdateDialog>
        <DicDialog ref="dicDialog"></DicDialog>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";

import { namespace } from "vuex-class";

const credit = namespace("credit");

import { Empty } from "@/components";
import DicDialog from "./dic-dialog.vue";
import AddDialog from "./add-dialog.vue";
import UpdateDialog from "./update-dialog.vue";
const initTemplate = {
    modelName: "",
    tradeKeyNo: "",
    modelType: "02",
    modelFlag: "0",
    apprState: "02",
};
const initTabs = {
    columCode: "",
    columCname: "",
    inputModel: "01",
    columLength: "",
    requiredFlag: "1",
    columType: "01",
    columDicConfigList: [],
};
@Component({
    name: "creditAddOrUpdate",
    components: {
        Empty,
        DicDialog,
        AddDialog,
        UpdateDialog,
    },
})
export default class creditAddOrUpdate extends Vue {
    @credit.Action addTemplate;
    @credit.Action queryDetail;
    @credit.Action queryList;
    @credit.Action queryTradeList; // 所属行业
    @credit.State tradeList; // 所属行业
    @credit.State searchData;
    loading: boolean = false;

    activeName: string = "0";

    formData: any = {
        template: { ...initTemplate },
        modelTableVos: [],
    };

    rules = {
        "template.modelName": [{ required: true, message: "请输入模板名称" }],
        "template.tradeKeyNo": [{ required: true, message: "请选择行业名称" }],
        columCname: [
            { required: true, message: "请输入字段名称", trigger: "blur" },
        ],
        columCode: [
            { required: true, message: "请输入英文名称", trigger: "blur" },
        ],
        columLength: [
            { required: true, message: "请输入字段长度", trigger: "blur" },
        ],
    };

    modelFlag: any = "";
    handleType: any = "";
    keyNo: any = "";
    modelType: any = ""; // 用来判断行业还是资信
    @Watch("$route", { deep: true })
    getNewRoute(value) {
        let path = "/configManage/credit/addOrUpdate";
        this.modelType = value.query.modelType;
        // console.log(this.modelType, 'this.modelType')
        if (value.path == path) {
            let isModelFlagChange = this.modelFlag != value.query.modelFlag;
            let isHandleTypeChange = this.handleType != value.query.handleType;

            if (isModelFlagChange || isHandleTypeChange) {
                /* 不管是通用、特殊更改，还是新建、编辑更改 ,直接更新数据*/
                this.modelFlag = value.query.modelFlag;
                this.handleType = value.query.handleType;
                this.keyNo = this.$route.query.keyNo; // 参数
                this.modelFlag == "0"
                    ? this.initCommon()
                    : this.initTradeSpecial();
            } else {
                /* 看参数是否变化 */
                if (this.keyNo != value.query.keyNo) {
                    this.keyNo = value.query.keyNo;
                    this.initTradeSpecial();
                }
            }
        }
    }

    mounted() {
        this.queryTradeList(); //获取行业列表
        this.modelFlag = this.$route.query.modelFlag; //0 通用 1 行业特殊
        this.handleType = this.$route.query.handleType; // add 新增 edit 编辑
        this.keyNo = this.$route.query.keyNo; // 参数
        this.modelFlag === "0" ? this.initCommon() : this.initTradeSpecial();
    }
    created() {
        this.modelType = this.$route.query.modelType;
    }
    onTableAdd(item) {
        item.modelColumnVoList.push({ ...initTabs });
    }

    onInputModelChange(row, val) {
        /* 
        如果输入方式不是文本，则将字段类型 columType 动态设置为 "05"
         */
        row.columType = val == "01" ? val : "05";
    }

    initCommon() {
        if (this.handleType == "add") {
            // alert("通用新建");
            this.$set(this.formData, "template", { ...initTemplate });
            this.$set(this.formData, "modelTableVos", []);
        } else {
            // alert("通用编辑");
            this.getData();
        }
        this.clearForms();
    }

    initTradeSpecial() {
        if (this.handleType == "add") {
            // alert("行业特殊新建");
            this.$set(this.formData, "template", { ...initTemplate });
            this.$set(this.formData, "modelTableVos", [
                {
                    modelTableConfig: {
                        tableCode: "hytsxx",
                        tableCname: "行业特殊信息",
                    },
                    modelColumnVoList: [{ ...initTabs }],
                },
            ]);
        } else {
            // alert("行业特殊编辑");
            this.getData();
        }
        this.clearForms();
    }

    clearForms() {
        this.$nextTick(() => {
            let oDom: any = this.$refs["formData"];
            oDom.clearValidate();
            let $elArr: any = this.$refs["forms"];
            $elArr && $elArr.forEach((form) => form.clearValidate());
        });
    }

    getData() {
        this.loading = true;
        this.queryDetail({ keyNo: this.keyNo })
            .then((res) => {
                this.formData = res;
            })
            .finally(() => (this.loading = false));
    }

    addTabs(data) {
        this.formData.modelTableVos.push({
            modelTableConfig: {
                tableCode: data.tableCode,
                tableCname: data.tableCname,
            },
            modelColumnVoList: [{ ...initTabs }],
        });
    }

    updateTabs(newList) {
        this.$set(this.formData, "modelTableVos", newList);
    }

    onRemove(index, rows) {
        rows.splice(index, 1);
    }

    onSubmit(apprState) {
        let oDom: any = this.$refs["formData"];
        oDom.validate((valid) => {
            if (valid) {
                // 1、获取 ref 集合
                let $elArr: any = this.$refs["forms"];
                // 2、生成一个长度为 $elArr.length，值为 false 的数组
                let arr = new Array($elArr.length).fill(false);

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

                            if (
                                this.activeName != String(index) &&
                                index != $elArr.length - 2
                            ) {
                                this.activeName = String(index);
                            }
                            return false;
                        }
                    });
                }
                // 6、所有表单都通过校验后，发起 ajax 请求
                if (arr.every((item) => item)) {
                    let { modelFlag, modelType } = this.$route.query;
                    this.formData.template.modelFlag = modelFlag; // 模块标识  通用模板(0) 行业特殊信息模板(1)
                    this.formData.template.apprState = apprState; //状态  待送审(01)  审核中(02)
                    this.formData.template.apprPhase =
                        apprState == "01" ? "A01" : "A02"; // apprPhase A01: 保存  A02: 提交审核
                    this.formData.template.modelType = modelType;
                    this.loading = true;
                    this.addTemplate(this.formData)
                        .then((msg) => {
                            this.onSuccess();
                        })
                        .finally(() => (this.loading = false));
                }
            } else {
                return false;
            }
        });
    }

    onSuccess() {
        this.$message({ type: "success", message: "操作成功" });
        if (this.modelType == "02") {
            this.$bus.$emit("jumpToTag", {
                path: this.$route.path,
                tag: "/configManage/template/credit",
            });
        } else {
            this.$bus.$emit("jumpToTag", {
                path: this.$route.path,
                tag: "/configManage/template/industry",
            });
        }

        this.queryList({
            ...this.searchData,
            modelFlag: this.modelFlag,
            modelType: this.modelType,
        });
    }

    openAdd() {
        (this.$refs["addDialog"] as AddDialog).dialogVisible = true;
    }

    openUpdate() {
        (this.$refs["updateDialog"] as UpdateDialog).init();
    }

    openDic(row) {
        (this.$refs["dicDialog"] as DicDialog).init(row);
    }
}
</script>

<style  scoped lang="scss">
.mt10 {
    margin: 10px 0;
}
</style>
