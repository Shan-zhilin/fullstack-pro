<!--
 * @Author: shanzhilin
 * @Date: 2022-03-29 16:43:26
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-03-29 22:36:54
-->
<template>
  <div class="content">
    <el-menu class="el-menu-vertical-demo"
             default-active="1">
      <h2>疫情管理系统</h2>
      <el-menu-item index="1" @click="routetHop({address:'/home'})">
        <el-icon>
          <house />
        </el-icon>
        <span>首页</span>
      </el-menu-item>

      <el-menu-item index="2"
                    @click="routetHop({address:'/student/home'})">
        <el-icon>
          <user />
        </el-icon>
        <span>学生管理</span>
      </el-menu-item>
      <el-menu-item index="3">
        <el-icon>
          <avatar />
        </el-icon>
        <span>教师管理</span>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon>
          <bell />
        </el-icon>
        <span>通知管理</span>
      </el-menu-item>
      <el-menu-item index="5">
        <el-icon>
          <circle-plus />
        </el-icon>
        <span>添加班级</span>
      </el-menu-item>

      <el-menu-item index="6">
        <el-icon>
          <bell />
        </el-icon>
        <span>我的通知</span>
      </el-menu-item>
      <el-menu-item index="7">
        <el-icon>
          <document />
        </el-icon>
        <span>健康填报</span>
      </el-menu-item>
      <el-menu-item index="8">
        <el-icon>
          <chat-line-square />
        </el-icon>
        <span>请假申请</span>
      </el-menu-item>
      <el-menu-item index="9">
        <el-icon>
          <message />
        </el-icon>
        <span>个人信息</span>
      </el-menu-item>

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
      <el-menu-item index="12">
        <el-icon>
          <alarm-clock />
        </el-icon>
        <span>个人信息</span>
      </el-menu-item>

    </el-menu>

    <div class="rightBody">
      <nav>
        <div>1</div>
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
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

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

		// 路由跳转方法
		const routetHop = ({ address }: { address: string; [key: string]: any }) => {
			router.push(address);
		};
		return {
			routetHop
		};
	}
};
</script>

<style lang="less" scoped>
.content {
	display: flex;

	.el-menu-vertical-demo {
		width: 200px;
		min-height: 100vh;
		padding-top: 20px;
		overflow: auto;
		background-color: rgb(45, 58, 75);
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
		flex: 1;
		nav {
			display: block;
			height: 50px;
			border-bottom: 1px solid rgb(222, 226, 230);
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