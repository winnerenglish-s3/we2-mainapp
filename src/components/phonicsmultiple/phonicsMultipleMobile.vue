<template>
  <div class="box-container row">
    <div class="col-12">
      <header-bar :practiceData="practiceData"></header-bar>
      <div class="q-pa-sm" align="center">
        <div
          class="box-content-question row bg-white q-px-sm q-py-sm"
          align="center"
          v-if="!isQuestionSound"
        >
          <div class="col self-center" align="center">
            <span style="font-size: max(1vw, 14px)" v-html="practiceData.question"></span>
          </div>
        </div>
        <div v-else>
          <q-img
            class="cursor-pointer"
            style="max-width: 320px; width: 100%"
            src="../../../public/images/phonicsmulti/question-sound-btn-mobile.png"
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
      <div class="q-my-md q-pa-sm">
        <div
          v-for="(item, index) in practiceData.choices"
          :key="index"
          class="q-mb-sm"
          align="center"
        >
          <q-img
            style="max-width: 320px; width: 100%"
            :class="isSendAnswer ? null : 'cursor-pointer'"
            @click="
              isSendAnswer
                ? null
                : ((currentAnswer = index), $emit('callback-playsound', item.soundUrl))
            "
            :src="
              require(`../../../public/images/phonicsmulti/button-theme/phonics-choices-1-${
                isSendAnswer
                  ? currentAnswer == index
                    ? isCorrectAnswer
                      ? 'correct'
                      : 'incorrect'
                    : 'default'
                  : currentAnswer == index
                  ? 'active'
                  : 'default'
              }-mobile.png`)
            "
          >
            <div
              class="transparent absolute-center text-black"
              style="font-size: max(2vw, 16px); top: 45%"
            >
              <span v-if="isQuestionSound">
                {{ item.choice }}
              </span>
              <span v-else>
                <span v-if="isSendAnswer" class="q-mr-md">{{ item.choice }}</span>
                <q-icon name="fas fa-volume-up"></q-icon>
              </span></div
          ></q-img>
        </div>
      </div>
    </div>
    <div class="col-12 self-end q-pa-md" align="center">
      <q-img
        width="200px"
        :class="currentAnswer == null ? null : 'cursor-pointer'"
        @click="currentAnswer == null ? null : funcSendAnswer()"
        :src="
          require(`../../../public/images/send-answer-btn${
            currentAnswer == null ? '-noactive' : ''
          }.png`)
        "
        v-if="!isSendAnswer"
      ></q-img>

      <q-img
        v-if="
          isSendAnswer && practiceData.currentQuestion + 1 != practiceData.totalQuestion
        "
        @click="funcNextQuestion()"
        width="200px"
        class="cursor-pointer"
        src="../../../public/images/next-question-btn.png"
      ></q-img>
      <q-img
        v-if="
          isSendAnswer && practiceData.currentQuestion + 1 == practiceData.totalQuestion
        "
        @click="$emit('callback-finishpractice')"
        width="200px"
        class="cursor-pointer"
        src="../../../public/images/success-btn.png"
      ></q-img>
    </div>
  </div>
</template>

<script>
import headerBar from "../header-time-progress";
import { ref } from "vue";
export default {
  components: {
    headerBar,
  },

  props: {
    practiceData: {
      type: Object,
      defulat: () => {},
    },
  },
  emits: ["callback-finishpractice", "callback-playsound"],
  setup(props, { emit }) {
    const currentAnswer = ref(null);
    const isQuestionSound = ref(false);
    const isSendAnswer = ref(false);
    const isCorrectAnswer = ref(false);

    const funcSendAnswer = () => {
      isSendAnswer.value = true;

      let choiceIndex = props.practiceData.choices[currentAnswer.value].index;

      if (Number(props.practiceData.correctAnswer) == choiceIndex) {
        isCorrectAnswer.value = true;
      } else {
        isCorrectAnswer.value = false;
      }
    };

    const funcNextQuestion = () => {
      isSendAnswer.value = false;
      currentAnswer.value = null;

      emit("callback-nextquestion");
    };

    return {
      currentAnswer,
      isQuestionSound,
      isSendAnswer,
      isCorrectAnswer,
      funcSendAnswer,
      funcNextQuestion,
    };
  },
};
</script>

<style lang="scss" scoped>
.box-container {
  min-height: calc(100vh - 50px);
  max-height: fit-content;
}

.box-content-question {
  max-width: 320px;
  width: 100%;
  min-height: 80px;
  max-height: fit-content;
  border-radius: 7px;
  border: 5px solid #014270;
}
</style>
