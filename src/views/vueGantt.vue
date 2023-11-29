<template>
  <table>
    <caption>
      Vue.JS 制作甘特图
    </caption>
    <thead>
      <tr>
        <th rowspan="2" colspan="2">项目/时间</th>
        <!-- <th :colspan="days(day)" v-for="(day, index) in AllMonths" :key="index">
          {{ day | longDateToMonth }}
        </th> -->
      </tr>
      <tr>
        <th v-for="(day, index) in Dateinterval" :key="index">
          {{ day | longDateToDay }}
        </th>
        <!-- <th v-for="(day, index) in weekDate" :key="index">
          {{ day }}
        </th> -->
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in jsonData" :key="index">
        <td :rowspan="colNum(item, index)" v-if="showFormType(item, index)">
          <p>
            {{ item.formType }}
          </p>
        </td>
        <td>
          <p>{{ item.type }}</p>
        </td>
        <td
          v-for="day in Dateinterval"
          :key="day"
          :class="spanShow(item.value, day).color"
        >
          <!-- v-show 属性可以去掉，但此处加上是为了区分无 class 栏位和无数据栏位，方便后期追加默认样式显示 -->
          <!-- <span
            :class="spanShow(item.value, day).color"
            v-show="spanShow(item.value, day).show"
          ></span> -->
        </td>
      </tr>
    </tbody>
  </table>
</template>
  
  <script>
var sourceData = {
  startDate: "2018-12-01",
  endDate: "2018-12-15",
  data: [
    {
      formType: "初次接触",
      type: "计划",
      value: [
        {
          fromDate: "2018-12-01",
          toDate: "2018-12-05",
          spanClass: "green",
        },
        // {
        //   fromDate: "2018-12-10",
        //   toDate: "2018-12-11",
        //   spanClass: "green",
        // },
        // {
        //   fromDate: "2018-12-15",
        //   toDate: "2018-12-16",
        //   spanClass: "green",
        // },
      ],
    },
    {
      formType: "初次接触",
      type: "实际",
      value: [
        {
          fromDate: "2018-12-01",
          toDate: "2018-12-07",
          spanClass: "yellow",
        },
        {
          fromDate: "2018-12-10",
          toDate: "2018-12-11",
          spanClass: "yellow",
        },
        {
          fromDate: "2018-12-15",
          toDate: "2018-12-16",
          spanClass: "yellow",
        },
      ],
    },

    {
      formType: "实地看仓",
      type: "计划",
      value: [
        {
          fromDate: "2018-12-01",
          toDate: "2018-12-20",
          spanClass: "green",
        },
      ],
    },
    {
      formType: "实地看仓",
      type: "实际",
      value: [
        {
          fromDate: "2018-12-20",
          toDate: "2018-12-20",
          spanClass: "yellow",
        },
      ],
    },
    {
      formType: "明确意向",
      type: "计划",
      value: [
        {
          fromDate: "2018-12-19",
          toDate: "2019-01-10",
          spanClass: "green",
        },
      ],
    },
    {
      formType: "明确意向",
      type: "实际",
      value: [
        {
          fromDate: "2018-12-19",
          toDate: "2019-01-13",
          spanClass: "yellow",
        },
      ],
    },
  ],
};
import * as dayjs from "dayjs";
import * as isLeapYear from "dayjs/plugin/isLeapYear"; // 导入插件
import * as calendar from "dayjs/plugin/calendar"; // 导入插件
import "dayjs/locale/zh-cn"; // 导入本地化语言

dayjs.extend(isLeapYear); // 使用插件
dayjs.extend(calendar); // 使用插件
dayjs.locale("zh-cn"); // 使用本地化语言



import calendar1 from 'chinese-calendar'
calendar1.isHoliday('2020-10-08') // true
calendar1.getHolidayDetail('2020-10-07') // ['National Day', '国庆节', 3]
import { getAllMonth, getAllDay, fDate } from "@/utils/days.js";
export default {
  components: {},
  data() {
    return {
      jsonData: sourceData.data,
      startDate: sourceData.startDate,
      endDate: sourceData.endDate,
      /*获取指定时间段内所有月，用作表头一*/
      AllMonths: getAllMonth(sourceData.startDate, sourceData.endDate),
      /*获取指定时间段内所有天，用作表头二*/
      Dateinterval: getAllDay(sourceData.startDate, sourceData.endDate),
      // weekDate: generateWeeks(sourceData.startDate, sourceData.endDate),
    };
  },
  /*Vue 过滤器用于格式化日期*/
  filters: {
    /*字符串格式的日期转为时间戳*/
    strDateToTimeStamp: function (strDate) {
      return Date.parse(strDate);
    },
    /*字符串格式的日期转为天。yyyy-mm-dd  -->  dd*/
    longDateToDay: function (longDate) {
      return fDate(new Date(Date.parse(longDate)).getDate());
    },
    /*字符串格式的日期转为月。yyyy-mm-dd  -->  mm*/
    longDateToMonth: function (longDate) {
      return fDate(new Date(Date.parse(longDate)).getMonth() + 1);
    },
  },
  methods: {
    /**
     * 甘特图显示状况
     * 传入参数：
     *      1、甘特图所需数据数组。即上述 JSON 对象的 value 数组
     *      2、当前日期，即此刻对应表头中的日期列。
     *  */
    spanShow: function (valArray, currentDate) {
      // console.log(valArray, currentDate);
      /*默认不显示*/
      var show = false;
      /*默认样式颜色为空*/
      var color = "";
      /*调用 Vue 过滤器*/
      var filter = this.$options.filters["strDateToTimeStamp"];
      /*循环 value 数据。判断当前对应日期是否位于该组 value 数据的 fromdate 与 todate 之间。*/
      for (var i = 0; i < valArray.length; i++) {
        var inInterval = false;
        inInterval =
          filter(valArray[i].fromDate) <= filter(currentDate) &&
          filter(currentDate) <= filter(valArray[i].toDate);
        if (inInterval) {
          color = valArray[i].spanClass;
        }
        show = show || inInterval;
      }
      /*返回判断结果与当前日期在该组数据下对应的样式颜色*/
      return {
        show: show,
        color: color,
      };
    },
    /**
     * 计算指定时间段内指定月份的总天数。
     * 这里需要根据指定月的总天数确定合并表头一时跨列的数量
     * 传入参数：指定月份。格式 yyyy-mm
     * */
    days: function (strDate) {
      // debugger;
      var sArr = this.startDate.split("-");
      var eArr = this.endDate.split("-");
      var arr = strDate.split("-");
      //指定月份不在指定时间段内
      if (
        "" + arr[0] + arr[1] < "" + sArr[0] + sArr[1] ||
        "" + arr[0] + arr[1] > "" + eArr[0] + eArr[1]
      ) {
        return 0;
      }
      //指定月份等于开始时间段的月份时，返回本月剩余天数 = 本月最后一天 - 开始日期 + 1
      if ("" + arr[0] + arr[1] === "" + sArr[0] + sArr[1]) {
        return (
          new Date(arr[0], arr[1], 0).getDate() -
          new Date(sArr[0] + "-" + sArr[1] + "-" + sArr[2]).getDate() +
          1
        );
      }
      //指定月份等于结束时间段的月份时，返回时间段内本月有效天数 = 结束日期
      if ("" + arr[0] + arr[1] === "" + eArr[0] + eArr[1]) {
        return new Date(eArr[0] + "-" + eArr[1] + "-" + eArr[2]).getDate();
      }
      return new Date(arr[0], arr[1], 0).getDate(); //取当前月的最后一天，即本月天数
    },
    /**
     * 表单类型显示状态。
     * 即第一列。
     * */
    showFormType: function (item, index) {
      /*与下一组数据的类型相同时，不显示*/
      var show = true;
      if (index > 0 && item.formType == this.jsonData[index - 1].formType) {
        show = false;
      }
      return show;
    },
    /**
     * 表单类型需要跨行的数量。
     * 用于自动合并第一列的类型
     * */
    colNum: function (item, index) {
      var iCount = 0;
      if (!(index > 0 && item.formType == this.jsonData[index - 1].formType)) {
        this.jsonData.forEach((ele) => {
          if (item.formType == ele.formType) {
            iCount++;
          }
        });
      }
      return iCount;
    },
  },
  mounted() {
    console.log(dayjs().day(), "星期几");
    console.log(dayjs().year(), "年");
    console.log(dayjs().month() + 1, "月");
    console.log(dayjs().date(), "日");
    console.log(dayjs().hour(), "时");
    console.log(dayjs().minute(), "分");
    console.log(dayjs().second(), "秒");
    console.log(
      dayjs("2019-01-25")
        .add(1, "day")
        .subtract(1, "year")
        .year(2009)
        .toString(),
      "其他"
    );
    console.log(dayjs().add(7, "day"), "其他");
    console.log(dayjs("2019-01-25").format("DD/MM/YYYY"), "其他");

    let a = dayjs().calendar(dayjs("2008-01-01"));
    let b = dayjs().calendar(null, {
      sameDay: "[Today at] h:mm A", // The same day ( Today at 2:30 AM )
      nextDay: "[Tomorrow]", // The next day ( Tomorrow at 2:30 AM )
      nextWeek: "dddd", // The next week ( Sunday at 2:30 AM )
      lastDay: "[Yesterday]", // The day before ( Yesterday at 2:30 AM )
      lastWeek: "[Last] dddd", // Last week ( Last Monday at 2:30 AM )
      sameElse: "DD/MM/YYYY", // Everything else ( 7/10/2011 )
    });

    console.log(a);
    console.log(b);
  },
};
</script>
<style lang="scss" scoped>
table {
  border-collapse: collapse;
  border-width: 1;
}

p {
  width: 100px;
}

th,
td {
  min-width: 20px;
  text-align: center;
  border-width: 1px;
  border-style: solid;
  border-color: #666;
}

th {
  background-color: #34b4a0;
}

span {
  border-radius: 50%;
  height: 10px;
  width: 10px;
  display: block;
  display: inline-block;
}

.yellow {
  background-color: #f9a100;
  border: #fcaa00 1px solid;
}

.green {
  background-color: #34b4a0;
  border: #46d8bc 1px solid;
}

.red {
  background-color: #ff0d0d;
  border: #ff2e2e 1px solid;
}

.purple {
  background-color: #8b64ff;
  border: #8b64ff 1px solid;
}

.blue {
  background-color: #299ced;
  border: #299ced 1px solid;
}
</style>
  