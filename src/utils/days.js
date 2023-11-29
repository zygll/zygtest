/**
   * 日期格式化。
   * 小于 10 的数字在前面 + 0。如 01、06
   * */
export const fDate = function (value) {
    return value < 10 ? '0' + value : value;
}
/**
 * 日期格式化：yyyy-mm-dd
 * */
Date.prototype.format = function () {
    return this.getFullYear() + '-' + fDate(this.getMonth() + 1) + '-' + fDate(this.getDate());
};


// 判断起始日期和结束日期是否大于7周
const isMoreThan7Weeks = function (startDate, endDate) {
    var dateS = new Date(startDate)
    var dateE = new Date(endDate)
    var weeks = (dateE - dateS) / (7 * 24 * 60 * 60 * 1000)
    return weeks >= 7
}
// // 起始日期和结束日期多少周
// const getWeeksCount = function (startDate, endDate) {
//     var dateS = new Date(startDate)
//     var dateE = new Date(endDate)
//     console.log((dateE - dateS) / (7 * 24 * 60 * 60 * 1000));
//     var weeks = Math.ceil((dateE - dateS) / (7 * 24 * 60 * 60 * 1000))
//     return weeks
// }
// console.log(getWeeksCount('2020-01-01', '2020-02-01'));
/**
 * 
 * @param {Date} startDate 
 * @param {Date} endDate 
 * @param {Number} numberOfWeeks 
 * @returns  格式：mm.dd - mm.dd 
 */

// 正确的
export const generateWeeks = function (startDate, endDate) {
    let start = new Date(startDate);
    let end = new Date(endDate);
    let weeks = [];

    if (isMoreThan7Weeks(startDate, endDate)) {
        while (start <= end) {
            let weekEnd = new Date(start);
            weekEnd.setDate(weekEnd.getDate() + 6);
            if (weekEnd > end) {
                weekEnd = end;
            }
            weeks.push(formatDate(start) + ' - ' + formatDate(weekEnd));
            start.setDate(start.getDate() + 7);
        }
    } else {
        console.log('不足7周');
        for (var i = 0; i < 7; i++) {
            var weekStart = new Date(start);
            var weekEnd = new Date(start);
            weekEnd.setDate(weekEnd.getDate() + 6);
            weeks.push(formatDate(weekStart) + ' - ' + formatDate(weekEnd));
            start.setDate(start.getDate() + 7);
        }
    }
    return weeks;
}

function formatDate(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    // 为月和日前面补零
    if (month < 10) { month = "0" + month; }
    if (day < 10) { day = "0" + day; }

    return year + '.' + month + '.' + day;
}
/**
 * 获取指定时间段内所有天。
 * 输入起止日期。格式：yyyy-mm-dd。
 * 返回格式：yyyy-mm-dd
 * */
export const getAllDay = function (startDate, endDate) {
    var allDays = [];
    var a = startDate.split('-');
    var b = endDate.split('-');
    var uDb = new Date().setUTCFullYear(a[0], a[1] - 1, a[2]); //start
    var uDe = new Date().setUTCFullYear(b[0], b[1] - 1, b[2]); //end
    for (var i = uDb; i <= uDe; i = i + 24 * 60 * 60 * 1000) {
        allDays.push(new Date(parseInt(i)).format());
    }
    return allDays;
};
/**
 * 获取指定时间段内所有月。
 * 输入起止日期。格式：yyyy-mm-dd。
 * 返回格式：yyyy-mm
 * */
export const getAllMonth = function (startDate, endDate) {
    var allMonth = [];
    var a = startDate.split('-');
    var b = endDate.split('-');
    var uDb = new Date().setUTCFullYear(a[0], a[1] - 1, a[2]); //start
    var uDe = new Date().setUTCFullYear(b[0], b[1] - 1, new Date(b[0], b[1], 0).getDate()); //结束月份设置为指定月最后一天
    while (uDb <= uDe) { // 等于号防止 31 号计算遗漏
        allMonth.push(new Date(uDb).getFullYear() + '-' + fDate(new Date(uDb).getMonth() + 1));
        uDb = new Date(uDb).setMonth(new Date(uDb).getMonth() + 1);
    }
    return allMonth;
};


// console.log(generateWeeks('2023-07-01', '2023-07-25'));




// let date = [
//     "2023.05.26 - 2023.06.01",
//     "2023.06.02 - 2023.06.08",
//     "2023.06.09 - 2023.06.15",
//     "2023.06.16 - 2023.06.22",
//     "2023.06.23 - 2023.06.29",
//     "2023.06.30 - 2023.07.06",
//     "2023.07.07 - 2023.07.13",
//     "2023.07.14 - 2023.07.20",
//     "2023.07.21 - 2023.07.27",
//     "2023.07.28 - 2023.08.03",
//     "2023.08.04 - 2023.08.10",
//     "2023.08.11 - 2023.08.17",
//     "2023.08.18 - 2023.08.18"
// ]
// let data = [
//     {
//         status: "510",
//         type: "2",
//         visitTime: 1689782400000,
//         actionType: null
//     },
//     {
//         status: "510",
//         type: "2",
//         visitTime: 1685894400000,
//         actionType: null
//     },
//     {
//         status: "510",
//         type: "2",
//         visitTime: 1685030400000,
//         actionType: null
//     }
// ]

// let result = date.map(d => {
//     let dateRange = d.split(' - ').map(d => Date.parse(d.replace(/\./g, '/')));
//     console.log(dateRange, 'dateRange');
//     let dataWithinRange = data.filter(({ visitTime }) => visitTime >= dateRange[0] && visitTime <= dateRange[1]);

//     return {
//         dateRange: d,
//         data: dataWithinRange
//     };
// });

// console.log(result);









// const addDays = (date, days) => {
//     const copy = new Date(Number(date));
//     copy.setDate(date.getDate() + days);
//     return copy;
// };

// const formatDate = date =>
//     `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;

// const generateDateRanges = (start, end) => {
//     const dateRanges = [];
//     let current = new Date(start);
//     end = new Date(end);

//     while (current <= end) {
//         const nextDate = addDays(current, 6);

//         if (nextDate > end) {
//             dateRanges.push(`${formatDate(current)} - ${formatDate(end)}`);
//             break;
//         } else {
//             dateRanges.push(`${formatDate(current)} - ${formatDate(nextDate)}`);
//         }

//         current = addDays(current, 7);
//     }

//     return dateRanges;
// };

// const start = '2023-05-26';
// const end = '2023-08-18';
// console.log(generateDateRanges(new Date(start), new Date(end)));
