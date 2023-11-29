<template>
    <div>
      <el-select v-model="selectedOption" @change="handleChange">
        <el-option v-for="option in options" :key="option.value" :label="option.label" :value="option.value">
            {{ option.label }}
            <el-tag size="mini" type="danger" >已禁用</el-tag>
        </el-option>
      </el-select>
      <el-tag v-if="isNewOption" type="success" closable @close="handleTagClose">{{ newOption }}</el-tag>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedOption: '',
        options: [
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
          { label: 'Option 3', value: 'option3' }
        ],
        isNewOption: false,
        newOption: ''
      };
    },
    methods: {
      handleChange(value) {
        if (value === 'create') {
          this.isNewOption = true;
          this.newOption = '';
        } else {
          this.isNewOption = false;
        }
      },
      handleTagClose() {
        this.isNewOption = false;
      },
      //写一个贪吃蛇游戏
      


    }
  };
  </script>
  