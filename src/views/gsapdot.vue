<template>
  <div >
    <div class="feature" id="featureAnimation">
    <div id="featureBackground"></div>
  </div>
  <jor-el id="app" data-year="true">1231451</jor-el>
  <zygll-el id="app" data-year="true">zygll</zygll-el>
  </div>

</template>

<script>
// https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.4/Draggable.min.js
// https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.4/EaselPlugin.min.js
// https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.4/Flip.min.js
// https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.4/MotionPathPlugin.min.js
// https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.4/Observer.min.js
// https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.4/PixiPlugin.min.js
// https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.4/ScrollTrigger.min.js
// https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.4/ScrollToPlugin.min.js
// https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.4/TextPlugin.min.js
// https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/DrawSVGPlugin3.min.js
// https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/Physics2DPlugin3.min.js
// https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/PhysicsPropsPlugin3.min.js
// https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/MorphSVGPlugin3.min.js
import { gsap } from "gsap";

import { CustomEase } from "gsap-trial/CustomEase";
import { RoughEase, ExpoScaleEase, SlowMo } from "gsap-trial/EasePack";

/* The following eases are Club GSAP perks */
import { CustomBounce } from "gsap-trial/CustomBounce"; // extends CustomEase
import { CustomWiggle } from "gsap-trial/CustomWiggle"; // extends CustomEase

import { Flip } from "gsap-trial/Flip";
import { Observer } from "gsap-trial/Observer";
import { ScrollToPlugin } from "gsap-trial/ScrollToPlugin";
import { Draggable } from "gsap-trial/Draggable";
import { MotionPathPlugin } from "gsap-trial/MotionPathPlugin";
import { EaselPlugin } from "gsap-trial/EaselPlugin";
import { PixiPlugin } from "gsap-trial/PixiPlugin";
import { TextPlugin } from "gsap-trial/TextPlugin";

/* The following plugins are Club GSAP perks */
import { DrawSVGPlugin } from "gsap-trial/DrawSVGPlugin"; // extends MotionPathPlugin
import { ScrollSmoother } from "gsap-trial/ScrollSmoother";
import { GSDevTools } from "gsap-trial/GSDevTools";
import { InertiaPlugin } from "gsap-trial/InertiaPlugin";
import { MotionPathHelper } from "gsap-trial/MotionPathHelper";
import { Physics2DPlugin } from "gsap-trial/Physics2DPlugin";
import { PhysicsPropsPlugin } from "gsap-trial/PhysicsPropsPlugin";
import { ScrambleTextPlugin } from "gsap-trial/ScrambleTextPlugin";
import { SplitText } from "gsap-trial/SplitText";

gsap.registerPlugin(
  Flip,
  Observer,
  ScrollToPlugin,
  Draggable,
  MotionPathPlugin,
  EaselPlugin,
  PixiPlugin,
  TextPlugin,
  DrawSVGPlugin,
  ScrollSmoother,
  GSDevTools,
  InertiaPlugin,
  MotionPathHelper,
  Physics2DPlugin,
  PhysicsPropsPlugin,
  ScrambleTextPlugin,
  SplitText,
  RoughEase,
  ExpoScaleEase,
  SlowMo,
  CustomEase,
  CustomBounce,
  CustomWiggle
);
gsap.config({ trialWarn: false });
export default {
  name: "Gsap",
  components: {},
  data() {
    return {};
  },
  mounted() {
    /*
     * See https://greensock.com/gsap/ for details about GSAP.
     */

    let dots = [],
      bg = document.querySelector("#featureBackground"),
      i,
      dot;

    // create 80 dot elements and put them in an array
    for (i = 0; i < 80; i++) {
      dot = document.createElement("div");
      dot.setAttribute("class", "dot");
      bg.appendChild(dot);
      dots.push(dot);
    }

    //set the initial position of all the dots, and pick a random color for each from an array of colors
    gsap.set(dots, {
      backgroundColor: "random([#663399,#84d100,#cc9900,#0066cc,#993333,#cc0066,#ffcc00,#ff6600,#ff0000,#009933,#cc00cc,#ff3399,#ffcc33,#ff6666,#00cc99,#ff99cc,#ffcc99,#ccff00,#ccffcc,#ccffff,#99ccff,#9999ff,#cc99ff,#ff99ff,#ffccff,#ffffff])",
      scale: "random(0.4, 1)",
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      willChange: "transform",
      x: 400,
      y: 300,
    });

    // create the physics2D animation
    let tween = gsap.to(dots, {
      duration: 2.5,
      physics2D: {
        velocity: "random(200, 650)", // shoot them at a random velocity
        angle: "random(250, 290)", // shoot them at a 250-290 degree angle
        gravity: 500, //  
      },
      delay: "random(0, 2.5)",
    });

    GSDevTools.create({
      animation: tween,
      container: "#featureAnimation",
      minimal: true,
    });
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Signika+Negative:wght@400;600&display=swap");
#featureAnimation {
  background-color: #000;
  height: 500px;
  overflow: hidden;
  position: relative;
  width: 800px;
  margin: auto;
}

.dot {
  position: absolute;
  background-color: #91e600;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  will-change: transform;
}
</style>
