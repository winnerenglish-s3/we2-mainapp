<template>
  <div class="box-container row">
    <div class="col-12">
      <header-bar :practiceData="practiceData"></header-bar>
      <div align="center">
        <div class="box-content-question row q-px-sm" align="center">
          <div class="col self-center" align="center">
            <span style="font-size: 14px" v-html="practiceData.question"></span>
          </div>
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
            style="max-width: 400px; width: 95%"
            :class="isSendAnswer ? null : 'cursor-pointer'"
            @click="
              isSendAnswer
                ? null
                : ((selectAnswer = index), $emit('callback-playsound', item.soundUrl))
            "
            :src="
              require(`../../../public/images/conversation/choice-${
                isSendAnswer
                  ? selectAnswer == index
                    ? isCorrectAnswer
                      ? 'correct'
                      : 'incorrect'
                    : currentAnswer == item.index
                    ? 'correct'
                    : 'default'
                  : selectAnswer == index
                  ? 'active'
                  : 'default'
              }-conver-mobile.png`)
            "
          >
            <div
              class="transparent absolute-center text-black"
              style="font-size: 16px; top: 45%"
            >
              <span>
                <span v-if="isSendAnswer" class="q-mr-md" v-html="item.choice"></span>
                <q-icon name="fas fa-volume-up"></q-icon>
              </span></div
          ></q-img>
        </div>
      </div>
    </div>
    <div class="col-12 self-end q-pa-md" align="center">
      <q-img
        width="200px"
        :class="selectAnswer == null ? null : 'cursor-pointer'"
        @click="isSendAnswer ? null : funcSendAnswer()"
        :src="
          require(`../../../public/images/send-answer-btn${
            selectAnswer == null ? '-noactive' : ''
          }.png`)
        "
        v-if="!isSendAnswer"
      ></q-img>

      <q-img
        v-show="
          isSendAnswer && practiceData.currentQuestion + 1 != practiceData.totalQuestion
        "
        width="200px"
        class="cursor-pointer"
        @click="funcNextQuestion()"
        :src="require(`../../../public/images/next-question-btn.png`)"
      ></q-img>
      <q-img
        v-show="
          isSendAnswer && practiceData.currentQuestion + 1 == practiceData.totalQuestion
        "
        width="200px"
        class="cursor-pointer"
        @click="$emit('callback-finishpractice')"
        :src="require(`../../../public/images/success-btn.png`)"
      ></q-img>
    </div>
  </div>
</template>

<script>
import headerBar from "../header-time-progress";
import { ref } from "vue";
export default {
  props: {
    themeSync: {
      type: Number,
      default: 1,
    },
    practiceData: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    headerBar,
  },
  emits: ["callback-finishpractice", "callback-playsound"],
  setup(props, { emit }) {
    // Initial Data
    const isSendAnswer = ref(false);
    const selectAnswer = ref(null);
    const currentAnswer = ref(null);
    const isCorrectAnswer = ref(false);
    const isDescription = ref(false);

    const funcSendAnswer = () => {
      isSendAnswer.value = true;

      let choiceIndex = props.practiceData.choices[selectAnswer.value].index;

      currentAnswer.value = props.practiceData.correctAnswer;

      if (choiceIndex == Number(props.practiceData.correctAnswer)) {
        isCorrectAnswer.value = true;
      } else {
        isCorrectAnswer.value = false;
      }

      setTimeout(() => {
        isDescription.value = true;
      }, 500);
    };

    const funcNextQuestion = () => {
      isSendAnswer.value = false;
      selectAnswer.value = null;
      currentAnswer.value = null;

      emit("callback-nextquestion");
    };

    return {
      isSendAnswer,
      isCorrectAnswer,
      currentAnswer,
      selectAnswer,
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
  width: 100%;
  min-height: 100px;
  max-height: fit-content;
  border: 5px solid #a36112;
  background-color: #fff0da;
}
</style>
