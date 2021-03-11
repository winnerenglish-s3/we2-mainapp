<template>
  <div class="relative-position">
    <div class="absolute-bottom-right" style="z-index: 2"></div>

    <div class="row relative-position">
      <!-- <div class="col-2 bg-well-left"></div> -->
      <div
        class="col relative-position overflow-hidden q-pa-md"
        style="background-color: #252a52"
        align="center"
      >
        <div class="relative-position" style="z-index: 2">
          <header-bar
            :practiceData="{ totalQuestion: 5, currentQuestion: 0 }"
          ></header-bar>
        </div>
        <div class="box-question q-mb-sm">
          <span class="f32">
            {{ currentQuestionTh }}
          </span>
        </div>
        <div class="q-py-lg" align="center" style="height: 80px">
          <q-icon
            v-show="isSendAnswer"
            :name="!isCorrectAnswer ? 'far fa-times-circle' : 'far fa-check-circle'"
            :class="!isCorrectAnswer ? 'text-red-3' : 'text-teal-3'"
            size="42px"
          ></q-icon>
          <span
            v-show="isSendAnswer && !isCorrectAnswer"
            class="relative-position q-mx-md text-white"
            style="font-size: 24px"
            >คำตอบที่ถูกต้อง คือ</span
          >
        </div>
        <div class="row justify-center q-mb-md box-content q-pa-md" align="center">
          <div
            class="box-show-answer self-end"
            :class="{ 'border-show-answer': isSendAnswer && isCorrectAnswer }"
            v-for="(item, index) in currentQuestionText.length"
            :key="index"
          >
            {{
              isSendAnswer
                ? currentQuestionText[index].toUpperCase()
                : currentAnswerList[index]
                ? selectedLetter[index]
                : ""
            }}
          </div>
          <div class="self-center">
            <q-btn
              v-if="!isSendAnswer"
              push
              round
              style="background-color: #ff5f01"
              class="text-white q-ml-md"
              icon="fas fa-volume-up"
            ></q-btn>
          </div>

          <div class="col-12 q-py-lg q-mt-sm">
            <div class="box-content-answer q-pa-md">
              <div
                class="justify-between row q-mt-xs box-answer"
                v-if="currentAnswerList.length"
                v-for="(item, row) in boggle"
                :key="row"
              >
                <div
                  class="relative-position"
                  style="width: 19%"
                  v-for="(item2, col) in item"
                  :key="col"
                >
                  <q-btn
                    round
                    size="18px"
                    @click="
                      isSendAnswer ||
                      (!(checkBottom.row == row && checkBottom.col == col) &&
                        !(checkTop.row == row && checkTop.col == col) &&
                        !(checkLeft.row == row && checkLeft.col == col) &&
                        !(checkRight.row == row && checkRight.col == col))
                        ? null
                        : chooseLineMove(row, col, item2.letter)
                    "
                    :class="
                      isCorrectAnswer &&
                      currentAnswerList.filter((x) => x.row == row && x.col == col)
                        .length &&
                      isSendAnswer
                        ? 'bg-teal-3 text-black'
                        : !isCorrectAnswer &&
                          currentAnswerList.filter((x) => x.row == row && x.col == col)
                            .length &&
                          isSendAnswer
                        ? 'bg-red-3 text-black'
                        : currentAnswerList.filter((x) => x.row == row && x.col == col)
                            .length
                        ? 'bg-amber text-black'
                        : !(checkBottom.row == row && checkBottom.col == col) &&
                          !(checkTop.row == row && checkTop.col == col) &&
                          !(checkLeft.row == row && checkLeft.col == col) &&
                          !(checkRight.row == row && checkRight.col == col) &&
                          !currentAnswerList.filter((x) => x.row == row && x.col == col)
                            .length &&
                          currentAnswerList.length != currentQuestionText.length
                        ? 'cursor-not-allowed bg-black disabled'
                        : currentAnswerList.length == currentQuestionText.length &&
                          !currentAnswerList.filter((x) => x.row == row && x.col == col)
                            .length
                        ? 'cursor-not-allowed bg-black'
                        : 'cursor-pointer bg-purple'
                    "
                    class="text-bold text-white q-ma-xs"
                    style="z-index: 2"
                    ><span class="text-bold f30">{{ item2.letter }}</span>
                  </q-btn>
                  <div
                    v-if="
                      currentAnswerList.filter((x) => x.row == row && x.col == col).length
                    "
                    :class="`link-answer-${
                      currentAnswerList.filter((x) => x.row == row && x.col == col)[0]
                        .lineMove
                    }`"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12 q-py-lg" align="center">
            <q-img
              v-if="!isSendAnswer"
              style="max-width: 200px; z-index: 2"
              :class="showAnswerBtn ? 'cursor-pointer' : null"
              @click="showAnswerBtn ? sendAnswer() : null"
              :src="
                showAnswerBtn
                  ? require(`../../../public/images/send-answer-btn.png`)
                  : require(`../../../public/images/send-answer-btn-noactive.png`)
              "
            ></q-img>

            <q-img
              v-if="isSendAnswer"
              style="max-width: 200px; z-index: 2"
              class="cursor-pointer"
              @click="nextQuestion()"
              src="../../../public/images/next-question-btn.png"
            ></q-img>
          </div>
        </div>
      </div>
      <!-- <div class="col-2 bg-well-right"></div> -->
    </div>

    <q-dialog
      maximized
      v-model="isDialogAnswer"
      position="bottom"
      seamless
      no-esc-dismiss
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="transparent shadow-0">
        <q-card-section class="no-padding">
          <div class="row justify-center relative-position">
            <div class="col-6 relative-position">
              <q-img
                style="
                  margin-bottom: -80px;
                  margin-left: -50px;
                  transform: rotate(-10deg);
                "
                width="200px"
                src="../../../public/images/spellingbee/octopus.gif"
              />
            </div>
          </div>
          <div
            align="center"
            class="q-pa-md row justify-center"
            style="height: 120px; background-color: #d7ffb8"
          >
            <div class="col-6 row" style="width: 600px">
              <div class="self-center">
                <q-icon size="4em" color="green" name="far fa-check-circle"></q-icon>
              </div>
              <div class="self-center q-px-md text-green">
                <span class="text-bold f20"> ถูกต้อง</span>
                <br />
                <span class="f16">RABBIT</span>
              </div>
              <q-space></q-space>
              <div class="self-center">
                <q-btn
                  v-close-popup
                  class="text-white rounded-borders"
                  style="background-color: #58a700; width: 200px"
                >
                  ข้อต่อไป
                </q-btn>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import headerBar from "../header-time-progress";
import getColorTheme from "../../../public/themeColor.json";
import { ref, computed, watch, reactive } from "vue";
export default {
  components: {
    headerBar,
  },
  props: {
    boggle: {
      type: Array,
      default: () => [],
    },
    selectValue: {
      type: Array,
      default: () => [],
    },
    selectedLetter: {
      type: String,
      default: "",
    },
    currentQuestionText: {
      type: String,
      default: "",
    },
    currentQuestionTh: {
      type: String,
      default: "",
    },
    currentQuestion: {
      type: Number,
      defalut: 0,
    },
    totalQuestion: {
      type: Number,
      default: 0,
    },
    totalStar: {
      type: Number,
      default: 0,
    },
    practiceTime: {
      type: Number,
      default: 0,
    },
    isPracticeTimeout: {
      type: Boolean,
      default: () => false,
    },
    isCorrectAnswer: {
      type: Boolean,
      default: () => null,
    },
    themeSync: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { emit }) {
    // Initial Data
    const currentAnswerList = ref(props.selectValue);
    const isSendAnswer = ref(false);
    const colorTheme = ref(getColorTheme);
    const bgColorTheme = ref(["#FFE6A2", "#B0DEFF"]);
    const isDialogAnswer = ref(false);

    const checkBottom = computed(() => {
      return currentAnswerList.value[currentAnswerList.value.length - 1].bottom;
    });

    const checkTop = computed(() => {
      return currentAnswerList.value[currentAnswerList.value.length - 1].top;
    });

    const checkLeft = computed(() => {
      return currentAnswerList.value[currentAnswerList.value.length - 1].left;
    });

    const checkRight = computed(() => {
      return currentAnswerList.value[currentAnswerList.value.length - 1].right;
    });

    const themeBGColor = computed(() => {
      return `background-color:${bgColorTheme.value[props.themeSync - 1]}`;
    });

    const themeButton = computed(() => {
      return `background-color:${colorTheme.value[props.themeSync - 1].hex}`;
    });

    const themeQuestion = computed(() => {
      return `border-color:rgba(${
        colorTheme.value[props.themeSync - 1].rgb
      },.95);box-shadow: 0px 4px 0px ${colorTheme.value[props.themeSync - 1].hex}`;
    });

    const chooseLineMove = (row, col, val) => {
      emit("chooseBtn", { row: row, col: col, val: val });
    };

    const sendAnswer = () => {
      isSendAnswer.value = true;
      isDialogAnswer.value = true;
      emit("sendCallBack");
    };

    const showAnswerBtn = computed(() => {
      if (currentAnswerList.value.length === props.currentQuestionText.length) {
        return true;
      } else {
        return false;
      }
    });

    watch(
      () => props.selectValue,
      () => {
        currentAnswerList.value = props.selectValue;
      }
    );

    const nextQuestion = () => {
      isSendAnswer.value = false;
      console.log(currentAnswerList.value);

      emit("sendNextQuestion");
    };

    const practiceData = reactive({
      totalQuestion: 0,
      currentQuestion: 0,
      question: "",
      choices: [],
      correctAnswer: 0,
      extraSound: [],
    });

    return {
      currentAnswerList,
      isSendAnswer,
      colorTheme,
      themeBGColor,
      themeQuestion,
      themeButton,
      checkBottom,
      checkTop,
      checkLeft,
      checkRight,
      chooseLineMove,
      sendAnswer,
      showAnswerBtn,
      nextQuestion,
      practiceData,
      isDialogAnswer,
    };
  },
};
</script>

<style lang="scss" scoped>
.bg-well-left {
  background-image: url(../../../public/images/spellingbee/bg-test.png);
  background-size: contain;
  z-index: 2;
}

.bg-well-right {
  background-image: url(../../../public/images/spellingbee/bg-test.png);
  background-size: contain;
  z-index: 2;
}

.box-question {
  position: relative;
  max-width: 500px;
  width: 50;
  background-color: #fee9d4;
  border-width: 5px;
  border-style: solid;
  border-color: #d14e29;
  border-radius: 40px;
  padding: 10px;
  // margin-top: -25px;
  font-weight: bold;
  z-index: 2;
}

.box-show-answer {
  position: relative;
  width: 35px;
  margin: 0px 5px;
  font-size: 36px;
  border-bottom: 4px solid #fff;
  color: #fff;
  font-weight: bold;
  z-index: 2;
}

.border-show-answer {
  border-bottom: 4px solid transparent !important;
}

.box-content {
  max-width: 1000px;
}

.box-content-answer {
  position: relative;
  max-width: 380px;
  background-color: #4f4f4f;
  border: 7px solid #c4c4c4;
  border-radius: 5px;
  z-index: 2;
}

.box-content-answer::before {
  content: "";
  position: absolute;
  bottom: -43px;
  left: 0;
  width: 100%;
  border: 18px solid #4f4f4f;
  border-right-color: transparent;
  border-left-color: transparent;
  border-bottom-color: transparent;
}

.box-answer {
  width: 100%;
}

// Line Move Background Color
.link-answer-top {
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform: translate(-50%);
  background-color: #ff5f01;
  width: 40%;
  height: 100%;
  z-index: 1;
}

.link-answer-bottom {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
  background-color: #ff5f01;
  width: 40%;
  height: 100%;
  z-index: 1;
}

.link-answer-left {
  position: absolute;
  top: 50%;
  left: 15%;
  transform: translate(0%, -50%);
  background-color: #ff5f01;
  width: 130%;
  height: 40%;
}

.link-answer-right {
  position: absolute;
  top: 50%;
  right: 15%;
  transform: translate(0%, -50%);
  background-color: #ff5f01;
  width: 130%;
  height: 40%;
}

@keyframes STAR-MOVE {
  to {
    left: -10000px;
    top: -2000px;
  }
}

#background {
  // background: black url(../../public/images/spellingbee/background-star.png) repeat 5% 5%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;

  -webkit-animation-name: STAR-MOVE;
  -webkit-animation-duration: 1000s;
  -webkit-animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
}

#midground {
  background: url(../../../public/images/spellingbee/midground-star.png) repeat 0% 0%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;

  -webkit-animation-name: STAR-MOVE;
  -webkit-animation-duration: 500s;
  -webkit-animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
}

#foreground {
  background: url(../../../public/images/spellingbee/foreground-star.png) repeat 0% 0%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;

  -webkit-animation-name: STAR-MOVE;
  -webkit-animation-duration: 300s;
  -webkit-animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
}
</style>
