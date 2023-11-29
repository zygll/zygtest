<template>
  <div ref="doms">
    <h1 style="  font-size: 50px;
  color:red;">HTML转Wrold</h1>
    <h1>Hello Word!</h1>
    <p style="font-size: 100px">
      This is a sample HTML content that will be exported to Word file.
    </p>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
    <div>
      <img
        width="50"
        height="50"
        src="https://robohash.org/2a0d:5082:17::e247:80d7:9ffe.png"
      /><img
        width="50"
        height="50"
        src="https://robohash.org/NW9.png?set=set1&size=150x150"
      />
    </div>
    <el-button @click="exportToWord('my-word-document')">导出 Word</el-button>
  </div>
</template>
 <!-- 调用   <mycom></mycom> -->
 <script>
import htmlDocx from "html-docx-js/dist/html-docx";
import saveAs from "file-saver";
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  methods: {
    exportToWord(filename) {
      // 获取doms 
      const dom = this.$refs.doms;
      console.log(dom)
      const converted = htmlDocx.asBlob(dom.outerHTML);
      saveAs(converted, filename ? filename.docx : "document.docx");
    },
  },
};
</script>
<style>

</style>