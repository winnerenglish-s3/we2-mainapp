<template>
  <div class="row relative-position bg-container-main ">
    <div class="col-12 box-content-main">
      <div
        style="height: 50px; margin-top: -101px"
        class="relative-position bg-black"
      ></div>
      <div class="relative-position">
        <div class="absolute-top" style="top: 50px">
          <header-bar></header-bar>
        </div>
        <theme-animation
          :isCorrect="isCorrect"
          :isSendAnswer="isSendAnswer"
          :themeSync="themeSync"
        ></theme-animation>
      </div>
    </div>
    <div class="col-12" align="center">
      <div class="box-question q-pa-md">
        <span style="font-size: max(1.15vw, 16px)"
          >Where is Sue going for hoilday?</span
        >
      </div>
    </div>
    <div class="col-12 relative-position row items-center justify-center  ">
      <div class="col-8 row">
        <div class="col-4 q-pa-lg" v-for="i in choices" :key="i">
          <q-img
            @click="isSendAnswer ? null : (selectActive = i)"
            :class="isSendAnswer ? null : 'cursor-pointer'"
            :src="
              require(`../../../public/images/conversation/choice-${
                isSendAnswer
                  ? selectActive == i
                    ? isCorrect
                      ? 'correct'
                      : 'incorrect'
                    : correctAnswer == i
                    ? 'correct'
                    : 'default'
                  : selectActive == i
                  ? 'active'
                  : 'default'
              }-conver.png`)
            "
          >
            <div
              class="text-white transparent absolute-center"
              style="top: 45%"
            >
              <q-icon size="30px" name="fas fa-volume-up"></q-icon>
            </div>
          </q-img>
        </div>
      </div>
    </div>

    <div class="col-12 self-end q-pa-md" align="center">
      <q-img
        v-if="!isSendAnswer"
        width="200px"
        @click="selectActive == null ? null : sendAnswer()"
        :class="selectActive == null ? null : 'cursor-pointer'"
        :src="
          require(`../../../public/images/send-answer-btn${
            selectActive != null ? '' : '-noactive'
          }.png`)
        "
      ></q-img>

      <q-img
        v-else
        width="200px"
        class="cursor-pointer"
        @click="nextQuestion()"
        :src="require(`../../../public/images/next-question-btn.png`)"
      ></q-img>
    </div>
  </div>
</template>

<script>
import headerBar from "../header-time-progress";
import themeAnimation from "../conversation/theme-animation";
export default {
  components: {
    headerBar,
    themeAnimation
  },
  props: {
    themeSync: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      correctAnswer: 0,
      selectActive: null,
      choices: 3,
      isSendAnswer: false,

      isCorrect: false
    };
  },
  methods: {
    nextQuestion() {
      this.isSendAnswer = false;
      this.selectActive = null;
    },
    sendAnswer() {
      this.isSendAnswer = true;

      let randomAnswer = Math.ceil(Math.random() * this.choices);

      this.correctAnswer = randomAnswer;

      if (this.correctAnswer == this.selectActive) {
        this.isCorrect = true;
      } else {
        this.isCorrect = false;
      }
    }
  }
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
