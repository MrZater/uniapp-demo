<template>
    <renderBtn code="user_manage_sel">
        <search-wrapper>
            <template slot="default">
                <el-form :inline="true" :model="selectForm" label-width="65px" ref="searchForm" size="small">
                    <el-form-item class="br-form-item-label" label="选项名称" prop="dictName">
                        <el-input class="br-input" placeholder="请输入选项名称" v-model.trim="selectForm.dictName"></el-input>
                    </el-form-item>
                    <el-form-item class="br-form-item-label" label="选项状态" prop="disabled">
                        <el-select v-model="selectForm.disabled" placeholder="请选择选项状态" filterable class="br-select">
                            <el-option v-for="(item,index) in $select('costStatus')" :key="index" :value="item.value" :label="item.text"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="br-btn template-search-btn" type="primary" @click="search">查询</el-button>
                        <el-button class="br-btn template-reset-btn" @click="resetForm">重置</el-button>
                    </el-form-item>
                </el-form>
            </template>
        </search-wrapper>
    </renderBtn>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import SearchWrapper from "@/components/SearchWrapper.vue";
import { namespace } from "vuex-class";
const dictionaryManage = namespace("dictionaryManage");
@Component({
    components: {
        "search-wrapper": SearchWrapper,
    },
})
export default class Search extends Vue {
    @dictionaryManage.Action editListFN;
    @dictionaryManage.State searchEditData;

    public selectForm = {
        dictName: "",
        disabled: "",
    };
    defaultProps = {
        children: "children",
        label: "label",
    };
    search(): void {
        let params = {
            ...this.searchEditData,
            ...this.selectForm,
            dicCode: this.$route.query.code,
        };
        this.editListFN(params);
    }
    resetForm(): void {
        this.$refs.searchForm["resetFields"]();
    }
}
</script>

<style scoped lang="scss">
</style>