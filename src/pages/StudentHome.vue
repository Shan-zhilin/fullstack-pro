<!--
 * @Author: shanzhilin
 * @Date: 2022-04-01 17:40:13
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-04-02 20:05:46
-->
<template>
  <div>
    <user-table type="2" />
  </div>
</template>

<script lang="ts">
import usertable from '../components/UserTable.vue';
export default {
	components: {
		'user-table': usertable
	},
	setup() {}
};
</script>
<style scoped>
</style>