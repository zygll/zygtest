<template>
  <div>
    <div class="sakana-box"></div>
    <el-button @click="setMute">设定静音</el-button>
    <el-button @click="setOriginRotate">设定归零角度</el-button>
    <el-button @click="getValue">获取角色运行状态</el-button>
    <el-button @click="pause">暂停动作</el-button>
    <el-button @click="play">恢复动作</el-button>
    <el-button @click="switchCharacter">切换角色</el-button>
    <el-button @click="setCharacter">切换特定角色</el-button>
  </div>
</template>

<script>
import Sakana from "sakana";
export default {
  name: "sakana",
  components: {},
  data() {
    return {
      sakana: null,
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.sakana = Sakana.init({
      el: ".sakana-box", // 启动元素 node 或 选择器
      character: "takina", // 启动角色 'chisato','takina'
      inertia: 0.01, // 惯性
      decay: 0.99, // 衰减
      r: 60, // 启动角度
      y: 10, // 启动高度
      scale: 1, // 缩放倍数
      translateY: 0, // 位移高度
      canSwitchCharacter: true, // 允许换角色
      onSwitchCharacter(character) {
        // 切换角色回调
        console.log(`${character} dayo~`);
      },
    });
  },
  methods: {
    play() {
      // 恢复动作
      this.sakana.play();
    },
    pause() {
      // 暂停动作
      this.sakana.pause();
    },
    setCharacter() {
      // 切换特定角色
      this.sakana.setCharacter("chisato");
    },
    switchCharacter() {
      // 切换角色
      this.sakana.switchCharacter();
    },
    getValue() {
      // 获取角色运行状态
      const v = this.sakana.getValue();
      console.log(v, "获取角色运行状态");
    },
    setMute() {
      // 获取静音状态
      const { isMute } = Sakana.Voices;
      console.log(isMute, "获取静音状态");
      Sakana.setMute(true);
    },
    setOriginRotate() {
      // 获取归零角度
      this.sakana.setOriginRotate(10);
    },
  },
};
</script>

<style lang="scss" scoped>
 .sakana-box{
  position: fixed;
  right: 0;
  bottom: 0;
  transform-origin: 100% 100%; /* 从右下开始变换 */
}
</style>
