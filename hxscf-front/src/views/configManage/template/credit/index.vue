<template>
    <div class="template-container">
        <el-tabs v-model="activeName">
            <el-tab-pane label="通用模板" name="first">
                <Search flag="0"></Search>
                <Grid flag="0" :list="list"></Grid>
            </el-tab-pane>
            <el-tab-pane label="行业特殊信息模板" name="second">
                <Search flag="1"></Search>
                <Grid flag="1" :list="specialList"></Grid>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import { namespace } from "vuex-class";

const credit = namespace("credit");

import Search from "./Search.vue";
import Grid from "./Grid.vue";
@Component({
    name: "templateCredit",
    components: {
        Search,
        Grid,
    },
})
export default class index extends Vue {
    @credit.State list;
    @credit.State specialList;
    activeName: string = "first";
}
</script>

<style scoped lang="scss">
/deep/ .el-tabs__header {
    padding: 14px;
    background-color: #fff;
    // margin: 0;
}
</style>