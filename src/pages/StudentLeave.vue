<!--
 * @Author: shanzhilin
 * @Date: 2022-04-28 19:47:14
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-05-02 16:09:16
-->
<template>
  <div class="studentInfoContent">
    <el-row :gutter="20">
      <el-col :span="14">
        <el-card>
          <template #header>
            <div class="card-header">
              <h3>我的申请</h3>
            </div>
          </template>
          <el-table style="width: 100%"
                    max-height="435"
                    :data="tableData">
            <el-table-column fixed
                             prop="createtime"
                             label="申请时间" />
            <el-table-column prop="leavetype"
                             label="类型" />
            <el-table-column prop="reason"
                             label="详细信息">
              <template #default="scope">
                <el-button type="text"
                           @click="openDialog(scope.row.reason)">查看内容</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="status"
                             label="状态" />
          </el-table>
          <el-pagination :currentPage="currentPage"
                         :page-size="pageSize"
                         :page-sizes="[10, 20, 30, 40]"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="totalNum"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange" />
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card class="card">
          <template #header>
            <div class="card-header">
              <h3>请假</h3>
            </div>
          </template>

          <el-select v-model="applyInfo.leavetype"
                     size="large"
                     placeholder="请假类型">
            <el-option v-for="item in leavetypelist"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value" />
          </el-select>
          <el-date-picker v-model="applyInfo.dateTime"
                          type="datetimerange"
                          range-separator="至"
                          start-placeholder="起始时间"
                          end-placeholder="结束时间"
                          value-format="YYYY-MM-DD HH:mm:ss"
                          size="large" />

          <el-input v-model="applyInfo.reason"
                    :rows="15"
                    type="textarea"
                    placeholder="请输入理由" />

          <el-button class="submitBtn"
                     type="primary"
                     size="large"
                     @click="submit">提交</el-button>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog v-model="showDialog"
               title="请假详情"
               width="30%"
               @close="openDialog('')">
      <p>{{dialogContent}}</p>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';
import { getUserDataByToken } from '../api/user';
import { addLeave, getAllLeave } from '../api/leave';
import { ElMessage } from 'element-plus';

enum Status {
	'审核中',
	'同意',
	'拒绝'
}
export default {
	setup() {
		const state = reactive({
			tableData: [],
			totalNum: 0,
			pageSize: 10,
			currentPage: 1,
			applyInfo: {
				u_id: '',
				reason: '',
				leavetype: '',
				dateTime: [],
				status: 0,
				classes: '',
				username: '',
				c_id: ''
			},
			leavetypelist: [
				{ label: '病假', value: '病假' },
				{ label: '事假', value: '事假' },
				{ label: '外出', value: '外出' },
				{ label: '其他', value: '其他' }
			],
			showDialog: false,
			dialogContent: ''
		});
		/* 获取本人所有申请 */
		const getMyApply = () => {
			getAllLeave({ u_id: state.applyInfo.u_id }).then((res: any) => {
				if (res.success) {
					state.tableData = res.value.map((item: any) => {
						item.status = Status[item.status];
						return item;
					});
					state.totalNum = res.count;
				}
			});
		};

		/* 根据token获取用户信息 */
		const getUserId = () => {
			getUserDataByToken({
				token: window.localStorage.getItem('token')
			}).then((res: any) => {
				if (res.success) {
					state.applyInfo.u_id = res.value.id;
					state.applyInfo.classes = res.value.class;
					state.applyInfo.username = res.value.username;
					state.applyInfo.c_id = res.value.c_id;
					getMyApply();
				} else {
					ElMessage.error('用户信息解析失败');
				}
			});
		};

		/* 提交申请 */
		const submit = () => {
			if (
				!state.applyInfo.reason ||
				!state.applyInfo.leavetype ||
				state.applyInfo.dateTime.length == 0
			) {
				ElMessage.error('请假所需信息不能为空');
				return;
			}
			const applyInfo = JSON.parse(JSON.stringify(state.applyInfo));
			applyInfo.starttime = state.applyInfo.dateTime[0];
			applyInfo.endtime = state.applyInfo.dateTime[1];
			delete applyInfo.dateTime;

			addLeave(applyInfo).then((res: any) => {
				ElMessage({
					type: res.success ? 'success' : 'error',
					message: res.message
				});
				if (res.success) {
					state.applyInfo.reason = '';
					state.applyInfo.leavetype = '';
					state.applyInfo.dateTime = [];
					getMyApply();
				}
			});
		};

		/* 打开查看详情弹框 */
		const openDialog = (content: string) => {
			state.showDialog = !state.showDialog;
			state.dialogContent = content;
		};
		getUserId();
		return {
			submit,
			openDialog,
			...toRefs(state)
		};
	}
};
</script>

<style lang="less" scoped>
.studentInfoContent {
	height: 100%;
	h3 {
		margin: 0;
		text-align: center;
	}
	.card {
		margin-bottom: 20px;
	}
	.el-pagination {
		display: flex;
		justify-content: center;
		margin-top: 20px;
	}
	.el-select {
		margin-bottom: 15px;
	}

	.submitBtn,
	.el-textarea {
		width: 100%;
		margin-top: 15px;
	}
	.el-row {
		height: 100%;
		.el-col {
			height: 100%;
			.el-card.is-always-shadow {
				height: 100%;
			}
		}
	}
}
</style>
