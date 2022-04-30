<!--
 * @Author: shanzhilin
 * @Date: 2022-04-28 19:45:34
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-04-30 16:28:24
-->
<template>
  <div>
    <el-card>
      <template #header>
        <div class="card-header">
          <h3>健康信息填报</h3>
        </div>
      </template>
      <el-row :gutter="50">
        <el-col :span="12">
          <el-form ref="ruleFormRef"
                   :model="form"
                   :rules="rules"
                   label-width="auto"
                   :label-position="labelPosition"
                   :size="size">
            <el-form-item label="姓名"
                          prop="username">
              <el-input type="text"
                        v-model="form.username" />
            </el-form-item>
            <el-form-item label="学号"
                          prop="u_id">
              <el-input type="text"
                        v-model="form.u_id" />
            </el-form-item>
            <el-form-item label="班级"
                          prop="classes">
              <el-date-picker type="year"
                              v-model="greade"
                              placeholder="年级"
                              @change="getClsses" />
              <el-select v-model="form.classes"
                         placeholder="Select">
                <el-option v-for="item in classList"
                           :key="item.c_id"
                           :label="item.classname"
                           :value="item.classname" />
              </el-select>
            </el-form-item>
            <el-form-item label="体温"
                          prop="temperature"
                          type="number">
              <el-input type="text"
                        v-model="form.temperature" />
            </el-form-item>
            <el-form-item label="口罩数量"
                          prop="masknum">
              <el-input type="text"
                        v-model="form.masknum" />
            </el-form-item>
            <el-form-item label="是否发烧">
              <el-radio v-model="form.hot"
                        :label="0">否</el-radio>
              <el-radio v-model="form.hot"
                        :label="1">是</el-radio>
            </el-form-item>
            <el-form-item label="是否去就医">
              <el-radio v-model="form.gohospital"
                        :label="0">否</el-radio>
              <el-radio v-model="form.gohospital"
                        :label="1">是</el-radio>
            </el-form-item>

          </el-form>
        </el-col>
        <el-col :span="12">
          <el-form :model="form"
                   label-width="auto"
                   :label-position="labelPosition"
                   :size="size">
            <el-form-item label="是否去过高危地区">
              <el-radio v-model="form.goheighrisk"
                        :label="0">否</el-radio>
              <el-radio v-model="form.goheighrisk"
                        :label="1">是</el-radio>
            </el-form-item>
            <el-form-item label="是否为高危地区人员">
              <el-radio v-model="form.isheighrisk"
                        :label="0">否</el-radio>
              <el-radio v-model="form.isheighrisk"
                        :label="1">是</el-radio>
            </el-form-item>
            <el-form-item label="是否接触过高危人员">
              <el-radio v-model="form.touchheighrisk"
                        :label="0">否</el-radio>
              <el-radio v-model="form.touchheighrisk"
                        :label="1">是</el-radio>
            </el-form-item>
            <el-form-item label="是否离开过学校">
              <el-radio v-model="form.leaveout"
                        :label="0">否</el-radio>
              <el-radio v-model="form.leaveout"
                        :label="1">是</el-radio>
            </el-form-item>
            <el-form-item label="是否做过核酸检测">
              <el-radio v-model="form.hesuan"
                        :label="0">否</el-radio>
              <el-radio v-model="form.hesuan"
                        :label="1">是</el-radio>
            </el-form-item>
            <el-form-item label="消毒用品书否充足">
              <el-radio v-model="form.kills"
                        :label="0">否</el-radio>
              <el-radio v-model="form.kills"
                        :label="1">是</el-radio>
            </el-form-item>
            <el-button @click="submit(ruleFormRef)"
                       type="primary"
                       size="large">提交</el-button>
          </el-form>
        </el-col>
      </el-row>

    </el-card>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, ref } from 'vue';
import { createHealthyApply } from '@/api/healthy';
import { getClassList } from '../api/class';
import { ElMessage, FormInstance, FormRules } from 'element-plus';
export default {
	setup() {
		const state = reactive({
			form: {
				username: '',
				classes: '',
				u_id: '',
				temperature: '',
				masknum: '',
				hot: 0,
				gohospital: 0,
				goheighrisk: 0,
				isheighrisk: 0,
				touchheighrisk: 0,
				leaveout: 0,
				hesuan: 0,
				kills: 0
			},
			greade: '',
			classList: []
		});
		const ruleFormRef = ref<FormInstance>();
		const rules = reactive<FormRules>({
			username: [{ required: true, message: '请输姓名', trigger: 'blur' }],
			classes: [{ required: true, message: '请输入班级', trigger: 'blur' }],
			u_id: [{ required: true, message: '请输入学号', trigger: 'blur' }],
			temperature: [{ required: true, message: '请输入体温', trigger: 'blur' }],
			masknum: [{ required: true, message: '请输入口罩数量', trigger: 'blur' }]
		});

		const submit = async (formEl: FormInstance | undefined) => {
			if (!formEl) return;
			await formEl.validate((valid, fields) => {
				if (valid) {
					createHealthyApply(state.form).then((res: any) => {
						if (res.success) {
							ElMessage.success({
								message: res.message
							});
						} else {
							ElMessage.error({
								message: res.message
							});
						}
					});
				} else {
					ElMessage.error('健康表必填信息未填写');
				}
			});
		};

		// 年级选项发生变化时重新请求对应的班级列表
		const getClsses = () => {
			const year = new Date(state.greade).getFullYear();
			getClassList((!year || year == 1970) ? {} : { queryInfo: JSON.stringify({ grade: year }) }).then(
				(res: any) => {
					if (res.success) {
						state.classList = res.value;
					} else {
						ElMessage.error({
							message: '班级列表获取失败'
						});
					}
				}
			);
		};

    getClsses()
		return {
			rules,
			ruleFormRef,
			submit,
      getClsses,
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
.el-button {
	width: 300px;
}
.el-select {
  margin-left: 30px;
}
</style>