<!--
 * @Author: zhiqiang.qiao
 * @Date: 2020-05-25 13:48:34
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-05-27 15:40:29
 * @Description: 分页案例
 -->
<template>
    <div class="template-container">
        <content-wrapper>
            <template slot="grid">
<!--                <h2 class="title">下载案例</h2>-->
<!--                <div>-->
<!--                    <el-button type="primary" @click="download1">下载-1</el-button>-->
<!--                    <el-button type="primary" @click="download2">下载-2 支持post</el-button>-->
<!--                </div>-->
<!--                <div class="mT20">-->
<!--                    <h2 class="title">自动上传</h2>-->
<!--                    <el-upload ref="upload" drag :limit="3" :on-exceed="handleExceed" multiple :action="`${baseUrl}/uploadURL`" :http-request="uploadSectionFile" :before-upload="(event, file, fileList)=>beforeUpload(file)" :on-remove="(file, fileList)=>removeFile(file,fileList)">-->
<!--                        <i class="el-icon-upload"></i>-->
<!--                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>-->
<!--                        <div class="el-upload__tip" slot="tip">只能上传".csv"文件[该方法自动上传]</div>-->
<!--                    </el-upload>-->
<!--                </div>-->
                <div class="mT20">
<!--                    <h2 class="title">手动上传</h2>-->
                    <el-upload class="upload-demo" ref="upload" :action="`${baseUrl}/uploadURL`" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </div>

            </template>
        </content-wrapper>
    </div>
</template>

<script lang="ts">
import axios from "axios";
import { downloadFile } from "@/utils/useStore";
import { Vue, Component } from "vue-property-decorator";
import { namespace, State } from "vuex-class";
import ContentWrapper from "@/components/ContentWrapper.vue";
import { now } from "moment";

@Component({
    components: {
        "content-wrapper": ContentWrapper
    }
})
export default class uploadAndDownload extends Vue {
    public baseUrl = "http://192.163.1.1";
    public samUploadfile = {
        uploadName: "",
        fileSize: 0,
        fileType: ""
    };
    public fileList = [];

    // 普通 get 下载 - 1
    download1() {
        let a = 1;
        let b = 2;
        let toUrl =
            "/check/storeReport/getStoreCheckReport?storeCode=" +
            a +
            "&checkBatch=" +
            b;
        let submitUrl = `${this.baseUrl}${toUrl}`;
        window.location.href = encodeURI(submitUrl);
    }
    // 支持post下载
    download2() {
        let toUrl = "/export/web?id=123";
        let submitUrl = `${this.baseUrl}${toUrl}`;
        let params = {
            url: submitUrl, // 请求地址
            method: "get", //请求方式 get / post
            params: {
                // 请求参数
                id: "123"
            },
            filename: this.$moment().format("YYYY-MM-DD HH:mm:ss"), // 文件名
            type: "csv" // 文件类型
        };
        downloadFile(params);
    }

    // 上传文件
    beforeUpload(file) {
        console.log("上传之前钩子函数", file);
    }
    uploadSectionFile(fileInfo) {
        this.samUploadfile.uploadName = fileInfo.file.name;
        this.samUploadfile.fileSize = fileInfo.file.size;
        this.samUploadfile.fileType = fileInfo.file.name.substring(
            fileInfo.file.name.length,
            fileInfo.file.name.lastIndexOf(".")
        );
        console.log(this.samUploadfile);
        const isCSV =
            fileInfo.file.name.substring(
                fileInfo.file.name.length,
                fileInfo.file.name.lastIndexOf(".")
            ) === ".csv";
        if (!isCSV) {
            this.$refs.upload["clearFiles"]();
            return this.$message({
                type: "error",
                message: `上传文件只能是 CSV 格式!`
            });
        }
        // 若使用表单提交
        const form = new FormData();
        form.append("fileName", this.samUploadfile.uploadName);
        form.append("fileType", this.samUploadfile.fileType);
        console.log("表单内容", form);
        /**
         * 此处添加上传文件 axios 请求即可
         */
        this.$message({
            type: "success",
            message: `上传成功`
        });
    }
    removeFile(file, fileList) {
        this.$message({
            type: "success",
            message: `删除成功`
        });
    }
    // 手动上传函数
    handleExceed(files, fileList) {
        this.$message({
            type: "warning",
            message: `当前限制选择 3 个文件，本次选择了 ${
                files.length
            } 个文件，共选择了 ${files.length + fileList.length} 个文件`
        });
    }
    submitUpload() {
        this.$refs.upload["submit"]();
    }
    handleRemove(file, fileList) {
        console.log(file, fileList);
    }
    handlePreview(file) {
        console.log(file);
    }
}
</script>

<style scoped lang="scss">
.mT20 {
    margin-top: 20px;
}
.title {
    margin-bottom: 20px;
    font-size: 14px;
}
</style>
