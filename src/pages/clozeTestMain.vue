<template>
  <q-page class="bg-clozetest">
    <div>
      <app-bar></app-bar>
    </div>

    <div class="absolute-center" v-if="!isLoadPractice">
      <q-spinner color="primary" size="100px" />
    </div>

    <div class="box-container-main row" v-if="isLoadPractice">
      <div class="col-12 bg-white row">
        <div class="col-12 bg-white" align="center">
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
            <div class="" align="center">
              <span class="f24" v-html="practiceData.nameEng"> </span>
            </div>
            <div class="q-mt-sm q-py-md box-content q-px-lg" align="left">
              <span
                class="f18"
                v-html="`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${practiceData.question}`"
              ></span>
            </div>
          </div>
        </div>
      </div>

      <div class="col self-end brx">
        <div
          class="col-12 row items-center justify-center q-py-md"
          :class="{ 'q-px-lg': $q.platform.is.mobile }"
          align="center"
        >
          <div class="col">
            <div class="box-question q-pa-sm row" align="left">
              <div class="q-mx-xs" v-for="(item, index) in practiceData.totalQuestion">
                <question-number
                  :no="index + 1"
                  :currentQuestion="practiceData.currentQuestion + 1"
                ></question-number>
              </div>
            </div>
            <div class="box-container-content row" v-if="!isShowDescription">
              <div
                class="col-6 q-pa-sm"
                v-for="(item, index) in practiceData.choices"
                :key="index"
              >
                <multiple-choices :choice="item"></multiple-choices>
              </div>
            </div>

            <!-- <div class="">
              <div class="q-my-md" align="left">
                <div class="bg-white q-pa-md shadow-1 rounded-borders">
                  <div>
                    คำตอบที่ถูกต้อง คือ
                   
                  </div>
                  <div class="q-my-md">
                    <span v-html="questionList[currentQuestion].description"></span>
                  </div>

                  <div
                    class="q-my-md"
                    v-for="(ref, index) in questionList[currentQuestion].highLightList"
                  >
                    อ้างอิง#{{ index + 1 }} : {{ ref }}
                  </div>

                  <div class="q-mt-lg" align="center">
                    <q-btn
                      @click="nextQuestion()"
                      align="center"
                      class="custom-btn"
                      no-caps
                      style="width: 200px; height: 40px"
                    >
                      <div class="absolute-left" style="top: 5px; left: 5px">
                        <div
                          style="width: 10px; height: 10px; border-radius: 50%"
                          class="bg-white"
                        ></div>
                      </div>
                      <div class="absolute-left" style="top: 7px; left: 18px">
                        <div
                          style="width: 6px; height: 6px; border-radius: 50%"
                          class="bg-white"
                        ></div>
                      </div>
                      <div class="f16" align="center">ข้อต่อไป</div>
                    </q-btn>
                  </div>
                </div>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>

    <!-- Answer Animation -->
    <q-dialog maximized v-model="isShowAnswerAnimation">
      <q-card class="transparent shadow-0">
        <q-card-section class="fit">
          <div class="flex flex-center fit">
            <q-img
              style="max-width: 350px; width: 100%"
              src="../../public/images/light-answer.png"
              class="animation-rotate"
            ></q-img>
            <q-img
              class="absolute"
              style="max-width: 167.92px; width: 100%"
              :src="
                require(`../../public/images/icon-${
                  questionList[currentQuestion].isCorrect ? 'correct' : 'incorrect'
                }-answer.png`)
              "
            >
            </q-img>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- <finish-practice
      :isFinishPractice="isShowFinishPractice"
      :totalStar="star.summaryStar"
      @reStart="reStart"
      @finish="finish"
    ></finish-practice> -->
  </q-page>
</template>

<script>
import questionNumber from "../components/button/btn-current-choices";
import multipleChoices from "../components/button/multipleChoicesBtn";
import appBar from "../components/app-bar";
import finishPractice from "../components/finishPracticeDialog.vue";
import headerBar from "../components/header-time-progress";
import practiceHooks from "../hooks/practiceHooks";
import { ref, computed, onMounted } from "vue";
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
  setup(props) {
    // Initial Data
    const route = useRoute();
    const router = useRouter();

    const practiceData = {
      totalQuestion: 10,
      currentQuestion: 0,
      question: "",
      choices: [{ choice: "1" }, { choice: "2" }, { choice: "3" }, { choice: "4" }],
      correctAnswer: 0,
      nameEng: "",
      nameTh: "",
      answer: [],
    };

    const isLoadPractice = ref(false);
    const isShowDescription = ref(false);

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

        // Question List : Set Question
        questionList.value = response.data[0];

        // console.log(questionList.value);

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

      console.log(questionList.value);

      // Practice Data : Show Choices
      practiceData.choices =
        questionList.value.answer[practiceData.currentQuestion].choice;

      let setQuestionArr = questionList.value.sentenceEng.match(
        /<s*u[^>]*>(.*?)<\/s*u>/g
      );

      console.log(setQuestionArr);

      practiceData.question = questionList.value.sentenceEng;
    };

    // แสดงผลหน้าอธิบายคำตอบ

    // // แสดงผล animation ตรวจคำตอบ
    // const isShowAnswerAnimation = ref(false);
    // var timeoutAnimation;
    // // ตรวจคำตอบ
    // const checkAnswer = (index) => {
    //   clearTimeout(timeoutAnimation);
    //   if (index == questionList.value[currentQuestion.value].correctAnswer) {
    //     console.log("ตอบถูก");
    //     questionList.value[currentQuestion.value].isCorrect = true;
    //   } else {
    //     console.log("ตอบผิด");
    //     questionList.value[currentQuestion.value].isCorrect = false;
    //   }
    //   isShowDescription.value = true;
    //   isShowAnswerAnimation.value = true;
    //   timeoutAnimation = setTimeout(() => {
    //     isShowAnswerAnimation.value = false;
    //   }, 700);
    // };

    // // Current Question
    // const currentQuestion = ref(0);
    // const isShowFinishPractice = ref(false);
    // // Next Question
    // const nextQuestion = () => {
    //   if (currentQuestion.value < questionList.value.length - 1) {
    //     isShowDescription.value = false;
    //     currentQuestion.value++;
    //   } else {
    //     // alert("จบแบบฝึกหัด");
    //     isShowFinishPractice.value = true;
    //   }
    // };

    // // Star Calculation
    // const star = computed(() => {
    //   let score = questionList.value.filter((x) => x.isCorrect);
    //   score = (score.length / questionList.value.length) * 100;
    //   let summaryStar;
    //   if (score >= 80) {
    //     summaryStar = 3;
    //   } else if (score >= 65) {
    //     summaryStar = 2;
    //   } else if (score >= 50) {
    //     summaryStar = 1;
    //   }
    //   return { score, summaryStar };
    // });

    // // Highlight Text In Content
    // const highLightText = computed(() => {
    //   if (isShowDescription.value) {
    //     let highLight = questionList.value[currentQuestion.value].highLightList;
    //     let content = readingContent.value.contentEn;

    //     highLight.forEach((element) => {
    //       content = content.replace(
    //         element,
    //         `<span style='background-color:rgba(255,170,46,0.3)'>${element}</span>`
    //       );
    //     });
    //     return content;
    //   } else {
    //     return readingContent.value.contentEn;
    //   }
    // });

    // // Re Start Practice
    // const reStart = () => {
    //   console.log("restart");
    // };
    // // Finish Practice
    // const finish = () => {
    //   console.log("finish");
    // };

    // // Play Reading Sound
    // const playSound = () => {
    //   console.log("play sound");
    //   let audio = new Audio(readingContent.value.soundURL);
    //   audio.play();
    // };

    onMounted(funcLoadPractice);

    return {
      practiceData,
      isLoadPractice,
      isShowDescription,
      decreaseFont,
      increaseFont,

      //   readingContent,
      //   questionList,
      //   currentQuestion,
      //   fontSize,
      //   nextQuestion,
      //   isShowDescription,
      //   checkAnswer,
      //   isShowAnswerAnimation,
      //   highLightText,
      //   playSound,
      //   isShowFinishPractice,
      //   star,
      //   reStart,
      //   finish,
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
</style>
