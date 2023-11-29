<!-- create by crystalSong 分页+table+动态设置表格列的隐藏与显示 -->
<template>
    <div class='trends_container'>
        <div class="table_container">
            <el-table ref="trendsTable" :data="tableList" fit stripe style="width: 100%" border
                @selection-change="handleSelectionChange">
                <slot></slot>//此处用于列表灵活展示
            </el-table>
        </div>
        <div class="pagination_trends_wrap">
            <div class="trends_oprt_wrap">
                //将所有列展示在此，可以点击进行隐藏与显示
                <el-popover placement="top-start" width="280" trigger="click">
                    <div class="trends_btn_wrap">
                        <el-checkbox-group v-model="visibleList" size="small" @change="visibleListChange">
                            <el-checkbox v-for="(col, index) in columnList" :key="index" :label="col.label"
                                border>{{ col.value }}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                    <el-button slot="reference" size="small">隐藏/显示列</el-button>
                </el-popover>
            </div>
            <div class="pagination_wrap" v-if="total > 0">
                //分页区域
                <template>
                    <el-pagination style="text-align: right;" @size-change="handleSizeChange"
                        @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 25, 50, 100]"
                        :page-size.sync="currentSize" layout="total, sizes, prev, pager, next, jumper" :total="total"
                        background>
                    </el-pagination>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'trendsTable',
    props: {
        tableList: {//列表数据
            type: Array,
            require: true,
            default: () => []
        },
        hideColumnIndexs: {//需要隐藏的列的下标即表格数据的序号从0开始
            type: Array,
            default: () => []
        },
        pageSize: {//每页几条数据
            type: Number,
            default: 10,
        },
        pageNumber: {//当前页码
            type: Number,
            default: 1,
        },
        total: {//总数据条数
            required: true,
            type: Number,
            default: 0,
        },
    },
    components: {},
    data() {
        return {
            visibleList: [],//显示/隐藏列的选中下标数据集合
            columnList: [],//表格所有列名称数据列表
        };
    },
    created() {

    },
    mounted() {
        let _this = this;
        var curHideList = [];
        //页面初始化：动态获取表格有用的所有列生成并放入复选列表并记录初始隐藏列
        this.$refs.trendsTable.$children.forEach((obj, index) => {
            if (obj.type) {
                _this.columnList.push(
                    {
                        'label': index,
                        'value': obj.type == 'selection' ? '选择' : obj.label,
                    }
                );
                // 记录初始展示的列
                if (_this.hideColumnIndexs.indexOf(index) === -1) {
                    _this.visibleList.push(index)
                    curHideList[index] = false;
                } else {
                    curHideList.push(true);
                }
            }
        });
        //此向父组件传递列是否隐藏的数组
        _this.$emit('getHideColist', curHideList);
    },
    methods: {
        visibleListChange(item) {
            // console.log('change',item)
            var curHideList = [];
            this.columnList.forEach((obj, index) => {
                curHideList[index] = false;
                // 更改显示隐藏列
                if (item.indexOf(index) === -1) {
                    curHideList[index] = true;
                }
            });
            this.$emit('getHideColist', curHideList);
        },
    },
    computed: {

    },
    watch: {},
}
</script>
<style lang='scss' scoped>
.trends_container {
    .pagination_trends_wrap {
        margin: 20px 0;
        position: relative;
    }

    .trends_oprt_wrap {
        display: inline-block;
        vertical-align: top;
        width: 100px;
    }

    .pagination_wrap {
        display: inline-block;
        vertical-align: top;
        width: calc(100% - 105px);
        margin: 0 !important;
    }
}
</style>
<style lang="scss">
.trends_btn_wrap {
    .el-checkbox-group {
        label {
            margin: 0 !important;
            margin: 0 10px !important;
            margin-bottom: 15px !important;
        }
    }
}

.table_container .el-table .cell {
    text-overflow: initial !important;
}
</style>