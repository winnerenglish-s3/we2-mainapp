<template>
  <div>
    <div class="brx">
      <header-bar :practiceData="practiceData"></header-bar>
    </div>
    <div class="box-question q-pa-md f16" style="font-size: max(3vw, 14px)" align="left">
      <div class="q-mb-md">
        <span v-html="practiceData.question"></span>
      </div>
    </div>
    <div class="q-pa-md" v-if="!isDescription" align="center">
      <div
        v-for="(item, index) in practiceData.choices"
        :key="index"
        class="q-mt-sm"
        style="max-width: 600px; width: 100%"
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
          <div
            class="absolute-center transparent relative-position text-black full-width"
            align="center"
            style="top: 43%"
          >
            <div class="q-pa-sm" style="width: 95%" align="left">
              <span style="font-size: max(3vw, 14px)" v-html="item.choice"></span>
            </div></div
        ></q-img>
      </div>
    </div>
    <div v-if="isDescription" align="center" class="q-pa-md">
      <div class="box-description shadow-5">
        <div class="q-pa-md" :style="themeColor" align="left"></div>
        <div class="f14 q-px-sm">
          <div class="q-pa-sm row" align="left">
            <div class="col-12 row q-py-xs" v-if="isSendAnswer && !isCorrectAnswer">
              <div
                class="text-red"
                v-html="practiceData.choices[currentAnswer].choice"
              ></div>
              <div class="col q-mx-md">เป็นคำตอบที่ผิด</div>
            </div>
            <div class="col-12">คำตอบที่ถูกต้อง คือ</div>
            <div class="col-12">
              <span
                class="text-green-14"
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
import getColorTheme from "../../../public/themeColor.json";
import { ref, computed } from "vue";
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
      default: () => {},
    },
  },
  emits: ["callback-finishpractice"],
  setup(props, { emit }) {
    // Initial Color Theme
    const colorTheme = ref(getColorTheme);
    const themeColor = computed(() => {
      return `background-color:${colorTheme.value[props.themeSync - 1].hex}`;
    });

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
      // Theme Color
      themeColor,

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
.box-question {
  max-width: 1000px;
  width: 100%;
  border: 5px solid #a36112;
  background-color: #fff;
}

.box-description {
  max-width: 1000px;
  width: 95%;
  border-radius: 10px;
  overflow: hidden;
  background-color: #fff;
}
</style>
