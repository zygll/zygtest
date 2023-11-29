import Vue from 'vue'
import VueRouter from 'vue-router'
import {routes} from '../utils/routeMap.js'
// import pageRouter from './pageRouter'
// console.log(routes,'routes');
// console.log(routesName,'routesName');
Vue.use(VueRouter)





export default new VueRouter({
  routes,
})