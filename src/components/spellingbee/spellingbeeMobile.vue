<template>
  <div class="row relative-position" style="background-color: #252a52">
    <div id="background"></div>
    <div id="midground"></div>
    <div id="foreground"></div>
    <div class="col-12 row" align="center">
      <div class="col-12" style="margin-top: -10px">
        <div>
          <header-bar
            :practiceData="{ totalQuestion: 5, currentQuestion: 0 }"
          ></header-bar>
        </div>
        <div class="q-px-md">
          <div class="box-question">
            <span class="f24"> {{ currentQuestionTh }} </span>
          </div>
        </div>
        <div class="q-mt-lg row justify-center" align="center">
          <q-icon
            v-if="isSendAnswer"
            :name="!isCorrectAnswer ? 'far fa-times-circle' : 'far fa-check-circle'"
            :class="!isCorrectAnswer ? 'text-red-7' : 'text-green-7'"
            size="42px"
          ></q-icon>
          <span
            v-if="isSendAnswer && !isCorrectAnswer"
            class="relative-position q-mx-md"
            style="font-size: 24px"
            >คำตอบที่ถูกต้อง คือ</span
          >
        </div>
      </div>

      <div class="col-12">
        <div
          class="row justify-center q-pt-md"
          style="font-size: max(1.5vw, 18px)"
          align="center"
        >
          <div
            class="box-show-answer self-end f24"
            :class="{ 'border-show-answer': isSendAnswer && !isCorrectAnswer }"
            v-for="(item, index) in currentQuestionText.length"
            :key="index"
          >
            {{
              isSendAnswer
                ? currentQuestionText[index].toLocaleUpperCase()
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
              class="text-white q-ml-sm"
              icon="fas fa-volume-up"
              size="14px"
            ></q-btn>
          </div>
        </div>
      </div>

      <div class="col-12">
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
                size="16px"
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
                  currentAnswerList.filter((x) => x.row == row && x.col == col).length &&
                  isSendAnswer
                    ? 'bg-teal-3 text-black'
                    : !isCorrectAnswer &&
                      currentAnswerList.filter((x) => x.row == row && x.col == col)
                        .length &&
                      isSendAnswer
                    ? 'bg-red-3 text-black'
                    : currentAnswerList.filter((x) => x.row == row && x.col == col).length
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
                ><span class="text-bold f24">{{ item2.letter }}</span>
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

        <div class="col q-py-sm q-mt-sm" align="center">
          <q-img
            v-if="!isSendAnswer"
            style="max-width: 200px; width: 50%; z-index: 2"
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
            style="max-width: 200px; width: 50%; z-index: 2"
            class="cursor-pointer"
            @click="nextQuestion()"
            src="../../../public/images/next-question-btn.png"
          ></q-img>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headerBar from "../header-time-progress";
import getColorTheme from "../../../public/themeColor.json";
import { ref, computed, watch } from "vue";
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
    currentQuestion: {
      type: Number,
      defalut: 0,
    },
    currentQuestionTh: {
      type: String,
      default: "",
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
    };
  },
};
</script>

<style lang="scss" scoped>
.box-question {
  position: relative;
  max-width: 400px;
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
  width: 25px;
  margin: 0px 5px;
  border-bottom: 3px solid #fff;
  font-weight: bold;
  color: #fff;
}

.box-content-answer {
  max-width: 400px;
  width: 100%;
}

.border-show-answer {
  border-bottom: 3px solid transparent !important;
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
  left: 50%;
  transform: translate(0%, -50%);
  background-color: #ff5f01;
  width: 100%;
  height: 40%;
}

.link-answer-right {
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(0%, -50%);
  background-color: #ff5f01;
  width: 100%;
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
