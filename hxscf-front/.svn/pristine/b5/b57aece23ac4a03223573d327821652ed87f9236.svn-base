/*
 * @Author: xiaoyu.ren
 * @Date: 2020-03-29 18:43:29
 * @LastEditors: mingliang.zhu
 * @LastEditTime: 2020-10-22 15:50:02
 * @Description:
 */
import Vue, { VNode } from "vue";

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}

declare module "vue/types/vue" {
  //  声明为 Vue 补充的东西
  interface Vue {
    $bus: any;
    $moment: any;
    $contextmenu: any;
    $baseUrl: any;
    $baseurl: any;
    $Bmessage: any;
    $code: any;
    $select: any;
  }
}
