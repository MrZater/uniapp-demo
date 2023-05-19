<template>
    <div>
        <content-wrapper>
            <template slot="title">
                <!-- 用户列表 -->
                {{$t("smallTitle.userList")}}
            </template>
            <template slot="grid">
                <div class="template-content-main" v-loading="loading">
                    <div style="display: flex;">
                        <div style="width: 400px; border-right:1px solid #d9d9d9">
                            <div class="button-group">
                                <renderBtn code="user_manage_add">
                                    <el-button class="br-btn" type="primary" @click="handleAdd">
                                        添加
                                    </el-button>
                                </renderBtn>
                            </div>
                            <el-tree class="br-tree br-tree-line" :indent="0" :data="list" :props="treeProps" @node-click="onSelectItem" :expand-on-click-node="false" :default-expand-all="true"
                                :highlight-current="true">
                                <span class="custom-tree-node" slot-scope="{ node, data }">
                                    <span v-if="data.userId">
                                        <i class="el-icon-user" style="margin-right:5px"></i>{{ node.label }}
                                    </span>
                                    <span v-else>
                                        <i class="el-icon-folder-opened" style="margin-right:5px"></i>{{ node.label }}
                                    </span>
                                </span>
                            </el-tree>
                        </div>
                        <div style="flex: 1;">
                            <div class="form-container" v-loading="detailLoading">
                                <div class="detail_content">
                                    <div class="detail_content_item">
                                        <span class="detail_content_item_label">用户名</span>
                                        <span class="detail_content_item_content">{{oForm.userId}}</span>
                                    </div>
                                    <div class="detail_content_item">
                                        <span class="detail_content_item_label">岗位</span>
                                        <span class="detail_content_item_content">{{oForm.postName[0]}}</span>
                                    </div>
                                    <div class="detail_content_item">
                                        <span class="detail_content_item_label">角色</span>
                                        <span class="detail_content_item_content">{{oForm.roleName.join("，")}}</span>
                                    </div>
                                    <div class="detail_content_item">
                                        <span class="detail_content_item_label">手机</span>
                                        <span class="detail_content_item_content">{{oForm.phoneNo}}</span>
                                    </div>
                                    <div class="detail_content_item">
                                        <span class="detail_content_item_label">企业微信</span>
                                        <span class="detail_content_item_content">{{oForm.cmpWxuserId}}</span>
                                    </div>
                                    <div class="detail_content_item">
                                        <span class="detail_content_item_label">企业邮箱</span>
                                        <span class="detail_content_item_content">{{oForm.cmpEmail}}</span>
                                    </div>
                                    <div class="detail_content_item">
                                        <span class="detail_content_item_label">创建时间</span>
                                        <span class="detail_content_item_content">{{oForm.createTime | time}}</span>
                                    </div>
                                    <div class="detail_content_item">
                                        <span class="detail_content_item_label">状态</span>
                                        <span class="detail_content_item_content">
                                            {{ oForm.isDel | statusMap }}
                                        </span>
                                    </div>
                                </div>
                                <div class="sub-gap"></div>
                                <div style="margin-left:50px">
                                    <el-table stripe :data="oForm.partPost" class="br-table">
                                        <el-table-column label="组织名称" prop="orgPname"></el-table-column>
                                        <el-table-column label="部门" prop="orgName"></el-table-column>
                                        <el-table-column label="岗位" prop="postName"></el-table-column>
                                    </el-table>
                                </div>
                                <div class="sub-gap"></div>
                                <div align="center" v-if="isShowBtn">
                                    <renderBtn code="user_manage_upd">
                                        <el-button type="primary" size="mini" @click="handleEdit(oForm)">编辑</el-button>
                                    </renderBtn>

                                    <renderBtn code="user_manage_use" v-if="oForm.isDel == 0">
                                        <el-button type="primary" size="mini" @click="handleStartOrStop(oForm)">
                                            启用
                                        </el-button>
                                    </renderBtn>

                                    <renderBtn code="user_manage_stop" v-if="oForm.isDel == 1">
                                        <el-button type="primary" size="mini" @click="handleStartOrStop(oForm)">
                                            停用
                                        </el-button>
                                    </renderBtn>

                                    <renderBtn code="user_manage_resetps">
                                        <el-popconfirm title="确认重置该用户密码吗？" @onConfirm="handleResetpwd(oForm)">
                                            <el-button type="primary" size="mini" slot="reference">重置密码</el-button>
                                        </el-popconfirm>
                                    </renderBtn>

                                    <renderBtn code="user_manage_del">
                                        <el-popconfirm title="确认删除该用户吗？" @onConfirm="handleRemove(oForm)">
                                            <el-button type="primary" size="mini" slot="reference">删除</el-button>
                                        </el-popconfirm>
                                    </renderBtn>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <child-dialog ref="dialog" :dialogData="dialogData" :dialogType="dialogType" @queryDetailData="queryDetailData(oForm.userId)" />
            </template>
        </content-wrapper>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
const userManage = namespace("userManage");
import ContentWrapper from "@/components/ContentWrapper.vue";
import childDialog from "./dialog.vue";

@Component({
    components: {
        "content-wrapper": ContentWrapper,
        childDialog,
    },
    filters: {
        statusMap(status) {
            const statusMap = {
                0: "停用",
                1: "启用",
                2: "审核中",
            };
            return statusMap[status];
        },
    },
})
export default class Grid extends Vue {
    @userManage.State list;
    @userManage.Action queryList;
    @userManage.State searchData;
    @userManage.Action saveSearchDataFN;
    @userManage.Action queryStartOrStop;
    @userManage.Action queryResetPwd;
    @userManage.Action queryDeleteUser;
    @userManage.Action queryDetail;
    @userManage.State loading;
    detailLoading: boolean = false;

    treeProps: any = {
        label: "name",
        children: "children",
    };
    oForm: any = {
        postName: [],
        roleName: [],
    };

    dialogType = "";

    dialogData: any = {};

    isShowBtn: boolean = false;

    onSelectItem(data) {
        if (data.userId) this.queryDetailData(data.userId);
    }

    queryDetailData(userId) {
        this.detailLoading = true;
        this.queryDetail({ userId: userId })
            .then((data) => {
                this.oForm = {
                    userId: data.userId,
                    postName: data.postName,
                    roleName: data.roleName,
                    phoneNo: data.phoneNo,
                    cmpWxuserId: data.cmpWxuserId,
                    cmpEmail: data.cmpEmail,
                    createTime: data.createTime,
                    isDel: data.isDel,
                    partPost: data.partPost,
                    userCode: data.userCode,
                    realName: data.realName,
                    roleCode: data.roleCode,
                    postCode: data.postCode[0],
                    orgName: data.orgName,
                    orgCode: data.orgCode,
                };
                this.isShowBtn = true;
            })
            .finally(() => (this.detailLoading = false));
    }

    openDialog(str, objdata) {
        this.dialogType = str;
        this.dialogData = objdata;
        let $els = this.$refs["dialog"];
        $els["open"]();
    }
    //新增
    handleAdd() {
        let rowObj = {
            userId: "", // 登录名
            realName: "", // 真实姓名
            roleCode: [], // 角色code
            phoneNo: "", // 手机号
            cmpEmail: "", // 企业邮箱
            cmpWxuserId: "", //企业微信
            orgName: "", // 所属部门
            orgCode: "",
            postCode: "", // 岗位Code
            partPost: [], // 兼职信息 列表
        };
        this.openDialog("add", rowObj);
    }
    //编辑
    handleEdit(row) {
        let rowObj = {
            userCode: row.userCode,
            userId: row.userId, // 登录名
            realName: row.realName, // 真实姓名
            roleCode: row.roleCode, // 角色code
            phoneNo: row.phoneNo, // 手机号
            cmpEmail: row.cmpEmail, // 企业邮箱
            cmpWxuserId: row.cmpWxuserId, //企业微信
            orgName: row.orgName, // 所属部门
            orgCode: row.orgCode,
            postCode: row.postCode, // 岗位Code
            partPost: row.partPost, // 兼职信息 列表
        };
        this.openDialog("edit", rowObj);
    }
    // 启停用
    handleStartOrStop(row) {
        let params = {
            userId: row.userId,
            isDel: row.isDel == "0" ? "1" : "0",
        };
        this.queryStartOrStop(params).then((msg) => {
            this.$message({ type: "success", message: msg });
            this.queryList(this.searchData);
            this.queryDetailData(this.oForm.userId);
        });
    }
    //重置密码
    handleResetpwd(oForm) {
        this.queryResetPwd({
            userCode: oForm.userCode,
        }).then((msg) => {
            this.$confirm(`新密码为：${msg}`, "提示", {
                confirmButtonText: "我知道了",
                cancelButtonText: "复制",
                type: "warning",
            })
                .then(() => {})
                .catch(() => {
                    this.$copyText(msg).then((e) => {
                        this.$message({
                            type: "success",
                            message: "新密码复制成功",
                        });
                    });
                })
                .finally(() => {
                    this.queryList(this.searchData);
                });
        });
    }
    //删除
    handleRemove(oForm) {
        this.queryDeleteUser({
            userCode: oForm.userCode,
        }).then((msg) => {
            this.$message({
                type: "success",
                message: msg,
            });
            this.queryList(this.searchData);
        });
    }
}
</script>

<style scoped lang="scss">
.br-tree-line {
    margin-top: 20px;
}
.form-container {
    min-height: 400px;
    // text-align: center;
    // border-left: 1px solid #d9d9d9;
    .form {
        width: 500px;
        // margin: 100px auto 0px;
        margin: 50px 0 0 50px;
        .form-btn {
            text-align: center;
        }
    }
}
.detail_content_item {
    flex-basis: 50%;
}
</style>