<template>
  <recycle-scroller
    class="virtual-list"
    :prerender="10"
    style="height: 200px"
    :item-size="24"
    key-field="id"
    :items="tableData"
  >
    <template v-slot="{ item, index }">
      <div class="list-item" :key="index">
        <span>{{ item.id }}</span>
        <span>{{ item.name }}</span>
      </div>
    </template>
  </recycle-scroller>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    for (let i = 0; i < 100000; i++) {
      this.tableData.push({ id: i, name: Math.random() });
    }
  },
};
</script>

<style>
</style>