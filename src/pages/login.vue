<!--
 * @Author: shanzhilin
 * @Date: 2022-03-26 15:12:27
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-04-06 21:45:07
-->
<template>
  <div class="content">
    <div class="form_content">
      <h2>校园疫情管理系统</h2>
      <el-input size="large"
                placeholder="请输入姓名"
                v-model="loginData.username" />
      <el-input size="large"
                placeholder="请输入密码"
                type="password"
                v-model="loginData.password"
				@keyup.enter.native="login" />
      <div class="redio">
        <el-radio v-model="loginData.type"
                  :label="1"
                  border>管理员</el-radio>
        <el-radio v-model="loginData.type"
                  :label="2"
                  border>学生</el-radio>
        <el-radio v-model="loginData.type"
                  :label="3"
                  border>教师</el-radio>
      </div>
      <el-button type="primary"
                 @click="login"
                 size="large">登录</el-button>
    </div>

  </div>
</template>
<script lang="ts">
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { userLogin } from '../api/user';
import { useRouter } from 'vue-router';

export default {
	setup(props: any) {
		// 登录信息
		const loginData = reactive({
			username: '',
			password: '',
			type: 1
		});

		const router = useRouter();

		// 登录方法
		const login = () => {
			if (!loginData.username || !loginData.password) {
				ElMessage({
					message: '用户名或密码不能为空',
					type: 'error'
				});
				return;
			}
			userLogin(loginData).then((res: any) => {
				if (res.success) {
					ElMessage({
						message: '登录成功',
						type: 'success'
					});
					if (res.jwt_token) {
						window.localStorage.setItem('token', res.jwt_token);
					}
					router.push({
						path: '/home'
					});
				} else {
					ElMessage({
						message: res.message,
						type: 'error'
					});
				}
			});
		};

		return {
			login,
			loginData
		};
	}
};
</script>
<style lang="less" scoped>
.content {
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background: url('../assets/kangyi.jpg');
	background-size: 100% 100%;

	h2 {
		text-align: center;
		margin-top: 0;
		margin-bottom: 40px;
	}
	.el-input {
		margin-bottom: 20px;
	}
	.el-button {
		margin-top: 20px;
		width: 100%;
	}
	.form_content {
		width: 350px;
		padding: 20px;
		background-color: rgba(255, 255, 255, 0.9);
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 5px;
	}
	.redio {
		display: flex;
		justify-content: space-around;
	}
}
</style>
