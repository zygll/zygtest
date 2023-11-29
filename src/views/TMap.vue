<template>
  <div id="container" style="width: 100%; height: 500px"></div>
</template>

<script>
export default {
  data() {
    return {
      qqMap: null,
      config: {
        key: "UVOBZ-D25CQ-S2K5F-GUPXC-IS2NT-N6FOR",
        qqMapCDN: "https://map.qq.com/api/js?v=2.exp&key=",
        TMapCDN: "https://map.qq.com/api/gljs?v=1.exp&key=",
      },
    };
  },
  mounted() {
    this.initMapScript();
    this.checkQQMapCdn()
      .then(() => {
        console.log("qq引用成功end");
        this.initMap();
      })
      .catch(() => {
        console.log("加载地图资源1111open");
        this.initMapScript().then(() =>
          this.checkQQMapCdn().then(() => this.initMap())
        );
      });
  },
  methods: {
    initMapScript() {
      console.log("initMapScript");
      return new Promise((resolve, reject) => {
        Promise.all([this.loadTMap(), this.loadQQMap()])
          .then(() => {
            resolve();
          })
          .catch((err) => {
            reject();
            console.log(err);
          });
      });
    },
    loadTMap() {
      let script = document.createElement("script");
      const src = this.config.TMapCDN + this.config.key;
      script.src = src;
      document.body.appendChild(script);
      return new Promise((resolve, reject) => {
        script.onload = () => {
          console.log(`${src}---T加载完成`);
          resolve();
        };
        script.onerror = () => {
          console.log(`${src}----T加载失败`);
          reject();
        };
      });
    },
    loadQQMap() {
      const src = this.config.qqMapCDN + this.config.key;
      let script = document.createElement("script");
      script.src = src;
      document.body.appendChild(script);
      return new Promise((resolve, reject) => {
        script.onload = () => {
          // this.qqMap = qq.maps;
          console.log(`${src}---Q加载完成`);
          // this.initMap();
          resolve();
        };
        script.onerror = () => {
          console.log(`${src}---Q加载失败`);
          reject();
        };
      });
    },
    checkQQMapCdn() {
      return new Promise((resolve, reject) => {
        console.log(reject);
        this.qqMap = window.TMap;
        console.log("qq引用成功", this.qqMap);
        resolve();
        // if (window.qq.maps) {
        //   this.qqMap = TMap;
        //   console.log("qq引用成功", this.qqMap);
        //   resolve();
        // } else {
        //   reject();
        //   // console.warn("qqMapCDN未引用")
        // }
      });
    },
    initMap() {
      //定义地图中心点坐标
      console.log(this.qqMap, "this.qqMap");
      if (!this.qqMap) return;
      // this.svg();
      var center = new this.qqMap.LatLng(39.984104, 116.307503);
      //定义map变量，调用TMap.Map构造函数创建地图
      var map = new this.qqMap.Map(document.getElementById("container"), {
        center: center, //设置地图中心点坐标
        zoom: 17, //设置地图缩放级别
        mapStyleId: "style1", //个性化地图样式设置
      });

      // // marker文字在图片内
      // new this.qqMap.MultiMarker({
      //   map: map,
      //   styles: {
      //     default: new this.qqMap.MarkerStyle({
      //       width: 92, // 宽度
      //       height: 92, // 高度
      //       anchor: { x: 46, y: 46 }, // 锚点位置
      //       src: 'https://mapapi.qq.com/web/lbs/visualizationApi/demo/img/circle.png', // 标注点图片url或base64地址
      //       color: '#fff', // 标注点文本颜色
      //       size: 22, // 标注点文本文字大小
      //       offset: { x: 0, y: 16 }, // 标注点文本文字基于direction方位的偏移属性
      //     }),
      //   },
      //   geometries: [
      //     {
      //       position: new this.qqMap.LatLng(39.9543498091366, 116.3064286563349), // 标注点位置
      //       content: '41', // 标注点文本
      //     },

      //   ],
      // });
      // //初始化marker
      var marker = new this.qqMap.MultiMarker({
        id: "marker-layer",
        map: map,
        styles: {
          marker: new this.qqMap.MarkerStyle({
            width: 35,
            height: 35,
            anchor: { x: 16, y: 32 },
            src: require("@/assets/icons-marker.png"),
          }),
        },
        geometries: [
          {
            id: "demo",
            styleId: "marker",
            position: new this.qqMap.LatLng(39.984104, 116.307503),
            properties: {
              title: "marker",
            },
            content: "41", // 标注点文本
          },
        ],
      });
      //添加监听事件  获取鼠标点击事件
      // qq.maps.event.addListener(marker, "click", function () {
      //   console.log(e);
      // });
      console.log(marker, "marker");
      marker.on('click', function (e) {
        console.log(e);
      });
    },
    svg() {
      var SVG_NS = "http://www.w3.org/2000/svg";
      var colorList = ["#7AF4FF", "#67D7FF", "#52B5FF", "#295BFF"];
      console.log(colorList, "colorList");
      var mapContainer = document.getElementById("container");

      // 自定义SVG图层 - 继承DOMOverlay
      function SvgMarker(options) {
        window.TMap.DOMOverlay.call(this, options);
      }

      SvgMarker.prototype = new this.qqMap.DOMOverlay();

      // 初始化
      SvgMarker.prototype.onInit = function (options) {
        this.options = options.options;
        this.map = options.map;
      };

      // 销毁时需解绑事件监听
      SvgMarker.prototype.onDestroy = function () {
        if (this.onClick) {
          this.dom.removeEventListener(this.onClick);
        }
      };

      // 创建DOM元素，返回一个DOMElement，使用this.dom可以获取到这个元素
      SvgMarker.prototype.createDOM = function () {
        var svg = document.createElementNS(SVG_NS, "svg");
        svg.id = "svgDom";
        svg.setAttribute("width", mapContainer.offsetWidth);
        svg.setAttribute("height", mapContainer.offsetHeight);
        svg.style.cssText = "position:absolute;top:0px;left:0px;";
        var group = []; // 定义g元素数组
        var circleShape = []; // 定义circle元素数组
        var textShape = []; // 定义text元素数组
        // 遍历传入参数，创建同等数量的svg下元素节点并绑定事件
        for (var i = 0; i < this.options.length; i++) {
          var createCenter = this.map.projectToContainer(
            this.options[i].position
          );
          group[i] = document.createElementNS(SVG_NS, "g");

          // 在中心创建一个圆形
          circleShape[i] = document.createElementNS(SVG_NS, "circle");
          circleShape[i].setAttribute(
            "style",
            "fill: blue;stroke:#FFFFFF;opacity:0.9;"
          );
          circleShape[i].setAttribute("cx", createCenter.x);
          circleShape[i].setAttribute("cy", createCenter.y);
          circleShape[i].setAttribute("r", 20);
          group[i].appendChild(circleShape[i]);

          // 绘制文字
          textShape[i] = document.createElementNS(SVG_NS, "text");
          textShape[i].setAttribute("x", createCenter.x);
          textShape[i].setAttribute("y", createCenter.y + 5); // +5是为了让文字向下偏移5像素，使文字居中
          textShape[i].setAttribute("text-anchor", "middle");
          textShape[i].setAttribute("fill", "#FFFFFF");
          textShape[i].innerHTML = this.options[i].id + 1;
          svg.appendChild(group[i]);
          group[i].appendChild(textShape[i]);
          this.onMouseEnter = function (e) {
            // DOMOverlay继承自EventEmitter，可以使用emit触发事件
            // 动态修改circle颜色，所以选择传入circle节点
            this.emit("mouseenter", e.target.firstChild);
          }.bind(this);
          this.onMouseLeave = function (e) {
            this.emit("mouseleave", e.target.firstChild);
          }.bind(this);
          group[i].addEventListener("mouseenter", this.onMouseEnter);
          group[i].addEventListener("mouseleave", this.onMouseLeave);
        }
        return svg;
      };

      // 更新DOM元素，在地图移动/缩放后执行
      SvgMarker.prototype.updateDOM = function () {
        if (!this.map) {
          return;
        }

        // 经纬度坐标转容器像素坐标
        for (var j = 0; j < this.options.length; j++) {
          var pixel = this.map.projectToContainer(this.options[j].position);
          console.log(pixel, "pixel");
          var updateCenter = this.map.projectToContainer(
            this.options[j].position
          );
          this.dom.children[j]
            .getElementsByTagName("circle")[0]
            .setAttribute("cx", updateCenter.x);
          this.dom.children[j]
            .getElementsByTagName("circle")[0]
            .setAttribute("cy", updateCenter.y);
          this.dom.children[j]
            .getElementsByTagName("text")[0]
            .setAttribute("x", updateCenter.x);
          this.dom.children[j]
            .getElementsByTagName("text")[0]
            .setAttribute("y", updateCenter.y + 5);
        }
      };

      window.SvgMarker = SvgMarker;
      var map = new this.qqMap.Map("container", {
        zoom: 12, // 设置地图缩放级别
        center: new this.qqMap.LatLng(39.984104, 116.307503), // 设置地图中心点坐标
      });
      // 初始化自定义marker类
      var marker = new SvgMarker({
        map,
        options: [
          {
            position: new this.qqMap.LatLng(
              39.96030543872138,
              116.25809083213608
            ),
            id: 0,
          },
          {
            position: new this.qqMap.LatLng(
              39.9986945980902,
              116.33598362780685
            ),
            id: 1,
          },
          {
            position: new this.qqMap.LatLng(
              40.02906301748584,
              116.25499991104516
            ),
            id: 2,
          },
        ],
      });
      map.res;
      //marker点击事件

      marker.on("mouseenter", function (e) {
        e.setAttribute("style", "fill: red;stroke:red; opacity:0.9;");
      });
      marker.on("mouseleave", function (e) {
        e.setAttribute("style", "fill: blue;stroke:#FFFFFF;opacity:0.9;");
      });

      // // 监听地图容器变化，动态修改svg图层大小，防止更新时元素移出svg图区
      // map.on("resize", function () {
      //   document
      //     .getElementById("svgDom")
      //     .setAttribute("width", mapContainer.offsetWidth);
      //   document
      //     .getElementById("svgDom")
      //     .setAttribute("height", mapContainer.offsetHeight);
      // });
    },
  },
};
</script>

<style>
</style>