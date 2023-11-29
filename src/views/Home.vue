<template>
  <div class="home">
    <Echats
      ref="echartCMapRef1"
      class="echarts-item"
      title="冷链网络布局"
      :optionsData="optionsDataDry"
    ></Echats>
    <!-- <HelloWorld msg="滚动条控制多个表格滚动" /> -->
    <!-- <div class="container" ref="container">
      <el-table ref="table1" :data="tableData1" height="200" class="table1">
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column prop="xx1" label="xx1"> </el-table-column>
        <el-table-column prop="xx2" label="xx2"> </el-table-column>
        <el-table-column prop="xx3" label="xx3"> </el-table-column>
        <el-table-column prop="xx4" label="xx4"> </el-table-column>
        <el-table-column prop="xx5" label="xx5"> </el-table-column>
        <el-table-column prop="xx6" label="xx6"> </el-table-column>
        <el-table-column prop="xx7" label="xx7"> </el-table-column>
        <el-table-column prop="xx8" label="xx8"> </el-table-column>
        <el-table-column prop="xx9" label="xx9"> </el-table-column>
        <el-table-column prop="xx10" label="xx10"> </el-table-column>
      </el-table>
      <el-table
        class="table2"
        ref="table2"
        :data="tableData2"
        height="200"
        :show-header="false"
      >
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column prop="xx1" label="xx1"> </el-table-column>
        <el-table-column prop="xx2" label="xx2"> </el-table-column>
        <el-table-column prop="xx3" label="xx3"> </el-table-column>
        <el-table-column prop="xx4" label="xx4"> </el-table-column>
        <el-table-column prop="xx5" label="xx5"> </el-table-column>
        <el-table-column prop="xx6" label="xx6"> </el-table-column>
        <el-table-column prop="xx7" label="xx7"> </el-table-column>
        <el-table-column prop="xx8" label="xx8"> </el-table-column>
        <el-table-column prop="xx9" label="xx9"> </el-table-column>
        <el-table-column prop="xx10" label="xx10"> </el-table-column>
      </el-table>
    </div> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import Echats from "./Echats";
export default {
  name: "Home",
  components: {
    Echats,
  },
  data() {
    return {
      piecesDry: [
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
      seriesTypeMapData: [
        {
          name: "河南省",
          value: [113.665412, 34.757975, 45],
        },
        {
          name: "广东省",
          value: [113.280637, 23.125178, 10584],
        },
      ],
      seriesTypeEffectScatterData: [
        {
          name: "北京",
          value: [116.4100037, 40.18500137, 2],
        },
        {
          name: "湖北",
          value: [114.298572, 30.584355, 3],
        },
      ],
      seriesTypeScatterDataValue: [
        {
          name: "福建省",
          value: [119.306239, 26.075302],
        },
      ],
      commonOptions: {
        geo: {
          map: "china",
          roam: false, // 一定要关闭拖拽
          zoom: 1.23,
          center: [105, 36], // 调整地图位置
          label: {
            normal: {
              show: false, // 关闭省份名展示
              fontSize: "10",
              color: "rgba(0,0,0,0.7)",
            },
            emphasis: {
              show: true,
              color: "#fff",
            },
          },

          itemStyle: {
            normal: {
              areaColor: "#d5d5d5",
              borderColor: "#fff",
              borderWidth: 1, // 设置外层边框
            },
          },
          // regions: [
          //   // 在地图中对特定的区域配置样式。
          //   {
          //     name: "内蒙古",
          //     itemStyle: {
          //       borderColor: "#fff",
          //       borderWidth: 4
          //     }
          //   }
          // ]
          // silent: true  // 图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件。
        },
        visualMap: [
          // 映射
          {
            type: "piecewise",
            show: true,
            hoverLink: false,
            seriesIndex: 0, // 仅应用于地图类型的series
            pieces: [],
            showLabel: true,
            // 表示 visualMap-piecewise 本身的视觉样式。
            itemWidth: 12, // 每个图元的宽度
            itemHeight: 12,
            textStyle: {
              color: "#333",
            },
            bottom: "0",
            backgroundColor: "rgba(0,0,0,0.2)",
            left: "0",
          },
        ],
        series: [
          {
            data: [],
            type: "map",
            name: "地图",
            label: {
              show: true,
              formatter: function (params) {
                // 这里的代码可以根据具体需求来编写，用来格式化标签信息
                return params.name + "\n" + params.value;
              },
            },
            // map: "China",
            // zoom: 2,
            geoIndex: "0", // 共享一个 geo 组件
          },
          {
            // 画点
            type: "effectScatter",
            coordinateSystem: "geo",
            name: "代表省内N个城市有业务",
            label: {
              show: true,
              formatter: "{@[2]}",
            },
            symbol: "circle",
            itemStyle: {
              color: "#fa6400",
            },
            symbolSize: [12, 12], // 设置图片大小
            data: [],
            zlevel: 2,
          },
          {
            // 画图
            type: "scatter",
            coordinateSystem: "geo",
            name: "既有冷链仓又有干仓",
            itemStyle: {
              color: "#000",
            },
            symbol:
              "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAlhQTFRFhLeEWNFYN81LMMJOJro/KLs7OL1Gc9N+xezL3PPg5/jq7PnuS7RLPcI9Lb1BK7lAM7pCYc1wyu7P5vfo8fvz8/v16Pjq4fXkO8I9MsM8K7tAOL9Ltei75ffo7/rx3fTgqOOwg9eObNB5Y81x5ffntei6KsE+P8JWp+Kw6fjs8vvztee8edSGRcNWKrs9Ibg16fjrKbo/LLxEr+a46fjr2/Tfl92gJro62/TfLLs/V8po4fXjlt2gQcJTI7g3QsFSvurE6/ntsea4RMNVa8554PTj2PLcctJ/J7o6sOW37vnvouGrQsJTIrg2Jbk5Ob9LUcdgze/R8fryetWHKbo9quOx0fDVqeOxQsJS2PPb5ffnZM1yPcBO8vvz/v/+3PTf3PPfW8pqV8lm1fHZ////V8ll2/Pe2/PfW8ppWMln1vLa1PLX4vbkYs1wQMJRtue89/z4w+zI7vnvd9OEKLo7T8Zftue92vPeouGq6Pfqm9+kPcFOJ7o7Q8NUXsxsPcFPXMxs0/HX0fDWas93I7k3atB40vHWNb9Jp+Ov5PbmpeKt5PbnJLc5QMFR0PDU7vnvhtiRN79KI7g2OL9K7vnwIrc4J7k7i9qW2fPc0fDVhdiQPMFOJbk4htiQI7c5IrY3L7xCfdaJ2vPd7fnvouGqYcxvJrk4JLk5Jbk5Mb1FiNiTzO/R4PXjz+/Tb9F8WsppU8hiKLw8Jrs8I7g6Irc5Jrk7PcFOnuCnz+/U5ffo7Pnt4PXi1/LbJro/Jbo+JLc7JLk4Jro6OL9JVMhjktyctee7xu3LzfDSTJEXbgAAAMh0Uk5TAgMFBwsOFCBJa4KMAwUJDBMdUoW21u33BgkPFkKJ0fb/////iUIOGT2e5v7/////ng8XR6Lx///wFSWP////IV/W/v8ylfX//13D////////gN7///////+Z8f////+l+f//////p/r///+g8/////+O5P//////c8////////9Qq/r////6QYHj/+M2TrHy//////IuP3XB9/////8lM0hyxfP//x0pOkx8uOf6////FR4sOUlckb7b7Pb7DxYiOkZXaY2nucHG1uDBAAAB9ElEQVR4nGNgYGRiZmFlY+fg5OLm5uLkYGdjZWFmYmRg4OHl4xcQFBIWERUTFxcTFREWEhTg5+PlYZCQlJKWkZWTV1BUUlZWUlSQl1NRlZaSlGCQVFPX0NTS1tHV0wcCPV0dbS0DDXU1SQZDI2MTUzNdc30oMNc1szAxNjJksLSy1rKxtdOHAztbGy1rK0sGewdHJ2ckcaCMs5Ojgz2Di6ubu4c+CvBwd3N1YfD08vYB8Xz9/AMC/P18QWwfby9PhsCg4BAQx88nNCwsPMIPxA4JDgpkiIyKBuuPCY2Ni4sNjQFzoqMiGeITEsHspOS4lJS45FQwJzEhniEtPQPMzswCSWRlgjkZ6WkM2Tm5YHZefkFKSkF+HpiTm5PNUFhUXAJil5SWlZeXlULYxUWFDBWVVdVg59bU1tXV1oCdW19VWcHQ0NjU7AfxWEsLhPZrbWtsYGjv6OyqRw2S+q7ujnaGnt6+/gkTfRHikyZPmNLX28Mwddr0GTNnzZ4DE58ze+7MGdOnTWWYN3/BwkWLlyz1B4ekh//SJYsXLVwwfx7DsuUrVq5avWatzbr1GzasX2ezds3qVStXLF/GsHHT5i1bt23fsXPX7j17du/auWP7tq1bNm/ayLB33/7NBw4eOnzk6LHjx48dPXL40MEDm/fv2wsAE2y7O/TF9CsAAAAASUVORK5CYII=",
            symbolSize: [12, 12], // 设置图片大小
            data: [],
            zlevel: 2,
          },
        ],
        tooltip: {
          trigger: "item", // 数据项图形触发
          // backgroundColor: "red",
          borderWidth: 0,
          // formatter: "地区：{b}<br/>数据：{c}",
          formatter: function (params) {
            // console.log(params, "params");
            var value;
            if (params.data) {
              value = params.data?.name + ":" + params.data?.value[2];
            }
            return value;
          },
        },
      },
      // dom1: null,
      // dom2: null,
      // tableData1: [
      //   {
      //     date: "2016-05-02",
      //     name: "王小虎1",
      //     address: "上海市普陀区金沙江路 1518 弄",
      //     xx1: "内容1",
      //     xx2: "内容2",
      //     xx3: "内容3",
      //     xx4: "内容4",
      //     xx5: "内容5",
      //     xx6: "内容6",
      //     xx7: "内容7",
      //     xx8: "内容8",
      //     xx9: "内容9",
      //     xx10: "内容10",
      //   },
      //   {
      //     date: "2016-05-04",
      //     name: "王小虎1",
      //     address: "上海市普陀区金沙江路 1517 弄",
      //     xx1: "内容1",
      //     xx2: "内容2",
      //     xx3: "内容3",
      //     xx4: "内容4",
      //     xx5: "内容5",
      //     xx6: "内容6",
      //     xx7: "内容7",
      //     xx8: "内容8",
      //     xx9: "内容9",
      //     xx10: "内容10",
      //   },
      //   {
      //     date: "2016-05-01",
      //     name: "王小虎1",
      //     address: "上海市普陀区金沙江路 1519 弄",
      //     xx1: "内容1",
      //     xx2: "内容2",
      //     xx3: "内容3",
      //     xx4: "内容4",
      //     xx5: "内容5",
      //     xx6: "内容6",
      //     xx7: "内容7",
      //     xx8: "内容8",
      //     xx9: "内容9",
      //     xx10: "内容10",
      //   },
      //   {
      //     date: "2016-05-03",
      //     name: "王小虎1",
      //     address: "上海市普陀区金沙江路 1516 弄",
      //     xx1: "内容1",
      //     xx2: "内容2",
      //     xx3: "内容3",
      //     xx4: "内容4",
      //     xx5: "内容5",
      //     xx6: "内容6",
      //     xx7: "内容7",
      //     xx8: "内容8",
      //     xx9: "内容9",
      //     xx10: "内容10",
      //   },
      // ],
      // tableData2: [
      //   {
      //     date: "2016-05-02",
      //     name: "王小虎",
      //     address: "上海市普陀区金沙江路 1518 弄",
      //     xx1: "内容1",
      //     xx2: "内容2",
      //     xx3: "内容3",
      //     xx4: "内容4",
      //     xx5: "内容5",
      //     xx6: "内容6",
      //     xx7: "内容7",
      //     xx8: "内容8",
      //     xx9: "内容9",
      //     xx10: "内容10",
      //   },
      //   {
      //     date: "2016-05-04",
      //     name: "王小虎",
      //     address: "上海市普陀区金沙江路 1517 弄",
      //     xx1: "内容1",
      //     xx2: "内容2",
      //     xx3: "内容3",
      //     xx4: "内容4",
      //     xx5: "内容5",
      //     xx6: "内容6",
      //     xx7: "内容7",
      //     xx8: "内容8",
      //     xx9: "内容9",
      //     xx10: "内容10",
      //   },
      //   {
      //     date: "2016-05-01",
      //     name: "王小虎",
      //     address: "上海市普陀区金沙江路 1519 弄",
      //     xx1: "内容1",
      //     xx2: "内容2",
      //     xx3: "内容3",
      //     xx4: "内容4",
      //     xx5: "内容5",
      //     xx6: "内容6",
      //     xx7: "内容7",
      //     xx8: "内容8",
      //     xx9: "内容9",
      //     xx10: "内容10",
      //   },
      //   {
      //     date: "2016-05-03",
      //     name: "王小虎",
      //     address: "上海市普陀区金沙江路 1516 弄",
      //     xx1: "内容1",
      //     xx2: "内容2",
      //     xx3: "内容3",
      //     xx4: "内容4",
      //     xx5: "内容5",
      //     xx6: "内容6",
      //     xx7: "内容7",
      //     xx8: "内容8",
      //     xx9: "内容9",
      //     xx10: "内容10",
      //   },
      // ],
    };
  },
  computed: {
    optionsDataDry() {
      return {
        geo: this.commonOptions.geo,
        visualMap: [
          { ...this.commonOptions.visualMap[0], pieces: this.piecesDry },
        ],
        series: [
          { ...this.commonOptions.series[0], data: this.seriesTypeMapData },
          {
            ...this.commonOptions.series[1],
            data: this.seriesTypeEffectScatterData,
          },
          {
            ...this.commonOptions.series[2],
            data: this.seriesTypeScatterDataValue,
          },
        ],
        tooltip: this.commonOptions.tooltip,
      };
    },
  },
  mounted() {
    // this.dom1 = this.$refs.table1.bodyWrapper;
    // this.dom2 = this.$refs.table2.bodyWrapper;
    // this.listenerScroll();
  },

  methods: {
    // listenerScroll() {
    //   this.dom2.addEventListener("scroll", () => {
    //     // 横滚
    //     this.dom1.scrollLeft = this.dom2.scrollLeft;
    //     // 竖滚
    //     this.dom1.scrollTop = this.dom2.scrollTop;
    //   });
    //   this.dom1.addEventListener("scroll", () => {
    //     // 横滚
    //     this.dom2.scrollLeft = this.dom1.scrollLeft;
    //     // 竖滚
    //     this.dom2.scrollTop = this.dom1.scrollTop;
    //   });
    // },
  },
};
</script>
<style lang="scss" scoped>
/* .container {
  overflow-x: scroll;
} */
.table1 {
  ::v-deep .el-table__body-wrapper {
    overflow-x: hidden;
  }
}
</style>