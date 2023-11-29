<template>
    <div class="donut-chart-container">
      <div ref="donutChart" style="width: 60px; height: 60px;"></div>
    </div>
  </template>
  
  <script>
  import * as echarts from 'echarts';
  
  export default {      
    mounted() {
      this.drawDonutChart();
    },
    methods: {
      drawDonutChart() {
        const chartDom = this.$refs.donutChart;
        const myChart = echarts.init(chartDom);
  
        const totalValue = 1000; // 数据总数
        const data = [
          { name: '分类1', value:100 }, // 假设分类1的值是700
          { name: '分类2', value: totalValue }, // 假设分类1的值是700
        ];
  
        const option = {
      
          series: [
            {
              type: 'pie',
              radius: ['60%', '70%'], // 控制环形图大小
              data: data,
              label: {
                show: false, // 不显示默认的标签
              },
              labelLine: {
                show: false, // 不显示默认的标签线
              },
            },
          ],
          color: ['#FF5733', '  #e5ebec', /* 添加更多颜色 */],
            silent: true, // 禁止鼠标移入触发交互事件
          graphic: {
            type: 'text',
            left: 'center',
            top: 'center',
            style: {
              text: data[0].value / totalValue * 100 + '%', // 计算占比
              fontSize: 10,
              fill: '#666',
            },
          },
        };
  
        myChart.setOption(option);
      },
    },
  };
  </script>
  
  <style>
  .donut-chart-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  </style>
  