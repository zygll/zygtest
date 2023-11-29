<template>
    <div>
        <input v-model="inputValue" @focus="onInputFocus" @blur="onInputBlur" type="text">
        <button @click="startEventSequence">Click Me</button>
        <p>Execution Order: {{ JSON.stringify(executionOrder) }}</p>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            inputValue: '', // 输入框的值
            executionOrder: [], // 执行顺序记录
            isButtonClick: false // 判断是否是按钮点击触发的事件
        };
    },
    methods: {
        startEventSequence() {
            this.executionOrder = []; // 清空执行顺序记录
            this.executeNextEvent();
        },
        executeNextEvent() {
            if (!this.executionOrder.length) {
                this.onButtonClick()
            }
            if (this.executionOrder.length == 1) {
                this.executionOrder[0]()
            }
            // if (this.executionOrder.length >= 3) {
            //     return; // 执行完所有事件后停止
            // }

            // setTimeout(() => {
            //     if (this.executionOrder.length === 0 && !this.isButtonClick) {
            //         this.onInputFocus();
            //     } else if (this.executionOrder.length === 1 && !this.isButtonClick) {
            //         this.onInputBlur();
            //     } else if (this.executionOrder.length === 2 || this.isButtonClick) {
            //         this.onButtonClick();
            //         this.isButtonClick = false;
            //     }

            //     this.executeNextEvent();
            // }, 0);
        },
        onInputFocus() {
            console.log('focus');
            this.executionOrder.push('focus');
        },
        onInputBlur() {
            console.log('blur');
            this.executionOrder.push('blur');
        },
        onButtonClick() {
            this.executionOrder.push(() => {
                console.log('button click');
            });
        }
    }
};
</script>
  