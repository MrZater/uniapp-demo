### 组件介绍

对element-ui的el-input进行二次封装 

#### 主要封装项

 input默认追加的属性有placeholder：“请输入”、trim、默认type为text、默认显示长度限制为20、考虑传入正则，正则提示, 默认可清除（如果form中有正则有提示，冲突怎么办）
textarea考虑封装，默认显示长度限制、限制输入字数默认为200，默认行数：3行、列数，可传入更改行数与列数

#### 参数介绍

``` javascript
/**
 * @param {string} placeholder - input提示，默认显示为 "请输入"
 * @param {string} type - input的类型，默认为 "text"
 * @param {string|boolean} maxlength - input的最大可以输入的长度，默认为 20
 * @param {number} rows - 当input的type="textarea"时使用 可以改变textarea的行数，默认为 3
 * @param {string} size - input的大小(type!="textarea") 可以传入  medium / small / mini ,默认为 small
 * @param {array|object} rules - 可以传入正则类型的规则 传入的格式如下:
 * rules=[ {
 *           type: "RegExp",
 *           reg:"^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$",
 *           message: "请输入正确的邮箱"
 *       }]
 * 其他element-ui中满足el-input的属性 也可传入
 */
```

#### 组件内部设置属性
    show-word-limit（是否显示输入字数统计）：只要maxlength不是false，在本组件内部设置为默认显示，其他注意事项与element-ui相同。
    tirm： 组件输入的值默认去除空格。

#### 使用方式

1. 引入

   import { Binput } from "@/components"; 

2. 注册

   @Component({

    components: {

   ​     Binput

    }

   })

3. 模板调用

``` html
   <Binput size="medium" />
   <Binput placeholder="请输入内容" />
   <Binput :maxlength="false" />
   <Binput :maxlength="100" />
   <Binput disabled />
   <Binput type="textarea" />
   <Binput type="textarea" :rows="4" />
   <!-- 组件自身可做正则类型的校验 -->
   <Binput :rules="rules" />
   <!-- 带form校验的表单 -->
   <el-form :model="numberValidateForm" :inline="true" ref="numberValidateForm">
       <el-form-item prop="info" :rules="[{ required: true, message: '必填', trigger: 'blur' }]">
           <Binput @input="val=>handleVal(val,'numberValidateForm','info')" v-model="numberValidateForm.info" />
       </el-form-item>
       <el-form-item>
           <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
           <el-button @click="resetForm('numberValidateForm')">重置</el-button>
       </el-form-item>
   </el-form>
   <!-- form和组件本身都有校验 -->
   <el-form :model="validateForm" :inline="true" ref="validateForm">
       <el-form-item prop="info" :rules="[{ required: true, message: '必填', trigger: 'blur' }]">
           <Binput v-model="validateForm.info" :rules="rules" @input="val=>handleVal(val,'validateForm','info')" @valid="getInputValid" />
       </el-form-item>
       <el-form-item>
           <el-button type="primary" @click="submitForm('validateForm')">提交</el-button>
           <el-button @click="resetForm('validateForm')">重置</el-button>
       </el-form-item>
   </el-form>
```
