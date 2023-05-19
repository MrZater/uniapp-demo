<!--
 * @Author: yaoyuting
 * @Date: 2020-12-28 15:47:33
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-01-07 14:40:49
 * @Descripttion: 
-->
<template>
    <div class="template-container">
        <content-wrapper>
            <template slot="grid">
                <div>
                    <iframe :src="`${this.toUrl}`" ref="iframe" style="border:none;width:100%;height:700px;">
                    </iframe>
                </div>
            </template>
        </content-wrapper>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import { namespace } from "vuex-class";
const processControl = namespace("processControl");

import ContentWrapper from "@/components/ContentWrapper.vue";

import { getStore } from "@/utils/useStore";
@Component({
    components: {
        "content-wrapper": ContentWrapper,
    },
})
export default class processControlSeting extends Vue {
    @processControl.Action processControlListFN;
    @processControl.State s_searchData;
    frameSrc: string = "";
    toUrl: string = "";
    mounted() {
        window.addEventListener("message", this.messageHandler);
        this.$once("hook:beforeDestroy", () => {
            window.removeEventListener("message", this.messageHandler);
        });
    }
    messageHandler(event) {
        this.$nextTick(() => {
            const _this = this;
            let $refIframe: any = this.$refs.iframe;
            // 如果消息源不是iframe页
            if (event.source !== $refIframe.contentWindow) return;
            if (event.data.msg == "onRefresh") {
                // 关闭 "流程控制"页签
                _this.$bus.$emit("closeTag", {
                    name: "processControlSeting",
                });
                // 刷新列表 (由于后台数据返回成功，但并为入库成功，所有延迟请求接口)
                setTimeout(() => {
                    _this.processControlListFN(_this.s_searchData);
                }, 500);
            }
        });
    }
    created() {
        var query = this.$route.query;
        //  var token = localStorage.getItem("token");
        var token = getStore("token");
        
        if (query.type == "create") {
            this.frameSrc = `/flow/newModel?activiteCode=${query.activitecode}&orgCode=${query.orgCode}&name=${query.activitename}&description=${query.activitedesc}&token=${token}`;
        } else {
            this.frameSrc = `/editor?modelId=${query.activitetempid}&orgCode=${query.orgCode}&key=${query.activitecode}&name=${query.activitename}`;   
        }
        this.toUrl = `${this.$baseurl}${this.frameSrc}`;
        
    }
}
</script>

<style scoped lang="less">
.template-container .template-content {
    margin-top: 0;
}
</style>
