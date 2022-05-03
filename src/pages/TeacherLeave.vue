<!--
 * @Author: shanzhilin
 * @Date: 2022-05-03 20:48:54
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-05-03 23:19:30
-->
<template>
  <div>
    <el-card>
      <template #header>
        <div class="card-header">
          <h3>请假申请</h3>
        </div>
      </template>
      <el-table style="width: 100%"
                max-height="435"
                :data="tableData">
        <el-table-column fixed
                         prop="createtime"
                         label="申请时间" />
        <el-table-column fixed
                         prop="username"
                         label="申请人" />
        <el-table-column prop="leavetype"
                         label="请假类型" />
        <el-table-column prop="reason"
                         label="详细信息">
          <template #default="scope">
            <el-button type="text"
                       @click="openDialog(scope.row.reason)">查看内容</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="status"
                         label="审核结果" />
        <el-table-column prop="reason"
                         label="操作">
          <template #default="scope">
            <el-button type="success"
                       :disabled="scope.row.status=='同意'"
                       @click="checkLeaveApply(scope.row.l_id,1)">同意</el-button>
            <el-button type="danger"
                       :disabled="scope.row.status=='拒绝'"
                       @click="checkLeaveApply(scope.row.l_id,2)">拒绝</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :currentPage="currentPage"
                     :page-size="pageSize"
                     :page-sizes="[10, 20, 30, 40]"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="totalNum"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" />
    </el-card>
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
import { getAllLeave, checkLeave } from '../api/leave';
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
			showDialog: false,
			dialogContent: ''
		});
		/* 打开查看详情弹框 */
		const openDialog = (content: string) => {
			state.showDialog = !state.showDialog;
			state.dialogContent = content;
		};
		/* 获取学生请假信息 */
		const getLeaveData = async () => {
			const res: any = await getUserDataByToken({ token: window.localStorage.getItem('token') });
			if (res.success) {
				const data: any = await getAllLeave({
					c_id: res.value.c_id
				});
				if (data.success) {
					state.tableData = data.value.map((item: any) => {
						item.status = Status[item.status];
						return item;
					});
					state.totalNum = data.count;
				} else {
					ElMessage.error(data.message);
				}
			} else {
				ElMessage.error(res.message);
			}
		};

		/* 审核学生 */
		const checkLeaveApply = async (l_id: string, status: number) => {
			const res: any = await checkLeave({
				l_id,
				status
			});
			if (res.success) {
				ElMessage.success('审核成功');
				getLeaveData();
			} else {
				ElMessage.error(res.message);
			}
		};

		getLeaveData();
		return {
			openDialog,
			checkLeaveApply,
			...toRefs(state)
		};
	}
};
</script>

<style lang="less" scoped>
h3 {
	margin: 0;
	text-align: center;
}
.el-pagination {
	display: flex;
	justify-content: center;
	margin-top: 20px;
}
</style>