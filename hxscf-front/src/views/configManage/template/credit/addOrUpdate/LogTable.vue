<template>
    <div>
        <div class="template-content">
            <div class="sub-title">操作记录</div>
            <el-table stripe :data="list" class="br-table" border style="width: 100%">
                <el-table-column label="操作时间" prop="approvetime">
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
        <div class="sub-gap"></div>
        <div class="template-content">
            <div class="sub-title">审批意见</div>
            <el-form :inline="false" :model="approveForm" :rules="rules" label-width="85px" ref="approveForm" size="small" label-position="top">
                <el-form-item class="br-form-item-label" label="" prop="approvalComments">
                    <el-input class="br-textarea__full" placeholder="请输入审核意见" type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model.trim="approveForm.approvalComments" maxlength="200"
                        show-word-limit>
                    </el-input>
                </el-form-item>
            </el-form>
            <div class="template-bottom-button">
                <el-button class="br-btn" type="primary" @click="onConfirm('approve_consign')">委托</el-button>
                <el-button class="br-btn" type="success" @click="onConfirm('approve_endorsement')">加签</el-button>
                <el-button class="br-btn" type="info" @click="onConfirm('approve_pass')">通过</el-button>
                <el-button class="br-btn" type="warning" @click="onConfirm('approve_back')">退回</el-button>
                <el-button class="br-btn" type="danger" @click="onConfirm('approve_refuse')">拒绝</el-button>
            </div>
        </div>
        <el-dialog title="操作" :visible.sync="dialogVisible" :width="result == 'approve_endorsement' ? '45%' :result == 'approve_back' ?'45%' : '25%' " class="br-dialog">
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
            <div slot="footer" class="br-dialog-footer">
                <el-button type="primary" class="br-btn-large" @click="onSubmit" :loading="btnLoading">确 认</el-button>
                <el-button class="br-btn-large" @click="handleCancel">取 消</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import ContentWrapper from "@/components/ContentWrapper.vue";
import { namespace } from "vuex-class";
const credit = namespace("credit");

@Component({
    components: {
        ContentWrapper,
    },
})
export default class Grid extends Vue {
    @credit.Action queryCanDelegateList; //查询可委托人列表
    @credit.State canDelegateList; //可委托人列表
    @credit.Action queryConsign; //委托
    // @credit.Action queryCanEndorserList; //查询可加签人列表
    @credit.State canEndorserList; //可加签人列表
    @credit.Action queryEndorsement; //加签
    @credit.Action queryPass; //通过
    // @credit.Action queryCanRolledBackList; //查询可退回人列表
    @credit.State canRolledBackList; //可退回人列表
    @credit.Action queryRollback; //退回
    @credit.Action queryReject; //拒绝
    @credit.Action queryList;
    @credit.State searchData;
    @Prop({ default: () => [], type: Array }) list;
    @Prop({ default: "", type: String }) applyKeyNo;
    public btnLoading: boolean = false;
    public approveForm: any = {};
    public dialogVisible: boolean = false;
    public result: string = "";
    public tableRadio: any = "";
    public entrustForm: any = {}; // 委托表单
    public addsignForm: any = {
        list: [],
    }; // 加签表单
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
    mounted() {
        this.queryCanDelegateList();
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
    clickChange(item): void {
        this.tableRadio = item.taskId;
    }
    onConfirm(result) {
        let oDom: any = this.$refs["approveForm"];
        oDom.validate((valid) => {
            if (valid) {
                this.result = result;
                this.dialogVisible = true;
            } else {
                return false;
            }
        });
    }
    onTableAdd() {
        this.addsignForm.list.push({});
    }
    onTableDel(index, rows) {
        rows.splice(index, 1);
    }
    onSubmit() {
        // 公参
        let commonParams = {
            applyKeyNo: this.applyKeyNo,
            approvalComments: this.approveForm.approvalComments,
        };
        // 委托
        let entrustAPI = () => {
            let $el: any = this.$refs["entrustForm"];
            $el.validate((valid) => {
                if (valid) {
                    let params = {
                        ...commonParams,
                        toUserCode: this.entrustForm.toUserCode,
                    };
                    this.btnLoading = true;
                    this.queryConsign(params)
                        .then((msg) => {
                            this.onSuccess(msg);
                        })
                        .finally(() => (this.btnLoading = false));
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
                    let params = {
                        ...commonParams,
                        toUserList: toUserList,
                    };
                    this.btnLoading = true;
                    this.queryEndorsement(params)
                        .then((msg) => {
                            this.onSuccess(msg);
                        })
                        .finally(() => (this.btnLoading = false));
                } else {
                    return false;
                }
            });
        };
        // 通过
        let passAPI = () => {
            this.btnLoading = true;
            this.queryPass({ ...commonParams })
                .then((msg) => {
                    this.onSuccess(msg);
                })
                .finally(() => (this.btnLoading = false));
        };
        // 退回
        let backAPI = () => {
            if (!this.tableRadio) {
                this.$message({ type: "error", message: "请选择退回节点" });
                this.btnLoading = false;
                return;
            }

            let params = {
                ...commonParams,
                toTaskId: this.tableRadio,
            };
            this.btnLoading = true;
            this.queryRollback(params)
                .then((msg) => {
                    this.onSuccess(msg);
                })
                .finally(() => (this.btnLoading = false));
        };
        // 拒绝
        let rejectAPI = () => {
            this.btnLoading = true;
            this.queryReject({ ...commonParams })
                .then((msg) => {
                    this.onSuccess(msg);
                })
                .finally(() => (this.btnLoading = false));
        };
        // 发送请求
        let API = (target) => {
            let apiList = {
                approve_consign: entrustAPI,
                approve_endorsement: addsignAPI,
                approve_pass: passAPI,
                approve_back: backAPI,
                approve_refuse: rejectAPI,
            };
            return apiList[target]();
        };
        API(this.result);
    }
    onSuccess(msg) {
        this.$message({ type: "success", message: msg });
        this.handleCancel();
        this.$bus.$emit("jumpToTag", {
            path: this.$route.path,
            tag: "/configManage/template/credit",
        });
        this.queryList({
            ...this.searchData,
            modelFlag: this.$route.query.modelFlag,
        });
    }
    handleCancel() {
        let eForm: any = this.$refs["entrustForm"];
        eForm && eForm.resetFields();
        let aForm: any = this.$refs["addsignForm"];
        aForm && aForm.resetFields();
        this.$set(this.addsignForm, "list", []);
        this.tableRadio = "";
        this.dialogVisible = false;
    }
}
</script>
<style scope lang="scss">
.extra-btn {
    margin-bottom: 10px;
    float: right;
}
</style>