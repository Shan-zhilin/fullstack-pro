<!--
 * @Author: shanzhilin
 * @Date: 2022-04-05 22:00:40
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-05-05 16:41:12
-->
<template>
  <div class="noticeContent">
    <el-card class="card">
      <el-date-picker v-model="dateRange"
                      type="datetimerange"
                      range-separator="至"
                      start-placeholder="起始时间"
                      end-placeholder="结束时间"
                      value-format="YYYY-MM-DD HH:mm:ss"
                      size="large"
                      @change="search" />
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
      <el-button size="large"
                 class="makeNotice"
                 type="primary"
                 @click="routerHop('/teacher/notice')">发布新通知
      </el-button>
    </el-card>

    <el-row :gutter="15">
      <el-col :span="12">
        <el-card>
          <el-table style="width: 100%"
                    max-height="450"
                    :data="tableData">
            <el-table-column prop="title"
                             label="标题" />
            <el-table-column prop="content"
                             label="内容" />
            <el-table-column prop="createtime"
                             label="发布时间" />
            <el-table-column label="操作"
                             fixed="right">
              <template #default="scope">
                <el-popconfirm title="确定删除吗?"
                               confirmButtonText="确认"
                               cancelButtonText="取消"
                               @confirm="deleteUserOption(scope.row.n_id)">
                  <template #reference>
                    <el-button type="danger">删除</el-button>
                  </template>
                </el-popconfirm>
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
      </el-col>

      <el-col :span="12">
        <el-card> Never </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { Search } from '@element-plus/icons-vue';
import { getAllNotice, deleteNotice } from '../api/notice';
import { ElMessage } from 'element-plus';
export default {
	setup() {
		const state = reactive({
			dateRange: [], //搜索时间范围
			title: '',
			tableData: [],
			totalNum: 0,
			pageSize: 10,
			currentPage: 1
		});
		const router = useRouter();

		const routerHop = (path: string) => {
			router.push(path);
		};

		/* 搜索函数 */
		const search = () => {
			//强转一下，datapicker点击清楚icon 会将数据改成 null
			state.dateRange = Array.isArray(state.dateRange) ? state.dateRange : [];
			getAllNotice({
				title: state.title,
				currPage: state.currentPage,
				pageNum: state.pageSize,
				startTime: state.dateRange[0] ? state.dateRange[0] : '',
				endTime: state.dateRange[1] ? state.dateRange[1] : ''
			}).then((res: any) => {
				if (res.success) {
					const { value, count } = res;
					state.tableData = value;
					state.totalNum = count;
				} else {
					ElMessage.error({
						message: res.message
					});
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

		/* 删除函数 */
		const deleteUserOption = (id: number) => {
			deleteNotice({
				n_id: id
			}).then((res: any) => {
				if (res.success) {
					ElMessage.success({
						message: '删除成功'
					});
					search();
				} else {
					ElMessage.error({
						message: res.message
					});
				}
			});
		};
		search();
		return {
			...toRefs(state),
			search,
			reset,
			Search,
			routerHop,
			deleteUserOption
		};
	}
};
</script>

<style lang="less" scoped>
.noticeContent {
	height: 100%;
	.card {
		margin-bottom: 20px;
		.el-input {
			width: 200px;
			margin: 0 10px;
		}

		.makeNotice {
			float: right;
		}
	}
	.el-row {
		height: calc(100% - 105px);
		.el-card.is-always-shadow {
			height: 100%;
		}
	}
	.el-pagination {
		display: flex;
		justify-content: center;
		margin-top: 20px;
	}
}
</style>