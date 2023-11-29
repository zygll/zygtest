import colMixins from "@/mixins/colMixins"
// import { formatTime } from "@/utils"
export default {
    namespaced: true,
    state: {
        columnsData: [
            // {
            //   label: "编号",
            //   prop: "cardCode",
            //   type: "input",
            //   detailLink: true,
            //   show: true,
            //   isRequired: true
            // },
            {
                label: "名称",
                prop: "name",
                type: "input",
                detailLink: true,
                width: 40,
                show: false,
            },

            {
                label: "时间",
                prop: "date",
                type: "input",
                width: 150,
                show: true
            },
            {
                label: "地址",
                prop: "address",
                type: "input",
                width: 150,
                show: true
            },
            //   {
            //     label: "业务类型",
            //     prop: "businessType",
            //     type: "select",
            //     optionName: "CRM_BUSINESS_TYPE",
            //     optionCache: true,
            //     options: [],
            //     width: 90,
            //     show: true
            //   },

        ],
        columns: []
    },
    ...colMixins
}
