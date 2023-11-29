<template>
  <div class="columnarbox">
    <div
      ref="columnar"
      class="columnar"
      style="width: 100%; height: 440px"
    ></div>
    <div class="tips">如果城市大于15个，仅显示总年化收入前15个城市信息</div>
  </div>
</template>
  <script>
import * as echarts from "echarts";
export default {
  name: "Columnar",
  props: {
    title: {
      type: String,
      default: "标题",
    },
  },
  data() {
    return {
      columnar: null,
      options: {
        color: ["#00468c", "#ff9009", "#3874FF"],
        tooltip: {
          trigger: "axis",
        },
        grid: {
          left: "0",
          right: "0",
          bottom: "0",
          containLabel: true,
        },
        legend: {
          type: "plain",
          icon: "circle",
          right: 0,
          data: ["年仓储规模", "年运输规模", "各区域与总规模占比"],
        },
        xAxis: [
          {
            type: "category",
            data: ["北京", "上海", "广州"],
            axisTick: {
              show: false,
              // alignWithLabel: true
            },
          },
        ],
        yAxis: [
          {
            type: "value",

            axisLine: {
              show: false,
            },
            axisTick: {
              show: false, // 是否显示坐标轴刻度。
            },
            min: 0,
            // interval: 2000,
            splitNumber: 3,
            axisLabel: {
              formatter: "{value}",
            },
          },
          {
            type: "value",
            // name: "各区域与总规模占比",
            min: 0,
            // max: 100,
            // interval: 5,
            splitNumber: 3,
            axisLabel: {
              formatter: "{value}.00 %",
            },
            splitLine: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false, // 是否显示坐标轴刻度。
            },
          },
        ],
        dataZoom: [
          {
            type: "slider", // 滚动条
            xAxisIndex: [0], // 对应的 x 轴索引，默认为 0
            filterMode: "empty", // 过滤模式，empty 表示不显示空数据
            top: "5%", // 滚动条位置
            height: 20, // 滚动条高度
            handleSize: 20, // 滚动条大小
            labelFormatter: "", // 标签格式化函数
            disabled: true,
            showDetail: false, // 显示详细信息
          },
          // {
          //   start: 80,
          //   type: "inside",
          //   disabled: true
          // },
          // {
          //   start: 80
          // }
        ],
        series: [
          {
            name: "年仓储规模",
            type: "bar",
            z: 3,
            // barGap: "20%",
            barWidth: 30,
            // barCategoryGap: "40%",
            data: [
              1000, 3000, 2000, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4,
              3.3,
            ],
          },
          {
            name: "年运输规模",
            type: "bar",
            z: 2,
            // barGap:1,
            barWidth: 30,
            // barCategoryGap: 2,
            data: [
              2000, 6000, 1500, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0,
              2.3,
            ],
          },
          {
            name: "各区域与总规模占比",
            type: "line",
            smooth: true,
            symbol: "none",
            yAxisIndex: 1,
            data: [0, 49, 30, 20, 3, 2, 5, 2, 2, 1, 1, 0],
            lineStyle: {
              type: "dashed",
            },
            // areaStyle: {
            //   color: "rgba(251, 5, 5, 1)",
            // }
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#3874FF",
                },
                {
                  offset: 1,
                  color: "#fff",
                },
              ]),
            },
            z: 1,
          },
        ],
        graphic: [
          // 坐标画图
          {
            type: "rect",

            position: [0, 0],
            bottom: "5%",

            left: "4%",
            // left: (data) => {
            //   // 计算矩形的左边界，使用第三个数据点的x坐标作为参考
            //   console.log(data, "data");
            //   var x = data.value[2].coord[0];
            //   var pixelX = this.columnar.convertToPixel("grid", x);
            //   console.log(pixelX, "xxxxxxxxxxxxxxxxxxx");
            //   return pixelX;
            // },
            z: 100,
            shape: {
              width: 100,
              height: 100,
              r: 10,
            },
            style: {
              fill: "transparent",
              stroke: "#5c7bd9",
              lineWidth: 1,
              lineDash: [4, 4],
            },
          },
          {
            type: "text",
            // position: [80, 80],
            top: "25%",
            left: "280",

            style: {
              text: "占比 78.92%",
              x: 10,
              y: 20,
              font: '14px "STHeiti", sans-serif',
            },
          },
        ],
      },
    };
  },
  created() {},
  mounted() {
    window.addEventListener("resize", this.onWindowResize);
    this.initCharts();
  },
  beforeUnmount() {
    // 移除 resize 事件监听器
    window.removeEventListener("resize", this.onWindowResize);
    // 销毁 ECharts 实例
    if (this.columnar) {
      this.columnar.dispose();
      this.columnar = null;
    }
  },
  methods: {
    //   initData(data) {
    //     console.log("Columnar", data.scaleList)
    //     let { scaleList } = data
    //     let cityNameNameList = [...new Set(scaleList.map((item) => item.cityName))]
    //     console.log(cityNameNameList, "  ")
    //     this.options.xAxis[0].data = cityNameNameList
    //     this.columnar.setOption(this.options)
    //   },
    onWindowResize() {
      if (this.columnar) {
        // 调整 ECharts 实例大小
        this.columnar.resize();
      }
    },
    initCharts() {
      this.columnar = echarts.init(this.$refs.columnar);
      // 绘制图表
      this.columnar.setOption(this.options);
      // 使用 getBarPosition 函数获取第一个柱体的坐标
      var firstBarPosition = this.getBarPosition(0);
      var firstBarPosition1 = this.getBarPosition(1);
      var firstBarPosition2 = this.getBarPosition(2);
      console.log("第一个柱体的坐标：", firstBarPosition, firstBarPosition1,firstBarPosition2);
      this.options.graphic[0].shape.width = firstBarPosition2.x;
    //   this.options.graphic[0].position = [firstBarPosition.x, 0];
      this.columnar.setOption(this.options);
    },
    getBarPosition(index) {
      // 获取对应的数据

      var data = this.options.series[0]?.data[index];
      var xAxisData = this.options.xAxis[0].data[index];
      console.log(data, "data");
      console.log(xAxisData, "xAxisData");
      // 转换为像素坐标
      var xPos = this.columnar.convertToPixel({ xAxisIndex: 0 }, xAxisData);
      var yPos = this.columnar.convertToPixel({ yAxisIndex: 0 }, data);

      // 返回坐标
      return {
        x: xPos,
        y: yPos,
      };
    },
  },
};
</script>
  
    <style lang="scss" scoped>
.tips {
  font-size: 12px;
  font-weight: 400;
  color: #666666;
  line-height: 20px;
  margin-top: 11px;
  display: block;
}
.columnarbox {
  width: 100%;
}
</style>
  