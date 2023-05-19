<!--
 * @Author: jing.li
 * @Date: 2020-06-04 17:43:24
 * @LastEditors: jing.li
 * @LastEditTime: 2020-06-05 13:50:22
 * @Description: 标题组件
--> 
<template>
    <div class="titles">
        <i :class="iconName" :style="iconStyle" v-if="iconName"></i>
        <span class="titles_leftBorder" :style="fontSize?newtitlesLeftBorderStyle:''" v-if="!iconName"></span>
        <span class="titles_titleContent" :style="titleContentStyle">
            <slot></slot>
        </span>
    </div>
</template>

<script lang="ts">

/**
 * 可选传入参数：iconName fontSize
 * iconName：图标的名称
 * fontSize：字体大小
**/ 

import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Title extends Vue {
    @Prop(String) private iconName: string | undefined;
    @Prop(String) private fontSize: string | undefined;
    private iconStyle: any | undefined = {
        fontWeight: "bold",
        fontSize: Number(this.fontSize) + 6 + "px",
        marginRight: "-10px",
        verticalAlign: "top"
    };
    private titleContentStyle: any | undefined = {
        fontWeight: "bold",
        fontSize: this.fontSize + "px",
        marginLeft: "10px"
    };
    private newtitlesLeftBorderStyle:string|undefined="height:"+this.fontSize+"px !important"
}
</script>


<style lang="scss" scope>

</style>