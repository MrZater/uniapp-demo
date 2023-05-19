<template>
    <div style="height:100%;width:100%">
        <div :class='["sider-bar",menuCollapse?"sider-bar-collapse":""]'>
            <div class="logo">
                <router-link to="/home">
                    <img :src="logoUrl" style="width:32px;">
                    <h1 v-if="!menuCollapse">{{menuTitle}}</h1>
                </router-link>
            </div>

            <!-- $route.path -->
            <el-menu :default-active="$route.path" style="min-height: 100%;" router :class='["br-menu menu-content",menuCollapse?"menu-content-collapse":""]' :collapse="menuCollapse"
                :collapse-transition="true" :unique-opened="true">
                <template v-for="(item,index) in menu">

                    <!--第二级菜单-->
                    <el-submenu v-if="item.children" :key="item.code" :index="item.code?item.code:''">
                        <template slot="title">
                            <i :class="`${getClass(item.icon)}`" style="margin-right:10px"></i>
                            <span>{{item.title}}</span>
                        </template>
                        <template v-for="(item,index) in item.children">
                            <!--有子节点 第二级菜单-->
                            <el-submenu v-if="item.children" :key="item.code" :index="item.code?item.code:''">
                                <template slot="title">
                                    <i :class="item.icon"></i>
                                    <span>{{item.title}}</span>
                                </template>
                                <el-menu-item v-for="(item,index) in item.children" :key="item.code" :index="item.path?item.path:''">
                                    <!-- 第三级菜单 -->
                                    <template slot="title">
                                        <i :class="item.icon"></i>
                                        <span>{{item.title}}</span>
                                    </template>
                                </el-menu-item>
                            </el-submenu>
                            <!--没有子节点的 二级菜单-->
                            <el-menu-item v-if="!item.children" :key="item.code" :index="item.path?item.path:''">
                                <template slot="title">
                                    <i :class="item.icon"></i>
                                    <span>{{item.title}}</span>
                                </template>
                            </el-menu-item>
                        </template>
                    </el-submenu>

                    <!-- 只有一级的菜单 -->
                    <el-menu-item v-else :key="index" :index="item.path?item.path:''">
                        <i :class="`${getClass(item.icon)}`" style="margin-right:10px"></i>
                        <span slot="title">{{item.title}}</span>
                    </el-menu-item>
                </template>
            </el-menu>

        </div>

        <div style="height:calc( 100% )">
            <div style="height: 100%;position:relative">
                <div :class='["content",menuCollapse?"content-collapse":""]'>
                    <div class="header">
                        <div class="collapse-icon">
                            <i :class='["iconfont",menuCollapse?"icon-zhankai":"icon-shouqi"]' @click="toggleMenu"></i>
                        </div>
                        <div class="header-operations">
                            <!-- <el-badge :value="messageCount" :max="99" class="bell" :hidden="messageCount == 0">
                                <i class="el-icon-bell" style="cursor:pointer;"></i>
                            </el-badge> -->

                            <span class="zoom" @click="handleFullScreen">
                                <el-tooltip class="item" effect="dark" :content="zoom?'退出全屏模式':'全屏模式'" placement="bottom">
                                    <i :class="['iconfont',!zoom?'icon-quanping':'icon-suofang']"></i>
                                </el-tooltip>
                            </span>

                            <span class="international">
                                欢迎您! {{ loginData.userName }}
                                <el-dropdown trigger="click" @command="handleCommand">
                                    <span class="el-dropdown-link">
                                        <i class="el-icon-caret-bottom"></i>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item command="a">
                                            修改密码
                                        </el-dropdown-item>
                                        <el-dropdown-item command="b">
                                            退出登录
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </span>

                            <el-tooltip class="item" effect="dark" content="配置中心" placement="bottom">
                                <i class="setting el-icon-s-tools" @click="showPannel=true;"></i>
                            </el-tooltip>

                            <span class="system-time">{{$moment().format("YYYY-MM-DD")}}</span>
                        </div>
                    </div>
                    <tags @tagschange="ontagschange" v-if="needTags"></tags>
                    <!-- <div class="content-main" :style="{height:needTags?'calc(100% - 94px)':'calc(100% - 52px)'}"> -->
                    <div class="content-main" :style="{height: !fixedHeader ? 'auto' : needTags?'calc(100% - 94px)':'calc(100% - 52px)',overflowY:fixedHeader?'auto':'visible'}">
                        <keep-alive :include="tagsList.map(i=>i.name)">
                            <router-view></router-view>
                        </keep-alive>
                    </div>
                    <right-panel :showPannel="showPannel" @close="(val)=>{showPannel=val;}">
                        <settings />
                    </right-panel>
                </div>
            </div>
            <modifyPassword ref="dialog" />
        </div>
        <el-backtop target=".content-main" title="返回顶部"></el-backtop>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { State, Action, namespace } from "vuex-class";
import { Base64 } from "js-base64";
import { getStore, clearLoginInfo } from "@/utils/useStore";
import tags from "./tags.vue";
import RightPanel from "./RightPanel.vue";
import Settings from "./Settings.vue";
const login = namespace("login");
const common = namespace("common");
const baseConfig: any = require("../../baseConfig");
import modifyPassword from "@/views/modifyPassword/index.vue";
@Component({
    components: {
        tags,
        RightPanel,
        Settings,
        modifyPassword,
    },
})
export default class Wrapper extends Vue {
    @login.Action queryLogout;
    @common.State needTags;
    @common.State fixedHeader;

    menuCollapse: boolean = false;
    menu: any[] = [];
    loginData: any = {};
    tagsList: any[] = [];
    showPannel: boolean = false;
    zoom: boolean = false;
    // messageCount: number = 10;
    logoUrl = `${baseConfig.logoUrl}`;
    menuTitle = `${baseConfig.menuTitle}`;

    created() {
        let tempmenu = getStore("menu");
        this.menu = JSON.parse(Base64.decode(tempmenu));
        let userInfo = getStore("userInfo");
        this.loginData = JSON.parse(Base64.decode(userInfo));
    }
    mounted() {
        let that = this;
        //为了防止火狐浏览器拖拽的时候以新标签打开
        document.body.ondrop = function (event) {
            event.preventDefault();
            event.stopPropagation();
        };
        document.addEventListener(
            "fullscreenchange",
            function () {
                that.zoom = document.fullscreen ? true : false;
            },
            false
        );

        document.addEventListener(
            "mozfullscreenchange",
            function () {
                that.zoom = document["mozFullScreen"] ? true : false;
            },
            false
        );

        document.addEventListener(
            "webkitfullscreenchange",
            function () {
                that.zoom = document["webkitIsFullScreen"] ? true : false;
            },
            false
        );
        document.addEventListener(
            "msfullscreenchange",
            function () {
                that.zoom = document["msFullscreenElement"] ? true : false;
            },
            false
        );
    }
    toggleMenu() {
        this.menuCollapse = !this.menuCollapse;
        this.$bus.$emit("menuCollapse");
    }
    ontagschange(tags) {
        this.tagsList = [...tags];
    }
    getClass(iconType) {
        let [type, icon] = iconType ? iconType.split("/") : ["", ""];
        switch (type) {
            case "built-facet":
            case "built-linear":
                return `el-icon-${icon} `;
                break;
            case "user-defined":
                return `iconfont ${icon}`;
                break;
            default:
                return;
                break;
        }
    }
    handleCommand(command) {
        if (command == "a") {
            let $els = this.$refs["dialog"];

            $els["open"]();

            // this.$router.push({
            //   path: "/modifyPassword"
            // });
        } else {
            this.handleLogout();
        }
    }
    //退出登录
    handleLogout() {
        this.$confirm("确定退出登录吗?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
        })
            .then(() => {
                this.queryLogout({})
                    .then((msg) => {
                        this.$message({ type: "success", message: msg });
                        clearLoginInfo();
                        this.$router.replace({ path: "/login" });
                    })
                    .catch((err) => {
                        clearLoginInfo();
                        this.$router.replace({ path: "/login" });
                    });
            })
            .catch(() => {
                this.$message({ type: "info", message: "已取消" });
            });
    }
    handleFullScreen() {
        if (!this.zoom) {
            //放大到全屏
            let docEle: any = window.document.documentElement;
            let rfs =
                docEle.requestFullscreen ||
                docEle.webkitRequestFullscreen ||
                docEle.mozRequestFullScreen ||
                docEle.msRequestFullScreen;
            rfs && rfs.call(docEle);
        } else {
            //缩放回正常状态
            var document: any = window.document;
            document.exitFullscreen && document.exitFullscreen();
            document.webkitExitFullscreen && document.webkitExitFullscreen();
            document.webkitCancelFullScree && document.webkitCancelFullScree();
            document.mozCancelFullScreen && document.mozCancelFullScreen();
            document.msExitFullScreen && document.msExitFullScreen();
        }
        this.zoom = !this.zoom;
    }
}
</script>

 <style lang="scss" scoped>
$headerFontSize: 12px;
$headerHeight: 52px; //头部高度
$slideWidth: 256px; //侧边栏宽度
$slideCollapseWidth: 56px; //侧边栏收起的宽度
$slideBg: #001529; //侧边栏背景色
$sildeFontColorOneMenu: hsla(0, 0%, 100%, 0.65); //侧边栏一级菜单字体颜色
$sildeFontColorTwoMenu: hsla(0, 0%, 100%, 0.65); //侧边栏二级菜单字体颜色
$slideIconColor: hsla(0, 0%, 100%, 0.65); //侧边栏菜单icon颜色
$sildeActiveBg: #409eff; //侧边栏高亮菜单背景色
$sildeActiveColor: #fff; //侧边栏高亮菜单字体颜色 以及鼠标滑过字体颜色
$sildeHoverBG: #001529; //侧边栏鼠标滑过背景色
$logoBg: #002140; //logo部分背景色
$logoTextColor: #fff; //logo部分字体颜色
// 主内容
.content {
    height: 100%;
    background-color: #f5f7fa;
    position: absolute;
    top: 0;
    bottom: 0;
    left: $slideWidth;
    right: 0;
    overflow: auto;
    transition: all 0.3s;
}

.content-collapse {
    left: $slideCollapseWidth;
}
// 头部
.header {
    height: $headerHeight;
    background-color: #fff;
    border-bottom: 1px #e8ecef solid;

    .collapse-icon {
        display: inline-block;
        line-height: $headerHeight;
        box-sizing: border-box;
        padding: 0 24px;
        text-align: center;

        i {
            font-size: 18px;
            color: #96a2b4;
            cursor: pointer;

            &:hover {
                color: #409eff;
            }
        }
    }

    .header-operations {
        float: right;
        height: $headerHeight;
        color: rgba(0, 0, 0, 0.65);
        line-height: $headerHeight;
        padding-right: 20px;
        font-size: $headerFontSize;
        .bell {
            height: 30px;
            line-height: 30px;
            margin: 4px 10px 0;
            i {
                font-size: 20px;
            }

            .el-badge__content {
                font-family: Helvetica Neue, Helvetica, PingFang SC,
                    Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
            }
        }

        .zoom {
            display: inline-block;
            vertical-align: middle;
            cursor: pointer;
            margin: 0 10px;
        }
        .setting {
            font-size: 18px;
            cursor: pointer;
            vertical-align: middle;
            margin-bottom: 3px;
        }
        .international {
            margin: 0 10px;
        }
        .system-time {
            display: inline-block;
            vertical-align: middle;
            margin: 0 10px;
        }
    }
}

// 侧边栏
.sider-bar {
    background-color: $slideBg;
    box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
    position: absolute;
    padding-bottom: 40px;
    overflow: hidden;
    width: $slideWidth;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 100;
    box-sizing: border-box;
    transition: all 0.3s;
    padding-bottom: $headerHeight;

    .br-menu {
        background-color: $slideBg;
        border-right: none;

        /deep/ .el-submenu {
            .el-submenu__title {
                color: $sildeFontColorOneMenu;
                background-color: $slideBg;
                i {
                    color: $slideIconColor;
                }

                &:hover {
                    color: $sildeActiveColor;
                    background-color: $sildeHoverBG;
                }
            }

            .el-menu-item {
                background-color: $slideBg;
                color: $sildeFontColorTwoMenu;
                border-left: 4px solid transparent;

                &:hover {
                    color: $sildeActiveColor;
                    background-color: $sildeHoverBG;
                }

                &.is-active {
                    color: $sildeActiveColor;
                    background-color: $sildeActiveBg;
                }
            }
        }

        & > .el-menu-item {
            color: $sildeFontColorOneMenu;

            i {
                color: $slideIconColor;
            }
        }

        & > .el-menu-item:hover {
            color: $sildeActiveColor;
            background-color: $sildeHoverBG;
        }

        & > .el-menu-item.is-active {
            color: $sildeActiveColor;
            background-color: $sildeActiveBg;
        }
    }

    .menu-content {
        width: $slideWidth;
        height: 100%;
        min-height: auto;
        overflow-y: scroll;
        transition: all 0.3s;
    }

    .menu-content::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 0px;
        /*高宽分别对应横竖滚动条的尺寸*/
        height: 0px;
    }

    .menu-content::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #535353;
    }

    .menu-content::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        background: #ededed;
    }

    .menu-content-collapse {
        width: 76px;
    }

    .logo {
        height: $headerHeight;
        position: relative;
        line-height: $headerHeight;
        padding-left: 14px;
        transition: all 0.3s;
        overflow: hidden;
        background: $logoBg;

        img {
            vertical-align: middle;
        }

        h1 {
            font-size: 14px;
            margin: 0 0 0 12px;
            font-family: Myriad Pro, Helvetica Neue, Arial, Helvetica,
                sans-serif;
            font-weight: 600;
            display: inline-block;
            height: 32px;
            line-height: 32px;
            vertical-align: middle;
            color: $logoTextColor;
        }
    }
}

.sider-bar-collapse {
    width: $slideCollapseWidth;
}
// 主体内容
.content-main {
    padding: 18px;
    //   overflow: auto;
    box-sizing: border-box;
}
</style>