<!--
 * @Author: shanzhilin
 * @Date: 2022-03-25 16:15:00
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-03-26 15:35:02
-->
<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  margin: 0;
}

</style>
