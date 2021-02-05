<template>
  <q-page class="bg-reading">
    <reading-multiple-pc
      class="box-container-main"
      v-if="$q.platform.is.desktop"
    ></reading-multiple-pc>
    <reading-multiple-mobile
      v-if="$q.platform.is.mobile"
    ></reading-multiple-mobile>
  </q-page>
</template>

<script>
import readingMultiplePc from "../components/reading/readingMultiplePc";
import readingMultipleMobile from "../components/reading/readingMultipleMobile";
import { ref, onMounted } from "vue";
export default {
  components: {
    readingMultiplePc,
    readingMultipleMobile
  },
  setup(props, { emit }) {
    // เปิดปุ่มคำสั่งกับตัวช่วย
    const isHasHelp = ref(true);
    const isHasInstruction = ref(true);

    onMounted(() => {
      if (isHasHelp.value) {
        emit("isShowButtonHelp");
      }

      if (isHasInstruction.value) {
        emit("isShowButtonInstruction");
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.bg-reading {
  background-image: url("../../public/images/reading/bg-reading.png");
  background-size: cover;
}
</style>
