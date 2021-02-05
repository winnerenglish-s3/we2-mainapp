<template>
  <div class="row bg-grammarmultiple">
    <div class="col self-start row">
      <div class="col-12 relative-position " style="margin-top:-52px;">
        <div class="absolute full-width" style="top:51px;">
          <header-bar></header-bar>
        </div>
        <theme-animation
          :themeSync="themeSync"
          :isSendAnswer="isSendAnswer"
          :isCorrectAnswer="isCorrectAnswer"
        ></theme-animation>
      </div>
      <div class="col-12 box-question q-pa-lg" align="center">
        <span class="f16">
          She said to me, "My mother will come tomorrow."
        </span>
      </div>

      <div class="col-12" align="center" v-if="activeBy == 'answer'">
        <div class="box-content-choices">
          <div v-for="i in 4" :key="i" class="q-mt-sm">
            <q-img
              @mouseenter="activeHover = i"
              @mouseleave="activeHover = null"
              :class="isSendAnswer ? null : 'cursor-pointer'"
              @click="isSendAnswer ? null : sendAnswer(i)"
              :src="
                require(`../../../public/images/grammar/grammarmultiple-choices-${
                  isSendAnswer
                    ? currentAnswer == i
                      ? isCorrectAnswer
                        ? 'correct'
                        : 'incorrect'
                      : 'default'
                    : activeHover == i
                    ? 'hover'
                    : 'default'
                }.png`)
              "
            >
              <div
                class="transparent"
                style="width:90%;height:75%;top:5px;left:11%;"
                align="left"
              >
                <div class="q-px-sm">
                  <span class="text-black">{{ `Choice ${i}` }}</span>
                </div>
              </div>
            </q-img>
          </div>
        </div>
      </div>

      <div
        class="col-12 q-my-md"
        v-if="activeBy == 'description'"
        align="center"
      >
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
            <div class="q-pa-md row " align="left">
              <div class="col-2 ">
                คำตอบที่ถูกต้อง คือ
              </div>
              <div class="col ">
                <span class="text-green-6"
                  >She told me that my mother would come tomorrow.</span
                >
              </div>
              <div class="col-12 q-mt-md" align="left">
                <span
                  >Reporting Verb เป็น Past Simple ดังนั้นต้องเปลี่ยน tense ใน
                  reported speech will come เปลี่ยนเป็น would come, My ใน
                  reported speech เปลี่ยนเป็น her เพราะคนพูดเป็นผู้หญิง,
                  tomorrow เปลี่ยนเป็น the next day, เปลี่ยน said to เป็น
                  told</span
                >
              </div>
            </div>

            <div align="left" class="row q-pa-md">
              <div class="col-2" style="width:50px;">
                <span>อ้างอิง:</span>
              </div>
              <div class="col">
                <div>
                  <u class="cursor-pointer text-indigo-5">xxxxxxxxxxxxxx (1)</u>
                </div>
                <div>
                  <u class="cursor-pointer text-indigo-5">xxxxxxxxxxxxxx (2)</u>
                </div>
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
    <div class="col-4 box-extravocab">
      <div
        class="box-header-extravocab relative-position"
        :style="
          `background-color:${setColorTheme[themeSync - 1].bg};color:${
            setColorTheme[themeSync - 1].color
          }`
        "
        align="center"
      >
        <span class="absolute-center f16">
          คำศัพท์เสริม
        </span>
      </div>
      <div class="box-content-extravocab q-py-sm">
        <div v-for="i in 15" :key="i">
          <div class="q-py-sm">
            <div class="q-px-md">
              <span>ENG !!!!!!!!!</span>
            </div>
            <div class="q-px-md">
              <span>ไทย !!!!!!!!!</span>
            </div>
          </div>
          <hr style="border:1px solid #FFC177;" />
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
    themeAnimation
  },
  props: {
    themeSync: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const activeBy = ref("answer");
    const activeHover = ref(null);

    const setTheme = ref([
      {
        colorText: "text-black",
        colorIcon: {
          correct: "text-green",
          incorrect: "text-red"
        },
        description: {
          bgColor: "bg-header-description"
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

    const setColorTheme = ref([
      {
        color: "#ffffff",
        bg: "#014270"
      },
      {
        color: "#000000",
        bg: "#FF7985"
      }
    ]);

    const currentAnswer = ref(null);
    const isSendAnswer = ref(false);
    const isCorrectAnswer = ref(false);

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
      }, 3000);
    };

    const nextQuestion = () => {
      isSendAnswer.value = false;

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
      nextQuestion
    };
  }
};
</script>

<style lang="scss" scoped>
.box-question {
  border: 5px solid #a36112;
  background-color: #fff;
}

.bg-grammarmultiple {
  background-image: url("../../../public/images/grammar/bg-grammarmultiple.png");
  background-position: bottom;
  background-size: contain;
}

.box-content-choices {
  max-width: 650px;
  width: 100%;
}

.box-extravocab {
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
