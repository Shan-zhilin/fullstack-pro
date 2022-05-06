<!--
 * @Author: shanzhilin
 * @Date: 2022-04-07 23:47:35
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-05-06 16:37:19
-->
<template>
  <div class="noticeContent">
    <el-card class="card">
      <el-input size="large"
                v-model="classname"
                :prefix-icon="Search"
                placeholder="请输入班级名称" />
      <el-button size="large"
                 type="primary"
                 @click="getTableData">搜索</el-button>
      <el-button size="large"
                 type="primary"
                 @click="resetInfo">重置</el-button>
    </el-card>

    <el-row :gutter="15">
      <el-col :span="12">
        <el-card>
          <el-table style="width: 100%"
                    max-height="435"
                    :data="tableData">
            <el-table-column prop="grade"
                             label="年级"
                             :width="100" />
            <el-table-column prop="classname"
                             label="班级名称" />
            <el-table-column prop="numbers"
                             label="人数"
                             :width="100" />
            <el-table-column label="操作"
                             fixed="right"
                             :width="100">
              <template #default="scope">
                <el-popconfirm title="确定删除吗?"
                               confirmButtonText="确认"
                               cancelButtonText="取消"
                               @confirm="deleteUserOption(scope.row)">
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
        <el-card>
          <div id="container"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted, ref } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { getClassList, deleteClass } from '@/api/class';
import { ElMessage } from 'element-plus/lib/components';
import { Column, Pie } from '@antv/g2plot';

interface DataProps {
	c_id: number;
	classname: string;
	grade: string;
	numbers: number;
}

interface StateProps {
	tableData: Array<DataProps>;
	totalNum: number;
	currentPage: number;
	pageSize: number;
	classname: string;
}

export default {
	setup() {
		const state = reactive<StateProps>({
			tableData: [],
			classname: '',
			currentPage: 1,
			pageSize: 10,
			totalNum: 0
		});
		const canvasRef = ref();
		const initChart = (data: any) => {
			const piePlot = new Pie('container', {
				data,
				angleField: 'numbers',
				colorField: 'classname',
				label: {
					type: 'inner'
				},
				legend: {
					position: 'top-left',
					pageNavigator: {
						marker: {
							style: {
								// 非激活，不可点击态时的填充色设置
								inactiveFill: '#000',
								inactiveOpacity: 0.45,
								// 默认填充色设置
								fill: '#000',
								opacity: 0.8,
								size: 12
							}
						},
						text: {
							style: {
								fill: '#ccc',
								fontSize: 8
							}
						}
					}
				}
			});

			piePlot.render();
			canvasRef.value = piePlot;
		};

		// 获取列表数据
		const getTableData = () => {
			const queryInfo = state.classname
				? {
						classname: state.classname
				  }
				: {};
			return getClassList({
				pageNum: state.pageSize,
				currPage: state.currentPage,
				queryInfo: JSON.stringify(queryInfo)
			}).then((res: any) => {
				if (res.success) {
					state.tableData = res.value;
					state.totalNum = res.count;
					if (canvasRef.value) {
            // 如果之前的画布已经存在，那么再次更新时销毁之前的画布重新绘制
						canvasRef.value.destroy();
						canvasRef.value = '';
						initChart(res.value);
					} else {
						initChart(res.value);
					}
				} else {
					ElMessage.error({
						message: res.message
					});
				}
			});
		};

		// 重置
		const resetInfo = () => {
			state.classname = '';
			getTableData();
		};

		// 删除某一班级
		const deleteUserOption = (row: DataProps) => {
			const { c_id, classname, numbers } = row;
			if (numbers > 0) {
				ElMessage.error({
					message: `班级${classname}中还有${numbers}个学生，不能删除`
				});
				return;
			}
			deleteClass({
				c_id,
				classname
			}).then((res: any) => {
				if (res.success) {
					ElMessage.success({
						message: res.message
					});
					getTableData();
				} else {
					ElMessage.error({
						message: res.message
					});
				}
			});
		};

		// 初始化图表
		onMounted(() => {
			getTableData();
		});
		return {
			...toRefs(state),
			Search,
			resetInfo,
			getTableData,
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
	#container {
		width: 500px;
		height: 500px;
		margin: 0 auto;
	}
}
</style>