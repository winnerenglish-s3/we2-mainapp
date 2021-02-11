<template>
  <div class="box-container-matching row">
    <div class="col-12">
      <div>
        <header-bar :totalQuestion="10" :currentChoice="5" :totalStar="1"></header-bar>
      </div>
      <div class="q-mt-xs box-question row justify-center">
        <div class="self-center">
          <span style="font-size: max(3vw, 16px)">
            {{ questionList[currentQuestion].meaning }}
          </span>
        </div>
      </div>
      <div class="q-mt-md q-pa-md" align="center">
        <span style="font-size: max(3vw, 16px)" class="font-medium"
          >เลือกจับคู่คำศัพท์</span
        >
      </div>
    </div>

    <div class="col-12 relative-position" style="height: fit-content">
      <div class="box-choices row no-wrap">
        <div
          name="section"
          class="col-8 relative-position section"
          :class="index == currentChoice ? null : 'section-notactive '"
          align="center"
          :id="`section` + index"
          v-for="(item, index) in dataList"
          :key="index"
        >
          <q-img
            v-if="item != ''"
            style="width: 95%"
            :src="
              require(`../../../public/images/matching/button-theme/matching-theme-${themeSync}-choices-${
                isSendAnswer && index == currentChoice
                  ? isCorrect
                    ? 'correct'
                    : 'incorrect'
                  : 'default'
              }.png`)
            "
          >
            <div class="transparent absolute-center full-width">
              <span
                :class="
                  isSendAnswer && index == currentChoice
                    ? isCorrect
                      ? 'text-black'
                      : 'text-red'
                    : 'text-black'
                "
                style="font-size: 16px"
                >{{ `${item.vocab}` }}</span
              >
              <div
                v-if="isSendAnswer && index == currentChoice && !isCorrect"
                class="text-black q-my-sm"
              >
                <span>คำตอบที่ถูกต้องคือ</span>
                <br />
                <span> {{ questionList[currentQuestion].vocab }} </span>
              </div>
            </div>
          </q-img>
        </div>

        <div class="btn btn-left">
          <q-img
            v-if="!isSendAnswer && currentChoice != 1"
            @click="isSendAnswer ? null : backChoice()"
            width="10vw"
            src="../../../public/images/matching/btn-left.png"
          ></q-img>
        </div>
        <div class="btn btn-right">
          <q-img
            v-if="!isSendAnswer && currentChoice != dataList.length - 2"
            @click="isSendAnswer ? null : nextChoice()"
            width="10vw"
            src="../../../public/images/matching/btn-right.png"
          ></q-img>
        </div>
      </div>
    </div>

    <div class="col-12 self-end q-pt-md q-pb-lg" align="center">
      <q-img
        style="width: max(40vw, 200px)"
        v-if="!isSendAnswer"
        @click="sendAnswer()"
        src="../../../public/images/matching/btn-matching-active.png"
      ></q-img>
      <q-img
        style="width: max(40vw, 200px)"
        v-if="isSendAnswer"
        @click="nextQuestion()"
        src="../../../public/images/next-question-btn.png"
      ></q-img>
    </div>
  </div>
</template>

<script>
import headerBar from "../header-time-progress";
import { onMounted, ref } from "vue";
export default {
  components: {
    headerBar,
  },
  props: {
    themeSync: {
      type: Number,
      require: true,
    },
    questionList: {
      tyoe: Array,
      default: () => [],
    },
    answerList: {
      tyoe: Array,
      default: () => [],
    },
  },
  setup(props) {
    const dataList = ref([""]);

    const currentQuestion = ref(0);
    const currentChoice = ref(0);

    const isNext = ref(false);
    const isPrevious = ref(false);

    const isSendAnswer = ref(false);
    const isCorrect = ref(false);

    const nextQuestion = () => {
      isSendAnswer.value = false;

      let indexAnswer = dataList.value
        .map((x) => x.vocab)
        .indexOf(props.questionList[currentQuestion.value].vocab);

      dataList.value.splice(indexAnswer, 1);

      if (currentChoice.value == dataList.value.length - 1) {
        let active = 0;

        if (dataList.value.length == 3) {
          active = 1;
        } else {
          active = currentChoice.value - 1;
        }

        setTimeout(() => {
          let el = document.getElementById("section" + active);
          el.scrollIntoView();
        }, 100);

        setTimeout(() => {
          currentChoice.value = active;
        }, 300);
      }

      currentQuestion.value++;
    };

    const sendAnswer = () => {
      isSendAnswer.value = true;

      if (
        props.questionList[currentQuestion.value].vocab ==
        dataList.value[currentChoice.value].vocab
      ) {
        isCorrect.value = true;
      } else {
        isCorrect.value = false;
      }
    };

    // TODO : Function กดเลือกการ์ดใบก่อนหน้านี้
    const backChoice = () => {
      isPrevious.value = true;
      let active = currentChoice.value - 1;

      setTimeout(() => {
        let el = document.getElementById("section" + active);
        el.scrollIntoView();
      }, 100);

      setTimeout(() => {
        currentChoice.value = active;
        isPrevious.value = false;
      }, 300);
    };

    // TODO : Function กดเลือกการ์ดใบถัดไป
    const nextChoice = () => {
      isNext.value = true;
      let active = currentChoice.value + 1;

      setTimeout(() => {
        let el = document.getElementById("section" + active);
        el.scrollIntoView();
      }, 100);

      setTimeout(() => {
        currentChoice.value = active;
        isNext.value = false;
      }, 300);
    };

    const loadPracticeData = () => {
      dataList.value.push(...props.answerList);

      dataList.value.push("");

      currentChoice.value = Math.ceil(props.answerList.length / 2) - 1;

      setTimeout(() => {
        let el = document.getElementById("section" + currentChoice.value);
        el.scrollIntoView();
      }, 100);
    };

    onMounted(loadPracticeData);

    return {
      dataList,
      currentQuestion,
      currentChoice,
      isNext,
      isPrevious,
      isSendAnswer,
      isCorrect,
      nextQuestion,
      sendAnswer,
      backChoice,
      nextChoice,
    };
  },
};
</script>

<style lang="scss" scoped>
.box-container-matching {
  height: calc(100vh - 50px);
}

.box-question {
  border: 5px solid#A36112;
  background-color: #fff0da;
  min-height: 100px;
  max-height: fit-content;
}

.box-choices {
  width: 100vw;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  overscroll-behavior-block: contain;
  overflow-x: hidden;
}

.section {
  scroll-snap-align: center;
  scroll-snap-stop: always;
  padding: 5px;
  transition: 0.3s;
  transform: scale(1);
}

.section-notactive {
  transition: 0.1s;
  transform: scale(0.85);
}

.btn {
  position: absolute;
  top: 50%;
  transform: translate(0%, -50%);
  color: #6d4300;
  transform-box: fill-box;
}

.btn-left {
  left: 5%;
}

.btn-right {
  right: 5%;
}

// Scroll Bar bottom
/* width */
.box-choices::-webkit-scrollbar {
  width: 1px;
}

/* Track */
.box-choices::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px transparent;
  border-radius: 0px;
}

/* Handle */
.box-choices::-webkit-scrollbar-thumb {
  background: transparent;
  border-radius: 0px;
}
</style>
