<!--
 * @Author: shanzhilin
 * @Date: 2022-05-03 20:46:11
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-05-04 23:30:50
-->
<template>
  <div>
    <release-notice />
  </div>
</template>

<script lang="ts">
import releaseNotice from '../components/ReleasrNotice.vue';
export default {
	components: {
		'release-notice': releaseNotice
	},
	setup() {}
};
</script>

<style lang="less" scoped>
</style>