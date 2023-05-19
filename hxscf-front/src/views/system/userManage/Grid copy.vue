<template>
    <div>
        <content-wrapper>
            <template slot="title">
                <!-- 用户列表 -->
                {{$t("smallTitle.userList")}}
            </template>
            <template slot="extra-btn">
                <renderBtn code="user_manage_add">
                    <el-button class="br-btn" type="primary" @click="handleAdd">新增</el-button>
                </renderBtn>
            </template>
            <template slot="grid">
                <el-table stripe :data="list.list" class="br-table" v-loading="loading">
                    <el-table-column label="登录名" prop="userId" show-overflow-tooltip></el-table-column>
                    <el-table-column label="真实姓名" prop="realName" show-overflow-tooltip></el-table-column>
                    <el-table-column label="机构" prop="orgName" min-width="90" show-overflow-tooltip></el-table-column>
                    <el-table-column label="角色" prop="roleName" min-width="100" show-overflow-tooltip></el-table-column>
                    <el-table-column label="企业微信" prop="cmpWxuserId" min-width="100" show-overflow-tooltip></el-table-column>
                    <el-table-column label="岗位" prop="postName" min-width="100" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="真实姓名" prop="realName" show-overflow-tooltip></el-table-column>
                    <el-table-column label="手机号" prop="phoneNo" width="120" show-overflow-tooltip align="center"></el-table-column>
                    <!-- <el-table-column label="性别" prop="sex" width="60" show-overflow-tooltip align="center">
            <template slot-scope="scope">
              <span>{{scope.row.sex==1?"男":"女"}}</span>
            </template>
          </el-table-column> -->
                    <el-table-column label="状态" prop="isDel" width="60" align="center">
                        <template slot-scope="scope">
                            <el-tag size="mini" :type="scope.row.isDel | statusClassMap">{{ scope.row.isDel | statusMap }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="企业邮箱" prop="cmpEmail" min-width="120" show-overflow-tooltip></el-table-column>
                    <el-table-column label="创建时间" prop="createTime" min-width="120" show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{scope.row.createTime | time}}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="180">
                        <template slot-scope="scope">
                            <renderBtn code="user_manage_upd">
                                <el-button type="text" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                            </renderBtn>

                            <renderBtn code="user_manage_use" v-if="scope.row.isDel == 0">
                                <el-button type="text" size="mini" @click="handleStartOrStop(scope.row)">
                                    启用
                                </el-button>
                            </renderBtn>

                            <renderBtn code="user_manage_stop" v-if="scope.row.isDel == 1">
                                <el-button type="text" size="mini" @click="handleStartOrStop(scope.row)">
                                    停用
                                </el-button>
                            </renderBtn>

                            <renderBtn code="user_manage_resetps">
                                <el-popconfirm title="确认重置该用户密码吗？" @onConfirm="handleResetpwd(scope)">
                                    <el-button type="text" size="mini" slot="reference">重置密码</el-button>
                                </el-popconfirm>
                            </renderBtn>

                            <renderBtn code="user_manage_del">
                                <el-popconfirm title="确认删除该用户吗？" @onConfirm="handleRemove(scope)">
                                    <el-button type="text" size="mini" slot="reference">删除</el-button>
                                </el-popconfirm>
                            </renderBtn>

                        </template>
                    </el-table-column>
                </el-table>

                <Pages :pageNum="list.pageNum" :pageSize="list.pageSize" :total="list.total" @changePage="changePageFn" />

                <child-dialog ref="dialog" :dialogData="dialogData" :dialogType="dialogType" />
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
import { Pages } from "@/components";

@Component({
    components: {
        "content-wrapper": ContentWrapper,
        childDialog,
        Pages,
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
        statusClassMap(status) {
            const classMap = {
                0: "danger",
                1: "success",
                // 2: 'warning'
            };
            return classMap[status];
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
    @userManage.State loading;

    dialogType = "";
    dialogData: any = {
        roleName: "",
        remark: "",
        roleType: 2,
    };

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
            orgName: "", // 机构名称
            phoneNo: "", // 手机号
            roleCode: [], // 角色code
            postCode: [], // 岗位Code
            cmpEmail: "", // 企业邮箱
            cmpWxuserId: "", //企业微信
            //   userData: [] // table 列表
        };
        this.openDialog("add", rowObj);
    }
    //编辑
    handleEdit(row) {
        let rowObj = {
            userId: row.userId, // 登录名
            userCode: row.userCode, // 用户id
            realName: row.realName, // 真实姓名
            orgCode: row.orgCode, // 机构名称CODE
            orgName: row.orgName, // 机构名称
            roleCode: row.roleCode, // 角色code
            cmpWxuserId: row.cmpWxuserId, //企业微信
            postCode: row.postCode, // 岗位Code
            cmpEmail: row.cmpEmail, // 企业邮箱
            phoneNo: row.phoneNo, // 手机号
            //   userData: []
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
        });
    }
    //重置密码
    handleResetpwd(scope) {
        this.queryResetPwd({
            userCode: scope.row.userCode,
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
    handleRemove(scope) {
        this.queryDeleteUser({
            userCode: scope.row.userCode,
        }).then((msg) => {
            this.$message({
                type: "success",
                message: msg,
            });
            this.queryList(this.searchData);
        });
    }

    changePageFn(val) {
        let parame = {
            ...this.searchData,
            pageNum: val.pageNum,
            pageSize: val.pageSize,
        };
        this.queryList(parame);
        this.saveSearchDataFN(parame);
    }
}
</script>

<style scoped lang="scss">
</style>