<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Layout Page -->
    <q-page-container>
      <router-view :themeSync="themeSync" />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
export default {
  setup(props) {
    const themeSync = ref(1);

    return { themeSync };
  },
};
</script>

<style lang="scss" scoped></style>
