<!--
 * @Author: mingliang.zhu
 * @Date: 2020-12-09 15:18:59
 * @LastEditors: mingliang.zhu
 * @LastEditTime: 2020-12-15 10:54:22
 * @Description: 
-->
<template>
    <B-dialog title="关联公司" :visible="dialogVisible" width="1330px" @close="close">
        <div class="sub-title">法定代表人</div>
        <div v-loading="loading">
            <el-table stripe :data="data.legalRepresentative" class="br-table" align="center">
                <el-table-column label="序号" type="index" width="50"  show-overflow-tooltip />                
                <el-table-column label="企业名称" prop="bizName" min-width="150"  show-overflow-tooltip />
                <el-table-column label="法人姓名" prop="typeValue" min-width="150"  show-overflow-tooltip />
                <el-table-column label="注册资本" prop="registCapi" min-width="150"  show-overflow-tooltip /> 
                <el-table-column label="地区" prop="province" min-width="150"  show-overflow-tooltip />
                <el-table-column label="行业" prop="industry" min-width="150"  show-overflow-tooltip />                     
                <el-table-column label="经营状态" prop="detailStatus" min-width="150"  show-overflow-tooltip />
            </el-table>
            <div class="sub-title">股东</div>
            <el-table stripe :data="data.shareholder" class="br-table" align="center">
                <el-table-column label="序号" type="index" width="50"  show-overflow-tooltip />                     
                <el-table-column label="企业名称" prop="bizName" min-width="150"  show-overflow-tooltip />                     
                <el-table-column label="持股比例" prop="typeValue" min-width="150"  show-overflow-tooltip />                     
                <el-table-column label="注册资本" prop="registCapi" min-width="150"  show-overflow-tooltip />                     
                <el-table-column label="地区" prop="province" min-width="150"  show-overflow-tooltip />                     
                <el-table-column label="行业" prop="industry" min-width="150"  show-overflow-tooltip />                     
                <el-table-column label="法定代表人" prop="operName" min-width="150"  show-overflow-tooltip />                     
                <el-table-column label="经营状态" prop="detailStatus" min-width="150"  show-overflow-tooltip />
            </el-table>
            <div class="sub-title">任职</div>
            <el-table stripe :data="data.holdOffice" class="br-table" align="center">
                <el-table-column label="序号  " type="index" width="60"  show-overflow-tooltip />                     
                <el-table-column label="企业名称" prop="bizName" min-width="150"  show-overflow-tooltip />                     
                <el-table-column label="职位" prop="typeValue" min-width="150"  show-overflow-tooltip />                     
                <el-table-column label="注册资本" prop="registCapi" min-width="150"  show-overflow-tooltip />                     
                <el-table-column label="地区" prop="province" min-width="150"  show-overflow-tooltip />                     
                <el-table-column label="行业" prop="industry" min-width="150"  show-overflow-tooltip />                     
                <el-table-column label="法定代表人" prop="operName" min-width="150"  show-overflow-tooltip />                     
                <el-table-column label="经营状态" prop="detailStatus" min-width="150"  show-overflow-tooltip />
            </el-table>
        </div>
        <template slot="footer">
            <el-button class="br-btn-large" @click="close">关 闭</el-button>
        </template>
    </B-dialog>
</template>
<script lang="ts">
import { namespace } from "vuex-class";
import { Vue, Component, Prop } from "vue-property-decorator";

const enterpriseInfoSearch = namespace("enterpriseInfoSearch");

import { BDialog } from "@/components";

@Component({
    name: "associat-dialog",
    components: {
        BDialog,
    },
})
export default class Dialog extends Vue {
    @Prop(String) isCreate;
    @enterpriseInfoSearch.Action associatedFN;
    @enterpriseInfoSearch.Action associatedUnCreatedFN;
    public dialogVisible: boolean = false;
    public loading: boolean = false;
    public data: any = {
        legalRepresentative: [],
        shareholder: [],
        holdOffice: [],
    };
    open(row) {
        if (this.isCreate == "1") {
            let params = {
                custId: row.custId,
                keyNo: row.keyNo,
            };
            this.loading = true;
            this.associatedFN(params)
                .then((res) => {
                    this.data = res;
                })
                .finally(() => (this.loading = false));
        } else {
            let params = {
                corpName: row.corpName,
                executiveName: row.employeName,
            };
            this.loading = true;
            this.associatedUnCreatedFN(params)
                .then((res) => {
                    this.data = res;
                })
                .finally(() => (this.loading = false));
        }
        this.$nextTick(() => (this.dialogVisible = true));
    }

    close() {
        this.dialogVisible = false;
    }
}
</script>
