<template>
    <div class="template-container">
        <content-wrapper>
            <template slot="title">
                机构管理
            </template>
            <template slot="extra-btn"></template>
            <template slot="grid">
                <div class="organization-content" v-loading="loading">
                    <el-row :gutter="18">
                        <el-col :span="12">
                            <el-card class="box-card">
                                <div class="card-content">
                                    <div class="organization-content-tree">
                                        <el-tree class="br-tree br-tree-line" :indent="0" :data="orgList" node-key="id" ref="tree" :default-expand-all="true" :expand-on-click-node="false"
                                            :props="defaultProps" @node-click="nodeClick" highlight-current>
                                            <span class="custom-tree-node" slot-scope="{node, data }">
                                                <span>{{ node.label }}</span>
                                                <span>
                                                    <renderBtn code="organization_manage_add">
                                                        <el-button type="text" size="mini" @click.stop="() => handleAdd(data)">新增</el-button>
                                                    </renderBtn>
                                                    <renderBtn code="organization_manage_del">
                                                        <el-popconfirm title="确认删除该机构吗？" @onConfirm="handleRemove(node, data)">
                                                            <el-button type="text" size="mini" slot="reference">删除</el-button>
                                                        </el-popconfirm>
                                                    </renderBtn>
                                                </span>
                                            </span>
                                        </el-tree>
                                    </div>
                                </div>
                            </el-card>

                        </el-col>
                        <el-col :span="12" style="background:#fff">
                            <el-card class="box-card">
                                <div class="card-content">
                                    <div class="organization-content-table">
                                        <el-form :model="selectData" :rules="rules" ref="forms" label-width="100px" class="demo-ruleForm" size="small">
                                            <el-form-item label="机构名称" prop="orgName" class="br-form-item-label">
                                                <el-input v-model.trim="selectData.orgName" auto-complete="off" class="br-input-large"></el-input>
                                            </el-form-item>
                                            <!--                                            <el-form-item label="机构编码" prop="orgCode" class="br-form-item-label">-->
                                            <!--                                                <el-input v-model.trim="selectData.orgCode" auto-complete="off"-->
                                            <!--                                                          class="br-input-large" disabled></el-input>-->
                                            <!--                                            </el-form-item>-->
                                            <el-form-item class="br-form-item-label" label="机构类型" prop="orgFlag">
                                                <el-select v-model="selectData.orgFlag" placeholder="请选择机构类型" filterable class="br-select-large">
                                                    <el-option v-for="(item,index) in $select('orgTypes')" :key="index" :value="item.value" :label="item.text"></el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item label="组织代码" prop="orgNo" class="br-form-item-label" v-if="selectData.orgFlag !=1">
                                                <el-input v-model.trim="selectData.orgNo" auto-complete="off" class="br-input-large"></el-input>
                                            </el-form-item>
                                            <el-form-item label="机构说明" prop="remark" class="br-form-item-label">
                                                <el-input v-model.trim="selectData.remark" type="textarea" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
                                            </el-form-item>
                                            <el-form-item>
                                                <renderBtn code="organization_manage_upd">
                                                    <div class="edit-btns">
                                                        <el-button type="primary" @click="submitForm" class="br-btn-large" :loading="btnloading">确定
                                                        </el-button>
                                                        <el-button @click="resetForm" class="br-btn-large">重置
                                                        </el-button>
                                                    </div>
                                                </renderBtn>
                                            </el-form-item>
                                        </el-form>
                                    </div>
                                </div>
                            </el-card>

                        </el-col>
                    </el-row>
                </div>
                <child-dialog ref="dialog" :dialogData="dialogData" />
            </template>
        </content-wrapper>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";

const organizationManage = namespace("organizationManage");
import ContentWrapper from "@/components/ContentWrapper.vue";
import childDialog from "./dialog.vue";

@Component({
    components: {
        "content-wrapper": ContentWrapper,
        childDialog,
    },
})
export default class Grid extends Vue {
    @organizationManage.State orgList;
    @organizationManage.Action queryOrgList;
    @organizationManage.Action queryDeleteOrg;
    @organizationManage.Action queryAddOrg;
    @organizationManage.State loading;

    btnloading: boolean = false;
    rules = {
        orgName: [
            { required: true, message: "请输入机构名称", trigger: "blur" },
            { max: 20, message: "最多输入20个字符!", trigger: "blur" },
        ],
        orgFlag: [
            { message: "请选择机构类型!", trigger: "blur", required: true },
        ],
        orgNo: [{ message: "请输入组织代码", trigger: "blur", required: true }],
    };
    dialogData: any = {
        organizationOneInfoName: "",
        organizationOneInfoCode: "",
        orgName: "",
        remark: "",
        orgFlag: "",
        orgNo: "",
    };
    selectData: any = {
        orgName: "",
        // orgCode: '',
        remark: "",
        orgFlag: "",
        orgNo: "",
    };
    defaultProps = {
        children: "children",
        label: "label",
    };

    created() {
        this.queryOrgList();
    }

    //新增
    handleAdd(data) {
        this.dialogData = {
            organizationOneInfoCode: data.id,
            organizationOneInfoName: data.label,
            orgName: "",
            remark: "",
            orgFlag: data.orgFlag,
            orgNo: "",
        };

        this.showDialog();
    }

    //删除
    handleRemove(node, data) {
        this.queryDeleteOrg({
            organizationId: data.id,
        }).then((msg) => {
            this.$message({ type: "success", message: msg });
            this.queryOrgList();
        });
    }

    //重置编辑的表单
    resetForm() {
        this.$refs["forms"]["resetFields"]();
    }

    // 提交编辑的表单
    submitForm() {
        this.$refs["forms"]["validate"]((valid) => {
            if (valid) {
                this.queryAddOrg(this.selectData)
                    .then((msg) => {
                        this.$message({ type: "success", message: msg });
                        this.resetForm();
                        this.queryOrgList();
                    })
                    .finally(() => (this.btnloading = false));
            }
        });
    }

    //弹框显示
    showDialog() {
        this.$refs["dialog"]["open"]();
    }

    //点击单个节点
    nodeClick(data, node, obj) {
        this.selectData = {
            orgName: node.data.label,
            orgCode: node.data.id,
            remark: node.data.remark,
            orgFlag: node.data.orgFlag,
            orgNo: node.data.orgNo,
        };
    }
}
</script>

<style scoped lang="scss">
.organization-content {
    height: auto;
    border-radius: 0px 0px 4px 4px;

    .box-card {
        margin-bottom: 18px;

        .card-content {
            min-height: 440px;

            .custom-tree-node {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 14px;
            }

            .card-form {
                width: 400px;
                margin: 0 auto;

                .edit-btns {
                    text-align: center;
                    margin-top: 10px;
                }
            }
        }
    }

    .organization-content-tree {
        padding-right: 5px;
    }

    .organization-content-table {
        width: 400px;
        margin: 0 auto;
        padding-top: 10px;
        padding-left: 5px;
    }
}

.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
}

.edit-btns {
    text-align: center;
    margin-top: 20px;
}
</style>
