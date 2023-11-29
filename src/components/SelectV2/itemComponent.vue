<template>
  <div>
    <el-option
      :key="label + value"
      :label="source[label]"
      :value="source[value]"
    >
      <span>{{ source[label] }}</span>
      <span v-if="rightLabel" style="float: right; color: #939393">{{
        source[rightLabel]
      }}</span>
    </el-option>
  </div>
</template>
  
  <script>
export default {
  name: "item-component",
  props: {
    // index of current item
    // 每一行的索引
    index: {
      type: Number,
    },
    // 每一行的内容
    source: {
      type: Object,
      default() {
        return {};
      },
    },
    // 需要显示的名称
    label: {
      type: String,
    },
    // 绑定的值
    value: {
      type: String,
    },
    // 右侧显示绑定的值,为空则不显示
    rightLabel: {
      type: String,
      default: "",
    },
  },
  mounted() {},
};
</script>
  