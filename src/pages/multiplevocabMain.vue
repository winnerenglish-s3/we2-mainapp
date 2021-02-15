<template>
  <q-page class="bg-multiplevocab">
    <div>
      <app-bar
        :isHasHelp="isHasHelp"
        :isHasInstruction="isHasInstruction"
        :instructionData="instructionData"
      ></app-bar>
    </div>

    <div class="absolute-center" v-if="!isLoadPractice">
      <q-spinner color="primary" size="100px" />
    </div>

    <multiplevocab-pc
      :showQuestion="showQuestion"
      :showChoices="showChoices"
      :isCorrectAnswer="isCorrectAnswer"
      :extraVocabList="extraVocabList"
      :currentQuestion="currentQuestion"
      :totalQuestion="totalQuestion"
      :totalStar="totalStar"
      :practiceTime="practiceTime"
      :isPracticeTimeout="isPracticeTimeout"
      :themeSync="themeSync"
      @sendAnswer="checkAnswer"
      @nextQuestion="nextQuestion"
      @finishPractice="(val) => (isFinishPractice = true)"
      v-if="$q.platform.is.desktop && isLoadPractice"
      class="box-container-main"
    ></multiplevocab-pc>

    <multiplevocab-mobile
      :showQuestion="showQuestion"
      :showChoices="showChoices"
      :isCorrectAnswer="isCorrectAnswer"
      :extraVocabList="extraVocabList"
      :currentQuestion="currentQuestion"
      :totalQuestion="totalQuestion"
      :totalStar="totalStar"
      :practiceTime="practiceTime"
      :isPracticeTimeout="isPracticeTimeout"
      :themeSync="themeSync"
      @sendAnswer="checkAnswer"
      @nextQuestion="nextQuestion"
      @finishPractice="(val) => (isFinishPractice = true)"
      v-if="$q.platform.is.mobile && isLoadPractice"
    ></multiplevocab-mobile>

    <!-- Help Popup -->
    <q-dialog maximized v-model="isShowDialogHelp" persistent>
      <q-card class="transparent shadow-0">
        <q-card-section class="fit">
          <div class="absolute-center box-extravocab q-pa-md">
            <q-tabs
              v-model="tab"
              shrink
              dense
              class="box-header-extravocab"
              indicator-color="warning"
              align="justify"
            >
              <q-tab class="q-pa-sm col-6" name="vocab" label="ตัวช่วย" />
              <q-tab class="q-pa-sm col-6" name="extra" label="คำศัพท์เสริม" />
            </q-tabs>
            <div class="bg-white">
              <q-tab-panels v-model="tab" animated>
                <q-tab-panel class="no-padding" name="vocab">
                  <div class="row">
                    <div
                      :class="$q.platform.is.desktop ? 'col-6' : 'col-12'"
                      :style="index % 2 == 0 ? 'border-right:1px solid #C4C4C4' : ''"
                      style="border-bottom: 1px solid #c4c4c4"
                      v-for="(item, index) in vocabList"
                      :key="index"
                    >
                      <div class="q-pa-sm">
                        <span>{{ item.vocab }}</span>
                        <br />
                        <span>{{ item.meaning }}</span>
                      </div>
                    </div>
                  </div>
                </q-tab-panel>

                <q-tab-panel class="no-padding" name="extra">
                  <div class="row">
                    <div
                      :class="$q.platform.is.desktop ? 'col-6' : 'col-12'"
                      :style="index % 2 == 0 ? 'border-right:1px solid #C4C4C4;' : ''"
                      style="border-bottom: 1px solid #c4c4c4"
                      v-for="(item, index) in extravocabList"
                      :key="index"
                    >
                      <div class="q-pa-sm">
                        <span>{{ item.vocab }}</span>
                        <br />
                        <span>{{ item.meaning }}</span>
                      </div>
                    </div>
                  </div>
                </q-tab-panel>
              </q-tab-panels>
            </div>
            <div
              v-if="$q.platform.is.desktop"
              align="center"
              class="q-pa-md bg-white"
              style="border-radius: 0px 0px 7px 7px"
            >
              <q-img
                @click="closeHelpBtn()"
                class="cursor-pointer"
                style="width: 200px"
                src="../../public/images/close-help-btn-pc.png"
              ></q-img>
            </div>
            <div v-if="$q.platform.is.mobile">
              <q-img
                @click="closeHelpBtn()"
                class="cursor-pointer"
                src="../../public/images/close-help-btn-mobile.png"
              ></q-img>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <finish-practice-dialog :isFinishPractice="isFinishPractice"></finish-practice-dialog>
  </q-page>
</template>

<script>
import multiplevocabPc from "../components/multiplevocab/multiplevocabPc";
import multiplevocabMobile from "../components/multiplevocab/multiplevocabMobile";
import appBar from "../components/app-bar";
import instructionDialog from "../components/instructionDialog";
import finishPracticeDialog from "../components/finishPracticeDialog";
import { reactive, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useQuasar } from "quasar";
import axios from "axios";
import { db } from "src/router";
export default {
  components: {
    multiplevocabPc,
    multiplevocabMobile,
    appBar,
    instructionDialog,
    finishPracticeDialog,
  },
  props: {
    isStartPractice: {
      type: Boolean,
      default: () => true,
    },
    isShowDialogHelp: {
      type: Boolean,
      default: () => false,
    },
    themeSync: {
      type: Number,
      default: () => false,
    },
  },

  setup(props) {
    // Initial Data
    const isLoadPractice = ref(false);
    const route = useRoute();
    const router = useRouter();

    // Initial Practice Data
    const totalQuestion = ref(0);
    const totalStar = ref(2);
    const currentQuestion = ref(0);
    const showQuestion = ref("");
    const showChoices = ref([]);
    const isCorrectAnswer = ref(false);
    const questionList = ref([]);
    const isFinishPractice = ref(false);
    const extraVocabList = ref([]);
    const isHasHelp = ref(true);
    const isHasInstruction = ref(true);
    const instructionData = ref({
      eng: "Choose the best answer to fill in the blank.",
      th: "เลือกคำตอบที่เหมาะสมที่สุดเพื่อเติมลงในช่องว่าง",
    });

    // โหลดข้อมูลแบบฝึกหัด
    const loadPractice = async () => {
      let multipleList = [];

      let practiceListId = route.params.practiceListId;

      let getData = await db.collection("practiceList").doc(practiceListId).get();

      totalQuestion.value = getData.data().numOfPractice;

      try {
        const apiURL =
          "https://us-central1-winnerenglish2-e0f1b.cloudfunctions.net/wfunctions/getFlashcard";

        const postData = {
          practiceListId: practiceListId,
        };

        const response = await axios.post(apiURL, postData);

        multipleList = response.data;

        let setExtraVocab = response.data;

        let setPracticeList = [...multipleList];

        setExtraVocab = setExtraVocab.map((x) => x.extraVocab).filter((x) => x.length);

        let tempExtra = [];

        setExtraVocab.forEach((res) => {
          tempExtra.push(...res);
        });

        extraVocabList.value = tempExtra;

        // Random Choices
        setPracticeList = setPracticeList.map((x) => {
          let choices = x.choices.sort(() => Math.random() - 0.5);
          x.choices = choices;

          return x;
        });

        setPracticeList = setPracticeList.sort(() => Math.random() - 0.5);
        setPracticeList = setPracticeList.slice(0, totalQuestion.value);

        questionList.value = setPracticeList;

        showQuestion.value = questionList.value[currentQuestion.value].question;
        showChoices.value = questionList.value[currentQuestion.value].choices;

        isLoadPractice.value = true;
      } catch (err) {
        console.log(`${error} Type Multiple Vocab`);
      }
    };

    // Check Answer
    const checkAnswer = (index) => {
      if (questionList.value[currentQuestion.value].correctAnswer == index) {
        isCorrectAnswer.value = true;
      } else {
        isCorrectAnswer.value = false;
      }
    };

    // Next Question
    const nextQuestion = () => {
      currentQuestion.value++;
      showQuestion.value = questionList.value[currentQuestion.value].question;
      showChoices.value = questionList.value[currentQuestion.value].choices;
    };

    // Mounted Load Practice
    onMounted(loadPractice);

    return {
      totalQuestion,
      totalStar,
      questionList,
      extraVocabList,
      showQuestion,
      showChoices,
      isCorrectAnswer,
      currentQuestion,
      checkAnswer,
      nextQuestion,
      isFinishPractice,
      isLoadPractice,
      instructionData,
      isHasHelp,
      isHasInstruction,
    };
  },
  data() {
    return {
      tab: "vocab",
      instruction: {
        th: "เลือกคำต้องที่ถูกต้อง",
        en: "Choose the best correct answer",
      },
      vocabList: [
        {
          vocab: "test",
          meaning: "ทดสอบ",
        },
        {
          vocab: "test",
          meaning: "ทดสอบ",
        },
        {
          vocab: "test",
          meaning: "ทดสอบ",
        },
        {
          vocab: "test",
          meaning: "ทดสอบ",
        },
        {
          vocab: "test",
          meaning: "ทดสอบ",
        },
        {
          vocab: "test",
          meaning: "ทดสอบ",
        },
        {
          vocab: "test",
          meaning: "ทดสอบ",
        },
        {
          vocab: "test",
          meaning: "ทดสอบ",
        },
        {
          vocab: "test",
          meaning: "ทดสอบ",
        },
        {
          vocab: "test",
          meaning: "ทดสอบ",
        },
      ],

      isHasHelp: true,
      isHasInstruction: true,
    };
  },

  mounted() {
    if (this.isHasHelp) {
      this.$emit("isShowButtonHelp");
    }

    if (this.isHasInstruction) {
      this.$emit("isShowButtonInstruction");
    }
  },
};
</script>

<style lang="scss" scoped>
.bg-multiplevocab {
  background-image: url("../../public/images/multiplevocab/bg-multivocab.png");
  background-attachment: fixed;
  background-size: cover;
  width: 100%;
}

.backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}

.box-instruction-pc {
  background-color: transparent;
  width: 80%;
  height: 45%;
  bottom: 5px;
  margin: auto;
  font-size: 16px;
  font-weight: bold;
  color: #000;
}

.box-instruction-mobile {
  background-color: transparent;
  width: 80%;
  height: 55%;
  bottom: 20px;
  margin: auto;
  font-size: 16px;
  font-weight: bold;
  color: #000;
}

.box-finish {
  background-color: transparent;
  width: 80%;
  height: 55%;
  bottom: 16px;
  margin: auto;
  font-size: 16px;
  color: #000;
}

.btn-start {
  background-image: url("../../public/images/btn-start.png");
  background-repeat: no-repeat;
  width: 200px;
  height: 40px;
}

.box-extravocab {
  max-width: 600px;
  min-width: 290px;
  width: 100%;
}

.box-header-extravocab {
  background-color: #9f220c;
  color: #f3ab14;
  border-radius: 7px 7px 0px 0px;
}

.header-extravocab-active {
  background-color: #9f220c;
}
</style>
