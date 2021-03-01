<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Layout Page -->
    <q-page-container>
      <router-view
        @courseChanged="getCourseId"
        :courseId="courseId"
        :themeSync="themeSync"
        :isSynchronize="isSynchronize"
      />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, onMounted } from "vue";
import { db } from "src/router";
export default {
  setup(props) {
    const themeSync = ref(1);

    const courseId = ref("");

    const getCourseId = (val) => {
      courseId.value = val;
    };

    // SnapSynchronize Data
    const isSynchronize = ref(false);
    const snapSynchronize = () => {
      db.collection("synchronize")
        .doc("test")
        .onSnapshot((doc) => {
          console.log("onSnapshot");
          if (doc.data().mode == "control") {
            isSynchronize.value = true;
          } else {
            isSynchronize.value = false;
          }
        });
    };

    onMounted(() => {
      snapSynchronize();
    });

    return { themeSync, courseId, getCourseId, isSynchronize };
  },
};
</script>

<style lang="scss" scoped></style>
