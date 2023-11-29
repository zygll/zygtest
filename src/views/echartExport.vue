<template>
  <div>
    <el-button @click="exportAllCharts" type="primary">导出图表</el-button>
    <el-tabs>
      <el-tab-pane label="ECharts 示例 1">
        <EChartsComponent ref="chart1" :option="option1" />
      </el-tab-pane>
      <el-tab-pane label="ECharts 示例 2">
        <EChartsComponent ref="chart2" :option="option2" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import EChartsComponent from "../components/EChartsComponent.vue";

export default {
  components: {
    EChartsComponent,
  },
  data() {
    return {
      option1: {
        xAxis: {
          type: "category",
          data: ["A", "B", "C", "D", "E", "F", "G"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
          },
        ],
      },
      option2: {
        xAxis: {
          type: "category",
          data: ["H", "I", "J", "K", "L", "M", "N"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [130, 110, 70, 80, 150, 200, 120],
            type: "bar",
          },
        ],
      },
    };
  },
  methods: {
    exportAllCharts() {
      this.$refs.chart1.exportChart();
      this.$refs.chart2.exportChart();
    },
  },
};
</script>