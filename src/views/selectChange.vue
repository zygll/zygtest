<template>
  <div class="selectC">
    <div class="selectC-title">选择框</div>
    <div class="selectC-content">
      <el-select v-model="value" placeholder="请选择" @change="changeC">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectC",
  components: {},
  data() {
    return {
      value: "",
      options: [
        {
          value: "1",
          label: "10%",
        },
        {
          value: "2",
          label: "20%",
        },
        {
          value: "3",
          label: "30%",
        },
        {
          value: "4",
          label: "40%",
        },
        {
          value: "5",
          label: "50%",
        },
      ],
    };
  },
  computed: {},
  created() {},
  methods: {
    changeC(v) {
      console.log(v);
      if (v == 5) {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        });
        //   .catch(() => {
        //     this.$message({
        //       type: "info",
        //       message: "已取消删除",
        //     });
        //   });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.selectC {
}
</style>
