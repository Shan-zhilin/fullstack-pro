<!--
 * @Author: shanzhilin
 * @Date: 2022-04-16 16:14:42
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-05-03 21:12:09
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
              <el-input :disabled="isUpdate"
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
                          v-show="isUpdate">
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
            <el-form-item label="年级">
              <el-date-picker type="year"
                              v-model="info.grade"
                              placeholder="年级"
                              format="YYYY"
                              value-format="YYYY"
                              @change="dateChange" />
            </el-form-item>
            <el-form-item label="班级">
              <el-select v-model="info.classes"
                         placeholder="Select"
                         :multiple="info.type == 3"
                         clearable
                         collapse-tags>
                <el-option v-for="item in classList"
                           :key="item.c_id"
                           :label="item.classname"
                           :value="item.classname" />
              </el-select>
            </el-form-item>
            <el-form-item label="类型">
              <el-radio-group v-model="info.type"
                              @change="() => {info.classes = '';info.c_id=''}">
                <el-radio :label="1"
                          border
                          :disabled='isUpdate'
                          size="large">管理员</el-radio>
                <el-radio :label="2"
                          border
                          :disabled='isUpdate'
                          size="large">学生</el-radio>
                <el-radio :label="3"
                          border
                          :disabled='isUpdate'
                          size="large">教师</el-radio>
              </el-radio-group>

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
import { reactive, toRefs, ref } from 'vue';
import { useRouter } from 'vue-router';
import { UploadFilled } from '@element-plus/icons-vue';
import { addUser, updateUserInfo, getOneUserInfo, getUserDataByToken } from '../api/user';
import { getClassList } from '../api/class';
import { ElMessage } from 'element-plus';
import type { UploadFile } from 'element-plus';

interface Iprops {
	id: string;
	username: string;
	password: string;
	repassword: string;
	head: string;
	mailbox: string;
	address: string;
	sex: number;
	type: number;
	tell: string;
	greade: string;
	classes: string;
	c_id: string;
	[key: string]: any;
}
export default {
	components: {
		UploadFilled
	},
	props: {
		isUpdate: Boolean
	},
	setup(props: any) {
		const router = useRouter();

		const isUpdate = props.isUpdate;

		const state = reactive({
			info: {
				id: '',
				username: '',
				password: '',
				repassword: '',
				head: '',
				mailbox: '',
				address: '',
				sex: 1,
				type: 2,
				tell: '',
				grade: '',
				classes: '',
				c_id: ''
			},
			classList: []
		});

		// 如果是更新则获取用户信息
		const getUserInfo = () => {
			if (!isUpdate) return;
			getUserDataByToken({
				token: window.localStorage.getItem('token')
			}).then((res: any) => {
				if (res.success) {
					const { id, type } = res.value;
					getOneUserInfo({ id, type }).then((result: any) => {
						if (result.success) {
							// 这里这样写的原因是 不能直接进行 state.info[key]会有问题
							const obj: any = state.info;
							for (let key in obj) {
								obj[key] = result.value[key];
							}
							if (state.info.type == 3) {
								state.info.classes = result.value.classes.split(',');
							}
						}
					});
				} else {
					ElMessage.error('用户信息解析失败');
				}
			});
		};

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
			getClasses(
				state.info.grade == '1970' ? {} : { queryInfo: JSON.stringify({ grade: state.info.grade }) }
			);
		};

		// 提交
		const confirmhandler = () => {
			if (
				!state.info.id ||
				!state.info.username ||
				!state.info.password ||
				!state.info.tell ||
				!state.info.address ||
				!state.info.mailbox ||
				!state.info.classes
			) {
				ElMessage.error({
					message: '所需基本信息不能为空'
				});
				return;
			}
			// 将c_id 查找出来
			if (state.info.classes.length > 0) {
				if (!Array.isArray(state.info.classes)) {
					const item = state.classList.find(
						(item: any) => item.classname == state.info.classes
					) || { c_id: '' };
					state.info.c_id = item.c_id;
				}
				state.info.c_id = state.classList
					.filter((item: any) => state.info.classes.includes(item.classname) && item.c_id)
					.map((item: any) => item.c_id)
					.join(',');
			}

			state.info.classes = Array.isArray(state.info.classes)
				? state.info.classes.join(',')
				: state.info.classes;

			// 先判断是注册还是修改
			if (isUpdate) {
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
						getUserInfo()
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
				if (state.info.id) {
					const updateinfo = {
						id: state.info.id,
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

		// 如果是用户更新则需要获取用户信息
		getUserInfo();
		// 获取班级列表
		getClasses({});

		return {
			router,
			// eslint-disable-next-line vue/no-dupe-keys
			isUpdate,
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