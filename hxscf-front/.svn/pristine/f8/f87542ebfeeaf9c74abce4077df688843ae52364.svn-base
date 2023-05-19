<!--
 * @Descripttion: 
 * @version: 
 * @Author: yanan.zhao
 * @Date: 2020-06-22 16:50:13
 * @LastEditors: xiaoyu.ren
 * @LastEditTime: 2020-07-01 11:29:46
--> 
<template>
  <div class="city-select">
    <el-select placeholder="请选择省"
               v-model="selectedProvince"
               name="province"
               @change='changeProvince'
               size='mini'
               class='width110 mR5'>
      <el-option v-for="(item, index) in provinces"
                 :value="item.value"
                 :key='index'>{{ item.label }}</el-option>
    </el-select>
    <el-select placeholder="请选择市"
               v-model="selectedCity"
               name="city"
               @change='changeCity'
               size='mini'
               class='width110 mR5'>
      <el-option v-for="(item, index) in cities"
                 :value="item.value"
                 :key='index'>{{ item.label }}</el-option>
    </el-select>
    <el-select placeholder="请选择区"
               v-model="selectedBlock"
               name="block"
               @change='changeBlock'
               size='mini'
               class='width110'>
      <el-option v-for="(item, index) in blocks"
                 :value="item.value"
                 :key='index'>{{ item.label }}</el-option>
    </el-select>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from "vue-property-decorator";
import cityJson from "@/utils/city";
@Component
export default class BProvince extends Vue {
  @Prop(String) returnType; // 绑定值

  public provinces: Array<any> = cityJson;
  public cities: Array<any> = [];
  public blocks: Array<any> = [];
  public selectedProvince: String = "";
  public selectedCity: String = "";
  public selectedBlock: String = "";
  public resultArray: Array<any> = [];
  public resultString: String = "";

  created() {
    this.selectedProvince = "北京市";
    this.cities = this.provinces.filter(
      v => v.value == this.selectedProvince
    )[0]["children"];
  }

  changeProvince(value: any) {
    this.selectedProvince = value;
    this.selectedCity = "";
    this.selectedBlock = "";
    this.cities = this.provinces.filter(
      v => v.value == this.selectedProvince
    )[0]["children"];
  }

  changeCity(value: any) {
    this.selectedCity = value;
    this.selectedBlock = "";
    this.blocks = this.cities.filter(v => v.value === this.selectedCity)[0][
      "children"
    ];
  }

  changeBlock(value: any) {
    this.selectedBlock = value;
    this.resultArray.push(
      this.selectedProvince,
      this.selectedCity,
      this.selectedBlock
    );
    this.resultString = this.resultArray.join("");
    if (this.returnType === "array") {
      this.$emit("getAddress", this.resultArray);
    } else {
      this.$emit("getAddress", this.resultString);
    }
  }
}
</script>

<style lang="scss" scoped>
.width110 {
  width: 110px;
}

.mR5 {
  margin-right: 5px;
}
</style>