<template>
    <el-dialog title="编辑" class="br-dialog" :visible.sync="visible" width="780px" @close="reset">
        <el-form :inline="true" :model="addForm" :rules="rules" ref="addForm" size="small" v-loading="loading">
            <el-form-item label-width="110px" class="br-form-item-label" label="基础数据获取方式" prop="configType">
                <el-radio-group v-model="addForm.configType" class="br-radio">
                    <el-radio label="01">三方获取</el-radio>
                    <el-radio label="02">手动导入</el-radio>
                </el-radio-group>
            </el-form-item>
            <template v-if="addForm.configType === '01'">
                <div class="extra-container">
                    <el-button type="primary" class="br-btn" @click="onAdd">新增</el-button>
                </div>
                <el-table stripe :data="addForm.list" border>
                    <el-table-column label="组织名称" prop="orgName">
                        <template slot-scope="scope">
                            <el-form-item :prop="'list.' + scope.$index + '.orgName' " class="br-form-item-label" :rules="rules.orgName">
                                <el-select v-model="scope.row.orgName" placeholder="请选择组织名称" popper-class="tree-select" class="br-select" :popper-append-to-body="true"
                                    :ref="'treeSelect'+scope.$index">
                                    <el-option value="null">
                                        <el-tree :data="orgNameList" @node-click="(node) => onLeavesClick(node,scope.row,scope.$index)" node-key="id" :props="defaultProps"></el-tree>
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="行业名称" prop="tradeKeyNo">
                        <template slot-scope="scope">
                            <el-form-item :prop="'list.' + scope.$index + '.tradeKeyNo' " class="br-form-item-label" :rules="rules.tradeKeyNo">
                                <el-select v-model="scope.row.tradeKeyNo" placeholder="请选择行业名称" class="br-select">
                                    <el-option
                                        v-for="item in scope.row.tradeList?scope.row.tradeList.filter(item=> !selectIdsArr.filter((sub) => sub != scope.row.tradeKeyNo).some((s) => s == item.keyNo)):[]"
                                        :key="item.keyNo" :label="item.tradeName" :value="item.keyNo"></el-option>
                                </el-select>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="三方编号" prop="tradeCode">
                        <template slot-scope="scope">
                            <el-form-item :prop="'list.' + scope.$index + '.tradeCode' " class="br-form-item-label" :rules="rules.tradeCode">
                                <el-input v-model.trim="scope.row.tradeCode" placeholder="请输入三方编号" class="br-input"></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="80">
                        <template slot-scope="scope">
                            <el-popconfirm title="确认删除该数据吗？" @onConfirm="onRemove(scope.$index,addForm.list)">
                                <el-button type="text" size="mini" slot="reference">删除</el-button>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </template>

        </el-form>
        <div slot="footer" class="br-dialog-footer">
            <el-button type="primary" class="br-btn-large" @click="onSave" :disabled="btnLoading || loading" :loading="btnLoading">保存</el-button>
            <el-button class="br-btn-large" @click="visible = false">取消</el-button>
        </div>
    </el-dialog>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
const tradeDataConfig = namespace("tradeDataConfig");
const configManage = namespace("configManage");
@Component({})
export default class Dialog extends Vue {
    @tradeDataConfig.Action queryList;
    @tradeDataConfig.State searchData;
    @tradeDataConfig.Action queryUpdate;
    @tradeDataConfig.Action queryHisTradeCodeList;
    @tradeDataConfig.Action queryTradeList;

    @configManage.State orgNameList;
    @configManage.Action queryOrgNameList; //获取一级机构-table中组织机构

    public loading: boolean = false;
    public btnLoading: boolean = false;
    public visible: boolean = false;

    addForm: any = {
        configType: "01",
        list: [],
    };
    defaultProps = {
        children: "children",
        label: "label",
    };
    rules = {
        orgName: [
            { required: true, message: "请选择组织名称", trigger: "change" },
        ],
        tradeKeyNo: [
            { required: true, message: "请选择行业名称", trigger: "change" },
        ],
        tradeCode: [
            { required: true, message: "请输入三方编号", trigger: "blur" },
        ],
    };

    get selectIdsArr(): any {
        let arr: any = [];
        this.addForm.list.forEach((item) => {
            arr.push(item.tradeKeyNo);
        });
        return arr;
    }

    mounted() {
        this.queryOrgNameList({ flag: "4" }); // 获取组织名称数据一级机构
    }
    init(row = {}) {
        this.loading = true;
        this.queryHisTradeCodeList(this.searchData)
            .then((res) => {
                this.$set(this.addForm, "configType", res.configType || "02");
                let list = res.list || [];
                if (list && list.length) {
                    // 有数据 就要请求行业名称接口
                    list.forEach((item, index) => {
                        this.queryTradeList({
                            orgCode: item.orgCode,
                        }).then((data) => {
                            this.$set(item, "tradeList", data);
                            /* 以下操作是防止页面闪动 */
                            if (list.length - 1 === index) {
                                this.$set(this.addForm, "list", list);
                                this.loading = false;
                            }
                        });
                    });
                }
            })
            .finally(() => (this.loading = false));

        this.visible = true;
    }
    onRemove(index, rows) {
        rows.splice(index, 1);
    }
    onAdd() {
        this.addForm.list.push({});
    }
    onSave() {
        let $els: any = this.$refs["addForm"];
        $els.validate((valid) => {
            if (valid) {
                let params: any = {
                    configType: this.addForm.configType,
                };
                if (this.addForm.configType === "01") {
                    let tradeCodeList: any = [];
                    this.addForm.list.forEach((item) => {
                        tradeCodeList.push({
                            tradeKeyNo: item.tradeKeyNo,
                            tradeCode: item.tradeCode,
                        });
                    });
                    params.tradeCodeList = tradeCodeList;
                }
                this.btnLoading = true;
                this.queryUpdate(params)
                    .then((res) => {
                        this.$message({ type: "success", message: res });
                        this.visible = false;
                        this.queryList(this.searchData);
                    })
                    .finally(() => (this.btnLoading = false));
            } else {
                return false;
            }
        });
    }
    reset() {
        let $els: any = this.$refs["addForm"];
        $els.resetFields();
        this.$set(this.addForm, "list", []);
    }
    // 组织点击
    onLeavesClick(data, row, index) {
        /* 关闭弹框 */
        // 当同一组件内部，有多个同名ref引用时,this.$refs[ref名称]指向文档流中靠下的组件或DOM节点,不同于v-for中的ref
        // 所以此处采用动态ref
        this.$refs["treeSelect" + index]["handleClose"]();
        if (data.label !== row.orgName) {
            /* 组织名称赋值 */
            this.$set(row, "orgName", data.label);
            /* 清空行业名称 */
            this.$set(row, "tradeKeyNo", "");
            /* 请求行业名称下拉框 */
            this.queryTradeList({ orgCode: data.id }).then((res) => {
                this.$set(row, "tradeList", res);
            });
        }
    }
}
</script>
<style scope lang="scss">
.extra-container {
    line-height: 20px;
    height: 20px;
    font-size: 14px;
    margin-bottom: 15px;
    position: relative;
    .br-btn {
        position: absolute;
        right: 0px;
        top: -5px;
    }
}
</style>