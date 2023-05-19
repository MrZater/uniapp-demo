# tinymce富文本编辑器

## 安装

```js
npm install tinymce -S or yarn add tinymce
npm install @tinymce/tinymce-vue -S  or yarn @tinymce/tinymce-vue
```

## 使用

```html
<template>
    <div><tinymce :editorData="editorData" ref="editor" :disabled="disabled" /></div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
// 引入组件
import tinymce from '@/components/Tinymce/index.vue';
@Component({
    name: "tinymce-demo",
    components:{
        tinymce
    }
})
    export default class TinymceDemo extends Vue{
    disabled：false // 是否禁用
    editorData = {
            height:"",
            width:"",
        }
}
</script>
```

```js
// editorData参数说明
    disabled：false // 是否禁用
    editorData = {
        height:"",
        width:""
    }
```

> 发送参数

|属性|类型|说明|是否必选|
|--|--|--|--|
|editorData|object|width，height|否|
|--|--|--|--|
|editorData.width|number|宽度，默认100%|否|
|editorData.height|number|高度，默认300px|否|
|--|--|--|--|
|disabled|boolean|禁用，默认关闭|否|

> 接收参数

|属性|类型|说明|
|--|--|--|--|
|VALUE|object|获取输入的值|
|VALUE.value|html|获取的是带样式的值|
|VALUE.text|string|获取纯文本的值|

> 使用方法

```js
// 通用this.$refs.[元素].VALUE
// 获取到一个对象
{
    text: "11121211223333333333333333333333"
    value: "<p>111212<span style="text-decoration: line-through;">112233333</span>3333<span style="background-color: #e03e2d;">33333</span>33333333</p>"
}

/**
 * text: 纯文本，可以正确的获取长度
 * value： 获取带样式的文本，不能获取输入的长度
*/

```

> 事件

|属性|类型|说明|是否必选|
|--|--|--|--|
|clear()|Function()|清空输入的值|否|
