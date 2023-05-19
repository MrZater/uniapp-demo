<template>
    <renderBtn code="enterprise_info_query_query">
        <div class="template-container">
            <contentWrapper>
                <el-form :model="searchForm" :rules="rules" ref="searchForm" @submit.native.prevent>
                    <el-form-item prop="corpName" class="br-form-item-label">
                        <el-autocomplete placeholder="请输入企业关键词" v-model.trim="searchForm.corpName" :fetch-suggestions="querySearch" :trigger-on-focus="false" @select="handleSelect" :debounce="300">
                            <template slot-scope="{ item }">
                                <div class="name">{{ item }}</div>
                            </template>
                        </el-autocomplete>
                        <el-button type="primary" icon="el-icon-search" @click="onSubmit">搜索</el-button>
                    </el-form-item>
                </el-form>
            </contentWrapper>
        </div>
    </renderBtn>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import contentWrapper from "@/components/ContentWrapper.vue";
import { namespace } from "vuex-class";
const enterpriseInfoSearch = namespace("enterpriseInfoSearch");

@Component({
    components: {
        contentWrapper,
    },
})
export default class Search extends Vue {
    @enterpriseInfoSearch.Action getListFN;
    @enterpriseInfoSearch.Action getFuzzyListFN;
    @enterpriseInfoSearch.Action saveSearchFN;
    rules = {
        corpName: {
            required: true,
            message: "请输入企业关键词",
            trigger: ["blur", "change"],
        },
    };
    public searchForm = {
        pageNum: 1,
        pageSize: 20,
        corpName: "",
    };
    querySearch(queryString, cb) {
        let queryStr = queryString.replace(/^\s*|\s*$/g, "");
        if (queryStr) {
            this.getFuzzyListFN(this.searchForm).then((res) => {
                cb(res.filter((item) => item));
            });
        } else {
            cb([]);
        }
    }
    handleSelect(item) {
        this.searchForm.corpName = item;
        this.onSubmit();
    }
    /*查询企业*/
    onSubmit() {
        let sForm: any = this.$refs["searchForm"];
        sForm.validate((valid) => {
            if (valid) {
                this.getListFN(this.searchForm);
                this.saveSearchFN(this.searchForm);
            } else {
                return false;
            }
        });
    }
}
</script>

<style scoped lang="scss">
.el-autocomplete {
    width: 85%;
    margin-right: 10px;
}
/deep/ .el-input-group__append {
    color: #fff;
    background-color: #409eff;
}

.card-content {
    min-height: 400px;

    .content-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 60px;
        border-bottom: 1px #ececec solid;

        span {
            font-size: 14px;
            font-weight: bold;
        }

        &:hover {
            background-color: #f5f7fa;
        }
    }
}
</style>
