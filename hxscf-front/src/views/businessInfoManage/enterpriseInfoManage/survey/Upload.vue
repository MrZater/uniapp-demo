/*
 * @Author: mingliang.zhu 
 * @Date: 2020-12-01 10:38:29 
 * @Last Modified by: mingliang.zhu
 * @Last Modified time: 2021-02-24 16:03:51
 */
<template>
    <div class="mT20">
        <el-upload ref="upload" drag multiple list-type="picture-card" :file-list="fileList" :auto-upload="false" :on-change="onFileChange" action="">
            <i slot="default">
                <i class="el-icon-upload"></i>
                <i class="el-upload__text">将文件拖到此处，或<em>点击上传</em></i>
            </i>
            <div slot="file" slot-scope="{file}">
                <span class="title">{{file.name}}</span>
                <img v-if="file.noUpload" class="el-upload-list__item-thumbnail" src="@/assets/images/file.png" alt="">
                <img v-else class="el-upload-list__item-thumbnail" src="@/assets/images/file.png" alt="">
                <span class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                        <i class="el-icon-zoom-in"></i>
                    </span>
                    <span v-if="!disabled && file.noUpload" class="el-upload-list__item-delete" @click="handleDownload(file)">
                        <i class="el-icon-download"></i>
                    </span>
                    <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file,fileList)">
                        <i class="el-icon-delete"></i>
                    </span>
                </span>
            </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class uploadAndDownload extends Vue {
    @Prop({ default: () => [], type: Array }) fileList;
    public deleteFileInfoList: any[] = [];
    public dialogImageUrl: string = "";
    public dialogVisible: boolean = false;
    public disabled: boolean = false;

    onFileChange(file, fileList) {
        /* 文件大小限制：10MB */
        const isLt10M = file.size < 1024 * 1024 * 10;
        const isOnly =
            fileList.filter((item) => item.name === file.name).length === 1;
        if (!isLt10M) {
            this.$message({
                type: "error",
                message: "上传图片大小不能超过 10MB!",
            });
            fileList.splice(-1, 1);
        }

        if (!isOnly) {
            this.$message({
                type: "error",
                message: `已存在名称为${file.name}的文件！`,
            });
            fileList.splice(-1, 1);
        }

        if (isLt10M && isOnly) {
            this.$emit("update:fileList", fileList);
        }
    }

    handleRemove(file, fileList) {
        this.$confirm(`确定移除 ${file.name}？`, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
        })
            .then(() => {
                let targetList: any = [];
                if (file.noUpload) {
                    targetList = fileList.filter(
                        (item) => item.keyNo !== file.keyNo
                    );
                    this.deleteFileInfoList.push(file.keyNo);
                } else {
                    targetList = fileList.filter(
                        (item) => item.uid !== file.uid
                    );
                }
                this.$emit("update:fileList", targetList);
            })
            .catch(() => {
                return false;
            });
    }
    handlePictureCardPreview(file) {
        if (file.noUpload) {
            this.dialogImageUrl =
                this.$baseurl + "/loanFile/getFile?fileName=" + file.url;
        } else {
            this.dialogImageUrl = file.url;
        }

        this.$nextTick(() => {
            this.dialogVisible = true;
        });
    }
    handleDownload(file) {
        if (file.noUpload) {
            window.location.href = `/approve/loanFile/download?fileName=${file.url}`;
        }
    }
}
</script>

<style scoped lang="scss">
.mT20 {
    margin-top: 20px;
}

.title {
    color: #303133;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
/deep/ .el-upload--picture-card {
    border: none !important;
    .el-upload-dragger {
        width: 306px;
        height: 148px;
        .el-upload__text {
            vertical-align: top;
        }
    }
}
/deep/ .el-upload-list--picture-card .el-upload-list__item {
    border: none;
}
</style>
