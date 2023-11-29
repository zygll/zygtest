<template>
  <div >
    <div class="mask"></div>
    <div class="dialog">
      <span class="el-icon-close close" @click="close"> </span>
      <label class="label">提示</label>
      <div class="contnet">{{msg}}</div>
      <div class="btn-group">
        <el-button size="mini" @click="close">取消</el-button>
        <el-button size="mini" type="primary" @click="$emit('onClick')">确定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Dialog",
  props: {
    msg: {
      type: String
    },
  },
  data() {
    return {
    };
  },
  methods: {
    close() {
      this.$emit("update:dialogShow", false);
    },
    submit() {
      this.close();
    },
  },
};
</script>
<style lang="scss" scoped>
.label {
  display: block;
  line-height: 1.5;
  margin-top: 15px;
}
.contnet {
  padding: 20px;
}
.close {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
}
.btn-group {
  padding: 20px;
}
.mask {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba($color: #000000, $alpha: 0.5);
}
.dialog {
  width: 50%;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  height: auto;
  border-radius: 5px;
}
</style>
