<template>
  <div class="tags-container">
    <scroll-pane ref="scrollPane">
      <router-link v-for="(item,index) in tags" ref="tag" :key="index" :class="$route.fullPath==item.path?['active tags-item-button']:['tags-item-button']" :to="{ path: item.path }" tag="span" @contextmenu.prevent.native="onOpenContextMenu($event,item)">
        {{ item.title }}
        <span @click.prevent="deleteTag(item,$event)" style="padding:0 5px" v-if="item.title!='工作台'">
          <i class="el-icon-close"></i>
        </span>
      </router-link>
    </scroll-pane>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { namespace, State } from "vuex-class";
const common = namespace("common");
import ScrollPane from "./ScrollPane.vue";
@Component({
  components: { ScrollPane }
})
export default class tags extends Vue {
  @common.Mutation saveOpenTags;
  tags: any[] = [];

  @Watch("$route")
  private onChildChanged(val, oldVal) {
    this.setTags(val);
    this.moveToCurrentTag();
  }

  created() {
    var homeTag = [
      {
        title: "工作台",
        name: "home",
        path: "/home"
      }
    ];
    this.tags = [...homeTag];
    this.setTags(this.$route);
  }
  mounted() {
    this.$bus.$on("closeTag", val => {
      this.deleteTagByBus(val);
    });
    this["$bus"].$on("jumpToTag", (val) => {
      this.jumpTags(val);
    });
  }
  moveToCurrentTag() {
    const tags: any = this.$refs.tag;
    this.$nextTick(() => {
      for (const tag of tags) {
        if (tag.to.path === this.$route.path) {
          this.$refs.scrollPane["moveToTarget"](tag);
          break;
        }
      }
    });
  }

  handleClick(item, index) {
    if (index == 0 || index == 1) {
      this.$refs["tags-container"]["style"]["margin-left"] = `0px`;
    }
    if (this.$route.fullPath != item.path) {
      this.$router.push(item.path);
    }
  }
  //设置标签
  setTags(route) {
    const isExist = this.tags.some(item => {
      return item["path"] == route.fullPath;
    });
    const isExistName = this.tags.some(item => {
      return route.name ? item["name"] == route.name : false;
    });

    let ExistIndex = 0;

    ExistIndex = this.tags.map(i => i.name).indexOf(route.name);

    if (!isExist) {
      var tags = [...this.tags];
      if (isExistName && !route.meta.multi) {
        //目前的tags已存在点击的这个路由
        tags[ExistIndex] = {
          title: route.meta.name,
          name: route.name,
          path: route.fullPath
        };
      } else {
        tags.push({
          title: route.meta.name,
          name: route.name,
          path: route.fullPath
        });
      }
      this.tags = [...tags];
      this.saveOpenTags(this.tags);
      this.$emit("tagschange", tags);
    }
  }
  deleteTagByBus(item) {
    var tags = [...this.tags];
    for (let i in tags) {
      if (tags[i]["name"] == item.name || tags[i]["path"] == item.path) {
        tags.splice(Number(i), 1);
      }
    }
    this.tags = [...tags];
    this.saveOpenTags(this.tags);
    this.$emit("tagschange", tags);
  }
  deleteTag(item, $event) {
    $event.stopPropagation();
    var tags = [...this.tags];
    for (let i in tags) {
      if (tags[i]["path"] == item.path) {
        tags.splice(Number(i), 1);
        if (tags.length == 0) {
          this.$router.push("/home");
          this.tags = [];
          return;
        }
        if (item.path == this.$route.fullPath) {
          if (Number(i) == 0) {
            this.$router.push(tags[i]["path"]);
          } else {
            this.$router.push(tags[Number(i) - 1]["path"]);
          }
        }
      }
    }
    this.tags = [...tags];
    this.saveOpenTags(this.tags);
    this.$emit("tagschange", tags);
  }
  jumpTags(item) {
    let tags = [...this.tags];
    for (let i in tags) {
      if (tags[i].path.split("?")[0] == item.path) {
        tags.splice(Number(i), 1);
        if (tags.length == 0) {
          this.$router.push("/home");
          this.tags = [];
          return;
        }
        if (item.path == this.$route.path) {          
          this.$router.push({ path: item.tag , query: item.query || {} })
          // this.$router.push(item.tag);
        }
      }
    }
    this.tags = [...tags];
    this.saveOpenTags(this.tags);
    this.$emit("tagschange", tags);
  }
  closeOthers() {
    var route = this.$route;
    var homeTag = this.tags.filter(item => {
      return item["title"] == "工作台";
    });
    var tags = [
      {
        title: route.meta.name,
        name: route.name,
        path: route.fullPath
      }
    ];
    if (route.fullPath == "/home") {
      this.tags = [...tags];
    } else {
      this.tags = [...homeTag, ...tags];
    }
    this.saveOpenTags(this.tags);
    this.$emit("tagschange", this.tags);
  }
  closeAll() {
    var route = this.$route;
    if (!(route.fullPath == "/home" && this.tags.length == 1)) {
      this.tags = [];
      this.saveOpenTags(this.tags);
      this.$emit("tagschange", this.tags);
      this.$router.push("/home");
    }
  }
  onOpenContextMenu($event, item) {
    $event.preventDefault();

    let temp: any = [];
    if (item.name == "home") {
      temp = [
        {
          name: "关闭其他",
          onClick: () => {
            this.closeOthers();
          }
        }
      ];
    } else {
      temp = [
        {
          name: "关闭所有",
          onClick: () => {
            this.closeAll();
          }
        },
        {
          name: "关闭当前",
          onClick: () => {
            this.deleteTag(item, $event);
          }
        },
        {
          name: "关闭其他",
          onClick: () => {
            this.closeOthers();
          }
        }
      ];
    }
    this.$contextmenu(
      {
        top: $event.clientY,
        left: $event.clientX
      },
      temp
    );
  }
}
</script>

<style scoped lang="scss">
$tagHeight: 35px;
.tags-container {
  height: $tagHeight;
  background-color: #fff;
  position: relative;
  top: 0;
  left: 0;
  box-shadow: 0px 10px 8px -6px rgba(0, 0, 0, 0.1);
  padding: 6px 4px 0px;
  z-index: 2;
  .tags-item-button {
    display: inline-block;
    height: 34px;
    line-height: 37px;
    padding: 0 15px;
    margin: 0 2px;
    border-top: 1px solid #e8ecef;
    border-left: 1px solid #e8ecef;
    border-right: 1px solid #e8ecef;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    font-family: PingFangSC-Regular;
    color: #333;
    cursor: pointer;
    font-size: 14px;
  }
  .tags-item-button.active {
    color: #409eff;
  }
}
</style>
