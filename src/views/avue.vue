<template>
    <div>
        <el-button @click="copy">复制</el-button>
        <avue-crud ref="crud" :data="data" :option="option" v-model="form"></avue-crud>

    </div>
</template>
<script>

export default {
    name: "TestCrud",
    data() {
        return {
            form: {},
            data: [
                {
                    name: '张三',
                    sex: '男'
                }, {
                    name: '李四',
                    sex: '女'
                }, {
                    name: '王五',
                    sex: '女'
                }, {
                    name: '赵六',
                    sex: '男'
                }
            ],
            option: {
                align: 'center',
                menuAlign: 'center',
                column: [
                    {
                        label: '姓名',
                        prop: 'name'
                    },
                    {
                        label: '性别',
                        prop: 'sex'
                    }
                ]
            }
        }
    },
    methods: {
        copy() {
            this.$Clipboard({
                text: 'hahahahaha'
            }).then(() => {
                this.$message.success('复制成功')
            }).catch(() => {
                this.$message.error('复制失败')
            });
        },
 
    }
    // ,
    // watch: {
    //     'form.name': function (val) {
    //         console.log(val);
    //     }
    // }
}

</script>
  