<template>
  <el-form :model="formLabelAlign">
    <el-form-item
      v-for="item in formItems"
      :key="item.prop"
      :label="item.label"
      :prop="item.prop"
    >
      <el-input
        v-if="item.el === 'input'"
        :placeholder="item.placeholder"
        v-model="formLabelAlign[item.prop]"
      ></el-input>
      <el-input
        v-if="item.el === 'textarea'"
        type="textarea"
        :rows="item.row || 5"
        :placeholder="item.placeholder"
        v-model="formLabelAlign[item.prop]"
      >
      </el-input>

      <el-switch
        v-if="item.el === 'switch'"
        v-model="formLabelAlign[item.prop]"
      ></el-switch>

      <el-slider
        v-if="item.el === 'slider'"
        v-model="formLabelAlign[item.prop]"
      ></el-slider>

      <el-select v-if="item.el === 'select'">
        <el-option
          v-for="option in item.options"
          :key="option.label"
          :label="option.label"
          :value="option.value"
        ></el-option>
      </el-select>

      <el-radio-group
        v-if="item.el === 'radio'"
        v-model="formLabelAlign[item.prop]"
      >
        <el-radio
          v-for="radio in item.radios"
          :key="radio.label"
          :label="radio.label"
          v-mode="radio.value"
          >{{ radio.label }}</el-radio
        >
      </el-radio-group>
      <slot :name="item.prop" />
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: "CommonForm",
  props: {
    formLabelAlign: {
      type: Object,
      require: true,
      defalut: () => ({}),
    },
    formItems: {
      type: Array,
      require: true,
    },
  },
};
</script>
