<template>
  <div class="row bg-content">
    <div class="col self-start row">
      <div class="col-12 relative-position" style="margin-top: -52px">
        <div class="absolute full-width" style="top: 51px">
          <header-bar :practiceData="practiceData"></header-bar>
        </div>
        <theme-animation
          :isSendAnswer="isSendAnswer"
          :isCorrectAnswer="isCorrectAnswer"
        ></theme-animation>
      </div>
      <div class="col-12 box-question q-pa-lg" align="center">
        <span class="f16" v-html="practiceData.question"> </span>
      </div>

      <div class="col-12 q-mt-md" align="center" v-if="activeBy == 'answer'">
        <div class="box-content-choices">
          <div v-for="(item, index) in practiceData.choices" :key="index" class="q-mt-sm">
            <q-img
              @mouseenter="activeHover = index"
              @mouseleave="activeHover = null"
              :class="isSendAnswer ? null : 'cursor-pointer'"
              @click="isSendAnswer ? null : sendAnswer(item.index)"
              width="max(calc(75vw * 9 /16),570px)"
              :src="
                require(`../../../public/images/grammar/grammarmultiple-choices-${
                  isSendAnswer
                    ? currentAnswer == item.index
                      ? isCorrectAnswer
                        ? 'correct'
                        : 'incorrect'
                      : 'default'
                    : activeHover == index
                    ? 'hover'
                    : 'default'
                }.png`)
              "
            >
              <div
                class="transparent"
                style="width: 90%; height: 70%; top: 5px; left: 11%"
                align="left"
              >
                <div class="absolute-center" style="width: 95%">
                  <span class="text-black" style="font-size: max(1vw, 14px)">{{
                    `${item.choice}`
                  }}</span>
                </div>
              </div>
            </q-img>
          </div>
        </div>
      </div>

      <div class="col-12 q-my-md" v-if="activeBy == 'description'" align="center">
        <div class="box-description">
          <div class="bg-header-description">
            <q-img
              class="no-padding"
              width="100%"
              src="../../../public/images/logo-description-theme-1.png"
            ></q-img>
          </div>
          <div class="f16 q-px-md">
            <div class="q-pa-md" align="left">
              <div class="q-mb-sm" v-if="!isCorrectAnswer">
                <span class="text-red">{{
                  `"${
                    practiceData.choices.filter((x) => x.index == currentAnswer)[0].choice
                  }" `
                }}</span>
                <span>เป็นคำตอบที่ผิด</span>
              </div>

              <div class="">
                <span>คำตอบที่ถูกต้อง คือ</span>
                <span class="text-green-6">{{
                  `
                  "${
                    practiceData.choices.filter(
                      (x) => x.index == practiceData.correctAnswer
                    )[0].choice
                  }"
                `
                }}</span>
              </div>
              <div class="col-12 q-mt-md" align="left">
                <span v-html="practiceData.description"></span>
              </div>
            </div>

            <div align="left" class="row q-px-md">
              <q-btn
                label="อ้างอิง"
                rounded
                class="bg-blue text-white"
                push
                @click="$emit('callback-showdialoghelp', practiceData.refs)"
              ></q-btn>
            </div>
          </div>
          <div class="q-my-md" align="center">
            <q-img
              v-if="
                isSendAnswer &&
                practiceData.totalQuestion != practiceData.currentQuestion + 1
              "
              @click="nextQuestion()"
              class="cursor-pointer"
              width="200px"
              src="../../../public/images/next-question-btn.png"
            ></q-img>
            <q-img
              v-if="
                isSendAnswer &&
                practiceData.totalQuestion == practiceData.currentQuestion + 1
              "
              @click="$emit('callback-finishpractice')"
              class="cursor-pointer"
              width="200px"
              src="../../../public/images/success-btn.png"
            ></q-img>
          </div>
        </div>
      </div>
    </div>
    <div class="col-4 box-extravocab">
      <div
        class="box-header-extravocab relative-position"
        style="background-color: #014270; color: #ffffff"
        align="center"
      >
        <span class="absolute-center f16"> คำศัพท์เสริม </span>
      </div>
      <div class="box-content-extravocab q-py-sm">
        <div>
          <div v-for="(item, index) in practiceData.extraVocab">
            <div class="q-px-md q-py-xs">
              {{ item.vocab }}
              <br />
              {{ item.meaning }}
            </div>
            <hr style="border: 1px solid #ffc177" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headerBar from "../header-time-progress";
import themeAnimation from "./themeAnimation";
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
  emits: ["callback-showdialoghelp", "callback-finishpractice"],
  setup(props, { emit }) {
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
          bgColor: "bg-header-description",
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

    const setColorTheme = ref([
      {
        color: "#ffffff",
        bg: "#014270",
      },
      {
        color: "#000000",
        bg: "#FF7985",
      },
    ]);

    const currentAnswer = ref(null);
    const isSendAnswer = ref(false);
    const isCorrectAnswer = ref(false);

    const sendAnswer = (choiceIndex) => {
      isSendAnswer.value = true;

      currentAnswer.value = choiceIndex;

      if (Number(props.practiceData.correctAnswer) == currentAnswer.value) {
        isCorrectAnswer.value = true;
      } else {
        isCorrectAnswer.value = false;
      }

      setTimeout(() => {
        activeBy.value = "description";
      }, 500);
    };

    const nextQuestion = () => {
      isSendAnswer.value = false;
      currentAnswer.value = null;

      emit("callback-nextquestion");

      activeBy.value = "answer";
    };

    return {
      activeHover,
      setColorTheme,
      isSendAnswer,
      sendAnswer,
      currentAnswer,
      isCorrectAnswer,
      activeBy,
      setTheme,
      nextQuestion,
    };
  },
};
</script>

<style lang="scss" scoped>
.box-question {
  border: 5px solid #a36112;
  background-color: #fff;
}

.bg-content {
  background-image: url("../../../public/images/grammar/bg-answer-grammarmultiple.png");
  background-position: bottom;
  background-size: contain;
}

.box-content-choices {
  max-width: 1000px;
  width: 100%;
}

.box-extravocab {
  position: sticky;
  top: 100px;
  width: 25%;
  background-color: #fff0da;
}

.box-header-extravocab {
  height: 80px;
}

.box-content-extravocab {
  height: calc(100vh - 130px);
  overflow: auto;
}

/* width */
.box-content-extravocab::-webkit-scrollbar {
  width: 7px;
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
  background: #bd280e;
}

.box-description {
  max-width: 1000px;
  width: 95%;
  border-radius: 10px;
  overflow: hidden;
  background-color: #fff;
}

.bg-header-description {
  background-color: #014574;
}
</style>
