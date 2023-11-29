import Vue from 'vue/dist/vue.esm'
const Dialog = {
    template: `
      <div>
        <p>{{ msg }}</p>
        <button @click="onClick">OK</button>
      </div>
    `,
    props: ['msg'],
    methods: {
        onClick() {
            // do something
            this.$emit('onClick') // 触发 close 事件
        }
    }
}
export function showMsg(msg, onClick) {
    console.log(msg, onClick);
    const div = document.createElement('div')
    document.body.appendChild(div)
    new Vue({
        el: div,
        render: function (h) {
            return h(Dialog, {
                props: {
                    msg
                },
                on: {
                    onClick: this.onClick,
                },
            })
        },
        methods: {
            onClick() {
                console.log(div)
                div.remove()
            },

        }
    })

}
