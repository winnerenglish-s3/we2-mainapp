<template>
  <div class="row" :style="themeBGColor">
    <div class="col-12 box-header" align="center">
      <div>
        <header-bar
          :currentQuestion="currentQuestion"
          :totalQuestion="totalQuestion"
          :totalStar="totalStar"
          :practiceTime="practiceTime"
          :isPracticeTimeout="isPracticeTimeout"
        ></header-bar>
      </div>
      <div class="box-question" :style="themeQuestion">
        <span style="font-size: max(1.3vw, 20px)"> กระต่าย </span>
      </div>
      <div class="q-my-lg row justify-center" align="center">
        <q-btn
          v-if="!isSendAnswer"
          push
          round
          :style="themeButton"
          class="text-white"
          icon="fas fa-volume-up"
        ></q-btn>

        <q-icon
          v-if="isSendAnswer"
          :name="!isCorrectAnswer ? 'far fa-times-circle' : 'far fa-check-circle'"
          :class="!isCorrectAnswer ? 'text-red-7' : 'text-green-7'"
          size="42px"
        ></q-icon>
        <span
          v-if="isSendAnswer && !isCorrectAnswer"
          class="relative-position q-mx-md"
          style="font-size: 24px"
          >คำตอบที่ถูกต้อง คือ</span
        >
      </div>
      <div class="row justify-center q-my-xl" align="center">
        <div
          class="box-show-answer self-end"
          :class="{ 'border-show-answer': isSendAnswer && !isCorrectAnswer }"
          v-for="(item, index) in currentQuestionText.length"
          :key="index"
        >
          {{
            isSendAnswer
              ? currentQuestionText[index]
              : currentAnswerList[index]
              ? currentAnswerList[index].text
              : ""
          }}
        </div>
      </div>
    </div>
    <div class="col-12 self-end">
      <q-img
        class="relative-position"
        :src="
          require(`../../../public/images/spellingbee/bg-spellingbee-theme-${themeSync}.png`)
        "
      >
        <div class="fit row justify-center no-padding transparent">
          <div
            class="col-7 row justify-center relative-position q-pa-md"
            style="max-width: 745px; width: 46.5%"
          >
            <div class="box-content-answer justify-between row q-mt-xs">
              <div
                class="relative-position"
                style="width: 17%"
                v-for="(item, index) in testData"
                :key="index"
              >
                <!-- :disabled="
                checkBottom != index &&
                  checkTop != index &&
                  checkLeft != index &&
                  checkRight != index &&
                  !currentAnswerList.filter(x => x.index == index).length &&
                  currentAnswerList.length != currentQuestionText.length
              " -->
                <q-img
                  fit="contain"
                  v-if="currentAnswerList.length"
                  @click="
                    isSendAnswer ||
                    (checkBottom != index &&
                      checkTop != index &&
                      checkLeft != index &&
                      checkRight != index &&
                      checkCenter != index)
                      ? null
                      : chooseLineMove(index, item.val)
                  "
                  :src="
                    isCorrectAnswer &&
                    currentAnswerList.filter((x) => x.index == index).length &&
                    isSendAnswer
                      ? require(`../../../public/images/spellingbee/button-theme-${themeSync}/btn-choices-correct.png`)
                      : !isCorrectAnswer &&
                        currentAnswerList.filter((x) => x.index == index).length &&
                        isSendAnswer
                      ? require(`../../../public/images/spellingbee/button-theme-${themeSync}/btn-choices-incorrect.png`)
                      : currentAnswerList.filter((x) => x.index == index).length
                      ? require(`../../../public/images/spellingbee/button-theme-${themeSync}/btn-choices-active.png`)
                      : require(`../../../public/images/spellingbee/button-theme-${themeSync}/btn-choices-default.png`)
                  "
                  style="z-index: 2"
                  :class="
                    checkBottom != index &&
                    checkTop != index &&
                    checkLeft != index &&
                    checkRight != index &&
                    !currentAnswerList.filter((x) => x.index == index).length &&
                    currentAnswerList.length != currentQuestionText.length
                      ? 'cursor-not-allowed disabled'
                      : currentAnswerList.length == currentQuestionText.length &&
                        !currentAnswerList.filter((x) => x.index == index).length
                      ? 'cursor-not-allowed'
                      : 'cursor-pointer'
                  "
                >
                  <div
                    class="absolute-center text-black text-bold transparent"
                    style="top: 40%"
                  >
                    <span
                      :class="{
                        'text-white': currentAnswerList.filter((x) => x.index == index)
                          .length,
                      }"
                      style="font-size: max(1.5vw, 14px)"
                      >{{ item.val }}</span
                    >
                  </div></q-img
                >
                <div
                  v-if="currentAnswerList.filter((x) => x.index == index).length"
                  :class="`link-answer-${
                    currentAnswerList.filter((x) => x.index == index)[0].lineMove
                  }`"
                ></div>
              </div>
            </div>
            <div class="col-12 self-end" align="center">
              <q-img
                v-if="!isSendAnswer"
                style="max-width: 200px; width: 30%"
                :class="showAnswerBtn ? 'cursor-pointer' : null"
                @click="showAnswerBtn ? sendAnswer() : null"
                :src="
                  showAnswerBtn
                    ? require(`../../../public/images/send-answer-btn.png`)
                    : require(`../../../public/images/send-answer-btn-noactive.png`)
                "
              ></q-img>

              <q-img
                v-if="isSendAnswer"
                style="max-width: 200px; width: 30%"
                class="cursor-pointer"
                @click="nextQuestion()"
                src="../../../public/images/next-question-btn.png"
              ></q-img>
            </div>
          </div>
        </div>
      </q-img>
    </div>
  </div>
</template>

<script>
import headerBar from "../header-time-progress";
import getColorTheme from "../../../public/themeColor.json";
export default {
  components: {
    headerBar,
  },
  props: {
    testData: {
      type: Array,
      default: () => [],
    },
    currentAnswerList: {
      type: Array,
      default: () => [],
    },
    currentQuestionText: {
      type: String,
      default: "",
    },
    currentQuestion: {
      type: Number,
      defalut: 0,
    },
    totalQuestion: {
      type: Number,
      default: 0,
    },
    totalStar: {
      type: Number,
      default: 0,
    },
    practiceTime: {
      type: Number,
      default: 0,
    },
    isPracticeTimeout: {
      type: Boolean,
      default: () => false,
    },
    isCorrectAnswer: {
      type: Boolean,
      default: () => null,
    },
    themeSync: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      isSendAnswer: false,
      colorTheme: getColorTheme,
      bgColorTheme: ["#FFE6A2", "#B0DEFF"],
    };
  },
  computed: {
    checkBottom() {
      return this.currentAnswerList[this.currentAnswerList.length - 1].setAround.bottom;
    },
    checkTop() {
      return this.currentAnswerList[this.currentAnswerList.length - 1].setAround.top;
    },
    checkLeft() {
      return this.currentAnswerList[this.currentAnswerList.length - 1].setAround.left;
    },
    checkRight() {
      return this.currentAnswerList[this.currentAnswerList.length - 1].setAround.right;
    },
    checkCenter() {
      return this.currentAnswerList[this.currentAnswerList.length - 1].setAround.center;
    },
    showAnswerBtn() {
      if (this.currentAnswerList.length === this.currentQuestionText.length) {
        return true;
      } else {
        return false;
      }
    },
    themeBGColor() {
      return `background-color:${this.bgColorTheme[this.themeSync - 1]}`;
    },
    themeButton() {
      return `background-color:${this.colorTheme[this.themeSync - 1].hex}`;
    },
    themeQuestion() {
      return `border-color:rgba(${
        this.colorTheme[this.themeSync - 1].rgb
      },.95);box-shadow: 0px 4px 0px ${this.colorTheme[this.themeSync - 1].hex}`;
    },
  },
  methods: {
    sendAnswer() {
      this.isSendAnswer = true;
      this.$emit("sendCallBack");
    },
    nextQuestion() {
      this.isSendAnswer = false;
      this.$emit("sendNextQuestion");
    },
    chooseLineMove(index, val) {
      this.$emit("chooseBtn", { index: index, val: val });
    },
  },
};
</script>

<style lang="scss" scoped>
.box-question {
  max-width: 500px;
  width: 50;
  background-color: #fff;
  border-width: 5px;
  border-style: solid;
  border-radius: 10px;
  padding: 5px;
  margin-top: -25px;
}

.box-show-answer {
  width: 30px;
  margin: 0px 5px;
  font-size: 24px;
  border-bottom: 3px solid #000;
}

.border-show-answer {
  border-bottom: 3px solid transparent !important;
}

.box-content-answer {
  max-width: 300px;
  width: 45%;
}

// Line Move Background Color
.link-answer-top {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translate(-50%);
  background-color: #ffaa2e;
  width: 30%;
  height: 120%;
  z-index: 1;
}

.link-answer-bottom {
  position: absolute;
  top: 1px;
  left: 50%;
  transform: translate(-50%);
  background-color: #ffaa2e;
  width: 30%;
  height: 120%;
  z-index: 1;
}

.link-answer-left {
  position: absolute;
  top: 40%;
  left: 15%;
  transform: translate(0%, -50%);
  background-color: #ffaa2e;
  width: 130%;
  height: 25%;
}

.link-answer-right {
  position: absolute;
  top: 40%;
  right: 15%;
  transform: translate(0%, -50%);
  background-color: #ffaa2e;
  width: 130%;
  height: 25%;
}
</style>
