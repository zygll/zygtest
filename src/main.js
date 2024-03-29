import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import ZmTreeOrg from 'zm-tree-org';
console.log(ZmTreeOrg,'ZmTreeOrg');
import "zm-tree-org/lib/zm-tree-org.css";
import plugin from "@/plugin/core"
import lodash from "lodash"
import Avue from '@smallwei/avue';
import '@smallwei/avue/lib/index.css';
Vue.config.productionTip = false
import EventBus from '@/utils/event-bus.js';
Vue.prototype.$EventBus = EventBus;
import VueDragTreeOrg from 'vue-drag-tree-org'
Vue.use(VueDragTreeOrg)
Vue.prototype.lodash = lodash
Vue.use(plugin)
Vue.use(ZmTreeOrg);
Vue.use(ElementUI);
Vue.use(Avue);

// import 'highlight.js/styles/stackoverflow-light.css'
// import hljs from 'highlight.js/lib/core';
// import javascript from 'highlight.js/lib/languages/javascript';
// import hljsVuePlugin from "@highlightjs/vue-plugin";
// Vue.use(hljsVuePlugin)

import 'vx-easyui/dist/themes/default/easyui.css';
import 'vx-easyui/dist/themes/icon.css';
import 'vx-easyui/dist/themes/vue.css';
import EasyUI from 'vx-easyui';
Vue.use(EasyUI);
// 首页引导插件
import intro from 'intro.js' // introjs库
import 'intro.js/introjs.css' // introjs默认css样式
// introjs还提供了多种主题，可以通过以下方式引入
import 'intro.js/themes/introjs-modern.css' // introjs主题

// 使用循环注册的方式
import directives from '@/directives'
// 开始遍历注册
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})
console.log(Object.keys(directives), 'Object.keys(directives)')
console.log(directives, 'directives')// 这玩意是一个对象
// 把intro.js加入到vue的prototype中，方便使用，就可以直接通过this.$intro()来调用了
Vue.prototype.$intro = intro


import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  ak: '5ZkheYcVim3GPUigu2XotEWptSAAlXLz'
})


// import VueVirtualScroller from 'vue-virtual-scroller'
// import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
// Vue.use(VueVirtualScroller)






new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')