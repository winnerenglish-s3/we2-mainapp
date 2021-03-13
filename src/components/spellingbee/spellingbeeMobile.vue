<template>
  <div class="row relative-position" style="background-color: #252a52">
    <div class="col-12 row" align="center">
      <div class="col-12" style="margin-top: -10px">
        <div style="z-index: 2">
          <header-bar :practiceData="practiceData"></header-bar>
        </div>
      </div>

      <div class="col-12 q-py-md" style="">
        <div class="q-px-md">
          <div class="box-question">
            <span class="f24"> {{ currentQuestionTh }} </span>
          </div>
        </div>
        <div class="row justify-center q-py-lg" align="center">
          <div
            class="box-show-answer self-end f20"
            v-for="(item, index) in currentQuestionText.length"
            :key="index"
          >
            {{ selectedLetter[index] }}
          </div>
        </div>
        <div class="col-12 self-center">
          <q-btn
            push
            round
            style="background-color: #ff5f01; z-index: 2"
            class="text-white q-ml-sm"
            icon="fas fa-volume-up"
          ></q-btn>
        </div>

        <div class="box-content-answer q-pa-md">
          <div
            class="justify-between row q-mt-xs q-px-md"
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
                push
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

          <div class="q-pa-md" align="right">
            <q-img
              @click="undo()"
              width="60px"
              style="z-index: 2"
              class="btn-active"
              src="../../../public/images/backspace-btn.png"
            ></q-img>
          </div>

          <div class="q-pb-sm" align="center">
            <q-img
              v-if="!isSendAnswer"
              style="max-width: 200px; z-index: 2"
              :class="showAnswerBtn ? 'cursor-pointer btn-active' : null"
              @click="showAnswerBtn ? sendAnswer() : null"
              :src="
                showAnswerBtn
                  ? require(`../../../public/images/send-answer-btn.png`)
                  : require(`../../../public/images/send-answer-btn-noactive.png`)
              "
            ></q-img>
          </div>
        </div>
      </div>
    </div>

    <answer-action
      :isCorrectAnswer="isCorrectAnswer"
      :answer="currentQuestionText"
      :isAnswerAction="isSendAnswer"
      :isFinishPractice="isFinishPractice"
      @callback-nextquestion="funcNextQuestion()"
      @callback-finishpractice="$emit('callback-finishpractice')"
    ></answer-action>
  </div>
</template>

<script>
import headerBar from "../header-time-progress";
import answerAction from "../answer-action-mobile";
import { ref, computed, watch } from "vue";
export default {
  components: {
    headerBar,
    answerAction,
  },
  props: {
    practiceData: {
      type: Object,
      default: () => {},
    },
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
    isCorrectAnswer: {
      type: Boolean,
      default: () => null,
    },
    boggleNumber: {
      type: Number,
      default: () => [],
    },
  },
  emits: ["callback-nextquestion"],
  setup(props, { emit }) {
    // Initial Data
    const currentAnswerList = ref(props.selectValue);
    const isSendAnswer = ref(false);
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

    const chooseLineMove = (row, col, val) => {
      emit("chooseBtn", { row: row, col: col, val: val });
    };

    const undo = () => {
      if (currentAnswerList.value.length > 1) {
        let getLastData = currentAnswerList.value[currentAnswerList.value.length - 2];
        emit("chooseBtn", { row: getLastData.row, col: getLastData.col });
      }
    };

    const isFinishPractice = ref(false);

    const sendAnswer = () => {
      isSendAnswer.value = true;

      if (props.practiceData.totalQuestion == props.practiceData.currentQuestion + 1) {
        isFinishPractice.value = true;
      }

      emit("callback-sendanswer");
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

    const funcNextQuestion = () => {
      isSendAnswer.value = false;

      emit("callback-nextquestion");
    };

    return {
      currentAnswerList,
      isSendAnswer,
      checkBottom,
      checkTop,
      checkLeft,
      checkRight,
      chooseLineMove,
      sendAnswer,
      showAnswerBtn,
      funcNextQuestion,
      isFinishPractice,
      undo,
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
  width: 18px;
  margin: 0px 2px;
  border-bottom: 2px solid #fff;
  font-weight: bold;
  color: #fff;
}

.box-content-answer {
  max-width: 400px;
  width: 100%;
  z-index: 2;
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

.btn-active {
  transform: scale(1);
}

.btn-active:active {
  transform: scale(0.9);
}
</style>
