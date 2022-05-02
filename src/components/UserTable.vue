<!--
 * @Author: shanzhilin
 * @Date: 2022-04-01 21:04:01
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-05-02 17:20:39
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
                 type="primary"
                 @click="routerHop({name:'UserInfo'})">
        <el-icon>
          <circle-plus-filled />
        </el-icon>添加
      </el-button>
    </el-card>

    <el-card class="card">
      <el-table style="width: 100%"
                max-height="435"
                :data="tableData">
        <el-table-column fixed
                         prop="id"
                         label="学号" />
        <el-table-column prop="username"
                         label="姓名" />
        <el-table-column prop="tell"
                         label="手机号" />
        <el-table-column prop="sex"
                         label="性别" />
        <el-table-column prop="address"
                         label="籍贯" />
        <el-table-column prop="classes"
                         label="班级"
                         v-if="type == 2" />
        <el-table-column prop="type"
                         label="类型" />
        <el-table-column label="操作"
                         fixed="right">
          <template #default="scope">
            <el-button @click="openDialog(scope.row)">修改</el-button>
            <el-popconfirm title="确定删除吗?"
                           confirmButtonText="确认"
                           cancelButtonText="取消"
                           @confirm="deleteUserOption(scope.row)">
              <template #reference>
                <el-button type="danger">删除</el-button>
              </template>
            </el-popconfirm>
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

    <el-dialog v-model="updateDialog"
               width="500px"
               title="用户信息修改"
               @close="closeDialog">
      <el-form :model="updateUserInfo"
               label-width="auto"
               :label-position="labelPosition"
               :size="size">
        <el-form-item label="ID">
          <el-input v-model="updateUserInfo.id"
                    readonly />
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="updateUserInfo.username" />
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="updateUserInfo.address" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password"
                    v-model="updateUserInfo.password" />
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="updateUserInfo.sex"
                    :label="1">男</el-radio>
          <el-radio v-model="updateUserInfo.sex"
                    :label="0">女</el-radio>
        </el-form-item>
        <el-form-item label="类型">
          <span>{{updateUserInfo.type}}</span>
        </el-form-item>
        <el-form-item>
          <el-button size="large"
                     @click="closeDialog">取消</el-button>
          <el-button type="primary"
                     size="large"
                     @click="updateInfo">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { Search, CirclePlusFilled } from '@element-plus/icons-vue';
import { getUsersByTypePage, deleteUser, updateUserInfo } from '@/api/user';
import { ElMessage } from 'element-plus';
interface dataProps {
	id?: string;
	username?: string;
	address?: string;
	classes?: string;
	createtime?: string;
	modifytime?: string;
	password?: string;
	sex?: string | number;
	type?: number | string;
	mailbox?: any;
}
interface stateProps {
	tableData: dataProps[];
	selectValue: string;
	inputValue: string;
	totalNum: number;
	pageSize: number;
	currentPage: number;
	updateDialog: boolean;
	updateUserInfo: dataProps;
	originRowsData: dataProps;
}

enum Sex {
	'女',
	'男'
}

enum UserType {
	'管理员' = 1,
	'学生',
	'老师'
}

export default {
	components: { CirclePlusFilled },
	props: ['type'],
	setup(props: any) {
		const { type } = props;
		const router = useRouter();
		let state = reactive<stateProps>({
			tableData: [], // 表格数据
			selectValue: 'username',
			inputValue: '',
			totalNum: 0,
			pageSize: 10,
			currentPage: 1,
			updateDialog: false,
			updateUserInfo: {
				id: '',
				username: '',
				sex: '',
				address: '',
				type: '',
				password: ''
			},
			originRowsData: {}
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
						item.sex = Sex[item.sex as number];
						item.type = UserType[item.type as number];
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
			state.selectValue = 'username';
			(state.inputValue = ''), getTableData();
		};

		/* 删除用户 */
		const deleteUserOption = (row: dataProps) => {
			const { id, type } = row;
			deleteUser({ id, type: UserType[type as number] }).then((res: any) => {
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

		/* 修改用户信息弹出框弹出框 */
		const openDialog = (row: dataProps) => {
			const { id, sex, type, username, address, password } = row;
			state.originRowsData = row;
			state.updateUserInfo = {
				id,
				sex: Sex[sex as number],
				type,
				username,
				address,
				password
			};
			state.updateDialog = true;
		};

		/* 关闭弹窗清空弹窗内的信息 */
		const closeDialog = () => {
			state.updateUserInfo = {
				id: '',
				username: '',
				sex: '',
				address: '',
				type: ''
			};
			state.originRowsData = {};
			state.updateDialog = false;
		};

		/* 修改用户信息 */
		const updateInfo = () => {
			const { username, address, sex, type, password } = state.originRowsData;
			if (
				username === state.updateUserInfo.username &&
				address === state.updateUserInfo.address &&
				Sex[sex as number] === state.updateUserInfo.sex &&
				UserType[type as number] === state.updateUserInfo.type &&
				password === state.updateUserInfo.password
			) {
				ElMessage.error({
					message: '未修改数据禁止提交'
				});
				return;
			} else if (state.updateUserInfo.username === '') {
				ElMessage.error({
					message: '姓名不能为空'
				});
				return;
			} else if (state.updateUserInfo.address === '') {
				ElMessage.error({
					message: '籍贯不能为空'
				});
				return;
			}
			const info = JSON.parse(JSON.stringify(state.updateUserInfo));
			info.type = UserType[state.updateUserInfo.type as number];
			updateUserInfo({ info: JSON.stringify(info) }).then((res: any) => {
				if (res.success) {
					ElMessage.success({
						message: res.message
					});
					closeDialog();
					getTableData();
				} else {
					ElMessage.error({
						message: res.message
					});
				}
			});
		};

		/* 路由跳转函数 */
		const routerHop = (args: any) => {
			router.push(args);
		};

		getTableData();

		return {
			type,
			selectType,
			Search,
			resetInfo,
			...toRefs(state),
			getTableData,
			deleteUser,
			deleteUserOption,
			openDialog,
			closeDialog,
			updateInfo,
			routerHop
		};
	}
};
</script>

<style lang="less" scoped>
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
.el-dialog {
	padding: 20px;

	.el-radio {
		margin-right: 20px;
	}
	.el-input {
		width: 300px;
		margin: 0;
	}

	.el-form-item {
		.el-button {
			width: 130px;
			&:not(:last-child) {
				margin-right: 30px;
			}
		}
	}

	.box {
		margin-bottom: 20px;
	}
}
</style>