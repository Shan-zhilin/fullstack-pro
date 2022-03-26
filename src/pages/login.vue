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
                placeholder="请输入用户名"
                v-model="username" />
      <el-input size="large"
                placeholder="请输入密码"
                type="password"
                v-model="password" />
      <el-button type="success"
                 @click="login">登录</el-button>
      <div class="register">
        <span @click="openDialog('忘记密码')">忘记密码</span>
        <span @click="openDialog('立即注册')">立即注册</span>
      </div>
    </div>
    <el-dialog v-model="dialogShow"
               :title='dialogType'
               width="30%">
        <el-input placeholder="请输入用户名"/>
        <el-input placeholder="请输入密码" type="password"/>
        <el-input placeholder="请输入emial"/>
        <el-button @click="changeHandler">确认提交</el-button>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { ref, reactive, toRefs } from 'vue';
import { ElMessage } from 'element-plus';
import { userLogin, userRegister, updateUserInfo } from '../api/user';

interface dataProos {
	username: string;
	password: string;
	email?: string;
}

export default {
	setup(props: any) {
		// 登录信息
		const loginData = reactive<dataProos>({
			username: '',
			password: ''
		});
        let dialogOption = reactive({
            dialogType:'',
            dialogShow:false
        })
        // 注册 重置
        const changeData = reactive<dataProos>({
            username:'',
            password:'',
            email:''
        })

		// 登录方法
		const login = () => {
			if (!loginData.username || !loginData.password) {
				ElMessage.error({
					message: '用户名或密码不能为空'
				});
				return;
			}
			userLogin(loginData).then(res => {
				if (res.success) {
					ElMessage.success({
						message: '登录成功'
					});
				} else {
				}
			});
		};

		// 显示弹出框
		const openDialog = (type: string) => {
			dialogOption.dialogType = type
            dialogOption.dialogShow = !dialogOption.dialogShow
		};

        // 注册 修改方法
        const changeHandler = () => {
            if (!changeData.username || !changeData.password || !changeData.email) {
                ElMessage.error({
                    message:"所需信息不能为空"
                })
                return
            }
            if (dialogOption.dialogType === '忘记密码') {
                updateUserInfo(changeData).then(res => {

                })
            }else {
                userRegister(changeData).then(res => {
                    
                })
            }
        }
		return {
			login,
            openDialog,
            updateUserInfo,
            ...toRefs(changeData),
            ...toRefs(dialogOption),
			...toRefs(loginData)
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
