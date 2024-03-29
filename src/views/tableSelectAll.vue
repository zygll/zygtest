<template>
  <div class="mainBox">
    <h3>已选择：</h3>
    <el-tag
      :key="item[UID]"
      v-for="(item, index) in selectedList"
      closable
      @close="removeItemByIndex(index, item)"
    >
      {{ item.name }}
    </el-tag>

    <el-table
      v-loading="loading"
      ref="multipleTable"
      :data="tableData"
      @select="selectChange"
      @select-all="selectAllChange"
    >
      <el-table-column type="selection" width="55" align="center">
      </el-table-column>
      <el-table-column prop="ID" label="编号" align="center"> </el-table-column>
      <el-table-column prop="name" label="姓名" align="center">
      </el-table-column>
      <el-table-column prop="age" label="年龄" align="center">
      </el-table-column>
    </el-table>
    <el-row type="flex" class="pageBanner" justify="center">
      <el-pagination
        background
        :total="total"
        :page-size="pageSize"
        @size-change="pageSizeChange"
        @current-change="currentPageChange"
        :current-page="currentPage"
        :page-sizes="[1, 2, 3]"
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 唯一标识符
      UID: "ID",
      loading: false,
      total: 0,
      pageSize: 3,
      currentPage: 1,
      selectedList: [
        {
          ID: 1,
          name: "王小虎",
          age: 10,
        },
      ],
      tableData: [],
    };
  },

  mounted() {
    // 页面初始化时，首次加载数据
    this.getData(this.currentPage, this.pageSize);
  },

  methods: {
    // 单行前的勾选状态切换
    selectChange(selectedRows, row) {
      // true为选中, 0或false为取消选中
      let selected = selectedRows.length && selectedRows.indexOf(row) !== -1;
      if (selected) {
        this.addItem(row);
      } else {
        this.removeItem(row);
      }
    },
    // 全选/取消全选
    selectAllChange(selectedRows) {
      let selectedMarkList = this.selectedList.map((item) => item[this.UID]);
      // 当前页选中行的标记列表
      let pageSelectedMarkList = Array.isArray(selectedRows)
        ? selectedRows.map((item) => item[this.UID])
        : [];

      this.tableData.forEach((row) => {
        if (pageSelectedMarkList.includes(row[this.UID])) {
          if (!selectedMarkList.includes(row[this.UID])) {
            this.addItem(row);
          }
        } else if (selectedMarkList.includes(row[this.UID])) {
          this.removeItem(row);
        }
      });
    },
    // 切换每页显示条数
    pageSizeChange(newPageSize) {
      this.pageSize = newPageSize;
      this.getData(this.currentPage, this.pageSize);
    },
    // 切换页码--翻页
    currentPageChange(newPage) {
      this.currentPage = newPage;
      this.getData(this.currentPage, this.pageSize);
    },
    // 更新勾选标记
    updateMark() {
      let selectedMarkList = this.selectedList.map((item) => item[this.UID]);

      this.tableData.forEach((row) => {
        if (selectedMarkList.includes(row[this.UID])) {
          // toggleRowSelection 需在$nextTick中使用！
          this.$nextTick(() => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        }
      });
    },

    // 模拟访问接口获取数据
    getData(page, pageSize) {
      this.loading = true;
      setTimeout(() => {
        let data = [
          {
            ID: 1,
            name: "王小虎",
            age: 10,
          },
          {
            ID: 2,
            name: "张三",
            age: 20,
          },
          {
            ID: 3,
            name: "李四",
            age: 30,
          },
          {
            ID: 4,
            name: "何香",
            age: 18,
          },
          {
            ID: 5,
            name: "刘刀",
            age: 27,
          },
          {
            ID: 6,
            name: "关胜",
            age: 33,
          },
          {
            ID: 7,
            name: "齐巧",
            age: 55,
          },
          {
            ID: 8,
            name: "卢一方",
            age: 45,
          },
          {
            ID: 9,
            name: "王兴海",
            age: 66,
          },
          {
            ID: 10,
            name: "全德",
            age: 100,
          },
        ];

        this.total = data.length;
        let startIndex = pageSize * (page - 1);
        let endIndex = pageSize * page;
        this.tableData = data.slice(startIndex, endIndex);
        this.updateMark();
        this.loading = false;
      }, 1000);
    },
    // 新增选中项
    addItem(item) {
      this.selectedList.push(item);
    },
    // 移除选中项
    removeItem(item) {
      for (let [index, itemTemp] of this.selectedList.entries()) {
        if (itemTemp[this.UID] === item[this.UID]) {
          this.removeItemByIndex(index);
          break;
        }
      }
    },
    // 根据下标移除选中项
    removeItemByIndex(index, item) {
      this.selectedList.splice(index, 1);

      // 若有item,则是点击标签上的关闭按钮，移除选中项
      if (item) {
        this.$nextTick(() => {
          this.$refs.multipleTable.toggleRowSelection(
            // 此处必须在 tableData 中查找对应的数据，否则 toggleRowSelection 会失效
            this.tableData.find((row) => {
              return row[this.UID] === item[this.UID];
            }),
            false
          );
        });
      }
    },
  },
};
</script>
<style scoped>
.mainBox {
  margin: 30px;
}
.el-tag {
  margin: 10px;
}
.pageBanner {
  margin: 10px;
}
</style>
