<template>
  <div class="resetPwd-container">
    <el-form
      ref="resetForm"
      :model="resetForm"
      :rules="resetRules"
      class="login-form"
      label-position="left"
    >
      <!-- 账号 -->
      <el-form-item prop="email">
        <span class="svg-container">
          <svg-icon icon-class="email" />
        </span>
        <el-input
          v-model="resetForm.email"
          placeholder="请输入邮箱"
          name="email"
          type="text"
        />
      </el-form-item>

      <!-- 密码 -->
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType1"
          ref="password"
          v-model="resetForm.password"
          :type="passwordType1"
          placeholder="密码"
          name="password"
        />
        <span
          class="show-pwd"
          @click="showPwd(1)"
        >
          <svg-icon
            :icon-class="passwordType1 === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>
      <el-form-item prop="confirmPassword">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType2"
          ref="confirmPassword"
          v-model="resetForm.confirmPassword"
          :type="passwordType2"
          placeholder="确认密码"
          name="confirmPassword"
        />
        <span
          class="show-pwd"
          @click="showPwd(2)"
        >
          <svg-icon
            :icon-class="passwordType2 === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>
      <el-row
        :gutter="5"
        class="getcode"
      >
        <el-col :lg="16">
          <el-form-item prop="code">
            <el-input
              v-model="resetForm.code"
              placeholder="请输入验证码"
            />
          </el-form-item>
        </el-col>
        <el-col
          :lg="8"
        >
          <el-button
            v-show="!waittime"
            style="height: 47px; background-color: #3f62ba"
            size="medium"
            type="primary "
            :loading="waittime"
            @click="postMsg"
          >
            获取验证码
          </el-button>
        </el-col>
        <el-button
          v-show="waittime"
          type="primary "
          size="medium"
          style="height: 47px; background-color: #3f62ba"
          disabled
        >
          {{ count }}s后再获取
        </el-button>
      </el-row>

      <el-button
        type="primary"
        style="
          height: 47px;
          width: 100%;
          margin-bottom: 30px;
          background-color: #3f62ba;
        "
        :loading="loading"
        @click.native.prevent="handleReset"
      >
        确认修改
      </el-button>
      <div class="toother">
        <div
          v-if="allowRegister"
          class="toregist"
        >
          没有账号？<router-link
            to="/register"
            style="color: #3f62ba"
          >
            去注册
          </router-link>
        </div>
        <div class="tologin">
          <a
            href="#"
            style="color: #3f62ba"
            @click="tologin"
          >去登录</a>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { sentEmail, resetPassword } from '@/api/user.js'
// import { Encrypt } from "@/utils/secret";
import { Encrypt } from '@/utils/jsencrypt'
export default {
  data() {
    // 是否包含一位数字
    const regNumber = /(?=.*[\d])/
    // 是否包含一位小写字母
    const regLetter = /(?=.*[a-z])/
    // 是否包含一位大写字母
    const regLetters = /(?=.*[A-Z])/
    // 是否包含一位特殊字符
    const regCharacter =
      /(?=.*[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、])/

    const validateCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码！'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('新密码不能为空！请重新输入'))
      } else {
        if (value.length > 16) {
          callback(new Error('密码长度不超过16个字符。'))
        } else if (value.length < 8) {
          callback(new Error('密码不低于8位，包含大小字母、数字、特殊符号'))
        } else {
          if (!/^[a-zA-Z\d]{1}/.test(value)) {
            callback(new Error('密码必须以英文大小写字母或数字开头！'))
          } else {
            if (!regNumber.test(value)) {
              callback(
                new Error('密码不低于8位，包含大小字母、数字、特殊符号!')
              )
              // callback(new Error("密码必须包含一位数字!"));
            } else if (!regLetter.test(value)) {
              callback(
                new Error('密码不低于8位，包含大小字母、数字、特殊符号!')
              )
              // callback(new Error("密码必须包含一位小写字母!"));
            } else if (!regLetters.test(value)) {
              callback(
                new Error('密码不低于8位，包含大小字母、数字、特殊符号!')
              )
              // callback(new Error("密码必须包含一位大写字母!"));
            } else if (!regCharacter.test(value)) {
              callback(
                new Error('密码不低于8位，包含大小字母、数字、特殊符号!')
              )
              // callback(new Error("密码必须包含一位特殊字符!"));
            } else {
              callback()
            }
          }
        }
      }
    }
    const validateconfirm = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error('请确认密码'))
      } else {
        if (this.resetForm.password !== value) {
          callback(new Error('确认密码错误！'))
        } else {
          callback()
        }
      }
    }
    return {
      // 修改密码表单
      resetForm: {
        code: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      // 密码可看icon
      passwordType1: 'password',
      passwordType2: 'password',
      // 按钮loading
      loading: false,
      // 计时按钮显示
      waittime: false,
      // 倒计时时间
      count: 60,
      // 计时器
      timer: null,
      // 修改密码规则验证
      resetRules: {
        code: [{ required: true, trigger: 'blur', validator: validateCode }],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ],
        confirmPassword: [
          { required: true, trigger: 'blur', validator: validateconfirm }
        ],
        email: [
          { required: true, message: '请填写邮箱', trigger: 'blur' },
          {
            message: '邮箱无效',
            pattern:/^[\w\.]+@[a-z0-9]+[\.a-z]+\.[a-z]{2,3}[\.]?$/,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    origin() {
      return this.$store.getters.origin
    },
    allowRegister() {
      return this.$store.getters.allowRegister
    }
  },
  methods: {
    // 提交按钮
    handleReset() {},
    // 发送验证码按钮
    postCodeMES() {},
    showPwd(val) {
      if (val === 1) {
        if (this.passwordType1 === 'password') {
          this.passwordType1 = ''
        } else {
          this.passwordType1 = 'password'
        }
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      } else if (val === 2) {
        if (this.passwordType2 === 'password') {
          this.passwordType2 = ''
        } else {
          this.passwordType2 = 'password'
        }
        this.$nextTick(() => {
          this.$refs.confirmPassword.focus()
        })
      }
    },
    postMsg() {
      if (this.resetForm.email.trim() === '') {
        this.$message.error('请输入邮箱')
        return
      }

      sentEmail(this.resetForm.email).then((resp) => {
        if (resp.code !== 200) return
        let TIME_COUNT = 60
        this.waittime = true
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            this.waittime = false
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      })
    },
    tologin() {
      this.$emit('tologin')
    },
    async handleReset() {
      if (this.resetForm.password !== this.resetForm.confirmPassword) {
        this.$message.error('确认密码不正确')
        return
      }
      this.$refs.resetForm.validate((valid) => {
        if (valid) {
          let password = Encrypt(this.resetForm.password)
          let confirmPassword = Encrypt(this.resetForm.confirmPassword)
          let resetForm = JSON.parse(JSON.stringify(this.resetForm))
          resetForm.password = password
          resetForm.confirmPassword = confirmPassword
          resetPassword(resetForm).then((resp) => {
            if (resp.code !== 200) return
            this.$message.success('修改成功！')
            this.tologin()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$dark_gray: #889aa4;
$light_gray: #eee;
// label
.svg-container {
  padding: 6px 5px 6px 15px;
  color: $dark_gray;
  vertical-align: middle;
  width: 30px;
  display: inline-block;
}
// 密码可看
.show-pwd {
  position: absolute;
  right: 10px;
  top: 7px;
  font-size: 16px;
  color: $dark_gray;
  cursor: pointer;
  user-select: none;
}
.toother {
  height: 30px;

  .toregist {
    float: left;
  }
  .tologin {
    float: right;
  }
}
.getcode{
  margin-bottom: 20px;
}
@media screen and (max-width:768px) {
    .resetPwd-container .login-form {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    margin-top: 0;
    border-radius: 0;
    padding-top: 140px;
    padding: 140px 30px 0 30px;
    background-color: #E0E0E0;

  }
  .getcode .el-form-item{
    width: 57vw;
    .el-input{
      width: 100%;
    }
  }
  .getcode {
    display: flex;
  }
}
</style>
