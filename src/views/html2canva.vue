<template>
  <div class="box">
    <!-- First DOM element -->
    <div ref="toptitle" class="toptitle">
      <div class="rightCont">
        <div class="left">建议权</div>
        <div class="center">决策权</div>
        <div class="right">一票否决权</div>
      </div>
    </div>

    <div ref="domElement2" class="domElement2">
      <div>gadget</div>
      <div>f红红火火恍恍惚惚</div>
    </div>
    <el-button @click="exportImage">Export Image</el-button>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
// import Canvas2Image from '@/utils/canvas2image'
export default {
  methods: {
    exportImage() {
      const newDIV = document.createElement("div");
      const domElement1 = this.$refs.toptitle;
      const domElement2 = this.$refs.domElement2;
      let c = domElement1.children

      for (const child of c) {
        newDIV.appendChild(child.cloneNode(true));
      }

      newDIV.className = "toptitle1";
      newDIV.style.width = "800px";
      document.getElementById('app').appendChild(newDIV);
      // document.getElementById('#app').appendChild(newDIV);
      console.log(domElement1, "domElement1");
      console.log(newDIV, "newDIV");
      this.$nextTick(async () => {
        const canvas1 = await html2canvas(newDIV);
        const canvas2 = await html2canvas(domElement2);
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(canvas1.width, canvas2.width);
        canvas.height = canvas1.height + canvas2.height;
        // canvas.width-canvas1.width
        const ctx = canvas.getContext("2d");
        ctx.drawImage(canvas1, 0, 0);
        ctx.drawImage(canvas2, 0, canvas1.height);
        ctx.fillStyle = "#000000";
        // ctx.fillRect(0, 0, canvas.width, canvas.height);
        // Convert canvas to base64 image
        const image = canvas.toDataURL("image/png");
        console.log(image);
      })
      // // Open the image in a new window
      // const newWindow = window.open();
      // newWindow.document.write(`<img src="${image}" alt="Exported Image" />`);
    },

  },
};
</script>
<style lang="scss" >
.toptitle1 {
  display: flex;
  justify-content: flex-end;
  padding: 20px;
  width: 500px;
  background: #21b835;
  position: absolute;
  left: 999999px;

  .lefttitle {
    display: flex;
    align-items: center;
  }
}
</style>
<style lang="scss" scoped>
.box {
  width: 800px;
  background: #dd0800;
}

.toptitle {
  display: flex;
  justify-content: flex-end;
  padding: 20px;
  width: 500px;
  background: #21b835;

  .lefttitle {
    display: flex;
    align-items: center;
  }
}

.domElement2 {
  width: 800px;
  height: 500px;
  background: #FA6400;
}

.rightCont {
  display: grid;
  grid-column-gap: 15px;
  grid-row-gap: 0;
  grid-template-columns: auto auto auto;

  .left {
    &::before {
      display: inline-block;
      margin-right: 10px;
      content: "";
      width: 0;
      height: 0;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 10px solid #21b835;
      transform: matrix(1, 0, 0, -1, 0, 0);
    }
  }

  .center {
    &::before {
      display: inline-block;
      margin-right: 10px;
      content: "";
      width: 0;
      height: 0;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 10px solid#FA6400;
      transform: matrix(1, 0, 0, -1, 0, 0);
    }
  }

  .right {
    &::before {
      display: inline-block;
      margin-right: 10px;
      content: "";
      width: 0;
      height: 0;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;

      border-bottom: 10px solid #dd0800;
      transform: matrix(1, 0, 0, -1, 0, 0);
    }
  }
}
</style>