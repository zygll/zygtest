<template>
  <div id="Maps" style="width: 100%; height: 800px; position: relative">
    <!-- <div id="back-button" style="position: absolute; top: 10px; left: 10px">
      <button>返回</button>
    </div> -->
  </div>
</template>

<script>
import * as echarts from "echarts";
import "@/public/shandong.js";
import "@/public/china.js";
import { mapJson } from "@/public/mapJson.js";
console.log(mapJson, "mapJson");
export default {
  data() {
    return {
      map: null,
      option: {
        geo: {
          map: "china", //这里的名称需要和shandong.js: echarts.registerMap('shandong',{})中的名称一致
          label: { show: true }, //显示地点
          roam: true, //缩放
        },
        series: [],
      },
    };
  },
  mounted() {
    this.initMap();
    if (this.map) {
      this.map.on("click", (e) => {
        console.log(e);
        mapJson.forEach((province) => {
          if (e.name == province.name) {
            console.log(province.name, province);
            this.changeMap(province);
          }
        });
      });
    }
  },
  methods: {
    initMap() {
        console.log(this.map);
      if (this.map) {
        this.map.clear();
      }
      this.map = echarts.init(document.getElementById("Maps"));
      this.map.showLoading();
      this.map.setOption(this.option);
      this.map.hideLoading();
    },
    //动态切换地图
    changeMap(province) {
      console.log(province, "province");
      ////地图添加一个返回按键并注册事件
      const div = document.createElement("div");
      div.id = "back";
      div.style =
        "position: absolute; top: 10px; left: 10px; z-index: 999; cursor: pointer; color: #000; font-size: 16px;";
      div.innerText = "返回";
      document.getElementById("Maps").appendChild(div);
      document.getElementById("back").onclick = () => {
        this.initMap();
        document.getElementById("Maps").removeChild(div);
      };

      this.map.showLoading();
      this.map.clear();
      let option = {
        series: [
          {
            type: "map",
            map: province.name,
            label: { show: true }, //显示地点
            roam: true, //缩放
          },
        ],
      };
      echarts.registerMap(province.name, province.json);
      this.map.setOption(option);
      this.map.hideLoading();
    },
  },
};
</script>

<style>
</style>