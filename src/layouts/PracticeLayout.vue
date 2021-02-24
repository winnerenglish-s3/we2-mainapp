<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Layout Page -->
    <q-page-container>
      <router-view
        @courseChanged="getCourseId"
        :courseId="courseId"
        :themeSync="themeSync"
      />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
export default {
  setup(props) {
    const themeSync = ref(1);

    const courseId = ref("");

    const getCourseId = (val) => {
      courseId.value = val;
    };

    return { themeSync, courseId, getCourseId };
  },
};
</script>

<style lang="scss" scoped></style>
