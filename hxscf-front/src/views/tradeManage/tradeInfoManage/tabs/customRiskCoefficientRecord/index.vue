/*
 * @Author: mingliang.zhu 
 * @Date: 2021-01-08 14:24:19 
 * @Last Modified by: mingliang.zhu
 * @Last Modified time: 2021-01-14 11:12:55
 */
<template>
    <div class="template-container">
        <Search></Search>
        <Grid></Grid>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import Search from "./Search.vue";
import Grid from "./Grid.vue";
@Component({
    name: "creditTemplate213",
    components: {
        Search,
        Grid,
    },
})
export default class index extends Vue {}
</script>

<style scoped lang="scss">
</style>