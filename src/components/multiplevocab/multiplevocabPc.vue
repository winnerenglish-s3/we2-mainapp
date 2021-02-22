<template>
  <div class="row relative-position bg-content-main">
    <div class="col row relative-position">
      <div class="col-12 absolute">
        <header-bar :practiceData="practiceData"></header-bar>
      </div>
      <div class="col-12 self-start" align="center">
        <theme-animation
          :themeSync="themeSync"
          :isSendAnswer="isSendAnswer"
          :isCorrectAnswer="isCorrectAnswer"
        ></theme-animation>
        <div class="box-question q-pa-lg font-content">
          <span v-html="practiceData.question"></span>
        </div>
      </div>
      <div class="col-12">
        <div class="box-answer row justify-center items-center q-px-md">
          <div
            v-if="activeBy == 'answer'"
            class="relative-position col self-center q-pa-md cursor-pointer"
            align="center"
            v-for="(item, index) in practiceData.choices"
            :key="index"
            @click="isSendAnswer ? null : sendAnswer(item.index)"
          >
            <img
              style="width: 100%"
              @mouseenter="activeHover = index"
              @mouseout="activeHover = null"
              :src="
                require(`../../../public/images/multiplevocab/button-theme/multiplevocab-theme-${themeSync}-choices-${
                  isSendAnswer
                    ? currentAnswer == item.index
                      ? isCorrectAnswer
                        ? 'correct'
                        : 'incorrect'
                      : 'default'
                    : activeHover != index
                    ? 'default'
                    : 'hover'
                }.png`)
              "
            />
            <div
              class="absolute-center font-content no-pointer-events"
              style="width: 80%"
              align="center"
            >
              <div v-if="isSendAnswer && currentAnswer == item.index">
                <q-icon
                  :name="isCorrectAnswer ? 'far fa-check-circle' : 'far fa-times-circle'"
                  size="30px"
                  :class="
                    isCorrectAnswer
                      ? setTheme[themeSync - 1].colorIcon.correct
                      : setTheme[themeSync - 1].colorIcon.incorrect
                  "
                ></q-icon>
              </div>

              <span
                :class="
                  isSendAnswer
                    ? currentAnswer == index
                      ? setTheme[themeSync - 1].colorText
                      : null
                    : null
                "
                v-html="item.choice"
              >
              </span>
            </div>
          </div>

          <div v-if="activeBy == 'description'" class="col-10">
            <div class="box-container-description shadow-5">
              <div class="q-px-sm" :class="setTheme[themeSync - 1].description.bgColor">
                <div class="box-header-description">
                  <q-img
                    class="no-padding"
                    width="100%"
                    :src="
                      require(`../../../public/images/multiplevocab/multiplevocab-theme-${themeSync}-description.png`)
                    "
                  ></q-img>
                </div>
              </div>

              <div class="q-px-lg q-py-md font-16">
                <div class="q-mb-sm" v-if="!isCorrectAnswer">
                  <span class="text-red">{{
                    `
                    "${
                      practiceData.choices.filter((x) => x.index == currentAnswer)[0]
                        .choice
                    }"
                  `
                  }}</span>
                  <span> เป็นคำตอบที่ ผิด </span>
                </div>
                <div class="q-pb-md">
                  <span
                    >คำตอบที่ถูกต้อง คือ
                    <span class="text-green">{{
                      `  "${
                        practiceData.choices.filter(
                          (x) => x.index == practiceData.correctAnswer
                        )[0].choice
                      }"`
                    }}</span></span
                  >
                </div>
                <div v-html="practiceData.description"></div>
              </div>

              <div class="q-mb-sm" align="center">
                <q-img
                  v-if="
                    isSendAnswer &&
                    practiceData.currentQuestion + 1 != practiceData.totalQuestion
                  "
                  @click="nextQuestion()"
                  class="cursor-pointer"
                  width="200px"
                  src="../../../public/images/next-question-btn.png"
                ></q-img>
                <q-img
                  v-else
                  @click="$emit('callback-finishpractice')"
                  class="cursor-pointer"
                  width="200px"
                  src="../../../public/images/success-btn.png"
                ></q-img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-4 box-header-extravocab">
      <div class="header-extravocab">
        <span class="absolute-center">คำศัพท์เสริม</span>
      </div>
      <div class="box-content-extravocab">
        <div v-for="(item, index) in practiceData.extraVocab" :key="index">
          <div class="q-py-xs q-px-md">
            <span>
              <span v-html="item.vocab"></span>
              <!-- <span class="relative-position q-mx-xs">{{
                `(${item.partOfSpeech.partOfSpeech})`
              }}</span> -->
            </span>
            <br />
            <span v-html="item.meaning"></span>
          </div>
          <hr class="no-padding" style="border: 1px solid #ffc177" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headerBar from "../header-time-progress";
import themeAnimation from "./theme-animation.vue";
import boxAnswer from "./box-answer";
import { ref } from "vue";
export default {
  components: {
    boxAnswer,
    themeAnimation,
    headerBar,
  },
  props: {
    themeSync: {
      type: Number,
      default: 0,
    },
    practiceData: {
      type: Object,
      default: () => {},
    },
  },
  emits: ["callback-finishpractice"],
  setup(props, { emit }) {
    // Initial Data
    const activeBy = ref("answer");
    const activeHover = ref(null);

    const setTheme = ref([
      {
        colorText: "text-black",
        colorIcon: {
          correct: "text-green",
          incorrect: "text-red",
        },
        description: {
          bgColor: "bg-blue-10",
        },
      },
      {
        colorText: "text-white",
        colorIcon: {
          correct: "text-white",
          incorrect: "text-white",
        },
        description: {
          bgColor: "bg-white",
        },
      },
    ]);

    // Function Send Answer
    const isSendAnswer = ref(false);
    const currentAnswer = ref(null);
    const isCorrectAnswer = ref(false);

    const sendAnswer = (choiceIndex) => {
      isSendAnswer.value = true;

      currentAnswer.value = choiceIndex;

      if (Number(props.practiceData.correctAnswer) == currentAnswer.value) {
        isCorrectAnswer.value = true;
      } else {
        isCorrectAnswer.value = false;
      }

      emit("callback-sendanswer", isCorrectAnswer.value);

      setTimeout(() => {
        activeBy.value = "description";
      }, 500);
    };

    // Function Next Question
    const nextQuestion = () => {
      isSendAnswer.value = false;
      activeBy.value = "answer";

      emit("callback-nextquestion");
    };

    return {
      activeBy,
      activeHover,
      setTheme,
      isSendAnswer,
      currentAnswer,
      sendAnswer,
      nextQuestion,
      isCorrectAnswer,
    };
  },
};
</script>

<style lang="scss" scoped>
.box-container-description {
  max-width: 1000px;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  background-color: #fff;
}

.bg-content-main {
  background-color: #ffdba3;
}

.box-question {
  margin-top: -5px;
  border: 4px solid #6f3c00;
  background-color: #fff0da;
}

.box-header-extravocab {
  width: 25%;
  background-color: #fff0da;
}

.header-extravocab {
  position: relative;
  background-color: #014270;
  color: #fff;
  height: 70px;
  font-size: 16px;
}

.box-content-extravocab {
  height: calc(100vh - 120px);
  overflow-y: auto;
}

// Scrollbar
/* width */
.box-content-extravocab::-webkit-scrollbar {
  width: 6px;
}

/* Track */
.box-content-extravocab::-webkit-scrollbar-track {
  background: #eaa02c;
}

/* Handle */
.box-content-extravocab::-webkit-scrollbar-thumb {
  background: #9f220c;
}

/* Handle on hover */
.box-content-extravocab::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.font-content {
  font-size: 16px;
}
</style>
