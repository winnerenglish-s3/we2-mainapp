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
      :isSynchronize="isSynchronize"
    ></flashcard-pc>

    <flashcard-mobile
      :vocabDataList="vocabDataList"
      v-if="$q.platform.is.mobile && isLoadPractice"
      @playSound="(val) => playSound(val)"
      :isShowDialogFlashcard="isShowDialogFlashcard"
      @showDialogFlashcard="isShowDialogFlashcard = true"
      :isSynchronize="isSynchronize"
    ></flashcard-mobile>
  </q-page>
</template>

<script>
import flashcardPc from "../components/flashcard/flashcardPc";
import flashcardMobile from "../components/flashcard/flashcardMobile";
import { onMounted, ref } from "vue";
import axios from "axios";
import { useQuasar } from "quasar";
import { useRouter, useRoute } from "vue-router";
import appBar from "../components/app-bar";
import { db } from "src/router";
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
  setup() {
    // Initial
    const $q = useQuasar();
    const router = useRouter();
    const route = useRoute();

    const flashcardList = ref([]);
    const isLoadPractice = ref(false);

    // สถานะ synchronize
    const isSynchronize = ref(false);
    // ข้อมูลที่ได้จาก synchonize
    const synchronizeData = ref([]);

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
    const vocabDataList = ref([]);

    // Play sound
    const playSound = (url) => {
      let audio = new Audio(url);
      audio.play();
    };

    // SnapSynchronize Data
    const snapSynchronize = () => {
      db.collection("synchronize")
        .doc("test")
        .onSnapshot((doc) => {
          synchronizeData.value = doc.data();
          if (doc.data().mode == "control") {
            isSynchronize.value = true;
            vocabDataList.value = flashcardList.value.filter(
              (x) => x.id == doc.data().practiceId
            )[0];
            isShowDialogFlashcard.value = false;
          } else {
            isSynchronize.value = false;
            vocabDataList.value = flashcardList.value;
          }
        });
    };

    // Close Flashcard Dialog
    const isShowDialogFlashcard = ref(false);
    const closeDialogFlashcard = () => {
      isShowDialogFlashcard.value = false;
    };

    // เรียกใช้งาน Function
    onMounted(async () => {
      await loadFlashcard();
      snapSynchronize();
    });

    return {
      flashcardList,
      isLoadPractice,
      vocabDataList,
      playSound,
      isShowDialogFlashcard,
      closeDialogFlashcard,
      synchronizeData,
      isSynchronize,
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
