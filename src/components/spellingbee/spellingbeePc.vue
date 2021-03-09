<template>
  <div class="row" :style="themeBGColor">
    <div class="col-12 box-header" align="center">
      <div>
        <header-bar :practiceData="practiceData"></header-bar>
      </div>
      <div class="box-question" :style="themeQuestion">
        <span style="font-size: max(1.3vw, 20px)"> {{ currentQuestionTh }} </span>
      </div>
      <div class="q-my-lg row justify-center" align="center">
        <q-btn
          v-if="!isSendAnswer"
          push
          round
          :style="themeButton"
          class="text-white"
          icon="fas fa-volume-up"
        ></q-btn>

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
      <div class="row justify-center q-my-xl" align="center">
        <div
          class="box-show-answer self-end"
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
      </div>
    </div>
    <div class="col-12 self-end">
      <q-img
        class="relative-position"
        :src="
          require(`../../../public/images/spellingbee/bg-spellingbee-theme-${themeSync}.png`)
        "
      >
        <div class="fit row justify-center no-padding transparent">
          <div
            class="col-7 relative-position q-pa-md"
            align="center"
            style="max-width: 745px; width: 46.5%"
          >
            <div
              class="col-12 box-content-answer justify-between row q-mt-xs"
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
                <q-img
                  fit="contain"
                  @click="
                    isSendAnswer ||
                    (!(checkBottom.row == row && checkBottom.col == col) &&
                      !(checkTop.row == row && checkTop.col == col) &&
                      !(checkLeft.row == row && checkLeft.col == col) &&
                      !(checkRight.row == row && checkRight.col == col))
                      ? null
                      : chooseLineMove(row, col, item2.letter)
                  "
                  :src="
                    isCorrectAnswer &&
                    currentAnswerList.filter((x) => x.row == row && x.col == col)
                      .length &&
                    isSendAnswer
                      ? require(`../../../public/images/spellingbee/button-theme-${themeSync}/btn-choices-correct.png`)
                      : !isCorrectAnswer &&
                        currentAnswerList.filter((x) => x.row == row && x.col == col)
                          .length &&
                        isSendAnswer
                      ? require(`../../../public/images/spellingbee/button-theme-${themeSync}/btn-choices-incorrect.png`)
                      : currentAnswerList.filter((x) => x.row == row && x.col == col)
                          .length
                      ? require(`../../../public/images/spellingbee/button-theme-${themeSync}/btn-choices-active.png`)
                      : require(`../../../public/images/spellingbee/button-theme-${themeSync}/btn-choices-default.png`)
                  "
                  style="z-index: 2"
                  :class="
                    !(checkBottom.row == row && checkBottom.col == col) &&
                    !(checkTop.row == row && checkTop.col == col) &&
                    !(checkLeft.row == row && checkLeft.col == col) &&
                    !(checkRight.row == row && checkRight.col == col) &&
                    !currentAnswerList.filter((x) => x.row == row && x.col == col)
                      .length &&
                    currentAnswerList.length != currentQuestionText.length
                      ? 'cursor-not-allowed disabled'
                      : currentAnswerList.length == currentQuestionText.length &&
                        !currentAnswerList.filter((x) => x.row == row && x.col == col)
                          .length
                      ? 'cursor-not-allowed'
                      : 'cursor-pointer'
                  "
                >
                  <div
                    class="absolute-center text-black text-bold transparent"
                    style="top: 40%"
                  >
                    <span
                      :class="{
                        'text-white': currentAnswerList.filter(
                          (x) => x.row == row && x.col == col
                        ).length,
                      }"
                      style="font-size: max(1.5vw, 14px)"
                      >{{ item2.letter }}</span
                    >
                  </div></q-img
                >
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
            <div class="col-12 self-end q-my-sm" align="center">
              <q-img
                v-if="!isSendAnswer"
                style="max-width: 200px; width: 30%"
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
                style="max-width: 200px; width: 30%"
                class="cursor-pointer"
                @click="nextQuestion()"
                src="../../../public/images/next-question-btn.png"
              ></q-img>
            </div>
          </div>
        </div>
      </q-img>
    </div>
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
    };
  },
};
</script>

<style lang="scss" scoped>
.box-question {
  max-width: 500px;
  width: 50;
  background-color: #fff;
  border-width: 5px;
  border-style: solid;
  border-radius: 10px;
  padding: 5px;
  margin-top: -25px;
}

.box-show-answer {
  width: 30px;
  margin: 0px 5px;
  font-size: 24px;
  border-bottom: 3px solid #000;
}

.border-show-answer {
  border-bottom: 3px solid transparent !important;
}

.box-content-answer {
  max-width: 300px;
  width: 45%;
}

// Line Move Background Color
.link-answer-top {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translate(-50%);
  background-color: #ffaa2e;
  width: 30%;
  height: 120%;
  z-index: 1;
}

.link-answer-bottom {
  position: absolute;
  top: 1px;
  left: 50%;
  transform: translate(-50%);
  background-color: #ffaa2e;
  width: 30%;
  height: 120%;
  z-index: 1;
}

.link-answer-left {
  position: absolute;
  top: 40%;
  left: 15%;
  transform: translate(0%, -50%);
  background-color: #ffaa2e;
  width: 130%;
  height: 25%;
}

.link-answer-right {
  position: absolute;
  top: 40%;
  right: 15%;
  transform: translate(0%, -50%);
  background-color: #ffaa2e;
  width: 130%;
  height: 25%;
}
</style>
