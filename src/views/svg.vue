<template>
  <div class="Svg">
    <div class="picsum">
      <img src="https://picsum.photos/id/237/200/300" alt="" />
    </div>

    <filter
      id="filter"
      x="-20%"
      y="-20%"
      width="140%"
      height="140%"
      filterUnits="objectBoundingBox"
      primitiveUnits="userSpaceOnUse"
      color-interpolation-filters="linearRGB"
    >
      <feTurbulence
        type="turbulence"
        baseFrequency="0.005 0.099"
        numOctaves="2"
        seed="2"
        stitchTiles="stitch"
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        result="turbulence1"
      />
      <feDisplacementMap
        in="SourceGraphic"
        in2="turbulence1"
        scale="20"
        xChannelSelector="R"
        yChannelSelector="B"
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        result="displacementMap6"
      />
    </filter>
  </div>
</template>

<script>
import { gsap } from "gsap";
export default {
  name: "Svg",
  components: {},
  data() {
    return {};
  },
  computed: {},
  mounted() {
    // 使用gsap实现的动画,随机改变图片的baseFrequency 值
    gsap.to("feTurbulence", {
      duration: 1, // 动画持续时间
      attr: {
        // 动画属性
        baseFrequency: "0.1 0.1",
      },
      repeat: -1, // 重复次数
      yoyo: true, // 是否反向播放
    });
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.picsum {
  width: 200px;
  height: 300px;
  img {
    width: 100%;
    height: 100%;
    filter: url(#filter);
  }
}
</style>
