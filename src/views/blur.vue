<template>
  <el-form ref="myForm" :model="form" :rules="rules" @submit.native.prevent>
    <el-form-item label="姓名" prop="name">
      <el-input v-model="form.name" @blur="handleBlur('name')"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
      },
      blurSuccess: true ,// 用于记录失焦接口的结果
      rules: {
        name: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    handleBlur(field) {
      // 处理失焦事件的逻辑
      // 可以在这里调用失焦事件的接口
      // 如果接口返回失败则显示错误信息

      // 示例中假设接口返回失败
      // 这里使用 Promise.resolve() 来模拟接口调用
      // 实际应根据接口调用情况来处理

      return new Promise((resolve, reject) => {
        if (!this.form.name) {
          reject("请输入姓名");
        } else {
          setTimeout(() => {
            if (this.form.name === "admin") {
              // 模拟接口返回成功
              resolve();
            } else {
              // 模拟接口返回失败
              this.$message.error("接口请求失败");
              reject("接口请求失败");
            }
          }, 1000);
        }
      }).catch(() => {
        this.blurSuccess = false;
      });
    },
    handleSubmit() {
      // 提交表单的逻辑
      // 判断失焦事件是否成功，若成功则继续提交
      this.handleBlur("name")
        .then(() => {
          // 失焦事件成功，继续提交表单
          this.$refs.myForm.validate((valid) => {
            if (valid && this.blurSuccess) {
              // 表单验证通过，调用提交接口
              this.submitForm();
            } else {
              // 表单验证不通过，显示错误信息
              console.log("表单验证不通过");
            }
          });
        })
        .catch((error) => {
          // 失焦事件失败，不提交表单，显示错误信息
          console.log(error);
        });
    },
    submitForm() {
      // 提交表单的接口调用
      console.log("提交表单");
      this.$message.success("提交表单成功");
    },
  },
};
</script>
