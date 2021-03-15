<template>
  <div class="relative-position">
    <div class="absolute-bottom" style="left: 20%; bottom: 20%; z-index: 2">
      <q-img width="200px" src="../../../public/images/monsters/monster1.png"></q-img>
    </div>
    <div
      class="absolute-top-right"
      style="right: 10%; top: 20%; transform: rotate(40deg); z-index: 2"
    >
      <q-img width="150px" src="../../../public/images/monsters/monster1.png"></q-img>
    </div>
    <div class="row relative-position">
      <div class="col relative-position" align="center">
        <div class="relative-position" style="z-index: 2">
          <header-bar :practiceData="practiceData"></header-bar>
        </div>
        <div class="box-question q-mb-sm">
          <span class="f32">
            {{ currentQuestionTh }}
          </span>
        </div>
        <div class="q-py-md">
          <q-btn
            push
            style="
              background-color: #ff5f01;
              z-index: 2;
              width: 150px;
              border-radius: 30px;
            "
            class="text-white q-ml-md"
            icon="fas fa-volume-up"
          ></q-btn>
        </div>
        <div class="row justify-center box-content" align="center">
          <div
            class="box-show-answer self-end"
            v-for="(item, index) in currentQuestionText.length"
            :key="index"
          >
            {{ selectedLetter[index] }}
          </div>
          <div class="self-center">
            <q-img
              @click="undo()"
              width="60px"
              style="z-index: 2"
              class="btn-active cursor-pointer q-mt-md"
              src="../../../public/images/backspace-btn.png"
            ></q-img>
          </div>

          <div class="col-12 q-py-lg q-mt-sm">
            <div class="box-content-answer q-pa-md">
              <div
                class="justify-center row q-mt-xs box-answer"
                v-if="currentAnswerList.length"
                v-for="(item, row) in boggle"
                :key="row"
              >
                <div
                  class="relative-position"
                  :style="
                    boggleNumber == 3
                      ? 'width:33%'
                      : boggleNumber == 4
                      ? 'width:25%;'
                      : 'width:20%'
                  "
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
import answerAction from "../answer-action-pc";
import { ref, computed, watch, reactive } from "vue";
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
    boggleNumber: {
      type: Number,
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

    const undo = () => {
      if (currentAnswerList.value.length > 1) {
        let getLastData = currentAnswerList.value[currentAnswerList.value.length - 2];
        emit("chooseBtn", { row: getLastData.row, col: getLastData.col });
      }
    };

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
      undo,
      isFinishPractice,
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
  width: 30px;
  height: 100%;
}

.link-answer-bottom {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
  background-color: #ff5f01;
  width: 30px;
  height: 100%;
}

.link-answer-left {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(0%, -50%);
  background-color: #ff5f01;
  width: 100%;
  height: 30px;
}

.link-answer-right {
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(0%, -50%);
  background-color: #ff5f01;
  width: 100%;
  height: 30px;
}

.btn-active {
  transform: scale(1);
}

.btn-active:active {
  transform: scale(0.9);
}
</style>
