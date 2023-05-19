<!--
 * @Author: xiaoyu.ren
 * @Date: 2019-10-23 10:46:04
 * @LastEditors: xiaoyu.ren
 * @LastEditTime: 2020-04-14 18:17:45
 * @Description: 菜单组件
 -->
<template>
  <div class="context-menu" :style="`top: ${position.top}px;left: ${position.left}px`">
    <div v-for="(item, index) in menus" class="context-menu_item" :key="index" @mousedown="onClick($event, item)">
      {{ item.name }}
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class contextMenu extends Vue {
  menus: any = [];
  position: object = {
    top: 0,
    left: 0
  };

  mounted() {
    document.addEventListener("mousedown", () => {
      this.$el.remove();
    });
  }

  update(position, menus) {
    this.menus = menus;
    this.position = position;
  }
  onClick($event, item) {
    item.onClick();
  }
}
</script>

<style lang="scss" scoped>
.context-menu {
  padding: 5px 0;
  background-color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  .context-menu_item {
    height: 30px;
    line-height: 30px;
    padding-left: 12px;
    padding-right: 12px;
    font-size: 14px;
    color: #3c3d40;
    cursor: pointer;
    &:hover {
      background-color: mix(#ffffff, #409eff, 90%);
      color: #409eff;
    }
  }
}
</style>
