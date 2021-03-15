<template>
  <q-page
    :class="{
      'bg-reading': $q.platform.is.desktop,
      'bg-color-mobile': $q.platform.is.mobile,
    }"
  >
    <app-bar
      :isShowPause="learningMode == 'selfLearning' ? true : false"
      :isHasHelp="true"
      :isLoadPractice="isLoadQuestion"
      @callback-showdialoghelp="isOpenHelp = true"
    ></app-bar>
    <!-- Question and Choices -->
    <div
      class="box-container-main"
      v-if="(currentStep == 1 || currentStep == 2) && currentStep != 7"
      align="center"
    >
      <!-- Header Bar -->
      <div class="" align="center">
        <div class="relative-position">
          <header-bar
            :setFontSize="fontSize"
            :practiceData="{
              totalQuestion: questionList.length,
              currentQuestion: currentQuestion,
              totalStar: 2,
            }"
            @decreaseFont="decreaseFont"
            @increaseFont="increaseFont"
            @playSound="playSound"
          ></header-bar>
        </div>
      </div>

      <div class="relative-position" align="center">
        <q-img
          src="../../public/images/reading/title-board.png"
          style="width: 100%; max-width: 320px"
        >
          <div
            align="center"
            class="absolute-center transparent"
            style="width: 100%"
          >
            <span class="f24">{{ readingContent.titleEng }} </span>
          </div>
        </q-img>
      </div>

      <div
        class="box-container-reading relative-position"
        :class="{
          'bg-my-brown': $q.platform.is.desktop,
          ' q-pa-sm': $q.platform.is.desktop,
        }"
        v-if="isLoadContent"
        align="center"
        style="margin-top: 20px"
      >
        <!-- Reading Content -->
        <div class="bg-white q-pa-md">
          <div>
            <q-img
              style="width: 50%"
              src="../../public/images/reading/RTHp7VUMTneSHBFQY1IN.jpg"
            ></q-img>
          </div>
          <div class="q-mt-sm q-py-md box-content q-px-lg" align="left">
            <span :style="`font-size:${fontSize}px;`" v-html="highLightText">
            </span>
          </div>
        </div>

        <div class="row" :class="{ 'bg-my-brown': $q.platform.is.mobile }">
          <div
            class="col-12 row items-center justify-center q-py-md"
            :class="{ 'q-px-lg': $q.platform.is.mobile }"
            align="center"
            v-if="isLoadQuestion"
          >
            <div class="col">
              <div class="box-question q-pa-md">
                <span
                  class="f20"
                  v-html="questionList[currentQuestion].question"
                >
                </span>
              </div>
              <div class="box-container-content">
                <div
                  class="q-my-md row justify-between"
                  v-if="!isShowDescription"
                >
                  <!-- Choice Self Learning -->
                  <div v-if="learningMode == 'selfLearning'" class="row col-12">
                    <div
                      class="q-px-sm q-pt-md col-sm-6 col-xs-12"
                      v-for="(item, index) in questionList[currentQuestion]
                        .choices"
                      :key="index"
                    >
                      <q-btn
                        @click="checkAnswer(item.index)"
                        align="left"
                        class="custom-btn f20"
                        no-caps
                        style="width: 100%"
                        :style="
                          $q.platform.is.desktop
                            ? ' height: 60px'
                            : 'height:40px'
                        "
                      >
                        <div class="absolute-left" style="top: 5px; left: 5px">
                          <div
                            style="
                              width: 10px;
                              height: 10px;
                              border-radius: 50%;
                            "
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
                  <!-- control mode -->
                  <div v-else class="row col-12">
                    <div
                      class="q-px-sm q-pt-md col-sm-6 col-xs-12"
                      v-for="(item, index) in questionList[currentQuestion]
                        .choices"
                      :key="index"
                    >
                      <multiplechoice-btn
                        @click="checkAnswer(item.index)"
                        :choice="item.choice"
                        :index="index"
                        :isDisable="
                          currentStep == 1 && learningMode == 'control'
                        "
                        :class="{
                          'disabled cursor-not-allowed ':
                            currentStep == 1 && learningMode == 'control',
                        }"
                      />
                    </div>
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
                            questionList[currentQuestion].userAnswer - 1
                          ].choice
                        "
                      ></span>
                      เป็นคำตอบที่ ผิด
                    </div>
                    <div
                      :class="
                        !questionList[currentQuestion].isCorrect
                          ? 'q-pt-md'
                          : null
                      "
                    >
                      คำตอบที่ถูกต้อง คือ
                      <span
                        class="text-green-4"
                        v-html="
                          questionList[currentQuestion].choices[
                            questionList[currentQuestion].correctAnswer - 1
                          ].choice
                        "
                      >
                      </span>
                    </div>
                    <div class="q-my-md">
                      <span
                        v-html="questionList[currentQuestion].description"
                      ></span>
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
                            style="
                              width: 10px;
                              height: 10px;
                              border-radius: 50%;
                            "
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
    </div>

    <!-- Waiting -->
    <div
      v-if="currentStep == 7"
      class="absolute-center"
      :class="{
        'box-content-main  q-pa-sm q-my-lg': $q.platform.is.desktop,
        'full-width': $q.platform.is.mobile,
      }"
    >
      <div
        class="q-pa-md q-px-xl"
        :class="{ 'border-dash': $q.platform.is.desktop }"
      >
        <div
          class="row justify-center"
          style="min-height: calc(100vh - 400px); max-height: fit-content"
        >
          <div class="self-center" style="max-width: 400px; width: 100%">
            <waiting></waiting>
            <div align="center" class="q-py-md">
              <span
                class="f36 text-brown-8 text-bold"
                style="font-size: max(1.7vw, 20px)"
                >รอเพื่อนก่อนนะ</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Show Score Graph -->
    <div
      class="row box-content-main"
      :class="
        $q.platform.is.desktop
          ? 'q-pa-sm q-my-lg absolute-center '
          : 'absolute-bottom'
      "
      v-if="currentStep == 3"
    >
      <div
        class="col-12 relative-position"
        style="border-bottom: 0px; z-index: 2"
        :class="{ 'border-dash': $q.platform.is.desktop }"
      >
        <div
          class="row center"
          style="margin-top: 120px"
          :class="
            $q.platform.is.desktop
              ? 'q-pa-md justify-center'
              : 'q-pa-xs justify-around'
          "
        >
          <div
            class="row justify-center relative-position"
            :class="$q.platform.is.desktop ? 'q-mx-lg' : 'q-mx-sm'"
            style="margin-bottom: -40px"
            v-for="i in 4"
            :key="i"
          >
            <div
              class="box-show-score row relative-position self-end"
              :data-color="colorGraph[i - 1].color"
              style="min-height: 50px"
              :style="`height: ${Math.floor(Math.random() * 250)}px`"
              :class="$q.platform.is.desktop ? 'graph-desktop' : 'graph-mobile'"
            >
              <div class="absolute-top" style="top: -90px" align="center">
                <q-img
                  width="60px"
                  src="../../public/images/grammar/img-score.png"
                >
                  <div
                    class="transparent absolute-center shadow-0"
                    style="top: 40%"
                  >
                    <span class="text-black f24 text-bold">n</span>
                  </div></q-img
                >
              </div>
              <div
                class="col-12 self-start box-show-score-header q-pb-md relative-position"
                style="margin-top: -15px"
                :data-color="colorGraph[i - 1].color"
              >
                &nbsp;
              </div>
              <div
                class="col-12 self-end box-show-score-footer q-pb-sm relative-position"
                style="margin-bottom: -15px"
                :data-color="colorGraph[i - 1].color"
                align="center"
              >
                <q-icon
                  :name="colorGraph[i - 1].icon"
                  size="35px"
                  class="text-white"
                ></q-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 box-content-show-score relative-position">
        <div class="q-py-lg q-mb-sm absolute-bottom" align="center">
          <span class="text-white f24">สรุปคำตอบที่ถูกเลือก</span>
        </div>
      </div>
    </div>

    <!-- Show Answer Correct And Incorrect -->
    <div align="center">
      <div
        :class="{
          'box-content-main q-pa-sm absolute-center': $q.platform.is.desktop,
        }"
        v-if="currentStep == 4"
      >
        <div class="q-pa-xl" :class="{ 'border-dash': $q.platform.is.desktop }">
          <div class="q-py-md box-show-answer relative-position">
            <q-img
              class="absolute-center"
              style="max-width: 400px"
              :style="$q.platform.is.desktop ? 'width:40%' : 'width:100%'"
              :src="
                require(`../../public/images/${
                  questionList[currentQuestion].isCorrect ? '' : 'in'
                }correct-img.png`)
              "
            ></q-img>
          </div>

          <div v-if="learningMode != 'control'">
            <q-btn
              label="คำอธิบาย"
              class="custom-btn"
              style="width: 200px"
              @click="currentStep = 5"
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
            </q-btn>
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
                  questionList[currentQuestion].isCorrect
                    ? 'correct'
                    : 'incorrect'
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

    <q-dialog v-model="isOpenHelp">
      <q-card style="width: 600px" class="q-pb-md">
        <div
          class="f18 q-pa-md"
          style="background-color: #2d3081; color: #f3ab14"
          align="center"
        >
          คำศัพท์เสริม
        </div>
        <q-card-section>
          <div class="row">
            <div
              class="col-sm-6 col-xs-12"
              v-for="(vocab, index) in readingContent.extraVocab"
              :key="index"
            >
              <div class="" style="border: 1px solid #c4c4c4">
                <div class="q-pa-sm">
                  <span v-html="vocab.vocab"></span>
                  ({{ vocab.partOfSpeech.partOfSpeech }})
                </div>
                <div class="q-pa-sm">
                  <span v-html="vocab.meaning"></span>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn
            v-close-popup
            label="ปิด"
            class="custom-btn"
            style="width: 200px"
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
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import waiting from "../components/waiting";
import readingMultiplePc from "../components/reading/readingMultiplePc";
import readingMultipleMobile from "../components/reading/readingMultipleMobile";
import multiplechoiceBtn from "../components/button/multipleChoicesBtn";
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
    multiplechoiceBtn,
    waiting,
  },
  props: {},
  setup(props) {
    // Route
    const router = useRouter();
    const route = useRoute();
    const $q = useQuasar();

    // Current Question
    const currentQuestion = ref(0);
    const currentStep = ref(1);

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
        // console.log("ตอบถูก");
        questionList.value[currentQuestion.value].isCorrect = true;
      } else {
        // console.log("ตอบผิด");
        questionList.value[currentQuestion.value].isCorrect = false;
        questionList.value[currentQuestion.value].userAnswer = index;
      }
      if (learningMode.value == "control") {
        currentStep.value = 7;
      } else {
        isShowDescription.value = true;
        isShowAnswerAnimation.value = true;
        timeoutAnimation = setTimeout(() => {
          isShowAnswerAnimation.value = false;
        }, 700);
      }
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
      let content = readingContent.value.contentEng;
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

    const audioTemp = ref("");

    // Play Reading Sound
    const playSound = () => {
      if (audioTemp.value) {
        audioTemp.value.pause();
      }

      let audio = new Audio(readingContent.value.soundURL);
      audioTemp.value = audio;
      audio.play();
    };

    const isOpenHelp = ref(false);

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
          currentStep.value = data.data().readingAction.currentStep;
          currentQuestion.value = data.data().readingAction.currentQuestion;
          if (currentStep.value == 5) {
            currentStep.value = 1;
            isShowDescription.value = true;
          } else {
            isShowDescription.value = false;
          }
        } else {
          learningMode.value = "selfLearning";
        }
      });

    const colorGraph = [
      { color: "red", icon: "fas fa-spider" },
      { color: "blue", icon: "fas fa-fish" },
      { color: "purple", icon: "fas fa-dove" },
      { color: "green", icon: "fas fa-frog" },
    ];

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
      currentStep,
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
      audioTemp,
      colorGraph,
      isOpenHelp,
    };
  },
};
</script>

<style lang="scss" scoped>
.bg-color-mobile {
  background-color: #fffcf6;
}
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

.box-description {
  background-color: #fff;
  border-radius: 10px;
}

.box-container-content {
  max-width: 1000px;
  width: 100%;
}

.box-container-reading {
  max-width: 1200px;
}

.bg-my-brown {
  background-color: #7c451e;
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

.box-content-main {
  max-width: 1000px;
  width: 100%;
  background-color: #eabd94;
  border-radius: 10px;
  box-shadow: 0 10px 0px #a07751;
}

.border-dash {
  border: 1px dashed;
}

.animation-rotate {
  animation: rotateLight 3s linear infinite;
  transform: rotate(0deg);
  transform-box: fill-box;
  transform-origin: center;
}

.box-content-show-score {
  background-color: #0095b6;
  height: 150px;
}

.box-show-score {
  min-height: 100px;
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.5);

  .box-show-score-footer,
  .box-show-score-header {
    border-radius: 50%;
  }

  .box-show-score-footer {
    box-shadow: 0 3px 7px -1px rgba(0, 0, 0, 0.2);
  }

  .box-show-score-header {
    box-shadow: 0 -3px 7px -1px rgba(0, 0, 0, 0.2);
  }

  .box-show-score-header[data-color="red"] {
    background-color: #ff8e8e;
  }
  .box-show-score-header[data-color="blue"] {
    background-color: #61b0ea;
  }
  .box-show-score-header[data-color="purple"] {
    background-color: #e3a8ff;
  }
  .box-show-score-header[data-color="green"] {
    background-color: #81c972;
  }

  .box-show-score-footer[data-color="red"] {
    background-color: #ff6464;
  }
  .box-show-score-footer[data-color="blue"] {
    background-color: #067fd8;
  }
  .box-show-score-footer[data-color="purple"] {
    background-color: #ce67ff;
  }
  .box-show-score-footer[data-color="green"] {
    background-color: #549745;
  }
}

.box-show-score[data-color="red"] {
  background-color: #ff6464;
}

.box-show-score[data-color="blue"] {
  background-color: #067fd8;
}
.box-show-score[data-color="purple"] {
  background-color: #ce67ff;
}
.box-show-score[data-color="green"] {
  background-color: #549745;
}

.graph-mobile {
  width: 60px;
}
.graph-desktop {
  width: 100px;
}

.box-show-answer {
  min-height: calc(50vh);
  max-height: fit-content;
}

.bg-reading {
  background-image: url("../../public/images/reading/bg-reading-1.png");
}

@keyframes rotateLight {
  to {
    transform: rotate(360deg);
  }
}
</style>
