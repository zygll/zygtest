<template>
    <div>
      <div class="left" :class="{ 'collapsed': isCollapsed }">
      哈哈稍等哈稍等哈上海大厦大厦
      哈哈稍等哈稍等哈上海大厦大厦
      哈哈稍等哈稍等哈上海大厦大厦
      哈哈稍等哈稍等哈上海大厦大厦
      哈哈稍等哈稍等哈上海大厦大厦
      哈哈稍等哈稍等哈上海大厦大厦
      哈哈稍等哈稍等哈上海大厦大厦
      哈哈稍等哈稍等哈上海大厦大厦
      </div>
  
      <div class="right" :class="{ 'collapsed': isCollapsed }">
      阿是噶事发顺丰撒旦撒
      阿是噶事发顺丰撒旦撒
      阿是噶事发顺丰撒旦撒
      阿是噶事发顺丰撒旦撒
      阿是噶事发顺丰撒旦撒
      阿是噶事发顺丰撒旦撒
      阿是噶事发顺丰撒旦撒
      阿是噶事发顺丰撒旦撒
      阿是噶事发顺丰撒旦撒
      阿是噶事发顺丰撒旦撒
      </div>
  
      <button @click="toggleCollapse">切换</button>
    </div>
  </template>
  
  <style>
  .left {
    width: 100%;
    transition: width 0.5s ease-in-out;
  }
  
  .right {
    transition: width 0.5s ease-in-out;
  }
  
  .collapsed {
    width: 0;
    overflow: hidden;
  }
  </style>
  
  <script>
  export default {
    data() {
      return {
        isCollapsed: false
      };
    },
    methods: {
      toggleCollapse() {
        this.isCollapsed = !this.isCollapsed;
      }
    }
  };
  </script>
  