<template>
  <q-page
    :class="$q.platform.is.desktop ? 'bg-grammaraction' : 'bg-mobile'"
    :theme="themeSync"
  >
    <app-bar
      :isShowHome="learningMode == 'selfLearning' ? true : false"
      :isShowPause="learningMode == 'selfLearning' ? true : false"
    ></app-bar>
    <div v-if="isLoaded">
      <div align="center" class="q-pa-md">
        <div v-if="$q.platform.is.desktop">
          <q-img
            style="max-width: 500px; width: 100%"
            src="../../public/images/grammar/label-grammaraction.png"
          ></q-img>
        </div>

        <!-- Box Content Answer -->
        <div
          :class="{ 'q-pa-sm q-my-lg box-content-main': $q.platform.is.desktop }"
          v-if="currentStep == 1 || currentStep == 2"
        >
          <div :class="{ 'border-dash q-py-md q-px-xl': $q.platform.is.desktop }">
            <div class="row q-gutter-sm">
              <div class="col-auto" v-for="i in questionList.length" :key="i">
                <btn-no
                  :currentQuestion="currentQuestion + 1"
                  :status="questionList[i - 1].isCorrect"
                  :no="i"
                ></btn-no>
              </div>
            </div>

            <div class="q-mt-lg box-question q-pa-md" align="center">
              <span class="f20" v-html="questionList[currentQuestion].question"> </span>
            </div>

            <div class="q-mt-lg">
              <div
                class="q-mt-sm q-pb-md"
                v-for="(item, index) in questionList[currentQuestion].choices"
                :key="index"
              >
                <multiplechoice-btn
                  @click="
                    currentStep != 1 || learningMode != 'control'
                      ? checkAnswer(item)
                      : null
                  "
                  :choice="item.choice"
                  :index="index"
                  :isDisable="currentStep == 1 && learningMode == 'control'"
                  :class="{
                    'disabled cursor-not-allowed ':
                      currentStep == 1 && learningMode == 'control',
                  }"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Waiting -->
        <div
          v-if="currentStep == 7"
          :class="{
            'box-content-main q-pa-sm q-my-lg': $q.platform.is.desktop,
            'absolute-center full-width': $q.platform.is.mobile,
          }"
        >
          <div class="q-pa-md q-px-xl" :class="{ 'border-dash': $q.platform.is.desktop }">
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

        <!-- Show Score -->
        <div
          class="box-content-main row"
          :class="$q.platform.is.desktop ? 'q-pa-sm q-my-lg ' : 'absolute-bottom'"
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
                  <div class="absolute-top" style="top: -90px">
                    <q-img width="60px" src="../../public/images/grammar/img-score.png">
                      <div class="transparent absolute-center shadow-0" style="top: 40%">
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
                  >
                    <q-icon
                      :name="colorGraph[i - 1].icon"
                      size="35px"
                      class="text-white"
                      style="margin-top: -40%"
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
        <div
          :class="{ 'box-content-main q-pa-sm q-my-lg': $q.platform.is.desktop }"
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

        <!-- Description -->
        <div
          :class="{ 'box-content-main q-pa-sm q-my-lg': $q.platform.is.desktop }"
          v-if="currentStep == 5"
        >
          <div :class="{ 'border-dash q-py-md q-px-xl': $q.platform.is.desktop }">
            <div class="row">
              <div class="col-auto" v-for="i in totalQuestion" :key="i">
                <q-img
                  width="45px"
                  :src="
                    require(`../../public/images/question-${
                      currentQuestion + 1 == i ? 'correct' : 'default'
                    }.png`)
                  "
                >
                  <div
                    class="transparent absolute-center no-padding text-black"
                    style="height: 65%"
                  >
                    <span>{{ i }}</span>
                  </div>
                </q-img>
              </div>
            </div>

            <div class="q-py-md box-show-answer relative-position">
              <div class="q-mt-lg box-question q-pa-md" align="center">
                <span class="f20" v-html="questionList[currentQuestion].question"> </span>
              </div>

              <div class="q-mt-lg box-description" align="center">
                <div
                  class="f16 shadow-3"
                  style="
                    border-radius: 10px 10px 0px 0px;
                    background-color: #30416b;
                    color: white;
                  "
                >
                  <div class="q-py-sm">คำอธิบาย</div>
                </div>
                <div
                  class="bg-white flex flex-center"
                  style="min-height: 150px; border-radius: 0px 0px 10px 10px"
                >
                  <span v-html="questionList[currentQuestion].description"> </span>
                </div>
              </div>
            </div>

            <div v-if="learningMode != 'control'">
              <q-btn
                label="ข้อต่อไป"
                class="custom-btn"
                style="width: 200px"
                @click="nextQuestion()"
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
    </div>

    <finish-practice
      :isFinishPractice="isShowFinishPractice"
      :totalStar="3"
      @reStart="reStart"
    ></finish-practice>
  </q-page>
</template>

<script>
import waiting from "../components/waiting";
import grammarActionPc from "../components/grammar/grammarActionPc";
import multiplechoiceBtn from "../components/button/multipleChoicesBtn";
import grammarActionMobile from "../components/grammar/grammarActionMobile";
import finishPractice from "../components/finishPracticeDialog";
import appBar from "../components/app-bar";
import btnNo from "../components/button/btn-current-choices";
import { ref, onBeforeUnmount, onMounted } from "vue";
import { db } from "src/router";
import { useRouter, useRoute } from "vue-router";
import { useQuasar } from "quasar";
import axios from "axios";
export default {
  props: {
    themeSync: {
      type: Number,
      default: 0,
    },
  },
  components: {
    grammarActionPc,
    grammarActionMobile,
    appBar,
    multiplechoiceBtn,
    btnNo,
    waiting,
    finishPractice,
  },

  setup() {
    // Route
    const route = useRoute();
    const router = useRouter();

    // Quasar
    const $q = useQuasar();
    // isLoadComplete
    const isLoaded = ref(false);

    // const grammar action question
    const questionList = ref([]);

    const getQuestionList = async () => {
      $q.loading.show();
      const apiURL =
        "https://us-central1-winnerenglish2-e0f1b.cloudfunctions.net/wfunctions/getPracticeData";

      const postData = {
        practiceListId: route.params.practiceListId,
      };
      const response = await axios.post(apiURL, postData);
      isLoaded.value = true;
      $q.loading.hide();
      questionList.value = response.data;
    };

    // ข้อปัจจุบัน
    const currentQuestion = ref(0);
    // หน้าปัจจุบัน
    // 1 = หน้าคำถาม ยังกดตอบไม่ได้
    // 2 = กดคำตอบได้
    // 3 = ตอบแล้ว ไปหน้ารอ
    // 4 = กราฟ
    // 5 = เฉลย ถูก - ผิด
    // 6 = คำอธิบาย
    const currentStep = ref(1);
    const learningMode = ref("selfLearning");
    // Listen Synchronize
    const synchronize = db
      .collection("synchronize")
      .doc("test")
      .onSnapshot((data) => {
        if (data.data().mode == "control") {
          currentQuestion.value = data.data().grammarAction.currentQuestion;
          currentStep.value = data.data().grammarAction.currentStep;
          console.log(currentStep.value);
          learningMode.value = "control";
        } else {
          learningMode.value = "selfLearning";
        }
      });

    const checkAnswer = (val) => {
      if (learningMode.value == "control") {
        // กรณี Teacher control mode
        currentStep.value = 7; //waiting
      } else {
        currentStep.value = 4;
      }
      if (questionList.value[currentQuestion.value].correctAnswer == val.index) {
        questionList.value[currentQuestion.value].isCorrect = true;
        console.log("ตอบถูก");
      } else {
        questionList.value[currentQuestion.value].isCorrect = false;
        console.log("ตอบผิด");
      }
    };
    const isShowFinishPractice = ref(false);
    const nextQuestion = () => {
      if (currentQuestion.value < questionList.value.length - 1) {
        currentQuestion.value++;
        currentStep.value = 1;
      } else {
        isShowFinishPractice.value = true;
      }
    };

    const colorGraph = [
      { color: "red", icon: "fas fa-spider" },
      { color: "blue", icon: "fas fa-fish" },
      { color: "purple", icon: "fas fa-dove" },
      { color: "green", icon: "fas fa-frog" },
    ];

    const reStart = () => {
      currentQuestion.value = 0;
      currentStep.value = 1;
      isShowFinishPractice.value = false;
    };

    onMounted(async () => {
      await getQuestionList();
    });

    onBeforeUnmount(() => {
      synchronize();
    });
    return {
      currentQuestion,
      currentStep,
      questionList,
      checkAnswer,
      learningMode,
      nextQuestion,
      isLoaded,
      colorGraph,
      isShowFinishPractice,
      reStart,
    };
  },
};
</script>

<style lang="scss" scoped>
.bg-grammaraction {
  background-color: #b2dfff;
  background-size: cover;
  background-position: bottom;
  background-repeat: no-repeat;
}
.bg-grammaraction[theme="1"] {
  background-image: url("../../public/images/grammar/bg-theme-action/bg-grammaraction-1.png");
}

.bg-grammaraction[theme="2"] {
  background-image: url("../../public/images/grammar/bg-theme-action/bg-grammaraction-2.png");
}

.bg-mobile {
  background-color: #eabd94;
}

.box-question {
  border: 5px solid #a36112;
  background-color: #fff;
  border-radius: 10px;
}
.box-description {
  background-color: #fff;
  border-radius: 10px;
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

.box-show-answer {
  min-height: calc(50vh);
  max-height: fit-content;
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

.btn-choice {
  border-radius: 10px;
  box-shadow: 2px 3px 0px 0px #4e3801;
  height: 50px;
  background-image: linear-gradient(#ffd361, #ffbb0d);
}

.btn-choice:hover {
  background-image: linear-gradient(#4bddfe, #2c9bc0);
  box-shadow: 0px 3px 10px 0px #0082ba;
}

.btn-no {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 5px solid #662707;
}
.btn-no-correct {
  background-image: linear-gradient(#90ff9c, #00b912);
}
.btn-no-current {
  background-image: linear-gradient(#85f0ff, #0085ff);
}
.btn-no-disable {
  background-image: linear-gradient(#fefefe, #a8a8a8);
}
.btn-no-incorrect {
  background-image: linear-gradient(#fd323a, #fd323a);
}

.graph-mobile {
  width: 60px;
}
.graph-desktop {
  width: 100px;
}
</style>
