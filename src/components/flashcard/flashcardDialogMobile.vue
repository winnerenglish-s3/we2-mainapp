<template>
  <div>
    <q-dialog
      maximized
      :value="true"
      transition-show="slide-left"
      transition-hide="slide-right"
    >
      <q-card class="shadow-0">
        <q-card-section class="no-padding">
          <div class="box-dialog q-pa-md" style="font-size: max(2.3vw, 15px)">
            <div class="row">
              <div class="col self-center">
                <span
                  ><span style="font-size: max(5vw, 24px); line-height: 0">
                    {{ vocabDataList[currentFlashcardIndex].vocab }}
                  </span>
                  <span
                    class="relative-position q-mx-sm"
                    style="font-size: max(2vw, 12px)"
                    >({{
                      vocabDataList[currentFlashcardIndex].partOfSpeech.partOfSpeech
                    }})</span
                  ></span
                >
              </div>
              <div style="width: 100px" align="right">
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
        <q-card-actions align="center">
          <q-btn label="back" @click="showFlashcardDetails = false"></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
