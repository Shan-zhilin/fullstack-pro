<!--
 * @Author: shanzhilin
 * @Date: 2022-03-29 16:43:26
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-04-28 20:17:11
-->
<template>
  <div class="content">
    <el-menu class="el-menu-vertical-demo"
             default-active="1">
      <h2>疫情管理系统</h2>
      <el-menu-item index="1"
                    @click="routetHop({path:'/home'})">
        <el-icon>
          <house />
        </el-icon>
        <span>首页</span>
      </el-menu-item>
      <div v-show="userInfo.type === 1">
        <el-menu-item index="2"
                      @click="routetHop({path:'/student/home'})">
          <el-icon>
            <user />
          </el-icon>
          <span>学生管理</span>
        </el-menu-item>
        <el-menu-item index="3"
                      @click="routetHop({path:'/teacher/home'})">
          <el-icon>
            <avatar />
          </el-icon>
          <span>教师管理</span>
        </el-menu-item>
        <el-menu-item index="4"
                      @click="routetHop({path:'/notice'})">
          <el-icon>
            <bell />
          </el-icon>
          <span>通知管理</span>
        </el-menu-item>
        <el-menu-item index="5"
                      @click="routetHop({path:'/classes'})">
          <el-icon>
            <circle-plus />
          </el-icon>
          <span>班级管理</span>
        </el-menu-item>
      </div>

      <div v-show="userInfo.type === 2">
        <el-menu-item index="6"
                      @click="routetHop({path:'/student/notice'})">
          <el-icon>
            <bell />
          </el-icon>
          <span>我的通知</span>
        </el-menu-item>
        <el-menu-item index="7"
                      @click="routetHop({path:'/student/healthy'})">
          <el-icon>
            <document />
          </el-icon>
          <span>健康填报</span>
        </el-menu-item>
        <el-menu-item index="8"
                      @click="routetHop({path:'/student/leave'})">
          <el-icon>
            <chat-line-square />
          </el-icon>
          <span>请假申请</span>
        </el-menu-item>
        <el-menu-item index="9"
                      @click="routetHop({path:'/student/info'})">
          <el-icon>
            <message />
          </el-icon>
          <span>个人信息</span>
        </el-menu-item>
      </div>

      <div v-show="userInfo.type === 3">
        <el-menu-item index="10">
          <el-icon>
            <alarm-clock />
          </el-icon>
          <span>通知管理</span>
        </el-menu-item>
        <el-menu-item index="11">
          <el-icon>
            <chat-dot-square />
          </el-icon>
          <span>请假管理</span>
        </el-menu-item>
        <el-menu-item index="12"
                      route="">
          <el-icon>
            <alarm-clock />
          </el-icon>
          <span>个人信息</span>
        </el-menu-item>
      </div>

    </el-menu>

    <div class="rightBody">
      <nav>
        <div>
          <span>您好！</span>
          <span>{{userInfo.username}}&nbsp;&nbsp;</span>
        </div>
        <div class="setting">
          <el-button type="text"
                     @click="quit">退出登录</el-button>
        </div>
      </nav>
      <div class="rightContent">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
	CirclePlus,
	Bell,
	Avatar,
	User,
	House,
	Document,
	ChatLineSquare,
	Message,
	AlarmClock,
	ChatDotSquare
} from '@element-plus/icons-vue';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getUserDataByToken } from '../api/user';
import { ElMessage } from 'element-plus/lib/components';

export default {
	components: {
		CirclePlus,
		Bell,
		Avatar,
		User,
		House,
		Document,
		ChatLineSquare,
		Message,
		AlarmClock,
		ChatDotSquare
	},
	setup() {
		const router = useRouter();

		const userInfo = reactive({
			username: '',
			type: 1 //1 管理员,2 学生,3 老师
		});

		// 路由跳转方法
		const routetHop = (arg: any) => {
			const { path } = arg;
			router.push({
				path
			});
		};

		// 退出方法
		const quit = () => {
			window.localStorage.removeItem('token');
			router.push('/login');
		};

		// 获取验证信息
		getUserDataByToken({
			token: window.localStorage.getItem('token')
		}).then((res: any) => {
			if (res.success) {
				const { username, type } = res.value;
				userInfo.username = username;
				userInfo.type = type;
			} else {
				ElMessage.error({
					message: '验证过期请重新登录'
				});
				router.push('/login');
			}
		});

		return {
			routetHop,
			userInfo,
			quit
		};
	}
};
</script>

<style lang="less" scoped>
.content {
	display: flex;

	.el-menu-vertical-demo {
		// flex-shrink: 0;
		width: 200px;
		min-height: 100vh;
		padding-top: 20px;
		overflow: auto;
		background-color: rgb(45, 58, 75);
	}
	.example-showcase .el-dropdown-link {
		cursor: pointer;
		color: var(--el-color-primary);
		display: flex;
		align-items: center;
	}

	h2 {
		color: white;
		text-align: center;
		margin-top: 0;
	}
	.el-menu-item {
		height: 46px;
		color: white;
		font-size: 16px;
		font-weight: bold;
		&:hover {
			background-color: rgba(255, 255, 255, 0.3);
		}
		&.is-active {
			color: #409eff;
		}
	}

	.rightBody {
		width: calc(100% - 200px);
		height: 100vh;
		nav {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 50px;
			padding: 0 20px;
			border-bottom: 1px solid rgb(222, 226, 230);

			.setting {
				display: flex;
				align-items: center;
			}
		}

		.rightContent {
			box-sizing: border-box;
			height: calc(100% - 51px);
			padding: 20px;
			overflow: auto;
			background-color: #f4f6f9;
		}
	}
}
</style>