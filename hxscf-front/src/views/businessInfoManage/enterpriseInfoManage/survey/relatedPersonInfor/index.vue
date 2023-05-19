<template>
    <ContentWrapper>
        <template slot="title">
            关联人信息
        </template>
        <template slot="extra-btn">
            <el-button type="primary" class="br-btn" @click="onAdd(formData.list)">新增</el-button>
        </template>
        <template slot="grid">
            <el-form :model="formData" :rules="rules" ref="forms" size="small">
                <el-table stripe :data="formData.list" class="br-table" border>
                    <el-table-column label="姓名" prop="associatedName">
                        <template slot-scope="scope">
                            <el-link v-if="scope.row.isSave" type="primary" :underline="false" @click="onDetail(scope.row)">{{ scope.row.associatedName }}</el-link>
                            <el-form-item v-else :prop="'list.' + scope.$index + '.associatedName' " class="br-form-item-label" :rules="rules.code1">
                                <el-input v-model.trim="scope.row.associatedName" class="br-input"></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="身份证号" prop="identityId" min-width="150">
                        <template slot-scope="scope">
                            <span v-if="scope.row.isSave">{{ scope.row.identityId }}</span>
                            <el-form-item v-else :prop="'list.' + scope.$index + '.identityId' " class="br-form-item-label" :rules="rules.code1">
                                <el-input v-model.trim="scope.row.identityId" class="br-input"></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="手机号码" prop="phone" min-width="120">
                        <template slot-scope="scope">
                            <span v-if="scope.row.isSave">{{ scope.row.phone }}</span>
                            <el-form-item v-else :prop="'list.' + scope.$index + '.phone' " class="br-form-item-label" :rules="rules.code1">
                                <el-input v-model.trim="scope.row.phone" class="br-input"></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="说明" prop="remark" min-width="120">
                        <template slot-scope="scope">
                            <span v-if="scope.row.isSave">{{ scope.row.remark }}</span>
                            <el-form-item v-else :prop="'list.' + scope.$index + '.remark' " class="br-form-item-label">
                                <el-input v-model.trim="scope.row.remark" class="br-input"></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="120px">
                        <template slot-scope="scope">
                            <el-button type="text" @click="onSave(scope.row)">{{ scope.row.isSave == true ? '编辑' : '保存' }}</el-button>
                            <el-popconfirm title="确认删除该数据吗？" @onConfirm="onDelete(scope.$index,formData.list)" style="margin-left:10px">
                                <el-button type="text" size="mini" slot="reference">删除</el-button>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form>
        </template>
        <Detail ref="detail" />
    </ContentWrapper>

</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import ContentWrapper from "@/components/ContentWrapper.vue";
import Detail from "./detail.vue"; //关联人信息
import { idCardRegExp, phoneRegExp } from "@/utils/validate";
import cloneDeep from "lodash.clonedeep";
@Component({
    components: {
        ContentWrapper,
        Detail,
    },
})
export default class BaseInfo extends Vue {
    @Prop({ default: () => {}, type: Object }) bizApplyMap;
    @Prop({ default: () => [], type: Array }) bizRelevancePerson;
    @Watch("bizRelevancePerson", { deep: true })
    onDataChange(arr) {
        if (arr.length) {
            let list = cloneDeep(arr);
            list.forEach((item) => (item.isSave = true));
            this.$set(this.formData, "list", list);
        }
    }
    public formData: any = {
        list: [
            // {
            //     associatedName: "张书斌",
            //     identityId: "41272719820210301X",
            //     phone: "18348888943",
            //     remark: "测试信息",
            // },
        ],
    };
    public rules = {
        code1: [{ required: true, message: "请输入", trigger: "blur" }],
    };
    // 添加
    onAdd(list) {
        list.push({});
    }
    // 查看关联人信息
    onDetail(row) {
        let params: any = {};
        if (row.keyNo) {
            // 已创建
            params = {
                custId: this.bizApplyMap.custId,
                surveyId: this.bizApplyMap.surveyId,
                keyNo: row.keyNo || "",
                custType: "2",
            };
        } else {
            // 未创建
            params = {
                creditCode: this.bizApplyMap.creditCode,
                bizName: this.bizApplyMap.bizName,
                associatedName: row.associatedName,
                identityId: row.identityId,
                phone: row.phone,
            };
        }
        let oDom: any = this.$refs["detail"];
        oDom.initData(params);
    }

    // 保存、编辑
    onSave(row) {
        if (!row.isSave) {
            if (!row.associatedName) {
                this.$message({
                    type: "error",
                    message: "请填写姓名！",
                });
                return;
            }
            if (!idCardRegExp(row.identityId)) {
                this.$message({
                    type: "error",
                    message: "请保证输入的身份证号码格式正确！",
                });
                return;
            }
            if (!phoneRegExp(row.phone)) {
                this.$message({
                    type: "error",
                    message: "请保证输入的手机号码格式正确！",
                });
                return;
            }
        }
        this.$set(row, "isSave", !row.isSave);
    }
    // 删除
    onDelete(index, rows) {
        rows.splice(index, 1);
    }
}
</script>
<style lang="scss" scoped>
.template-container .template-content {
    padding: 15px 0px;
}
</style>