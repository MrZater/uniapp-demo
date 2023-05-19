/*
 * @Author: mingliang.zhu 
 * @Date: 2020-12-01 10:38:29 
 * @Last Modified by: mingliang.zhu
 * @Last Modified time: 2021-01-27 18:12:21
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
                <img class="el-upload-list__item-thumbnail" src="@/assets/images/file.png" alt="">
                <span class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-preview" @click="onPreview(file)">
                        <i class="el-icon-zoom-in"></i>
                    </span>
                    <span class="el-upload-list__item-delete" @click="onDelete(file,fileList)">
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
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

@Component({})
export default class uploadAndDownload extends Vue {
    @Prop({ default: () => {}, type: Array }) propData;
    @Watch("propData", { deep: true })
    onPropData(val) {
        if (val) {
            this.fileList = [...val];
        }
    }
    public fileList: any = [];
    public deleteUrls: any = [];
    public dialogImageUrl: string = "";
    public dialogVisible: boolean = false;

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
            this.fileList = fileList;
        }
    }

    onDelete(file, fileList) {
        this.$confirm(`确定移除 ${file.name}？`, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
        })
            .then(() => {
                if (file.isFromServer) {
                    this.deleteUrls.push(file.url);
                }

                let targetList: any = [];
                targetList = fileList.filter((item) => item.uid !== file.uid);
                this.fileList = targetList;
            })
            .catch(() => {
                return false;
            });
    }
    onPreview(file) {
        this.dialogImageUrl = file.url;
        this.$nextTick(() => {
            this.dialogVisible = true;
        });
    }
    // 供父组件使用
    handleParams() {
        return {
            fileList: this.fileList,
            deleteUrls: this.deleteUrls,
        };
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
