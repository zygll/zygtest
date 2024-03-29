<template>
  <div class="broadcast-channel">
    <h1>跨标签通讯</h1>
    <div class="card"></div>
  </div>
</template>
<style>
.card {
  width: 300px;
  background: url("../assets/pk.png") no-repeat center center;
  position: fixed;
  top: 100px;
  left: 100px;
  height: 429px;
  background-size: cover;
  box-shadow: 6px 6px 6px 6px #eee;
  overflow: hidden;
  border-radius: 10px;
}
</style>
<script>
export default {
  name: "BroadcastChannel",
  mounted() {
    const barHeight = () => window.outerHeight - window.innerHeight;
    const cardDom = document.querySelector(".card");
    cardDom.style.top = 100 + "px";
    cardDom.style.left = 100 + "px";
    // cardDom.style.background =
    //   new URLSearchParams(window.location.search).get("color") || "red";

    // 屏幕坐标转换为窗口坐标
    const screenToClient = (screenX, screenY) => {
      const clienX = screenX - window.screenX;
      const clienY = screenY - window.screenY - barHeight();
      return [clienX, clienY];
    };

    // 窗口坐标转换为屏幕坐标
    const clientToScreen = (clienX, clienY) => {
      const screenX = clienX + window.screenX;
      const screenY = clienY + window.screenY + barHeight();
      return [screenX, screenY];
    };

    // 创建 Broadcast Channel
    const channel = new BroadcastChannel("myChannel");
    // 监听消息
    channel.onmessage = (event) => {
      // 处理接收到的消息
      const [clienX, clienY] = screenToClient(...event.data);
      // 不同窗口的卡片要在同一个位置， 要放到同一个坐标系下面，保持屏幕坐标一致
      cardDom.style.left = clienX + "px";
      cardDom.style.top = clienY + "px";
    };

    // 发送消息
    const sendMessage = (message) => {
      channel.postMessage(message);
    };

    window.onload = function () {
      cardDom.onmousedown = function (e) {
        cardDom.style.cursor = "pointer";
        let x = e.pageX - cardDom.offsetLeft;
        let y = e.pageY - cardDom.offsetTop;
        window.onmousemove = function (e) {
          cardDom.style.left = e.clientX - x + "px";
          cardDom.style.top = e.clientY - y + "px";
          // 发送消息
          const clientCoordinateX = e.clientX - x;
          const clientCoordinateY = e.clientY - y;
          const ScreenCoordinate = clientToScreen(
            clientCoordinateX,
            clientCoordinateY
          );
          sendMessage(ScreenCoordinate);
        };
        window.onmouseup = function () {
          window.onmousemove = null;
          window.onmouseup = null;
          cardDom.style.cursor = "unset";
        };
      };
    };
  },
};
</script>
