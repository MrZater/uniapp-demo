<template>
    <div class="template-container" v-loading="loading">
        <div class="tags">
            <el-form :inline="true" :rules="rules" :model="queryForm" label-width="70px" ref="form" size="small">
                <el-tabs v-model="activeName">
                    <el-tab-pane :label="item.modelTableConfig.tableCname" :name="String(index)" v-for="(item,index) in modelTableVos" :key="index">
                        <el-form :model="item" :rules="rules" ref="forms" size="small">
                            <el-table stripe :data="item.modelColumnVoList" class="br-table" border style="width: 100%">
                                <el-table-column label="指标名称" prop="columCname"></el-table-column>
                                <el-table-column label="录入信息" prop="columValue">
                                    <template slot-scope="scope">
                                        <el-form-item :prop="'modelColumnVoList.' + scope.$index + '.columValue' " class="br-form-item-label"
                                            :rules="scope.row.requiredFlag == '1' ? rules.columValue : []" v-if="scope.row.inputModel =='01'">
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
                                            <el-input v-model="row.remark" type="textarea" class="br-textarea-large" size="mini" maxlength="200" show-word-limit>
                                            </el-input>
                                        </el-form-item>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-form>

                    </el-tab-pane>
                </el-tabs>
            </el-form>

        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
const tradeInfoManage = namespace("tradeInfoManage");

@Component({})
export default class creditInvestigation extends Vue {
    @tradeInfoManage.Action showTradeTemplateDetail;

    @tradeInfoManage.State riskId;
    public queryForm: any = {};

    public loading: boolean = false;

    public activeName: string = "0";

    modelTableVos: any = [];
    modelKeyNo: string | undefined = "";

    rules = {
        columValue: [{ required: true, message: "请输入", trigger: "blur" }],
        columValueSelect: [
            { required: true, message: "请选择", trigger: "change" },
        ],
    };

    mounted() {
        this.loading = true;
        this.showTradeTemplateDetail({ riskId: this.riskId })
            .then((res) => {
                this.modelTableVos =
                    res.modelTableVos instanceof Array ? res.modelTableVos : [];
                this.modelKeyNo = res.modelKeyNo;
                this.$nextTick(() => {
                    let arr: any = this.$refs["forms"];
                    arr.forEach((element) => {
                        element.clearValidate();
                    });
                });
            })
            .finally(() => (this.loading = false));
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
        // 6、所有表单都通过校验后，发起 ajax 请求
        return arr.every((item) => item);
    }
    handleParams() {
        let params = {
            riskId: this.riskId,
            modelKeyNo: this.modelKeyNo,
            modelTableVos: this.modelTableVos,
        };
        return params;
    }
}
</script>

<style scoped lang="scss">
.tags {
    background: #fff;
    padding: 20px;
}
</style>
