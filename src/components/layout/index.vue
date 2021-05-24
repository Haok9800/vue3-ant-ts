<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <!-- sider -->
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <a-menu
        mode="inline"
        theme="dark"
        @select="selectedItem"
        :inline-collapsed="collapsed"
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
      >
        <template v-for="item in sidebar" :key="item.key">
          <template v-if="!item.children">
            <a-menu-item :key="item.key">
              <PieChartOutlined />
              <span>{{ item.title }}</span>
            </a-menu-item>
          </template>
          <template v-else>
            <sub-menu :menu-info="item" :key="item.key" />
          </template>
        </template>
      </a-menu>
    </a-layout-sider>
    <!-- main -->
    <a-layout>
      <!-- header -->
      <a-layout-header class="layout-header">
        <a-row type="flex" justify="space-between">
          <a-col>
            <menu-unfold-outlined
              v-if="collapsed"
              class="trigger"
              @click="() => (collapsed = !collapsed)" />
            <menu-fold-outlined
              v-else
              class="trigger"
              @click="() => (collapsed = !collapsed)"
          /></a-col>
          <a-col>
            <!-- header 右侧 -->
            <AppHeader></AppHeader>
          </a-col>
        </a-row>
      </a-layout-header>
      <!-- content -->
      <a-layout-content class="layout-content">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import {
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons-vue";
import SubMenu from "../SubMenu.vue";
import AppHeader from "./Header.vue";
import { defineComponent, ref, reactive, toRefs, onMounted,watch } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  components: {
    SubMenu,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    AppHeader,
  },

  setup() {
    const store = useStore();
    const router = useRouter();
    let state = reactive({
      //  默认打开的item
      openKeys: <any>[],
      // 高亮选中的key
      selectedKeys: <any>[],
      collapsed: ref<boolean>(false),
    });
    const selectedItem = () => {
      router.push({ path: state.selectedKeys[0] });
    };
    const route = useRoute();
    const findPath = (data, openKeys) => {
      for (let i = 0; i < data.length; i++) {
        let item = data[i];
        // 有子节点
        if (item.children) {
          openKeys.push(item.key);
          findPath(item.children, openKeys);
        } else {
          // 寻找到path 退出循环
          if (item.key === route.path) {
            openKeys.push(item.key);
            break;
          } else {
            openKeys = [];
          }
        }
      }
      return openKeys;
    };
    // watch(
    //   () => route.path,
    //   (to) => {
    //      state.openKeys = findPath(store.state.sidebar, []);
    //   }
    // );
    onMounted(() => {
      // 设置menu默认打开的item
      state.openKeys = findPath(store.state.sidebar, []);
      // 设置menu默认选中页面
      state.selectedKeys = [route.path];
    });
    return {
      selectedItem,
      sidebar: store.state.sidebar,
      ...toRefs(state),
    };
  },
});
</script>
<style lang="less" scoped>
@import "../../assets/cover.less";
#components-layout-demo-custom-trigger {
  height: 100vh;
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px 0 0;
    cursor: pointer;
    transition: color 0.3s;
    .trigger:hover {
      color: #1890ff;
    }
  }
  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.3);
    margin: 16px;
  }
  .layout-content {
    margin: 24px 16px;
    padding: 24px;
    background: #fff;
    min-height: 280px;
  }
  .layout-header {
    background: #fff;
    padding: 0 16px;
  }
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>
