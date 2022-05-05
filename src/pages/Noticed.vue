<!--
 * @Author: shanzhilin
 * @Date: 2022-04-05 22:00:40
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-05-05 21:44:04
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
                             label="标题"
                             width="150" />
            <el-table-column prop="content"
                             label="内容"
                             width="100">
              <template #default="scope">
                <el-button type="text"
                           @click="openDialog(scope.row.content)">查看内容</el-button>
              </template>

            </el-table-column>
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
                <el-button type="primary"
                           @click="searchReaderList(scope.row.n_id)">人数</el-button>
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
        <el-card>
          <template #header>
            <div class="card-header">
              <h3>通知阅读人数</h3>
            </div>
          </template>
          <el-row :gutter="20"
                  class="readerConter">
            <el-col :span="6"
                    v-for="(item) in readerList"
                    :key="item.r_id">
              <div class="rederItem">
                <img :src="item.head || 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'">
                <span>{{item.username}}</span>
              </div>
            </el-col>
          </el-row>

        </el-card>
      </el-col>
    </el-row>
    <el-dialog v-model="showDialog"
               title="通知内容"
               width="30%"
               @close="openDialog('')">
      <p>{{dialogContent}}</p>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { Search } from '@element-plus/icons-vue';
import { getAllNotice, deleteNotice, getAllRead } from '../api/notice';
import { ElMessage } from 'element-plus';
export default {
	setup() {
		const state = reactive({
			dateRange: [], //搜索时间范围
			title: '',
			tableData: [],
			totalNum: 0,
			pageSize: 10,
			currentPage: 1,
			showDialog: false,
			dialogContent: '',
			readerList: [{ r_id: 0, username: '', head: '' }]
		});
		const router = useRouter();

		// 路由跳转
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

		/* 打开查看详情弹框 */
		const openDialog = (content: string) => {
			state.showDialog = !state.showDialog;
			state.dialogContent = content;
		};

		/* 查阅对应通知阅读人数 */
		const searchReaderList = (n_id?: string) => {
			getAllRead(n_id && { n_id }).then((res: any) => {
				if (res.success) {
					state.readerList = res.value;
				} else {
					ElMessage.error({
						message: res.message
					});
				}
			});
		};
		searchReaderList();
		search();

		return {
	
			search,
			reset,
			Search,
			routerHop,
			deleteUserOption,
			openDialog,
			searchReaderList,
		    ...toRefs(state),
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
	.readerConter {
		height: 400px;
		overflow: auto;
		.rederItem {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 100%;
			height: 150px;
			padding-top: 20px;
			margin-right: 20px;
			margin-bottom: 20px;
			border: 1px solid rgb(218, 221, 228);
			border-radius: 3px;

			img {
				width: 90px;
				height: 90px;
				object-fit: fill;
				margin-bottom: 15px;
			}
			&:hover {
				cursor: pointer;
				border-color: #606266;
			}
		}
	}
	.el-pagination {
		display: flex;
		justify-content: center;
		margin-top: 20px;
	}
	h3 {
		margin: 0;
	}
}
</style>