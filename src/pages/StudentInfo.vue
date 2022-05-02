<!--
 * @Author: shanzhilin
 * @Date: 2022-04-28 19:53:40
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-05-02 20:46:44
-->
<template>
  <div>
    <user-info :isUpdate="true"/>
  </div>
</template>

<script lang="ts">
import userInfo from '../components/UserInfo.vue';
export default {
	components: {
		'user-info': userInfo
	},
	setup() {
    }
};
</script>

<style lang="less" scoped>
</style>



