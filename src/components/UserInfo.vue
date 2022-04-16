<!--
 * @Author: shanzhilin
 * @Date: 2022-04-16 16:14:42
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-04-16 22:35:56
-->
<template>
  <div class="userInfoContent">
    <el-row :gutter="15">
      <el-col :span="12">
        <el-card>
          <h3>基本信息</h3>
          <el-form label-width="auto"
                   :label-position="labelPosition"
                   :size="size">
            <el-form-item label="ID">
              <el-input :disabled="!!info.id"
                        v-model="info.id" />
            </el-form-item>
            <el-form-item label="用户名">
              <el-input v-model="info.username" />
            </el-form-item>
            <el-form-item label="密码">
              <el-input type="password"
                        v-model="info.password"
                        placeholder="请输入密码"
                        show-password />
            </el-form-item>
            <el-form-item label="修改密码" v-show="id">
              <el-input type="password"
                        v-model="info.repassword"
                        placeholder="请输入密码"
                        show-password />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="info.mailbox" />
            </el-form-item>
            <el-form-item label="地址">
              <el-input v-model="info.address" />
            </el-form-item>
            <el-form-item label="性别">
              <el-radio :label="1"
                        v-model="info.sex">男</el-radio>
              <el-radio :label="0"
                        v-model="info.sex">女</el-radio>
            </el-form-item>
            <el-form-item label="年级">
              <el-date-picker type="year"
                              v-model="info.greade"
                              placeholder="年级" />
            </el-form-item>
            <el-form-item label="班级">
              <el-select v-model="info.class"
                         placeholder="Select">
                <el-option v-for="item in classList"
                           :key="item.id"
                           :label="item.clasname"
                           :value="item.c_id" />
              </el-select>
            </el-form-item>
            <el-form-item label="类型">
              <el-radio v-model="info.type"
                        :label="1"
                        border
                        :disabled = 'id'
                        size="large">管理员</el-radio>
              <el-radio v-model="info.type"
                        :label="2"
                        border
                        :disabled = 'id'
                        size="large">学生</el-radio>
              <el-radio v-model="info.type"
                        :label="3"
                        border
                        :disabled = 'id'
                        size="large">教师</el-radio>
            </el-form-item>
          </el-form>
          <el-button type="primary"
                     size="large">提交</el-button>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <h3>上传头像</h3>
          <el-upload class="upload-demo"
                     drag
                     action="https://jsonplaceholder.typicode.com/posts/">
            <el-icon class="el-icon--upload">
              <upload-filled />
            </el-icon>
            <div class="el-upload__text">
              <em>点击上传小于2M的图片</em>
            </div>
          </el-upload>
          <div class="avatar">
            <span>当前头像</span>
            <el-avatar :size="200">
              <img :src="info.head" />
            </el-avatar>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { UploadFilled } from '@element-plus/icons-vue';

enum Sex {
	'女',
	'男'
}

enum UserType {
	'管理员' = 1,
	'学生',
	'老师'
}
export default {
	components: {
		UploadFilled
	},
	setup(props: any) {
		const router = useRouter();
		const route = useRoute();
		const {
			params: { id }
		} = route;

		const state = reactive({
			info: {
				id: '',
				username: '',
				password: '',
				repassword: '',
				head: 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png',
				mailbox: '',
				address: '',
				sex: 1,
				type: 1,
				tell: '',
				greade: '',
				class: ''
			},
			classList: []
		});
		return {
			router,
            id,
			...toRefs(state)
		};
	}
};
</script>

<style lang="less" scoped>
.userInfoContent {
	height: 100%;
	.el-row {
		height: 100%;
		.el-col {
			height: 100%;
			.el-card.is-always-shadow {
				height: 100%;
			}
		}
		h3 {
			margin: 0 0 15px 0;
			text-align: center;
		}
		.el-button {
			width: 100%;
		}
		.avatar {
			display: flex;
			align-items: center;
			span {
				margin-right: 30px;
			}
		}
	}
	::v-deep(.el-upload) {
		width: 100% !important;
		.el-upload-dragger {
			display: inline-flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 100% !important;
			height: 350px !important;
			.el-icon--upload {
				margin-top: 0px;
			}
		}
	}
}
</style>