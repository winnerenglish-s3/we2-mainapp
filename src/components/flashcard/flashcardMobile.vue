<template>
  <div class="box-container-main bg-white">
    <!-- Self Learning -->
    <div v-if="!isSynchronize">
      <div
        @click="!isShowDetails ? openDialog(index) : null"
        v-ripple
        class="relative-position row cursor-pointer bg-white q-mb-xs"
        v-for="(item, index) in vocabDataList"
        :key="index"
      >
        <div class="col-3" style="width: 100px">
          <q-img :src="item.imageSentenceUrl"></q-img>
        </div>
        <div class="col self-center q-px-md">
          <span style="font-size: max(3vw, 24px)"> {{ item.vocab }}</span>
          <span class="relative-position q-mx-sm" style="font-size: max(2vw, 14px)"
            >(v.)</span
          >
        </div>
        <div class="col-1 self-center">
          <q-icon name="fas fa-chevron-right" class="text-grey-5" size="24px"></q-icon>
        </div>
      </div>
    </div>

    <!-- Synchronize -->
    <div v-else>
      <div class="row">
        <div class="col-12 q-pa-md" align="center">
          <q-img
            style="max-width: 300px; width: 100%"
            src="../../../public/images/flashcard/draft-img-flashcard.png"
          ></q-img>
        </div>
        <div class="col-12 q-pa-md f18" align="center">
          <span class="f36">attack</span>
          <span class="q-mx-sm">(v.)</span>
          <br />
          <div class="q-my-md">
            <span>อะ-แทค</span>
          </div>
          <div>
            <span>โจมตี, รุกราน, บุก</span>
          </div>
        </div>
      </div>
    </div>
    <!-- Dialog For Self Learning -->
    <q-dialog
      maximized
      v-model="showDialog"
      transition-show="slide-left"
      transition-hide="slide-right"
    >
      <q-card class="shadow-0">
        <q-card-section class="no-padding">
          <div class="box-dialog q-pa-md" style="font-size: max(2.3vw, 15px)">
            <div class="row">
              <div class="col self-center">
                <span
                  ><span style="font-size: max(5vw, 24px); line-height: 0">{{
                    vocabDataList[currentFlashcardIndex].vocab
                  }}</span>
                  <span
                    class="relative-position q-mx-sm"
                    style="font-size: max(2vw, 12px)"
                    >({{ vocabDataList[currentFlashcardIndex].wordingType }})</span
                  ></span
                >
              </div>
              <div class="col" align="right">
                <q-btn
                  round
                  class="bg-warning"
                  :class="
                    !vocabDataList[currentFlashcardIndex].soundVocabUrl
                      ? 'invisible'
                      : null
                  "
                  @click="
                    $emit('playSound', vocabDataList[currentFlashcardIndex].soundVocabUrl)
                  "
                >
                  <q-icon name="fas fa-volume-up"></q-icon
                ></q-btn>
                <q-btn
                  round
                  class="q-ml-sm bg-warning"
                  :class="
                    !vocabDataList[currentFlashcardIndex].soundSpellUrl
                      ? 'invisible'
                      : null
                  "
                  @click="
                    $emit('playSound', vocabDataList[currentFlashcardIndex].soundSpellUrl)
                  "
                >
                  <q-icon name="fas fa-volume-up"></q-icon>
                </q-btn>
              </div>
            </div>
            <div class="q-mt-sm">
              <span v-html="vocabDataList[currentFlashcardIndex].readingWord"></span>
            </div>
            <div class="q-mt-md">
              <span v-html="vocabDataList[currentFlashcardIndex].meaning"> </span>
            </div>
            <div align="center" class="q-pa-md q-my-md">
              <div
                class=""
                style="
                  max-width: 350px;
                  width: 50%;
                  border: 2px solid #752123;
                  background-color: #752123;
                "
              >
                <q-img
                  :src="vocabDataList[currentFlashcardIndex].imageSentenceUrl"
                ></q-img>
              </div>
            </div>
            <div class="q-mt-md row q-py-sm">
              <div class="col">
                <span v-html="vocabDataList[currentFlashcardIndex].sentenceEng"> </span>
              </div>
              <div class="col-2" align="right" style="width: 70px">
                <q-btn
                  round
                  class="bg-warning"
                  :class="
                    !vocabDataList[currentFlashcardIndex].soundSentenceUrl
                      ? 'invisible'
                      : null
                  "
                  @click="
                    $emit(
                      'playSound',
                      vocabDataList[currentFlashcardIndex].soundSentenceUrl
                    )
                  "
                >
                  <q-icon name="fas fa-volume-up"></q-icon>
                </q-btn>
              </div>
            </div>
            <div class="q-mt-md">
              <span v-html="vocabDataList[currentFlashcardIndex].sentenceTh"> </span>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { computed, ref } from "vue";
export default {
  props: ["vocabDataList", "isSynchronize", "backToPage"],

  setup(props, { emit }) {
    const isShowDetails = ref(false);
    const currentFlashcardIndex = ref(0);

    const showDialog = computed(() => {
      if (props.backToPage) {
        isShowDetails.value = false;
        return false;
      } else {
        if (isShowDetails.value) {
          return true;
        } else {
          return false;
        }
      }
    });

    const openDialog = (index) => {
      isShowDetails.value = true;
      currentFlashcardIndex.value = index;
      emit("sendBackPopup");
    };

    return {
      isShowDetails: isShowDetails,
      showDialog: showDialog,
      openDialog: openDialog,
      currentFlashcardIndex: currentFlashcardIndex,
    };
  },
};
</script>

<style lang="scss" scoped>
.box-dialog {
  margin-top: 50px;
}
</style>
