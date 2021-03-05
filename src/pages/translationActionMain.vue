<template>
  <q-page class="bg-action"> </q-page>
</template>

<script>
export default {
  props: {
    themeSync: {
      type: Number,
      default: 1,
    },
  },
};
</script>

<style lang="scss" scoped>
.bg-action {
  background-image: url("../../public/images/action/bg-action-theme-1.png");
  background-size: cover;
  background-position: center;
}
</style>
