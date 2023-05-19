<!--
 * @Author: yuting.yao
 * @Date: 2020-05-29 10:16:29
 * @LastEditors: yuting.yao
 * @LastEditTime: 2020-05-29 18:34:15
 * @Description: 全屏dome
--> 

<template>

    <B-fullScreen></B-fullScreen>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import FullScreen from '@/components/FullScreen/indexs.vue';
@Component({
    components: { "B-fullScreen": FullScreen }
})
export default class BFullScreen extends Vue {

}
</script>