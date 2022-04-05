<!--
 * @Author: shanzhilin
 * @Date: 2022-04-05 22:00:40
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-04-05 23:10:01
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
                      size="large" />
      <el-input size="large"
                v-model="inputValue"
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
                 type="primary">发布新通知
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
                <el-button @click="openDialog(scope.row)">修改</el-button>
                <el-button type="danger"
                           @click="deleteUserOption(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>>

          </el-table>
          <el-pagination :currentPage="currentPage"
                         :page-size="pageSize"
                         :page-sizes="[10, 20, 30, 40]"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="totalNum" />
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
import { Search } from '@element-plus/icons-vue';
export default {
	setup() {
		const state = reactive({
			dateRange: [], //搜索时间范围
			tableData: [],
			totalNum: 0,
			pageSize: 10,
			currentPage: 1
		});

		/* 搜索函数 */
		const search = () => {
            console.log(state.dateRange)
        };

		/* 重置函数 */
		const reset = () => {};

		return {
			...toRefs(state),
			search,
			reset,
			Search
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
}

</style>