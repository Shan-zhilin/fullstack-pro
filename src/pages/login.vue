<!--
 * @Author: shanzhilin
 * @Date: 2022-03-26 15:12:27
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-03-26 21:41:59
-->
<template>
  <div class="content">
    <div class="form_content">
      <el-input size="large"
                placeholder="请输入邮箱"
                v-model="loginData.email" />
      <el-input size="large"
                placeholder="请输入密码"
                type="password"
                v-model="loginData.password" />
      <el-button type="success"
                 @click="login">登录</el-button>
      <div class="register">
        <span @click="openDialog('忘记密码')">忘记密码</span>
        <span @click="openDialog('立即注册')">立即注册</span>
      </div>
    </div>
    <el-dialog v-model="dialogOption.dialogShow"
               :title='dialogOption.dialogType'
               width="30%"
               @close="resetData">
      <el-input placeholder="请输入用户名"
                v-model="changeData.username" />
      <el-input placeholder="请输入身份证号"
                v-model="changeData.idcard" />
      <el-input placeholder="请输入密码"
                type="password"
                v-model="changeData.password"/>
      <el-input placeholder="请输入emial"
                v-model="changeData.email" />
      <el-button @click="changeHandler">确认提交</el-button>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs } from 'vue';
import { ElMessage } from 'element-plus';
import { userLogin, userRegister, updateUserInfo } from '../api/user';

export default {
	setup(props: any) {
		// 登录信息
		const loginData = reactive({
			email: '',
			password: ''
		});
		let dialogOption = reactive({
			dialogType: '',
			dialogShow: false
		});
		// 注册 重置
		const changeData = reactive({
			username: '',
			password: '',
			email: '',
			idcard: ''
		});

		const resetData = () => {
			dialogOption.dialogType = '';
			dialogOption.dialogShow = false;
			changeData.username = '';
			changeData.password = '';
			changeData.email = '';
			changeData.idcard = '';
		};

		// 登录方法
		const login = () => {
			if (!loginData.email || !loginData.password) {
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
				} else {
					ElMessage({
						message: '登录失败',
						type: 'error'
					});
				}
			});
		};

		// 显示弹出框
		const openDialog = (type: string) => {
			dialogOption.dialogType = type;
			dialogOption.dialogShow = !dialogOption.dialogShow;
		};

		// 注册 修改方法
		const changeHandler = () => {
			console.log(changeData)
			if (
				!changeData.username ||
				!changeData.email ||
				!changeData.idcard
			) {
				ElMessage({
					message: '所需信息不能为空',
					type: 'error'
				});
				return;
			}
			if (dialogOption.dialogType === '忘记密码') {
				updateUserInfo(changeData).then((res: any) => {
					if (!res.success) {
						ElMessage({
							message: res.message,
							type: 'error'
						});
					} else {
						ElMessage({
							message: res.message,
							type: 'success'
						});
						resetData();
					}
				});
			} else {
				if (!changeData.password) {
					ElMessage({
					message: '密码不能为空',
					type: 'error'
				});
				return;
				}
				userRegister(changeData).then((res: any) => {
					if (!res.success) {
						ElMessage({
							message: res.message,
							type: 'error'
						});
					} else {
						ElMessage({
							message: res.message,
							type: 'success'
						});
						resetData();
					}
				});
			}
		};
		return {
			login,
			openDialog,
			updateUserInfo,
			changeHandler,
			resetData,
			changeData,
			dialogOption,
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
	background: url('../assets/background.jpg');
	background-size: 100% 100%;

	.el-input,
	.el-button {
		margin-bottom: 20px;
	}
	.el-button {
		width: 100%;
	}
	.form_content {
		width: 400px;
		padding: 20px;
		background-color: rgba(255, 255, 255, 0.2);
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 5px;
	}
	.register {
		display: flex;
		justify-content: space-between;
		margin-top: 20px;

		span {
			color: #fff;
			cursor: pointer;
		}
	}
}
</style>
