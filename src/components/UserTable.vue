<!--
 * @Author: shanzhilin
 * @Date: 2022-04-01 21:04:01
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-04-02 21:41:41
-->
<template>
  <div>
    <el-card>
      <el-select v-model="selectValue"
                 size="large">
        <el-option v-for="item in selectType"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value" />
      </el-select>
      <el-input size="large"
                v-model="inputValue"
                :prefix-icon="Search" />
      <el-button size="large"
                 type="primary"
                 @click="getTableData">搜索</el-button>
      <el-button size="large"
                 type="primary"
                 @click="resetInfo">重置</el-button>
      <el-button size="large"
                 class="upload-btn"
                 type="primary">
        <el-icon>
          <upload-filled />
        </el-icon>上传
      </el-button>
    </el-card>

    <el-card class="card">
      <el-table style="width: 100%"
                max-height="500"
                :data="tableData">
        <el-table-column fixed
                         prop="id"
                         label="学号" />
        <el-table-column prop="username"
                         label="姓名" />
        <el-table-column prop="sex"
                         label="性别" />
        <el-table-column prop="address"
                         label="籍贯" />
        <el-table-column prop="classes"
                         label="班级" />
        <el-table-column prop="type"
                         label="类型" />
        <el-table-column label="操作" />

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
import { reactive, ref, toRefs, onMounted } from 'vue';
import { Search, UploadFilled } from '@element-plus/icons-vue';
import { getUsersByTypePage } from '@/api/user';
interface dataProps {
	id: string;
	address: string;
	classes: string;
	createtime: string;
	modifytime: string;
	password: string;
	sex: string;
	type: number | string;
	mailbox: any;
}

export default {
	components: { UploadFilled },
	props: ['type'],
	setup(props: any) {
		const { type } = props;
		let state = reactive({
			tableData: [], // 表格数据
			selectValue: 'username',
			inputValue: '',
			totalNum: 0,
			pageSize: 10,
			currentPage: 1
		});

		// selectType
		const selectType = [
			{ value: 'id', label: '学号' },
			{ value: 'username', label: '姓名' },
			{ value: 'address', label: '籍贯' },
			{ value: 'classes', label: '班级' }
		];

		/* 
      获取用户数据
    */
		const getTableData = () => {
			getUsersByTypePage({
				type,
				pageNum: state.pageSize,
				currPage: state.currentPage,
				selectType: state.selectValue,
				inputValue: state.inputValue
			}).then((res: any) => {
				if (res.success) {
					const { value, count } = res;
					state.tableData = value.map((item: dataProps) => {
						switch (item.type) {
							case 1:
								item.type = '管理员';
								break;
							case 2:
								item.type = '学生';
								break;
							case 3:
								item.type = '教师';
						}
						return item;
					});
					state.totalNum = count;
				}
			});
		};

   /* 
    重置搜索调教
   */
    const resetInfo = () => {
      state.selectValue = 'username'
      state.inputValue = '',
      getTableData()
    }

		getTableData();

		return {
			selectType,
			Search,
      resetInfo,
			...toRefs(state),
			getTableData
		};
	}
};
</script>

<style scoped>
.el-input {
	width: 200px;
	margin: 0 10px;
}
.upload-btn {
	float: right;
}
.card {
	margin-top: 20px;
}
.el-pagination {
	display: flex;
	justify-content: center;
	margin-top: 20px;
}
</style>