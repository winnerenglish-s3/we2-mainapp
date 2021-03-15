<template>
  <div class="row relative-position bg-container-main">
    <div class="col-12 box-content-main">
      <div
        style="height: 50px; margin-top: -101px"
        class="relative-position bg-black"
      ></div>
      <div class="relative-position">
        <div class="absolute-top" style="top: 50px">
          <header-bar :practiceData="practiceData"></header-bar>
        </div>
        <theme-animation
          :isCorrectAnswer="isCorrectAnswer"
          :isSendAnswer="isSendAnswer"
        ></theme-animation>
      </div>
    </div>
    <div class="col-12" align="center">
      <div class="box-question q-pa-md">
        <span style="font-size: max(1.15vw, 16px)" v-html="practiceData.question"></span>
      </div>
    </div>
    <div class="col-12 relative-position row items-center justify-center">
      <div class="col-8 row">
        <div
          class="col-4 q-pa-lg"
          v-for="(item, index) in practiceData.choices"
          :key="index"
        >
          <q-img
            @click="
              isSendAnswer
                ? null
                : ((selectAnswer = index), $emit('callback-playsound', item.soundUrl))
            "
            :class="isSendAnswer ? null : 'cursor-pointer'"
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
              }-conver.png`)
            "
          >
            <div class="text-white transparent absolute-center" style="top: 45%">
              <q-icon size="30px" name="fas fa-volume-up"></q-icon>
            </div>
          </q-img>
        </div>
      </div>
    </div>

    <div class="col-12 self-end q-pa-md" align="center">
      <q-img
        v-show="!isSendAnswer"
        width="200px"
        @click="isSendAnswer ? null : funcSendAnswer()"
        :class="isSendAnswer ? null : 'cursor-pointer'"
        :src="
          require(`../../../public/images/send-answer-btn${
            selectAnswer != null ? '' : '-noactive'
          }.png`)
        "
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
import themeAnimation from "../conversation/theme-animation";
import { ref } from "vue";
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
.bg-container-main {
  background-image: url("../../../public/images/conversation/bg-content-conversation.png");
  background-size: contain;
  background-position: top;
  background-color: #667ea2;
}

.box-content-main {
  width: 100%;
}

.box-question {
  max-width: 600px;
  width: 100%;
  border: 5px solid #20375c;
  border-radius: 7px;
  background-color: #fff;
}
</style>
