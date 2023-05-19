<template>
  <div class="b-container">
    <h1>B:{{ value }}</h1>
  </div>
</template>

<script>
import bus from "./bus";
export default {
  data() {
    return {
      value: "",
    };
  },
  mounted() {
    bus.$on("changeValue", (val) => {
      this.value = val;
    });
  },
};
</script>

<style>
</style>