<!--
 * @Author: shanzhilin
 * @Date: 2022-05-04 22:44:47
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-05-04 23:46:15
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
                   size="large">
          <el-option v-for="item in classList"
                     :key="item.c_id"
                     :label="item.classname"
                     :value="item.classname" />
        </el-select>
        <el-input type="text"
                  placeholder="请输入通知标题"
                  size="large" />
        <el-button type="primary"
                   size="large">发布通知</el-button>
      </div>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-input :rows="20"
                    type="textarea"
                    placeholder="请输入内容" />
        </el-col>
        <el-col :span="12">
          <el-upload class="upload-demo"
                     drag
                     action="/api/upload/file"
                     :show-file-list="false"
                     :on-success="uploadSucess"
                     :before-upload="beforeUpload">
            <el-icon class="el-icon--upload">
              <upload-filled />
            </el-icon>
            <div class="el-upload__text">
              <em>点击上传小于5M的文件</em>
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
import { ElMessage } from 'element-plus';
import type { UploadFile } from 'element-plus';
import { UploadFilled } from '@element-plus/icons-vue';

export default {
	components: {
		UploadFilled
	},
	setup() {
		const state = reactive({
			greade: '',
			classList: []
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

		getClsses();

		return {
			...toRefs(state),
			getClsses
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
			height: 350px !important;
			.el-icon--upload {
				margin-top: 0px;
			}
		}
	}
}
</style>