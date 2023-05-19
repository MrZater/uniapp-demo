<template>
    <B-dialog :title="dialogType=='edit'?'编辑' : '新建'" :visible="dialogVisible" width="550px" @close="reset">
        <el-form ref="forms" :model="dialogForm" label-width="150px" :rules="rules" size="mini" inline label-position="right">
            <el-form-item class="br-form-item-label" label="企业名称" prop="bizName">
                <el-input disabled class="br-input-large" maxLength="50" v-model.trim="dialogForm.bizName" placeholder="请输入企业名称"></el-input>
            </el-form-item>
            <el-form-item class="br-form-item-label" label="统一社会信用代码" prop="creditCode">
                <el-input disabled class="br-input-large" maxLength="18" v-model.trim="dialogForm.creditCode" placeholder="请输入统一社会信用代码"></el-input>
            </el-form-item>
            <el-form-item class="br-form-item-label" label="所属行业" prop="tradeKeyNo">
                <el-select v-model="dialogForm.tradeKeyNo" placeholder="请选择所属行业" class="br-select-large">
                    <el-option v-for="item in tradeList" :key="item.keyNo" :label="item.tradeName" :value="item.keyNo"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="br-form-item-label" label="组织名称" prop="businessOrgPname">
                <el-select v-model="dialogForm.businessOrgPname" placeholder="请选择组织名称" class="br-select-large tree-select" :popper-append-to-body="false" ref="treeSelect">
                    <el-option value="null">
                        <el-tree :data="orgNameList" @node-click="onLeavesClick" node-key="id" :props="defaultProps"></el-tree>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="br-form-item-label" label="业务部门" prop="businessOrgName">
                <el-select v-model="dialogForm.businessOrgName" placeholder="请选择业务部门" class="br-select-large tree-select" :popper-append-to-body="false" ref="treeSelect1">
                    <!-- <el-option v-for="item in personnel" :key="item.userId" :label="item.realName" :value="item.userId"></el-option> -->
                    <el-option value="null">
                        <el-tree :data="orgList" @node-click="onLeavesClick1" node-key="id" :props="defaultProps"></el-tree>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="br-form-item-label" label="业务人员" prop="businessUserId">
                <el-select v-model="dialogForm.businessUserId" placeholder="请选择业务人员" class="br-select-large">
                    <el-option v-for="item in personnel" :key="item.userId" :label="item.realName" :value="item.userId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="br-form-item-label" label="企业角色" prop="bizRoles">
                <el-checkbox-group v-model="dialogForm.bizRoles" class="br-checkbox br-input-large" @change="creditChange">
                    <el-checkbox label="01" name="01">客户</el-checkbox>
                    <el-checkbox label="02" name="02">供应商</el-checkbox>
                    <el-checkbox label="03" name="03">物流方</el-checkbox>
                    <el-checkbox label="04" name="04">委托方</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item class="br-form-item-label" label="是否做物流额度管控" prop="creditFlag" v-if="creditFlag">
                <el-radio-group v-model="dialogForm.creditFlag" class="br-radio">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item class="br-form-item-label" label="法人代表人" prop="operName">
                <el-input class="br-input-large" v-model.trim="dialogForm.operName"></el-input>
            </el-form-item>
            <el-form-item class="br-form-item-label" label="法人代表身份证" prop="operPaperId">
                <el-input class="br-input-large" v-model.trim="dialogForm.operPaperId"></el-input>
            </el-form-item>
            <el-form-item class="br-form-item-label" label="法人代表手机号" prop="operMobileNo">
                <el-input class="br-input-large" v-model.trim="dialogForm.operMobileNo"></el-input>
            </el-form-item>
            <el-form-item class="br-form-item-label" label="实际经营地址" prop="areaPcode">
                <el-cascader :key="keys" class="br-select-large" v-model="dialogForm.areaPcode" :options="options"></el-cascader>
            </el-form-item>
            <el-form-item class="br-form-item-label" label="详细地址" prop="detailAddress">
                <el-input class="br-input-large" v-model.trim="dialogForm.detailAddress"></el-input>
            </el-form-item>
        </el-form>
        <template slot="footer">
            <el-button type="primary" @click="handleSubmit" class="br-btn-large" :loading="btnloading">保存
            </el-button>
            <el-button class="br-btn-large" @click="dialogVisible = false">取消</el-button>
        </template>
    </B-dialog>
</template>
<script lang="ts">
import { namespace } from "vuex-class";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { Bprovince } from "@/components";
import { idCardRegExp, phoneRegExp } from "@/utils/validate";

const configManage = namespace("configManage");
const enterInfoManage = namespace("enterpriseInfoManage");
import { BDialog } from "@/components";
import city from "@/utils/city";

@Component({
    components: {
        BDialog,
        "Area-form-item": Bprovince,
    },
})
export default class Dialog extends Vue {
    @configManage.State orgNameList;
    @enterInfoManage.Action addAndUpFN;
    @enterInfoManage.Action searchFN;

    @enterInfoManage.Action orgListFN; // 根据组织机构查询业务部门
    @enterInfoManage.State orgList; // 业务部门

    @enterInfoManage.Action personnelFN; // 根据业务部门查询业务人员
    @enterInfoManage.State personnel; // 业务人员

    @enterInfoManage.Action tradeListFN; // 所属行业
    @enterInfoManage.State tradeList; // 所属行业

    @Prop(Object) dialogData;
    @Prop(String) dialogType;
    @Prop(Object) creadInfo;
    dialogForm: any = {
        bizRoles: [],
        areaPcode: [],
    };
    creditFlag: boolean = false;
    btnloading: boolean = false;
    dialogVisible: boolean = false;
    options: any = [];
    keys = 0;

    defaultProps = {
        children: "children",
        label: "label",
    };

    private operPaperIdFN = (rule, value, callback) => {
        if (!value) {
            callback();
        } else if (!idCardRegExp(value)) {
            callback(new Error("证件号码不正确"));
        } else {
            callback();
        }
    };
    private isPhoneFN = (rule, value, callback) => {
        if (!value) {
            callback();
        } else if (!phoneRegExp(value)) {
            callback(new Error("请输入正确的手机号码"));
        } else {
            callback();
        }
    };

    rules: any = {
        bizName: [
            { required: true, message: "请输入企业名称", trigger: "blur" },
        ],
        creditCode: [
            {
                required: true,
                message: "请输入统一社会信用代码",
                trigger: "blur",
            },
        ],
        tradeKeyNo: [
            { required: true, message: "请选择所属行业", trigger: "change" },
        ],
        businessOrgPname: [
            { required: true, message: "请选择组织名称", trigger: "change" },
        ],
        businessOrgName: [
            { required: true, message: "请选择业务部门", trigger: "change" },
        ],
        businessUserId: [
            { required: true, message: "请选择业务人员", trigger: "change" },
        ],
        bizRoles: [
            {
                type: "array",
                required: true,
                message: "请至少选择一个企业角色",
                trigger: "change",
            },
        ],
        operPaperId: [
            { required: false, trigger: "blur", validator: this.operPaperIdFN },
        ],
        operMobileNo: [
            {
                required: false,
                trigger: "blur",
                validator: this.isPhoneFN,
            },
        ],
        creditFlag: [
            { required: true, message: "是否做物流额度管控", trigger: "blur" },
        ],
    };
    mounted() {
        this.tradeListFN();
    }
    @Watch("dialogVisible")
    onChanged(val, oldVal) {
        if (val) {
            this.dialogForm = Object.assign(
                {},
                this.dialogData,
                this.creadInfo
            );
            if (this.dialogForm.businessOrgPcode) {
                this.orgListFN({
                    orgCode: this.dialogForm.businessOrgPcode,
                    flag: "6",
                });
            }
            if (this.dialogForm.businessOrgCode) {
                this.personnelFN({ orgCode: this.dialogForm.businessOrgCode });
            }

            this.creditFlag = this.dialogForm.bizRoles.includes("03");
            this.$nextTick(() => {
                this.options = city;
                this.keys += 1;
                this.$set(
                    this.dialogForm,
                    "areaPcode",
                    this.dialogForm.areaList
                );
            });
        }
    }

    // 是否选中物流方
    creditChange(val) {
        this.creditFlag = val.includes("03");
    }

    open() {
        this.dialogVisible = true;
        this.$nextTick(() => {
            let $ele: any = this.$refs["forms"];
            $ele.clearValidate();
        });
    }

    //点击组织名称
    onLeavesClick(data, node, el) {
        /* 组织名称赋值 */
        this.$set(this.dialogForm, "businessOrgPname", data.label);
        this.$set(this.dialogForm, "businessOrgPcode", data.id);
        /* 清空业务部门 */
        this.$set(this.dialogForm, "businessOrgName", "");
        this.$set(this.dialogForm, "businessOrgCode", "");
        /* 清空业务人员 */
        this.$set(this.dialogForm, "businessUserId", "");
        /* 获取业务部门列表 */
        this.orgListFN({ orgCode: data.id, flag: "6" });
        /* 关闭弹框 */
        this.$refs.treeSelect["handleClose"]();
    }

    //点击业务部门
    onLeavesClick1(data, node, el) {
        /* 业务部门赋值 */
        this.$set(this.dialogForm, "businessOrgName", data.label);
        this.$set(this.dialogForm, "businessOrgCode", data.id);
        /* 清空业务人员 */
        this.$set(this.dialogForm, "businessUserId", "");
        /* 获取业务人员列表 */
        this.personnelFN({ orgCode: data.id });
        /* 关闭弹框 */
        this.$refs.treeSelect1["handleClose"]();
    }

    handleSubmit() {
        let $ele: any = this.$refs["forms"];
        $ele.validate((valid) => {
            if (valid) {
                let [
                    provincesCodes,
                    cityCodes,
                    areaCodes,
                ] = this.dialogForm.areaPcode;

                let provincesCode = provincesCodes || "";
                let cityCode = cityCodes || "";
                let areaCode = areaCodes || "";
                let param = Object.assign(
                    {},
                    {
                        ...this.dialogForm,
                        provincesCode,
                        cityCode,
                        areaCode,
                    }
                );

                this.btnloading = true;

                this.addAndUpFN(param)
                    .then((res) => {
                        if (this.dialogType == "edit") {
                            this.searchFN({
                                pageNum: 1,
                                pageSize: 10,
                                postName: "",
                            });
                        } else {
                            this.$router.push({
                                path: "/enterpriseInfoDetail",
                                name: "enterpriseInfoDetail",
                                query: {
                                    custId: res.custId || "",
                                    creditCode: res.creditCode || "",
                                    isCreate: "1",
                                },
                            });
                            this.$emit("getBaseInfo");
                        }

                        this.$message({
                            type: "success",
                            message:
                                this.dialogType == "edit"
                                    ? "编辑成功"
                                    : "新建成功",
                        });
                        this.dialogVisible = false;
                    })
                    .finally(() => (this.btnloading = false));
            } else {
                return false;
            }
        });
    }

    reset() {
        let $ele: any = this.$refs["forms"];
        $ele.resetFields();
        this.$set(this.dialogForm, "areaPcode", []);
        this.dialogVisible = false;
    }
}
</script>
