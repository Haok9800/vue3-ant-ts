<template>
  <div class="app-avatar">
    <a-dropdown>
      <span class="ant-dropdown-link">
        <a-avatar :size="32" src="avatar">
          <template #icon><UserOutlined /></template>
        </a-avatar>
        {{ username }}
        <DownOutlined />
      </span>
      <template #overlay>
        <a-menu>
          <a-menu-item>
            <a href="javascript:;">退出登录</a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script lang="ts">
import { DownOutlined,UserOutlined  } from "@ant-design/icons-vue";
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "AppHeader",
  components: {
    DownOutlined,
    UserOutlined
  },
  setup: () => {
    return {
      username: "黎在亚",
      collapsed: ref<boolean>(false),
    };
  },
});
</script>
<style lang="less" scoped>
.app-avatar {
  .ant-dropdown-link {
    display: block;
    min-height: 64px;
    cursor: pointer;
  }
}
</style>
