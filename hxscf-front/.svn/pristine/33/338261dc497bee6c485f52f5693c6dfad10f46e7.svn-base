<template>
    <div>
        <div v-if="btnAuthList.length !== 0">
            <div class="sub-gap"></div>
            <div class="sub-title">审批意见</div>
            <el-form :inline="false" :model="approveForm" :rules="rules" label-width="85px" ref="approveForm" size="small" label-position="top">
                <el-form-item class="br-form-item-label" label="" prop="approvalComments">
                    <el-input class="br-textarea__full" placeholder="请输入审核意见" type="textarea" :autosize="{ minRows: 4, maxRows: 8}" v-model.trim="approveForm.approvalComments" maxlength="200"
                        show-word-limit>
                    </el-input>
                </el-form-item>
            </el-form>
            <div class="template-bottom-button">
                <el-button class="br-btn" type="primary" v-if="btnAuthList.includes('approve_consign')" @click="onConfirm('approve_consign')">委托</el-button>
                <el-button class="br-btn" type="success" v-if="btnAuthList.includes('approve_endorsement')" @click="onConfirm('approve_endorsement')">加签</el-button>
                <el-button class="br-btn" type="info" v-if="btnAuthList.includes('approve_pass')" @click="onConfirm('approve_pass')">通过</el-button>
                <el-button class="br-btn" type="warning" v-if="btnAuthList.includes('approve_back')" @click="onConfirm('approve_back')">退回</el-button>
                <el-button class="br-btn" type="danger" v-if="btnAuthList.includes('approve_refuse')" @click="onConfirm('approve_refuse')">拒绝</el-button>
            </div>
        </div>

        <B-dialog title="操作" :visible="dialogVisible" :width="result == 'approve_endorsement' ? '880px' :result == 'approve_back' ?'880px' : '480px' " @close="dialogVisible = false" append-to-body>
            <!-- 委托 -->
            <template v-if="result == 'approve_consign'">
                <el-form :inline="true" :model="entrustForm" label-width="100px" ref="entrustForm" :rules="rules" size="small">
                    <el-form-item label="用户" prop="toUserCode" class="br-form-item-label">
                        <el-select v-model.trim="entrustForm.toUserCode" @change="onUserChange" placeholder="请选择委托用户" class="br-select-large">
                            <el-option v-for="(item,index) of canDelegateList" :key="index" :label="item.realName" :value="item.userCode"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="岗位" prop="code2" class="br-form-item-label">
                        <el-input class="br-input-large" placeholder="请输入岗位" v-model.trim="entrustForm.code2" disabled></el-input>
                    </el-form-item>

                </el-form>
            </template>

            <!-- 加签 -->
            <template v-if="result == 'approve_endorsement'">
                <div class="extra-btn">
                    <el-button class="br-btn" type="primary" @click="onTableAdd">新增</el-button>
                </div>
                <el-form :inline="true" :model="addsignForm" label-width="100px" ref="addsignForm" :rules="rules" size="small">
                    <el-table stripe :data="addsignForm.list" class="br-table" border style="width: 100%">
                        <el-table-column label="用户名" prop="toUserList">
                            <template slot-scope="scope">
                                <el-form-item :prop="'list.' + scope.$index + '.toUserList' " class="br-form-item-label" :rules="rules.toUserList">
                                    <el-select v-model.trim="scope.row.toUserList" @change="(val)=>onToUserChange(val,scope.row)" placeholder="请选择用户名" class="br-select">
                                        <el-option v-for="(item,index) of canEndorserList" :key="index" :label="item.realName" :value="item.userCode"></el-option>
                                    </el-select>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column label="机构名称" prop="orgName" show-overflow-tooltip>
                            <template slot-scope="{row}">
                                {{row.orgName}}
                            </template>
                        </el-table-column>
                        <el-table-column label="岗位" prop="postName" show-overflow-tooltip>
                            <template slot-scope="{row}">
                                {{row.postName}}
                            </template>
                        </el-table-column>

                        <el-table-column label="操作" width="120">
                            <template slot-scope="scope">
                                <el-popconfirm title="确认删除该数据吗？" @onConfirm="onTableDel(scope.$index,addsignForm.list)">
                                    <el-button type="text" size="mini" slot="reference">删除</el-button>
                                </el-popconfirm>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form>

            </template>

            <!-- 通过 -->
            <template v-if="result == 'approve_pass'">
                确认要通过该记录吗？
            </template>

            <!-- 退回 -->
            <template v-if="result == 'approve_back'">
                <el-table stripe :data="canRolledBackList" class="br-table" border style="width: 100%" @current-change="clickChange">
                    <el-table-column label="操作时间" prop="approveTime">
                        <template slot-scope="{row}">
                            {{row.approveTime | time}}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作人" prop="currentOperOne" show-overflow-tooltip></el-table-column>
                    <el-table-column label="审核结果" prop="approveResult" show-overflow-tooltip></el-table-column>
                    <el-table-column label="审核意见" prop="approveAdvise" show-overflow-tooltip></el-table-column>
                    <el-table-column label="是否选择" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-radio :label="scope.row.taskId" v-model="tableRadio" class="br-radio">退回</el-radio>
                        </template>
                    </el-table-column>
                </el-table>

            </template>

            <!-- 拒绝 -->
            <template v-if="result == 'approve_refuse'">
                确认要拒绝该记录吗？
            </template>
            <template slot="footer">
                <el-button type="primary" class="br-btn-large" @click="onSubmit" :loading="btnLoading">确 认</el-button>
                <el-button class="br-btn-large" @click="dialogVisible = false">取 消</el-button>
            </template>
        </B-dialog>
    </div>
</template>
<script lang="ts">
import { namespace } from "vuex-class";
import { Vue, Component } from "vue-property-decorator";

const limitMultiplier = namespace("limitMultiplier");
import { BDialog } from "@/components";

@Component({
    components: {
        BDialog,
    },
})
export default class approveForm extends Vue {
    @limitMultiplier.Action queryCanDelegateList; //查询可委托人列表
    @limitMultiplier.State canDelegateList; //可委托人列表
    @limitMultiplier.Action queryCanEndorserList; //查询可加签人列表
    @limitMultiplier.State canEndorserList; //可加签人列表
    @limitMultiplier.Action queryCanRolledBackList; //查询可退回人列表
    @limitMultiplier.State canRolledBackList; //可退回人列表
    @limitMultiplier.Action queryDisplayControl; //校验是否有点击流程按钮的权限
    public btnLoading: boolean = false; //父组件使用
    public approveForm: any = {
        approvalComments: "",
    };
    public dialogVisible: boolean = false;
    public result: string = "";
    public tableRadio: any = ""; // 退回节点
    public entrustForm: any = {}; // 委托表单
    public addsignForm: any = {
        list: [],
    }; // 加签表单
    public surveyId: any = "";
    rules: any = {
        approvalComments: [
            { required: true, message: "请填写审批意见", trigger: "blur" },
        ],
        toUserCode: [
            { required: true, message: "请选择委托用户", trigger: "change" },
        ],
        toUserList: [
            { required: true, message: "请选择用户名", trigger: "change" },
        ],
    };
    public btnAuthList: any = [];

    mounted() {
        // 只有状态为 审核中 时，才会请求接口，动态判断显示的按钮
        // 如果不是审核中，不展示按钮
        let { apprState, surveyId } = this.$route.query;
        this.surveyId = surveyId;
        if (apprState === "02") {
            this.queryCanDelegateList();
            this.queryDisplayControl({ business: surveyId }).then((res) => {
                this.btnAuthList = res;
                if (this.btnAuthList.includes("approve_endorsement")) {
                    // 加签
                    this.queryCanEndorserList({ business: surveyId });
                }

                if (this.btnAuthList.includes("approve_back")) {
                    // 回退
                    this.queryCanRolledBackList({ business: surveyId });
                }
            });
        } else {
            this.btnAuthList = [];
        }
    }
    // 根据代理人，联想岗位
    onUserChange(val) {
        let target = this.canDelegateList.find((item) => item.userCode === val);
        this.entrustForm.code2 = target.postName || "无";
    }
    // 根据加签人，联想机构名称、岗位
    onToUserChange(val, row) {
        let target = this.canEndorserList.find((item) => item.userCode === val);
        row.orgName = target.orgName || "无";
        row.postName = target.postName || "无";
    }
    // 加签节点添加
    onTableAdd() {
        this.addsignForm.list.push({});
    }
    // 加签节点删除
    onTableDel(index, rows) {
        rows.splice(index, 1);
    }
    // 回退节点
    clickChange(item): void {
        this.tableRadio = item.taskId;
    }

    onConfirm(result) {
        let $ele: any = this.$refs["approveForm"];
        $ele.validate((valid) => {
            if (valid) {
                this.result = result;
                this.dialogVisible = true;
            } else {
                return false;
            }
        });
    }
    onSubmit() {
        let commonParams = {
            surveyId: this.surveyId,
            approvalComments: this.approveForm.approvalComments,
        };
        let params = {};
        // 委托
        let entrustAPI = () => {
            let $el: any = this.$refs["entrustForm"];
            $el.validate((valid) => {
                if (valid) {
                    params = {
                        ...commonParams,
                        toUserCode: this.entrustForm.toUserCode,
                    };
                    this.$emit("onSubmit", params, this.result);
                } else {
                    return false;
                }
            });
        };
        // 加签
        let addsignAPI = () => {
            let $el: any = this.$refs["addsignForm"];
            $el.validate((valid) => {
                if (valid) {
                    let toUserList: any[] = [];
                    this.addsignForm.list.forEach((item) =>
                        toUserList.push(item.toUserList)
                    );
                    params = {
                        ...commonParams,
                        toUserList: toUserList,
                    };
                    this.$emit("onSubmit", params, this.result);
                } else {
                    return false;
                }
            });
        };
        // 通过
        let passAPI = () => {
            params = { ...commonParams };
            this.$emit("onSubmit", params, this.result);
        };
        // 退回
        let backAPI = () => {
            if (!this.tableRadio) {
                this.$message({ type: "error", message: "请选择退回节点" });
                return;
            }
            params = {
                ...commonParams,
                toTaskId: this.tableRadio,
            };
            this.$emit("onSubmit", params, this.result);
        };
        // 拒绝
        let rejectAPI = () => {
            params = {
                surveyId: this.surveyId,
                approvalComments: this.approveForm.approvalComments,
            };
            this.$emit("onSubmit", params, this.result);
        };

        let maps = {
            approve_consign: entrustAPI,
            approve_endorsement: addsignAPI,
            approve_pass: passAPI,
            approve_back: backAPI,
            approve_refuse: rejectAPI,
        };
        maps[this.result]();
    }
    onSuccess(msg) {
        this.$message({ type: "success", message: msg });
        this.handleCancel();
    }
    handleCancel() {
        for (let key in this.$refs) {
            let $el: any = this.$refs[key];
            $el && $el.resetFields();
        }
        this.tableRadio = "";
        this.dialogVisible = false;
    }
}
</script>

<style lang="scss" scoped>
.extra-btn {
    margin-bottom: 10px;
    float: right;
}
</style>
