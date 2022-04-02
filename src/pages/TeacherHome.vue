<!--
 * @Author: shanzhilin
 * @Date: 2022-04-01 17:40:56
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-04-02 20:05:43
-->
<template>
  <div>
	  <user-table type="3"/>
  </div>
</template>

<script lang="ts">
import usertable from '../components/UserTable.vue'
export default {
	components: {
		'user-table': usertable
	},
	setup() {}
};
</script>
<style scoped>
</style>