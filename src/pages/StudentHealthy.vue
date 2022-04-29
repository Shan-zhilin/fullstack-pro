<!--
 * @Author: shanzhilin
 * @Date: 2022-04-28 19:45:34
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-04-29 23:06:23
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
          <el-form :model="form"
                   label-width="auto"
                   :label-position="labelPosition"
                   :size="size">
            <el-form-item label="姓名">
              <el-input type="text"
                        v-model="form.username" />
            </el-form-item>
            <el-form-item label="学号">
              <el-input type="text"
                        v-model="form.u_id" />
            </el-form-item>
            <el-form-item label="班级">
              <el-input type="text"
                        v-model="form.classes" />
            </el-form-item>
            <el-form-item label="体温">
              <el-input type="text"
                        v-model="form.tempeature" />
            </el-form-item>
            <el-form-item label="口罩数量">
              <el-input type="text"
                        v-model="form.musknum" />
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
              <el-radio v-model="form.kill"
                        :label="0">否</el-radio>
              <el-radio v-model="form.kill"
                        :label="1">是</el-radio>
            </el-form-item>
            <el-button @click="submit"
                       type="primary"
                       size="large">提交</el-button>

          </el-form>
        </el-col>
      </el-row>

    </el-card>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';
export default {
	setup() {
		const state = reactive({
			form: {
				username: '',
				classes: '',
				u_id: '',
				tempeature: '',
				hot: 0,
				gohospital: 0,
				goheighrisk: 0,
				isheighrisk: 0,
				touchheighrisk: 0,
				leaveout: 0,
				hesuan: 0,
				musknum: '',
				kill: 0
			}
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
.el-button {
	width: 300px;
}
</style>