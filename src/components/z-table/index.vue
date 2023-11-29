<template>
  <div class="vx-table-box">
    <el-table
      :id="(tableName ? tableName : $parent.$options.name) + 'Table'"
      ref="vxBaseTable"
      :key="dragDomRefresh"
      class="vx-table"
      :[key]="tableHeight"
      :data="tableData"
      border
      stripe
      style="width: 100%"
      :row-key="rowKeyFunc"
      :expand-row-keys="expandOpenList"
      :show-summary="showSummary"
      :summary-method="summaryMethod"
      @sort-change="sortChange"
      @selection-change="selectChange"
      @select="select"
      @row-dblclick="dbClick"
      @header-dragend="headerDragEnd"
    >
      <template slot="empty">
        <div v-if="tableData.length > 0" class="nodataTip">
          <p class="emTx">暂无数据</p>
        </div>
        <div v-else>
          <p class="emTx">加载中...</p>
        </div>
      </template>
      <el-table-column v-if="hasEq" label="序号" width="40" fixed>
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        v-if="hasSelect"
        type="selection"
        :class-name="
          radioFlag || noSelectAll
            ? 'noHeaderSelect el-table-column--selection'
            : 'el-table-column--selection'
        "
        :selectable="checkSelectable"
        width="40"
        fixed
      />

      <template v-for="(col, index) in columnsData">
        <el-table-column
          v-if="col.type == 'operation'"
          :key="index"
          :label="col.label"
          header-align="center"
          :fixed="col.fixed || 'left'"
          :width="col.width || 44"
        >
          <template slot-scope="scope">
            <component
              :is="col.component"
              :col-data="col"
              :row-data="scope.row"
              v-on="col.listenters"
            />
          </template>
        </el-table-column>

        <el-table-column
          v-else-if="col.show"
          :key="index"
          header-align="left"
          :align="col.align"
          :prop="col.prop"
          :label="col.label"
          :min-width="col.width || 150"
        >
          <template slot="header">
            <div class="table-header" :data-sort="index">
              <div
                class="table-header-label"
                :class="col.sortable ? 'hasSort' : ''"
                @click.stop="sortPropFunc(col.prop, null, col.sortable)"
              >
                {{ col.label }}
                <span
                  v-if="col.sortable"
                  class="caret-wrapper"
                  :class="sortClassFunc(col.prop)"
                >
                  <i class="sort-caret ascending" />
                  <i class="sort-caret descending" />
                </span>
              </div>
            </div>
          </template>
          <template slot-scope="scope">
            <span
              v-if="col.type === 'html'"
              :title="scope.row[col.prop]"
              v-html="scope.row[col.prop]"
            ></span>
            <span
              v-else-if="col.type != 'select' && col.type != 'component'"
              :title="scope.row[col.prop] | filterRow(scope.row, col)"
              :class="col.detailLink ? 'detailLink' : ''"
              @click="openDetail(scope.row, col.detailLink)"
              >{{ scope.row[col.prop] | filterRow(scope.row, col) }}</span
            >
            <component
              :is="col.component"
              v-else-if="col.type == 'component'"
              v-model="scope.row[col.prop]"
              :row="scope.row"
              :col="col"
              :name="col.prop"
              :prop="col.prop"
              @notifyUpdateList="$emit('updateList', true)"
            />
            <span v-else>{{
              scope.row[col.prop] | filterSelect(scope.row, col)
            }}</span>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
import Sortable from "sortablejs";

export default {
  name: "ZTable",
  components: {},
  filters: {
    filterRow(value, row, col) {
      if (typeof col.format === "function") {
        return col.format(value, row);
      } else {
        return value;
      }
    },
    filterSelect(value, row, col) {
      if (typeof col.format === "function") {
        return col.format(value, row);
      }
      let tempValue = "";
      for (const i in col.options) {
        if (value + "" == col.options[i].key) {
          tempValue = col.options[i].value;
        }
      }
      return tempValue;
    },
  },
  props: {
    showSummary: {
      // 是否显示合计
      type: Boolean,
      default: false,
    },
    summaryMethod: {
      type: Function,
      default() {
        return () => {};
      },
    },
    checkSelectable: {
      type: Function,
      default: () => {
        return true;
      },
    },
    // 表数据
    tableData: {
      type: Array,
      default() {
        return [];
      },
    },
    // 列数据
    columnsData: {
      type: Array,
      default() {
        return [];
      },
    },
    // 是否需要显示选择
    hasSelect: {
      type: Boolean,
      default: true,
    },
    // 是否需要序号
    hasEq: {
      type: Boolean,
      default: false,
    },
    // 是否不显示全选按钮
    noSelectAll: {
      type: Boolean,
      default: false,
    },
    // 是否需要展开
    hasExpand: {
      type: Boolean,
      default: false,
    },
    // 是否单选
    radioFlag: {
      type: Boolean,
      default: false,
    },
    paddingHeight: {
      type: [String, Number],
      default: 102,
    },
    tableName: {
      type: String,
      default: null,
    },
    rowId: {
      type: [String, Array],
      default: null,
      required: true,
    },
    expandOpenList: {
      type: Array,
      default() {
        return [];
      },
    },
    params: {
      type: Object,
    },
    mainElem: {
      type: String,
      default() {
        return "#cir-container";
      },
    },
    // 是否需要自动高度
    autoHeight: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      tableHeight: this.autoHeight ? 400 : "auto",
      checkedList: [],
      addressFackValue: [],
      searchValue: {},
      tableSearchInitVal: {},
      sortType: [],
      sortProp: [],
      hasOperation: false,
      selfDirections: [],
      selfFields: [],
      searchAliases: {},
      dragDomRefresh: 1,
      key: "height",
    };
  },
  watch: {
    "$store.state.screen.screenHeight"() {
      // 监听屏幕高度变化
      this.setTableHeight();
    },
    "$store.state.screen.statusTamp"() {
      // 监听屏幕高度变化
      this.setTableHeight();
    },
    columnsData() {
      let hasOperation = false;

      for (const item of this.columnsData) {
        if (item.type === "operation") {
          hasOperation = true;
        }
        item.align = "left";
        // 通过查询字段 绑定数据
        if (item.type == "select" || item.type == "input") {
          item.singleQuery = item.searchProp || item.prop;
        } else {
          item.singleQuery = item.prop;
        }
        // console.log("item===========", item)
        this.$set(
          this.searchValue,
          item.singleQuery,
          this.tableSearchInitVal[item.singleQuery] ||
            (item.multiple && item.type == "select" ? [] : null)
        );
      }
      this.hasOperation = hasOperation;
    },
  },
  mounted() {
    if (!this.autoHeight) {
      // 处理table不需要height设置
      this.key = "tableKey";
    }
    this.$nextTick(() => {
      this.setTableHeight();
      let tableName = this.tableName
        ? this.tableName
        : this.$parent.$options?.name;
      const wrapperTr = document.querySelector(
        "#" + tableName + "Table .el-table__header-wrapper tr"
      );
      console.log("wrapperTr", tableName, wrapperTr);
      if (wrapperTr) {
        this.columnDrop();
      }
    });
  },
  methods: {
    // 列拖拽
    columnDrop() {
      let tableName = this.tableName
        ? this.tableName
        : this.$parent.$options?.name;
      console.log("tableName", tableName);
      const wrapperTr = document.querySelector(
        "#" + tableName + "Table .el-table__header-wrapper tr"
      );
      console.log("wrapperTr111", wrapperTr);
      this.sortable = Sortable.create(wrapperTr, {
        animation: 180,
        delay: 0,
        onEnd: (evt) => {
          // 拷贝一份之前的搜索条件
          console.log(this.searchValue, "this.searchValue");
          let searchValueClone = this.lodash.cloneDeep(this.searchValue);
          // 调整table的偏移量
          evt.offset = 0;
          if (this.hasSelect) {
            evt.offset++;
          }
          if (this.hasOperation) {
            evt.offset++;
          }
          let itemEl = evt.item.firstChild.firstChild.dataset.sort;
          evt.sortFrom = itemEl;
          evt.tableName = tableName + "Sort";
          // 走表格的store修改列排序
          console.log("wrapperTr", wrapperTr);
          console.log(
            this.$parent.$options?.name,
            "this.$parent.$options?.name"
          );
          this.$store.dispatch(`${tableName}/changeColSort`, evt).then(() => {
            // 更新key值刷新dom
            this.dragDomRefresh++;
            // 更新搜索参数
            this.searchValue = searchValueClone;
            setTimeout(() => {
              // 清理绑定事件 重新给刷新后的dom绑定事件
              this.sortable.destroy();
              this.columnDrop();
            }, 200);
          });
        },
      });
    },
    goBackTop() {
      this.$refs.vxBaseTable.bodyWrapper.scrollTop = 0;
    },
    headerDragEnd(newWidth, oldWidth, column, event) {
      console.log(newWidth, column.property);
      console.log(newWidth, oldWidth, column, event);
    },
    // 写入默认查询条件（
    setSearch(initVal) {
      this.tableSearchInitVal = this.lodash.cloneDeep(initVal);
      for (const item in initVal) {
        this.$set(this.searchValue, item, initVal[item]);
      }
    },
    // 行双击事件 用于表格选择控件 普通表不绑定dbClick无影响
    dbClick(row) {
      this.$emit("dbClick", row);
    },
    sortClassFunc(prop) {
      if (this.sortProp.includes(prop)) {
        const index = this.sortProp.indexOf(prop);
        if (this.sortType[index] === "asc") {
          return "ascending";
        }
        if (this.sortType[index] === "desc") {
          return "descending";
        }
        return "";
      } else {
        return "";
      }
    },
    // 自定义表头排序方法
    sortPropFunc(prop, type, sortable) {
      if (!sortable) {
        return;
      }
      const index = this.sortProp.indexOf(prop);
      if (index > -1) {
        const type = this.sortType[index];
        if (type === "asc") {
          this.sortType[index] = "desc";
        } else if (type === "desc") {
          this.sortType.splice(index, 1);
          this.sortProp.splice(index, 1);
        } else {
          this.sortType[index] = "asc";
        }
      } else {
        this.sortType.push("asc");
        this.sortProp.push(prop);
      }
      this.doSearch();
    },
    updateParams() {
      const searchVals = {};
      for (const name in this.searchValue) {
        const searchVal = this.searchValue[name];
        if (
          !this.lodash.isEmpty(searchVal) &&
          !this.lodash.isArray(searchVal)
        ) {
          this.searchValue[name] = searchVal.trim();
          searchVals[name] = searchVal.trim();
        } else {
          searchVals[name] = searchVal;
        }
      }
      this.params.condition = this.lodash.extend(
        this.params.condition,
        searchVals
      );
      this.params.fields = this.sortProp;
      this.params.directions = this.sortType;
      this.params.pageNo = 1;
      // 同步更新上层params
      this.$emit("update:params", this.params);
    },
    // 处理查询字段 触发查询方法
    doSearch() {
      this.updateParams();
      this.$emit("search");
    },
    // 重置查询参数方法
    resetSearch() {
      for (const item of this.columnsData) {
        this.$set(
          this.searchValue,
          item.singleQuery,
          this.tableSearchInitVal[item.singleQuery] ||
            (item.multiple && item.type == "select" ? [] : null)
        );
      }
      this.$refs.addressSelect &&
        this.$refs.addressSelect.map((address) => {
          address.clearSelect();
        });
      this.$refs.dateSelect &&
        this.$refs.dateSelect.map((date) => {
          date.clearSelect();
        });
      this.sortProp = this.lodash.cloneDeep(this.selfFields);
      this.sortType = this.lodash.cloneDeep(this.selfDirections);
    },
    rowKeyFunc(row) {
      let tempRowKey = row[this.rowId] || null;
      if (Array.isArray(this.rowId)) {
        tempRowKey = this.rowId
          .reduce((acc, cur) => {
            acc.push(row[cur]);
            return acc;
          }, [])
          .join(",");
      }
      return tempRowKey;
    },
    openDetail(row, linkFlag) {
      if (linkFlag) {
        this.$emit("detailRow", row);
      }
    },
    checkRowById(list = [], selected = true) {
      const selectList = this.tableData.filter((row) => {
        return this.lodash.includes(list, row[this.rowId]);
      });
      selectList.map((item) => {
        this.$refs.vxBaseTable.toggleRowSelection(item, selected);
      });
    },
    select(selection, row) {
      this.$emit("select", selection, row);
    },
    selectChange(item) {
      if (this.radioFlag) {
        if (item.length > 1) {
          item.shift();
          this.$refs.vxBaseTable.clearSelection();
          this.$refs.vxBaseTable.toggleRowSelection(item[0]);
        }
      }
      this.checkedList = item;
      this.$emit("selection-change", this.checkedList);
    },
    setTableHeight() {
      // 获取自身容器的父节点高度，然后扣除一个固定高度值
      const elem = document.querySelector(
        "#" +
          (this.tableName ? this.tableName : this.$parent.$options?.name) +
          "Table"
      );
      // console.log(elem)
      if (elem) {
        const screenHeight =
          document.querySelector(this.mainElem) &&
          document.querySelector(this.mainElem).offsetHeight; // 可是区域高度
        let toolHeight = 0; // 可是区域高度
        if (
          document.querySelector("#cir-container .page-container>.VxToolHeader")
        ) {
          toolHeight = document.querySelector(
            "#cir-container .page-container>.VxToolHeader"
          ).offsetHeight;
        }
        console.log("toolHeight,", toolHeight);
        console.log("screenHeight,", screenHeight);
        this.tableHeight = (
          screenHeight -
          this.paddingHeight +
          42 -
          toolHeight
        ).toString();
      }
    },
    sortChange(val) {
      console.log("val", val);
      this.$emit("sortChange", val);
    },
    clearSelect() {
      this.$refs.vxBaseTable.clearSelection();
    },
    toggleAllSelection() {
      this.$refs.vxBaseTable.toggleAllSelection();
    },
  },
};
</script>

<style lang="scss" scoped>
.detailLink {
  text-decoration: underline;
  color: #3782d8;
  cursor: pointer;
  &:hover {
    color: #2779ff;
  }
}
</style>
<style lang="scss"  >
</style>
