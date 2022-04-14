<!--
 * @Author: shanzhilin
 * @Date: 2022-04-07 23:47:35
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-04-14 23:34:06
-->
<template>
  <div class="noticeContent">
    <el-card  class="card">
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
      <el-col :span="12" >
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
        <el-card> Never </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { getClassList,deleteClass } from '@/api/class';
import { ElMessage } from 'element-plus/lib/components';

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
      totalNum:0
		});

		// 获取列表数据
		const getTableData = () => {
			getClassList({
        pageNum: state.pageSize,
				currPage: state.currentPage,
        classname:state.classname
      }).then((res: any) => {
          if(res.success) {
            state.tableData = res.value;
            state.totalNum = res.count;
          }else {
            ElMessage.error({
              message:res.message
            })
          }
      })
		};

		// 重置
		const resetInfo = () => {
			state.classname = '';
      getTableData();
		};

    // 删除某一班级
    const deleteUserOption = (row:DataProps) => {
      const {c_id,classname,numbers} = row
      if (numbers > 0) {
        ElMessage.error({
          message:`班级${classname}中还有${numbers}个学生，不能删除`
        })
        return
      }
      deleteClass({
        c_id,
        classname
      }).then((res:any) => {
        if(res.success) {
          ElMessage.success({
            message:res.message
          })
          getTableData()
        }else {
          ElMessage.error({
            message:res.message
          })
        }
      })

    }


    getTableData()
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
}
</style>