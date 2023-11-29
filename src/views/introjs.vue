<template>
    <div class="demo-container">
        <div id="step1" class="card-demo" style="width: 300px;">
            <div class="card shadow--md">
                <div class="card__image" id="step2">
                    <img :src="this.tipsImg1" alt="Image alt text" title="Logo Title Text 1" />
                </div>
                <div class="card__body" id="step3">
                    <h4>Quaco Lighthouse</h4>
                    <small>
                        The Quaco Head Lighthouse is a well maintained lighthouse close to St.
                        Martins. It is a short, beautiful walk to the lighthouse along the
                        seashore.
                    </small>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            introOption: { // 参数对象
                prevLabel: '上一步',
                nextLabel: '下一步',
                // skipLabel: '跳过',
                doneLabel: '完成',
                tooltipClass: 'intro-tooltip', /* 引导说明文本框的样式 */
                highlightClass: 'intro-highlight', /* 说明高亮区域的样式 */
                exitOnEsc: true, /* 是否使用键盘Esc退出 */
                exitOnOverlayClick: false, /* 是否允许点击空白处退出 */
                keyboardNavigation: true, /* 是否允许键盘来操作 */
                showBullets: false, /* 是否使用点显示进度 */
                showProgress: false, /* 是否显示进度条 */
                scrollToElement: true, /* 是否滑动到高亮的区域 */
                overlayOpacity: 0.5, // 遮罩层的透明度 0-1之间
                positionPrecedence: ['bottom', 'top', 'right', 'left'], /* 当位置选择自动的时候，位置排列的优先级 */
                disableInteraction: false, /* 是否禁止与元素的相互关联 */
                hidePrev: true, /* 是否在第一步隐藏上一步 */
                // hideNext: true, /* 是否在最后一步隐藏下一步 */
                steps: [{
                    element: '#step1',
                    intro: '这是第1步的引导信息',
                },
                {
                    element: '#step2',
                    intro: '这是第2步的引导信息',
                },
                {
                    element: '#step3',
                    intro: '这是第3步的引导信息',
                },]
            },
            tipsImg1: 'https://images.unsplash.com/photo-1506624183912-c602f4a21ca7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60', // 新手引导的提示图片
            tipsImg2: 'https://robohash.org/2'// 新手引导的提示图片
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.initGuide() // 调用新手引导的方法
        })
    },
    methods: {
        initGuide() {
            // 绑定标签元素的选择器数组
            // this.introOption.steps = [
            //     { title: '系统使用指导', element: '#step1', intro: `鼠标悬浮在各个功能模块上，可快速查找系统对应操作SOP以及运维人员` },
            //     { title: '个人信息', element: '#step2', intro: `点击个人头像/下拉图标，选择个人信息，初始密码为******，建议修改为个人账号密码。`, },
            //     { title: '重新引导', element: '#step3', intro: '点击此处可重新查看引导流程。', },
            // ]
            this.$intro()
                .setOptions(this.introOption)
                // 点击结束按钮后执行的事件
                .oncomplete(() => {
                    console.log('点击结束按钮后执行的事件')
                })
                // 点击跳过按钮后执行的事件
                .onexit(() => {
                    console.log('点击跳过按钮后执行的事件')
                })
                // 确认完毕之后执行的事件
                .onbeforeexit(() => {
                    console.log('确认完毕之后执行的事件')
                })
                .start()
        },
    }
}
</script>

<style>
.card__body>:last-child,
.card__footer>:last-child,
.card__header>:last-child {
    margin-bottom: 0;
}

.demo-container {
    align-items: center;
    border-radius: var(--ifm-global-radius);
    display: flex;
    flex-direction: column;
    padding: 2rem;
}

.shadow--md {
    box-shadow: var(--ifm-global-shadow-md) !important;
}

.card {
    background-color: var(--ifm-card-background-color);
    border-radius: var(--ifm-card-border-radius);
    box-shadow: var(--ifm-global-shadow-lw);
    display: flex;
    flex-direction: column;
    overflow: hidden
}

.card__image {
    padding-top: var(--ifm-card-vertical-spacing)
}

.card__image:first-child {
    padding-top: 0
}

.card__body,
.card__footer,
.card__header {
    padding: var(--ifm-card-vertical-spacing) var(--ifm-card-horizontal-spacing)
}

.card__body:not(:last-child),
.card__footer:not(:last-child),
.card__header:not(:last-child) {
    padding-bottom: 0
}

.card__body>:last-child,
.card__footer>:last-child,
.card__header>:last-child {
    margin-bottom: 0
}

.card__footer {
    margin-top: auto
}

.card__body,
.card__footer,
.card__header {
    padding: var(--ifm-card-vertical-spacing) var(--ifm-card-horizontal-spacing);
}

h4 {
    font-size: var(--ifm-h4-font-size);
}
</style>