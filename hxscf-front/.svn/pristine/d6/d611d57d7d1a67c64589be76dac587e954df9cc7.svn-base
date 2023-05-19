<!--
 * @Author: yuting.yao
 * @Date: 2020-05-29 18:20:41
 * @LastEditors: yuting.yao
 * @LastEditTime: 2020-05-29 18:44:00
 * @Description: 
--> 

<template>
    <div>
        <span class="mr20">全屏模式</span>
        <el-switch v-model="fullScreen"></el-switch>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
@Component
export default class FullScreen extends Vue {
    fullScreen: boolean = false;

    mounted() {
        document.onfullscreenchange = (event) => {
            let _fullScreen: boolean = document.fullscreen;
            this.fullScreen = _fullScreen;
        };
    }

    @Watch("fullScreen")
    getFullScreen(newVal: boolean) {
        if (newVal) {
            let videoDom = document.documentElement as any;
            if (videoDom.requestFullscreen) {
                videoDom.requestFullscreen();
            } else if (videoDom.webkitRequestFullScreen) {
                videoDom.webkitRequestFullScreen();
            } else if (videoDom.mozRequestFullScreen) {
                videoDom.mozRequestFullScreen();
            } else {
                videoDom.msRequestFullscreen();
            }
        } else {
            let doc = document as any;
            if (doc.fullscreen) {
                if (doc.exitFullscreen) {
                    doc.exitFullscreen();
                } else if (doc.webkitExitFullscreen) {
                    doc.webkitExitFullscreen();
                } else if (doc.webkitExitFullscreen) {
                    doc.webkitExitFullscreen();
                } else if (doc.mozExitFullscreen) {
                    doc.mozExitFullscreen();
                } else {
                    doc.msExitFullscreen();
                }
            }
        }
    }
}
</script>

<style scoped>
.mr20 {
    margin-right: 20px;
}
</style>
