<template>
  <div class="three">
    <div id="container"></div>
    <div class="loading">
      <div class="loading-text">加载中</div>
      <div class="loading-num">{{ num }}</div>
    </div>
  </div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
export default {
  name: "three",
  components: {},
  data() {
    return {
      publicPath: process.env.BASE_URL,
      mesh: null,
      camera: null,
      scene: null,
      renderer: null,
      controls: null,
      num: 0,
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.createScene(); // 创建场景
      this.loadGLTF(); // 加载GLTF模型
      //   this.createLight(); // 创建光源
      this.createCamera(); // 创建相机
      this.createRender(); // 创建渲染器
      this.createControls(); // 创建控件对象
      this.render(); // 渲染
    },
    // 创建场景
    createScene() {
      this.scene = new THREE.Scene();
    },
    // 加载GLTF模型
    loadGLTF() {
      console.log(this.publicPath, "publicPath");
      const THIS = this;
      const loader = new GLTFLoader(); // 创建gltf加载器
      // 加载模型
      loader.load(
        `${THIS.publicPath}models/gltf/fiesta_tea.glb`,
        (model) => {
          console.log("model", model.scene);
          model.scene.children[0].scale.set(50, 50, 50); // 缩放模型大小
          THIS.scene.add(model.scene); // 将模型添加到场景
        }, // 模型加载中
        (xhr) => {
          let num = ((xhr.loaded / xhr.total) * 100).toFixed(2) + "%";
          THIS.num = num;

          console.log(num);
        },
        (err) => {
          console.error(err);
        }
      );
    },

    // 创建光源
    createLight() {
      // 环境光
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.1); // 创建环境光
      this.scene.add(ambientLight); // 将环境光添加到场景
      const spotLight = new THREE.SpotLight(0xffffff); // 创建聚光灯
      spotLight.position.set(150, 150, 150); // 设置聚光灯光源位置
      spotLight.castShadow = true; // 设置聚光灯光源投射阴影
      this.scene.add(spotLight); // 将聚光灯光源添加到场景
    },
    // 创建相机
    createCamera() {
      const element = document.getElementById("container");
      const width = element.clientWidth; // 窗口宽度
      const height = element.clientHeight; // 窗口高度
      const k = width / height; // 窗口宽高比
      // PerspectiveCamera( fov, aspect, near, far )
      this.camera = new THREE.PerspectiveCamera(35, k, 0.1, 1000);
      this.camera.position.set(150, 150, 150); // 设置相机位置

      this.camera.lookAt(new THREE.Vector3(10, 40, 0)); // 设置相机方向
      this.scene.add(this.camera);
    },
    // 创建渲染器
    createRender() {
      const element = document.getElementById("container");
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // 创建渲染器
      this.renderer.setSize(element.clientWidth, element.clientHeight); // 设置渲染区域尺寸
      this.renderer.shadowMap.enabled = true; // 显示阴影
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 阴影类型
      this.renderer.setClearColor(0x3f3f3f, 1); // 设置背景颜色
      element.appendChild(this.renderer.domElement); // body元素中插入canvas对象
    },

    render() {
      if (this.mesh) {
        this.mesh.rotation.z += 0.006;
      }
      this.renderer.render(this.scene, this.camera); // 渲染
      requestAnimationFrame(this.render); // 请求再次执行渲染函数render
    },
    // 创建控件对象
    createControls() {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement); // 创建控件对象
    //   this.controls.addEventListener("change", this.render); // 监听鼠标、键盘事件
    },
  },
};
</script>

<style lang="scss" scoped>
#container {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 200px;
  left: 0;
}
</style>
