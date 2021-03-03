<template>
  <q-page class="bg-clozetest">
    <div>
      <app-bar :themeSync="themeSync"></app-bar>
    </div>

    <div class="absolute-center" v-if="!isLoadPractice">
      <q-spinner color="primary" size="100px" />
    </div>

    <div class="box-container-main row" v-if="isLoadPractice">
      <div class="col-12 self-start bg-white row q-pb-lg">
        <div class="col-12 bg-white q-pb-md" align="center">
          <div class="relative-position">
            <header-bar
              :setFontSize="fontSize"
              @decreaseFont="decreaseFont"
              @increaseFont="increaseFont"
              @playSound="playSound"
              :practiceData="practiceData"
            ></header-bar>
          </div>
          <div class="box-container-reading">
            <div class="q-pb-md" align="center">
              <span class="f24" v-html="practiceData.nameEng"> </span>
            </div>
            <div class="q-mt-sm box-content q-px-lg" align="left">
              <span
                class="f18"
                v-html="`${practiceData.question}`"
                v-if="!isShowContentAnswer"
              ></span>
              <span
                class="f18"
                v-html="`${practiceData.contentEng}`"
                v-if="isShowContentAnswer"
              ></span>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12">
        <div
          class="col-12 row items-center justify-center"
          :class="{ 'q-px-lg': $q.platform.is.mobile }"
          align="center"
        >
          <div class="col q-pa-md">
            <!-- <div class="box-question q-pa-sm row" align="left">
              <div class="q-mx-xs" v-for="(item, index) in practiceData.totalQuestion">
                <question-number
                  :no="index + 1"
                  :currentQuestion="practiceData.currentQuestion + 1"
                ></question-number>
              </div>
            </div> -->

            <div
              class="box-container-content row"
              v-show="!isDescription && !isShowContentAnswer"
            >
              <div
                class="col-6 q-pa-sm"
                v-for="(item, index) in practiceData.choices"
                :key="index"
                @click="isSendAnswer ? null : funcSendAnswer(item, index)"
              >
                <multiple-choices
                  :isDisable="isSendAnswer"
                  :choice="item.choice"
                ></multiple-choices>
              </div>
            </div>

            <div
              class="box-description q-my-md"
              v-show="isDescription || isShowContentAnswer"
            >
              <div v-if="isSendAnswer">
                <div class="q-pa-md" :style="themeColor"></div>
                <div class="f16 q-px-md">
                  <div class="q-pa-md row" align="left">
                    <div class="col-12 row q-py-xs" v-if="!isCorrectAnswer">
                      <div
                        class="text-red"
                        v-html="practiceData.choices[currentAnswer].choice"
                      ></div>
                      <div class="col q-mx-md">เป็นคำตอบที่ผิด</div>
                    </div>
                    <div class="col-12 row">
                      <div class="col-2">คำตอบที่ถูกต้อง คือ</div>
                      <div class="col">
                        <span
                          class="text-green-6"
                          v-html="
                            practiceData.choices.filter(
                              (x) => x.index == practiceData.correctAnswer
                            )[0].choice
                          "
                        ></span>
                        <div>
                          <span v-html="practiceData.description"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-else class="q-pt-md">
                <div class="q-pa-md q-pb-lg">
                  <span class="f20" v-html="practiceData.nameTh"> </span>
                </div>
                <div class="q-pa-md">
                  <span
                    class="f16"
                    v-html="`${practiceData.contentTh}`"
                    v-if="isShowContentAnswer"
                  ></span>
                </div>
                <div class="q-py-md">
                  <q-img
                    @click="isFinishPractice = true"
                    class="cursor-pointer"
                    width="200px"
                    src="../../public/images/finish-btn.png"
                  ></q-img>
                </div>
              </div>

              <div class="q-my-md" align="center" v-show="isSendAnswer">
                <q-img
                  @click="funcNextQuestion()"
                  class="cursor-pointer"
                  width="200px"
                  src="../../public/images/next-question-btn.png"
                ></q-img>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12"></div>
    </div>

    <finish-practice
      :isFinishPractice="isFinishPractice"
      @reStart="reStart"
      @finish="finish"
    ></finish-practice>
  </q-page>
</template>

<script>
import questionNumber from "../components/button/btn-current-choices";
import multipleChoices from "../components/button/multipleChoicesBtn";
import appBar from "../components/app-bar";
import finishPractice from "../components/finishPracticeDialog.vue";
import headerBar from "../components/header-time-progress";
import practiceHooks from "../hooks/practiceHooks";
import getColorTheme from "../../public/themeColor.json";
import { ref, computed, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { db } from "src/router";
import axios from "axios";
export default {
  components: {
    questionNumber,
    appBar,
    headerBar,
    finishPractice,
    multipleChoices,
  },
  props: {
    themeSync: {
      type: Number,
      default: 1,
    },
  },
  setup(props) {
    // Initial Data
    const route = useRoute();
    const router = useRouter();

    // Initial Color Theme
    const colorTheme = ref(getColorTheme);
    const themeColor = computed(() => {
      return `background-color:${colorTheme.value[props.themeSync - 1].hex}`;
    });

    const practiceData = reactive({
      totalQuestion: 10,
      currentQuestion: 0,
      question: "",
      contentEng: "",
      contentTh: "",
      choices: [],
      correctAnswer: 0,
      nameEng: "",
      nameTh: "",
    });

    const isLoadPractice = ref(false);

    // Font Size
    const fontSize = ref(16);

    const decreaseFont = () => {
      fontSize.value++;
    };

    const increaseFont = () => {
      fontSize.value--;
    };

    // Question List
    const questionList = ref([]);

    const funcLoadPractice = async () => {
      console.clear();

      try {
        let tempPractice = [];

        // Set Practice ID
        let practiceListId = route.params.practiceListId;

        // Get Practice List
        let getData = await db.collection("practiceList").doc(practiceListId).get();

        // Practice Data : Show Total Question
        practiceData.totalQuestion = getData.data().numOfPractice;

        // Get Practice Name
        let getPracticenName = await practiceHooks
          .practice(getData.data().level)
          .practiceName();

        // Filter Level and Unit
        getPracticenName = getPracticenName.filter(
          (x) => x.unit == getData.data().unit && x.skill == "Writing"
        )[0];

        practiceData.nameEng = getPracticenName.nameEng;

        practiceData.nameTh = getPracticenName.nameTh;

        // Get Practice Data
        const apiURL =
          "https://us-central1-winnerenglish2-e0f1b.cloudfunctions.net/wfunctions/getPracticeData";

        const postData = {
          practiceListId: practiceListId,
        };

        const response = await axios.post(apiURL, postData);

        // เก็บข้อมูลที่ได้จาก axios
        tempPractice = response.data;

        // copy แบบฝึกหัด
        let setPracticeList = tempPractice[0];

        setPracticeList.answer = setPracticeList.answer.map((x) => {
          let newChoice = x.choice.map((xx, index) => {
            let newData = {
              choice: xx,
              index: null,
            };

            newData.index = index;

            xx = { ...newData };

            return xx;
          });

          let choices = newChoice.sort(() => Math.random() - 0.5);

          x.choice = choices;

          return x;
        });

        // สุ่มแบบฝึกหัด
        // setPracticeList = setPracticeList.sort(() => Math.random() - 0.5);

        questionList.value = setPracticeList;

        practiceData.contentEng = questionList.value.sentenceEng;

        practiceData.contentTh = questionList.value.sentenceTh;

        practiceData.question = questionList.value.sentenceEng;

        let setQuestionArr = questionList.value.sentenceEng.match(
          /<s*u[^>]*>(.*?)<\/s*u>/gm
        );

        for (let i = 0; i < setQuestionArr.length; i++) {
          practiceData.question = practiceData.question.replace(
            /<s*u[^>]*>(.*?)<\/s*u>/,
            `<span class="relative-position" style="display:inline-block;border-bottom:1px solid;width:100px;text-align:center;">${
              i + 1
            }</span>`
          );

          setQuestionArr[i] = setQuestionArr[i]
            .replace(/<s*u[^>]*>/gm, "")
            .replace(/<\/s*u>/, "");

          practiceData.contentEng = practiceData.contentEng.replace(
            /<s*u[^>]*>(.*?)<\/s*u>/,
            `<span style="background-color:#9CDC83;padding:0px 5px;">${setQuestionArr[i]}</span>`
          );
        }

        funcSelectedQuestion(true);

        isLoadPractice.value = true;
      } catch (error) {
        console.log(`${error} : Function Load Practice`);
      }
    };

    const funcSelectedQuestion = (firsttime) => {
      firsttime = firsttime || false;

      if (!firsttime) {
        practiceData.currentQuestion++;
      }

      // Practice Data : Show Total Question
      practiceData.totalQuestion = questionList.value.answer.length;

      // Practice Data : Show Choices
      practiceData.choices =
        questionList.value.answer[practiceData.currentQuestion].choice;

      practiceData.description =
        questionList.value.answer[practiceData.currentQuestion].description || "";
    };

    const isShowContentAnswer = ref(false);

    const funcNextQuestion = () => {
      isSendAnswer.value = false;
      isDescription.value = false;

      if (practiceData.currentQuestion + 1 == practiceData.totalQuestion) {
        console.log("xx");
        isShowContentAnswer.value = true;
        return;
      }

      funcSelectedQuestion();
    };

    const isSendAnswer = ref(false);
    const isDescription = ref(false);
    const isCorrectAnswer = ref(false);
    const currentAnswer = ref(null);
    const isFinishPractice = ref(false);

    const funcSendAnswer = (item, index) => {
      isSendAnswer.value = true;

      currentAnswer.value = index;

      if (practiceData.correctAnswer == item.index) {
        isCorrectAnswer.value = true;
      } else {
        isCorrectAnswer.value = false;
      }

      isDescription.value = true;
    };

    const reStart = () => {
      isFinishPractice.value = false;
      isLoadPractice.value = false;
      isSendAnswer.value = false;
      isDescription.value = false;
      isShowContentAnswer.value = false;

      practiceData.totalQuestion = 0;
      practiceData.totalStar = 0;
      practiceData.question = "";
      practiceData.choices = [];
      practiceData.currentQuestion = 0;

      funcLoadPractice();
    };

    onMounted(funcLoadPractice);

    return {
      themeColor,
      practiceData,
      decreaseFont,
      increaseFont,
      currentAnswer,

      //
      isLoadPractice,
      isSendAnswer,
      isCorrectAnswer,
      isDescription,
      isFinishPractice,
      isShowContentAnswer,

      // Function
      funcSendAnswer,
      funcNextQuestion,
      reStart,
    };
  },
};
</script>

<style lang="scss" scoped>
.bg-clozetest {
  background-image: url("../../public/images/translation/bg-clozetest.png");
  background-size: cover;
}
.box-question {
  max-width: 1000px;
  width: 100%;
}

.box-container-content {
  max-width: 1000px;
  width: 100%;
}

.box-container-reading {
  max-width: 1000px;
  margin-top: -15px;
}

.box-content {
  height: 50%;
  overflow: hidden;
}

.bg-button {
  background-color: #6d4300;
  border: 1px solid#FFC630;
  color: #ffc630;
}

.animation-rotate {
  animation: rotateLight 3s linear infinite;
  transform: rotate(0deg);
  transform-box: fill-box;
  transform-origin: center;
}

@keyframes rotateLight {
  to {
    transform: rotate(360deg);
  }
}

.box-description {
  max-width: 1000px;
  width: 95%;
  border-radius: 10px;
  overflow: hidden;
  background-color: #fff;
}
</style>
