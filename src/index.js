// / ES6 API兼容处理
// import "@/utils/polyfill"
// 核心插件
import corePlugin from './plugin/core'
// 组件
import ZmTreeOrg from './components/tree-org'

import "@/styles/index.scss";
const components = [
  ZmTreeOrg
]

const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
  Vue.use(corePlugin)
  Vue.directive('focus',{
    inserted: function(el, { value }){
      if(value) {
        el.focus();
      }
    },
    update(el, { value }){
      if(value) {
        el.focus();
      }
    },
	})
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install, ZmTreeOrg
}