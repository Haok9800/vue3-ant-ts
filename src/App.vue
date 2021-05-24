<template>
  <a-spin :spinning="false" tip="加载中...">
    <router-view></router-view>
  </a-spin>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "./components/HelloWorld.vue";

export default defineComponent({
  name: "App",
  components: {
    HelloWorld,
  },
  setup(){
    return {spinning:true}
  }
});
</script>
