<template>
    <div>
        <div class="point-group">
            <el-button v-for="(item, index) in isCreate == '1' ? tags: tags.filter(item => item != '补充信息')" class="model-button" size="mini" :type="index == currentTagIndex ? 'primary' : ''"
                :key="index" @click="goToAnchor(index)">
                {{ item }}
            </el-button>
        </div>
        <div class="sub-title">基本信息</div>
        <div class="detail_content">
            <div class="detail_content_item">
                <span class="detail_content_item_label">公司名称</span>
                <span class="detail_content_item_content">{{ (baseInfo.bizBaseInfo && baseInfo.bizBaseInfo.bizName) || "---" }}</span>
            </div>
            <div class="detail_content_item">
                <span class="detail_content_item_label">统一社会信用代码</span>
                <span class="detail_content_item_content">{{ (baseInfo.bizBaseInfo && baseInfo.bizBaseInfo.creditCode) || "---" }}</span>
            </div>
            <div class="detail_content_item">
                <span class="detail_content_item_label">法定代表人</span>
                <span class="detail_content_item_content">{{ (baseInfo.bizBaseInfo && baseInfo.bizBaseInfo.operName) || "---" }}</span>
            </div>
            <div class="detail_content_item">
                <span class="detail_content_item_label">组织机构代码</span>
                <span class="detail_content_item_content">{{ (baseInfo.bizBaseInfo && baseInfo.bizBaseInfo.orgNo) || "---" }}</span>
            </div>
            <div class="detail_content_item">
                <span class="detail_content_item_label">注册号</span>
                <span class="detail_content_item_content">{{ (baseInfo.bizBaseInfo && baseInfo.bizBaseInfo.regNo) || "---" }}</span>
            </div>
            <div class="detail_content_item">
                <span class="detail_content_item_label">成立时间</span>
                <span class="detail_content_item_content">{{ (baseInfo.bizBaseInfo && baseInfo.bizBaseInfo.startDate) || "---" }}</span>
            </div>
            <div class="detail_content_item">
                <span class="detail_content_item_label">经营状态</span>
                <span class="detail_content_item_content">{{ (baseInfo.bizBaseInfo && baseInfo.bizBaseInfo.detailStatus) || "---" }}</span>
            </div>
            <div class="detail_content_item">
                <span class="detail_content_item_label">公司类型</span>
                <span class="detail_content_item_content">{{baseInfo.bizBaseInfo && baseInfo.bizBaseInfo.entType ? $code("companyType", baseInfo.bizBaseInfo.entType):"---" }}</span>
            </div>
            <div class="detail_content_item">
                <span class="detail_content_item_label">注册资本</span>
                <span class="detail_content_item_content">{{ (baseInfo.bizBaseInfo && baseInfo.bizBaseInfo.registCapi) || "---" }}</span>
            </div>
            <div class="detail_content_item">
                <span class="detail_content_item_label">核准日期</span>
                <span class="detail_content_item_content">{{ (baseInfo.bizBaseInfo && baseInfo.bizBaseInfo.updatedDate) || "---" }}</span>
            </div>
            <div class="detail_content_item">
                <span class="detail_content_item_label">经营期限</span>
                <span class="detail_content_item_content">{{ (baseInfo.bizBaseInfo && baseInfo.bizBaseInfo.termStart) || "---"}}
                    至
                    {{ (baseInfo.bizBaseInfo && baseInfo.bizBaseInfo.teamEnd) || "---" }}</span>
            </div>
            <div class="detail_content_item">
                <span class="detail_content_item_label">人员规模</span>
                <span class="detail_content_item_content">{{ (baseInfo.bizBaseInfo && baseInfo.bizBaseInfo.insuredCount) || "---" }}</span>
            </div>
            <div class="detail_content_item">
                <span class="detail_content_item_label">登记机关</span>
                <span class="detail_content_item_content">{{ (baseInfo.bizBaseInfo && baseInfo.bizBaseInfo.belongOrg) || "---" }}</span>
            </div>
            <div class="detail_content_item">
                <span class="detail_content_item_label">注册地址</span>
                <span class="detail_content_item_content">{{ (baseInfo.bizBaseInfo && baseInfo.bizBaseInfo.registAddress) || "---" }}</span>
            </div>
            <div class="w100">
                <div class="detail_content_item special_item">
                    <div class="detail_content_item_label special_title">经营范围</div>
                    <div class="special_title">
                        <div class="special_content detail_content_item_content">
                            {{ (baseInfo.bizBaseInfo && baseInfo.bizBaseInfo.detailScope) || "---" }}
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div v-if="isCreate == 1">
            <div class="sub-gap"></div>
            <div class="sub-title">补充信息</div>
            <div class="detail_content">
                <div class="detail_content_item">
                    <span class="detail_content_item_label">所属行业</span>
                    <span class="detail_content_item_content">{{ (baseInfo.bizapply && baseInfo.bizapply.tradeName) || "---" }}</span>
                </div>
                <div class="detail_content_item">
                    <span class="detail_content_item_label">业务人员</span>
                    <span class="detail_content_item_content">{{ (baseInfo.bizapply && baseInfo.bizapply.realName) || "---" }}</span>
                </div>
                <div class="detail_content_item">
                    <span class="detail_content_item_label">业务部门</span>
                    <span class="detail_content_item_content">{{ (baseInfo.bizapply && baseInfo.bizapply.orgName) || "---" }}</span>
                </div>
                <div class="detail_content_item">
                    <span class="detail_content_item_label">企业角色</span>
                    <span class="detail_content_item_content">{{ (baseInfo.bizapply && baseInfo.bizapply.orgName) || "---" }}</span>
                </div>
                <div class="detail_content_item">
                    <span class="detail_content_item_label">法人代表身份证</span>
                    <span class="detail_content_item_content">{{ (baseInfo.bizapply && baseInfo.bizapply.operPaperId) || "---" }}</span>
                </div>
                <div class="detail_content_item">
                    <span class="detail_content_item_label">法人代表手机号</span>
                    <span class="detail_content_item_content">{{ (baseInfo.bizapply && baseInfo.bizapply.operMobileNo) || "---" }}</span>
                </div>
                <div class="w100">
                    <div class="detail_content_item">
                        <span class="detail_content_item_label">实际经营地址</span>
                        <span class="detail_content_item_content">{{ (baseInfo.bizapply && baseInfo.bizapply.detailAddress) || "---" }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="sub-gap"></div>
        <div class="sub-gap"></div>
        <div class="sub-title">高管信息</div>
        <el-table stripe :data="baseInfo.empLoyees" class="br-table" border>
            <el-table-column label="姓名" prop="employeName">
                <template slot-scope="{row}">
                    <span v-if="isBranch">{{ row.employeName }}</span>
                    <el-link v-else type="primary" :underline="false" @click="onEmpLoyeesDetail(row)">{{ row.employeName }}</el-link>
                </template>
            </el-table-column>
            <el-table-column label="职位" prop="employeJob"></el-table-column>
            <el-table-column label="关联公司" prop="employeBizname">
                <template slot-scope="{row}">
                    <span v-if="isBranch">{{ row.employeBizname }}</span>
                    <el-link v-else type="primary" :underline="false" @click="onCompanyDetail(row)">{{ row.employeBizname }}</el-link>
                </template>
            </el-table-column>
            <el-table-column label="身份证号" prop="employePaperid" min-width="150">
                <template slot-scope="{row}">
                    <span v-if="isBranch">{{ row.employePaperid }}</span>
                    <div v-else>
                        <el-input v-model="row.employePaperid" class="br-input" size="mini" v-if="!row.isSave"></el-input>
                        <span v-show="row.isSave">{{ row.employePaperid }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="手机号码" prop="employeMobileno" min-width="120">
                <template slot-scope="{ row }">
                    <span v-if="isBranch">{{ row.employeMobileno }}</span>
                    <div v-else>
                        <el-input v-model="row.employeMobileno" class="br-input" size="mini" v-if="!row.isSave"></el-input>
                        <span v-show="row.isSave">{{ row.employeMobileno }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作" prop="code3" width="80" v-if="!isBranch">
                <template slot-scope="{row}">
                    <el-button type="text" @click="onSubmit(row)">{{ row.isSave == true ? '编辑' : '保存' }}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="sub-gap"></div>
        <div class="sub-gap"></div>
        <div class="sub-title">分支机构</div>
        <el-table stripe :data="baseInfo.branches" class="br-table" border>
            <el-table-column label="公司名称" prop="bizName" min-width="150" show-overflow-tooltip>
                <template slot-scope="{row}">
                    <span v-if="isBranch">{{ row.bizName }}</span>
                    <el-link v-else type="primary" :underline="false" @click="onBranchDetail(row)">{{ row.bizName }}</el-link>
                </template>
            </el-table-column>
            <el-table-column label="负责人" prop="operName" min-width="150" show-overflow-tooltip></el-table-column>
            <el-table-column label="统一社会信用代码" prop="creditCode" min-width="150" show-overflow-tooltip></el-table-column>
            <el-table-column label="注册号" prop="regNo" min-width="150" show-overflow-tooltip></el-table-column>
            <el-table-column label="登记机关" prop="belongOrg" min-width="80" show-overflow-tooltip></el-table-column>
        </el-table>
        <div class="sub-gap"></div>
        <div class="sub-gap"></div>
        <div class="sub-title">行政许可</div>
        <el-table stripe :data="baseInfo.permissioneci" class="br-table" border>
            <el-table-column label="许可文件编号" prop="licensDocno" min-width="150"></el-table-column>
            <el-table-column label="许可文件名称" prop="licensDocname" min-width="150"></el-table-column>
            <el-table-column label="有效期自" prop="validityFrom" min-width="150"></el-table-column>
            <el-table-column label="有效期至" prop="validityTo" min-width="150"></el-table-column>
            <el-table-column label="许可内容" prop="licensContent" min-width="80" show-overflow-tooltip></el-table-column>
            <el-table-column label="许可机关" prop="licensOffice" min-width="80" show-overflow-tooltip></el-table-column>
        </el-table>
        <div class="sub-gap"></div>
        <div class="sub-title">变更信息</div>
        <el-table stripe :data="baseInfo.changeRecords" class="br-table" border>
            <el-table-column label="变更日期" prop="changeDate" width="150"></el-table-column>
            <el-table-column label="变更事项" prop="projectName" width="200" show-overflow-tooltip></el-table-column>
            <el-table-column label="变更前内容" prop="beforeContent" min-width="150" show-overflow-tooltip></el-table-column>
            <el-table-column label="变更后内容" prop="afterContent" min-width="150" show-overflow-tooltip></el-table-column>
        </el-table>
        <!--   关联企业弹窗     -->
        <associat-dialog ref="associatDialog" :isCreate="isCreate"></associat-dialog>
        <empLoyees-dialog ref="empLoyeesDialog"></empLoyees-dialog>
        <branch-dialog ref="branchDialog"></branch-dialog>

    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { idCardRegExp, phoneRegExp } from "@/utils/validate";

const enterpriseInfoSearch = namespace("enterpriseInfoSearch");

import associatDialog from "../modals/associat-dialog.vue"; //关联公司
import empLoyeesDialog from "../modals/empLoyees-dialog.vue";
import branchDialog from "../modals/branch-dialog.vue"; //分支机构

@Component({
    name: "BaseInfo",
    components: {
        associatDialog,
        empLoyeesDialog,
        branchDialog,
    },
})
export default class BaseInfo extends Vue {
    @Prop({ default: () => ({}), type: Object }) baseInfo;
    @Prop({ default: false, type: Boolean }) isBranch; //分公司信息
    @Prop(String) isCreate;
    @enterpriseInfoSearch.Action getBaseInfoFN;
    @enterpriseInfoSearch.Action updateEmployeesInfo;

    currentTagIndex: any = 0;
    tags: any = [
        "基本信息",
        "补充信息",
        "高管信息",
        "分支机构",
        "行政许可",
        "变更信息",
    ];
    nodeLists: any = [];

    mounted() {
        this.$nextTick(() => {
            this.nodeLists = this.$el.querySelectorAll(".sub-title");
        });
    }

    goToAnchor(index) {
        this.currentTagIndex = index;
        this.nodeLists[index].scrollIntoView({
            behavior: "smooth", // 平滑过渡
            block: "start", // 上边框与视窗顶部平齐
        });
    }

    // 关联公司 dialog
    onCompanyDetail(row) {
        let oDom: any = this.$refs.associatDialog;
        let params = {
            ...row,
            corpName: this.baseInfo.bizBaseInfo.bizName,
        };
        oDom.open(params);
    }
    // 高管信息 dialog-姓名点击
    onEmpLoyeesDetail(row) {
        let oDom: any = this.$refs.empLoyeesDialog;
        let params = {
            ...row,
            corpName: this.baseInfo.bizBaseInfo.bizName,
        };
        let { employePaperid, employeMobileno } = row;
        if (!idCardRegExp(employePaperid) || !phoneRegExp(employeMobileno)) {
            this.$message({
                type: "error",
                message: "请保证输入的身份证或者手机号码格式正确！",
            });
            return;
        }
        oDom.open(params);
    }
    // 分支机构 dialog
    onBranchDetail(row) {
        let oDom: any = this.$refs.branchDialog;
        oDom.open(row);
    }
    onSubmit(row) {
        if (row.isSave) {
            this.$set(row, "isSave", !row.isSave);
            return;
        }
        let {
            employePaperid,
            employeMobileno,
            custId,
            keyNo,
        } = row;
        if (idCardRegExp(employePaperid) && phoneRegExp(employeMobileno)) {
            if (this.isCreate == 1) {
                let params = { custId, keyNo, employeMobileno, employePaperid };
                this.updateEmployeesInfo(params).then((res) => {
                    this.$set(row, "isSave", !row.isSave);
                });
            } else {
                this.$set(row, "isSave", !row.isSave);
            }
        } else {
            this.$message({
                type: "error",
                message: "请保证输入的身份证或者手机号码格式正确！",
            });
        }
    }
}
</script>

<style scoped lang="scss">
.w100 {
    width: 100%;
    .special_item {
        height: auto;
    }
    .special_title {
        display: inline-block;
        vertical-align: text-top;
    }
    .special_content {
        width: 90%;
        white-space: normal;
        margin-bottom: 5px;
        text-align: justify;
    }
}

.point-group {
    background: #edf5ff;
    padding: 0px 18px;
    height: 60px;
    line-height: 60px;

    .model-button:not(:first-child) {
        margin-left: 10px;
        margin-bottom: 10px;
    }
}

.detail_content {
    background: #edf5ff;
}
</style>
