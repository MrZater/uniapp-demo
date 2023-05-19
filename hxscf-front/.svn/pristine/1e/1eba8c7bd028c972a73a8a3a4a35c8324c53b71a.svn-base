<template>
    <div class="login_page" :style="{'height':winH+'px'}">
        <div class="bg-box"></div>
        <div class="login-logo">
            <img class="logoImg" :src="logoUrl" />
            <div>厦门海峡投资信用管理系统</div>
        </div>
        <section class="form_contianer">
            <div class="manage_tip">
                <div>登录</div>
            </div>
            <div v-show="showForm" class="login-container">
                <el-form :model="formParams" :rules="rules" ref="forms" class="login-form">
                    <el-form-item prop="username">
                        <el-input v-model.trim="formParams.username" placeholder="用户名" @keyup.enter.native="handleLogin" class="br-input-login" prefix-icon="iconfont icon-yonghuming" clearable>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" placeholder="密码" v-model.trim="formParams.password" @keyup.enter.native="handleLogin" class="br-input-login" prefix-icon="iconfont icon-mima"
                            clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handleLogin" class="submit_btn" :loading="btnloading">登录
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
            <slide-verify v-show="showVerify" ref="slideblock" :l="42" :r="10" :w="310" :h="155" slider-text="向右滑动" :imgs="verifyImgs" @success="onSuccess()" @fail="onFail" @refresh="onRefresh"
                @fulfilled="onFulfilled"></slide-verify>
        </section>
        <reset-dialog ref="resetDialog" />
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
import cloneDeep from "lodash.clonedeep";
import { renderMenu, getMenu, getBtn } from "@/config/mUtils.js";
import { setStore } from "@/utils/useStore";
import { Base64 } from "js-base64";
import md5 from "md5";

const baseConfig: any = require("../../../baseConfig");
import ResetDialog from "./reset-dialog.vue";

const login = namespace("login");
import img10 from "@/assets/images/verify/img10.jpg";
import img11 from "@/assets/images/verify/img11.jpg";
import img12 from "@/assets/images/verify/img12.jpg";
import img13 from "@/assets/images/verify/img13.jpg";
import img14 from "@/assets/images/verify/img14.jpg";
import img15 from "@/assets/images/verify/img15.jpg";
import img16 from "@/assets/images/verify/img16.jpg";
import img17 from "@/assets/images/verify/img17.jpg";
import img19 from "@/assets/images/verify/img19.jpg";
import img20 from "@/assets/images/verify/img20.jpg";
import img21 from "@/assets/images/verify/img21.jpg";

@Component({
    components: { ResetDialog },
})
export default class Login extends Vue {
    @login.Action queryLogin;
    showForm: boolean = true;
    btnloading: boolean = false;
    showVerify: boolean = false;
    winH = document.body.clientHeight;
    logoUrl = `${baseConfig.logoUrl}`;
    verifyImgs: Array<string> = [
        img10,
        img11,
        img12,
        img13,
        img14,
        img15,
        img16,
        img17,
        img19,
        img20,
        img21,
    ];
    public formParams: any = {
        username: "",
        password: "",
    };
    public rules: any = {
        username: [{ required: true, message: "请输入用户名" }],
        password: [{ required: true, message: "请输入密码" }],
    };
    public formCache: any = {};

    created() {}

    mounted() {
        const that = this;
        that.winH =
            document.body.clientHeight < 665 ? 765 : document.body.clientHeight;

        window.onresize = () => {
            return (() => {
                that.winH =
                    document.body.clientHeight < 665
                        ? 765
                        : document.body.clientHeight;
            })();
        };
    }

    onSuccess(mandatoryFlag = "1") {
        this.btnloading = true;
        this.$set(this.formParams, "username", this.formCache.username);
        this.$set(this.formParams, "password", this.formCache.password);
        this.queryLogin({
            username: this.formParams.username,
            password: md5(this.formParams.password),
            mandatoryFlag,
        })
            .then((res) => {
                this.btnloading = false;
                if (res.code && res.code === "10002") {
                    this.$confirm(res.msg, "提示", {
                        confirmButtonText: "踢出",
                        cancelButtonText: "取消",
                        type: "warning",
                    })
                        .then(() => {
                            this.onSuccess("2");
                        })
                        .catch(() => {
                            this.resetLogStatus();
                        });
                } else if (res.code && res.code === "10013") {
                    this.$confirm(res.msg, "提示", {
                        confirmButtonText: "强制修改",
                        cancelButtonText: "跳过",
                        type: "warning",
                    })
                        .then(() => {
                            let oEl: any = this.$refs["resetDialog"];
                            oEl.dialogVisible = true;
                        })
                        .catch(() => {
                            this.resetLogStatus();
                        });
                } else {
                    this.saveUserInfo(res);
                    this.goHome();
                }
            })
            .catch((err) => {
                this.resetLogStatus();
            });
    }

    saveUserInfo(res) {
        setStore("token", res.token);
        let loginData = {
            userCode: res.userCode,
            userName: res.userName,
            orgName: res.orgName,
            roleNames: res.roleNames,
            cmpId: res.cmpId,
        };

        setStore("userInfo", Base64.encode(JSON.stringify(loginData)));
        // 存储菜单
        let tempMenu = getMenu(res.permission);
        let tempRenderMenuData = renderMenu(tempMenu);

        setStore("menu", Base64.encode(JSON.stringify(tempRenderMenuData)));
        // 存储按钮权限
        let tempBtn = getBtn(res.permission);

        setStore("btn", Base64.encode(JSON.stringify(tempBtn)));
    }

    goHome() {
        this.$message({
            type: "success",
            message: "登录成功",
        });
        this.$router.push("/home");
    }

    onFail() {
        this.$message({
            type: "error",
            message: "验证失败，请重新验证！",
        });
    }

    resetLogStatus() {
        this.btnloading = false;
        this.showForm = true;
        this.showVerify = false;
        this.$refs.slideblock["reset"]();
    }

    onRefresh() {}

    onFulfilled() {}

    handleLogin(): void {
        let $ele: any = this.$refs.forms;
        $ele.validate((valid) => {
            if (valid) {
                /* 防止chrome浏览器，自动填充账号密码时，出现错乱的问题 */
                /* 获取提交时的表单信息，进行缓存，保证发送至后台的数据和表单中数据一致 */
                this.formCache = cloneDeep(this.formParams);
                this.showForm = false;
                this.showVerify = true;
            }
        });
    }
}
</script>

<style scoped lang="scss">
.login_page {
    width: 100%;
    background-color: #324057;
    position: relative;
    background-image: url("../../assets/images/background.png");
    background-size: cover;

    .login-logo {
        position: absolute;
        top: 20px;
        left: 20px;

        .logoImg {
            height: 36px;
        }

        div {
            display: inline-block;
            height: 18px;
            line-height: 18px;
            color: #fff;
            font-size: 18px;
            vertical-align: middle;
            border-left: 1px solid #fff;
            padding-left: 10px;
            margin-left: 10px;
        }

        img {
            vertical-align: middle;
        }
    }
}

.manage_tip {
    text-align: left;
    font-family: ArialMT;
    font-weight: 400;
    color: #fff;
    margin-bottom: 38px;

    div {
        display: inline-block;
        line-height: 56px;
        border-bottom: 3px solid #4da1ff;
        font-size: 28px;
    }
}

.form_contianer {
    width: 310px;
    position: absolute;
    top: 100px;
    right: 200px;
    padding: 25px;
    text-align: center;

    .submit_btn {
        width: 100%;
        font-size: 14px;
    }
}

.verify-content {
    position: relative;

    .verify-message {
        position: absolute;
        left: 50%;
        top: 62px;
        transform: translateX(-50%);
        color: #fff;

        span {
            font-size: 14px;
        }
    }
}

.form-fade-enter-active,
.form-fade-leave-active {
    transition: all 1s;
}

.form-fade-enter,
.form-fade-leave-active {
    transform: translate3d(0, -50px, 0);
    opacity: 0;
}
</style>