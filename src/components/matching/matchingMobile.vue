<template>
  <div class="box-container-matching row">
    <div class="col-12 self-start">
      <div>
        <header-bar :practiceData="practiceData"></header-bar>
      </div>
      <div class="q-mt-xs box-question row justify-center">
        <div class="self-center">
          <span style="font-size: max(3vw, 16px)">
            {{ practiceData.question[practiceData.currentQuestion].meaning }}
          </span>
        </div>
      </div>
    </div>

    <div class="col-12 relative-position" align='center' style="height: fit-content">
      <div
        class="box-choices row no-wrap q-py-sm " 
        :class="practiceData.choices.length == 1 ? 'justify-center' : ''"
      >
        <div class="col-2" style="width: 70px"></div>
        <section
          class="relative-position col-8 section "
          :class="index == currentAnswer ? null : 'section-notactive '"
          align="center"
          v-for="(item, index) in practiceData.choices"
          :key="index"
        >
          <q-img
            :id="`section` + index"
            v-if="item != ''"
            class=""
            style="max-width: 450px; width: 100%"
            @click="!isSendAnswer ? funcSendAnswer(index) : ''"
            :src="
              require(`../../../public/images/matching/button-theme/matching-theme-${themeSync}-choices-${
                isSendAnswer && index == currentAnswer
                  ? isCorrectAnswer
                    ? 'correct'
                    : 'incorrect'
                  : 'default'
              }.png`)
            "
            v-touch-swipe.mouse.right.left="currentAnswer == index ? handleSwipe : null"
          >
            <div class="transparent absolute-center fit">
              <div class="absolute-center" style="width: 90%">
                <span
                  :class="
                    isSendAnswer && index == currentAnswer
                      ? isCorrectAnswer
                        ? 'text-black'
                        : 'text-red'
                      : 'text-black'
                  "
                  style="font-size: max(3vw,16px)"
                  >{{ `${item.vocab}` }}</span
                >
                <div
                  v-if="
                    isSendAnswer &&
                    index == practiceData.currentAnswer &&
                    !isCorrectAnswer
                  "
                  class="text-black q-my-sm"
                >
                  <span>คำตอบที่ถูกต้องคือ</span>
                  <br />
                  <span>
                    {{ practiceData.question[practiceData.currentQuestion].vocab }}
                  </span>
                </div>
              </div>
            </div>
          </q-img>
        </section>
        <div class="col-2" style="width: 70px"></div>
      </div>

      <div class="q-py-lg" style="height: 20px" align="center">
        <q-img
          style="width: max(30vw, 200px)"
          v-if="
            isSendAnswer && practiceData.totalQuestion != practiceData.currentQuestion + 1
          "
          @click="funcNextQuestion()"
          src="../../../public/images/next-question-btn.png"
        ></q-img>

        <q-img
          style="width: max(30vw, 200px)"
          v-if="
            isSendAnswer && practiceData.totalQuestion == practiceData.currentQuestion + 1
          "
          @click="$emit('callback-finishpractice')"
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
    practiceData: {
      tyoe: Array,
      default: () => {},
    },
  },
  emits: ["callback-finishpractice"],
  setup(props, { emit }) {
    // ดึงข้อมูลจาก Props เป็นข้อมูล Practice

    const currentAnswer = ref(0);

    // กดส่งคำตอบ
    const isSendAnswer = ref(false);
    const isCorrectAnswer = ref(false);

    const funcSendAnswer = (index) => {
      isSendAnswer.value = true;

      currentAnswer.value = index;

      if (
        props.practiceData.question[props.practiceData.currentQuestion].vocab ==
        props.practiceData.choices[currentAnswer.value].vocab
      ) {
        isCorrectAnswer.value = true;
      } else {
        isCorrectAnswer.value = false;
      }

      emit("callback-sendanswer", isCorrectAnswer.value);
    };

    // กดข้อต่อไป
    const funcNextQuestion = (section) => {
      isSendAnswer.value = false;

      let indexAnswer = props.practiceData.choices
        .map((x) => x.vocab)
        .indexOf(props.practiceData.question[props.practiceData.currentQuestion].vocab);

      if (currentAnswer.value == props.practiceData.choices.length - 1) {
        let active = 0;

        if (props.practiceData.choices.length == 3) {
          active = 1;
        } else {
          active = currentAnswer.value - 1;
        }

        setTimeout(() => {
          let el = document.getElementById("section" + active);
          el.scrollIntoView();
        }, 100);

        setTimeout(() => {
          currentAnswer.value = active;
        }, 400);
      }

      props.practiceData.choices.splice(indexAnswer, 1);

      emit("callback-nextquestion");
    };

    // Function จอแบบฝึกหัด Finish Practice
    const funcFinishPractice = () => {
      emit("finishPractice", true);
    };

    // TODO : Function กดเลือกการ์ดใบก่อนหน้านี้
    const funcBackChoice = () => {
      let active = currentAnswer.value - 1;

      setTimeout(() => {
        let el = document.getElementById("section" + active);
        el.scrollIntoView();
      }, 100);

      setTimeout(() => {
        currentAnswer.value = active;
      }, 400);
    };

    // TODO : Function กดเลือกการ์ดใบถัดไป
    const funcNextChoice = () => {
      let active = currentAnswer.value + 1;

      setTimeout(() => {
        let el = document.getElementById("section" + active);
        el.scrollIntoView();
      }, 100);

      setTimeout(() => {
        currentAnswer.value = active;
      }, 400);
    };

    return {
      currentAnswer,
      funcNextQuestion,
      funcSendAnswer,
      funcFinishPractice,
      isSendAnswer,
      isCorrectAnswer,

      // เลื่อนซ้ายและขวา
      handleSwipe({ evt, ...newInfo }) {
        if (!isSendAnswer.value) {
          if (newInfo.direction == "left") {
            if (props.practiceData.choices.length - 1 != currentAnswer.value) {
              funcNextChoice();
            }
          } else {
            if (currentAnswer.value != 0) {
              funcBackChoice();
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
  min-height: 80px;
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
  transition: 0.1s;
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
