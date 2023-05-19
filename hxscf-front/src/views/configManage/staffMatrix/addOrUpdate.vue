<template>
    <el-dialog :title="handleType === 'add' ? '新增' : '编辑' " :visible="visible" width="1000px" @close="onCancel" class="br-dialog cross-table-dialog">
        <el-form :inline="true" :model="addForm" :rules="rules" label-width="73px" ref="addForm" size="small" v-loading="loading">
            <el-form-item class="br-form-item-label" label="组织名称" prop="orgName">
                <el-select v-model="addForm.orgName" placeholder="请选择组织名称" class="br-select tree-select" :popper-append-to-body="false" ref="treeSelect">
                    <el-option value="null">
                        <el-tree :data="orgNameList" @node-click="onLeavesClick" node-key="id" :props="defaultProps"></el-tree>
                    </el-option>
                </el-select>
            </el-form-item>

            <div class="rt">
                <el-button type="primary" class="br-btn-large" @click="onAddOrg">新增业务部门</el-button>
            </div>

            <el-table stripe :data="addForm.list" class="br-table">
                <el-table-column prop="orgCode" width="200px" fixed="left">
                    <template slot-scope="scope">
                        <el-form-item :prop="'list.' + scope.$index + '.orgCode' " class="br-form-item-label" :rules="rules.orgCode">
                            <el-select v-model="scope.row.orgCode" placeholder="请选择业务部门" class="br-select-small" clearable @change="(val)=>onOrgChange(scope.row,val)">
                                <el-option v-for="item in deptTree" :key="item.key" :label="item.value" :value="item.key"></el-option>
                            </el-select>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column v-for="(item,index) in tbcolumns" :key="index" :prop="item.prop" :label="item.label" min-width="200px">
                    <template slot-scope="scope">
                        <el-form-item :prop="'list.' + scope.$index + '.userCode.' + index" class="br-form-item-label" :rules="rules.userCode">
                            <el-select v-model="scope.row.userCode[index]" multiple collapse-tags placeholder="请选择" class="br-select-small" clearable>
                                <el-option v-for="item in scope.row.userTree" :key="item.key" :label="item.value" :value="item.key"></el-option>
                            </el-select>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column label="操作" min-width="80" fixed="right">
                    <template slot="header">
                        <div class="action-header">
                            <span>操作</span>
                            <span @click="editColumn" class="action-icon">
                                <i class="el-icon-circle-plus"></i>
                            </span>
                        </div>
                    </template>
                    <template slot-scope="scope">
                        <el-popconfirm title="确认删除该数据吗？" @onConfirm="onRemove(scope.$index,addForm.list)">
                            <el-button type="text" size="mini" slot="reference">删除</el-button>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </el-form>
        <div slot="footer" class="br-dialog-footer">
            <el-button type="primary" class="br-btn-large" @click="onSave" :disabled="btnLoading || loading" :loading="btnLoading">保存</el-button>
            <el-button class="br-btn-large" @click="visible = false">取消</el-button>
        </div>
        <el-dialog title="添加审批节点" class="br-dialog" width="600px" :visible.sync="dialogTableVisible" :close-on-click-modal="false" :show-close="false" :append-to-body="true">
            <el-button type="primary" class="br-btn" @click="addColumn">添加</el-button>
            <div class="sub-gap"></div>
            <div class="edit-column-box">
                <draggable v-model="newTbcolumns">
                    <div class="edit-column-item" v-for="(column,index) in newTbcolumns" :key="column.prop">
                        <div class="dir-item left-item">
                            <span>{{index+1}}</span>
                            <span class="column-label">
                                <el-input class="br-input-large" placeholder="请输入审批节点" v-model.trim="column.label"></el-input>
                            </span>
                        </div>
                        <div class="dir-item right-item">
                            <span class="width-span">
                                <el-popconfirm title="确认删除该数据吗？" @onConfirm="onRemove(index,newTbcolumns)">
                                    <el-button type="text" class="br-btn" slot="reference">删除</el-button>

                                </el-popconfirm>
                            </span>
                        </div>
                    </div>
                </draggable>
            </div>
            <div slot="footer" class="br-dialog-footer">
                <el-button type="default" class="br-btn" @click="editCancel">取 消</el-button>
                <el-button type="primary" class="br-btn" @click="editOk">确 定</el-button>
            </div>
        </el-dialog>
    </el-dialog>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
const staffMatrix = namespace("staffMatrix");
const configManage = namespace("configManage");
import { ColumnTable } from "@/components";
import cloneDeep from "lodash.clonedeep";

@Component({
    components: {
        ColumnTable,
    },
})
export default class Dialog extends Vue {
    @configManage.State orgNameList;
    @staffMatrix.State deptTree;
    @staffMatrix.Action queryDeptTree;
    @staffMatrix.Action queryUserTree;
    @staffMatrix.Action queryList;
    @staffMatrix.State searchData;
    @staffMatrix.Action queryAdd;
    @staffMatrix.Action queryEdit;
    @staffMatrix.Action queryDetail;
    public handleType: string = "";
    public dialogTableVisible: boolean = false;
    public loading: boolean = false;
    public btnLoading: boolean = false;

    public tbcolumns: any = [];
    public newTbcolumns: any = [];
    public visible: boolean = false;

    rules = {
        orgName: [{ required: true, message: "请选择", trigger: "change" }],
        orgCode: [{ required: true, message: "请选择", trigger: "change" }],
        userCode: [{ required: true, message: "请选择", trigger: "change" }],
    };
    public addForm: any = {
        orgName: "",
        orgCode: "",
        list: [],
    };
    defaultProps = {
        children: "children",
        label: "label",
    };

    init(type, row) {
        this.handleType = type;
        if (type !== "add") {
            this.queryDeptTree({ orgCode: row.orgCode });
            this.loading = true;
            this.queryDetail({ orgCode: row.orgCode })
                .then((res) => {
                    let list: any = [];
                    this.$set(this.addForm, "orgName", row.orgName);
                    this.$set(this.addForm, "orgCode", row.orgCode);
                    res.forEach((item, index) => {
                        let rowItem: any = {
                            orgCode: item.orgCode,
                        };
                        let userCode: any = [];
                        let newSet = new Set();
                        item.nodeList.forEach((subItem, subIndex) => {
                            // 获取动态表格表头
                            newSet.add({
                                label: subItem.nodeName,
                                prop: "key" + newSet.size,
                            });

                            // 获取动态表格值
                            let cache: any = [];
                            subItem.userList.forEach((ssb) =>
                                cache.push(ssb.userCode)
                            );

                            userCode[subIndex] = cache;
                        });

                        this.tbcolumns = Array.from(newSet);

                        rowItem.userCode = userCode;
                        this.queryUserTree({ deptCode: item.orgCode }).then(
                            (data) => {
                                rowItem.userTree = data || [];
                                list.push(rowItem);
                                /* 以下操作是防止页面闪动 */
                                if (res.length - 1 === index) {
                                    this.$set(this.addForm, "list", list);
                                    setTimeout(
                                        () => (this.loading = false),
                                        200
                                    );
                                }
                            }
                        );
                    });

                    // this.$set(this.addForm, "list", list);
                })
                .catch((err) => (this.loading = false));
        }
        this.visible = true;
    }

    onAddOrg() {
        this.addForm.list.push({
            userCode: [],
        });
    }
    onSave() {
        let $els: any = this.$refs["addForm"];
        $els.validate((valid) => {
            if (valid) {
                if (this.addForm.list.length === 0) {
                    this.$message({
                        type: "error",
                        message: "业务部门不能为空",
                    });
                    return;
                }
                if (this.tbcolumns.length === 0) {
                    this.$message({
                        type: "error",
                        message: "审批节点不能为空",
                    });
                    return;
                }
                let params: any = {};
                params.orgCode = this.addForm.orgCode;
                let list: any = [];
                this.addForm.list.forEach((item) => {
                    let listItem: any = {
                        orgCode: item.orgCode,
                    };
                    let nodeList: any = [];
                    this.tbcolumns.forEach((sub, subIndex) => {
                        let nodeListItem: any = {};
                        nodeListItem.nodeName = sub.label;
                        let codeArr = item.userCode[subIndex];
                        let userList: any = [];
                        codeArr.forEach((code) => {
                            item.userTree.forEach((treeItem) => {
                                if (code === treeItem.key) {
                                    userList.push({
                                        userCode: treeItem.key,
                                        realName: treeItem.value,
                                    });
                                }
                            });
                        });
                        nodeListItem.userList = userList;
                        nodeList.push(nodeListItem);
                    });
                    listItem.nodeList = nodeList;
                    list.push(listItem);
                });
                params.list = list;
                this.btnLoading = true;
                if (this.handleType === "add") {
                    this.queryAdd(params)
                        .then((res) => {
                            this.onSuccess(res);
                        })
                        .finally(() => (this.btnLoading = false));
                } else {
                    this.queryEdit(params)
                        .then((res) => {
                            this.onSuccess(res);
                        })
                        .finally(() => (this.btnLoading = false));
                }
            } else {
                return false;
            }
        });
    }
    onSuccess(msg) {
        this.visible = false;
        this.$message({ type: "success", message: msg });
        this.queryList(this.searchData);
    }
    onCancel() {
        // 重置表单数据
        this.addForm = {
            orgName: "",
            orgCode: "",
            list: [],
        };
        // 重置表格表头
        this.tbcolumns = [];
        this.$nextTick(() => {
            (this.$refs["addForm"] as any).clearValidate();
        });
        this.visible = false;
    }
    editColumn() {
        this.newTbcolumns = cloneDeep(this.tbcolumns);
        this.dialogTableVisible = true;
    }
    onRemove(index, rows) {
        rows.splice(index, 1);
    }
    //点击组织名称
    onLeavesClick(data, node, el) {
        if (this.addForm.list && this.addForm.list.length !== 0) {
            if (this.addForm.orgCode !== data.id) {
                this.$confirm("改变组织名称将会清空列表项, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                })
                    .then(() => {
                        this.$set(this.addForm, "list", []);
                        this.changeData(data);
                    })
                    .catch(() => {});
            } else {
                this.changeData(data);
            }
        } else {
            this.changeData(data);
        }
    }
    changeData(data) {
        this.addForm["orgName"] = data.label;
        this.addForm["orgCode"] = data.id;
        this.$refs.treeSelect["handleClose"]();
        this.queryDeptTree({ orgCode: data.id });
    }
    // 点击机构
    onOrgChange(row, val) {
        this.queryUserTree({ deptCode: val }).then((res) => {
            this.$set(row, "userTree", res);
            this.$set(row, "userCode", []);
        });
    }

    editOk(event) {
        /* 判断非空 */
        let result = this.newTbcolumns.every((item) => item.label.trim() != "");
        if (!result) {
            this.$message({ type: "error", message: "审批节点不能为空" });
            return;
        }
        /* 判断是否有重复值 */
        let arr: any = [];
        this.newTbcolumns.forEach((item) => arr.push(item.label.trim()));
        let newSet = new Set(arr);
        if (arr.length !== newSet.size) {
            this.$message({ type: "error", message: "审批节点不能重复" });
            return;
        }

        this.tbcolumns = this.newTbcolumns;

        this.dialogTableVisible = false;
    }
    addColumn() {
        this.newTbcolumns.push({
            prop: "key" + new Date().getTime(),
            label: "",
        });
    }

    editCancel() {
        this.dialogTableVisible = false;
    }
}
</script>
<style scope lang="scss">
.rt {
    float: right;
}
.action-header {
    position: relative;
    .action-icon {
        cursor: pointer;
        position: absolute;
        right: 0;
        top: 0;
    }
}
.edit-column-box {
    max-height: 450px;
    overflow: auto;
    border: 1px solid #dcdfe6;
    .edit-column-item {
        display: flex;
        align-content: center;
        align-items: center;
        padding: 0 10px;
        border-bottom: 1px solid #dcdfe6;
        &:last-child {
            border-bottom: 0 none;
        }

        .dir-item {
            display: flex;
            align-content: center;
            align-items: center;
            .column-label {
                display: inline-block;
                margin-left: 10px;
                height: 35px;
                width: 75%;
                line-height: 35px;
                background: rgba(239, 239, 239, 0.3);
                padding-left: 10px;
            }
            .width-span {
                display: inline-block;
                width: 30px;
            }
            .el-input__inner {
                height: 25px;
                line-height: 25px;
                // width: 80px;
            }
        }
        .left-item {
            width: 80%;
        }
        .right-item {
            width: 10%;
            // justify-content: flex-end;
        }
    }
}
.cross-table-dialog {
    .el-table thead tr:first-of-type th:first-of-type:before {
        content: "审批节点";
        text-align: center;
        position: absolute;
        width: 152px;
        height: 1px;
        top: 10px;
        right: -40px;
    }

    .el-table thead tr:first-of-type th:first-of-type:after {
        content: "业务部门";
        text-align: center;
        position: absolute;
        width: 152px;
        bottom: 10px;
        left: -40px;
    }
    .el-table thead tr:first-of-type th:first-of-type .cell {
        position: absolute;
        top: 0;
        left: 0;
        width: 204px;
        height: 1px;
        background-color: #dcdfe6;
        display: block;
        text-align: center;
        transform: rotate(13deg);
        transform-origin: top left;
        -ms-transform: rotate(13deg);
        -ms-transform-origin: top left;
        -webkit-transform: rotate(13deg);
        -webkit-transform-origin: top left;
    }

    .el-table td,
    .el-table th.is-leaf {
        border-right: 1px solid #dcdfe6;
    }
}
</style>