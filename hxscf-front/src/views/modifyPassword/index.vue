<template>
    <el-dialog title="修改密码" :visible.sync="dialogVisible" width="450px" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="true" @close="close" class="br-dialog">
        <div class="container">
            <el-form :inline="true" :model="passwordForm" :rules="rules" ref="passwordForm" label-width="100px">
                <el-form-item label="旧密码" prop="oldPassword" class="br-form-item-label">
                    <el-input type="password" v-model.trim="passwordForm.oldPassword" placeholder="请输入旧密码" class="br-input"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword" class="br-form-item-label">
                    <el-input type="password" v-model.trim="passwordForm.newPassword" placeholder="请输入新密码" class="br-input"></el-input>
                </el-form-item>
                <el-form-item label="确认新密码" prop="confirmPassword" class="br-form-item-label">
                    <el-input type="password" v-model.trim="passwordForm.confirmPassword" placeholder="请确认新密码" class="br-input"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleCancel" style="margin-left: 20px;" type="primary" class="br-btn">取消</el-button>
                <el-button @click="submit" style="margin-left: 20px;" type="primary" class="br-btn">确认</el-button>
            </div>
        </div>
    </el-dialog>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
const modifyPassword = namespace("modifyPassword");
const login = namespace("login");
import { getStore, clearLoginInfo } from "@/utils/useStore";
import md5 from "md5";
import { Base64 } from "js-base64";
import { BDialog } from "@/components";

@Component({
    name: "modifyPassword",
    components: {
        BDialog,
    },
})
export default class index extends Vue {
    @modifyPassword.Action queryModify;
    @login.Action queryLogout;
    btnloading: boolean = false;
    passwordLength: number = 8;
    dialogVisible: boolean = false;

    private passwordForm: any = {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    };
    private rules: object = {
        oldPassword: [
            {
                required: true,
                message: "请输入原密码",
            },
        ],
        newPassword: [
            {
                required: true,
                message: "请输入新密码",
            },
            {
                validator: this.checkNewPassword,
                trigger: "blur",
            },
        ],
        confirmPassword: [
            {
                required: true,
                message: "请输入确认密码",
            },
            {
                validator: this.checkConfirmPassword,
                trigger: "blur",
            },
        ],
    };

    private checkNewPassword(rule, value, callback) {
        if (value === this.passwordForm.oldPassword) {
            callback(new Error("新旧密码一致!"));
        } else if (value.length < this.passwordLength) {
            callback(new Error(`密码长度至少${this.passwordLength}位！`));
        } else {
            callback();
        }
    }
    private checkConfirmPassword(rule, value, callback) {
        if (!value) {
            callback(new Error("请再次输入新密码"));
        } else if (value !== this.passwordForm.newPassword) {
            callback(new Error("两次输入的密码不一致"));
        } else {
            callback();
        }
    }
    submit() {
        const that = this;
        let $ele: any = this.$refs["passwordForm"];
        $ele.validate((valid) => {
            if (valid) {
                let userCode = JSON.parse(Base64.decode(getStore("userInfo")))
                    .userCode;
                let param = {
                    userCode: userCode,
                    oldPassword: md5(this.passwordForm.oldPassword),
                    newPassword: md5(this.passwordForm.newPassword),
                };
                this.btnloading = true;

                this.queryModify(param)
                    .then((msg) => {
                        this.$message({
                            type: "success",
                            duration: 4000,
                            message: msg,
                        });
                        this.close();
                        this.queryLogout({})
                            .then((msg) => {
                                clearLoginInfo();
                                this.$router.replace({ path: "/login" });
                            })
                            .catch((err) => {
                                this.$router.replace({ path: "/login" });
                            });
                    })
                    .finally(() => (this.btnloading = false));
            }
        });
    }
    reset() {
        let $ele: any = this.$refs["passwordForm"];
        $ele.resetFields();
    }

    open() {
        this.dialogVisible = true;

        this.$nextTick(() => {
            let $ele: any = this.$refs["passwordForm"];
            $ele.clearValidate();
        });
    }
    close() {
        this.dialogVisible = false;
    }
    handleCancel() {
        this.reset();
        this.close();
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