<template>
  <div class="cw-select">
    <select-v2
      :data="list"
      v-model="value"
      placeholder="请选择下拉数据"
      clearable
      multiple
      @change="selectChange"
    ></select-v2>
  </div>
</template>
  
  <script>
import SelectV2 from "@/components/SelectV2";
export default {
  name: "demo",
  components: {
    "select-v2": SelectV2,
  },
  data() {
    return {
      list: [],
      // 下拉框选择的默认值,可以时字符串和数组
      value: [],
    };
  },
  mounted() {
    this.list = [];
    // 创建20000条测试数据
    for (let i = 0; i < 20000; i++) {
      this.list.push({ value: i, label: "测试" + i + "" });
    }
  },
  methods: {
    selectChange(val) {
      console.log("下拉框选择的值", val);
    },
  },
};
</script>
  