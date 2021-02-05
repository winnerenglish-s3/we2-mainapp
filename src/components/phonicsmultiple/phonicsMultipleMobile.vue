<template>
  <div class="box-container row">
    <div class="col-12">
      <header-bar></header-bar>
      <div class="q-pa-sm" align="center">
        <div
          class="box-content-question row bg-white q-px-sm q-py-sm"
          align="center"
          v-if="!isQuestionSound"
        >
          <div class="col self-center" align="center">
            <span style="font-size: max(1vw, 14px)"
              >Listen and choose the word with the /er/ sound.
              <br />
              ฟังและเลือกคำที่มีเสียง /er/</span
            >
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
        <div v-for="i in 4" :key="i" class="q-mb-sm" align="center">
          <q-img
            style="max-width: 320px; width: 100%"
            :class="isSendAnswer ? null : 'cursor-pointer'"
            @click="isSendAnswer ? null : (selectAnswer = i)"
            :src="
              require(`../../../public/images/phonicsmulti/button-theme/phonics-choices-${themeSync}-${
                isSendAnswer
                  ? selectAnswer == i
                    ? isCorrect
                      ? 'correct'
                      : 'incorrect'
                    : correctAnswer == i
                    ? 'correct'
                    : 'default'
                  : selectAnswer == i
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
                {{ i }}
              </span>
              <span v-else>
                <span v-if="isSendAnswer" class="q-mr-md">{{ i }}</span>
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
        @click="selectAnswer == null ? null : sendAnswer()"
        :src="
          require(`../../../public/images/send-answer-btn${
            selectAnswer == null ? '-noactive' : ''
          }.png`)
        "
        v-if="!isSendAnswer"
      ></q-img>

      <q-img
        @click="nextQuestion()"
        width="200px"
        v-else
        class="cursor-pointer"
        src="../../../public/images/next-question-btn.png"
      ></q-img>
    </div>
  </div>
</template>

<script>
import headerBar from "../header-time-progress";
import animationPhonicsmulti from "../phonicsmultiple/animation-phonicsmulti";
export default {
  components: {
    headerBar,
    animationPhonicsmulti
  },
  props: {
    themeSync: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      isQuestionSound: false,
      choicesLength: 4,
      selectAnswer: null,
      correctAnswer: 0,

      isSendAnswer: false,
      isCorrect: false
    };
  },
  methods: {
    sendAnswer() {
      this.isSendAnswer = true;

      let randomAnswer = Math.ceil(Math.random() * this.choicesLength);

      this.correctAnswer = randomAnswer;

      if (this.correctAnswer == this.selectAnswer) {
        this.isCorrect = true;
      }
    },
    nextQuestion() {
      this.isSendAnswer = false;
      this.selectAnswer = null;
      this.isCorrect = false;
    }
  }
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
