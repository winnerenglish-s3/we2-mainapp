<template>
  <div class="box-container-mobile">
    <div class="row relative-position full-height">
      <div class="col-12">
        <header-bar
          :currentQuestion="currentQuestion"
          :totalQuestion="totalQuestion"
          :totalStar="totalStar"
          :practiceTime="practiceTime"
          :isPracticeTimeout="isPracticeTimeout"
        ></header-bar>
      </div>
      <div class="col-12 self-end row">
        <div class="col-12">
          <div class="box-question q-pa-md" style="font-size: max(3vw, 16px)">
            Most elephants won't ______ us if we don't provoke them.
          </div>
        </div>
        <div class="col-12 q-mt-md">
          <div class="box-answer row justify-center items-center q-px-sm">
            <div
              v-if="activeBy == 'answer'"
              class="relative-position col-6 self-center q-pa-xs cursor-pointer"
              align="center"
              v-for="(item, index) in choices"
              :key="index"
              @click="testClick(index)"
            >
              <img
                style="width: 100%"
                :src="
                  require(`../../../public/images/multiplevocab/button-theme/multiplevocab-theme-${themeSync}-choices-${
                    isSendAnswer
                      ? currentChoice == index
                        ? isCorrectAnswer
                          ? 'correct'
                          : 'incorrect'
                        : 'default'
                      : 'default'
                  }.png`)
                "
              />
              <div class="absolute-center font-content no-pointer-events" align="center">
                <div v-if="isSendAnswer && currentChoice == index">
                  <q-icon
                    :name="
                      isCorrectAnswer ? 'far fa-check-circle' : 'far fa-times-circle'
                    "
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
                <div :class="setTheme[themeSync - 1].description.bgColor">
                  <div class="box-header-description">
                    <q-img
                      class="no-padding"
                      width="1000px"
                      :src="
                        require(`../../../public/images/multiplevocab/multiplevocab-theme-${themeSync}-description.png`)
                      "
                    ></q-img>
                  </div>
                </div>

                <div class="q-pa-md font-16">
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
    </div>
  </div>
</template>

<script>
import headerBar from "../header-time-progress";
export default {
  components: {
    headerBar,
  },
  props: [
    "choices",
    "extravocabs",
    "currentQuestion",
    "totalQuestion",
    "totalStar",
    "practiceTime",
    "isPracticeTimeout",
    "themeSync",
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

.box-header-description {
  width: 90%;
  overflow: hidden;
}

.box-container-mobile {
  min-width: 360px;
  max-width: 1600px;
  width: 100%;
  margin: auto;
}

.box-header-main {
  width: calc(100% - 25%);
}

.box-question {
  max-height: 100px;
  min-height: 120px;
  height: fit-content;
  border: 4px solid #6f3c00;
  background-color: #fff0da;
}

.box-answer {
  max-width: 700px;
  width: 100%;
  margin: auto;
}

.btn-choices {
  max-width: 300px;
  width: 100%;
}

.font-content {
  font-size: 16px;
}
</style>
