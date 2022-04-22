<!--
 * @Author: shanzhilin
 * @Date: 2022-04-16 16:14:42
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-04-22 23:05:27
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
              <el-input :disabled="!!id"
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
            <el-form-item label="修改密码"
                          v-show="id">
              <el-input type="password"
                        v-model="info.repassword"
                        placeholder="请输入密码"
                        show-password />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="info.mailbox" />
            </el-form-item>
            <el-form-item label="电话">
              <el-input v-model="info.tell" />
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
            <el-form-item label="年级"
                          v-if="info.type == 2">
              <el-date-picker type="year"
                              v-model="info.greade"
                              placeholder="年级"
                              @change="dateChange" />
            </el-form-item>
            <el-form-item label="班级"
                          v-if="info.type == 2">
              <el-select v-model="info.class"
                         placeholder="Select">
                <el-option v-for="item in classList"
                           :key="item.c_id"
                           :label="item.classname"
                           :value="item.classname" />
              </el-select>
            </el-form-item>
            <el-form-item label="类型">
              <el-radio v-model="info.type"
                        :label="1"
                        border
                        :disabled='id'
                        size="large">管理员</el-radio>
              <el-radio v-model="info.type"
                        :label="2"
                        border
                        :disabled='id'
                        size="large">学生</el-radio>
              <el-radio v-model="info.type"
                        :label="3"
                        border
                        :disabled='id'
                        size="large">教师</el-radio>
            </el-form-item>
          </el-form>
          <el-button type="primary"
                     size="large"
                     @click="confirmhandler">提交</el-button>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <h3>上传头像</h3>
          <el-upload class="upload-demo"
                     drag
                     action="/api/upload"
                     :show-file-list="false"
                     :on-success="uploadSucess"
                     :before-upload="beforeUpload">
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
              <img :src="info.head || 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'" />
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
import { addUser, updateUserInfo } from '../api/user';
import { getClassList } from '../api/class';
import { ElMessage } from 'element-plus';
import type { UploadFile } from 'element-plus';

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
				id: id || '',
				username: '',
				password: '',
				repassword: '',
				head: '',
				mailbox: '',
				address: '',
				sex: 1,
				type: 2,
				tell: '',
				greade: '',
				class: ''
			},
			classList: []
		});

		// 获取班级列表
		const getClasses = (args: any) => {
			getClassList(args).then((res: any) => {
				if (res.success) {
					state.classList = res.value;
				} else {
					ElMessage.error({
						message: '班级列表获取失败'
					});
				}
			});
		};

		// 年级选项发生变化时重新请求对应的班级列表
		const dateChange = () => {
			const year = new Date(state.info.greade).getFullYear();
			getClasses(year == 1970 ? {} : { queryInfo: JSON.stringify({ grade: year }) });
		};

		// 提交
		const confirmhandler = () => {
			if (
				!state.info.id ||
				!state.info.username ||
				!state.info.password ||
				!state.info.tell ||
				!state.info.address ||
				!state.info.mailbox
			) {
				ElMessage.error({
					message: '所需基本信息不能为空'
				});
				return;
			}
			if (state.info.type == 2) {
				if (!state.info.class) {
					ElMessage.error({
						message: '学生班级/年级不能为空'
					});
					return;
				}
			}
			// 先判断是注册还是修改
			if (id) {
				//如果存在说明为修改
				if (state.info.repassword) {
					if (state.info.repassword == state.info.password) {
						ElMessage.error({
							message: '修改后的密码不能与原始密码相同'
						});
					}
				}
				const updateinfo = JSON.parse(JSON.stringify(state.info));
				if (updateinfo.repassword) {
					if (updateinfo.repassword == updateinfo.password) {
						ElMessage.error({
							message: '修改后的密码不能与原始密码相同'
						});
						return;
					} else {
						updateinfo.password = updateinfo.repassword;
					}
				}
				updateUserInfo({ info: JSON.stringify(updateinfo) }).then((res: any) => {
					if (res.success) {
						ElMessage.success({
							message: '修改成功'
						});
					} else {
						ElMessage.error({
							message: '修改失败'
						});
					}
				});
			} else {
				//不存在则为新增
				addUser({ info: JSON.stringify(state.info) }).then((res: any) => {
					if (res.success) {
						ElMessage.success({
							message: '注册成功'
						});
					} else {
						ElMessage.error({
							message: '注册失败'
						});
					}
				});
			}
		};

		// 文件上传成功处理函数
		const uploadSucess = (res: any) => {
			if (res.success) {
				state.info.head = res.url;
				if (id) {
					const updateinfo = {
						id,
						head: res.url,
						type: state.info.type
					};
					updateUserInfo({ info: JSON.stringify(updateinfo) }).then((response: any) => {
						if (response.success) {
							ElMessage.success({
								message: '上传成功'
							});
						}
					});
				} else {
					ElMessage.info({
						message: '请填写基本信息'
					});
				}
			} else {
				ElMessage.error({
					message: '上传失败'
				});
			}
		};

		const beforeUpload = (file: UploadFile) => {
			const { size } = file;
			// 判断图片尺寸是否超过2M
			if (Number(size) > 1024 * 1024 * 2) {
				ElMessage.error({
					message: '图片尺寸不能超过2M'
				});
				return false;
			}
		};
		// 获取班级列表
		getClasses({});
		return {
			router,
			id,
			dateChange,
			confirmhandler,
			uploadSucess,
			beforeUpload,
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
		.el-form-item {
			margin-bottom: 14px;
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
			margin-top: 20px;
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