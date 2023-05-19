<!--
 * @Author: mingliang.zhu
 * @Date: 2020-12-10 09:39:43
 * @LastEditors: mingliang.zhu
 * @LastEditTime: 2020-12-10 12:01:08
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
    name: "orgManage",
    components: {
        Grid,
        Search,
    },
})
export default class orgManage extends Vue {}
</script>