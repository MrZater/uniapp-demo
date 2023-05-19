<!--
 * @Author: mingliang.zhu
 * @Date: 2020-12-09 15:18:59
 * @LastEditors: mingliang.zhu
 * @LastEditTime: 2020-12-15 19:54:17
 * @Description: 
-->
<template>
    <renderBtn code="user_manage_sel">
        <search-wrapper>
            <template slot="default">
                <el-form :inline="true" :model="formParams" label-width="65px" ref="searchForm" size="small">
                    <el-form-item class="br-form-item-label" label="字典名称" prop="value">
                        <el-input class="br-input" placeholder="请输入字典名称" v-model.trim="formParams.value"></el-input>
                    </el-form-item>
                    <el-form-item class="br-form-item-label" label="字典状态" prop="disabled">
                        <el-select v-model="formParams.disabled" placeholder="请选择字典状态" filterable class="br-select">
                            <el-option v-for="(item,index) in $select('costStatus')" :key="index" :value="item.value" :label="item.text"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </template>
            <template #btn>
                <renderBtn code="dic_manage_sel">
                    <el-button class="br-btn template-search-btn" type="primary" @click="search">查询</el-button>
                    <el-button class="br-btn template-reset-btn" @click="resetForm">重置</el-button>
                </renderBtn>
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
    @dictionaryManage.Action queryList;
    @dictionaryManage.State searchData;

    public formParams = {
        value: "",
        disabled: "",
    };
    defaultProps = {
        children: "children",
        label: "label",
    };

    created() {
        this.queryList(this.searchData);
    }

    search(): void {
        let params = {
            ...this.searchData,
            ...this.formParams,
        };
        this.queryList(params);
    }

    resetForm(): void {
        this.$refs.searchForm["resetFields"]();
    }
}
</script>

<style scoped lang="scss">
</style>