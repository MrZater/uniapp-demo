<!--
 * @Author: mingliang.zhu
 * @Date: 2021-01-14 11:08:37
 * @LastEditors: mingliang.zhu
 * @LastEditTime: 2021-01-14 11:08:37 
 * @Description: 行业调查模板
-->

<template>
    <div class="template-container">
        <Search flag="2"></Search>
        <Grid flag="2" :list="industlist"></Grid>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import { namespace } from "vuex-class";

const credit = namespace("credit");

import Search from "../credit/Search.vue";
import Grid from "../credit/Grid.vue";
@Component({
    name: "templateIndustry",
    components: {
        Search,
        Grid,
    },
})
export default class index extends Vue {
    @credit.State industlist;
}
</script>

<style scoped lang="scss">
</style>