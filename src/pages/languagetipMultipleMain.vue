<template>
  <q-page class="bg-language">
    <languagetip-pc
      :themeSync="themeSync"
      class="box-container-main"
      v-if="$q.platform.is.desktop"
    ></languagetip-pc>
    <languagetip-mobile
      :themeSync="themeSync"
      v-if="$q.platform.is.mobile"
    ></languagetip-mobile>
  </q-page>
</template>

<script>
import languagetipPc from "../components/languagetip/languagetipMultiplePc";
import languagetipMobile from "../components/languagetip/languagetipMultipleMobile";
import { ref, onMounted } from "vue";
export default {
  components: {
    languagetipPc,
    languagetipMobile
  },
  props: {
    themeSync: {
      type: Number,
      default: 0
    }
  },
  setup(props, { emit }) {
    // เปิดใช้งานปุ่ม คำสั่ง และ ปุ่มตัวช่วย
    const isHasHelp = ref(true);
    const isHasInstruction = ref(true);

    onMounted(() => {
      if (isHasHelp) {
        emit("isShowButtonHelp");
      }

      if (isHasInstruction) {
        emit("isShowButtonInstruction");
      }
    });

    //
  }
};
</script>

<style lang="scss" scoped>
.bg-language {
  background-image: url("../../public/images/languagetip/bg-languagetip.png");
  background-size: cover;
  background-attachment: fixed;
  width: 100%;
}
</style>
