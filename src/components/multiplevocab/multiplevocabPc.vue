<template>
  <div class="row relative-position bg-content-main">
    <div class="col row relative-position">
      <div class="col-12 absolute">
        <header-bar
          :currentQuestion="currentQuestion"
          :totalQuestion="totalQuestion"
          :totalStar="totalStar"
          :practiceTime="practiceTime"
          :isPracticeTimeout="isPracticeTimeout"
        ></header-bar>
      </div>
      <div class="col-12 self-start" align="center">
        <theme-animation :themeSync="themeSync"></theme-animation>
        <div class="box-question q-pa-lg font-content">
          Most elephants won't ______ us if we don't provoke them.
        </div>
      </div>
      <div class="col-12">
        <div class="box-answer row justify-center items-center q-px-md">
          <div
            v-if="activeBy == 'answer'"
            class="relative-position col self-center q-pa-md cursor-pointer"
            align="center"
            v-for="(item, index) in choices"
            :key="index"
            @click="isSendAnswer ? null : testClick(index)"
          >
            <img
              style="width: 100%"
              @mouseenter="activeHover = index"
              @mouseout="activeHover = null"
              :src="
                require(`../../../public/images/multiplevocab/button-theme/multiplevocab-theme-${themeSync}-choices-${
                  isSendAnswer
                    ? currentChoice == index
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
            <div class="absolute-center font-content no-pointer-events" align="center">
              <div v-if="isSendAnswer && currentChoice == index">
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
                    ? currentChoice == index
                      ? setTheme[themeSync - 1].colorText
                      : null
                    : null
                "
              >
                {{ item }}
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

              <div class="q-pa-lg font-16">
                <div>
                  <span class="text-red">{{ `"sign" ` }}</span>
                  <span>เป็นคำตอบที่ ผิด </span>
                </div>
                <div>
                  คำตอบที่ถูกต้อง คือ
                  <span class="text-green">{{ ` "attack"` }}</span>
                </div>
                <div class="q-mt-md">
                  <span>Most elephants won't attack us if we don't provoke them. </span>
                  <br />
                  <span> ช้างส่วนใหญ่จะไม่ทำร้ายเรา ถ้าเราไม่แหย่พวกมัน </span>
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
      </div>
    </div>
    <div class="col-4 box-header-extravocab">
      <div class="header-extravocab">
        <span class="absolute-center">คำศัพท์เสริม</span>
      </div>
      <div class="box-content-extravocab">
        <div v-for="(item, index) in extravocabs" :key="index">
          <div class="q-py-xs q-px-md">
            <span>{{ item.vocab }}</span>
            <br />
            <span>{{ item.meaning }}</span>
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
export default {
  components: {
    boxAnswer,
    themeAnimation,
    headerBar,
  },
  props: [
    "themeSync",
    "choices",
    "extravocabs",
    "currentQuestion",
    "totalQuestion",
    "totalStar",
    "practiceTime",
    "isPracticeTimeout",
  ],
  data() {
    return {
      setTheme: [
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
      ],

      activeBy: "answer",

      activeHover: null,

      isSendAnswer: false,
      currentChoice: null,
      currentAnswer: null,
      isCorrectAnswer: false,
    };
  },
  methods: {
    nextQuestion() {
      this.isSendAnswer = false;
      this.activeBy = "answer";
    },
    testClick(index) {
      this.isSendAnswer = true;

      let randomAnswer = Math.ceil(Math.random() * 4);

      if (index == randomAnswer) {
        this.isCorrectAnswer = true;
      } else {
        this.isCorrectAnswer = false;
      }

      this.currentAnswer = randomAnswer;

      this.currentChoice = index;

      setTimeout(() => {
        this.activeBy = "description";
      }, 1500);

      // this.$emit("callback", "");
    },
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
