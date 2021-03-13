<template>
  <div class="relative-position row justify-center bg-content-answer">
    <div class="absolute full-width">
      <header-bar :practiceData="practiceData"></header-bar>
    </div>
    <div class="col-12 self-start bg-sky">
      <theme-animation
        :isCorrectAnswer="isCorrectAnswer"
        :isSendAnswer="isSendAnswer"
        style="margin-bottom: -5px; z-index: 3"
      ></theme-animation>
    </div>
    <div
      class="col-12 q-px-md row justify-center"
      style="max-width: 1200px; width: 100%; z-index: 1"
      v-for="i in 3"
      v-if="practiceData.choices.length"
    >
      <div class="col-3 q-py-xs self-center">
        <draggable
          v-model="choiceList[i - 1]"
          :group="{
            name: 'vocab',
            pull: isSendAnswer ? false : true,
            put: choiceList[i - 1].length == 1 ? false : true,
          }"
          style="width: 100%; height: 100px"
          class="relative-position"
          :class="
            !isSendAnswer
              ? isDrop && !choiceList[i - 1].length
                ? 'box-move'
                : choiceList[i - 1].length
                ? ''
                : 'box-selected'
              : 'box-selected no-pointer-events'
          "
          @start="isDrop = true"
          @end="isDrop = false"
        >
          <div
            class="relative-position cursor-pointer"
            v-for="(data, index) in choiceList[i - 1]"
            :key="index"
          >
            <div
              class="relative-position"
              :class="
                !isSendAnswer
                  ? isDrop && !choiceList[i - 1].length
                    ? 'box-move'
                    : choiceList[i - 1].length
                    ? 'box-content-answer answer-default'
                    : 'box-selected'
                  : 'box-selected no-pointer-events'
              "
              style="width: 100%; height: 100px"
              no-caps
            >
              <div class="brx border-dash-top-right"></div>
              <div class="absolute-center f18 full-width" align="center">
                <span class=""> {{ data.vocab }}</span>
              </div>
              <div class="brx border-dash-bottom-right"></div>
            </div>
          </div>
        </draggable>
      </div>
      <div class="col-1"></div>
      <div class="col-3 q-py-xs self-center">
        <draggable
          v-model="answerList[i - 1]"
          :group="{
            name: 'vocab',
            pull: isSendAnswer ? false : true,
            put: answerList[i - 1].length == 1 ? false : true,
          }"
          style="width: 100%; height: 100px"
          class="relative-position"
          :class="
            !isSendAnswer
              ? isDrop && !answerList[i - 1].length
                ? 'box-move'
                : answerList[i - 1].length
                ? ''
                : 'box-selected'
              : isCorrectAnswer
              ? ' answer-correct no-pointer-events'
              : ' answer-incorrect no-pointer-events'
          "
          @start="isDrop = true"
          @end="isDrop = false"
        >
          <div
            class="relative-position cursor-pointer"
            v-for="(data, index) in answerList[i - 1]"
            :key="index"
          >
            <div
              :class="
                !isSendAnswer
                  ? isDrop && !answerList[i - 1].length
                    ? 'box-move'
                    : answerList[i - 1].length
                    ? 'box-content-answer answer-default'
                    : 'box-selected'
                  : practiceData.question[i - 1][index].vocab == data.vocab
                  ? 'box-content-answer answer-correct no-pointer-events'
                  : 'box-content-answer answer-incorrect no-pointer-events'
              "
              style="width: 100%; height: 100px"
              no-caps
            >
              <q-icon
                v-if="isSendAnswer"
                size="20px"
                :name="
                  practiceData.question[i - 1][index].vocab == data.vocab
                    ? 'far fa-check-circle'
                    : 'far fa-times-circle'
                "
                class="text-white absolute-bottom-right"
                style="bottom: 5px; right: 15px"
              ></q-icon>
              <div
                class="absolute-center f18 full-width"
                align="center"
                style="width: 90%"
              >
                <div class="q-pb-xs">
                  <span> {{ data.vocab }}</span>
                </div>
                <div
                  v-if="
                    isSendAnswer &&
                    practiceData.question[i - 1][index].vocab != data.vocab
                  "
                >
                  <div class="q-py-xs">
                    <span>คำตอบที่ถูกต้องคือ</span>
                  </div>
                  <div class="q-pb-xs">
                    <span class="text-white">{{
                      practiceData.question[i - 1][index].vocab
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </draggable>
      </div>
      <div class="col-5 self-center">
        <q-btn
          v-for="(data, index) in practiceData.question[i - 1]"
          :key="index"
          class="no-pointer-events box-question"
          style="width: 100%; height: 100px; margin-left: -3px"
          no-caps
        >
          <span class="f20">
            {{ data.meaning }}
          </span>
        </q-btn>
      </div>
    </div>

    <div
      class="col-12 self-center q-py-md"
      align="center"
      v-if="practiceData.question.length"
    >
      <q-img
        v-show="!isSendAnswer"
        @click="checkAnswerList ? funcSendAnswer() : null"
        :class="checkAnswerList ? 'cursor-pointer' : null"
        width="200px"
        :src="
          require(`../../../public/images/matching/btn-matching-${
            checkAnswerList ? '' : 'not'
          }active.png`)
        "
      ></q-img>

      <q-img
        v-show="
          isSendAnswer && practiceData.currentQuestion + 1 != practiceData.totalQuestion
        "
        @click="funcNextQuestion()"
        class="cursor-pointer"
        width="200px"
        src="../../../public/images/next-question-btn.png"
      ></q-img>

      <q-img
        v-show="
          isSendAnswer && practiceData.currentQuestion + 1 == practiceData.totalQuestion
        "
        class="cursor-pointer"
        width="200px"
        @click="$emit('callback-finishpractice', { star: star, score: score })"
        src="../../../public/images/finish-btn.png"
      ></q-img>
    </div>
  </div>
</template>

<script>
import themeAnimation from "../matching/theme-animation";
import headerBar from "../header-time-progress";
import { ref, computed, watch } from "vue";
import { VueDraggableNext } from "vue-draggable-next";
export default {
  props: {
    practiceData: {
      type: Object,
      default: () => {},
    },
  },
  emits: ["callback-finishpractice", "callback-nextquestion"],
  setup(props, { emit }) {
    const isDrop = ref(false);
    const isCorrectAnswer = ref(false);
    const isSendAnswer = ref(false);

    const choiceList = ref([...props.practiceData.choices]);
    const answerList = ref([[], [], []]);

    // Check AnswerList
    const checkAnswerList = computed(() => {
      let answerAll = answerList.value
        .map((x) => (x.length ? true : false))
        .every((x) => x);

      if (answerAll) {
        return true;
      }
      return false;
    });

    // จำนวนคำที่ตอบถูก
    const countTotalCorrect = ref(0);
    // คะแนน
    // สูตร = math round (จำนวนคำที่ถูก / จำนวนคำทั้งหมด * 100)
    const score = ref(0);
    // ดาวที่ได้รับ

    const star = computed(() => {
      let result = 0;
      if (score.value >= 80) {
        result = 3;
      } else if (score.value >= 65) {
        result = 2;
      } else if (score.value >= 50) {
        result = 1;
      }
      return result;
    });

    // ฟังก์ชันการส่งคำตอบ
    const funcSendAnswer = () => {
      isSendAnswer.value = true;

      let checkAnswerCorrrect = props.practiceData.question
        .map((x) => x[0].vocab)
        .every((x, index) => x == answerList.value[index][0].vocab);

      if (checkAnswerCorrrect) {
        isCorrectAnswer.value = true;
        countTotalCorrect.value += 3;
      } else {
        const mapQuestion = props.practiceData.question.map((x) => x[0].vocab);
        for (let i = 0; i < mapQuestion.length; i++) {
          if (mapQuestion[i] == answerList.value[i][0].vocab) {
            countTotalCorrect.value++;
          }
        }
        isCorrectAnswer.value = false;
      }
      score.value = Math.round(
        (countTotalCorrect.value / (props.practiceData.totalQuestion * 3)) * 100
      );

      if (props.practiceData.currentQuestion + 1 == props.practiceData.totalQuestion) {
        // console.log("บันทึกคะแนน");
        emit("callback-finishpractice", { star: star.value, score: score.value });
      }
    };

    // Func Next Question
    const funcNextQuestion = () => {
      answerList.value = [[], [], []];

      isSendAnswer.value = false;

      emit("callback-nextquestion");
    };

    watch(props.practiceData, () => {
      choiceList.value = [...props.practiceData.choices];
    });

    return {
      choiceList,
      answerList,
      isDrop,
      checkAnswerList,

      isCorrectAnswer,
      isSendAnswer,

      // Send Answer
      funcSendAnswer,
      score,
      star,

      // Next Question
      funcNextQuestion,
    };
  },
  components: {
    headerBar,
    themeAnimation,
    draggable: VueDraggableNext,
  },
};
</script>

<style lang="scss" scoped>
.bg-sky {
  background-image: url("../../../public/images/matching/bg-sky.png");
  background-size: cover;
  background-position: top;
}

.bg-content-answer {
  background-image: url("../../../public/images/matching/bg-content-matching.png");
  background-size: contain;
  width: 100%;
}

.box-selected {
  position: relative;
  border: 3px dashed #512a08;
  box-sizing: border-box;
  overflow: hidden;
}

// .box-selected::before {
//   content: "";
//   position: absolute;
//   right: -25px;
//   top: 50%;
//   transform: translate(0%, -50%);
//   width: 50px;
//   height: 50px;
//   border-radius: 50%;
//   border-right: transparent;
//   border: 3px dashed #512a08;
// }

.box-move {
  position: relative;
  background-color: #5dddff;
  opacity: 0.5;
  border: 3px dashed #512a08;
  box-sizing: border-box;
  overflow: hidden;
}

.box-content-answer {
  position: relative;
  border: 3px solid #512a08;
  border-right: transparent;
  box-sizing: border-box;
  overflow: hidden;
}

.span-circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #ffe6a2;
  z-index: 2;
}

.box-question {
  position: relative;
  background-color: #ffe6a2;
  border: 3px solid #512a08;
  border-left-style: dashed;
  box-sizing: border-box;
}

.box-question::before {
  content: "";
  width: 50px;
  height: 50px;
  left: -25px;
  top: 50%;
  transform: translate(0%, -50%) rotate(45deg);
  background-color: #ffe6a2;
  border: 3px dashed;
  border-radius: 50%;
  border-right-color: transparent;
  border-top-color: transparent;
  z-index: 0;
  box-shadow: 0px 0px transparent;
}

.answer-default {
  position: absolute;
  box-sizing: border-box;
}

.answer-default::before {
  content: "";
  position: absolute;
  right: -25px;
  top: 50%;
  transform: translate(0%, -50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border-right: transparent;
  box-shadow: 0px 100px 0px 500px #f8be2b;
  border: 3px dashed #512a08;
}

.border-dash-top-right {
  position: absolute;
  right: -1px;
  top: -3px;
  border: 2px dashed #512a08;
  height: 30%;
  box-sizing: border-box;
}
.border-dash-bottom-right {
  position: absolute;
  right: -1px;
  bottom: -3px;
  border: 2px dashed #512a08;
  height: 30%;
  box-sizing: border-box;
}

.answer-correct {
  background-color: #4caf50;
}

.answer-incorrect {
  background-color: #ff5d5d;
}
</style>
