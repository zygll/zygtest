<template>
  <CommonForm :form-label-align="formData" :form-items="FORM_ITEMS">
    <!-- 因为我们应该在公共组件注册过这个插槽, alias这项不符合我们的格式，这里就可以自定义 -->
    <template v-slot:alias>
      <h3>插槽内容</h3>
      <el-input v-model="formData.alias" />
    </template>
  </CommonForm>
</template>
<script>
import CommonForm from "@/components/CommonForm";
export default {
  components: {
    CommonForm,
  },
  data() {
    return {
      formData: {
        name: "dogeWin",
        alias: "道格温·狗胜",
      },
      FORM_ITEMS: [
        { prop: "name", label: "姓名", lableWidth: 100, el: "input" },
        {
          prop: "info",
          label: "信息介绍",
          lableWidth: 100,
          el: "textarea",
          row: 3,
        },
        { prop: "switch", label: "是否启动", lableWidth: 100, el: "switch" },
        { prop: "alias", label: "", lableWidth: 100, el: "" },
      ],
    };
  },
};
</script>
