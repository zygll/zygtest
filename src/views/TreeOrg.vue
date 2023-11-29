<template>
  <div class="dbox">
    <div class="box">
      <div class="title">联系人</div>
      <el-button type="primary" @click="exportImg">导出图片</el-button>
      <el-button type="primary" @click="reset" icon="el-icon-video-play">重新演示</el-button>
      <div class="cardbox">
        <div class="carditem" v-for="item in clist" :key="item.key" @dragover.prevent @drop="onDrop($event, item)">
          <div class="cardtitle">{{ getValue(item.key) }}</div>
          <div class="carditemp">
            <div class="itemdrag" id="step1" v-for="person in item.personnel" draggable
              @dragstart.stop="dragstart($event, person)" :key="person.id">
              {{ person.name }}: {{ person.job }}
              <i class="el-icon-edit" @click="cedit(person)"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tree" @click="closeO">
      <div class="toptitle">
        <div class="lefttitle">关键决策人组织架构图</div>
        <div class="rightCont">
          <div class="left">建议权</div>
          <div class="center">决策权</div>
          <div class="right">一票否决权</div>
        </div>
      </div>
      <div style="display: flex; padding: 10px 0">
        <!-- <div style="margin-right: 10px">
          <el-switch v-model="horizontal"></el-switch>
          {{ horizontal ? "横向" : "纵向" }}
        </div>
        <div style="margin-right: 10px">
          <el-switch v-model="collapsable"></el-switch>
          {{ collapsable ? "可收起" : "仅展开" }}
        </div>
        <div style="margin-right: 10px">
          <el-switch v-model="disaled"></el-switch>
          {{ disaled ? "禁止编辑" : "可编辑" }}
        </div>
        <div style="margin-right: 10px">
          <el-switch v-model="onlyOneNode"></el-switch>
          {{ onlyOneNode ? "仅拖动当前节点" : "拖动当前节点树" }}
        </div>
        <div style="margin-right: 10px">
          <el-switch v-model="cloneNodeDrag"></el-switch>
          {{ cloneNodeDrag ? "拖动节点副本" : "拖动节点本身" }}
        </div>
        <div style="margin-right: 10px">
          <el-switch v-model="pop"></el-switch>
          {{ pop ? "弹窗修改节点" : "标签修改节点" }}
        </div> -->
        <div style="margin-right: 10px">
          <!-- <el-button type="primary" @click="look">查看数据</el-button> -->
        </div>
      </div>
      <!-- <div style="padding-bottom: 10px" class="pickers">
        背景色：
        <el-color-picker
          v-model="style.background"
          size="small"
        ></el-color-picker
        >&nbsp; 文字颜色：
        <el-color-picker v-model="style.color" size="small"></el-color-picker
        >&nbsp; 搜索：
        <input
          type="text"
          v-model="keyword"
          placeholder="请输入搜索内容"
          @keydown.enter="filter"
        />
      </div> -->
      <div class="lll">
        <div ref="nodeOne" class="nodeOne">
          <zm-tree-org id="step2" :key="treeKey" ref="tree" :data="treeData" :disabled="disaled" :horizontal="horizontal"
            :collapsable="collapsable" :label-style="style" :node-draggable="!disaled" :default-expand-level="1"
            :only-one-node="onlyOneNode" :clone-node-drag="cloneNodeDrag" :node-draging="nodeDragMove"
            :node-delete="nodeDelete" :node-edit="nodeEdit" :node-add="nodeAdd" :node-drag-end="nodeDragEnd"
            :before-drag-end="beforeDragEnd" :toolBar="toolBar" :filterNodeMethod="filterNodeMethod"
            @on-contextmenu="onMenus" @on-expand="onExpand" @on-node-click="onNodeClick"
            @on-node-dblclick="onNodeDblclick" @on-node-copy="onNodeCopy" :define-menus="menusf">
            <!-- 自定义节点内容 -->
            <template slot-scope="{ node }">
              <!-- <div class="model">
                <div class="left"></div>
                <div class="center"></div>
                <div class="right"></div>
              </div> -->
              <div @drop.stop="drop" @dragover.prevent class="tree-org-node__text node-label node" :data-id="node.id"
                :data-pid="node.pid" :data-label="node.name" :data-job="node.job" :data-level="node.$$level">
                <!-- @contextmenu.prevent="terFun(node)" -->
                <div class="power">
                  <div v-if="node.decisions?.includes('1')" class="left"></div>
                  <div v-if="node.decisions?.includes('2')" class="center"></div>
                  <div v-if="node.decisions?.includes('3')" class="right"></div>
                </div>
                {{ node.name }}{{ node.job ? ":" + node.job : "" }}
                <!-- {{ node.open }}{{ treeScope }} -->
                <!-- <div v-if="treeScope && node.open" class="late" id="lateId">
                  <el-input
                    type="textarea"
                    placeholder="请输入内容"
                    v-model="cardOne.name"
                    maxlength="30"
                    show-word-limit
                  >
                  </el-input>
                  <div @click="close(cardOne)" class="onCloseCss">确定</div>
                </div> -->
              </div>
            </template>
            <!-- 自定义展开按钮 -->
            <!-- <template v-slot:expand="{ node }">
              <div>{{ node.children.length }}</div>
            </template> -->
          </zm-tree-org>
        </div>
      </div>
    </div>
    <el-dialog title="" :visible.sync="dialogVisibleRemark" width="400px" :close-on-press-escape="false"
      :close-on-click-modal="false">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="分管内容">
          <el-input v-model="form.resContent" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="工作经历">
          <el-input v-model="form.workExperience" type="textarea"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="" :visible.sync="dialogVisibleDecision" width="400px" :before-close="checkedDecisionsClose"
      :close-on-press-escape="false" :close-on-click-modal="false">
      <el-checkbox-group v-model="checkedDecisions" @change="checkboxValuesC">
        <el-checkbox v-for="item in decisions" :label="item.key" :key="item.key">{{ item.value }}</el-checkbox>
      </el-checkbox-group>
    </el-dialog>
  </div>
</template>
<script>



import ZmTreeOrg from 'zm-tree-org';
import "zm-tree-org/lib/zm-tree-org.css";
console.log(ZmTreeOrg,'ZmTreeOrg');
import html2Canvas from "html2canvas"
import { data } from "../public/orgTree";
import { clist } from "../public/clists";
const decisions = [
  {
    key: "1",
    value: "建议权",
  },
  {
    key: "2",
    value: "决策权",
  },
  {
    key: "3",
    value: "一票否决权",
  },
];
export default {
  data() {
    return {
      treeKey:0,
      introOption: { // 参数对象
        prevLabel: '上一步',
        nextLabel: '下一步',
        // skipLabel: '跳过',
        doneLabel: '完成',
        tooltipClass: 'intro-tooltip', /* 引导说明文本框的样式 */
        highlightClass: 'intro-highlight', /* 说明高亮区域的样式 */
        exitOnEsc: true, /* 是否使用键盘Esc退出 */
        exitOnOverlayClick: false, /* 是否允许点击空白处退出 */
        keyboardNavigation: true, /* 是否允许键盘来操作 */
        showBullets: false, /* 是否使用点显示进度 */
        showProgress: false, /* 是否显示进度条 */
        scrollToElement: true, /* 是否滑动到高亮的区域 */
        overlayOpacity: 0.5, // 遮罩层的透明度 0-1之间
        positionPrecedence: ['bottom', 'top', 'right', 'left'], /* 当位置选择自动的时候，位置排列的优先级 */
        disableInteraction: false, /* 是否禁止与元素的相互关联 */
        hidePrev: true, /* 是否在第一步隐藏上一步 */
        // hideNext: true, /* 是否在最后一步隐藏下一步 */
        steps: []
      },


      ckey: [
        { key: "1", value: "决策层" },
        { key: "2", value: "商务层" },
        { key: "3", value: "运营层" },
        { key: "4", value: "其他" },
      ],
      draggedPerson: null,
      treeData: data,
      clist,
      currentNode: null, // 添加currentNode属性
      decisions,
      form: {
        resContent: "",
        workExperience: "",
      },
      checkedDecisions: [],
      dialogVisibleRemark: false,
      dialogVisibleDecision: false,
      curnode: null,
      toolBar: {
        scale: true,
        restore: true,
        expand: true,
        zoom: true,
        fullscreen: true,
      },
      keyword: "",
      menus: [],
      nodeDraggable: true,
      horizontal: false,
      collapsable: true,
      onlyOneNode: false, //仅拖动当前节点
      cloneNodeDrag: false, //是否拷贝节点拖拽 false仅拖拽  true拷贝+保留原位
      expandAll: true,
      disaled: false,
      style: { background: "#ECF2FE" },
      treeScope: false,
      //弹窗
      pop: false,
      //card组件信息
      cardOne: {},
      propsData: {
        id: "id",
        pid: "pid",
        label: "name",
        job: "job",
        remark: "remark",
        decisions: "decisions",
        expand: "expand",
        children: "children",
      },
      sum: 0,
    };
  },
  filters: {},
  computed: {
    getValue() {
      return (v) => {
        return this.ckey.find((item) => item.key == v).value;
      };
    },
  },
  created() { },
  mounted() {
    this.$nextTick(() => {
      this.initGuide() // 调用新手引导的方法
    })
  },
  methods: {
    reset() {
      // this.collapsable = false
      this.treeKey++
      this.$nextTick(() => {
        this.initGuide() // 调用新手引导的方法
      })

    },
    initGuide() {
      // 绑定标签元素的选择器数组
      this.introOption.steps = [{
        title: '引导提示',
        element: window.document.querySelectorAll('.cardbox')[0],
        intro: '编辑状态下将联系人拖动联系人',
      },

      {

        title: '引导提示',
        element: window.document.querySelectorAll('.zm-tree-org')[0],
        intro: '拖到到关键决策人组织架构图节点上',
      },
      {

        title: '引导提示',
        element: window.document.querySelectorAll('.tree-org-node__text')[2],
        intro: '节点右击可以删除、添加备注、添加决策影响力',
      },]

      this.$intro()
        .setOptions(this.introOption)
        // 点击结束按钮后执行的事件
        .oncomplete(() => {
          console.log('点击结束按钮后执行的事件')
        })
        // 点击跳过按钮后执行的事件
        .onexit(() => {
          console.log('点击跳过按钮后执行的事件')
        })
        // 确认完毕之后执行的事件
        .onbeforeexit(() => {
          console.log('确认完毕之后执行的事件')
        })
        .start()
    },
    async exportImg() {
      const canvas = await html2Canvas(this.$refs.nodeOne, {
        scale: 1,
      });
      const imgData = canvas.toDataURL();
      console.log(imgData)
    },
    menusf(e, node) {
      console.log(arguments, "menusf");
      // return [{name: "菜单01",command: "test01"}]
      console.log("terFun", node);
      if (node.disabled || this.disaled) {
        return [];
      } else if (node.root) {
        return [{ name: "添加下级", command: "add" }];
      } else {
        return [
          // { name: "复制文本", command: "copy" },
          // { name: "添加下级", command: "add" },
          // { name: "编辑节点", command: "edit1" },
          // { name: "添加同级", command: "sameNode" },
          // { name: "添加上级", command: "addTop" },
          { name: "删除", command: "delete" },
          { name: "添加备注", command: "addNotes" },
          { name: "决策影响力", command: "addPower" },
        ];
      }
    },
    cedit(item) {
      console.log(item);
    },
    checkedDecisionsClose() {
      console.log(1);
      this.currentNode = null;
      this.dialogVisibleDecision = false;
    },
    checkboxValuesC(val) {
      console.log(val);
      if (this.currentNode) {
        this.currentNode.decisions = val.join(","); // 更新treeData中对应节点的decisions属性
      }
    },
    look1() {
      console.log(this.clist);
    },
    look() {
      console.log(this.treeData);
    },
    nodeDelete(node) {
      console.log("delete");
      this.handleDelete(node);
    },
    nodeEdit(node) {
      console.log("nodeEdit", node);
    },
    dragstart(event, person) {
      this.draggedPerson = person;
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("person", JSON.stringify(person)); // 保存被拖动的数据
    },
    onDrop(event, targetGroup) {
      if (this.draggedPerson) {
        const sourceGroup = this.clist.find((group) =>
          group.personnel.includes(this.draggedPerson)
        );
        if (sourceGroup !== targetGroup) {
          sourceGroup.personnel = sourceGroup.personnel.filter(
            (person) => person !== this.draggedPerson
          );
          targetGroup.personnel.push(this.draggedPerson);
          this.draggedPerson = null;
        }
      }
    },
    drop(ev) {
      console.log("drop=============", ev);
      var person = ev.dataTransfer.getData("person");
      console.log(JSON.parse(person), "获取被拖动的数据person");

      const { treeData } = this;
      const { id = "", label = "", level = "" } = ev.target.dataset;
      if (id) {
        console.log(id, label, level);
        let curnode = this.getNode(treeData, id);
        this.curnode = curnode;
      } else {
        this.curnode = null;
      }
      console.log("curnode", this.curnode);
      if (this.curnode) {
        this.nodeAdd(this.curnode, JSON.parse(person));
      }
    },

    //移除节点
    handleDelete(node) {
      const { treeData } = this;
      const { id, pid, children } = this.propsData;
      const oldPaNode = this.getNodeById(treeData, id, node[pid]);
      console.log("oldPaNode", oldPaNode);

      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          if (node.root) {
            this.$log.pretty("[提示] ", "根节点不允许删除", "danger");
            return;
          }
          const list = oldPaNode[children];
          for (let i = 0, len = list.length; i < len; i++) {
            if (list[i][id] === node[id]) {
              list.splice(i, 1);
              // this.$emit("on-node-delete", node, oldPaNode);
              break;
            }
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //递归遍历实现获取当前node
    getNode(data, id) {
      if (data["id"] == id) {
        return data;
      } else if (Array.isArray(data.children)) {
        let list = data.children;
        for (let i = 0, len = list.length; i < len; i++) {
          let row = list[i];
          let node = this.getNode(row, id);
          if (node) {
            return node;
          }
        }
      }
    },
    //递归遍历实现
    getNodeById(data, key, value) {
      if (data[key] === value) {
        return data;
      } else if (Array.isArray(data.children)) {
        let list = data.children;
        for (let i = 0, len = list.length; i < len; i++) {
          let row = list[i];
          let pNode = this.getNodeById(row, key, value);
          if (pNode) {
            return pNode;
          }
        }
      }
    },
    // 判断节点id 重复
    repeatNode(data, targetId) {
      if (data.id === targetId) {
        return true;
      }
      if (data.children) {
        for (const child of data.children) {
          if (this.repeatNode(child, targetId)) {
            return true;
          }
        }
      }
      return false;
    },

    //动态赋值
    terFun(node) {
      console.log("terFun", node);
      if (node.disabled || this.disaled) {
        this.menus = [];
      } else if (node.root) {
        this.menus = [{ name: "添加下级", command: "add" }];
      } else {
        this.menus = [
          // { name: "复制文本", command: "copy" },
          // { name: "添加下级", command: "add" },
          // { name: "编辑节点", command: "edit1" },
          // { name: "添加同级", command: "sameNode" },
          // { name: "添加上级", command: "addTop" },
          { name: "删除", command: "delete" },
          { name: "添加备注", command: "addNotes" },
          { name: "决策影响力", command: "addPower" },
        ];
      }
    },
    addNodeF(node, handle, nodeitem) {
      console.log("节点", node);
      console.log("当前节点", this.curnode);
      // // 判断被添加节点有没有name,无责添加
      // if (!this.curnode?.name&&this.sum>0) {
      //   // 没有就赋值
      //   console.log("没有就赋值",this.sum);
      //   return
      // }

      // 有走下级添加
      const { id, pid, label, children, remark, decisions, job } =
        this.propsData;
      const { treeData } = this;
      const {
        id: nodeitemid,
        name: nodeitemname,
        job: nodeitemjob,
      } = nodeitem || {};
      console.log(nodeitem);
      console.log(nodeitemid, nodeitemname, nodeitemjob);
      console.log(this.repeatNode(treeData, nodeitemid), "是否重复");
      if (this.repeatNode(treeData, nodeitemid)) {
        this.$message.error("请勿重复添加！");
        return;
      }
      // 获取父级
      let oldPaNode = null,
        poldPaNode = null,
        key = null;
      switch (handle) {
        case "add":
          console.log(0);
          key = node;
          console.log(key, "add");

          break;
        case "sameNode":
          oldPaNode = this.getNodeById(treeData, id, node[pid]);
          console.log(1);
          key = oldPaNode;
          break;
        case "addTop":
          oldPaNode = this.getNodeById(treeData, id, node[pid]);
          poldPaNode = this.getNodeById(treeData, id, oldPaNode[pid]);
          console.log(2);
          if (!poldPaNode) {
            this.$message.error("没有上上级元素");
            return;
          }
          key = poldPaNode;
          break;
      }
      const json = {
        [id]: nodeitemid || String(new Date().getTime()),
        [pid]: key[id],
        [job]: nodeitemjob,
        [label]: nodeitemname,
        // [expand]: false,
        [children]: [],
        [remark]: {},
        [decisions]: "",
        // newNode: true,
        // focused: false,
      };
      if (Array.isArray(key[children])) {
        key[children].push(json);
      } else {
        this.$set(key, children, [].concat(json));
      }
      this.curnode = null;
    },
    //右侧菜单点击事件
    onMenus({ node, command }) {
      //自定义编辑--弹窗编辑
      // let labelOld = node.label;
      if (command === "sameNode" && !node.disabled) {
        // node
        this.addNodeF(node, "sameNode");
        console.log("sameNode");
      } else if (command === "addTop" && !node.disabled) {
        console.log(node, "addTop");
        this.addNodeF(node, "addTop");
      } else if (command === "addNotes" && !node.disabled) {
        console.log("addNotes");
        this.dialogVisibleRemark = true;
        if (!node.remark) {
          node.remark = {
            resContent: "",
            workExperience: "",
          };
        }
        this.form = node.remark;
        console.log(this.form, "this.form");
      } else if (command === "addPower" && !node.disabled) {
        console.log("addPower", node);
        this.currentNode = node; // 将选中的节点赋值给currentNode
        this.checkedDecisions = node.decisions
          ? node.decisions.split(",").map((item) => item.trim())
          : []; // 根据node.decisions是否为空来设置checkedDecisions
        console.log("====================================");
        console.log(this.checkedDecisions);
        console.log("====================================");
        this.dialogVisibleDecision = true;
      }
    },
    //自定义修改属性值
    editFun(data, node, val) {
      if (!data || !data.length) {
        return;
      }
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === node.id) {
          data[i].label = val;
          break;
        }
        this.editFun(data[i].children, node, val);
      }
    },
    //确定 关闭car界面
    close(val) {
      console.log(1);
      this.$delete(val, "open");
      this.treeScope = false;
    },
    //颠倒编辑外区域，关闭
    closeO(event) {
      var currentCli = document.getElementById("lateId");
      if (currentCli) {
        if (!currentCli.contains(event.target)) {
          this.close(this.cardOne);
        }
      }
    },
    //自定义card显示
    filter() {
      this.$refs.tree.filter(this.keyword);
    },
    filterNodeMethod(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    //展开事件
    onExpand(e, data) {
      console.log(e, data);
    },
    nodeDragMove(data) {
      console.log(data, "nodeDragMove======");
    },
    beforeDragEnd(node, targetNode) {
      console.log(node, "当前节点");
      console.log(node, "目标节点");
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
      console.log(data, isSelf, "nodeDragEnd");
      // isSelf && this.$Message.info("移动到自身");
    },
    //点击节点
    onNodeClick(e, data) {
      console.log(JSON.stringify(data, null, 2));
      console.log(
        "checkboxValues",
        JSON.stringify(this.checkboxValues, null, 2)
      );
      console.log(
        "formattedCheckboxValues",
        JSON.stringify(this.formattedCheckboxValues, null, 2)
      );
      this.$message.info(data.label);
    },
    onNodeDblclick() {
      // this.$Message.info("双击节点");
    },
    onNodeCopy() {
      // this.$Message.success("复制成功");
    },
    nodeAdd(node, nodeitem) {
      console.log(node, nodeitem, "新增节点");
      // this.$Message.info("新增节点");
      this.addNodeF(node, "add", nodeitem);
    },
    expandChange() {
      this.toggleExpand(this.data, this.expandAll);
    },
    //递归创建节点树
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
<style lang = "scss" scoped>
.zm-tree-org {
  height: 500px;
}

::v-deep .zoom-container {
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

::v-deep body .zm-tree-contextmenu {
  width: 130px !important;

  li {
    font-size: 14px !important;
  }
}

::v-deep .tree-org-node__content .tree-org-node__inner {
  width: max-content;
}


.toptitle {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  width: auto;
}

.rightCont {
  display: grid;
  grid-column-gap: 15px;
  grid-row-gap: 0;
  grid-template-columns: auto auto auto;

  .left {
    &::before {
      display: inline-block;
      margin-right: 10px;
      content: "";
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 8px solid #21b835;
      transform: matrix(1, 0, 0, -1, 0, 0);
    }
  }

  .center {
    &::before {
      display: inline-block;
      margin-right: 10px;
      content: "";
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 8px solid#FA6400;
      transform: matrix(1, 0, 0, -1, 0, 0);
    }
  }

  .right {
    &::before {
      display: inline-block;
      margin-right: 10px;
      content: "";
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;

      border-bottom: 8px solid #dd0800;
      transform: matrix(1, 0, 0, -1, 0, 0);
    }
  }
}

.dbox {
  display: flex;
}

.cardtitle {
  text-align: left;
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
}

.itemdrag {
  width: 137px;
  height: 40px;
  padding: 0 10px 0 10px;
  background: #ecf2fe;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.carditemp {
  display: grid;
  grid-column-gap: 12px;
  grid-row-gap: 12px;
  grid-template-columns: auto auto;
}

.el-icon-edit {
  cursor: pointer;
  color: #2979ff;
}

.box {
  width: 405px;
  margin-right: 10px;
  background: #fff;
  padding: 24px;

  .title {
    font-size: 16px;
    text-align: left;
    padding-bottom: 16px;
    margin-bottom: 16px;
    border-bottom: 1px dashed #d6d6d6;
  }
}

.carditem {
  margin-bottom: 24px;
  background: #fbfbfb;
  padding: 10px;
}

.tree {
  width: 100%;
  background: #fff;
}

.pickers {
  display: flex;
}

.node {
  position: relative;
}

.nodeOne {
  height: 800px;
}

.late {
  position: absolute;
  top: 20px;
  right: -100px;
  width: 200px;
  min-height: 100px;
  z-index: 999;
  background: #f2e2be;
  padding: 10px;
}

.onCloseCss {
  width: 50px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  background: #108ffe;
  margin: 10px auto;
  z-index: 999;
}

::v-deep .is-edit {
  background: palegoldenrod !important;
}

.power {
  position: absolute;
  top: 0;
  left: 0;
  transform: matrix(1, 0, 0, -1, 0, 0);
  display: grid;
  grid-column-gap: 5px;
  grid-row-gap: 0;
  grid-template-columns: auto auto auto;

  .left {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 8px solid #21b835;
  }

  .center {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 8px solid#FA6400;
  }

  .right {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;

    border-bottom: 8px solid #dd0800;
  }
}

.model {
  background: transparent;
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
}

/* .left {
  background: #ff00f2;
  height: 100%;
  flex: 0 0 33%;
}
.center {
  background: #ff0d0d;
    height: 100%;
    flex: 0 0 33%;
}
.right {
  background: #0dffcb;
    height: 100%;
    flex: 0 0 33%;
} */
</style>