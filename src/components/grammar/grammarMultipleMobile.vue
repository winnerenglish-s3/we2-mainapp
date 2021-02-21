<template>
  <div>
    <div class="">
      <header-bar
        :themeSync="themeSync"
        :isSendAnswer="isSendAnswer"
        :isCorrectAnswer="isCorrectAnswer"
        :practiceData="practiceData"
      ></header-bar>
    </div>
    <div class="box-question q-pa-lg f16" align="left">
      <span style="font-size: max(4vw, 16px)" v-html="practiceData.question"></span>
    </div>
    <div class="q-pa-md" v-if="activeBy == 'answer'" align="center">
      <div
        v-for="(item, index) in practiceData.choices"
        class="q-mt-sm"
        :key="index"
        style="max-width: 600px; width: 100%"
      >
        <q-img
          @click="isSendAnswer ? null : sendAnswer(item.index)"
          class="cursor-pointer"
          fit="contain"
          width="max(70vw,320px)"
          :src="
            require(`../../../public/images/languagetip/languagetip-choices-${
              isSendAnswer
                ? currentAnswer == item.index
                  ? isCorrectAnswer
                    ? 'correct'
                    : 'incorrect'
                  : 'default'
                : 'default'
            }.png`)
          "
        >
          <div
            class="absolute-center transparent relative-position text-black full-width"
            align="center"
            style="top: 43%"
          >
            <div class="q-pa-sm" style="width: 95%" align="left">
              <span style="font-size: max(3vw, 14px)" v-html="item.choice"> </span>
            </div></div
        ></q-img>
      </div>
    </div>
    <div v-if="activeBy == 'description'" align="center" class="q-pa-md">
      <div class="box-description shadow-5">
        <div :class="setTheme[themeSync - 1].description.bgColor" align="left">
          <q-img
            class="no-padding"
            height="30px"
            :src="
              require(`../../../public/images/logo-description-theme-${themeSync}.png`)
            "
          ></q-img>
        </div>
        <div class="f14 q-pa-sm">
          <div class="q-pa-md row" align="left">
            <div class="col-2" style="width: 150px">คำตอบที่ถูกต้อง คือ</div>
            <div class="col">
              <span class="text-green-6">{{
                practiceData.choices[currentAnswer].choice
              }}</span>
            </div>
            <div class="col-12 q-mt-md" align="left">
              <span>{{ practiceData.description }}</span>
            </div>
          </div>
          <div align="left" class="row q-pa-md">
            <div class="col-2" style="width: 50px">
              <span>อ้างอิง:</span>
            </div>
            <div class="col">
              <div>
                <u
                  @click="$emit('callback-showdialoghelp', { ref: '3' })"
                  class="cursor-pointer text-indigo-5"
                  >#Content1</u
                >
              </div>
            </div>
          </div>
          <div class="q-pa-sm row" align="left"></div>
        </div>
        <div class="q-my-md" align="center">
          <q-img
            @click="nextQuestion()"
            class="cursor-pointer"
            width="200px"
            src="../../../public/images/next-question-btn.png"
          ></q-img>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headerBar from "../header-time-progress";
import { ref } from "vue";
export default {
  components: {
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
  setup(props) {
    const activeBy = ref("answer");

    const setTheme = ref([
      {
        colorText: "text-black",
        colorIcon: {
          correct: "text-green",
          incorrect: "text-red",
        },
        description: {
          bgColor: "bg-negative",
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
  max-width: 1000px;
  width: 100%;
  border: 5px solid #a36112;
  background-color: #fff;
}

.box-description {
  max-width: 1000px;
  width: 95%;
  border-radius: 10px;
  overflow: hidden;
  background-color: #fff;
}
</style>
