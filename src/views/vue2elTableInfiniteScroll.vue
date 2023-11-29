<template>
    <div>
        disabled{{ disabled }} <br>
        total {{ total }} <br>
        page {{ page }} <br>
        pager {{ pager }}
        <el-table v-el-table-infinite-scroll="load" :data="data" :infinite-scroll-disabled="disabled" height="307px">
            <el-table-column prop="ibpProjectName" label="ibpProjectName" />
            <el-table-column prop="eventCode" label="eventCode" />
            <el-table-column prop="statusName" label="statusName" />
            <el-table-column prop="followUserName" label="followUserName" />
            <el-table-column prop="businessClassifyName" label="businessClassifyName" />
            <el-table-column prop="eventAttrListName" label="eventAttrListName" />
            <el-table-column prop="isMajorEvent" label="isMajorEvent" />
        </el-table>
    </div>
</template>

<script>
import ElTableInfiniteScroll from "el-table-infinite-scroll";
let dataTemplate = [
    {
        "id": 1148,
        "ibpProjectName": "万纬上海海港冷链物流园",
        "eventCode": "GD202306210006",
        "statusName": "处理中",
        "followUserName": "王鹏",
        "businessClassifyName": "运输",
        "eventAttrListName": "客诉事件",
        "isMajorEvent": "否"
    },
    {
        "id": 1714,
        "ibpProjectName": "万纬沈阳空港物流园",
        "eventCode": "GD202310280002",
        "statusName": "等待处理中",
        "followUserName": "",
        "businessClassifyName": "运输",
        "eventAttrListName": "客诉事件",
        "isMajorEvent": "否"
    },
    {
        "id": 1689,
        "ibpProjectName": "万纬沈阳空港物流园",
        "eventCode": "GD202307310475",
        "statusName": "等待处理中",
        "followUserName": "廖亮",
        "businessClassifyName": "运输",
        "eventAttrListName": "客诉事件",
        "isMajorEvent": "否"
    },
    {
        "id": 1688,
        "ibpProjectName": "万纬沈阳空港物流园",
        "eventCode": "GD202307310474",
        "statusName": "等待处理中",
        "followUserName": "廖亮",
        "businessClassifyName": "运输",
        "eventAttrListName": "客诉事件",
        "isMajorEvent": "否"
    },
    {
        "id": 1687,
        "ibpProjectName": "万纬沈阳空港物流园",
        "eventCode": "GD202307310473",
        "statusName": "等待处理中",
        "followUserName": "廖亮",
        "businessClassifyName": "运输",
        "eventAttrListName": "客诉事件",
        "isMajorEvent": "否"
    },
    {
        "id": 1686,
        "ibpProjectName": "万纬沈阳空港物流园",
        "eventCode": "GD202307310472",
        "statusName": "等待处理中",
        "followUserName": "廖亮",
        "businessClassifyName": "运输",
        "eventAttrListName": "客诉事件",
        "isMajorEvent": "否"
    },
    {
        "id": 1685,
        "ibpProjectName": "万纬沈阳空港物流园",
        "eventCode": "GD202307310471",
        "statusName": "等待处理中",
        "followUserName": "廖亮",
        "businessClassifyName": "运输",
        "eventAttrListName": "客诉事件",
        "isMajorEvent": "否"
    },
    {
        "id": 1684,
        "ibpProjectName": "万纬沈阳空港物流园",
        "eventCode": "GD202307310470",
        "statusName": "等待处理中",
        "followUserName": "廖亮",
        "businessClassifyName": "运输",
        "eventAttrListName": "客诉事件",
        "isMajorEvent": "否"
    },
    {
        "id": 1683,
        "ibpProjectName": "万纬沈阳空港物流园",
        "eventCode": "GD202307310469",
        "statusName": "等待处理中",
        "followUserName": "廖亮",
        "businessClassifyName": "运输",
        "eventAttrListName": "客诉事件",
        "isMajorEvent": "否"
    },
    {
        "id": 1681,
        "ibpProjectName": "万纬沈阳空港物流园",
        "eventCode": "GD202307310467",
        "statusName": "等待处理中",
        "followUserName": "廖亮",
        "businessClassifyName": "运输",
        "eventAttrListName": "客诉事件",
        "isMajorEvent": "否"
    }
]
export default {
    name: "",
    directives: {
        "el-table-infinite-scroll": ElTableInfiniteScroll,
    },
    data() {
        return {
            data: [],
            page: 0,
            total: 5,
            disabled: false,
            pager: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            },
            visiableData: []
        }
    },
    methods: {
        load() {
            console.log('load');
            if (this.disabled) return;
            this.page++;
            if (this.page <= this.total) {
                this.data = this.data.concat(dataTemplate);
            }

            if (this.page === this.total) {
                this.disabled = true;
            }
        },
        loadMore() {
            this.pager.pageNum++
            // slice切分数据
            this.visiableData = this.data.slice(0, this.pager.pageNum * this.pager.pageSize)
        },
    },
    computed: {

    },
    watch: {

    },
    mounted() {

    },
    created() {

    },
    destroyed() {

    }
}
</script>

<style lang="scss" scoped></style>