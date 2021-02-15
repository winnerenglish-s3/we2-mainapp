<template>
  <div class="box-container-matching row">
    <div class="col-12 self-start">
      <div>
        <header-bar
          :totalQuestion="totalQuestion"
          :currentQuestion="currentQuestion"
        ></header-bar>
      </div>
      <div class="q-mt-xs box-question row justify-center">
        <div class="self-center">
          <span style="font-size: max(3vw, 16px)">
            {{ questionList[currentQuestion].meaning }}
          </span>
        </div>
      </div>
      <!-- <div class="q-mt-md q-pa-md" align="center">
        <span style="font-size: max(3vw, 16px)" class="font-medium">
          
        </span>
      </div> -->
    </div>

    <div class="col-12 relative-position q-py-md" style="height: fit-content">
      <div
        class="box-choices row no-wrap q-py-sm"
        :class="dataList.length == 1 ? 'justify-center' : ''"
      >
        <div class="col-2" style="width: 70px"></div>
        <section
          class="relative-position col-8 section"
          :class="index == currentChoice ? null : 'section-notactive '"
          align="center"
          v-for="(item, index) in dataList"
          :key="index"
        >
          <q-img
            :id="`section` + index"
            v-if="item != ''"
            class=""
            style="max-width: 400px; width: 100%"
            @click="!isSendAnswer ? sendAnswer(index) : ''"
            :src="
              require(`../../../public/images/matching/button-theme/matching-theme-${themeSync}-choices-${
                isSendAnswer && index == currentChoice
                  ? isCorrect
                    ? 'correct'
                    : 'incorrect'
                  : 'default'
              }.png`)
            "
            v-touch-swipe.mouse.right.left="currentChoice == index ? handleSwipe : null"
          >
            <div class="transparent absolute-center fit">
              <div class="absolute-center" style="width: 90%">
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
            </div>
          </q-img>
        </section>
        <div class="col-2" style="width: 70px"></div>

        <!-- <div class="btn btn-left">
          <q-img
            v-if="!isSendAnswer"
            @click="isSendAnswer ? null : backChoice()"
            width="10vw"
            src="../../../public/images/matching/btn-left.png"
          ></q-img>
        </div>
        <div class="btn btn-right">
          <q-img
            v-if="!isSendAnswer"
            @click="isSendAnswer ? null : nextChoice()"
            width="10vw"
            src="../../../public/images/matching/btn-right.png"
          ></q-img>
        </div> -->
      </div>

      <div class="q-py-lg" style="height: 20px" align="center">
        <!-- <q-img
        style="width: max(40vw, 200px)"
        v-if="!isSendAnswer"
        @click="sendAnswer()"
        src="../../../public/images/matching/btn-matching-active.png"
      ></q-img> -->
        <q-img
          style="width: max(40vw, 200px)"
          v-if="isSendAnswer && !isFinish"
          @click="nextQuestion()"
          src="../../../public/images/next-question-btn.png"
        ></q-img>

        <q-img
          style="width: max(40vw, 200px)"
          v-if="isSendAnswer && isFinish"
          @click="funcFinishPractice()"
          src="../../../public/images/success-btn.png"
        ></q-img>
      </div>
    </div>
    <div class="col-12 self-end"></div>
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
    totalQuestion: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { emit }) {
    // ดึงข้อมูลจาก Props เป็นข้อมูล Practice
    const dataList = ref(props.answerList);
    const currentQuestion = ref(0);
    const currentChoice = ref(0);

    // กดส่งคำตอบ
    const isSendAnswer = ref(false);
    const isFinish = ref(false);
    const isCorrect = ref(false);

    const sendAnswer = (index) => {
      isSendAnswer.value = true;

      if (currentQuestion.value + 1 == props.questionList.length) {
        isFinish.value = true;
      }

      currentChoice.value = index;

      if (
        props.questionList[currentQuestion.value].vocab == dataList.value[index].vocab
      ) {
        isCorrect.value = true;
      } else {
        isCorrect.value = false;
      }
    };

    // กดข้อต่อไป
    const nextQuestion = (section) => {
      if (props.questionList.length - 1 == currentQuestion.value) {
        return;
      }

      isSendAnswer.value = false;

      let indexAnswer = dataList.value
        .map((x) => x.vocab)
        .indexOf(props.questionList[currentQuestion.value].vocab);

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
        }, 400);
      }

      dataList.value.splice(indexAnswer, 1);

      currentQuestion.value++;
    };

    // Function จอแบบฝึกหัด Finish Practice
    const funcFinishPractice = () => {
      emit("finishPractice", true);
    };

    // TODO : Function กดเลือกการ์ดใบก่อนหน้านี้
    const backChoice = () => {
      let active = currentChoice.value - 1;

      setTimeout(() => {
        let el = document.getElementById("section" + active);
        el.scrollIntoView();
      }, 100);

      setTimeout(() => {
        currentChoice.value = active;
        isPrevious.value = false;
      }, 500);
    };

    // TODO : Function กดเลือกการ์ดใบถัดไป
    const nextChoice = () => {
      let active = currentChoice.value + 1;

      setTimeout(() => {
        let el = document.getElementById("section" + active);
        el.scrollIntoView();
      }, 100);

      setTimeout(() => {
        currentChoice.value = active;
        isNext.value = false;
      }, 500);
    };

    return {
      dataList,
      currentQuestion,
      currentChoice,
      isSendAnswer,
      isFinish,
      isCorrect,
      nextQuestion,
      sendAnswer,
      backChoice,
      nextChoice,
      funcFinishPractice,

      // เลื่อนซ้ายและขวา
      handleSwipe({ evt, ...newInfo }) {
        if (!isSendAnswer.value) {
          if (newInfo.direction == "left") {
            if (dataList.value.length - 1 != currentChoice.value) {
              nextChoice();
            }
          } else {
            if (currentChoice.value != 0) {
              backChoice();
            }
          }
        }
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.box-container-matching {
  min-height: calc(100vh - 50px);
  max-height: fit-content;
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
  overscroll-behavior: contain;
  overflow: hidden;
}

.section {
  scroll-snap-align: center;
  padding: 5px;
  transition: 0.2s;
  transform: scale(1.05);
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
