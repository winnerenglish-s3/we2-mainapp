<template>
  <div class="row">
    <div class="bg-phonics-multi relative-position col row">
      <div class="absolute-top">
        <header-bar :practiceData="practiceData"></header-bar>
      </div>
      <div class="col-12 self-start row">
        <div class="col-12 bg-animation">
          <theme-animation
            :choicesLength="practiceData.choices.length"
            :isSendAnswer="isSendAnswer"
            :selectAnswer="selectAnswer"
            :isCorrect="isCorrect"
            :themeSync="themeSync"
          ></theme-animation>
        </div>
      </div>

      <div class="col-12 row justify-center box-content-choice">
        <div class="col-12 row justify-center">
          <div class="col-12 q-pt-lg q-pb-md" align="center">
            <div
              class="box-content-question row bg-white q-px-md q-py-sm"
              align="center"
              v-if="!isQuestionSound"
            >
              <div class="col self-center" align="center">
                <span
                  style="font-size: max(1.2vw, 18px)"
                  v-html="practiceData.question"
                ></span>
              </div>
            </div>
            <div v-else>
              <q-img
                class="cursor-pointer"
                style="max-width: 460px; width: 100%"
                src="../../../public/images/phonicsmulti/question-sound-btn.png"
              >
                <div
                  style="font-size: max(1.2vw, 18px); top: 45%"
                  class="transparent absolute-center full-width"
                >
                  <span> กดเพื่อฟังเสียงโจทย์</span>
                  <q-icon class="q-mx-md" name="fas fa-volume-up"></q-icon></div
              ></q-img>
            </div>
          </div>
          <div
            class="col-3 self-center q-pa-xs"
            align="center"
            v-for="(item, index) in practiceData.choices"
            :key="index"
          >
            <q-img
              style="max-width: 260px; width: 100%"
              :class="isSendAnswer ? null : 'cursor-pointer'"
              @click="isSendAnswer ? null : (selectAnswer = index)"
              :src="
                require(`../../../public/images/phonicsmulti/button-theme/phonics-choices-${themeSync}-${
                  isSendAnswer
                    ? selectAnswer == index
                      ? isCorrect
                        ? 'correct'
                        : 'incorrect'
                      : correctAnswer == index
                      ? 'correct'
                      : 'default'
                    : selectAnswer == index
                    ? 'active'
                    : 'default'
                }.png`)
              "
            >
              <div
                class="transparent absolute-center text-black"
                style="font-size: max(1.2vw, 20px); top: 45%"
              >
                <span v-if="isQuestionSound">
                  {{ index }}
                </span>
                <span v-else>
                  <q-icon name="fas fa-volume-up"></q-icon>
                  <div v-if="isSendAnswer">
                    <span>{{ index }}</span>
                  </div>
                </span>
              </div>
            </q-img>
          </div>
          <div class="col-12 self-end q-pa-md" align="center">
            <q-img
              width="200px"
              :class="selectAnswer == null ? null : 'cursor-pointer'"
              @click="selectAnswer == null ? null : funcSendAnswer()"
              :src="
                require(`../../../public/images/send-answer-btn${
                  selectAnswer == null ? '-noactive' : ''
                }.png`)
              "
              v-if="!isSendAnswer"
            ></q-img>

            <q-img
              @click="funcNextQuestion()"
              width="200px"
              v-if="
                isSendAnswer &&
                practiceData.currentQuestion + 1 != practiceData.totalQuestion
              "
              class="cursor-pointer"
              src="../../../public/images/next-question-btn.png"
            ></q-img>

            <q-img
              v-if="
                isSendAnswer &&
                practiceData.currentQuestion + 1 == practiceData.totalQuestion
              "
              @click="$emit('callback-finishpractice')"
              width="200px"
              class="cursor-pointer"
              src="../../../public/images/success-btn.png"
            ></q-img>
          </div>
        </div>
      </div>
    </div>

    <div class="col-3 box-help">
      <div
        class="box-help-header q-pa-lg text-white"
        style="font-size: max(1.1vw, 14px)"
        align="center"
      >
        เทียบเสียง
      </div>
      <div class="box-help-scroll">
        <div
          class="row justify-around q-py-sm q-px-lg"
          style="border-bottom: 1px solid #c4c4c4; font-size: max(0.95vw, 12px)"
          v-for="(item, index) in practiceData.extraSound"
          :key="index"
        >
          <div class="col" align="center">
            <span>{{ item.vocab }}</span>
          </div>
          <div class="col-6" align="center">
            <span>เทียบได้กับสระ</span>
          </div>
          <div class="col" align="center">
            <span>{{ item.alphabets }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headerBar from "../header-time-progress";
import themeAnimation from "../phonicsmultiple/theme-animation";
import { ref } from "vue";
export default {
  components: {
    headerBar,
    themeAnimation,
  },
  props: {
    themeSync: {
      type: Number,
      default: 0,
    },
    practiceData: {
      type: Object,
      defulat: () => {},
    },
  },
  emits: ["callback-finishpractice"],
  setup(props, { emit }) {
    const selectAnswer = ref(null);
    const isQuestionSound = ref(false);
    const isSendAnswer = ref(false);
    const isCorrectAnswer = ref(false);

    const funcSendAnswer = () => {
      isSendAnswer.value = true;
      let choiceIndex = selectAnswer.value;

      if (Number(props.practiceData.correctAnswer) == choiceIndex) {
        console.log("pass");
        isCorrectAnswer.value = true;
      } else {
        console.log("fails");
        isCorrectAnswer.value = false;
      }
    };

    const funcNextQuestion = () => {
      isSendAnswer.value = false;
      selectAnswer.value = null;

      emit("callback-nextquestion");
    };

    return {
      selectAnswer,
      isQuestionSound,
      isSendAnswer,
      isCorrectAnswer,
      funcSendAnswer,
      funcNextQuestion,
    };
  },

  // methods: {
  //   sendAnswer() {
  //     this.isSendAnswer = true;

  //     if (this.correctAnswer == this.selectAnswer) {
  //       this.isCorrect = true;
  //     }
  //   },
  //   nextQuestion() {
  //     this.isSendAnswer = false;
  //     this.selectAnswer = null;
  //     this.isCorrect = false;
  //   },
  // },
};
</script>

<style lang="scss" scoped>
.bg-phonics-multi {
  background-color: #ffd5b7;
}

.bg-animation {
  background-image: url("../../../public/images/phonicsmulti/bg-phonicsmulti.png");
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
}

.box-content-choice {
  min-height: 45vh;
  max-height: fit-content;
  background-color: #ffd5b7;
}

.box-content-question {
  max-width: 600px;
  width: 95%;
  min-height: 80px;
  max-height: fit-content;
  border-radius: 7px;
  border: 5px solid #014270;
}

.box-help {
  width: 21%;
  background-color: #fff0da;
}

.box-help-header {
  height: 80px;
  background-color: #014270;
}

.box-help-scroll {
  height: calc(100vh - 130px);
  overflow: auto;
}

/* width */
.box-help-scroll::-webkit-scrollbar {
  width: 6px;
}

/* Track */
.box-help-scroll::-webkit-scrollbar-track {
  background: #eaa02c;
}

/* Handle */
.box-help-scroll::-webkit-scrollbar-thumb {
  background: #9f220c;
}

/* Handle on hover */
.box-help-scroll::-webkit-scrollbar-thumb:hover {
  background: #861d0a;
}
</style>
