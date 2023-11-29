<template>
  <div>
    <el-select
      :value="value"
      popper-class="virtualselect"
      filterable
      :filter-method="filterMethod"
      @visible-change="visibleChange"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <vue-virtual-list
        ref="virtualList"
        class="virtualselect-list"
        :data-key="fields.value"
        :data-sources="dataSources"
        :data-component="itemComponent"
        :keeps="20"
        :extra-props="{
          label: fields.label,
          value: fields.value,
          rightLabel: fields.rightLabel,
        }"
      ></vue-virtual-list>
    </el-select>
  </div>
</template>
  
  <script>
import VueVirtualList from "vue-virtual-scroll-list";
import itemComponent from "./itemComponent.vue";

export default {
  name: "select-v2",
  components: {
    "vue-virtual-list": VueVirtualList,
  },
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    // 下例列表数据
    data: {
      type: Array,
      default: () => [],
    },
    // 字段参数配置，默认为label，value
    // 可尝试传入rightLabel字段，使其在右边也展示内容
    fields: {
      type: Object,
      default() {
        return {
          label: "label",
          value: "value",
        };
      },
    },
    // 绑定的默认值
    value: {
      type: [String, Array],
      default: () => [],
    },
  },
  mounted() {
    this.init();
  },
  watch: {
    data() {
      this.init();
    },
  },
  data() {
    return {
      // 内容组件
      itemComponent,
      // 下拉列表中的数据
      dataSources: [],
      // 用来定位滚动到某个位置
      start: 0,
    };
  },
  methods: {
    init() {
      if (!this.value || this.value.length === 0) {
        // 初始化数据
        this.dataSources = this.data;
      } else {
        // 回显问题
        // 单选时，存储当前的index
        // 多选时，取选中的所有值中下标的最小值
        this.dataSources = JSON.parse(JSON.stringify(this.data));
        if (typeof this.value === "string") {
          const value = this.value;
          for (let i = 0; i < this.dataSources.length; i++) {
            const element = this.dataSources[i];
            if (element[this.fields.value] === value) {
              this.start = i;
              break;
            }
          }
        } else if (Array.isArray(this.value)) {
          let start = [];
          const valueSet = new Set(this.value);
          for (let i = 0; i < this.dataSources.length; i++) {
            const element = this.dataSources[i];
            if (valueSet.has(element[this.fields.value])) {
              start.push(i);
            }
          }
          this.start = Math.min(...start);
        }
      }
    },
    // 搜索
    filterMethod(query) {
      if (query !== "") {
        setTimeout(() => {
          this.$refs.virtualList.scrollToIndex(0);
          this.dataSources = [
            ...this.data.filter((item) => {
              return this.fields.rightLabel
                ? item[this.fields.label].indexOf(query) > -1 ||
                    item[this.fields.rightLabel].indexOf(query) > -1
                : item[this.fields.label].indexOf(query) > -1;
            }),
          ];
        }, 100);
      } else {
        this.init();
      }
    },
    visibleChange(bool) {
        console.log('visibleChange', bool);
      if (!bool) {
        this.$refs.virtualList.reset();
        this.init();
      } else {
        // 定位到选中的位置
        this.$nextTick(() => {
          this.$refs.virtualList.scrollToIndex(this.start);
        });
      }
    },
  },
};
</script>
  <style lang="scss" scoped>
.virtualselect {
  // 设置最大高度
  &-list {
    max-height: 245px;
    overflow-y: auto;
  }

  .el-scrollbar .el-scrollbar__bar.is-vertical {
    width: 0 !important;
  }
}
</style>
  