<template>
  <q-page class="bg-reading">
    <app-bar
      :isShowHome="learningMode == 'selfLearning' ? true : false"
      :isShowPause="learningMode == 'selfLearning' ? true : false"
    ></app-bar>
    <div class="box-container-main">
      <div class="row">
        <div class="col-12 bg-white" align="center">
          <div class="relative-position">
            <header-bar
              :setFontSize="fontSize"
              :practiceData="practiceData"
              @decreaseFont="decreaseFont"
              @increaseFont="increaseFont"
              @playSound="playSound"
            ></header-bar>
          </div>
          <div class="box-container-reading" v-if="isLoadContent">
            <div class="" align="center">
              <span class="f24">{{ readingContent.titleEng }} </span>
            </div>
            <div class="q-mt-sm q-py-md box-content q-px-lg" align="left">
              <span :style="`font-size:${fontSize}px;`" v-html="highLightText"> </span>
            </div>
          </div>
        </div>
        <div
          class="col-12 row items-center justify-center q-py-md"
          :class="{ 'q-px-lg': $q.platform.is.mobile }"
          align="center"
          v-if="isLoadQuestion"
        >
          <div class="col">
            <div class="box-question q-pa-md">
              <span class="f20" v-html="questionList[currentQuestion].question"> </span>
            </div>
            <div class="box-container-content">
              <div class="q-my-md row justify-between" v-if="!isShowDescription">
                <!-- Choice -->
                <div
                  class="col-xs-12 col-sm-6 q-px-sm q-pt-md"
                  v-for="(item, index) in questionList[currentQuestion].choices"
                  :key="index"
                >
                  <q-btn
                    @click="checkAnswer(item.index)"
                    align="left"
                    class="custom-btn"
                    no-caps
                    style="width: 100%"
                    :style="$q.platform.is.desktop ? ' height: 60px' : 'height:40px'"
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

                    <div class="q-pl-md">
                      <span v-html="item.choice"></span>
                    </div>
                  </q-btn>
                </div>
              </div>

              <!-- Description -->
              <div class="q-my-md" align="left" v-else>
                <div class="bg-white q-pa-md shadow-1 rounded-borders">
                  <div v-if="!questionList[currentQuestion].isCorrect">
                    <span
                      class="text-red"
                      v-html="
                        questionList[currentQuestion].choices[
                          questionList[currentQuestion].userAnswer
                        ].choice
                      "
                    ></span>
                    เป็นคำตอบที่ ผิด
                  </div>
                  <div
                    :class="!questionList[currentQuestion].isCorrect ? 'q-pt-md' : null"
                  >
                    คำตอบที่ถูกต้อง คือ
                    <span
                      class="text-green-4"
                      v-html="
                        questionList[currentQuestion].choices[
                          questionList[currentQuestion].correctAnswer
                        ].choice
                      "
                    >
                    </span>
                  </div>
                  <div class="q-my-md">
                    <span v-html="questionList[currentQuestion].description"></span>
                  </div>

                  <div
                    class="q-my-md"
                    v-for="(ref, index) in questionList[currentQuestion].refs"
                  >
                    อ้างอิง#{{ index + 1 }} : <span v-html="ref"></span>
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
            </div>
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

    <finish-practice
      :isFinishPractice="isShowFinishPractice"
      :totalStar="star.summaryStar"
      @reStart="reStart"
      @finish="finish"
    ></finish-practice>
  </q-page>
</template>

<script>
import readingMultiplePc from "../components/reading/readingMultiplePc";
import readingMultipleMobile from "../components/reading/readingMultipleMobile";
import appBar from "../components/app-bar";
import finishPractice from "../components/finishPracticeDialog.vue";
import headerBar from "../components/header-time-progress";
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { db } from "src/router";
import axios from "axios";
export default {
  components: {
    readingMultiplePc,
    readingMultipleMobile,
    appBar,
    headerBar,
    finishPractice,
  },
  setup(props) {
    // Route
    const router = useRouter();
    const route = useRoute();
    const $q = useQuasar();

    // Current Question
    const currentQuestion = ref(0);

    // Font Size
    const fontSize = ref(16);
    const decreaseFont = () => {
      fontSize.value++;
    };
    const increaseFont = () => {
      fontSize.value--;
    };

    const isLoadContent = ref(false);
    // Reading Content
    const readingContent = ref({});

    // Load Reading Content
    const getReadingContent = async () => {
      $q.loading.show();
      let response = await db
        .collection("readingContent")
        .doc("server")
        .collection("content")
        .where("practiceListId", "==", route.params.practiceListId)
        .get();
      readingContent.value = response.docs[0].data();
      isLoadContent.value = true;
    };

    const isLoadQuestion = ref(false);

    // Question List
    const questionList = ref([]);

    const getQuestionList = async () => {
      const apiURL =
        "https://us-central1-winnerenglish2-e0f1b.cloudfunctions.net/wfunctions/getPracticeData";

      const postData = {
        practiceListId: route.params.practiceListId,
      };
      const response = await axios.post(apiURL, postData);
      questionList.value = response.data;
      isLoadQuestion.value = true;
      $q.loading.hide();
    };

    // แสดงผลหน้าอธิบายคำตอบ
    const isShowDescription = ref(false);
    // แสดงผล animation ตรวจคำตอบ
    const isShowAnswerAnimation = ref(false);
    var timeoutAnimation;
    // ตรวจคำตอบ
    const checkAnswer = (index) => {
      clearTimeout(timeoutAnimation);
      if (index == questionList.value[currentQuestion.value].correctAnswer) {
        console.log("ตอบถูก");
        questionList.value[currentQuestion.value].isCorrect = true;
      } else {
        console.log("ตอบผิด");
        questionList.value[currentQuestion.value].isCorrect = false;
        questionList.value[currentQuestion.value].userAnswer = index;
      }
      isShowDescription.value = true;
      isShowAnswerAnimation.value = true;
      timeoutAnimation = setTimeout(() => {
        isShowAnswerAnimation.value = false;
      }, 700);
    };

    const isShowFinishPractice = ref(false);
    // Next Question
    const nextQuestion = () => {
      if (currentQuestion.value < questionList.value.length - 1) {
        isShowDescription.value = false;
        currentQuestion.value++;
      } else {
        // alert("จบแบบฝึกหัด");
        isShowFinishPractice.value = true;
      }
    };

    // Star Calculation
    const star = computed(() => {
      let score = questionList.value.filter((x) => x.isCorrect);
      score = (score.length / questionList.value.length) * 100;
      let summaryStar;
      if (score >= 80) {
        summaryStar = 3;
      } else if (score >= 65) {
        summaryStar = 2;
      } else if (score >= 50) {
        summaryStar = 1;
      }
      return { score, summaryStar };
    });

    // Highlight Text In Content
    const highLightText = computed(() => {
      let content = readingContent.value.contentEng.replace(
        /\[tab]/g,
        "&nbsp;&nbsp;&nbsp;&nbsp;"
      );
      if (isShowDescription.value) {
        let highLight = questionList.value[currentQuestion.value].refs;

        highLight.forEach((element) => {
          content = content.replace(
            element,
            `<span style='background-color:rgba(255,170,46,0.3)'>${element}</span>`
          );
        });
        return content;
      } else {
        return content;
      }
    });

    // Re Start Practice
    const reStart = () => {
      currentQuestion.value = 0;
      isShowDescription.value = false;
      isShowFinishPractice.value = false;
    };
    // Finish Practice
    const finish = () => {
      router.push("/practicemain");
    };

    // Play Reading Sound
    const playSound = () => {
      console.log("play sound");
      let audio = new Audio(readingContent.value.soundURL);
      audio.play();
    };

    const practiceData = {
      totalQuestion: questionList.value.length,
      currentQuestion: currentQuestion.value,
    };

    const learningMode = ref("selfLearning");
    // Listen Synchronize
    const synchronize = db
      .collection("synchronize")
      .doc("test")
      .onSnapshot((data) => {
        if (data.data().mode == "control") {
          learningMode.value = "control";
        } else {
          learningMode.value = "selfLearning";
        }
      });

    onMounted(async () => {
      await getReadingContent();
      await getQuestionList();
    });

    onUnmounted(() => {
      synchronize();
    });

    return {
      readingContent,
      questionList,
      currentQuestion,
      fontSize,
      nextQuestion,
      decreaseFont,
      increaseFont,
      isShowDescription,
      checkAnswer,
      isShowAnswerAnimation,
      highLightText,
      playSound,
      isShowFinishPractice,
      star,
      reStart,
      finish,
      practiceData,
      isLoadContent,
      isLoadQuestion,
      learningMode,
    };
  },
};
</script>

<style lang="scss" scoped>
.bg-reading {
  background-image: url("../../public/images/reading/bg-reading.png");
  background-size: cover;
}
.box-question {
  max-width: 1000px;
  width: 100%;
  border: 4px solid #6f3c00;
  background-color: #fff;
  border-radius: 5px;
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
