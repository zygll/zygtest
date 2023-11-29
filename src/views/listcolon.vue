<template>
    <div>
        <div class="checkbox_group">
            <el-checkbox-group v-model="checkList" @change="changeOptions">
                <el-checkbox v-for="(item, index) in tradeSelections" :label="item.eng" :key="index">{{ item.name
                }}</el-checkbox>
            </el-checkbox-group>
        </div>
        <el-table :key="key" :data="tableData" highlight-current-row style="width: 100%">
            <el-table-column property="date" label="委托日期"> </el-table-column>
            <el-table-column property="time" label="时间"> </el-table-column>
            <el-table-column property="city" label="标的"> </el-table-column>
            <el-table-column v-for="(item, index) in formThead" :key="index" :label="item.name">
                <template slot-scope="scope">
                    {{ scope.row[item.eng] }}
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data() {
        const tradeSelections = [
            { eng: 'tradetype', name: "交易类型" },
            { eng: 'ordertype', name: "下单类型" },
            { eng: 'dealnum', name: "成交数量" },
            { eng: 'dealprice', name: "成交价" },
            { eng: 'dealline', name: "成交额" },
            { eng: 'entrustnum', name: "委托数量" },
            { eng: 'entrustprice', name: "委托价格" },
            { eng: 'cpl', name: "平仓盈亏" },
            { eng: 'charge', name: "手续费" },
        ];
        return {
            tableData: [
                {
                    date: "2016-05-02",
                    time: "9:00",
                    city: "螺纹钢",
                    tradetype: "开多",
                    ordertype: "市价单",
                    dealnum: 100,
                    dealprice: 90000,
                    dealline: 10000,
                    entrustnum: 888,
                    entrustprice: 999,
                    cpl: "0.33%",
                    charge: 10,
                },
                {
                    date: "2016-05-02",
                    time: "9:00",
                    city: "螺纹钢",
                    tradetype: "开多",
                    ordertype: "市价单",
                    dealnum: 100,
                    dealprice: 90000,
                    dealline: 10000,
                    entrustnum: 888,
                    entrustprice: 999,
                    cpl: "0.33%",
                    charge: 10,
                },
                {
                    date: "2016-05-02",
                    time: "9:00",
                    city: "螺纹钢",
                    tradetype: "开多",
                    ordertype: "市价单",
                    dealnum: 100,
                    dealprice: 90000,
                    dealline: 10000,
                    entrustnum: 888,
                    entrustprice: 999,
                    cpl: "0.33%",
                    charge: 10,
                },
                {
                    date: "2016-05-02",
                    time: "9:00",
                    city: "螺纹钢",
                    tradetype: "开多",
                    ordertype: "市价单",
                    dealnum: 100,
                    dealprice: 90000,
                    dealline: 10000,
                    entrustnum: 888,
                    entrustprice: 999,
                    cpl: "0.33%",
                    charge: 10,
                },
            ],
            key: 1, // table key
            checkList: [],//被选中的选项eng数组
            formThead: [],//渲染的表头
            tradeSelections,
        };
    },
    watch: {
        checkList(val) {
            this.formThead = this.tradeSelections.filter(i => val.indexOf(i.eng) >= 0)//挑选被选中的对象
            this.key = this.key + 1//为了保证table 每次都会重渲，这样做体验感更好，如果不为table设置key值的话，用户一旦选中了复选框选项，就是在原来table基础上添加删除每一列，页面就有跳动的感觉，体验感不好
        }
    },
}
</script>