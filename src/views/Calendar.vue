<template>
  <div class="calendar" :style="{background:'url('+require('@/assets/bg.svg')+') center no-repeat'}">
    <div class="calendar_content">
      <div class="curDate">{{ c }}</div>
      <div class="header">
        <span v-cloak>{{ date.year }}年{{ date.month }}月</span>
        <span class="pre_month" @click="onPreMonth"><svg t="1692946122449" class="icon" viewBox="0 0 1024 1024"
            version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1716" width="200" height="200">
            <path
              d="M937.165818 733.502813c8.93551-8.958022 7.868201-24.607444-2.312672-34.877345L531.191596 292.740274c-5.779633-5.846148-13.271258-8.581446-20.306488-8.314363-7.081279-0.331551-14.638395 2.423189-20.463054 8.270361L86.770737 698.625468c-10.225899 10.269901-11.248182 25.875321-2.322905 34.877345 8.946766 8.960069 24.451902 7.936763 34.666544-2.334161l391.68068-393.880789 391.691937 393.880789C912.712893 741.439576 928.228261 742.462882 937.165818 733.502813z"
              fill="#ffffff" p-id="1717"></path>
          </svg></span>
        <span class="next_month" @click="onNextMonth"><svg t="1692946122449" class="icon" viewBox="0 0 1024 1024"
            version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1716" width="200" height="200">
            <path
              d="M937.165818 733.502813c8.93551-8.958022 7.868201-24.607444-2.312672-34.877345L531.191596 292.740274c-5.779633-5.846148-13.271258-8.581446-20.306488-8.314363-7.081279-0.331551-14.638395 2.423189-20.463054 8.270361L86.770737 698.625468c-10.225899 10.269901-11.248182 25.875321-2.322905 34.877345 8.946766 8.960069 24.451902 7.936763 34.666544-2.334161l391.68068-393.880789 391.691937 393.880789C912.712893 741.439576 928.228261 742.462882 937.165818 733.502813z"
              fill="#ffffff" p-id="1717"></path>
          </svg></span>
      </div>
      <div class="days">
        <table v-cloak border="0" cellspacing="0" cellpadding="0">
          <tr class="label">
            <td>日</td>
            <td>一</td>
            <td>二</td>
            <td>三</td>
            <td>四</td>
            <td>五</td>
            <td>六</td>
          </tr>
          <tr class="row" v-for="week in weeks" :key="week[0].date">
            <td class="column" v-for="day in week" :key="day.date" v-bind:day="day.date" @click="onSelectDay(day)">
              <span v-bind:class="[
                {
                  checked: selectedDate == day.date,
                  currDate: currDate == day.date,
                  weekend: day.isWeekend,
                },
              ]" v-if="day.m == date.month"><i>{{ day.d }}</i><em>{{ day.dayCn }}</em></span>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>

import moment from "moment";
import { solar2lunar } from "solarlunar";
moment.locale("zh-cn");
export default {
  data() {
    return {

      date: {
        year: "",
        month: "",
        preMonth: "",
        nextMonth: "",
      },
      currDate: "", // 当前日期
      c: moment().format("LTS"),
      st: null,
      moment,
      weeks: [],
      selectedDate: "",
      isSelectDay: true,
    };
  },
  mounted() {
    this.st = setInterval(() => {
      this.c = this.moment().format("LTS");
    }, 1000);
    const currDate = new Date();
    this.weeks = this.initDate(this.moment(currDate).format("YYYY-MM"));
    this.currDate = this.moment(currDate).format("YYYY-MM-DD");
    console.log(JSON.parse(JSON.stringify(this.weeks)));
  },
  destroyed() {
    console.log("destroyed");
    clearInterval(this.st);
  },
  methods: {
    // 生成日历函数
    initDate(month) {
      var weeks = []; // template中用来渲染日历的数组
      var firstDay = this.moment(month, "YYYY-MM"); // 当月1号
      console.log("firstDay", firstDay);
      var week = firstDay.format("d"); // 当月1号是周几 (比如周五则week = 5)
      //判断当月需要渲染几行数据 例如： 2021-08-01是周日，那么就需要渲染6行数据，因为8月有31天，31-（7-0）=24，24/7=3.42，向上取整为4，所以需要渲染6行数据
      var weekNum = Math.ceil((firstDay.daysInMonth() - (7 - week)) / 7) + 1;
      console.log("weekNum", weekNum);
      console.log("week", week);
      var start = firstDay.subtract(week, "days"); // 日历上展示的第一个数(上个月的二十几号之类的，用于补齐日历)
      console.log("start", start);
      for (var i = 0; i < weekNum; i++) {
        // 通常日历为6行7排 42天，因此两个for循环
        var days = [];
        for (var j = 0; j < 7; j++) {
          var day = {};
          day.d = start.toObject().date + ""; // 当前号数 25
          day.date = start.format("YYYY-MM-DD"); // 返回值为2023-8-25
          day.m = start.format("MM"); // 当前号数对应的月份，比如日历上个月27号则day.month = 7;这个月1号day.month = 8
          day.y = start.format("YYYY"); // 当前号数对应的年
          day.dayCn = this.getDayCn(day.y, day.m, day.d);
          day.isWeekend =
            start.format("E") === "6" || start.format("E") === "7"
              ? true
              : false; // 是否是周末，用于UI区分周末和平时的颜色
          start.add(1, "days"); //每循环一次日期加一天
          days.push(day);
        }
        weeks.push(days);
      }
      this.date.year = this.moment(month).year();
      this.date.month = this.moment(month, "YYYY-MM")
        .add(0, "month")
        .format("MM");
      this.date.preMonth = this.moment(month, "YYYY-MM")
        .add(-1, "month")
        .format("YYYY-MM");
      this.date.nextMonth = this.moment(month, "YYYY-MM")
        .add(1, "month")
        .format("YYYY-MM");
      console.log("农历");
      return weeks;
    },
    // 上一个月
    onPreMonth() {
      const month = this.date.preMonth;
      this.weeks = this.initDate(this.moment(month).format("YYYY-MM"));
    },

    // 下一个月
    onNextMonth() {
      const month = this.date.nextMonth;
      this.weeks = this.initDate(this.moment(month).format("YYYY-MM"));
    },
    //获取农历
    // 参数：年 月 日
    getDayCn(year, month, date) {
      // 把calendar文件中的calendar对象挂在了window对象上，通过属性调用calendar// 这样不会更改源文件
      let getSolar2lunar = solar2lunar(year, month, date);
      let result = "";
      if (getSolar2lunar.isTerm) {
        //如果有节气的话，换成节气
        result = getSolar2lunar.term;
      } else {
        result = getSolar2lunar.dayCn; //都没有的话就是农历
      }
      return result;
    },
    //选择
    onSelectDay(day) {
      console.log("onSelectDay", day);
      if (!this.isSelectDay) return false;
      if (day.m === this.date.month) {
        this.selectedDate = day.date;
      }
      console.log(this.getDayCn(day.y, day.m, day.d));
    },
  },
};
</script>

<style lang="scss" scoped>
svg.icon {
  width: 20px;
  height: 20px;
}

.next_month {
  svg {
    transform: rotate(180deg);
  }
}

.calendar {
  // background: #000;
  // background: url('/src/assets/bg.svg');
  background-size: cover!important;
  .calendar_content {
    border-radius: 5px;
    padding: 10px;
    width: 300px;
    margin: 0 auto;
    background-color: #494949a0;
    backdrop-filter: blur(180px) saturate(1.5);
    filter: none;
    box-shadow: 3px 3px 20px 3px #22222230;
  }

  .curDate {
    font-size: 42px;
    color: #fff;
    font-weight: 100;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    font-size: 16px;
    font-weight: 100;
    color: #ffffff;

    span {
      cursor: pointer;
    }
  }

  .days {
    table {
      color: #fff;
      width: 100%;

      .label {
        td {
          text-align: center;
          font-size: 14px;
          color: #ffffff;
          font-weight: 100;
          padding: 10px;
        }
      }

      .column {

        // width: 100px;
        // height: 100px;
        // border: 1px solid #eee;
        span {
          text-align: center;
          cursor: pointer;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          border: 1px solid transparent;

          i {
            font-size: 16px;
            font-weight: 100;
            font-style: normal;
            display: block;
          }

          em {
            font-size: 12px;
            font-weight: 400;
            font-style: normal;
            display: block;
          }

          &.weekend {
            color: #f56c6c;
          }

          &.currDate {
            background-color: #409eff;
            color: #fff;
          }

          &.checked {
            border-color: #97b3d1;
            // color: #fff;
          }
        }
      }
    }
  }
}
</style>