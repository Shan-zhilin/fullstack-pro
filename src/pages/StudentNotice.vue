<!--
 * @Author: shanzhilin
 * @Date: 2022-04-28 19:42:38
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-04-29 21:33:53
-->
<template>
  <div class="noticeContent">
	
    <el-card>
      <el-date-picker v-model="dateRange"
                      type="datetimerange"
                      range-separator="至"
                      start-placeholder="起始时间"
                      end-placeholder="结束时间"
                      value-format="YYYY-MM-DD HH:mm:ss"
                      size="large" />
      <el-input size="large"
                v-model="title"
                :prefix-icon="Search"
                placeholder="通知标题" />
      <el-button size="large"
                 type="primary"
                 @click="search">搜索</el-button>
      <el-button size="large"
                 type="primary"
                 @click="reset">重置</el-button>
    </el-card>

    <el-card class="card">
      <el-table style="width: 100%"
                max-height="435"
                :data="tableData">
        <el-table-column fixed
                         prop="n_id"
                         label="编号" />
        <el-table-column prop="title"
                         label="标题" />
        <el-table-column prop="content"
                         label="内容" />
        <el-table-column prop="status"
                         label="状态">
          <template #default="scope">
            <span>{{scope.row.status == 0 ? '未读':'已读'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         fixed="right">
          <template #default="scope">
            <el-button :type="scope.row.status == 0 ? 'danger':'primary'"
                       :disabled="scope.row.status == 1"
                       @click="readnotice(scope.row.n_id)">{{scope.row.status == 0 ? '阅读' : '已读'}}</el-button>
          </template>
        </el-table-column>>

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
import { Search } from '@element-plus/icons-vue';
import { getAllNotice, getAllRead,readNotice } from '../api/notice';
import { getUserDataByToken } from '../api/user';
import { ElMessage } from 'element-plus';
export default {
	setup() {
		const state = reactive({
			userinfo: {
				id: '',
				class: ''
			},
			dateRange: [], //搜索时间范围
			title: '',
			tableData: [],
			totalNum: 0,
			pageSize: 10,
			currentPage: 1
		});

		/* 搜索or初始化 函数 */
		const search = () => {
			//强转一下，datapicker点击清楚icon 会将数据改成 null
			state.dateRange = Array.isArray(state.dateRange) ? state.dateRange : [];
			getAllNotice({
				title: state.title,
				currPage: state.currentPage,
				pageNum: state.pageSize,
				startTime: state.dateRange[0] ? state.dateRange[0] : '',
				endTime: state.dateRange[1] ? state.dateRange[1] : '',
				classes: state.userinfo.class
			}).then((res: any) => {
				if (res.success) {
					getAllRead({ u_id: state.userinfo.id }).then((result: any) => {
						if (result.success) {
							res.value.forEach((item: any) => {
								result.value.forEach((item2: any) => {
									if (item.n_id == item2.n_id) {
										item.status = 1;
									} else {
										item.status = 0;
									}
								});
							});
							state.tableData = res.value;
							state.totalNum = res.total;
                            console.log(state.totalNum)
						}
					});
				} else {
					ElMessage.error(res.message);
				}
			});
		};

		/* 根据token获取用户id */
		const getUserId = () => {
			getUserDataByToken({
				token: window.localStorage.getItem('token')
			}).then((res: any) => {
				if (res.success) {
					state.userinfo = res.value;
					search();
				} else {
					ElMessage.error('用户信息解析失败');
				}
			});
		};

		/* 重置函数 */
		const reset = () => {
			state.dateRange = [];
			state.title = '';
			state.tableData = [];
			state.totalNum = 0;
			state.pageSize = 10;
			state.currentPage = 1;
			search();
		};

		/* 阅读通知 */
		const readnotice =(n_id:string) => {
			console.log(n_id,state.userinfo.id)
			readNotice({
				n_id:n_id,
				u_id: state.userinfo.id
			}).then((res: any) => {
				if (res.success) {
					ElMessage.success('阅读成功');
					search();
				} else {
					ElMessage.error(res.message);
				}
			});
		};

		getUserId();

		return {
			Search,
			search,
			reset,
			getUserId,
			readnotice,
			...toRefs(state)
		};
	}
};
</script>

<style lang="less" scoped>
.noticeContent {
	height: 100%;
	.el-input {
		width: 200px;
		margin: 0 10px;
	}

	.card {
		margin-top: 20px;
	}
	.el-pagination {
		display: flex;
		justify-content: center;
		margin-top: 20px;
	}
}
</style>