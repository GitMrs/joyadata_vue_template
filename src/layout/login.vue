<template>
  <div class="login_bg">
    <login-xdzq
      ref="login"
      :logo-url="''"
      :after-login="false"
    />
  </div>
</template>
<script>
import LoginXdzq from 'joyadata-header/src/components/login/login_xdzq';
export default {
  components: {
    LoginXdzq,
  },
};
</script>
<style lang="scss" scoped></style>
