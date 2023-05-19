<template>
  <div class="a-container">
    <h1>A:{{ value }}</h1>
    <input
      v-model="value"
      type="text"
      @input="handleInput"
    >
  </div>
</template>

<script>
import bus from './bus'
export default {
    data(){
        return {
            value:''
        }
    },
    methods:{
        handleInput(){
            bus.$emit('changeValue',this.value)
        }
    }
};
</script>

<style>
</style>