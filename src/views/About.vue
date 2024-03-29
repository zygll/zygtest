<template>
  <div>
    <!-- <div class="table">
  extextendsComp    <div class="row">
        <div class="cell">单元格 1</div>
        <div class="cell">单元格 2</div>
        <div class="cell">单元格 3</div>
      </div>
      <div class="row">
        <div class="cell">单元格 4</div>
        <div class="cell">单元格 5</div>
        <div class="cell">单元格 6</div>
      </div>
    </div>
    <div class="grid-table">
      <div class="grid-row">
        <div class="grid-cell">姓名</div>
        <div class="grid-cell">年龄</div>
        <div class="grid-cell">性别</div>
      </div>
      <div class="grid-row">
        <div class="grid-cell">张三</div>
        <div class="grid-cell">25</div>
        <div class="grid-cell">男</div>
      </div>
      <div class="grid-row">
        <div class="grid-cell">李四</div>
        <div class="grid-cell">30</div>
        <div class="grid-cell">女</div>
      </div>
    </div>

    <div class="flex-table">
      <div class="flex-row">
        <div class="flex-cell">Header 1</div>
        <div class="flex-cell">Header 2</div>
        <div class="flex-cell">Header 3</div>
      </div>
      <div class="flex-row">
        <div class="flex-cell">Row 1, Column 1</div>
        <div class="flex-cell">Row 1, Column 2</div>
        <div class="flex-cell">Row 1, Column 3</div>
      </div>
      <div class="flex-row">
        <div class="flex-cell">Row 2, Column 1</div>
        <div class="flex-cell">Row 2, Column 2</div>
        <div class="flex-cell">Row 2, Column 3</div>
      </div>
    </div> -->
    <extendsComp
      v-model="value1"
      type="monthrange"
      range-separator="至"
      start-placeholder="开始月份"
      end-placeholder="结束月份"
    >
    </extendsComp>
    <div>
      <p>拖动下方的文本到框内:</p>
      <div id="div1" @dragover.prevent @drop="drop($event)">12222</div>
      <br />
      <span id="dragItem" draggable="true" @dragstart="dragstart($event)"
        >拖我!</span
      >
      <br />
      <label for="">方式1</label>
      <el-input
        v-model="input"
        placeholder="请输入发送的内容"
        clearable
        @input="postMsg"
      ></el-input>
      <label for="">方式2</label>
      <el-input
        v-model="input1"
        placeholder="请输入发送的内容"
        clearable
        @input="sendMessage"
      ></el-input>
    </div>
  </div>
</template>
<script>
import extendsComp from "@/components/extendsComp/index.vue";
export default {
  name: "About",
  components: {
    extendsComp,
  },
  data() {
    return { 
      value1: "",
      input: "",
      input1: "",
    };
  },
  methods: {
    sendMessage() {
      this.$EventBus.$emit("message1", this.input1);
    },
    postMsg() {
      //使用 BroadcastChannel 实现跨窗口通信
      // BroadcastChannel 是一个实验性的 API，它允许在同一个域下的不同窗口、标签页或者 web workers 之间进行通信。
      const bc = new BroadcastChannel("channelName");
      bc.postMessage(this.input);
    },
    dragstart(event) {
      event.dataTransfer.setData("text", event.target.id);
      console.log(event.dataTransfer);
    },
    drop(event) {
      console.log("====================================");

      console.log("====================================");
      var data = event.dataTransfer.getData("text");
      console.log(data, "data");
      event.target.appendChild(document.getElementById(data));
    },
  },
};
</script>
<style lang="scss" scoped>
.table {
  display: table;
  width: 100%;
  border-collapse: collapse;
  .row {
    display: table-row;
  }

  .cell {
    display: table-cell;
    border: 1px solid #ccc;
    padding: 10px;
  }
}

.grid-table {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: minmax(50px, auto);
  grid-row-gap: 1px;
}
.grid-cell {
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

.flex-table {
  display: flex;
  flex-direction: column;
}
.flex-row {
  display: flex;
  flex-direction: row;
}
.flex-cell {
  flex: 1;
  padding: 8px;
  border-bottom: 1px solid #ddd;
}
</style>
