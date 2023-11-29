<template>
  <div class="mapCharts">
    <div ref="columnar" style="width: 100%; height: 440px"></div>
  </div>
</template>
  
  <script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      columnar: null,
      chartData: [], // 图表数据
      chartOption: {}, // 图表配置
    };
  },
  created() {
    this.fetchData();
  },
  mounted() {
    this.initCharts();
  },
  methods: {
    //手机号验证
    abc() {
    

    },
    initCharts() {
      this.columnar = echarts.init(this.$refs.columnar);
      // 绘制图表
      // 初始化图表
      this.chartOption = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.chartData,
            type: "line",
          },
        ],
      };
      this.columnar.setOption(this.chartOption);
    },
    fetchData() {
      // 模拟异步获取图表数据
      setInterval(() => {
        console.log(1);
        this.chartData.push(this.i++);
        this.chartData = [820, 932, 901, 934, 1290, 1330, 1320];
      }, 1000);
    },
  },
  watch: {
    chartData: {
      deep: true,
      handler(newVal) {
        // 在数据变化时，动态更新图表
        this.chartOption.series[0].data = newVal;
        this.columnar.setOption(this.chartOption);
      },
    },
  },
};
</script>
<style>
.mapCharts {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 440px;
  background: #f6f6f6;
}
</style>