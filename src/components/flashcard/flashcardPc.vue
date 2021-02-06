<template>
  <div>
    <div class="row box-container-main">
      <div class="col-12 self-start relative-position q-pt-lg" align="center">
        <div>
          <q-img
            style="max-width: 800px; width: 50%"
            src="../../../public/images/flashcard/label-flashcard.png"
          ></q-img>
        </div>
      </div>
      <div class="col-12 self-start">
        <!-- Self Learning -->
        <div class="box-container-flashcard q-pa-md" v-if="!isSynchronize">
          <div class="row justify-center q-pa-lg">
            <div
              class="col-3 q-pa-sm"
              align="center"
              v-for="(item, index) in vocabDataList"
              :key="index"
            >
              <q-img
                @click="openFlashcardDetails(index)"
                class="cursor-pointer"
                style="max-width: 350px; width: 100%"
                src="../../../public/images/flashcard/card-flashcard.png"
              >
                <div class="absolute-center transparent text-black">
                  <div align="center">
                    <div>
                      <span style="font-size: max(2vw, 16px); line-height: 0">{{
                        item.vocab
                      }}</span>
                    </div>
                    <div class="q-mt-sm">
                      <span style="font-size: max(0.5vw, 14px); line-height: 0">{{
                        `(${item.meaning})`
                      }}</span>
                    </div>
                  </div>
                </div>
              </q-img>
            </div>
          </div>
        </div>

        <!-- Synchronize -->
        <div v-else align="center" class="q-pa-lg q-my-md">
          <div
            class="box-dialog-details shadow-1"
            :style="`border-color:${colorTheme[themeSync - 1].hex}`"
            v-if="vocabDataList"
          >
            <div class="row q-pa-xl">
              <div class="col-4 q-pa-md q-py-lg" style="width: 300px">
                <q-img
                  contain
                  src="../../../public/images/flashcard/draft-img-flashcard.png"
                ></q-img>
              </div>
              <div class="col self-center">
                <span style="font-size: max(3vw, 16px)">{{
                  vocabDataList.vocabulary
                }}</span>
                <span style="font-size: max(1.2vw, 16px)" class="q-mx-md"
                  >({{ vocabDataList.partOfSpeech }})</span
                >
                <br />
                <span style="font-size: max(1.2vw, 16px)">
                  {{ vocabDataList.meaning }}
                </span>
                <br />
                <span style="font-size: max(1.2vw, 16px)">
                  {{ vocabDataList.meaning }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Self Learning -->
      <div
        class="col-12 row relative-position q-pb-md"
        align="center"
        v-if="!isSynchronize"
      >
        <q-img
          class="cursor-pointer"
          style="max-width: 200px; width: 15%; margin: auto"
          src="../../../public/images/flashcard/btn-back.png"
        ></q-img>
      </div>
    </div>

    <!-- Dialog For Self Learning -->
    <q-dialog maximized v-model="isShowDetails">
      <q-card class="transparent shadow-0" v-if="!isSynchronize">
        <q-card-section class="fit">
          <div class="absolute-center box-dialog-details">
            <div class="row">
              <div class="col-3 q-pa-md">
                <q-img
                  contain
                  src="../../../public/images/flashcard/draft-img-flashcard.png"
                ></q-img>
              </div>
              <div class="col row q-pr-md q-py-lg" style="font-size: 16px">
                <div class="col-3 q-px-sm" align="right" style="width: 120px">
                  <q-btn
                    round
                    class="bg-warning"
                    :class="
                      !vocabDataList[currentFlashcardIndex].soundVocabUrl
                        ? 'invisible'
                        : null
                    "
                    @click="
                      $emit(
                        'playSound',
                        vocabDataList[currentFlashcardIndex].soundVocabUrl
                      )
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
                      $emit(
                        'playSound',
                        vocabDataList[currentFlashcardIndex].soundSpellUrl
                      )
                    "
                  >
                    <q-icon name="fas fa-volume-up"></q-icon>
                  </q-btn>
                </div>
                <div class="col q-pr-xl q-pa-sm">
                  <div class="q-px-sm">
                    <span
                      ><span style="font-size: 32px; line-height: 0">{{
                        vocabDataList[currentFlashcardIndex].vocab
                      }}</span>
                      ({{ vocabDataList[currentFlashcardIndex].wordingType }})</span
                    >
                  </div>
                  <div class="q-mt-xs q-px-sm">
                    <span> {{ vocabDataList[currentFlashcardIndex].readingWord }}</span>
                  </div>
                  <div class="q-mt-xs q-px-sm">
                    <span>{{ vocabDataList[currentFlashcardIndex].meaning }}</span>
                  </div>
                </div>

                <div class="col-12">
                  <div class="row q-my-lg">
                    <div class="col-3 q-px-sm" align="right" style="width: 120px">
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
                    <div class="col q-pr-xl q-pa-xs">
                      <div class="q-px-sm">
                        <span
                          v-html="vocabDataList[currentFlashcardIndex].sentenceEng || '-'"
                        >
                        </span>
                      </div>
                      <div class="q-mt-xs q-px-sm">
                        <span
                          v-html="vocabDataList[currentFlashcardIndex].sentenceTh || '-'"
                        >
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <hr />
                    <div class="row">
                      <div
                        class="col-6 q-mt-xs"
                        v-for="(item, index) in vocabDataList[currentFlashcardIndex]
                          .extraVocab"
                      >
                        {{ `${item.vocab} (${item.partOfSpeech}) ${item.meaning}` }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 q-pa-md" align="center">
                <q-img
                  @click="isShowDetails = false"
                  class="cursor-pointer"
                  style="max-width: 200px"
                  src="../../../public/images/close-help-btn-pc.png"
                ></q-img>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import getColorTheme from "../../../public/themeColor.json";
import { ref } from "vue";
export default {
  props: ["vocabDataList", "isSynchronize", "themeSync"],

  setup(props) {
    const colorTheme = ref(getColorTheme);
    const currentFlashcardIndex = ref(0);
    const isShowDetails = ref(false);

    // open flashcard details card
    const openFlashcardDetails = (index) => {
      isShowDetails.value = true;
      currentFlashcardIndex.value = index;
    };

    return {
      colorTheme: colorTheme,
      currentFlashcardIndex: currentFlashcardIndex,
      isShowDetails: isShowDetails,
      openFlashcardDetails: openFlashcardDetails,
    };
  },
};
</script>

<style lang="scss" scoped>
.box-header-flashcard {
  padding-top: 25px;
}

.box-dialog-details {
  max-width: 800px;
  width: 100%;
  background-color: #ffffff;
  border-radius: 10px;
  border-width: 5px;
  border-style: solid;
  border-color: #ffffff;
}
</style>
