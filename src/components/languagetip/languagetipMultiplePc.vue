<template>
  <div class=" row bg-main">
    <div class="col-12 relative-position self-start" align="center">
      <div class="absolute full-width">
        <header-bar></header-bar>
      </div>
      <theme-animation
        :themeSync="themeSync"
        :isCorrectAnswer="isCorrectAnswer"
        :isSendAnswer="isSendAnswer"
      ></theme-animation>
    </div>
    <div class="col-12 " align="center" v-if="activeBy == 'answer'">
      <div class="box-question q-pa-md f20" align="left">
        A:__________________ <br />
        B: I'm going to London
      </div>
      <div class="row box-choice q-my-md">
        <div class="col-6 q-my-xs" v-for="i in 4" :key="i">
          <q-img
            @click="isSendAnswer ? null : sendAnswer(i)"
            class="cursor-pointer"
            contain=""
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
            <div class="transparent text-black full-width " align="left">
              <div class=" q-px-sm">
                <span class="f20"> {{ `Choice ${i}` }}</span>
              </div>
            </div></q-img
          >
        </div>
      </div>
    </div>
    <div class="col-12" v-if="activeBy == 'description'" align="center">
      <div class="box-description">
        <div :class="setTheme[themeSync - 1].description.bgColor">
          <q-img
            class="no-padding"
            width="100%"
            :src="
              require(`../../../public/images/logo-description-theme-${themeSync}.png`)
            "
          ></q-img>
        </div>
        <div class="f16 q-px-md">
          <div class="q-pa-md row" align="left">
            <div class="col-2 ">
              คำตอบที่ถูกต้อง คือ
            </div>
            <div class="col ">
              Where are you going for holiday?
              <br />
              แปลว่า คุณกำลังไปเที่ยวช่วงวันหยุดที่ไหน <br />
              เพราะ B ตอบด้วยรูป present continuous
              ดังนั้นคำถามจึงต้องเป็นรูปเดียวกัน
              <br />
              A : Where are you going for holiday?
              คุณกำลังไปเที่ยวช่วงวันหยุดที่ไหน
              <br />
              B : I'm going to London. ฉันจะไปกรุงลอนดอน
            </div>
          </div>
          <div class="q-pa-md row" align="left">
            <div class="col-2 " align="left">
              ดังนั้นไม่ตอบ
            </div>
            <div class="col ">
              - Where do you go? แปลว่า คุณไปไหน
              <br />
              - Are you going for holiday? แปลว่า คุณจะไปเที่ยวหรือ
              <br />
              - How are you going? แปลว่า คุณจะไปอย่างไร
            </div>
          </div>
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
import themeAnimation from "./theme-animation";
import { ref } from "vue";
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
.bg-main {
  background-color: #46598a;
}

.box-question {
  max-width: 1000px;
  width: 95%;
  border: 5px solid #a36112;
  background-color: #fff;
}

.box-choice {
  max-width: 1000px;
  width: 95%;
}

.box-description {
  max-width: 1000px;
  width: 95%;
  border-radius: 10px;
  overflow: hidden;
  background-color: #fff;
}
</style>
