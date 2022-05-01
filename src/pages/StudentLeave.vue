<!--
 * @Author: shanzhilin
 * @Date: 2022-04-28 19:47:14
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-05-01 15:50:47
-->
<template>
  <div>
    <el-card class="card">
      <template #header>
        <div class="card-header">
          <h3>请假</h3>
        </div>
      </template>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-select v-model="applyInfo.leaveType"
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
        </el-col>
        <el-col :span="16">
          <el-input v-model="applyInfo.reason"
                    :rows="4"
                    type="textarea"
                    placeholder="请输入理由" />
        </el-col>
      </el-row>

      <el-button type="primary" size="large" @click="submit">提交</el-button>
    </el-card>
    <el-card>
      <template #header>
        <div class="card-header">
          <h3>我的申请</h3>
        </div>
      </template>
      <el-table style="width: 100%"
                max-height="346"
                :data="tableData">
        <el-table-column fixed
                         prop="createtime"
                         label="申请时间" />
        <el-table-column prop="title"
                         label="类型" />
        <el-table-column prop="reson"
                         label="详细信息" />
        <el-table-column prop="status"
                         label="状态">
          <template #default="scope">
            <span>{{Status[scope.row.status]}}</span>
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
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';
import { getUserDataByToken } from '../api/user';
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
			},
			leavetypelist: [
				{ label: '病假', value: '病假' },
				{ label: '事假', value: '事假' },
				{ label: '外出', value: '外出' },
				{ label: '其他', value: '其他' }
			]
		});

    /* 根据token获取用户信息 */
		const getUserId = () => {
			getUserDataByToken({
				token: window.localStorage.getItem('token')
			}).then((res: any) => {
				if (res.success) {
					state.applyInfo.u_id = res.value.id;
          state.applyInfo.classes = res.value.class; 
          state.applyInfo.username = res.value.username; 
				} else {
					ElMessage.error('用户信息解析失败');
				}
			});
		};

    /* 提交申请 */
    const submit = () => {
      console.log(state.applyInfo.dateTime)
    }
    getUserId()
		return {
      submit,
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
.card {
	margin-bottom: 20px;
}
.el-pagination {
	display: flex;
	justify-content: center;
	margin-top: 20px;
}
.el-select {
  width: 100%;
	margin-bottom: 15px;
}

.el-button {
  width: 100%;
  margin-top: 15px;
}
</style>
