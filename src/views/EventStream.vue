<template>
    <div>
      <h1 style="  font-size: 151px;">{{msg.time}}</h1>
      <!-- <ul>
        <li v-for="(item, index) in messages" :key="index">
          {{ item.time }} - {{ item.message }}
        </li>
      </ul> -->
    </div>
  </template>
  
  <script>
  export default {
    name: "EventStream",
    data() {
      return {
        msg:'',
        messages: []
      };
    },
  
    created() {
      const source = new EventSource('/api');  // 创建EventSource对象，指定服务器地址
  
      source.onmessage = (event) => {
        const data = JSON.parse(event.data);  // 解析EventSource数据
        this.messages.push(data); 
        this.msg = data // 将数据添加到Vue组件中的数据数组中
      };
    }
  };
  </script>
  