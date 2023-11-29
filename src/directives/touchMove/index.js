
export default {
  bind(el, binding) {
    let startX;
    el.addEventListener('touchstart', (event) => {
      startX = event.touches[0].pageX;
    });
    el.addEventListener('touchmove', (event) => {
      const moveX = event.touches[0].pageX;
      const distance = moveX - startX;
      binding.value(distance);
    });
  },
  inserted: function(dom, options) {
    console.log(dom, 'dom')// dom相当于$refs
    console.log(options, 'options')// 相当于该属性，我们的值可以从这获取
  }
}