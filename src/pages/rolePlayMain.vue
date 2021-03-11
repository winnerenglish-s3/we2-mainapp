<template>
  <q-page class="bg-roleplay">
    <app-bar
      :isShowPause="true"
      :themeSync="themeSync"
      :instructionData="instructionData"
    ></app-bar>
  </q-page>
</template>

<script>
import appBar from "../components/app-bar";
import { useQuasar } from "quasar";
import { ref, onMounted, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
export default {
  components: {
    appBar,
  },
  props: {
    themeSync: {
      type: Number,
      default: 0,
    },
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.bg-roleplay {
  background-image: url("../../public/images/bg-character.png");
}
</style>
