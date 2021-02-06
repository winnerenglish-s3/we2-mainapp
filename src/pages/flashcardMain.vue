<template>
  <q-page :class="`bg-theme-${themeSync}`">
    <div class="absolute-center" v-if="!isLoadPractice">
      <q-spinner-facebook color="light-blue" size="100px" />
    </div>
    <flashcard-pc
      :isSynchronize="isSynchronize"
      :vocabDataList="vocabDataList"
      :themeSync="themeSync"
      @playSound="(val) => playSound(val)"
      v-if="$q.platform.is.desktop && isLoadPractice"
    ></flashcard-pc>
    <flashcard-mobile
      :isSynchronize="isSynchronize"
      :vocabDataList="vocabDataList"
      :backToPage="backToPage"
      v-if="$q.platform.is.mobile && isLoadPractice"
      @playSound="(val) => playSound(val)"
      @sendBackPopup="sendBackPopup()"
    ></flashcard-mobile>
  </q-page>
</template>

<script>
import flashcardPc from "../components/flashcard/flashcardPc";
import flashcardMobile from "../components/flashcard/flashcardMobile";
import { db } from "src/router";
import { onMounted, ref, computed } from "vue";
import axios from "axios";

export default {
  components: {
    flashcardPc,
    flashcardMobile,
  },
  props: {
    backToPage: {
      type: Boolean,
      default: () => false,
    },
    themeSync: {
      type: Number,
      default: 0,
    },
    isSynchronize: {
      type: Boolean,
      default: () => false,
    },
    synchronizeData: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { emit }) {
    const flashcardList = ref([]);
    const isLoadPractice = ref(false);

    // โหลดข้อมูล Flashcard
    const loadFlashcard = async () => {
      const apiURL =
        "http://localhost:5000/winnerenglish2-e0f1b/us-central1/wfunctions/getFlashcard";
      const postData = {
        practiceListId: "beTFT3GzbERuWavuDBka",
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

    // เรียกใช้งาน Function
    onMounted(loadFlashcard);

    // Other Function ---------------
    // For Mobile
    const sendBackPopup = () => {
      emit("sendBackPopup");
    };

    return {
      flashcardList: flashcardList,
      isLoadPractice: isLoadPractice,
      vocabDataList: vocabDataList,
      sendBackPopup: sendBackPopup,
      playSound: playSound,
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
