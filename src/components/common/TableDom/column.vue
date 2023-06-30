<template>
  <div>
    <el-table-column
      v-for="(item, index) in column"
      :key="index"
      align="center"
      :label="item.name"
    >
      <el-table-column
        v-for="(_item, _index) in item.children"
        :key="_index"
        align="center"
        :width="_item.name.length < 4 ? '60' : 18 * _item.name.length"
        :prop="_item.name"
        :show-overflow-tooltip="true"
        :label="_item.name"
      ></el-table-column>
    </el-table-column>
  </div>
</template>

<script>
export default {
  props: {
    column: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style></style>
