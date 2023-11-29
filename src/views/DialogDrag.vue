<template>
    <div>
        <el-dialog title="提示" v-dialogDrag :visible.sync="type0" width="40%">
            <span>这是一段信息</span>
            <span slot="footer">
                <el-button @click="type0 = false">取 消</el-button>
                <el-button @click="type0 = false" type="primary">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="提示" v-dialogDrag :visible.sync="type1" class="avue-dialog avue-dialog--top" width="40%">
            <span>这是一段信息</span>
            <div class="avue-dialog__footer">
                <el-button @click="type1 = false">取 消</el-button>
                <el-button @click="type1 = false" type="primary">确 定</el-button>
            </div>
        </el-dialog>
        <el-button @click="openBox(0)">原生el样式弹窗</el-button>
        <el-button type="primary" @click="openBox(1)">avue样式弹窗</el-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            type0: false,
            type1: false
        }
    },
    methods: {
        openBox(index) {
            this['type' + index] = true;
        }
    }
}
</script>