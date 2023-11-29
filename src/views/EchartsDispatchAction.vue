<template>
  <div>
    <div ref="chart" style="width: 600px; height: 400px;"></div>
    <button @click="showTooltip">显示 Tooltip</button>
    <button @click="hideTooltip">隐藏 Tooltip</button>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      myChart: null,
      option: {
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
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      this.myChart = echarts.init(this.$refs.chart);
      this.myChart.setOption(this.option);
    },
    showTooltip() {
      this.myChart.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: 2,
      });
    },
    hideTooltip() {
      this.myChart.dispatchAction({
        type: "hideTip",
      });
    },
  },
};
</script>