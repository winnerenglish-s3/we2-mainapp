<template>
  <div class="row relative-position">
    <!-- Col แบบฝึกหัด -->
    <div class="col bg-repeat-img relative-position">
      <div class="absolute" style="width: 100%">
        <header-bar :practiceData="practiceData"></header-bar>
      </div>

      <theme-animation
        :isSendAnswer="isSendAnswer"
        :isCorrectAnswer="isCorrectAnswer"
      ></theme-animation>

      <div align="center" class="relative-position">
        <div class="box-question q-pa-lg font-content">
          <span v-html="practiceData.question"></span>
        </div>

        <div class="q-px-md bg-choices-img">
          <!-- Choices -->
          <div class="row" style="padding-top: 17%">
            <div
              v-if="activeBy == 'answer'"
              @click="isSendAnswer ? null : sendAnswer(item.index)"
              class="col-6 q-pa-md btn-choice"
              align="center"
              v-for="(item, index) in practiceData.choices"
              :key="index"
              style="font-size: 2.5vh"
            >
              <div
                style="height: 8vh; width: 90%"
                align="center"
                class="relative-position cursor-pointer bg-btn"
              >
                <span class="absolute-center" v-html="item.choice"></span>

                <div class="absolute-left circle-1" style="top: 10px; left: 10px"></div>
                <div class="absolute-left circle-2" style="top: 23px; left: 12px"></div>
              </div>
            </div>
          </div>

          <!-- Description -->
          <div v-if="activeBy == 'description'" class="col-10">
            <div class="box-container-description shadow-5">
              <div class="q-px-sm bg-blue-10">
                <div class="box-header-description">
                  <q-img
                    class="no-padding"
                    width="100%"
                    :src="
                      require(`../../../public/images/multiplevocab/multiplevocab-theme-1-description.png`)
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

    <!-- Col ศัพท์เสริม -->
    <div class="col-4 box-header-extravocab">
      <div class="header-extravocab q-pa-sm">
        <div
          class="fit flex flex-center"
          align="center"
          style="border: 2px dashed #945f20"
        >
          <span class="">คำศัพท์เสริม</span>
        </div>
      </div>
      <div class="box-content-extravocab">
        <div v-for="(item, index) in practiceData.extraVocab" :key="index">
          <div class="q-py-xs q-px-md">
            <span>
              <span v-html="item.vocab"></span>
              <span class="relative-position q-mx-xs">{{
                `(${item.partOfSpeech.partOfSpeech})`
              }}</span>
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
import multiplechoiceBtn from "../../components/button/multipleChoicesBtn";
export default {
  components: {
    boxAnswer,
    themeAnimation,
    headerBar,
    multiplechoiceBtn,
  },
  props: {
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
  background-color: #ffe5c6;
}

.header-extravocab {
  position: relative;
  background-color: #593000;
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
  font-size: 2.5vh;
}
.bg-choices-img {
  background-image: url("../../../public/images/multiplevocab/new-bg.png");
}
.bg-repeat-img {
  background-image: url("../../../public/images/multiplevocab/bg-repeat.png");
}

.bg-btn {
  background-image: linear-gradient(#ffd057, #ffa601);
  box-shadow: 0px 3px 3px 0px #db8200;
  border-radius: 20px;
}

.circle-1 {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background-color: white;
  box-shadow: 1px 1px 1px;
}
.circle-2 {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: white;
  box-shadow: 1px 1px 1px;
}
.btn-choice:hover {
  transform: scale(0.97);
}
</style>
