<template>
  <div>
    <el-input
      v-model.trim="form.pastAdjustFee"
      @blur="inputMoney($event, 'pastAdjustFee')"
    ></el-input>
    <el-button type="primary" @click="open">打开弹窗</el-button>
    <!-- <Dialog ref="dialogRef" :dialogShow.sync="dialogShow" /> -->
  </div>
</template>
<script>
// import Dialog from "../components/Dialog.vue";
import { getInputValue } from "../util";
import { showMsg } from "../utils/messages";
export default {
  name: "Other",
  // components: { Dialog },
  data() {
    return {
      form: {
        pastAdjustFee: "",
      },
      dialogShow: false,
    };
  },
  mounted() {},
  methods: {
    open() {
      // this.dialogShow = true;
      showMsg('sdasd',(close)=>{
        close()
      })
    },
    inputMoney(el, name) {
      console.log(el, name);
      this.form[name] = getInputValue(el);
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
