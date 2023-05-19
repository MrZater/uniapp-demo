<!--
 * @Descripttion: 
 * @version: 
 * @Author: yanan.zhao
 * @Date: 2020-06-22 17:53:15
 * @LastEditors: xiaoyu.ren
 * @LastEditTime: 2020-07-01 11:32:20
--> 
<template>
  <div class="template-container">
    <content-wrapper>
      <template slot="grid">
        <el-form label-position="right"
                 label-width="150px">
          <!-- returnType: 地址返回类型  若为array 将返回 省市区数组 ; 为string 返回地址字符串 -->
          <el-form-item label='地址(数组)：'
                        class="br-form-item-label">
            <Area-form-item returnType='array'
                            @getAddress='getAddressArray'></Area-form-item>
          </el-form-item>
          <el-form-item label='地址(字符串)：'
                        class="br-form-item-label">
            <Area-form-item returnType='string'
                            @getAddress='getAddressString'></Area-form-item>
          </el-form-item>
        </el-form>
      </template>
    </content-wrapper>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Bprovince from "@/components/BProvince/index.vue";
import ContentWrapper from "@/components/ContentWrapper.vue";

@Component({
  components: {
    "content-wrapper": ContentWrapper,
    "Area-form-item": Bprovince
  }
})
export default class BProvinceDemo extends Vue {
  public addressArray: Array<any> = [];
  public addressString: String = "";

  getAddressArray(value: any) {
    console.log(value);
    this.addressArray = value;
  }

  getAddressString(value: any) {
    console.log(value);
    this.addressString = value;
  }
}
</script>