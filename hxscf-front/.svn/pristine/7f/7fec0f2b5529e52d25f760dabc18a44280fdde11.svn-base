/*
 * @Author: mingliang.zhu 
 * @Date: 2020-12-01 10:38:29 
 * @Last Modified by: mingliang.zhu
 * @Last Modified time: 2021-01-22 09:39:01
 */
<template>
    <div class="mT20">
        <el-upload ref="upload" disabled list-type="picture-card" :file-list="fileList" :auto-upload="false" action="">
            <div slot="file" slot-scope="{file}">
                <span class="title">{{file.fileName}}</span>
                <img class="el-upload-list__item-thumbnail" src="@/assets/images/file.png" alt="">
                <span class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-preview" @click="onPreview(file)">
                        <i class="el-icon-zoom-in"></i>
                    </span>
                    <span class="el-upload-list__item-delete" @click="onDownload(file)">
                        <i class="el-icon-download"></i>
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

    public dialogImageUrl: string = "";
    public dialogVisible: boolean = false;

    onPreview(file) {
        this.dialogImageUrl =
            this.$baseurl + "/loanFile/getFile?fileName=" + file.url;

        this.$nextTick(() => {
            this.dialogVisible = true;
        });
    }
    onDownload(file) {
        window.location.href = `/approve/loanFile/download?fileName=${file.url}`;
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
    cursor: default;
}
/deep/ .el-upload-list--picture-card .el-upload-list__item {
    border: none;
}
</style>
