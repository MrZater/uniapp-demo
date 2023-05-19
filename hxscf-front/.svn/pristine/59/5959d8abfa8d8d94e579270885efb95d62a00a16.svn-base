<!--
 * @Author: xiulei.dai
 * @Date: 2020-05-13 10:23:50
 * @LastEditors: xiulei.dai
 * @LastEditTime: 2020-05-27 15:49:00
 * @Description: 无内容组件
 -->
<template>
    <div class="empty_container">
        <div class="empty_image">
            <div class="empty_image-default" :style="imageStyle || ''" v-if="!$slots.image">
                <default v-if="image == 'default'" />
                <simple v-else-if="image == 'simple'" />
                <img v-else :src="image" />
            </div>
            <slot v-else name="image"></slot>
        </div>
        <div class="empty_description" v-if="description !== false">
            <template v-if="!$slots.description">
                {{ description }}
            </template>
            <slot v-else name="description"></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator"
import Default from "./default.vue"
import Simple from "./simple.vue"

@Component({
    components: {
        Default,
        Simple
    }
})
class Empty extends Vue {
    @Prop({ default: "暂无数据" }) readonly description?: string | boolean | undefined

    /**
     * @prop {string} 暂无中显示的图片
     * @description 支持默认提供的两张svg----default,simple，支持绝对路径，支持base64，不支持相对路径
     */
    @Prop({ default: "default" }) readonly image?: string | undefined
    @Prop() readonly imageStyle?: string | undefined
}

export default Empty
</script>

<style lang="scss" scoped>
.empty_container {
    text-align: center;
    padding: 10px 0;
    .empty_image {
        margin-bottom: 8px;
        .empty_image-default {
            height: 100px;
            display: inline-block;
        }
    }
    .empty_description {
        color: rgba(0, 0, 0, 0.25);
    }
}
</style>
