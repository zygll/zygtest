<template>
  <div>
    当前设备是否支持震动：{{ isVibrate?'支持~':'不支持~' }}
    <button v-if="isVibrate" @click="vibrate">震动</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
        isVibrate:false
    };
  },
  mounted() {
    window.navigator.vibrate?this.isVibrate = true:this.isVibrate = false;
  },
  methods: {
    vibrate() {
      if (window.navigator.vibrate) {
        // [震动时间，停止时间，震动时间，停止时间………..]
        window.navigator.vibrate([300, 300, 300, 300, 300, 300, 300, 300]);
      }
    },
  },
};
</script>