<template>
  <div>
    <div class="">
      <header-bar></header-bar>
    </div>
    <div class="box-question q-pa-md f16" align="left">
      <div class="q-mb-md">
        A : __________________
      </div>
      <div>B : I'm going to London</div>
    </div>
    <div class="q-pa-md" v-if="activeBy == 'answer'" align="center">
      <div
        v-for="i in 4"
        class="q-mt-sm"
        :key="i"
        style="max-width:600px;width:100%"
      >
        <q-img
          @click="isSendAnswer ? null : sendAnswer(i)"
          class="cursor-pointer"
          fit="contain"
          :src="
            require(`../../../public/images/languagetip/languagetip-choices-${
              isSendAnswer
                ? currentAnswer == i
                  ? isCorrectAnswer
                    ? 'correct'
                    : 'incorrect'
                  : 'default'
                : 'default'
            }.png`)
          "
        >
          <div
            class="absolute-center transparent relative-position text-black full-width "
            align="center"
            style="top:43%"
          >
            <div class="q-pa-sm " style="width:95%;" align="left">
              <span style="font-size:max(3vw,14px)"> {{ `Choice ${i}` }}</span>
            </div>
          </div></q-img
        >
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
          <div class="q-pa-sm row" align="left">
            <div class="col-12">
              คำตอบที่ถูกต้อง คือ
            </div>
            <div class="col-12">
              <div class="q-mt-sm">
                <span class="text-green-14"
                  >Where are you going for holiday?</span
                >
              </div>
              <div class="q-mt-sm">
                Reporting Verb เป็น Past Simple ดังนันต้องเปลี่ยน tense ใน
                reported speech will come เปลี่ยนเป็น would come, My ใน reported
                speech เปลี่ยนเป็น her เพราะคนพูดเป็นผู้หญิง, tomorrow
                เปลี่ยนเป็น the next day, เปลี่ยน said to เป็น told
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
    headerBar
  },
  props: {
    themeSync: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const currentAnswer = ref(null);
    const isSendAnswer = ref(false);
    const isCorrectAnswer = ref(false);
    const setTheme = ref([
      {
        colorText: "text-black",
        colorIcon: {
          correct: "text-green",
          incorrect: "text-red"
        },
        description: {
          bgColor: "bg-negative"
        }
      },
      {
        colorText: "text-white",
        colorIcon: {
          correct: "text-white",
          incorrect: "text-white"
        },
        description: {
          bgColor: "bg-white"
        }
      }
    ]);

    const activeBy = ref("answer");

    const sendAnswer = index => {
      isSendAnswer.value = true;
      currentAnswer.value = index;

      let randomAnswer = Math.ceil(Math.random() * 4);

      if (randomAnswer == currentAnswer.value) {
        isCorrectAnswer.value = true;
      } else {
        isCorrectAnswer.value = false;
      }

      setTimeout(() => {
        activeBy.value = "description";
      }, 2000);
    };

    const nextQuestion = () => {
      isSendAnswer.value = false;

      activeBy.value = "answer";
    };

    return {
      activeBy,
      currentAnswer,
      isSendAnswer,
      isCorrectAnswer,
      sendAnswer,
      nextQuestion,
      setTheme
    };
  }
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
