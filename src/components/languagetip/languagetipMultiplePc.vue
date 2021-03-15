<template>
  <div class="row bg-main">
    <div class="col-12 relative-position self-start" align="center">
      <div class="absolute full-width">
        <header-bar :practiceData="practiceData"></header-bar>
      </div>
      <theme-animation
        :isCorrectAnswer="isCorrectAnswer"
        :isSendAnswer="isSendAnswer"
      ></theme-animation>
    </div>
    <div class="col-12" align="center" v-show="!isDescription">
      <div class="box-question q-pa-md f20" align="left">
        <span v-html="practiceData.question"></span>
      </div>
      <div class="row box-choice q-my-md">
        <div
          class="col-6 q-my-xs"
          v-for="(item, index) in practiceData.choices"
          :key="index"
        >
          <q-img
            @click="isSendAnswer ? null : funcSendAnswer(index)"
            class="cursor-pointer"
            fit="contain"
            :src="
              require(`../../../public/images/languagetip/languagetip-choices-${
                isSendAnswer
                  ? currentAnswer == index
                    ? isCorrectAnswer
                      ? 'correct'
                      : 'incorrect'
                    : 'default'
                  : 'default'
              }.png`)
            "
          >
            <div class="transparent text-black full-width" align="left">
              <div class="q-px-sm">
                <span class="f20" v-html="item.choice"> </span>
              </div></div
          ></q-img>
        </div>
      </div>
    </div>
    <div class="col-12" v-show="isDescription" align="center">
      <div class="box-description">
        <div class="q-pa-md" style="background-color: #9f220c"></div>
        <div class="f16 q-px-md">
          <div class="q-pa-md row" align="left">
            <div class="col-12 row q-py-xs" v-if="isSendAnswer && !isCorrectAnswer">
              <div
                class="text-red"
                v-html="practiceData.choices[currentAnswer].choice"
              ></div>
              <div class="col q-mx-md">เป็นคำตอบที่ผิด</div>
            </div>
            <div class="col-12 row">
              <div class="col-2">คำตอบที่ถูกต้อง คือ</div>
              <div class="col">
                <span
                  class="text-green-6"
                  v-html="
                    practiceData.choices.filter(
                      (x) => x.index == practiceData.correctAnswer
                    )[0].choice
                  "
                ></span>
                <div>
                  <span v-html="practiceData.description"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="q-my-md" align="center">
          <q-img
            v-show="
              isSendAnswer &&
              practiceData.currentQuestion + 1 != practiceData.totalQuestion
            "
            @click="funcNextQuestion()"
            class="cursor-pointer"
            width="200px"
            src="../../../public/images/next-question-btn.png"
          ></q-img>
          <q-img
            v-show="
              isSendAnswer &&
              practiceData.currentQuestion + 1 == practiceData.totalQuestion
            "
            @click="$emit('callback-finishpractice')"
            class="cursor-pointer"
            width="200px"
            src="../../../public/images/success-btn.png"
          ></q-img>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headerBar from "../header-time-progress";
import themeAnimation from "./theme-animation";
import { ref, computed } from "vue";
export default {
  components: {
    headerBar,
    themeAnimation,
  },
  props: {
    practiceData: {
      type: Object,
      default: () => {},
    },
  },
  emits: ["callback-finishpractice"],
  setup(props, { emit }) {
    const currentAnswer = ref(null);
    const isSendAnswer = ref(false);
    const isCorrectAnswer = ref(false);
    const isDescription = ref(false);

    // Function : Send Answer
    const funcSendAnswer = (index) => {
      isSendAnswer.value = true;

      currentAnswer.value = index;

      let choiceIndex = props.practiceData.choices[index].index;

      if (choiceIndex == Number(props.practiceData.correctAnswer)) {
        isCorrectAnswer.value = true;
      } else {
        isCorrectAnswer.value = false;
      }

      setTimeout(() => {
        isDescription.value = true;
      }, 500);
    };

    // Function : Next Question
    const funcNextQuestion = () => {
      isSendAnswer.value = false;

      isDescription.value = false;

      emit("callback-nextquestion");
    };

    return {
      // Current Select Answer
      currentAnswer,

      // is Show Details
      isDescription,
      isSendAnswer,
      isCorrectAnswer,

      // Function
      funcSendAnswer,
      funcNextQuestion,
    };
  },
};
</script>

<style lang="scss" scoped>
.bg-main {
  background-color: #46598a;
}

.box-question {
  max-width: 1000px;
  width: 95%;
  border: 5px solid #a36112;
  background-color: #fff;
}

.box-choice {
  max-width: 1000px;
  width: 95%;
}

.box-description {
  max-width: 1000px;
  width: 95%;
  border-radius: 10px;
  overflow: hidden;
  background-color: #fff;
}
</style>
