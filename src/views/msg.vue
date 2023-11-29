<template>
  <div>
    <div>BroadcastChannel接收到的消息：{{ msg }}</div>
    <div>eventBus接收到的消息：{{ msg1 }}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: "",
      msg1: "",
    };
  },
  mounted() {
    const bc = new BroadcastChannel("channelName");
    bc.addEventListener("message", (event) => {
      console.log("收到消息：", event.data);
      this.msg = event.data;
      //   document.title = event.data;
    });

    this.$EventBus.$on("message1", this.handleMessage);
  },
  methods: {
    handleMessage(message) {
      this.msg1 = message;
      console.log("Message received:", message);
    },
  },
};
</script>