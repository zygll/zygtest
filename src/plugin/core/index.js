import config from '../../../package.json'
// 功能插件
import log from '../../utils/log'

export default {
  async install (Vue) {

    Vue.prototype.checkVuexRegister = (store, name) => {
      console.log("checkVuexRegister", store, name);
      const checkName = name + "/"
      const keyList = []
      for (const i in store._modulesNamespaceMap) {
        keyList.push(i)
      }
      console.log(keyList,'keyList');
      // keyList.includes(checkName) 为 true, 则 "vuex已注册"+name+", 将读取已有表结构"
      return !keyList.includes(checkName)
    }

    // // 设置为 false 以阻止 vue 在启动时生成生产提示 
    // Vue.config.productionTip = false

    Vue.prototype.$log = log
    // 打印UI官网
    log.pretty('[' + config.name + '] ' + config.version, 'success')
  }
}
