<template>
  <div class="box-container row">
    <div class="col-12">
      <header-bar></header-bar>
      <div align="center">
        <div class="box-content-question row q-px-sm" align="center">
          <div class="col self-center" align="center">
            <span style="font-size: 14px">Where is Sue going for hoilday?</span>
          </div>
        </div>
      </div>
      <div class="q-my-md q-pa-sm">
        <div v-for="i in choicesLength" :key="i" class="q-mb-sm" align="center">
          <q-img
            style="max-width: 320px; width: 100%"
            :class="isSendAnswer ? null : 'cursor-pointer'"
            @click="isSendAnswer ? null : (selectAnswer = i)"
            :src="
              require(`../../../public/images/conversation/choice-${
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
              }-conver-mobile.png`)
            "
          >
            <div
              class="transparent absolute-center text-black"
              style="font-size: 16px; top: 45%"
            >
              <span>
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
export default {
  components: {
    headerBar,
  },
  data() {
    return {
      choicesLength: 3,
      selectAnswer: null,
      correctAnswer: 0,

      isSendAnswer: false,
      isCorrect: false,
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
    },
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
