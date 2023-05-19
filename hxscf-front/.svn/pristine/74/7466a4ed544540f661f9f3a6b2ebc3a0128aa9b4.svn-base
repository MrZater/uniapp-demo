<template>
    <el-dialog title="修改密码" :visible.sync="dialogVisible" width="450px" class="br-dialog" :close-on-press-escape="false" :close-on-click-modal="false" @close="close">
        <div class="container">
            <el-form :inline="true" :model="formData" :rules="rules" ref="formData" label-width="100px">
                <el-form-item label="旧密码" prop="oldPassword" class="br-form-item-label">
                    <el-input type="password" v-model.trim="formData.oldPassword" placeholder="请输入旧密码" class="br-input"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword" class="br-form-item-label">
                    <el-input type="password" v-model.trim="formData.newPassword" placeholder="请输入新密码" class="br-input"></el-input>
                </el-form-item>
                <el-form-item label="确认新密码" prop="password2" class="br-form-item-label">
                    <el-input type="password" v-model.trim="formData.password2" placeholder="请确认新密码" class="br-input"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="onSubmit" style="margin-left: 20px;" type="primary" class="br-btn-large" :loading="btnLoading">确认修改</el-button>
            </div>
        </div>
    </el-dialog>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
import cloneDeep from "lodash.clonedeep";

const login = namespace("login");
import md5 from "md5";

@Component
export default class ResetPwd extends Vue {
    @login.Action queryReplace;
    dialogVisible: boolean = false;
    btnLoading: boolean = false;
    private checkNewPassword = (rule, value, callback) => {
        if (value === this.formData.oldPassword) {
            callback(new Error("新旧密码一致!"));
        } else if (value.length < this.passwordLength) {
            callback(new Error(`密码长度至少${this.passwordLength}位！`));
        } else {
            callback();
        }
    };

    private checkConfirmPassword = (rule, value, callback) => {
        if (value !== this.formData.newPassword) {
            callback(new Error("两次输入密码不一致!"));
        } else {
            callback();
        }
    };
    passwordLength: number = 8;
    formData: any = {
        oldPassword: "",
        newPassword: "",
        password2: "",
    };
    rules: any = {
        oldPassword: [
            {
                required: true,
                message: "请输入旧密码",
                trigger: "blur",
            },
        ],
        newPassword: [
            {
                required: true,
                message: "请输入新密码",
                trigger: "blur",
            },
            {
                validator: this.checkNewPassword,
                trigger: "blur",
            },
        ],
        password2: [
            {
                required: true,
                message: "请确认新密码",
                trigger: "blur",
            },
            {
                validator: this.checkConfirmPassword,
                trigger: "blur",
            },
        ],
    };

    onSubmit() {
        let oEl: any = this.$refs["formData"];
        oEl.validate((valid) => {
            if (valid) {
                let oParent: any = this.$parent;
                let params = cloneDeep(this.formData);
                delete params.password2;
                params.oldPassword = md5(params.oldPassword);
                params.newPassword = md5(params.newPassword);
                this.btnLoading = true;
                this.queryReplace(params)
                    .then((res) => {
                        this.dialogVisible = false;
                        oParent.saveUserInfo(res);
                        oParent.goHome();
                    })
                    .finally(() => (this.btnLoading = false));
            }
        });
    }

    close() {
        let oEl: any = this.$refs["formData"];
        oEl.resetFields();
        let oParent: any = this.$parent;
        oParent.resetLogStatus();
    }
}
</script>

<style lang="scss" scoped>
.container {
    width: 80%;
    margin: 10px auto 0px;
}

.dialog-footer {
    margin-top: 30px;
    text-align: center;
}
</style>