<template>
  <div>
    {{ checkItemOptions }}
    <el-radio-group v-model="radio" size="small">
      <el-radio v-for="d in options" :key="d.key" :label="d.key" border>{{
        d.value
      }}</el-radio>
    </el-radio-group>
    <div
      style="overflow: hidden"
      v-for="(item, index) in checkItemOptions"
      :key="index"
    >
      <div v-show="radio == item.type">
        <el-form
          :model="item"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
        >
          <!-- 表格 -->
          <el-table
            ref="myTable"
            :data="item.tableData"
            style="width: 100%"
            height="300px"
            @row-click="handleRowClick"
          >
            <!-- 表格列 -->
            <el-table-column label="序号" width="180">
              <template slot-scope="scope">
                <span>{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="日期" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column label="自定义文本" width="200">
              <template slot-scope="scope">
                <el-form-item
                  prop="customText"
                  :rules="[
                    {
                      validator: (...arg) => {
                        validatepictures(
                          ...arg,
                          scope.row,
                          scope.$index,
                          scope.row.customText
                        );
                      },
                    },
                  ]"
                  style="width: 100%"
                >
                  <el-input v-model="scope.row.customText"></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <!-- 其他列 -->
          </el-table>
        </el-form>
      </div>
    </div>
    <!-- 滚动到特定行的按钮 -->
    <el-button @click="scrollTo(10, 0)">窗口1滚动到第10行</el-button>
    <el-button @click="scrollTo(3, 1)">窗口2滚动到第6行</el-button>
    <el-button @click="scrollTo(5, 2)">窗口3滚动到第5行</el-button>
    <!-- <el-button @click="scrollToRow1(10, 0)">2滚动到第10行</el-button> -->
    <el-dialog
      :visible.sync="errMsgDialog"
      title="提示"
      width="300px"
      top="30vh"
    >
      <span ref="spanRef"></span>
      <span slot="footer">
        <el-button type="primary" @click="errMsgDialog = false">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      errMsgDialog: false,
      errMsg: "",
      radio: "1",
      rules: {
        customText: [
          {
            required: true,
            message: "请输入自定义文本",
            trigger: "blur",
          },
        ],
      },
      checkItemOptions: [
        {
          key: "1",
          value: "窗口1",
          type: "1",
          tableData: [
            {
              date: "2016-05-03",
              name: "Tom1",
              customText: "自定义文本1",
              // 其他数据
            },
            {
              date: "2016-05-02",
              name: "Tom2",
              customText: "自定义文本2",
              // 其他数据
            },
            {
              date: "2016-05-04",
              name: "Tom3",
              customText: "自定义文本3",
              // 其他数据
            },
            {
              date: "2016-05-01",
              name: "Tom4",
              customText: "自定义文本4",
              // 其他数据
            },
            {
              date: "2016-05-08",
              name: "Tom5",
              customText: "自定义文本5",
              // 其他数据
            },
            {
              date: "2016-05-06",
              name: "Tom6",
              customText: "自定义文本6",
              // 其他数据
            },
            {
              date: "2016-05-07",
              name: "Tom7",
              customText: "自定义文本7",
              // 其他数据
            },
            {
              date: "2016-05-05",
              name: "Tom8",
              customText: "自定义文本8",
              // 其他数据
            },
            {
              date: "2016-05-09",
              name: "Tom9",
              customText: "自定义文本9",
              // 其他数据
            },
            {
              date: "2016-05-10",
              name: "Tom10",
              customText: "自定义文本10",
              // 其他数据
            },
            {
              date: "2016-05-11",
              name: "Tom11",
              customText: "自定义文本11",
              // 其他数据
            },
            {
              date: "2016-05-12",
              name: "Tom12",
              customText: "自定义文本12",
              // 其他数据
            },
            {
              date: "2016-05-13",
              name: "Tom13",
              customText: "自定义文本13",
              // 其他数据
            },
            {
              date: "2016-05-14",
              name: "Tom14",
              customText: "自定义文本14",
              // 其他数据
            },
            {
              date: "2016-05-15",
              name: "Tom15",
              customText: "自定义文本15",
              // 其他数据
            },
            {
              date: "2016-05-16",
              name: "Tom16",
              customText: "自定义文本16",
              // 其他数据
            },
            {
              date: "2016-05-17",
              name: "Tom17",
              customText: "自定义文本17",
              // 其他数据
            },
          ],
        },
        {
          key: "2",
          value: "窗口2",
          type: "2",
          tableData: [
            //生成10条数据name为Cat1到Cat10
            ...Array(10)
              .fill(0)
              .map((item, index) => {
                return {
                  date: "2016-05-03",
                  name: "Cat" + (index + 1),
                  customText: "自定义文本" + (index + 1),
                  // 其他数据
                };
              }),
          ],
        },
        {
          key: "3",
          value: "窗口3",
          type: "3",
          tableData: [
            //生成10条数据name为phone1到phone10,随机时间
            ...Array(10)
              .fill(0)
              .map((item, index) => {
                return {
                  date: "2016-05-03",
                  name: "phone" + (index + 1),
                  customText: "自定义文本" + (index + 1),
                  // 其他数据
                };
              }),
          ],
        },
      ],
      options: [
        {
          key: "1",
          value: "窗口1",
        },
        {
          key: "2",
          value: "窗口2",
        },
        {
          key: "3",
          value: "窗口3",
        },
      ],
      tableData: [
        {
          date: "2016-05-03",
          name: "Tom1",
          // 其他数据
        },
        {
          date: "2016-05-02",
          name: "Tom2",
          // 其他数据
        },
        {
          date: "2016-05-04",
          name: "Tom3",
          // 其他数据
        },
        {
          date: "2016-05-01",
          name: "Tom4",
          // 其他数据
        },
        {
          date: "2016-05-08",
          name: "Tom5",
          // 其他数据
        },
        {
          date: "2016-05-06",
          name: "Tom6",
          // 其他数据
        },
        {
          date: "2016-05-07",
          name: "Tom7",
          // 其他数据
        },
        {
          date: "2016-05-05",
          name: "Tom8",
          // 其他数据
        },
        {
          date: "2016-05-09",
          name: "Tom9",
          // 其他数据
        },
        {
          date: "2016-05-10",
          name: "Tom10",
          // 其他数据
        },
        {
          date: "2016-05-11",
          name: "Tom11",
          // 其他数据
        },
        {
          date: "2016-05-12",
          name: "Tom12",
          // 其他数据
        },
        {
          date: "2016-05-13",
          name: "Tom13",
          // 其他数据
        },
        {
          date: "2016-05-14",
          name: "Tom14",
          // 其他数据
        },
        {
          date: "2016-05-15",
          name: "Tom15",
          // 其他数据
        },
        {
          date: "2016-05-16",
          name: "Tom16",
          // 其他数据
        },
        {
          date: "2016-05-17",
          name: "Tom17",
          // 其他数据
        },
        {
          date: "2016-05-18",
          name: "Tom18",
          // 其他数据
        },
      ],
    };
  },
  mounted() {
    // 监听goto事件
  },
  methods: {
    validatepictures() {
      console.log(arguments, "arguments");
      console.log(arguments[5], "ROW");
      console.log(arguments[6], "index");
      console.log(arguments[7], "value");
      const callback = arguments[2];
      const row = arguments[5];
      const index = arguments[6];
      const value = arguments[7];

      if (!value) {
        let str = "";
        this.checkItemOptions.forEach((item) => {
          item.tableData &&
            item.tableData.forEach((d, i) => {
              d.index = i + 1;
            });
        });
        let newArr = this.flatten(this.checkItemOptions, "tableData");
        console.log(newArr, "newArr");
        for (let index = 0; index < newArr.length; index++) {
          const item = newArr[index];
          if (!item.customText) {
            console.log(item, "item2222");
            str += `检查项：<b style="color:red">【${
              this.options.find((v) => v.key == item.index).value
            }】</b><b style="color:red">第${
              item.index
            }条</b>内容未补充完整<br/>,<span onClick="goto()">前去补充</span> <br/>`;
          }
        }
        console.log(str, "str");
        this.errMsgDialog = true;
        // spanRef.innerHTML = str;
        this.$refs.spanRef.innerHTML = str;

        this.errMsg = str;
        callback(new Error("请输入自定义文本"));
      } else {
        callback();
      }
      //   if (value === "") {
      //     callback(new Error("请输入自定义文本"));
      //   } else {
      //     callback();
      //   }
    },
    goto() {
      console.log(1111);
    },
    flatten(arr, key) {
      // 数组扁平
      return arr.reduce((prev, cur) => {
        return prev.concat(
          Array.isArray(cur[key]) ? this.flatten(cur[key]) : cur
        );
      }, []);
    },
    handleRowClick(row, column, event) {
      // 处理行点击事件
    },
    scrollTo(rowIndex, tableIndex) {
      this.radio = String(tableIndex + 1);
      this.scrollToRow(rowIndex, tableIndex);
    },
    scrollToRow(rowIndex, tableIndex) {
      this.$nextTick(() => {
        const table = this.$refs.myTable[tableIndex]; // 获取表格DOM引用
        const rows = table.$el.querySelectorAll(
          ".el-table__body-wrapper > table > tbody > tr"
        );
        console.log(rows.length, rowIndex);
        if (rows.length > rowIndex) {
          const targetRow = rows[rowIndex - 1];
          const container = table.$el.querySelector(".el-table__body-wrapper");
          console.log(targetRow.offsetTop, "targetRow.offsetTop");
          const targetTop = targetRow.offsetTop; // 要滚动到的目标位置
          console.log(targetTop, "targetTop");
          const startTop = container.scrollTop; // 当前滚动位置
          console.log(startTop, "startTop");
          const distance = targetTop - startTop; // 总距离
          console.log(distance, "distance");
          let startTime = null;
          //如果滚动在当前位置了，就不用滚动了
          if (distance === 0) return;

          function animateScroll(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const fraction = Math.min(elapsed / 500, 1); // 持续时间为300毫秒
            container.scrollTop = startTop + distance * fraction; // 当前应该在的位置
            console.log(container.scrollTop);

            if (fraction < 1) {
              requestAnimationFrame(animateScroll); // 继续动画
            }
          }

          requestAnimationFrame(animateScroll); // 开始动画
        }
      });
    },
    scrollToRow1(rowIndex, tableIndex) {
      this.$nextTick(() => {
        const table = this.$refs.myTable[tableIndex];
        console.log(table);
        const rows = table.$el.querySelectorAll(
          ".el-table__body-wrapper > table > tbody > tr"
        );
        if (rows.length > rowIndex) {
          const targetRow = rows[rowIndex - 1];
          console.log(targetRow, "targetRow");
          const container = table.$el.querySelector(".el-table__body-wrapper");
          const targetTop = targetRow.offsetTop;
          console.log(targetTop, "targetTop");
          // 开始平滑滚动
          const startTop = container.scrollTop;
          console.log(startTop, "startTop");
          const change = targetTop - startTop;
          const duration = 500; // 滚动动画时长，单位为毫秒
          let startTime = null;

          function smoothScroll(currentTime) {
            if (startTime === null) {
              startTime = currentTime;
            }
            const timeElapsed = currentTime - startTime;
            const nextStep = easeInOutQuad(
              timeElapsed,
              startTop,
              change,
              duration
            );
            console.log(nextStep);
            container.scrollTop = nextStep;
            if (timeElapsed < duration) {
              requestAnimationFrame(smoothScroll);
            }
          }

          function easeInOutQuad(t, b, c, d) {
            // t: current time  , b: begInnIng value, c: change In value, d: duration
            t /= d / 2; //
            if (t < 1) return (c / 2) * t * t + b;
            t--;
            return (-c / 2) * (t * (t - 2) - 1) + b;
          }

          requestAnimationFrame(smoothScroll);
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
/* // .slide-fade-leave-active {
//   transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
// } */
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
::v-deep .el-form-item__content {
  margin-left: 0 !important;
}
</style>
