<!--
 * @Author: shanzhilin
 * @Date: 2022-05-04 22:44:47
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-05-05 16:26:16
-->
<template>
  <div class="noticeContent">
    <el-card>
      <template #header>
        <div class="card-header">
          <h3>发布通知</h3>
        </div>
      </template>
      <div class="infoContent">
        <el-date-picker type="year"
                        v-model="greade"
                        placeholder="年级"
                        size="large"
                        @change="getClsses" />
        <el-select v-model="classes"
                   placeholder="Select"
                   size="large"
                   collapse-tags
                   multiple>
          <el-option v-for="item in classList"
                     :key="item.c_id"
                     :label="item.classname"
                     :value="item.classname" />
        </el-select>
        <el-input type="text"
                  placeholder="请输入通知标题"
                  size="large"
                  v-model="title" />
        <el-button type="primary"
                   size="large"
                   @click="publishNotice">发布通知</el-button>
      </div>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-input :rows="20"
                    type="textarea"
                    placeholder="请输入内容"
                    v-model="content" />
        </el-col>
        <el-col :span="12">
          <el-upload class="upload-demo"
                     drag
                     accept=".pdf"
                     action="/api/upload/file"
					 :file-list="fileList"
                     :show-file-list="true"
                     :on-success="uploadSucess"
                     :before-upload="beforeUpload">
            <el-icon class="el-icon--upload">
              <upload-filled />
            </el-icon>
            <div class="el-upload__text">
              <em>点击上传小于5M的PDF文件</em>
            </div>
          </el-upload>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';
import { getClassList } from '../api/class';
import { addNotice } from '../api/notice';
import { ElMessage } from 'element-plus';
import type { UploadFile } from 'element-plus';
import { UploadFilled } from '@element-plus/icons-vue';

interface Iprops {
	title: string;
	classes: string;
	content: string;
	adjunct: string;
	greade: string;
	classList: string[];
	fileList: object[];
}
export default {
	components: {
		UploadFilled
	},
	setup() {
		const state = reactive<Iprops>({
			title: '',
			classes: '',
			content: '',
			adjunct: '',
			greade: '',
			classList: [],
			fileList: []
		});

		// 年级选项发生变化时重新请求对应的班级列表
		const getClsses = async () => {
			const year = new Date(state.greade).getFullYear();
			const res: any = await getClassList(
				!year || year == 1970 ? {} : { queryInfo: JSON.stringify({ grade: year }) }
			);

			if (res.success) {
				state.classList = res.value;
			} else {
				ElMessage.error({
					message: '班级列表获取失败'
				});
			}
		};

		// 发布通知
		const publishNotice = async () => {
			if (!state.title || !state.classes || !state.content) {
				ElMessage.error({
					message: '标题,班级,内容不可缺少'
				});
				return;
			}
			const res: any = await addNotice({
				title: state.title,
				classes: Array.isArray(state.classes) ? state.classes.join(',') : state.classes,
				content: state.content,
				adjunct: state.adjunct
			});

			if (res.success) {
				ElMessage({
					type: 'success',
					message: res.message
				});
				state.title = '';
				state.classes = '';
				state.content = '';
				state.adjunct = '';
				state.fileList = [];
			} else {
				ElMessage.error({
					message: res.message
				});
			}
		};
		// 上传校验函数
		const beforeUpload = (file: UploadFile) => {
			const { size } = file;
			// 判断图片尺寸是否超过2M
			if (Number(size) > 1024 * 1024 * 5) {
				ElMessage.error({
					message: '文件大小不能超过2M'
				});
				return false;
			}
		};

		// 上传成功回调
		const uploadSucess = (res: any, uploadFile: UploadFile) => {
			const { name } = uploadFile;
			if (res.success) {
				state.adjunct = res.url;
			}
			ElMessage.success({
				message: res.message
			});
		};
		getClsses();

		return {
			getClsses,
			publishNotice,
			beforeUpload,
			uploadSucess,
			...toRefs(state)
		};
	}
};
</script>

<style lang="less" scoped>
.noticeContent {
	h3 {
		margin: 0;
		text-align: center;
	}
	.infoContent {
		display: flex;
		.el-input {
			width: 300px;
			margin-right: 30px;
		}
		.el-select {
			margin: 0 30px;
		}
	}
	.el-row {
		margin-top: 20px;
	}
	::v-deep(.el-upload) {
		width: 100% !important;
		.el-upload-dragger {
			display: inline-flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 100% !important;
			height: 356px !important;
			.el-icon--upload {
				margin-top: 0px;
			}
		}
	}
}
</style>