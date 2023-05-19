<template>
    <el-dialog :title="dialogType == 1 ? '新增' : '编辑' " :visible.sync="dialogVisible" :close-on-click-modal="false" :before-close="beforeClose" width="480px" class="br-dialog">
        <el-form ref="forms" :model="dialogForm" label-width="100px" :rules="rules" size="small">
            <el-form-item class="br-form-item-label" label="使用类型" prop="resOperType">
                <el-radio-group v-model="dialogForm.resOperType">
                    <el-radio class="br-radio" label="1" :disabled="dialogType!='1'">目录</el-radio>
                    <el-radio class="br-radio" label="2" :disabled="dialogType!='1'">菜单</el-radio>
                    <el-radio class="br-radio" label="3" :disabled="dialogType!='1'">按钮</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item class="br-form-item-label" label="权限名称" prop="resName">
                <el-input class="br-input-large" v-model.trim="dialogForm.resName"></el-input>
            </el-form-item>
            <el-form-item class="br-form-item-label" label="排序号" prop="orders">
                <el-input-number size="mini" :min="0" class="br-input-large" v-model.trim="dialogForm.orders"></el-input-number>
            </el-form-item>
            <el-form-item class="br-form-item-label" label="图标" prop="icon" v-if="dialogForm.resOperType==1">
                <b-icon-selector v-model="dialogForm.icon" family="iconfont" />
            </el-form-item>
            <el-form-item class="br-form-item-label" label="父节点名称" prop="resPcode">
                <el-select v-model="dialogForm.resPName" placeholder="请选择" class="br-select-large tree-select" :popper-append-to-body="false" ref="treeSelect">
                    <el-option value="null">
                        <el-tree :data="dicPerData" @node-click="onClick" node-key="id" :props="defaultProps"></el-tree>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="br-form-item-label" label="访问Url" v-if="dialogForm.resOperType!=1 && dialogForm.resOperType==2" prop="resUrl">
                <el-input class="br-input-large" v-model.trim="dialogForm.resUrl"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="br-dialog-footer">
            <el-button type="primary" class="br-btn-large" @click="submitForm" :loading="btnloading">保存</el-button>
            <el-button class="br-btn-large" @click="cancel">取消</el-button>
        </div>
    </el-dialog>
</template>

<script lang="ts">
import { namespace } from "vuex-class";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
const authorityManage = namespace("authorityManage");
import { BIconSelector } from "@/components";
@Component({
    components: {
        BIconSelector,
    },
})
export default class Dialog extends Vue {
    dialogVisible: boolean = false;
    btnloading: boolean = false;
    defaultProps = {
        children: "children",
        label: "label",
    };
    dialogForm: any = {};
    rules = {
        resOperType: [
            { required: true, message: "请选择使用类型", trigger: "change" },
        ],
        resName: [
            { required: true, message: "请输入权限名称", trigger: "blur" },
        ],
        resUrl: [{ required: true, message: "请输入Url", trigger: "blur" }],
    };
    @Prop() dialogType;
    @Prop(Object) dialogData;
    @authorityManage.Action queryAllResource;
    @authorityManage.Action queryAddAuthority;
    @authorityManage.Action queryUpdateAuthority;
    @authorityManage.Action queryDicPermisson; // 目录权限接口
    @authorityManage.State dicPerData; // 目录权限数据
    @Watch("dialogVisible")
    private onChanged(val, oldVal) {
        if (val) {
            this.dialogForm = Object.assign({}, this.dialogData);
            this.queryDicPermisson({});
        }
    }
    open() {
        this.dialogVisible = true;

        this.$nextTick(() => {
            let $ele: any = this.$refs["forms"];
            $ele.clearValidate();
        });
    }
    close() {
        this.dialogVisible = false;
    }
    //点击父节点名称
    onClick(data, node, el) {
        this.$set(this.dialogForm, "resPName", data.label);
        this.$set(this.dialogForm, "resPcode", data.id);
        this.$refs.treeSelect["handleClose"]();
    }
    cancel() {
        this.$refs["forms"]["resetFields"]();
        this.close();
    }
    submitForm() {
        this.$refs["forms"]["validate"]((valid) => {
            if (valid) {
                // 菜单-必须选择父节点名称
                if (
                    this.dialogForm.resOperType == "2" &&
                    !this.dialogForm.resPcode
                ) {
                    this.$message({
                        type: "warning",
                        message: "请选择父节点名称",
                    });
                    return;
                }
                const formAPI =
                    this.dialogType == "1"
                        ? this.queryAddAuthority
                        : this.queryUpdateAuthority;
                this.btnloading = true;
                formAPI(this.dialogForm)
                    .then((msg) => {
                        this.$message({
                            type: "success",
                            message: msg,
                        });
                        this.queryAllResource();
                        this.cancel();
                    })
                    .finally(() => (this.btnloading = false));
            } else {
                return false;
            }
        });
    }
    beforeClose(done) {
        this.$refs["forms"]["resetFields"]();
        done();
    }
}
</script>

<style lang="scss">
</style>