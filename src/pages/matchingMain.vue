<template>
  <q-page class="bg-matching">
    <matching-pc
      :themeSync="themeSync"
      :totalQuestion="state.totalQuestion"
      :totalStar="state.totalStar"
      :currentQuestion="state.currentQuestion"
      :numberOfPractice="state.numberOfPractice"
      :practiceTime="state.practiceTime"
      :isCorrectAnswer="state.isCorrectAnswer"
      class="box-container-main"
      v-if="$q.platform.is.desktop"
    ></matching-pc>
    <matching-mobile
      :themeSync="themeSync"
      :totalQuestion="state.totalQuestion"
      :totalStar="state.totalStar"
      :currentQuestion="state.currentQuestion"
      :numberOfPractice="state.numberOfPractice"
      :practiceTime="state.practiceTime"
      :isCorrectAnswer="state.isCorrectAnswer"
      v-if="$q.platform.is.mobile"
    ></matching-mobile>
  </q-page>
</template>

<script>
import matchingPc from "../components/matching/matchingPc";
import matchingMobile from "../components/matching/matchingMobile";
import { reactive, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useQuasar } from "quasar";
export default {
  props: {
    themeSync: {
      type: Number,
      require: true,
    },
  },
  components: {
    matchingPc,
    matchingMobile,
  },
  setup(props, { emit }) {
    // initial
    const $q = useQuasar();
    const route = useRoute();
    const router = useRouter();

    // State Practice Data
    const state = reactive({
      totalStar: 0,
      totalQuestion: 7,
      currentQuestion: 0,
      numberOfPractice: 0,
      isCorrectAnswer: false,
      practiceTime: 10,
      isPracticeTimeout: false,
      funcPracticeTime: "",
    });

    // TODO : แสดงปุ่มตัวช่วยถ้ามี
    const isHasHelp = ref(true);

    // TODO : แสดงปุ่มคำสั่งถ้ามี
    const isHasInstruction = ref(true);

    // TODO : เช็คโหลดข้อมูลแบบฝึกหัดถ้าเสร็จแล้วจะเป็น True
    const isLoadPractice = ref(false);

    onMounted(() => {
      if (isHasHelp) {
        emit("isShowButtonHelp");
      }

      if (isHasInstruction) {
        emit("isShowButtonInstruction");
      }
    });

    return { state, isHasHelp, isHasInstruction, isLoadPractice };
  },
};
</script>

<style lang="scss" scoped>
.bg-matching {
  background-image: url("../../public/images/multiplevocab/bg-multivocab.png");
  background-size: cover;
  background-attachment: fixed;
  width: 100%;
}
</style>
