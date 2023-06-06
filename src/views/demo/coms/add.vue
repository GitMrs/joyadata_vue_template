<template>
  <div>
    <joyadata-dialog
      ref="dialog"
      :title="title"
      :footer="title !== dialogStatus[2]"
      @affirm="affirm"
    >
      <joyadata-form
        ref="formDom"
        :main="main"
        label-width="130px"
        :rules="rules"
        :disable="title === dialogStatus[2]"
      ></joyadata-form>
    </joyadata-dialog>
  </div>
</template>

<script>
import { dialogStatus, manage } from '../config';
import { demoURL } from '@/api/demo';

export default {
  props: {
    title: {
      type: String,
      default: dialogStatus[0],
    },
  },
  data() {
    return {
      dialogStatus,
      main: manage.formMain(this),
      rules: manage.formRules(this),
    };
  },
  methods: {
    async affirm(row) {
      this.$refs['dialog'].loading = true;
      try {
        if (this.title === dialogStatus[0]) {
          await this.$request._post(demoURL.demo, row);
        } else {
          await this.$request._put(`${demoURL.demo}/${row.id}`, row);
        }
        this.$refs['dialog'].handleClose();
        this.$parent.$refs['table_dom'].init();
      } catch (error) {
        this.$refs['dialog'].loading = false;
      }
    },
    open(row) {
      this.$refs['dialog'].open();
      if (row) {
        this.$nextTick(() => {
          console.log(row);
          this.$refs['formDom'].form = { ...row };
        });
      }
    },
  },
};
</script>

<style></style>
