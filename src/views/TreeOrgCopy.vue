<template>
  <div>
    <div style="display: flex; padding: 10px 0">
      <div style="margin-right: 10px">
        <i-switch v-model="horizontal"></i-switch> 横向
      </div>
      <div style="margin-right: 10px">
        <i-switch v-model="collapsable"></i-switch> 可收起
      </div>
      <div style="margin-right: 10px">
        <i-switch v-model="disaled"></i-switch> 禁止编辑
      </div>
      <div style="margin-right: 10px">
        <i-button @click="printData">打印数据</i-button>
      </div>
      <!-- <div style="margin-right: 10px"><i-switch v-model="onlyOneNode"></i-switch> 仅拖动当前节点</div>
        <div style="margin-right: 10px"><i-switch v-model="cloneNodeDrag"></i-switch> 拖动节点副本</div> -->
    </div>
    <!-- <div style="padding-bottom:10px">
      背景色：
      <color-picker v-model="style.background" size="small"></color-picker>&nbsp;
      文字颜色：
      <color-picker v-model="style.color" size="small"></color-picker>&nbsp;
      搜索：
      <input type="text" v-model="keyword" placeholder="请输入搜索内容" @keydown.enter="filter" />
    </div> -->
    <div style="height: 400px; border: 1px solid #eee">
      <zm-tree-org
        ref="tree"
        :data="data"
        :disabled="disaled"
        :horizontal="horizontal"
        :collapsable="collapsable"
        :label-style="style"
        :node-draggable="true"
        :default-expand-level="1"
        :only-one-node="onlyOneNode"
        :clone-node-drag="cloneNodeDrag"
        @on-node-drag="nodeDragMove"
        :before-drag-end="beforeDragEnd"
        @on-node-drag-end="nodeDragEnd"
        @on-node-drag-start="onNodeDragStart"
        :toolBar="toolBar"
        :filterNodeMethod="filterNodeMethod"
        @on-contextmenu="onMenus"
        @on-expand="onExpand"
        @on-node-click="onNodeClick"
        @on-node-dblclick="onNodeDblclick"
        @on-node-copy="onNodeCopy"
      >
        <template v-slot="{ node }">
          <div class="tree-org-node__text node-label">{{ node.label }}</div>
        </template>
        <template v-slot:expand="{ node }">
          <div>{{ node.children.length }}</div>
        </template>
      </zm-tree-org>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      toolBar: {
        scale: false,
      },
      keyword: "",
      data: {
          id: 1,
          label: "xxx科技有限公司",
          children: [
            {
              id: 2,
              pid: 1,
              label: "产品研发部",
              moving:true,
              children: [
                {
                  id: 10,
                  pid: 2,
                  moving:true,
                  label: "测试",
                },
              ],
            },
            // {
            //   id: 3,
            //   pid: 1,
            //   label: "客服部",
            //   children: [
            //     {
            //       id: 11,
            //       pid: 3,
            //       label: "客服一部",
            //     },
            //     {
            //       id: 12,
            //       pid: 3,
            //       label: "客服二部",
            //     },
            //   ],
            // },
            // {
            //   id: 4,
            //   pid: 1,
            //   label: "业务部",
            // },
         
          ],
        },
      horizontal: false,
      collapsable: false,
      onlyOneNode: false,
      cloneNodeDrag: false,
      expandAll: false,
      disaled: false,
      style: {
        background: "#fff",
        color: "#5e6d82",
      },
    };
  },
  created() {
    // this.toggleExpand(this.data, this.expandAll);
  },
  methods: {
    printData() {
      console.log(this.data);
    },
    onMenus({ node, command }) {
      console.log('onMenus',node, command);
      console.log(node.root);
      if (command === "addNotes") alert(11);

      if (node.root) this.$Message.info("根节点不允许删除");
    },
    filter() {
      this.$refs.tree.filter(this.keyword);
    },
    filterNodeMethod(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    onExpand(e, data) {
      console.log(e, data);
    },
    nodeDragMove(data) {
      console.log(data);
    },
    onNodeDragStart(data) {
      console.log(data);
    },
    beforeDragEnd(node, targetNode) {
      console.log('beforeDragEnd',node, targetNode)
      return new Promise((resolve, reject) => {
        if (!targetNode) reject();
        if (node.id === targetNode.id) {
          reject();
        } else {
          resolve();
        }
      });
    },
    nodeDragEnd(data, isSelf) {
      console.log('nodeDragEnd',data, isSelf);
      // isSelf && this.$Message.info("移动到自身");
    },
    onNodeClick(e, data) {
      console.log(e, data)
      // this.$Message.info(data.label);
    },
    onNodeDblclick() {
      // this.$Message.info("双击节点");
    },
    onNodeCopy() {
      this.$Message.success("复制成功");
    },
    handleNodeAdd(node) {
      console.log(node);
      // this.$Message.info("新增节点");
    },
    expandChange() {
      this.toggleExpand(this.data, this.expandAll);
    },
    toggleExpand(data, val) {
      if (Array.isArray(data)) {
        data.forEach((item) => {
          this.$set(item, "expand", val);
          if (item.children) {
            this.toggleExpand(item.children, val);
          }
        });
      } else {
        this.$set(data, "expand", val);
        if (data.children) {
          this.toggleExpand(data.children, val);
        }
      }
    },
  },
};
</script>