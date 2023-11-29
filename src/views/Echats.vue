<template>
  <div>
    <div
      class="chinaMap"
      ref="chinaMap"
      style="width: 100%; height: 800px"
    ></div>
    <el-button @click="exportImg">导出图片</el-button>
  </div>
</template>
<script>
import * as echarts from "echarts";
import "@/public/china.js";

// 注册绘制中国地图
export default {
  props: {
    title: {
      type: String,
      default: "标题",
    },
    // optionsData: {
    //   type: Object,
    //   default: {},
    // },
  },
  mounted() {
    window.addEventListener("resize", this.onWindowResize);
    // console.log("🚀 ~ file: Echats.vue:25 ~ mounted ~ onWindowResize:", onWindowResize)
    this.initCharts();
    console.log(11111);
    this.$nextTick(() => {
      this.mapcharts.on("contextmenu", function (params) {
        console.log(params, " contextmenu");
        // params.name：地图系列名称
        // params.selected：选中状态发生变化的区域名称和选中状态
      });
      this.mapcharts.on("geoselectchanged", function (params) {
        console.log(params, "geoselectchanged");

        // params.name：地图系列名称
        // params.selected：选中状态发生变化的区域名称和选中状态
      });
      // this.mapcharts.on("rendered", function () {
      //   console.log("rendered渲染结束事件");
      // });
      // this.mapcharts.on("finished", function () {
      //   console.log("finished渲染完成事件");
      // });
      this.mapcharts.on("dblclick", (e) => {
        console.log(e, "e");
        console.log(e.seriesType, "seriesType");
      });
    });
  },
  data() {
    return {
      mapcharts: null,
      opD: {
        nameMap: {
          湖北: "湖北1111",
        },
        title: {
          text: "中国地图",
          subtext: "Example in MetricsGraphics.js",
          left: "center",
        },
        // geo: {
        //   map: "china",
        //   roam: true,
        //   zoom: 1.23,
        //   center: [105, 36],
        //   silent: false,
        //   label: {
        //     normal: { show: true, fontSize: "10", color: "rgba(0,0,0,0.7)" },
        //     emphasis: { show: true, color: "#fff" },
        //   },
        //   // itemStyle: {
        //   //   normal: {
        //   //     areaColor: "#d5d5d5",
        //   //     borderColor: "#fff",
        //   //     borderWidth: 1,
        //   //   },
        //   // },
        //   itemStyle: {
        //     normal: {
        //       //未对地图作任何操作时的样式，加载想默认展示的样式
        //       borderWidth: 2, //边框大小
        //       borderColor: "#ffffff",
        //       areaColor: "#2DD4D6", //背景颜色
        //       label: {
        //         show: true,
        //         formatter: function (params) {
        //           return `{pic|${
        //             params.value.toString() == "NaN" ? 0 : params.value
        //           }}\n{fline|${params.name}}`;
        //         },
        //         position: "top",
        //         rich: {
        //           pic: {
        //             backgroundColor: "rgba(25, 31, 37, 0.34)",
        //             padding: [2, 5],
        //             width: "auto",
        //             height: 15,
        //             align: "center",
        //             color: "#FFFFFF",
        //             fontSize: "10px",
        //             borderRadius: 5,
        //           },
        //           fline: {
        //             color: "#FFFFFF",
        //             align: "center",
        //             fontSize: "12px",
        //           },
        //         },
        //       },
        //     },
        //     emphasis: {
        //       // 这个是鼠标移上去就会选中的样式，鼠标mouseover
        //       borderWidth: 1,
        //       borderColor: "yellow",
        //       areaColor: "#77e8e4",
        //     },
        //   },
        //   //重点下面，与点击事件不同，虽然也是点击选中，但是事件不一样
        //   selectedMode: "single", //选择模式，单选，只能选中一个地市
        //   select: {
        //     //这个就是鼠标点击后，地图想要展示的配置
        //     disabled: false, //可以被选中
        //     itemStyle: {
        //       //相关配置项很多，可以参考echarts官网
        //       areaColor: "#77e8e4", //选中
        //     },
        //   },
        // },
        series: [
          {
            data: [
              { name: "台湾", value: [1, 2, 3000, 12, 33] },
              { name: "河北", value: [1, 2, 1000, 12, 33] },
              { name: "山西", value: [1, 2, 6000, 12, 33] },
              { name: "内蒙古", value: [1, 2, 3000, 12, 33] },
              { name: "辽宁", value: [1, 2, 3000, 12, 33] },
              { name: "吉林", value: [1, 2, 3000, 12, 33] },
              { name: "黑龙江", value: [1, 2, 3000, 12, 33] },
              { name: "江苏", value: [1, 2, 3000, 12, 33] },
              { name: "浙江", value: [1, 2, 3000, 12, 33] },
              { name: "安徽", value: [1, 2, 3000, 12, 33] },
              { name: "福建", value: [1, 2, 3000, 12, 33] },
              { name: "江西", value: [1, 2, 3000, 12, 33] },
              { name: "山东", value: [1, 2, 3000, 12, 33] },
              { name: "河南", value: [1, 2, 3000, 12, 33] },
              { name: "湖北", value: [1, 2, 3000, 12, 33] },
              { name: "湖南", value: [1, 2, 3000, 12, 33] },
              { name: "广东", value: [1, 2, 3000, 12, 33] },
              { name: "广西", value: [1, 2, 3000, 12, 33] },
              { name: "海南", value: [1, 2, 3000, 12, 33] },
              { name: "四川", value: [1, 2, 3000, 12, 33] },
              { name: "贵州", value: [1, 2, 3000, 12, 33] },
              { name: "云南", value: [1, 2, 3000, 12, 33] },
              { name: "西藏", value: [1, 2, 3000, 12, 33] },
              { name: "陕西", value: [1, 2, 3000, 12, 33] },
              { name: "甘肃", value: [1, 2, 3000, 12, 33] },
              { name: "青海", value: [1, 2, 3000, 12, 33] },
              { name: "宁夏", value: [1, 2, 3000, 12, 33] },
              { name: "新疆", value: [1, 2, 3000, 12, 33] },
              {
                name: "北京",
                value: [0,0 ,0 , 0, "3000"], //自定义特殊 tooltip，仅对该数据项有效
                tooltip: {
                  confine: true,
                  trigger: "item", //数据项图形触发
                  // backgroundColor: "red",
                  borderWidth: 1,
                  // formatter: "地区：{b}<br/>数据：{c}",
                  formatter: function (params) {
                    console.log(params, "params");
                    var value;
                    if (params.data) {
                      // value = params.data?.name + ":" + params.data?.value[2];
                      value = params.data?.name + ":" + params.data?.value;
                    }
                    return value;
                  },
                  alwaysShowContent: true, //是否永远显示提示框内容，
                  enterable: true, //鼠标是否可进入
                },
                //自定义特殊itemStyle，仅对该item有效
                // itemStyle: {
                //     //未对地图作任何操作时的样式，加载想默认展示的样式
                //     borderWidth: 2, //边框大小
                //     borderColor: "#ffffff",
                //     areaColor: "#000", //背景颜色
                // },
              },
              { name: "天津", value: [1, 2, 3000, 12, 33] },
              { name: "上海", value: [1, 2, 3000, 12, 33] },
              { name: "重庆", value: [1, 2, 3000, 12, 33] },
              { name: "香港", value: [1, 2, 3000, 12, 33] },
              { name: "澳门", value: [1, 2, 3000, 12, 33] },
              { name: "南海诸岛", value: [1, 2, 6000, 12, 33] },
            ],
            type: "map",
            map: "china",
            roam: true,
            zoom: 1.23,
            // geoIndex: "0",
            // zlevel:"3"
            // label: {
            //   normal: { show: true, fontSize: "10", color: "rgba(0,0,0,0.7)" },
            //   emphasis: { show: true, color: "#fff" },
            // },
            // itemStyle: {
            //   normal: {
            //     areaColor: "#d5d5d5",
            //     borderColor: "#fff",
            //     borderWidth: 1,
            //   },
            // },
            itemStyle: {
              normal: {
                //未对地图作任何操作时的样式，加载想默认展示的样式
                borderWidth: 2, //边框大小
                borderColor: "#ffffff",
                areaColor: "#2DD4D6", //背景颜色
                label: {
                  show: true,
                  formatter: function (params) {
                    // return `{pic|${
                    //   params.value.toString() == "NaN" ? 0 : params.value
                    // }}\n{fline|${params.name}}`;
                    return `{fline|${params.name}}`;
                  },
                  position: "top",
                  rich: {
                    pic: {
                      backgroundColor: "rgba(25, 31, 37, 0.34)",
                      padding: [2, 5],
                      width: "auto",
                      height: 15,
                      align: "center",
                      color: "#FFFFFF",
                      fontSize: "10px",
                      borderRadius: 5,
                    },
                    fline: {
                      color: "#FFFFFF",
                      align: "center",
                      fontSize: "18px",
                    },
                  },
                },
              },
              emphasis: {
                // 这个是鼠标移上去就会选中的样式，鼠标mouseover
                borderWidth: 1,
                borderColor: "yellow",
                areaColor: "#77e8e4",
              },
            },
          },

          // {
          //   // 画点
          //   type: "scatter",
          //   coordinateSystem: "geo",
          //   name: "代表省内N个城市有业务",
          //   label: {
          //     show: true,
          //     formatter: "{@[2]}",
          //   },
          //   symbol: "circle",
          //   itemStyle: {
          //     color: "#fa6400",
          //   },
          //   symbolSize: [12, 12], // 设置图片大小
          //   data: [
          //     { name: "河南", value: [112.665412, 33.357975, 2, 100, 2] },
          //     { name: "广东", value: [112.280637, 22.125178, 2, 100, 2] },
          //   ],
          //   zlevel: 3,
          // },
          // {
          //   // 画图
          //   type: "scatter",
          //   coordinateSystem: "geo",
          //   name: "既有冷链仓又有干仓",
          //   itemStyle: {
          //     color: "#000",
          //   },
          //   symbol:
          //     "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAlhQTFRFhLeEWNFYN81LMMJOJro/KLs7OL1Gc9N+xezL3PPg5/jq7PnuS7RLPcI9Lb1BK7lAM7pCYc1wyu7P5vfo8fvz8/v16Pjq4fXkO8I9MsM8K7tAOL9Ltei75ffo7/rx3fTgqOOwg9eObNB5Y81x5ffntei6KsE+P8JWp+Kw6fjs8vvztee8edSGRcNWKrs9Ibg16fjrKbo/LLxEr+a46fjr2/Tfl92gJro62/TfLLs/V8po4fXjlt2gQcJTI7g3QsFSvurE6/ntsea4RMNVa8554PTj2PLcctJ/J7o6sOW37vnvouGrQsJTIrg2Jbk5Ob9LUcdgze/R8fryetWHKbo9quOx0fDVqeOxQsJS2PPb5ffnZM1yPcBO8vvz/v/+3PTf3PPfW8pqV8lm1fHZ////V8ll2/Pe2/PfW8ppWMln1vLa1PLX4vbkYs1wQMJRtue89/z4w+zI7vnvd9OEKLo7T8Zftue92vPeouGq6Pfqm9+kPcFOJ7o7Q8NUXsxsPcFPXMxs0/HX0fDWas93I7k3atB40vHWNb9Jp+Ov5PbmpeKt5PbnJLc5QMFR0PDU7vnvhtiRN79KI7g2OL9K7vnwIrc4J7k7i9qW2fPc0fDVhdiQPMFOJbk4htiQI7c5IrY3L7xCfdaJ2vPd7fnvouGqYcxvJrk4JLk5Jbk5Mb1FiNiTzO/R4PXjz+/Tb9F8WsppU8hiKLw8Jrs8I7g6Irc5Jrk7PcFOnuCnz+/U5ffo7Pnt4PXi1/LbJro/Jbo+JLc7JLk4Jro6OL9JVMhjktyctee7xu3LzfDSTJEXbgAAAMh0Uk5TAgMFBwsOFCBJa4KMAwUJDBMdUoW21u33BgkPFkKJ0fb/////iUIOGT2e5v7/////ng8XR6Lx///wFSWP////IV/W/v8ylfX//13D////////gN7///////+Z8f////+l+f//////p/r///+g8/////+O5P//////c8////////9Qq/r////6QYHj/+M2TrHy//////IuP3XB9/////8lM0hyxfP//x0pOkx8uOf6////FR4sOUlckb7b7Pb7DxYiOkZXaY2nucHG1uDBAAAB9ElEQVR4nGNgYGRiZmFlY+fg5OLm5uLkYGdjZWFmYmRg4OHl4xcQFBIWERUTFxcTFREWEhTg5+PlYZCQlJKWkZWTV1BUUlZWUlSQl1NRlZaSlGCQVFPX0NTS1tHV0wcCPV0dbS0DDXU1SQZDI2MTUzNdc30oMNc1szAxNjJksLSy1rKxtdOHAztbGy1rK0sGewdHJ2ckcaCMs5Ojgz2Di6ubu4c+CvBwd3N1YfD08vYB8Xz9/AMC/P18QWwfby9PhsCg4BAQx88nNCwsPMIPxA4JDgpkiIyKBuuPCY2Ni4sNjQFzoqMiGeITEsHspOS4lJS45FQwJzEhniEtPQPMzswCSWRlgjkZ6WkM2Tm5YHZefkFKSkF+HpiTm5PNUFhUXAJil5SWlZeXlULYxUWFDBWVVdVg59bU1tXV1oCdW19VWcHQ0NjU7AfxWEsLhPZrbWtsYGjv6OyqRw2S+q7ujnaGnt6+/gkTfRHikyZPmNLX28Mwddr0GTNnzZ4DE58ze+7MGdOnTWWYN3/BwkWLlyz1B4ekh//SJYsXLVwwfx7DsuUrVq5avWatzbr1GzasX2ezds3qVStXLF/GsHHT5i1bt23fsXPX7j17du/auWP7tq1bNm/ayLB33/7NBw4eOnzk6LHjx48dPXL40MEDm/fv2wsAE2y7O/TF9CsAAAAASUVORK5CYII=",
          //   symbolSize: [12, 12], // 设置图片大小
          //   data: [
          //     {
          //       name: "北京",
          //       value: [116, 40],
          //     },
          //     {
          //       name: "天津",
          //       value: [117.3, 39],
          //     },
          //     {
          //       name: "河北",
          //       value: [115.1004, 37.5],
          //     },
          //     {
          //       name: "山西",
          //       value: [112.4121, 37.6611],
          //     },
          //     {
          //       name: "内蒙古",
          //       value: [111.5977, 42.3408],
          //     },
          //     {
          //       name: "辽宁",
          //       value: [123.0438, 42.0889],
          //     },
          //     {
          //       name: "吉林",
          //       value: [126.1746, 44.5938],
          //     },
          //     {
          //       name: "黑龙江",
          //       value: [128.1445, 48],
          //     },
          //     {
          //       name: "上海",
          //       value: [121.4648, 31],
          //     },
          //     {
          //       name: "江苏",
          //       value: [119.8586, 33.915],
          //     },
          //     {
          //       name: "浙江",
          //       value: [120.498, 28.3],
          //     },
          //     {
          //       name: "安徽",
          //       value: [117.2461, 32.0361],
          //     },
          //     {
          //       name: "福建",
          //       value: [118.3008, 26.9277],
          //     },
          //     {
          //       name: "江西",
          //       value: [115.4156, 27],
          //     },
          //     {
          //       name: "山东",
          //       value: [118.2402, 36.2307],
          //     },
          //     {
          //       name: "河南",
          //       value: [114.0668, 34.8818],
          //     },
          //     {
          //       name: "湖北",
          //       value: [112.2363, 31.8],
          //     },
          //     {
          //       name: "湖南",
          //       value: [111.5332, 28.4],
          //     },
          //     {
          //       name: "广东",
          //       value: [115.7, 23.8076],
          //     },
          //     {
          //       name: "广西",
          //       value: [108.7813, 22.6426],
          //     },
          //     {
          //       name: "海南",
          //       value: [109.6, 18.8],
          //     },
          //     {
          //       name: "重庆",
          //       value: [106.7539, 29.3],
          //     },
          //     {
          //       name: "四川",
          //       value: [102.9199, 31.5],
          //     },
          //     {
          //       name: "贵州",
          //       value: [105.7, 25.6385],
          //     },
          //     {
          //       name: "云南",
          //       value: [101.0652, 23.6807],
          //     },
          //     {
          //       name: "西藏",
          //       value: [85.2, 31.6846],
          //     },
          //     {
          //       name: "陕西",
          //       value: [109.2, 34.7396],
          //     },
          //     {
          //       name: "甘肃",
          //       value: [96.7129, 40],
          //     },
          //     {
          //       name: "青海",
          //       value: [98, 36],
          //     },
          //     {
          //       name: "宁夏",
          //       value: [105.9961, 36.1096],
          //     },
          //     {
          //       name: "新疆",
          //       value: [84.9023, 39.148],
          //     },
          //     {
          //       name: "台湾",
          //       value: [121, 22.6],
          //     },
          //     {
          //       name: "香港",
          //       value: [114.6178, 22.3242],
          //     },
          //     {
          //       name: "澳门",
          //       value: [113.5547, 21.6484],
          //     },
          //   ],
          //   zlevel: 2,
          // },
        ],
        visualMap: [
          {
            type: "piecewise",
            show: true,
            hoverLink: false,
            seriesIndex: 0,
            pieces: [
              {
                max: -1,
                label: "代表省内N个城市有业务",
                symbol:
                  "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAr9JREFUSEudlkuMDGEQx3813TOWLPE4EPZAxCPIikjESbgQ8VqJOCyJYIaN3RUOruyeOQi7CWZCIpxIPJdw3TgQB8/EMxyWSMQru4SZ7i75enVnXj3d0beZr7p+Vf+qr6qFBo9maSnBJhHWKcwWmG7MFT4KvFVlIA3XpMBQlBupd6BdTC/9pldgp4LVKAgBV+Fcuokj0sfHatsagJNjoyoXFMY3clzH0bAI2+0818vPKgDFPewXj+MKdTOLA4rgqXAwc4YTgW3oyI8crqiSMofpvPo27p1jeJcP1fWdWtWJ1d6H92oQ9+gK38ZABDYHmfgAo7nzmxflsgQA9TzcYyvR14M1kHoAHwLDdhPzTU18QDFLHsiWewgAfgCf3+H0tsKfkQpIFOCfUSFTICemFR14X90tYQZfh5DJLXiDBdzzucQA0102zJRilk6grzr/AOD0t2HtvoA0NeOcWI8+HQhNYzIwdl1SynFLlbVRgFLPYmTWMuwdefTHJ5wji+DnF988DiDCbSnmeIkytxGAD0+wum+Sal2H9/AS7umtiQAIr0wGw6o0xwGYMA279xnSPAWnsB29fzFJBiPJAab9lm7B7riE/vruS5Va0lZzDypusTCSWKLgRVPw1PJteM/voo9vYLWfrLhoFUr8kyi2yKYG4TN24qhUk2agQ0+QltZIwGiRY9rUdFEFwEi1YDX2wTshs3xUVNWyK/ai1QP4Ldrej7Vqn++vHiC8aHGjIgpAZhz24UfI1DlREo2OiqhhJwvX+NHpm3s1MyiUYcpMZNo8+PkNff8g/Ltm2JkTZy8b1ONqMK6r70XS3/64TtFmn+aGeady4eToFjj+vxB/4cCBTJ6TQUC1K9Nk4nLxv1amxbYg8khAUJPSH3pE2ZVo6Qtn02PoSbT0y7XWDmaUXDaJRny2CANpi2tyig9RNfoLRRR5+pHTIjYAAAAASUVORK5CYII=",
              },
              {
                max: -2,
                label: "既有冷链仓又有干仓",
                symbol:
                  "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAlhQTFRFhLeEWNFYN81LMMJOJro/KLs7OL1Gc9N+xezL3PPg5/jq7PnuS7RLPcI9Lb1BK7lAM7pCYc1wyu7P5vfo8fvz8/v16Pjq4fXkO8I9MsM8K7tAOL9Ltei75ffo7/rx3fTgqOOwg9eObNB5Y81x5ffntei6KsE+P8JWp+Kw6fjs8vvztee8edSGRcNWKrs9Ibg16fjrKbo/LLxEr+a46fjr2/Tfl92gJro62/TfLLs/V8po4fXjlt2gQcJTI7g3QsFSvurE6/ntsea4RMNVa8554PTj2PLcctJ/J7o6sOW37vnvouGrQsJTIrg2Jbk5Ob9LUcdgze/R8fryetWHKbo9quOx0fDVqeOxQsJS2PPb5ffnZM1yPcBO8vvz/v/+3PTf3PPfW8pqV8lm1fHZ////V8ll2/Pe2/PfW8ppWMln1vLa1PLX4vbkYs1wQMJRtue89/z4w+zI7vnvd9OEKLo7T8Zftue92vPeouGq6Pfqm9+kPcFOJ7o7Q8NUXsxsPcFPXMxs0/HX0fDWas93I7k3atB40vHWNb9Jp+Ov5PbmpeKt5PbnJLc5QMFR0PDU7vnvhtiRN79KI7g2OL9K7vnwIrc4J7k7i9qW2fPc0fDVhdiQPMFOJbk4htiQI7c5IrY3L7xCfdaJ2vPd7fnvouGqYcxvJrk4JLk5Jbk5Mb1FiNiTzO/R4PXjz+/Tb9F8WsppU8hiKLw8Jrs8I7g6Irc5Jrk7PcFOnuCnz+/U5ffo7Pnt4PXi1/LbJro/Jbo+JLc7JLk4Jro6OL9JVMhjktyctee7xu3LzfDSTJEXbgAAAMh0Uk5TAgMFBwsOFCBJa4KMAwUJDBMdUoW21u33BgkPFkKJ0fb/////iUIOGT2e5v7/////ng8XR6Lx///wFSWP////IV/W/v8ylfX//13D////////gN7///////+Z8f////+l+f//////p/r///+g8/////+O5P//////c8////////9Qq/r////6QYHj/+M2TrHy//////IuP3XB9/////8lM0hyxfP//x0pOkx8uOf6////FR4sOUlckb7b7Pb7DxYiOkZXaY2nucHG1uDBAAAB9ElEQVR4nGNgYGRiZmFlY+fg5OLm5uLkYGdjZWFmYmRg4OHl4xcQFBIWERUTFxcTFREWEhTg5+PlYZCQlJKWkZWTV1BUUlZWUlSQl1NRlZaSlGCQVFPX0NTS1tHV0wcCPV0dbS0DDXU1SQZDI2MTUzNdc30oMNc1szAxNjJksLSy1rKxtdOHAztbGy1rK0sGewdHJ2ckcaCMs5Ojgz2Di6ubu4c+CvBwd3N1YfD08vYB8Xz9/AMC/P18QWwfby9PhsCg4BAQx88nNCwsPMIPxA4JDgpkiIyKBuuPCY2Ni4sNjQFzoqMiGeITEsHspOS4lJS45FQwJzEhniEtPQPMzswCSWRlgjkZ6WkM2Tm5YHZefkFKSkF+HpiTm5PNUFhUXAJil5SWlZeXlULYxUWFDBWVVdVg59bU1tXV1oCdW19VWcHQ0NjU7AfxWEsLhPZrbWtsYGjv6OyqRw2S+q7ujnaGnt6+/gkTfRHikyZPmNLX28Mwddr0GTNnzZ4DE58ze+7MGdOnTWWYN3/BwkWLlyz1B4ekh//SJYsXLVwwfx7DsuUrVq5avWatzbr1GzasX2ezds3qVStXLF/GsHHT5i1bt23fsXPX7j17du/auWP7tq1bNm/ayLB33/7NBw4eOnzk6LHjx48dPXL40MEDm/fv2wsAE2y7O/TF9CsAAAAASUVORK5CYII=",
              },
              {
                max: -3,
                label: "未来重点布局区域",
                symbol:
                  "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAHtJREFUSEvtlkEOQDAQRd93GnEsjuAcjsCtiMtQmcRCCBY1sZku2/T/zkvbPwJIKdVAC5RAYXMZYwVmoJM0aBfvMwSftjZmMAKVk8FkBssHWO7Ot5pBOq5KUk41F70wOOMMRK8XLBAFIoi/6Jd34B447pFpHYVf6Hu3LRvPr6ovm+FqhQAAAABJRU5ErkJggg==",
              },
              {
                lt: 1000,
                label: "仓储托盘数<1000",
                color: "#B7CCFF",
                symbol: "roundRect",
              },
              {
                min: 1000,
                max: 2000,
                label: "仓储托盘数1000-2000",
                color: "#7699EC",
                symbol: "roundRect",
              },
              {
                min: 2000,
                max: 3000,
                label: "仓储托盘数2000-3000",
                color: "#3369E6",
                symbol: "roundRect",
              },
              {
                gte: 3000,
                label: "仓储托盘数>=3000",
                color: "#003BC3",
                symbol: "roundRect",
              },
            ],
            showLabel: true,
            itemWidth: 12,
            itemHeight: 12,
            textStyle: { color: "#333" },
            bottom: "0",
            backgroundColor: "rgba(0,0,0,0.2)",
            left: "0",
          },
        ],
        tooltip: {
          confine: true,
          trigger: "item", //数据项图形触发
          // backgroundColor: "red",
          borderWidth: 0,
          // formatter: "地区：{b}<br/>数据：{c}",
          formatter: function (params) {
            console.log(params, "params");
            var value;
            if (params.data) {
              // value = params.data?.name + ":" + params.data?.value[2];
              value = params.data?.name + ":" + params.data?.value;
            }
            return value;
          },
          alwaysShowContent: true, //是否永远显示提示框内容，
          enterable: true, //鼠标是否可进入提示框浮层中， boolean 默认为false，如需详情内交互，如添加链接，按钮，可设置为 true。
        },
        toolbox: {
          show: true,
          orient: "vertical",
          left: "right",
          bottom: "10",
          feature: {
            restore: {},
            saveAsImage: {},
          },
        },
      },
    };
  },
  beforeUnmount() {
    // 移除 resize 事件监听器
    window.removeEventListener("resize", this.onWindowResize);

    // 销毁 ECharts 实例
    if (this.mapcharts) {
      this.mapcharts.dispose();
      this.mapcharts = null;
    }
  },
  methods: {
    exportImg() {
      // 导出图片
      let image = this.mapcharts.getDataURL({
        type: "png",
        pixelRatio: 1,
        name: "map",
        backgroundColor: "#fff",
      });
      console.log(image);
    },
    onWindowResize() {
      if (this.mapcharts) {
        // 调整 ECharts 实例大小
        console.log(222);
        this.mapcharts.resize();
      }
    },
    initCharts() {
      this.mapcharts = echarts.init(this.$refs.chinaMap);
      // 绘制图表
      // console.log(this.optionsData, "optionsData");
      this.mapcharts.setOption(this.opD);
    },
    dealWithData() {
      var geoCoordMap = {
        海门: [121.15, 31.89],
        鄂尔多斯: [109.781327, 39.608266],
        招远: [120.38, 37.35],
        舟山: [122.207216, 29.985295],
        齐齐哈尔: [123.97, 47.33],
        盐城: [120.13, 33.38],
        赤峰: [118.87, 42.28],
        青岛: [120.33, 36.07],
        乳山: [121.52, 36.89],
        金昌: [102.188043, 38.520089],
        泉州: [118.58, 24.93],
        莱西: [120.53, 36.86],
        日照: [119.46, 35.42],
        胶南: [119.97, 35.88],
        南通: [121.05, 32.08],
        拉萨: [91.11, 29.97],
        云浮: [112.02, 22.93],
        梅州: [116.1, 24.55],
        文登: [122.05, 37.2],
        上海: [121.48, 31.22],
        攀枝花: [101.718637, 26.582347],
        威海: [122.1, 37.5],
        承德: [117.93, 40.97],
        厦门: [118.1, 24.46],
        汕尾: [115.375279, 22.786211],
        潮州: [116.63, 23.68],
        丹东: [124.37, 40.13],
        太仓: [121.1, 31.45],
        曲靖: [103.79, 25.51],
        烟台: [121.39, 37.52],
        福州: [119.3, 26.08],
        瓦房店: [121.979603, 39.627114],
        即墨: [120.45, 36.38],
        抚顺: [123.97, 41.97],
        玉溪: [102.52, 24.35],
        张家口: [114.87, 40.82],
        阳泉: [113.57, 37.85],
        莱州: [119.942327, 37.177017],
        湖州: [120.1, 30.86],
        汕头: [116.69, 23.39],
        昆山: [120.95, 31.39],
        宁波: [121.56, 29.86],
        湛江: [110.359377, 21.270708],
        揭阳: [116.35, 23.55],
        荣成: [122.41, 37.16],
        连云港: [119.16, 34.59],
        葫芦岛: [120.836932, 40.711052],
        常熟: [120.74, 31.64],
        东莞: [113.75, 23.04],
        河源: [114.68, 23.73],
        淮安: [119.15, 33.5],
        泰州: [119.9, 32.49],
        南宁: [108.33, 22.84],
        营口: [122.18, 40.65],
        惠州: [114.4, 23.09],
        江阴: [120.26, 31.91],
        蓬莱: [120.75, 37.8],
        韶关: [113.62, 24.84],
        嘉峪关: [98.289152, 39.77313],
        广州: [113.23, 23.16],
        延安: [109.47, 36.6],
        太原: [112.53, 37.87],
        清远: [113.01, 23.7],
        中山: [113.38, 22.52],
        昆明: [102.73, 25.04],
        寿光: [118.73, 36.86],
        盘锦: [122.070714, 41.119997],
        长治: [113.08, 36.18],
        深圳: [114.07, 22.62],
        珠海: [113.52, 22.3],
        宿迁: [118.3, 33.96],
        咸阳: [108.72, 34.36],
        铜川: [109.11, 35.09],
        平度: [119.97, 36.77],
        佛山: [113.11, 23.05],
        海口: [110.35, 20.02],
        江门: [113.06, 22.61],
        章丘: [117.53, 36.72],
        肇庆: [112.44, 23.05],
        大连: [121.62, 38.92],
        临汾: [111.5, 36.08],
        吴江: [120.63, 31.16],
        石嘴山: [106.39, 39.04],
        沈阳: [123.38, 41.8],
        苏州: [120.62, 31.32],
        茂名: [110.88, 21.68],
        嘉兴: [120.76, 30.77],
        长春: [125.35, 43.88],
        胶州: [120.03336, 36.264622],
        银川: [106.27, 38.47],
        张家港: [120.555821, 31.875428],
        三门峡: [111.19, 34.76],
        锦州: [121.15, 41.13],
        南昌: [115.89, 28.68],
        柳州: [109.4, 24.33],
        三亚: [109.511909, 18.252847],
        自贡: [104.778442, 29.33903],
        吉林: [126.57, 43.87],
        阳江: [111.95, 21.85],
        泸州: [105.39, 28.91],
        西宁: [101.74, 36.56],
        宜宾: [104.56, 29.77],
        呼和浩特: [111.65, 40.82],
        成都: [104.06, 30.67],
        大同: [113.3, 40.12],
        镇江: [119.44, 32.2],
        桂林: [110.28, 25.29],
        张家界: [110.479191, 29.117096],
        宜兴: [119.82, 31.36],
        北海: [109.12, 21.49],
        西安: [108.95, 34.27],
        金坛: [119.56, 31.74],
        东营: [118.49, 37.46],
        牡丹江: [129.58, 44.6],
        遵义: [106.9, 27.7],
        绍兴: [120.58, 30.01],
        扬州: [119.42, 32.39],
        常州: [119.95, 31.79],
        潍坊: [119.1, 36.62],
        重庆: [106.54, 29.59],
        台州: [121.420757, 28.656386],
        南京: [118.78, 32.04],
        滨州: [118.03, 37.36],
        贵阳: [106.71, 26.57],
        无锡: [120.29, 31.59],
        本溪: [123.73, 41.3],
        克拉玛依: [84.77, 45.59],
        渭南: [109.5, 34.52],
        马鞍山: [118.48, 31.56],
        宝鸡: [107.15, 34.38],
        焦作: [113.21, 35.24],
        句容: [119.16, 31.95],
        北京: [116.46, 39.92],
        徐州: [117.2, 34.26],
        衡水: [115.72, 37.72],
        包头: [110, 40.58],
        绵阳: [104.73, 31.48],
        乌鲁木齐: [87.68, 43.77],
        枣庄: [117.57, 34.86],
        杭州: [120.19, 30.26],
        淄博: [118.05, 36.78],
        鞍山: [122.85, 41.12],
        溧阳: [119.48, 31.43],
        库尔勒: [86.06, 41.68],
        安阳: [114.35, 36.1],
        开封: [114.35, 34.79],
        济南: [117, 36.65],
        德阳: [104.37, 31.13],
        温州: [120.65, 28.01],
        九江: [115.97, 29.71],
        邯郸: [114.47, 36.6],
        临安: [119.72, 30.23],
        兰州: [103.73, 36.03],
        沧州: [116.83, 38.33],
        临沂: [118.35, 35.05],
        南充: [106.110698, 30.837793],
        天津: [117.2, 39.13],
        富阳: [119.95, 30.07],
        泰安: [117.13, 36.18],
        诸暨: [120.23, 29.71],
        郑州: [113.65, 34.76],
        哈尔滨: [126.63, 45.75],
        聊城: [115.97, 36.45],
        芜湖: [118.38, 31.33],
        唐山: [118.02, 39.63],
        平顶山: [113.29, 33.75],
        邢台: [114.48, 37.05],
        德州: [116.29, 37.45],
        济宁: [116.59, 35.38],
        荆州: [112.239741, 30.335165],
        宜昌: [111.3, 30.7],
        义乌: [120.06, 29.32],
        丽水: [119.92, 28.45],
        洛阳: [112.44, 34.7],
        秦皇岛: [119.57, 39.95],
        株洲: [113.16, 27.83],
        石家庄: [114.48, 38.03],
        莱芜: [117.67, 36.19],
        常德: [111.69, 29.05],
        保定: [115.48, 38.85],
        湘潭: [112.91, 27.87],
        金华: [119.64, 29.12],
        岳阳: [113.09, 29.37],
        长沙: [113, 28.21],
        衢州: [118.88, 28.97],
        廊坊: [116.7, 39.53],
        菏泽: [115.480656, 35.23375],
        合肥: [117.27, 31.86],
        武汉: [114.31, 30.52],
        大庆: [125.03, 46.58],
      };
      var data = [];
      for (var key in geoCoordMap) {
        data.push({ name: key, value: geoCoordMap[key] });
      }
      return data;
    },
  },
};
</script>
<style>
#main {
  width: 1000px;
  height: 1000px;
}
</style>