<!--
 * @Author: xiaoyu.ren
 * @Date: 2019-01-24 10:27:34
 * @LastEditors: weiwei.xue
 * @LastEditTime: 2020-12-10 15:56:08
 * @Description: 
 -->
<template>
    <div class="template-container">
        <Search></Search>
        <Grid></Grid>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Grid from "./Grid.vue";
import Search from "./Search.vue";
@Component({
    name: "creditNotice",
    components: {
        Grid,
        Search,
    },
})
export default class creditNotice extends Vue {}
</script>

<style scoped lang="scss">
</style>
