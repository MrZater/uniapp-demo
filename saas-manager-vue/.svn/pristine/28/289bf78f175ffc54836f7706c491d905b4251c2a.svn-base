<template>
  <div
    v-loading="isLoading"
    class="upload-container"
    element-loading-text="接入代码生成中，请耐心等待"
    element-loading-spinner="el-icon-loading"
    :element-loading-custom-class="'loading'"
  >
    <div class="content">
      <el-row
        :gutter="20"
        class="row_one"
      >
        <el-col :span="3">
          <el-button
            type="primary"
            @click="openWord"
          >
            查看接入文档
          </el-button>
        </el-col>
        <el-col :span="3">
          <el-button
            type="primary"
            @click="updateLog"
          >
            查看更新日志
          </el-button>
        </el-col>
        <el-col :span="3">
          <el-button
            type="primary"
            @click="downloadDemo"
          >
            下载DEMO
          </el-button>
        </el-col>
      </el-row>
      <el-form
        ref="ruleForm"
        :model="SDKuploadForm"
        :rules="SDKuploadRules"
        label-width="120px"
      >
        <el-form-item
          label="操作系统"
          prop="os"
        >
          <el-radio-group
            v-model="SDKuploadForm.os"
            @change="changeOs"
          >
            <el-radio
              :label="1"
              border
            >
              Android
            </el-radio>
            <el-radio
              :label="0"
              border
            >
              IOS
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="当前版本"
          prop="version"
        >
          <el-select
            v-model="SDKuploadForm.versionId"
            placeholder="请选择当前版本"
            @change="handleVersionSelect"
          >
            <el-option
              v-for="item in versionOption"
              :key="item.id"
              :label="item.version"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="更新日期">
          <span>{{ updateTime }}</span>
        </el-form-item>
        <el-form-item
          label="选择广告平台"
          prop="version"
        >
          <el-checkbox-group
            v-model="checkList"
            @change="handleChecked"
          >
            <div class="advertPlatform">
              <el-checkbox
                v-for="(e, i) in advertplatform"
                :key="i"
                class="checked"
                :label="advertplatform[i].id"
              >
                <div
                  class="item"
                  :class="
                    checkList.includes(advertplatform[i].id) ? 'current' : ''
                  "
                >
                  <h3 class="title">
                    {{ e.name }}
                  </h3>
                  <div class="version">
                    {{ e.version }}
                  </div>
                  <div class="foot">
                    <span
                      v-for="(item, index) in e.sourcePositions"
                      :key="index"
                      class="span_word"
                    >{{
                      item == 1
                        ? " 开屏 "
                        : item == 2
                          ? " 横幅  "
                          : item == 3
                            ? " 插屏 "
                            : item == 4
                              ? " 原生自渲染 "
                              : item == 5
                                ? " 激励视频 "
                                : item == 6
                                  ? " 原生模版 "
                                  : ""
                    }}</span>
                  </div>
                </div>
              </el-checkbox>
            </div>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <el-row class="row_foot">
        <el-button
          type="primary"
          @click="toAccessCode"
        >
          生成接入代码
        </el-button>
      </el-row>
      <el-row
        style="margin-top: 30px"
        :gutter="0"
      >
        <el-col
          :offset="2"
          :span="15"
        >
          <el-input
            v-model="downloadHref"
            size="small"
            placeholder=""
            disabled
          />
        </el-col>
        <el-col :span="4">
          <el-button
            style="margin-left: 2px; margin-right: 2px"
            type=""
            size="small"
            :disabled="!downloadHref"
            @click="handleCopy"
          >
            复制链接
          </el-button>
          <a
            v-if="downloadHref"
            class="downloadLink"
            :href="downloadHref"
            target="_blank"
            :download="fileName"
          >下载</a>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import {
  versionList,
  downLoadSDK,
  advertSourceById,
} from "@/api/MedproVersion";
import { toDate } from "@/utils/toTimer";
import { copy } from "@/utils/string";

export default {
  data() {
    return {
      isLoading: false,
      SDKuploadForm: {
        os: 1,
        version: "",
        versionId: null,
      },
      updateTime: "",
      advertplatform: [],
      versionOption: [{}],
      SDKuploadRules: {
        os: [{ required: true, message: "请选择操作系统", trigger: "blur" }],
        version: [
          { required: true, message: "请选择当前版本", trigger: "blur" },
        ],
      },
      checkList: [],
      versionList: [],
      downloadHref: "",
      fileName: "",
    };
  },
  computed: {
    title() {
      return this.$store.getters.title;
    },
    versionName() {
      let name = "";
      if (this.versionOption.length > 0) {
        this.versionOption.forEach((item) => {
          if (item.id == this.SDKuploadForm.versionId) {
            name = item.version;
          }
        });
      } else {
        return "";
      }
      return name;
    },
  },
  mounted() {
    this.getMedproSdkList();
    this.getAdvertSource();
    this.getDate();
  },
  methods: {
    getDate() {
      let date = new Date();
      this.updateTime = toDate(date);
    },
    async getMedproSdkList() {
      const res = await versionList({ os: this.SDKuploadForm.os });
      if (res.code == 200) {
        this.versionList = res.data.items;
        let arr = [];
        res.data.forEach((e) => {
          let obj = {};
          obj["id"] = e.id;
          obj["version"] = e.version;
          obj["modifyTime"] = toDate(e.modifyTime);
          arr.push(obj);
        });
        this.versionOption = arr;
        if (this.versionOption.length > 0) {
          this.SDKuploadForm.versionId = this.versionOption[0].id;
          this.updateTime = this.versionOption[0].modifyTime;
        }
      }
    },
    async getAdvertSource() {
      if (this.SDKuploadForm.versionId === null) {
        await this.getMedproSdkList();
        if (this.SDKuploadForm.versionId === null) {
          this.advertplatform = null;
          return;
        }
      }
      const res = await advertSourceById(this.SDKuploadForm.versionId);
      if (res.code == 200) {
        this.advertplatform = res.data;
      }
    },
    handleChecked() {},
    changeOs() {
      this.SDKuploadForm.version = "";
      this.SDKuploadForm.versionId = null;
      this.updateTime = "";
      this.getMedproSdkList();
      this.getAdvertSource();
    },

    async toAccessCode() {
      if (this.checkList.length == 0) {
        return this.$message.warning("请选择广告平台");
      }
      if (this.SDKuploadForm.versionId == "") {
        return this.$message.warning("请选择版本号");
      }
      let obj = {
        id: this.SDKuploadForm.versionId,
        os: this.SDKuploadForm.os,
        sourceSdkPackageIds: this.checkList,
      };
      this.isLoading = true;
      // let resp = await downLoadSDK(obj);
      let response = await axios({
        url: process.env.VUE_APP_BASE_API + "/accessCenter/downloadSdk",
        headers: {
          Authorization: this.$store.getters.token,
        },
        method: "post",
        data: obj,
      });
      let resp = response.data;
      if (resp.data) {
        // let a = document.createElement("a");
        // a.setAttribute("href", "http://medpro.ydmob.com/download/" + resp.data);
        // a.setAttribute('target','_blank')
        // a.style.display = "none";
        // document.body.appendChild(a);
        // a.click();
        // document.body.removeChild(a);
        this.fileName = resp.data.replace(".", "%2E").replace(".", "%2E");
        this.downloadHref = "https://app.mediatom.cn/download/" + this.fileName;
        this.isLoading = false;
      }
    },
    handleDownload() {
      window.open = this.downloadHref;
    },
    handleCopy() {
      let result = copy(this.downloadHref);
      if (result === false) {
        this.$message({
          message: "不支持复制",
          type: "error",
          duration: 2 * 1000,
        });
      } else {
        this.$message({
          message: "复制成功",
          type: "success",
          duration: 2 * 1000,
        });
      }
    },
    handleVersionSelect() {
      this.getAdvertSource();
    },
    updateLog() {
      this.$router.push({
        path: "/Accesscenter/updateLog",
        query: {
          os: this.SDKuploadForm.os,
        },
      });
    },
    openWord() {
      if (this.SDKuploadForm.os == 0) {
        window.open(
          this.isMedPro() ? "https://creative.medproad.com/medpro/html/Mediatom-iOS-SDK-对接文档.html" : "https://res.ads.cctv.com/html/CMedia-iOS-SDK-对接文档.html"
        );
      } else {
        window.open(
          this.isMedPro() ? "https://creative.medproad.com/medpro/html/Mediatom-Android-SDK接入文档.html" : "https://res.ads.cctv.com/html/CMedia-Android-SDK接入文档.html"
        );
      }
    },
    downloadDemo() {
      if (this.SDKuploadForm.os == 0) {
        window.open(
          this.isMedPro() ? "https://creative.medproad.com/medpro/app/demo/Medpro_iOS_Demo.zip" : "https://res.ads.cctv.com/demo/CMedia-iOS-Demo.zip"
        );
      } else {
        window.open(
          this.isMedPro() ? "https://creative.medproad.com/medpro/app/demo/Medpro_Android_Demo.zip" : "https://res.ads.cctv.com/app/CMedia-Android-Demo.zip"
        );
      }
    },
    isMedPro() {
      return this.$store.getters.isMedPro
    }
  },
};
</script>

<style lang="scss" scoped>
.upload-container {
  width: 100%;
  margin-bottom: 150px;
  padding-bottom: 100px;
  background-color: #fff;
}
.content {
  padding: 15px;
  border-radius: 10px;
}
.row_one {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
::v-deep .el-loading-spinner .el-loading-text {
  font-size: 20px;
}
::v-deep .el-loading-spinner i {
  font-size: 40px;
}
.advertPlatform {
  margin-top: 10px;
  overflow: hidden;
  margin: 15px;
  // background-color: forestgreen;
  .item {
    float: left;
    width: 270px;
    height: 160px;
    padding-left: 20px;
    box-sizing: border-box;
    border: 2px solid rgb(212, 205, 205);
    border-radius: 3px;
    .title {
      font-size: 16px;
      margin: 20px 0 30px 0;
      font-weight: 400;
    }
    .version {
      margin: 0 0 20px 0;
    }
    .foot {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .span_word {
        margin-right: 7px;
      }
    }
  }

  .checked {
    position: relative;
    margin-right: 0 !important;
  }
  .el-checkbox ::v-deep .el-checkbox__input {
    position: absolute;
    top: 10px;
    right: 18px;
  }
  .current {
    border: 2px solid #1890ff !important;
  }
}

.row_foot {
  display: flex;
  justify-content: flex-end;
  padding-right: 200px;
}
.downloadLink {
  display: inline-block;
  // border: 1px solid #1890ff;
  border-radius: 3px;
  background: #1890ff;
  width: 70px;
  height: 31px;
  vertical-align: top;
  text-align: center;
  line-height: 31px;
  color: #fff;
  font-size: 12px;
}
</style>
