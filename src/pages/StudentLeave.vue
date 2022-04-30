<!--
 * @Author: shanzhilin
 * @Date: 2022-04-28 19:47:14
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-04-30 22:59:41
-->
<template>
  <div>
    <el-card class="card">
      <template #header>
        <div class="card-header">
          <h3>请假</h3>
        </div>
      </template>
      <el-select v-model="applyInfo.leaveType"
                 size="large"
                 placeholder="请假理由">
        <el-option v-for="item in leavetypelist"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value" />
      </el-select>
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

enum Status {
	'审核中',
	'未读',
	'已读'
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
                leavetype:'',
                dateTime:[],
                status: 0,
                classes:''
            },
            leavetypelist:[
                {label:'病假',value:'病假'},
                {label:'事假',value:'事假'},
                {label:'外出',value:'外出'},
                {label:'其他',value:'其他'}
            ]
		});
		return {
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
	margin-bottom: 30px;
}
.el-pagination {
	display: flex;
	justify-content: center;
	margin-top: 20px;
}
</style>
