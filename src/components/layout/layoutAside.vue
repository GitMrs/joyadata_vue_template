<template>
  <div
    :class="[
      isClose ? 'main_container screen_container_wrap' : 'main_container_aside',
    ]"
  >
    <slot name="aside"></slot>
    <div :class="isClose ? 'main_table_show flex1' : 'el_container'">
      <slot name="table"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isClose: false,
    };
  },
  methods: {
    change(val) {
      this.isClose = val;
    },
  },
};
</script>

<style></style>
