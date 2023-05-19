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
    name: "enterpriseCreditManage",
    components: {
        Search,
        Grid,
    },
})
export default class enterpriseCreditManage extends Vue {}
</script>

<style scoped lang="scss">
</style>