<template>
  <div class="brx">
    <div>
      <header-bar></header-bar>
    </div>
  </div>
</template>

<script>
import headerBar from "../header-time-progress";
import waiting from "../waiting";
export default {
  components: {
    headerBar,
    waiting
  }
};
</script>

<style lang="scss" scoped></style>
