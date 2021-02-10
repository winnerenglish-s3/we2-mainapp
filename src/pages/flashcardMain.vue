<template>
  <q-page :class="`bg-theme-${themeSync}`">
    <div class="col-12 self-start">
      <app-bar
        :isShowDialogFlashcard="isShowDialogFlashcard"
        @showDialogFlashcard="isShowDialogFlashcard = false"
      ></app-bar>
    </div>

    <div class="absolute-center" v-if="!isLoadPractice">
      <q-spinner-facebook color="light-blue" size="100px" />
    </div>

    <flashcard-pc
      :vocabDataList="vocabDataList"
      :themeSync="themeSync"
      @playSound="(val) => playSound(val)"
      v-if="$q.platform.is.desktop && isLoadPractice"
    ></flashcard-pc>

    <flashcard-mobile
      :vocabDataList="vocabDataList"
      v-if="$q.platform.is.mobile && isLoadPractice"
      @playSound="(val) => playSound(val)"
      :isShowDialogFlashcard="isShowDialogFlashcard"
      @showDialogFlashcard="isShowDialogFlashcard = true"
    ></flashcard-mobile>
  </q-page>
</template>

<script>
import flashcardPc from "../components/flashcard/flashcardPc";
import flashcardMobile from "../components/flashcard/flashcardMobile";
import { db } from "src/router";
import { onMounted, ref, computed } from "vue";
import axios from "axios";
import { useQuasar } from "quasar";
import { useRouter, useRoute } from "vue-router";
import appBar from "../components/app-bar";
export default {
  components: {
    flashcardPc,
    flashcardMobile,
    appBar,
  },
  props: {
    themeSync: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { emit }) {
    // Initial
    const $q = useQuasar();
    const router = useRouter();
    const route = useRoute();

    const flashcardList = ref([]);
    const isLoadPractice = ref(false);

    // โหลดข้อมูล Flashcard
    const loadFlashcard = async () => {
      const apiURL =
        "https://us-central1-winnerenglish2-e0f1b.cloudfunctions.net/wfunctions/getFlashcard";

      const postData = {
        practiceListId: route.params.practiceListId,
      };

      const response = await axios.post(apiURL, postData);
      flashcardList.value = response.data;
      isLoadPractice.value = true;
    };

    // ส่งข้อมูลเข้าไปที่ Component Vocab
    const vocabDataList = computed(() => {
      let temp = "";

      if (props.isSynchronize) {
        temp = flashcardList.value.filter(
          (x) => x.id == props.synchronizeData.practiceId
        )[0];
      } else {
        temp = flashcardList.value;
      }

      return temp;
    });

    // Play sound
    const playSound = (url) => {
      let audio = new Audio(url);
      audio.play();
    };

    // Close Flashcard Dialog
    const isShowDialogFlashcard = ref(false);
    // const showDialogFlashcard = () => {
    //   isShowDialogFlashcard.value = true;
    // };

    const closeDialogFlashcard = () => {
      isShowDialogFlashcard.value = false;
    };

    // เรียกใช้งาน Function
    onMounted(loadFlashcard);

    return {
      flashcardList,
      isLoadPractice,
      vocabDataList,
      playSound,
      isShowDialogFlashcard,
      closeDialogFlashcard,
    };
  },
};
</script>

<style lang="scss" scoped>
.bg-theme-1 {
  background-image: url("../../public/images/flashcard/flashcard-theme-1.png");
  background-size: cover;
  background-position: center;
}

.bg-theme-2 {
  background-image: url("../../public/images/flashcard/flashcard-theme-2.png");
  background-size: cover;
  background-position: center;
}
</style>
