<template>
  <div>
    {{ checkList }} <br />
    {{ columnsData }}
    <el-checkbox-group v-model="checkList">
      <el-checkbox
        :label="item.prop"
        v-for="item in columnsData"
        :key="item.prop"
        >{{ item.label }}</el-checkbox
      >
    </el-checkbox-group>
    <z-table
      v-loading="gridLoading"
      :auto-height="false"
      row-id="id"
      :table-data="tableData"
      :columns-data="columnsData"
      @selection-change="selectionChange"
      @detailRow="toDetail"
    />
  </div>
</template>
<script>
import zTable from "@/components/z-table";
import column from "@/utils/column.js";
console.log(column, "column");
export default {
  components: { zTable },
  name: "ListView",
  data() {
    return {
      checkList: [],
      gridLoading: false,
      column,
      columnsData: [], // 表格 columns 设置数据
      tableData: [], // 表格数据
    };
  },
  created() {
    this.setPageStore().then(async (column) => {
      console.log("column==++++", column);
      column.forEach((element) => {
        console.log(element.show, "element.prop");
        if (element.show) {
          this.checkList.push(element.prop);
        }
        // this.$store
        //   .dispatch(`${this.$options.name}/setColumns`, [...column])
        //   .then((res) => {
        //     console.log(res, "setColumns");
        //   });
      });
    });
  },
  mounted() {
    this.initData();
  },
  methods: {
    toDetail(row) {
      console.log("toDetail", row);
    },
    selectionChange(cur) {
      console.log("selectionChange", cur);
    },
    initData() {
      setTimeout(() => {
        this.tableData = [
          {
            date: "2016-05-02",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄",
          },
          {
            date: "2016-05-04",
            name: "王小虎",
            address:
              "上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄",
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
        ];
        this.loading = false;
      }, 1000);
    },
    setPageStore() {
      console.log(this.$store, "this.$store");
      return new Promise((resolve, reject) => {
        // 注册 option module
        console.log(
          reject,
          "reject",
          this.checkVuexRegister(this.$store, this.$options.name)
        );
        // 注册 option module
        if (this.checkVuexRegister(this.$store, this.$options.name)) {
          this.$store.registerModule(this.$options.name, this.column);
        }
        this.$store
          .dispatch(`${this.$options.name}/getColumns`, this.$options.name)
          .then(() => {
            let columnsData = this.$store.state[this.$options.name].columnsData;
            let columns = this.$store.state[this.$options.name].columns;
            console.log(columnsData, "columnsData");
            console.log(columns, "columns");

            this.columnsData = columnsData;
            resolve(this.columnsData);
            // this.$store
            //   .dispatch(`${this.$options.name}/getColumns`, this.$options.name)
            //   .then(() => {
            //     let columnsData = this.$store.state[this.$options.name].columnsData;
            //     let columns =  this.$store.state[this.$options.name].columns;
            //     console.log(columns, "columns");
            //     console.log(columnsData, "columnsData");
            //     this.$store
            //       .dispatch(`${this.$options.name}/setColumns`, columnsData)
            //       .then((res) => {
            //         console.log(res, "setColumns");
            //       });
            //     this.columnsData =columnsData
          });
      });
    },
  },
};
</script>