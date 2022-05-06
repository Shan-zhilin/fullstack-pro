<!--
 * @Author: shanzhilin
 * @Date: 2022-03-29 22:30:41
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-03-29 22:32:51
-->
<template>
  <div class="homeContent">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="numCount">
          <p>今日检测人数</p>
          <p>数量</p>
          <p>
            <el-icon>
              <edit-pen />
            </el-icon>
          </p>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="numCount applyNum ">
          <p>今日填报人数</p>
          <p>数量</p>
          <p>
            <el-icon>
              <reading />
            </el-icon>
          </p>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="numCount heightNum">
          <p>今日高危人数</p>
          <p>数量</p>
          <p>
            <el-icon>
              <warning />
            </el-icon>
          </p>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="numCount maskNum">
          <p>口罩总数</p>
          <p>数量</p>
          <p>
            <el-icon>
              <list />
            </el-icon>
          </p>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20"
            class="chartContent">
      <el-col :span="12">
        <el-card>
          <template #header>
            <p>各班已做核酸人数</p>
          </template>
          <div id="nucleicnum"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <template #header>
            <p>学生体温分布</p>
          </template>
          <div id="tempeaturenum"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lange="ts">
import { reactive, onMounted } from 'vue';
import { EditPen, Reading, Warning, List } from '@element-plus/icons-vue';
import { Pie, Line } from '@antv/g2plot';

export default {
	components: {
		EditPen,
		Reading,
		Warning,
		List
	},
	setup() {
		// 初始化饼图
		const initPieChart = () => {
			const data = [
				{
					name: '班级1',
					value: 100
				},
				{
					name: '班级2',
					value: 100
				},
				{
					name: '班级3',
					value: 100
				},
				{
					name: '班级4',
					value: 100
				},
				{
					name: '班级5',
					value: 100
				}
			];
			const piePlot = new Pie('nucleicnum', {
				data,
				angleField: 'value',
				colorField: 'name',
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
		};

		// 初始化折线图
		const initLineChat = () => {
			const data = [
				{ year: '1991', value: 3 },
				{ year: '1992', value: 4 },
				{ year: '1993', value: 3.5 },
				{ year: '1994', value: 5 },
				{ year: '1995', value: 4.9 },
				{ year: '1996', value: 6 },
				{ year: '1997', value: 7 },
				{ year: '1998', value: 9 },
				{ year: '1999', value: 13 }
			];

			const line = new Line('tempeaturenum', {
				data,
				xField: 'year',
				yField: 'value',
				label: {},
				point: {
					size: 5,
					shape: 'diamond',
					style: {
						fill: 'white',
						stroke: '#5B8FF9',
						lineWidth: 2
					}
				},
				tooltip: { showMarkers: false },
				state: {
					active: {
						style: {
							shadowBlur: 4,
							stroke: '#000',
							fill: 'red'
						}
					}
				},
				interactions: [{ type: 'marker-active' }]
			});

			line.render();
		};

		onMounted(() => {
			initPieChart();
            initLineChat();
		});
		return {};
	}
};
</script>

<style lang="less" scoped>
.homeContent {
	height: 100%;
	.chartContent {
		height: calc(100% - 120px);
		.el-card.is-always-shadow {
			height: 100%;
		}
		p {
			margin: 0;
		}
	}
	.numCount {
		display: flex;
		justify-content: space-between;
		height: 100px;
		padding: 0 10px;
		color: white;
		border-radius: 5px;
		cursor: pointer;

		p:nth-child(2) {
			font-size: 30px;
		}
		.el-icon {
			font-size: 58px;
		}

		background-color: rgb(0, 216, 216);
	}
	.chartContent {
		margin-top: 20px;
	}
	.applyNum {
		background-color: #28a745;
	}
	.heightNum {
		background-color: #ffc107;
	}
	.maskNum {
		background-color: #dc3545;
	}
}
</style>