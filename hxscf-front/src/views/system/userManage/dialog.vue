<template>
    <B-dialog :title="dialogType =='add' ? '新增' : '编辑'" :visible="dialogVisible" width="1000px" @close="handleCancel">
        <el-form :model="dialogForm" :rules="rules" ref="forms" label-width="90px" size="small">
            <el-row>
                <el-col :span="12">
                    <el-form-item class="br-form-item-label" label="用户名" prop="userId">
                        <el-input class="br-input-large" placeholder="请输入用户名" v-model.trim="dialogForm.userId" :disabled="dialogType!='add'"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="br-form-item-label" label="真实姓名" prop="realName">
                        <el-input class="br-input-large" placeholder="请输入真实姓名" v-model.trim="dialogForm.realName" :disabled="dialogType != 'add'"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="12">
                    <el-form-item class="br-form-item-label" label="角色" prop="roleCode">
                        <el-select class="br-select-large" v-model="dialogForm.roleCode" multiple collapse-tags>
                            <el-option v-for="item in roleAllData" :key="item.roleCode" :label="item.roleName" :value="item.roleCode">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="12">
                    <el-form-item class="br-form-item-label" label="手机号" prop="phoneNo">
                        <el-input class="br-input-large" placeholder="请输入手机号" v-model.trim="dialogForm.phoneNo"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="br-form-item-label" label="企业邮箱" prop="cmpEmail">
                        <el-input class="br-input-large" placeholder="请输入企业邮箱" v-model.trim="dialogForm.cmpEmail"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="br-form-item-label" label="企业微信" prop="cmpWxuserId">
                        <el-input class="br-input-large" placeholder="请输入企业微信" v-model.trim="dialogForm.cmpWxuserId"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="br-form-item-label" label="所属部门" prop="orgName">
                        <el-select class="br-select-large tree-select" v-model="dialogForm.orgName" :popper-append-to-body="false" ref="orgNameTree">
                            <el-option value="null">
                                <el-tree :data="orgList" @node-click="onOrgNameChange" node-key="id" :props="defaultProps"></el-tree>
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="br-form-item-label" label="岗位名称" prop="postCode">
                        <el-select placeholder="请选择岗位名称" v-model="dialogForm.postCode" class="br-select-large">
                            <el-option v-for="(item) in userPostData" :key="item.postCode" :label="item.postName" :value="item.postCode"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <content-wrapper>
                <template slot="title">
                    兼职信息
                </template>
                <template slot="extra-btn">
                    <el-button type="primary" size="small" @click="onPartAdd">新增</el-button>
                </template>
                <template slot="grid">
                    <el-table :data="dialogForm.partPost" stripe style="width: 100%" border class="br-table">
                        <el-table-column label="组织名称">
                            <template slot-scope="scope">
                                <el-form-item :prop="'partPost.' + scope.$index + '.orgPname' " label-width="0px" class="br-form-item-label" :rules="tableRules.orgPname">
                                    <el-select v-model="scope.row.orgPname" placeholder="请选择组织名称" class="br-select tree-select" :popper-append-to-body="false" ref="treeSelect">
                                        <el-option value="null">
                                            <el-tree :data="orgNameList" @node-click="(data) => onLeavesClick(data,scope.row)" node-key="id" :props="defaultProps"></el-tree>
                                        </el-option>
                                    </el-select>
                                </el-form-item>

                            </template>
                        </el-table-column>
                        <el-table-column label="部门名称">
                            <template slot-scope="scope">
                                <el-form-item :prop="'partPost.' + scope.$index + '.orgCode' " label-width="0px" class="br-form-item-label" :rules="tableRules.orgCode">
                                    <el-select placeholder="请选择部门名称" v-model="scope.row.orgCode" class="br-select">
                                        <el-option v-for="(item) in scope.row.departmentNameList" :key="item.orgCode" :label="item.orgName" :value="item.orgCode"></el-option>
                                    </el-select>
                                </el-form-item>

                            </template>
                        </el-table-column>
                        <el-table-column label="岗位名称">
                            <template slot-scope="scope">
                                <el-form-item :prop="'partPost.' + scope.$index + '.postCode' " label-width="0px" class="br-form-item-label" :rules="tableRules.postCode">
                                    <el-select placeholder="请选择岗位名称" v-model="scope.row.postCode" class="br-select">
                                        <el-option v-for="(item) in userPostData" :key="item.postCode" :label="item.postName" :value="item.postCode"></el-option>
                                    </el-select>
                                </el-form-item>

                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="120">
                            <template slot-scope="scope">
                                <el-popconfirm title="确认删除该数据吗？" @onConfirm="onPartDel(scope.$index,dialogForm.partPost)">
                                    <el-button type="text" size="mini" slot="reference">删除</el-button>
                                </el-popconfirm>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>

            </content-wrapper>
        </el-form>
        <template slot="footer">
            <el-button type="primary" class="br-btn-large" @click="handleSubmit" :loading="btnloading">保存</el-button>
            <el-button class="br-btn-large" @click="handleCancel">取消</el-button>
        </template>
    </B-dialog>
</template>
<script lang="ts">
import { namespace } from "vuex-class";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
const roleManage = namespace("roleManage");
const userManage = namespace("userManage");
const postManage = namespace("postManage");
import { BDialog, ContentWrapper } from "@/components";
import { renderOrganization } from "@/config/mUtils";
import cloneDeep from "lodash.clonedeep";
@Component({
    components: {
        BDialog,
        ContentWrapper,
    },
})
export default class Dialog extends Vue {
    @userManage.Action queryList;
    @userManage.State searchData;
    @userManage.Action queryAddUser;
    @userManage.Action queryUpdateUser;

    // 获取岗位
    @userManage.Action queryPostList;
    @userManage.State userPostData;

    // 部门名称
    @postManage.Action queryDepartmentName;

    // 角色列表
    @roleManage.Action queryRoleDataFN; // 获取角色数据
    @roleManage.State roleAllData; // 角色数据

    // 组织名称 && 所属部门
    @userManage.Action queryOrgNameList;
    public orgNameList: any = [];
    public orgList: any = [];

    dialogForm: any = {
        partPost: [],
    };

    defaultProps = {
        children: "children",
        label: "label",
    };

    btnloading: boolean = false;

    dialogVisible: boolean = false;

    rules: object = {
        userId: [{ required: true, trigger: "blur", message: "请输入用户名" }],
        realName: [
            { required: true, trigger: "blur", message: "请输入真实姓名" },
        ],
        orgName: [
            { required: true, trigger: "change", message: "请选择所属部门" },
        ],
        roleCode: [
            { required: true, trigger: "change", message: "请选择角色" },
        ],
        postCode: [
            { required: true, trigger: "change", message: "请选择岗位" },
        ],
        phoneNo: [
            { trigger: "blur", message: "请输入手机号", required: true },
            {
                pattern: /^1\d{10}$/,
                trigger: "blur",
                message: "请输入正确格式的号码",
            },
        ],
        cmpEmail: [
            { trigger: "blur", message: "请输入邮箱", required: true },
            {
                pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                trigger: "blur",
                message: "请输入正确格式的邮箱",
            },
        ],
        cmpWxuserId: [
            { trigger: "blur", message: "请输入企业微信", required: true },
        ],
    };
    tableRules: any = {
        orgPname: [
            { required: true, trigger: "change", message: "请选择组织名称" },
        ],
        orgCode: [
            { required: true, trigger: "change", message: "请选择部门名称" },
        ],
        postCode: [
            { required: true, trigger: "change", message: "请选择岗位名称" },
        ],
    };

    @Prop() dialogType;
    @Prop() dialogData;
    mounted() {
        this.queryOrgNameList({ flag: "5" }).then((res) => {
            this.orgNameList = renderOrganization(res);
        }); // 获取组织名称数据一级机构
        this.queryOrgNameList({ flag: "2" }).then((res) => {
            this.orgList = renderOrganization(res);
        });
    }
    @Watch("dialogVisible")
    onChanged(val, oldVal) {
        if (val) {
            this.dialogForm = Object.assign({}, this.dialogData);
            this.queryPostList();
            this.queryRoleDataFN({});
        }
    }

    // 监听table数据
    @Watch("dialogForm.partPost")
    onchange(val) {
        if (val.length) {
            val.map((item, index) => {
                if (item.orgPcode) {
                    // 部门名称请求
                    this.queryDepartmentName({ orgCode: item.orgPcode }).then(
                        (res) => {
                            this.$set(item, "departmentNameList", res);
                        }
                    );
                }
            });
        }
    }
    // 所属部门改变时
    onOrgNameChange(data, node, el) {
        this.dialogForm.orgName = data.label;
        this.dialogForm.orgCode = data.id;
        this.$refs.orgNameTree["handleClose"]();
    }

    //点击机构的节点
    onLeavesClick(data, row) {
        this.$set(row, "orgPcode", data.id);
        this.$set(row, "orgPname", data.label);
        this.$refs.treeSelect["handleClose"]();
        this.$set(row, "orgCode", "");
        this.$set(row, "departmentNameList", []);
        //组织名称选择 获取部门数据
        this.queryDepartmentName({ orgCode: row.orgPcode }).then((res) => {
            this.$set(row, "departmentNameList", res);
        });
    }

    open() {
        this.dialogVisible = true;
        this.$nextTick(() => {
            let $ele: any = this.$refs["forms"];
            $ele.clearValidate();
        });
    }

    handleSubmit() {
        let $ele: any = this.$refs["forms"];

        $ele.validate((valid) => {
            if (valid) {
                const formAPI =
                    this.dialogType == "add"
                        ? this.queryAddUser
                        : this.queryUpdateUser;

                let params = cloneDeep(this.dialogForm);
                params.postCode = [this.dialogForm.postCode];
                this.btnloading = true;
                formAPI(params)
                    .then((res) => {
                        if (this.dialogType == "add") {
                            /* 新增 --- 给予用户二次确认提示 */
                            this.$confirm(
                                `新增用户成功，密码为：${res}`,
                                "提示",
                                {
                                    confirmButtonText: "我知道了",
                                    cancelButtonText: "复制",
                                    type: "warning",
                                }
                            )
                                .then(() => {})
                                .catch(() => {
                                    this.$copyText(res).then((e) => {
                                        this.$message({
                                            type: "success",
                                            message: "密码复制成功",
                                        });
                                    });
                                })
                                .finally(() => {
                                    this.queryList(this.searchData);
                                });
                        } else {
                            /* 修改 --- 直接提示 */
                            this.$message({
                                type: "success",
                                message: res,
                            });
                            this.$emit("queryDetailData");
                        }
                        this.handleCancel();
                        this.queryList(this.searchData);
                    })
                    .finally(() => (this.btnloading = false));
            } else {
                return false;
            }
        });
    }
    handleCancel() {
        let $ele: any = this.$refs["forms"];
        $ele.resetFields();
        this.$set(this.dialogData, "partPost", []);
        this.dialogVisible = false;
    }
    // 兼职新增
    onPartAdd() {
        this.dialogForm.partPost.push({});
    }

    // 兼职删除
    onPartDel(index, rows) {
        rows.splice(index, 1);
    }
}
</script>

<style lang="scss" scoped>
</style>