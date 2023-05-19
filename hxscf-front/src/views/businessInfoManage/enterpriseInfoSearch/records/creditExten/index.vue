<template>
    <el-tabs v-model="active" type="border-card">
        <el-tab-pane name="1">
            <span slot="label"><i class="el-icon-user"></i> 一般授信</span>
            <Search flag="0"></Search>
            <Grid flag="0"></Grid>
        </el-tab-pane>
        <el-tab-pane name="2">
            <span slot="label"><i class="el-icon-position"></i> 临时授信</span>
            <Search flag="1"></Search>
            <Grid flag="1"></Grid>
        </el-tab-pane>
        <el-tab-pane name="3">
            <span slot="label"><i class="el-icon-bell"></i> 授信统计</span>
            <SGrid></SGrid>
        </el-tab-pane>
    </el-tabs>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Search from "./generalOrTemporary/Search.vue";
import Grid from "./generalOrTemporary/Grid.vue";
import SGrid from "./statistical/Grid.vue";
@Component({
    components: {
        Search,
        Grid,
        SGrid
    },
})
export default class detailView extends Vue {
    active: string = "1";
}
</script>
<style lang="scss" scoped>
</style>