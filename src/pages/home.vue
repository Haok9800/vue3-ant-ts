<template>
 <div>
    <div>home</div>
 </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import AppHeader from "../components/layout/Header.vue";
import HelloWorld from "../components/HelloWorld.vue";
export default defineComponent({
  components:{
    AppHeader,
    HelloWorld
  },
  setup: () => {
                
  }
})

</script>
<style lang='less' scoped>
</style>