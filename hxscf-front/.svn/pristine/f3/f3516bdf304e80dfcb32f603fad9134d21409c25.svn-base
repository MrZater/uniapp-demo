<!--
 * @Author: jing.li
 * @Date: 2020-06-04 17:43:24
 * @LastEditors: jing.li
 * @LastEditTime: 2020-06-13 13:44:09
 * @Description: 输入框组件封装
--> 
<template>
    <div class="BinputBox">
        <el-input
            :class="inputRulesStyle"
            ref="Binput"
            :placeholder="placeholder"
            :type="type"
            :maxlength="type=='textarea'?maxlength*10:maxlength"
            v-model.trim="content"
            :show-word-limit="(maxlength||type=='textarea')?true:false"
            :rows="type=='textarea'?rows:3"
            :size="size"
            v-bind="$attrs"
            v-on="$listeners"
            @input="handleVal"
            @blur="handleRules"
        />
        <div class="el-form-item__error">{{errMessage}}</div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from "vue-property-decorator";
//传入内部正则校验的参数验证
interface RulesParams {
    type: string;
    reg: string;
    message:string;
}
@Component
export default class Binput  extends Vue {
    @Prop({ default: "请输入", type: String }) private placeholder:string| undefined;
    @Prop({ default: "text", type: String }) private type: string | undefined;
    @Prop({ default: 20 || true }) private maxlength: number | boolean | undefined;
    @Prop({ default:'small',type:String}) private size: string | undefined;
    @Prop({ default: 3, type: Number }) private rows: number | undefined;
    @Prop({ default: ()=>[], type: Array}) private rules: Array<RulesParams> | undefined;
    @Prop() private value: any | undefined;
 
    private content: string | undefined = "";
    private inputRulesStyle: string | undefined = "b_input_nomal";
    private errMessage: string | undefined = "";

    @Watch("value")
    changeVal(newVal) {
        this.content = newVal;
    }
    @Watch("content")
    changeContent(newVal) {
        this.content = newVal;
    }
    
    created() {
        this.changeVal(this.value);
    }

    @Emit("input")handleVal(e) {}
    
    handleRules(e) {
        let val = e.target.value;
        if (this.rules) {
            // TODO 当前规则只能传入数组类型，object未进行处理
            if (Array.isArray(this.rules)) {
                let rules = [...this.rules];
                rules.map(r => {
                    this.vaildRules(r, val);
                });
            } else {
                this.vaildRules(this.rules, val);
            }
        }
    }
    vaildRules(rules, val) {
        if (rules.type !== "RegExp" || !rules.reg) return;
        let reg = new RegExp(rules.reg);
        if (!reg.test(val) && val) {
            console.log("rules-err");
            this.errMessage =rules.message;
            this.inputRulesStyle = "b_input_err";
            this.$emit("valid", false);
        } else {
            console.log("rules-pass");
            this.errMessage = "";
            this.inputRulesStyle = "b_input_nomal";
            this.$emit("valid", true);
        }
    }
}
</script>
<style lang="scss" scope>
$errColor: #f56c6c;
$passColor: #c0c4cc;
$focusColor: #409eff;
.BinputBox {
    position: relative;
    .b_input_err > input,
    .b_input_err > textarea {
        border-color: $errColor;
        &:hover {
            border-color: $errColor;
        }
        &:focus {
            border-color: $errColor;
        }
    }
    .b_input_nomal > input,
    .b_input_nomal > textarea {
        border-color: $passColor;
        &:hover {
            border-color: $passColor;
        }
        &:focus {
            border-color: $focusColor;
        }
    }
    .el-form-item__error {
        color: $errColor;
        font-size: 12px;
        line-height: 1;
        padding-top: 4px;
        position: absolute;
        top: 100%;
        left: 0;
    }
}
</style>