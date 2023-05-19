<template>
    <el-dialog class="br-dialog" title="详情" :visible.sync="dialogVisible" width="850px" @close="reset" :close-on-click-modal="false">
        <el-form ref="forms" :model="data" label-width="120px" disabled size="small" v-loading="loading">
            <el-form-item class="br-form-item-label" label="异常事件主题">
                <span class="content">{{data.abnormalEvent.abnormalTheme}}</span>
            </el-form-item>
            <el-row>
                <el-col :span="8">
                    <el-form-item class="br-form-item-label" label="异常类型">
                        <span class="content">{{handleType(data.abnormalEvent.abnormalType)}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item class="br-form-item-label" label="企业名称">
                        <span class="content">{{data.abnormalEvent.companyName}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item class="br-form-item-label" label="组织名称">
                        <span class="content">{{data.abnormalEvent.orgName}}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item class="br-form-item-label" label="创建人">
                        <span class="content">{{data.abnormalEvent.createUser}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item class="br-form-item-label" label="创建时间">
                        <span class="content">{{data.abnormalEvent.createTime | time}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item class="br-form-item-label" label="状态">
                        <span class="content">{{$code("abnormalStatus",data.abnormalEvent.abnormalStatus)}}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item class="br-form-item-label" label="异常事件描述">
                <el-form-item class="br-form-item-label">
                    <span class="content">{{data.abnormalEvent.abnormalDescription}}</span>
                </el-form-item>
            </el-form-item>
            <el-form-item class="br-form-item-label" label="附件" prop="abnormalAnnexesList" disabled>
                <el-upload class="upload-show-box" ref="upload" action="" :on-preview="onPreview" :file-list="data.abnormalAnnexesList" :auto-upload="false" multiple>
                    <el-button slot="trigger" size="small" type="primary br-btn">选取文件</el-button>
                </el-upload>
            </el-form-item>
            <div v-for="(item,index) in data.abnormalTrackList" :key="index">
                <el-row>
                    <el-col :span="8">
                        <el-form-item class="br-form-item-label" label="异常事件跟踪说明">
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item class="br-form-item-label" label="跟踪人">
                            {{item.trackUserName}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item class="br-form-item-label" label="跟踪时间">
                            {{item.trackDate | time }}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item class="br-form-item-label">
                            <el-input type="textarea" disabled :autosize="{ minRows: 6, maxRows: 8 }" class="br-textarea__full" v-model.trim="item.trackingInstructions">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>

        </el-form>
        <el-form ref="forms" :model="formData" :rules="rules" label-width="120px" size="small" v-loading="loading">
            <el-form-item class="br-form-item-label" label="异常事件跟踪说明" prop="track">
                <el-input type="textarea" show-word-limit maxlength="500" :autosize="{ minRows: 6, maxRows: 8 }" class="br-textarea__full" v-model.trim="data.track" placeholder="请输入异常事件跟踪说明">
                </el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="br-dialog-footer">
            <el-button type="danger" class="br-btn-large" @click="onClose" :loading="btnloading">关闭</el-button>
            <el-button type="primary" class="br-btn-large" @click="onSave" :loading="btnloading">保存</el-button>
            <el-button class="br-btn-large" @click="dialogVisible = false">取消</el-button>
        </div>
    </el-dialog>
</template>
<script lang="ts">
import { namespace } from "vuex-class";
import { Vue, Component } from "vue-property-decorator";
const abnormalEvent = namespace("abnormalEvent");

@Component({})
export default class Dialog extends Vue {
    @abnormalEvent.State eventTypeOption; //通知类型
    @abnormalEvent.Action queryDetail;
    @abnormalEvent.Action queryAddTrack;
    @abnormalEvent.Action queryCloseTrack;
    @abnormalEvent.Action queryEventList;

    data: any = {
        abnormalAnnexesList: [],
        abnormalEvent: {},
        abnormalTrackList: [],
    };
    formData: any = {
        track: "",
    };
    abnormalId: any = [];
    loading: boolean = false;
    btnloading: boolean = false;
    dialogVisible: boolean = false;
    rules = {
        track: [
            {
                required: true,
                message: "请输入异常事件跟踪说明",
                trigger: "blur",
            },
        ],
    };
    init(row) {
        this.abnormalId = row.abnormalId;
        this.dialogVisible = true;
        this.loading = true;
        this.queryDetail({ abnormalId: this.abnormalId })
            .then((res) => {
                res.abnormalAnnexesList.forEach((item) => {
                    item.name = item.annexName;
                });
                this.$set(this, "data", res);
            })
            .finally(() => (this.loading = false));
    }
    reset() {
        let $ele: any = this.$refs["forms"];
        $ele.resetFields();
        this.$set(this.data, "abnormalAnnexesList", []);
    }
    // 关闭
    onClose() {
        let params = {
            abnormalId: this.abnormalId,
        };
        this.queryCloseTrack(params).then((res) => {
            this.onSuccess(res);
        });
    }
    // 提交
    onSave() {
        let $ele: any = this.$refs["forms"];
        $ele.validate((valid) => {
            if (valid) {
                let params = {
                    abnormalId: this.abnormalId,
                    track: this.formData.track,
                };
                this.btnloading = true;
                this.queryAddTrack(params)
                    .then((msg) => {
                        this.onSuccess(msg);
                    })
                    .finally(() => (this.btnloading = false));
            } else {
                return false;
            }
        });
    }
    onSuccess(msg) {
        this.$message({
            type: "success",
            message: msg,
        });
        this.dialogVisible = false;
        this.queryEventList({
            pageNum: 1,
            pageSize: 10,
        });
    }

    // 文件下载
    onPreview(file) {
        window.location.href = `/approve/abnormalEventManagement/downloadAnnex/${file.annexId}`;
    }

    // 翻译异常类型
    handleType(code) {
        let target = this.eventTypeOption.find(
            (item) => item.dictCode === code
        );
        return target ? target.dictName : "-";
    }
}
</script>

<style lang="scss">
.content {
    font-size: 12px;
    color: #637280;
}
.upload-show-box {
    /deep/ .el-upload {
        display: none;
    }
}
</style>
