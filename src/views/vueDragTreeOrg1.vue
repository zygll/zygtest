<template>
  <div>
    <el-button type="primary" @click="look">打印数据</el-button>
    <vueDragTreeOrg
      @node-drag-start="handleDragStart"
      @node-drag-enter="handleDragEnter"
      @node-drag-leave="handleDragLeave"
      @node-drag-over="handleDragOver"
      @node-drag-end="handleDragEnd"
      @node-drop="handleDrop"
      :allow-drop="allowDrop"
      :allow-drag="allowDrag"
      :data="data"
      draggable
      default-expand-all
      :props="defaultProps"
      node-key="id"
      accordion
    >
      <span slot="default" slot-scope="{ node, data }">
        <div
          class="org-tree-node-label"
        >
          <span class="org-tree-node-label-inner">
            {{ data.label }}
          </span>
        </div>
      </span>
      <!-- <span slot="node-icon" slot-scope="{ node }"></span> -->
      <!-- <span slot="node-icon" slot-scope="{ node }">
      <div
        v-if="node.expanded"
        style="
          border: 1px solid red;
          background: #fff;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        "
      >
        -
      </div>
      <div
        v-else
        style="
          border: 1px solid red;
          background: #fff;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        "
      >
        +
      </div>
    </span> -->
    </vueDragTreeOrg>
  </div>
</template>

<script>
import vueDragTreeOrg from "vue-drag-tree-org";
export default {
  name: "DragTree",
  components: {
    vueDragTreeOrg,
  },
  data() {
    return {
      direction: "Horizontal",
      isExpand: false,
      data: [
        {
          id: 0,
          label: "XXX科技有限公司",
          children: [
            {
              id: 2,
              label: "产品研发部",
              children: [
                {
                  id: 5,
                  label: "研发-前端",
                },
                {
                  id: 6,
                  label: "研发-后端",
                },
                {
                  id: 9,
                  label: "UI设计",
                },
                {
                  id: 10,
                  label: "产品经理",
                },
              ],
            },
            {
              id: 3,
              label: "销售部",
              children: [
                {
                  id: 7,
                  label: "销售一部",
                },
                {
                  id: 8,
                  label: "销售二部",
                },
              ],
            },
            {
              id: 4,
              label: "财务部",
            },
            {
              id: 9,
              label: "HR人事",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  mounted() {
    console.log(this.data);
  },
  methods: {
    look() {
      console.log(this.data);
    },
    renderContent(h, { data }) {
      console.log(data, "renderContent");
      return (
        <el-dropdown
          trigger="click"
          oncommand={(command) => this.handleAddDel(command)}
        >
          <a>{data.label}</a>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="addTreeSel">添加部门</el-dropdown-item>
            <el-dropdown-item command="editTreeSel">修改部门</el-dropdown-item>
            <el-dropdown-item command="delTreeSel">删除部门</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      );
    },
    handleDragStart(node, ev) {
      console.log("drag start", node, ev);
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      console.log("handleDragEnter: ", draggingNode, dropNode.label, ev);
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      console.log("handleDragLeave: ", draggingNode, dropNode.label, ev);
    },
    handleDragOver(draggingNode, dropNode, ev) {
      console.log("tree drag over: ", draggingNode, dropNode.label, ev);
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log(
        "handleDragEnd: ",
        draggingNode,
        dropNode && dropNode.label,
        dropType,
        ev
      );
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log("handleDrop: ", draggingNode, dropNode.label, dropType, ev);
    },
    allowDrop(draggingNode, dropNode, type) {
      console.log("allowDrop", draggingNode, dropNode, type);
      if (dropNode.data.label === "二级 3-1") {
        return type !== "inner";
      } else {
        return true;
      }
    },
    allowDrag(draggingNode) {
      return draggingNode.data.label.indexOf("三级 3-2-2") === -1;
    },
  },
};
</script>

<style>
</style>