<!-- <template>
  <div class="index-main">
  
    <div>
      <div
        @dragover.prevent="carddivallowDrop($event)"
        @dragleave="cardLeaveDrop($event)"
      >
        <vue-drag-tree-org
          :data="data"
          @node-drag-start="handleDragStart"
          @node-drag-enter="handleDragEnter"
          @node-drag-leave="handleDragLeave"
          @node-drag-over="handleDragOver"
          @node-drag-end="handleDragEnd"
          @node-drop="handleDrop"
          draggable
          :allow-drop="allowDrop"
          :allow-drag="allowDrag"
          default-expand-all
          :props="defaultProps"
          node-key="id"
          accordion
        >
          <span slot="default" slot-scope="{ node, data }">
            <div
            class="org-tree-node-label"
              v-if="currentNode"
              @dragover="hashandleDragOver(currentNode, node, $event)"
            >
              <span class="org-tree-node-label-inner">
                {{ data.label }}
              </span>
            </div>
            <div  class="org-tree-node-label" v-else>
                <span class="org-tree-node-label-inner">
                {{ data.label }}
              </span>
            </div>
          </span>
        </vue-drag-tree-org>
      </div>
      <div
        id="div1"
        style="width: 100%; height: 400px; border: 1px solid #ccc"
        @drop.stop="drop($event)"
        @dragover.prevent="divallowDrop($event)"
        @dragleave="divLeaveDrop($event)"
      >
        <div
          v-for="(item, index) in tableTitle"
          :key="index"
          style="display: inline-block; cursor: pointer"
          draggable="true"
          @dragstart="divDragStart($event, item)"
          @dragover.prevent="imgallowDrop(item, $event)"
          @dragend="divDragEnd($event, item)"
        >
          {{ item.label }}
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>

export default {
  name: "danganList",
  data() {
    return {
      currentNode: {
        data: null,
        event: null,
      },
      tableTitle: [
        {
          id: 11,
          label: "一级分类",
          key: "category1",
          url: "1",
          index: 0,
        },
        {
          id: 12,
          label: "二级分类",
          key: "category2",
          url: "2",
          index: 1,
        },
        {
          id: 13,
          label: "三级分类",
          key: "category3",
          url: "3",
          index: 2,
        },
      ],
      from_pagination: {
        condition: "",
      },
      table: {
        data: [],
        update: false,
        loading: false,
        height: null,
        columns: [
          {
            title: "序号",
            type: "index",
            width: 60,
            align: "center",
          },
          {
            title: "姓名",
            align: "center",
            key: "a",
          },

          {
            title: "性别",
            align: "center",
            key: "b",
          },
          {
            title: "人员类型",
            align: "center",
            key: "c",
          },
          {
            title: "身份证",
            align: "center",
            key: "d",
          },
          {
            title: "联系号码",
            align: "center",
            key: "e",
          },
        ],
      },
      direction: "Horizontal",
      isExpand: false,
      data: [
        {
          id: 0,
          label: "XXX科技有限公司",
          children: [
            {
              id: 1,
              label: "产品研发部",
              children: [
                {
                  id: 2,
                  label: "研发-前端",
                },
                {
                  id: 3,
                  label: "研发-后端",
                },
                {
                  id: 4,
                  label: "UI设计",
                },
                {
                  id: 5,
                  label: "产品经理",
                },
              ],
            },
            {
              id: 6,
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
              id: 9,
              label: "财务部",
            },
            {
              id: 10,
              label: "HR人事",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      inOrout: false,
      aimoverNode: null,
      divinOrout: false, //选框
      imgnode: null, //图标节点
    };
  },
  methods: {
    renderContent(h, {data}) {
      return (<el-dropdown trigger='click' oncommand={(command) => this.handleAddDel(command)}>
        <a>{data.label}</a>
        <el-dropdown-menu slot='dropdown'>
          <el-dropdown-item command='addTreeSel'>添加部门</el-dropdown-item>
          <el-dropdown-item command='editTreeSel'>修改部门</el-dropdown-item>
          <el-dropdown-item command='delTreeSel' >删除部门</el-dropdown-item >
        </el-dropdown-menu >
      </el-dropdown >)
    },
    sortId: function (a, b) {
      return a.id - b.id;
      // result.sort(sortId);
    },
    carddivallowDrop: function (ev) {
      console.log("carddivallowDrop", ev);
      //进入树边框
      let _this = this;
      _this.inOrout = true;
    },
    cardLeaveDrop: function () {
      //离开树结构
      let _this = this;
      _this.inOrout = false;
    },
    divLeaveDrop: function () {
      //离开选框结构
      let _this = this;
      _this.divinOrout = false;
    },
    divallowDrop: function (ev) {
      console.log("divallowDrop", ev);
      //拖拽进入边框结构
      let _this = this;
      _this.divinOrout = true;
    },
    drop(ev) {
      //拖拽到边框内放下时
      console.log(13123,ev);
    },
    divDragStart(ev, item) {
      console.log("divDragStart", item);
      //拖拽图片时
      console.log("divdrag start", ev);
    },
    treenode: function (node, aimnode, addnode) {
      //node节点，目标节点，需增加节点
      //查找插入
      let _this = this;
      if (node.id == aimnode.key) {
        if (!node.children) {
          node.children = [];
        }
        node.children.push(addnode);
        return node;
      }
      if (node.children) {
        node.children.map((dcitem) => {
          dcitem = _this.treenode(dcitem, aimnode, addnode);
        });
      }
      return node;
    },
    deltreenode: function (node, aimnode,addnode) {
      //node节点，目标节点，需增加节点
      //查找删除
      let _this = this;
      if (node.id == aimnode.key) {
        if (!node.children) {
        } else {
          console.log("请先清除子级");
        }
        node.children.push(addnode);
        return node;
      }
      if (node.children) {
        node.children.map((dcitem) => {
          dcitem = _this.deltreenode(dcitem, aimnode, addnode);
        });
      }
      return node;
    },
    divDragEnd(ev, item) {
      //拖拽图片时,item为当前拖拽元素
      let _this = this;
      console.log("divdrag end", ev);

      let data = JSON.parse(JSON.stringify(_this.data));
      if (_this.aimoverNode) {
        //存在覆盖元素,插入到覆盖元素aimoverNode的子级
        let aimnode = _this.aimoverNode;
        let addnode = item;
        data.map((ditem) => {
          ditem = _this.treenode(ditem, aimnode, addnode);
        });
        _this.$set(_this, "data", data);
        _this.tableTitle = _this.tableTitle.filter((titem, index) => {
          return titem.id != item.id;
        });
      } else {
        if (_this.inOrout) {
          //在放下元素后判断是否是在树结构框内放下
          _this.data.push(item);
          _this.tableTitle = _this.tableTitle.filter((titem, index) => {
            return titem.id != item.id;
          });
        }
      }
      //放下元素后默认离开树结构选框
      _this.inOrout = false;
      _this.aimoverNode = null;
    },
    handleDragStart(node, ev) {
      console.log("handleDragStart", ev);
      //树元素
      let _this = this;
      _this.currentNode = null;
      console.log("drag start", node);
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      console.log("handleDragEnter", draggingNode, ev);
      //树元素
      console.log("tree drag enter: ", dropNode.label);
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      console.log("handleDragLeave", draggingNode, ev);
      console.log("tree drag leave: ", dropNode.label);
    },
    hashandleDragOver(draggingNode, dropNode, ev) {
      console.log("hashandleDragOver", draggingNode, ev);

      //树元素,覆盖在某元素上时,两套，因为无法获取原handleDragOver方法
      let _this = this;
      _this.aimoverNode = dropNode;
      console.log("tree drag over: ", dropNode.label);
    },
    handleDragOver(draggingNode, dropNode, ev) {
      //树元素,
      let _this = this;
      console.log(draggingNode, "draggingNode");
      console.log(dropNode, "dropNode");
      console.log("tree drag over: ", dropNode.label);
    },
    imgallowDrop: function (node, ev) {
      //覆盖在图片上时
      _this.imgnode = node;
      console.log('imgallowDrop',ev)
    },

    deleteTreeNode(root, id) {
      if (root.id == id) {
        for (var key in root) {
          delete root[key];
        }
        return true;
      } else if (root.children && root.children.length > 0) {
        for (var i = root.children.length - 1; i >= 0; i--) {
          var isClean = deleteTreeNode(root.children[i], id);
          if (isClean === true) {
            root.children.splice(i, 1);
          }
        }
      }
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
        console.log('handleDragEnd',dropNode,dropType,ev)
      let _this = this;
      // console.log('tree drag end: ', dropNode && dropNode.label, dropType);
      _this.currentNode = null;
      // 删除原树节点

      console.log(draggingNode, "end");

      if (_this.imgnode) {
        if (_this.divinOrout) {
          let getindex = _this.tableTitle.findIndex((titem, tindex) => {
            return titem.id == _this.imgnode.key;
          });

          let obj = {
            id: _this.imgnode.key,
            label: _this.imgnode.label,
            key: "category1",
            url: _this.imgnode.url ? _this.imgnode.url : "",
            index: 0,
          };
          _this.tableTitle.splice(getindex, 0, obj);

          let ishasexict = _this.data.findIndex((ditem) => {
            return ditem.id == _this.imgnode.key;
          });

          if ((hasexict = -1)) {
            _this.data.map((dditem) => {
              if (dditem.children) {
                let cdditem = dditem.children;
                let ishasexict = cdditem._this.data.findIndex(
                  (cddditem) => {
                    return cddditem.id == _this.imgnode.key;
                  }
                );
              }
            });
          } else {
            let hasexict = _this.data[ishasexict];
            if (hasexict.children && hasexict.children.length > 0) {
              console.log("请清除其子级");
            } else {
              _this.data = _this.data.filter((ditem, index) => {
                return ditem.id != _this.imgnode.key;
              });
            }
          }
        }
      } else {
        if (_this.divinOrout) {
          let obj = {
            id: draggingNode.key,
            label: draggingNode.label,
            key: "category1",
            url: draggingNode.url ? draggingNode.url : "",
            index: 0,
          };
          _this.tableTitle.push(obj);
        }
      }
      _this.divinOrout = false;
      _this.imgnode = null;
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
        console.log('handleDrop',draggingNode,ev)
      let _this = this;
      // before在上一级的左侧
      // after在上一级的右侧
      // inner 在选中级下作为子集
      //  none 拖动位置不变
      // dropType:before,after,inner,none

      console.log(this.data, "最后结果");
      console.log("tree drop: ", dropNode.label, dropType);
      _this.currentNode = null;
    },
    allowDrop(draggingNode, dropNode, type) {
        console.log('allowDrop',draggingNode)
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
  mounted() {},
};
</script> -->
