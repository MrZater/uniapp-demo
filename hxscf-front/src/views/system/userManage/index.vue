<!--
 * @Author: mingliang.zhu
 * @Date: 2020-12-09 15:18:59
 * @LastEditors: mingliang.zhu
 * @LastEditTime: 2020-12-12 20:01:12
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
import Search from "./Search.vue";
import Grid from "./Grid.vue";
@Component({
    name: "userManage",
    components: {
        Search,
        Grid,
    },
})
export default class userManage extends Vue {}
</script>

<style scoped lang="scss">
</style>