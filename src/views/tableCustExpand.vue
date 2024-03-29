<template>
  <div>
    <div class="tableBox">
      <el-table
        :data="tableData"
        style="width: 100%"
        ref="expandTable"
        row-key="id"
        :expand-row-keys="expands"
        :header-cell-style="{ background: '#EFF3F5', color: '#6B7275' }"
      >
        <el-table-column type="expand" width="1">
          <template #default="props">
            <div>展开内容:{{ props.row.expandMsg }}</div>
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="name"> </el-table-column>
        <el-table-column label="操作" width="120">
          <template #default="scope">
            <el-button
              link
              size="small"
              class="btnClass"
              @click="handleRowClick(scope.row)"
              >{{ scope.row.id == expands[0] ? "收起" : "展开" }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
};
</script>

<script setup>
import { ref } from "vue";

const tableData = ref([
  { id: 1, name: "aaa", expandMsg: "我是展开内容" },
  { id: 2, name: "bbb", expandMsg: "我是展开内容bbb" },
]);
//实现展开收起
const expands = ref([]);
const handleRowClick = (row) => {
  console.log(row);
  if (expands.value.includes(row.id)) {
    expands.value = expands.value.filter((val) => val !== row.id);
  } else {
    expands.value = []; //添加该代码实现手风琴模式，删除该代码取消手风琴模式
    expands.value.push(row.id);
  }
};
</script>

<style lang="scss" scoped>
:deep(.el-table__expand-icon) {
  display: none;
}
.tableBox {
  background-color: #ffffff;
  padding: 30px;
}
</style>
