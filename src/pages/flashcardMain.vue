<template>
  <q-page :class="`bg-theme-${themeSync}`">
    <div class="absolute-center" v-if="!isLoadPractice">
      <q-spinner-facebook color="light-blue" size="100px" />
    </div>
    <flashcard-pc
      :isSynchronize="isSynchronize"
      :vocabDataList="vocabDataList"
      :themeSync="themeSync"
      v-if="$q.platform.is.desktop && isLoadPractice"
    ></flashcard-pc>
    <flashcard-mobile
      :isSynchronize="isSynchronize"
      :vocabDataList="vocabDataList"
      :backToPage="backToPage"
      v-if="$q.platform.is.mobile && isLoadPractice"
      @sendBackPopup="sendBackPopup()"
    ></flashcard-mobile>
  </q-page>
</template>

<script>
import flashcardPc from "../components/flashcard/flashcardPc";
import flashcardMobile from "../components/flashcard/flashcardMobile";
import { db } from "src/router";
import { onMounted, ref, computed } from "vue";
export default {
  components: {
    flashcardPc,
    flashcardMobile
  },
  props: {
    backToPage: {
      type: Boolean,
      default: () => false
    },
    themeSync: {
      type: Number,
      default: 0
    },
    isSynchronize: {
      type: Boolean,
      default: () => false
    },
    synchronizeData: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, { emit }) {
    const flashcardList = ref([]);
    const isLoadPractice = ref(false);

    // โหลดข้อมูล Flashcard
    const loadFlashcard = () => {
      db.collection("flashcard_test")
        .where("practiceListId", "==", "test")
        .get()
        .then(doc => {
          let temp = [];
          doc.forEach(res => {
            temp.push({ ...res.data(), id: res.id });
          });

          flashcardList.value = temp;
          isLoadPractice.value = true;
        });
    };

    // ส่งข้อมูลเข้าไปที่ Component Vocab
    const vocabDataList = computed(() => {
      let temp = "";

      if (props.isSynchronize) {
        temp = flashcardList.value.filter(
          x => x.id == props.synchronizeData.practiceId
        )[0];
      } else {
        temp = flashcardList.value;
      }

      return temp;
    });

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
      sendBackPopup: sendBackPopup
    };
  }
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
