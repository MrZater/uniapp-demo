<template>
  <div class="title">test组件</div>
  <div>{{ props.age }}</div>
  <div class="btn" @click="incress">+</div>
  <div class="btn" @click="decress">-</div>
</template>

<script setup>
// 组件传参
const props = defineProps({
  age: Number,
});
// 自定义事件
const emit = defineEmits(["changeAge"]);
function incress() {
  emit("changeAge", props.age + 1);
}
function decress() {
  emit("changeAge", props.age - 1);
}
</script>

<style scoped>
.btn {
  font-size: 20px;
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  display: inline-block;
  margin: 5px 10px;
  cursor: pointer;
  user-select: none;
}
.title {
  border-bottom: 1px solid #999;
  padding: 10px 0;
  margin: 10px 0;
  font-size: 20px;
}
</style>
