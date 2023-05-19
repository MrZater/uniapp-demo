# Vue3中无实例方法

 1. vue2中的写法

 ```js
 let app = new Vue(options)
 app.$mount("#app");
 ```

 2. vue3中的写法（ 不存在构造函数vue）
  
 ```js
 createApp(App).mount('#app');
 ```

# composition

![](./笔记图片/vue3对ref的特殊处理.jpg)
![](./笔记图片/vue3的组件实例代理.jpg)

```html
<template>
  <p>
  <!-- 实例中的composition不需要加.value  -->  
    {{ countRef }}
  </p>
  <button @click="decrease">--</button>
  <button @click="increase">++</button>
</template>

<script>
// ref 方法会将数据转换成读取器、响应式的proxy对象（代理对象）
import { ref } from "vue";
function crease() {
  // 响应式数据为了辨别，用Ref作为后缀
  let countRef = ref(0);
  let increase = () => {
    // 脚本中读取ref数据需要添加.value读取
    countRef.value++;
  };
  let decrease = () => {
    countRef.value--;
  };
  // 返回data和method
  return {
    countRef,
    increase,
    decrease,
  };
}
export default {
// setup在所有生命周期函数之前执行
  setup() {
    return {
      // 对crease调用后的结果进行解构，得到data和method
      ...crease(),
    };
  },
};
</script>

<style>
</style>
```
