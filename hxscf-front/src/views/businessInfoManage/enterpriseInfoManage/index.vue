<template>
    <div class="template-container">
        <Search />
        <Grid />
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Search from "./search.vue";
import Grid from "./Grid.vue";

@Component({
    name: "enterpriseInfoManage",
    components: {
        Search,
        Grid,
    },
})
export default class Index extends Vue {}
</script>
