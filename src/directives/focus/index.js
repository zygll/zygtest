export default {
  inserted: function(dom, options) {
    console.log(dom, 'dom')// dom相当于$refs
    console.log(options, 'options')// 相当于该属性，我们的值可以从这获取
    dom.focus()
  }
}