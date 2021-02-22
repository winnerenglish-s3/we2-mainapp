<template>
  <q-page class="bg-matching">
    <div>
      <app-bar :instructionData="instructionData"></app-bar>
    </div>

    <div class="absolute-center" v-if="!isLoadPractice">
      <q-spinner color="primary" size="100px" />
    </div>

    <matching-pc
      :themeSync="themeSync"
      :practiceData="practiceData"
      @callback-sendanswer=""
      @callback-nextquestion="funcSelectedPractice()"
      @callback-finishpractice="isFinishPractice = true"
      class="box-container-main"
      v-if="$q.platform.is.desktop && isLoadPractice"
    ></matching-pc>
    <matching-mobile
      :themeSync="themeSync"
      :practiceData="practiceData"
      @callback-sendanswer=""
      @callback-nextquestion="funcSelectedPractice()"
      @callback-finishpractice="isFinishPractice = true"
      v-if="$q.platform.is.mobile && isLoadPractice"
    ></matching-mobile>

    <!-- Help Popup -->
    <q-dialog maximized v-model="isShowDialogHelp" persistent>
      <q-card class="transparent shadow-0">
        <q-card-section class="fit">
          <div class="absolute-center box-extravocab q-pa-md">
            <q-tabs
              v-model="tabHelp"
              shrink
              dense
              class="box-header-extravocab"
              indicator-color="warning"
              align="justify"
            >
              <q-tab class="q-pa-sm col-6" name="vocab" label="ตัวช่วย" />
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
              </q-tab-panels>
            </div>
            <div
              v-if="$q.platform.is.desktop"
              align="center"
              class="q-pa-md bg-white"
              style="border-radius: 0px 0px 7px 7px"
            >
              <q-img
                fit="contain"
                v-close-popup
                class="cursor-pointer"
                style="width: 200px"
                src="../../public/images/close-help-btn-pc.png"
              ></q-img>
            </div>
            <div v-if="$q.platform.is.mobile">
              <q-img
                v-close-popup
                class="cursor-pointer"
                src="../../public/images/close-help-btn-mobile.png"
              ></q-img>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <instruction-dialog
      v-if="isLoadPractice"
      :isShowDialogInstruction="true"
      :en="instructionData.eng"
      :th="instructionData.th"
    ></instruction-dialog>

    <finish-practice-dialog :isFinishPractice="isFinishPractice"></finish-practice-dialog>
  </q-page>
</template>

<script>
import matchingPc from "../components/matching/matchingPc";
import matchingMobile from "../components/matching/matchingMobile";
import { reactive, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useQuasar } from "quasar";
import instructionDialog from "../components/instructionDialog";
import finishPracticeDialog from "../components/finishPracticeDialog";
import appBar from "../components/app-bar";
import axios from "axios";
import { db } from "src/router";
export default {
  props: {
    themeSync: {
      type: Number,
      require: true,
    },
    isShowDialogHelp: {
      type: Boolean,
      default: () => false,
    },
  },
  components: {
    appBar,
    matchingPc,
    matchingMobile,
    instructionDialog,
    finishPracticeDialog,
  },
  setup(props, { emit }) {
    // Initial Data
    const $q = useQuasar();
    const route = useRoute();
    const router = useRouter();

    // Initial Practice Data
    const tabHelp = ref("vocab");
    const questionList = ref([]);
    const answerList = ref([]);
    const dataQuestionList = ref([]);
    const dataAnswerList = ref([]);
    const isLoadPractice = ref(false);
    const instructionData = ref({
      eng: "Match the vocabulary word with its definition.",
      th: "จับคู่คำศัพท์กับความหมาย",
    });

    const practiceData = reactive({
      totalQuestion: 0,
      totalStar: 0,
      question: [],
      choices: [],
      currentQuestion: 0,
    });

    // Load Practice Data
    const funcLoadPractice = async () => {
      console.clear();

      try {
        let flashcardList = [];

        let getFlashId = await db
          .collection("practiceList")
          .doc(route.params.practiceListId)
          .get();

        practiceData.totalQuestion = getFlashId.data().numOfPractice;

        getFlashId = await db
          .collection("practiceList")
          .where("level", "==", getFlashId.data().level)
          .where("unit", "==", getFlashId.data().unit)
          .where("practiceType", "==", "flashcard")
          .where("status", "==", true)
          .get();

        const apiURL =
          "https://us-central1-winnerenglish2-e0f1b.cloudfunctions.net/wfunctions/getPracticeData";

        const postData = {
          practiceListId: getFlashId.docs[0].id,
        };

        const response = await axios.post(apiURL, postData);

        flashcardList = response.data;

        let setVocab = flashcardList;

        let randomData = setVocab.sort(() => Math.random() - 0.5);

        let setQuestion = randomData.map((x) => {
          return { vocab: x.vocab, meaning: x.meaning };
        });

        setQuestion = setQuestion.slice(0, practiceData.totalQuestion);

        questionList.value = setQuestion;

        let setAnswer = [...setQuestion];

        setAnswer = setAnswer.sort(() => Math.random() - 0.5);

        answerList.value = setAnswer;

        if ($q.platform.is.desktop) {
          await funcMatchingPc();
        } else {
          funcSelectedPractice(true);
        }

        isLoadPractice.value = true;
      } catch (err) {
        console.log(`${err} Type Matching`);
      }
    };

    // ----------------------------------------- Use Platform Desktop
    // Function : Set Question And Answer For Pc
    const funcMatchingPc = async () => {
      let setData = questionList.value;

      setData = setData.map((x) => x);

      let tempAnswer = [];
      let tempQuestion = [];

      // แปลงโจทย์คำตอบให้เป็น อย่างละ 3 Choices
      for (let i = 0; i < questionList.value.length; i++) {
        let currentAnswer = questionList.value[i];
        let randomAnswer = [...setData];

        randomAnswer = randomAnswer.sort(() => Math.random() - 0.5);

        let findIndexCurrentAnswer = randomAnswer
          .map((x) => x.vocab)
          .indexOf(currentAnswer.vocab);

        randomAnswer.splice(findIndexCurrentAnswer, 1);

        randomAnswer = randomAnswer.slice(0, 2);

        let setNewAnswer = [
          {
            vocab: currentAnswer.vocab,
            meaning: currentAnswer.meaning,
          },
        ];

        let setNewQuestion = [
          {
            vocab: currentAnswer.vocab,
            meaning: currentAnswer.meaning,
          },
        ];

        for (let i = 0; i < randomAnswer.length; i++) {
          let newData = {
            vocab: randomAnswer[i].vocab,
            meaning: randomAnswer[i].meaning,
          };

          let setQuestion = {
            vocab: randomAnswer[i].vocab,
            meaning: randomAnswer[i].meaning,
          };

          setNewAnswer.push(newData);

          setNewQuestion.push(setQuestion);
        }

        setNewQuestion = setNewQuestion.sort(() => Math.random() - 0.5);

        tempAnswer.push(setNewAnswer);
        tempQuestion.push(setNewQuestion);
      }

      dataAnswerList.value = [...tempAnswer];
      dataQuestionList.value = [...tempQuestion];

      await funcSelectedPractice(true);
    };
    // สุ่มคำจอบไม่ให้ตรงกับตำถาม
    const funcRandomPractuce = () => {
      dataAnswerList.value[practiceData.currentQuestion].sort(() => Math.random() - 0.5);

      let setAnswer = [...dataAnswerList.value[practiceData.currentQuestion]];

      let setQuestion = [...dataQuestionList.value[practiceData.currentQuestion]];

      let tempBoolean = [];
      let tempAnswer = [];
      let tempQuestion = [];

      for (let i = 0; i < setAnswer.length; i++) {
        if (setAnswer[i].vocab == setQuestion[i].vocab) {
          tempBoolean.push(true);
        } else {
          tempBoolean.push(false);
        }
        tempAnswer.push([setAnswer[i]]);
        tempQuestion.push([setQuestion[i]]);
      }

      if (tempBoolean.every((x) => x)) {
        funcRandomPractuce();
      }

      practiceData.choices = tempAnswer;
      practiceData.question = tempQuestion;
    };

    // เลือกแบบฝึกหัด
    const funcSelectedPractice = (firsttime) => {
      firsttime = firsttime || false;

      if (!firsttime) {
        practiceData.currentQuestion++;
      }

      if ($q.platform.is.desktop) {
        funcRandomPractuce();
      } else {
        practiceData.choices = answerList.value;
        practiceData.question = questionList.value;
      }
    };
    // ----------------------------------------- Use Platform Desktop

    // TODO : แสดงปุ่มตัวช่วยถ้ามี
    const isHasHelp = ref(true);

    // TODO : แสดงปุ่มคำสั่งถ้ามี
    const isHasInstruction = ref(true);

    const closeHelpBtn = () => {
      emit("closeHelp");
    };

    // TODO : แสดง Dialog จบแบบฝึกหัด
    const isFinishPractice = ref(false);

    onMounted(async () => {
      if (isHasHelp) {
        emit("isShowButtonHelp");
      }

      if (isHasInstruction) {
        emit("isShowButtonInstruction");
      }

      await funcLoadPractice();
    });

    return {
      tabHelp,
      practiceData,
      closeHelpBtn,
      instructionData,
      isHasHelp,
      isHasInstruction,
      isLoadPractice,
      isFinishPractice,
      funcSelectedPractice,
    };
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
