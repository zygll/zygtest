<template>
  <div ref="chart" style="width: 100%; height: 440px"></div>
</template>
  
  <script>
import * as echarts from "echarts";

export default {
  props: {
    option: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      chartInstance: null,
    };
  },
  mounted() {
    this.initChart();
    window.addEventListener("resize", this.onWindowResize);
  },
  beforeDestroy() {
    // 移除 resize 事件监听器
    window.removeEventListener("resize", this.onWindowResize);

    // 销毁 ECharts 实例
    if (this.chartInstance) {
      this.chartInstance.dispose();
      this.chartInstance = null;
    }
  },
  methods: {
    onWindowResize() {
      if (this.chartInstance) {
        // 调整 ECharts 实例大小
        console.log(222);
        this.chartInstance.resize();
      }
    },
    initChart() {
      this.chartInstance = echarts.init(this.$refs.chart);
      this.chartInstance.setOption(this.option);
      //   window.addEventListener("resize", function () {
      //     this.chartInstance.resize();
      // });
    },
    exportChart() {
      const imageURL = this.chartInstance.getDataURL({
        type: "png",
        pixelRatio: 2,
        backgroundColor: "#fff",
      });

      const link = document.createElement("a");
      link.href = imageURL;
      link.download = "echarts-image.png";
      link.click();
    },
  },
};
</script>
<style>
.chartInstance {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 440px;
  background: #f6f6f6;
}
</style>