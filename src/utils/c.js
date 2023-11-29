// 时间处理工具类
const DateUtil = {
  formatDate: function(date, format) {
    // format 为时间格式，如 'yyyy-MM-dd hh:mm:ss'
    let o = {
      "M+": date.getMonth() + 1,
      "d+": date.getDate(),
      "h+": date.getHours(),
      "m+": date.getMinutes(),
      "s+": date.getSeconds(),
      "q+": Math.floor((date.getMonth() + 3) / 3),
      "S": date.getMilliseconds()
    };
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }
    return format;
  },
  timeDifference: function(date1, date2) {
    let time1 = date1.getTime();
    let time2 = date2.getTime();
    let diff = time2 - time1;
    let minute = 1000 * 60;
    let hour = minute * 60;
    let day = hour * 24;
    let result = {};
    result.days = Math.floor(diff / day);
    result.hours = Math.floor((diff % day) / hour);
    result.minutes = Math.floor((diff % hour) / minute);
    result.seconds = Math.floor((diff % minute) / 1000);
    return result;
  },
  getCurrentTime: function(format) {
    let date = new Date();
    return this.formatDate(date, format);
  }
};
// 字符串处理工具类
const StringUtil = {
    splitString: function(str, separator) {
      return str.split(separator);
    },
    joinStrings: function(arr, separator) {
      return arr.join(separator);
    },
    replaceString: function(str, oldStr, newStr) {
      return str.replace(oldStr, newStr);
    },
    upperCase: function(str) {
      return str.toUpperCase();
    },
    lowerCase: function(str) {
      return str.toLowerCase();
    }
  };
//   数组处理工具类
const ArrayUtil = {
    unique: function(arr) {
      return Array.from(new Set(arr));
    },
    sort: function(arr) {
      return arr.sort((a, b) => a - b);
    },
    filter: function(arr, callback) {
      return arr.filter(callback);
    },
    merge: function(arr1, arr2) {
      return arr1.concat(arr2);
    }
  };
//   对象处理工具类
const ObjectUtil = {
    merge: function(obj1, obj2) {
      return Object.assign({}, obj1, obj2);
    },
    clone: function(obj) {
      return JSON.parse(JSON.stringify(obj));
    },
    isEmpty: function(obj) {
      return Object.keys(obj).length === 0;
    }
  };
//   数字处理工具类
const NumberUtil = {
    format: function(num, decimals) {
      let reg = /(\d{1,3})(?=(\d{3})+(?:\.\d+)?$)/g;
      return (+num).toFixed(decimals).replace(reg, "$1,");
    },
    round: function(num, decimals) {
      return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
    },
    toChinese: function(num) {
      let chnNumChar = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
      let chnUnitChar = ["", "拾", "佰", "仟"];
      let chnUnitSection = ["", "万", "亿", "万亿", "亿亿"];
      let numStr = num.toString();
      let index = numStr.indexOf(".");
      if (index != -1) {
        let intPart = numStr.substring(0, index);
        let decimalPart = numStr.substring(index + 1, numStr.length);
        let decimalText = "";
        for (let i = 0; i < decimalPart.length; i++) {
          decimalText += chnNumChar[decimalPart[i]];
        }
        return this.toChinese(intPart) + "点" + decimalText;
      } else {
        let unitPos = 0;
        let zero = true;
        let chineseNum = "";
        for (let i = 0; i < numStr.length; i++) {
          let n = numStr.charAt(i);
          if (n == "0") {
            if (numStr.length - i == 5) {
              chineseNum += chnUnitSection[unitPos];
            }
            zero = true;
          } else {
            if (zero) {
              chineseNum += chnNumChar[0];
            }
            zero = false;
            chineseNum += chnNumChar[parseInt(n)] + chnUnitChar[numStr.length - i - 1];
          }
          if (numStr.length - i == 9 || numStr.length - i == 5) {
            chineseNum += chnUnitSection[unitPos];
            zero = true;
          }
          unitPos++;
        }
        return chineseNum;
      }
    }
  };
//   文件处理工具类
const FileUtil = {
    uploadFile: function(file, url, callback) {
      let xhr = new XMLHttpRequest();
      xhr.open('POST', url);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          callback(xhr.responseText);
        }
      };
      xhr.send(file);
    },
    downloadFile: function(url) {
      let a = document.createElement('a');
      a.href = url;
      a.download = '';
      a.click();
    },
    readFile: function(file, callback) {
      let reader = new FileReader();
      reader.onload = function(e) {
        callback(e.target.result);
      };
      reader.readAsText(file);
    },
    writeFile: function(content, filename) {
      let blob = new Blob([content], {
        type: 'text/plain;charset=utf-8'
      });
      saveAs(blob, filename);
    }
  };
//   常用工具类
const CommonUtil = {
    encrypt: function(str) {
      // 加密算法
    },
    decrypt: function(str) {
      // 解密算法
    },
    isEmail: function(str) {
      let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
      return pattern.test(str);
    },
    isMobile: function(str) {
      let pattern = /[3|4|5|7|8]\d{9}$/;
      return pattern.test(str);
    },
    isUrl: function(str) {
      let pattern = /^((https?|ftp|file):\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w\.-]*)*\/?$/;
      return pattern.test(str);
    },
    isIE: function() {
      let userAgent = navigator.userAgent;
      let isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1;
      return isIE;
    }
  };