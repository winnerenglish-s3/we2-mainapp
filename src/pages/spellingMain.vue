<template>
  <q-page class="bg-seplling">
    <spelling-pc
      :testData="testData"
      :currentAnswerList="currentAnswerList"
      :currentQuestionText="currentQuestionText"
      :currentQuestion="currentQuestion"
      :totalQuestion="totalQuestion"
      :totalStar="totalStar"
      :practiceTime="practiceTime"
      :isPracticeTimeout="isPracticeTimeout"
      :isCorrectAnswer="isCorrectAnswer"
      :themeSync="themeSync"
      @chooseBtn="lineMoveBtn"
      @sendCallBack="sendAnswer"
      @sendNextQuestion="nextQuestion"
      class="box-container-main"
      v-if="$q.platform.is.desktop"
    ></spelling-pc>
    <spelling-mobile
      :testData="testData"
      :currentAnswerList="currentAnswerList"
      :currentQuestionText="currentQuestionText"
      :currentQuestion="currentQuestion"
      :totalQuestion="totalQuestion"
      :totalStar="totalStar"
      :practiceTime="practiceTime"
      :isPracticeTimeout="isPracticeTimeout"
      :isCorrectAnswer="isCorrectAnswer"
      :themeSync="themeSync"
      @chooseBtn="lineMoveBtn"
      @sendCallBack="sendAnswer"
      @sendNextQuestion="nextQuestion"
      v-if="$q.platform.is.mobile"
      class="box-container-main"
    ></spelling-mobile>

    <!-- Help Popup -->
    <!-- <q-dialog maximized v-model="isShowDialogHelp" persistent>
      <q-card class="transparent shadow-0">
        <q-card-section class="fit">
          <div
            class="absolute-center q-pa-md"
            :class="
              $q.platform.is.desktop ? 'box-extravocab-pc' : 'box-extravocab-mobile'
            "
          >
            <q-tabs
              v-model="tab"
              shrink
              dense
              class="box-header-extravocab"
              indicator-color="warning"
              align="justify"
            >
              <q-tab class="q-pa-sm" name="vocab" label="ตัวช่วย" />
            </q-tabs>
            <div class="bg-white">
              <q-tab-panels v-model="tab" animated>
                <q-tab-panel class="no-padding" name="vocab">
                  <div class="row">
                    <div
                      :class="$q.platform.is.desktop ? 'col-6' : 'col-12'"
                      :style="index % 2 == 0 ? 'border-right:1px solid #C4C4C4' : ''"
                      style="border-bottom: 1px solid #c4c4c4"
                      v-for="(item, index) in vocabList"
                      :key="index"
                    >
                      <div class="q-pa-sm">
                        <span>{{ item.vocab }}</span>
                        <br />
                        <span>{{ item.meaning }}</span>
                      </div>
                    </div>
                  </div>
                </q-tab-panel>
              </q-tab-panels>
            </div>
            <div
              v-if="$q.platform.is.desktop"
              align="center"
              class="q-pa-md bg-white"
              style="border-radius: 0px 0px 7px 7px"
            >
              <q-img
                @click="closeHelpBtn()"
                class="cursor-pointer"
                style="width: 200px"
                src="../../public/images/close-help-btn-pc.png"
              ></q-img>
            </div>
            <div v-if="$q.platform.is.mobile">
              <q-img
                @click="closeHelpBtn()"
                class="cursor-pointer"
                src="../../public/images/close-help-btn-mobile.png"
              ></q-img>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog> -->
  </q-page>
</template>

<script>
import spellingPc from "../components/spellingbee/spellingbeePc";
import spellingMobile from "../components/spellingbee/spellingbeeMobile";
export default {
  components: {
    spellingPc,
    spellingMobile
  },
  props: {
    isStartPractice: {
      type: Boolean,
      default: () => true
    },
    isShowDialogHelp: {
      type: Boolean,
      default: () => false
    },
    isShowDialogInstruction: {
      type: Boolean,
      default: () => false
    },
    themeSync: {
      type: Number,
      default: 0
    }
    // vocabList: {
    //   type: Array,
    //   default: [],
    // },
  },
  data() {
    return {
      tab: "vocab",
      instruction: {
        en: "xxx",
        th: "ปปป"
      },
      totalStar: 0,
      totalQuestion: 3,
      currentQuestion: 0,
      numberOfPractice: 0,
      practiceTime: 10,
      testData: [
        "Q",
        "R",
        "A",
        "D",
        "T",
        "S",
        "A",
        "Z",
        "P",
        "W",
        "E",
        "B",
        "B",
        "I",
        "O",
        "P",
        "F",
        "W",
        "T",
        "U",
        "H",
        "L",
        "Z",
        "X",
        "O"
      ],
      currentAnswerList: [],
      currentQuestionText: "RABBIT",
      questionList: [
        {
          question: "RABBIT",
          correntAnswer: "RABBIT"
        },
        {
          question: "ZPW",
          correntAnswer: "ZPW"
        },
        {
          question: "SABBIPWOUO",
          correntAnswer: "SABBIPWOUO"
        }
      ],

      isCorrectAnswer: false,

      isPracticeTimeout: false,
      funcPracticeTime: "",

      // For Practice Layout
      isHasHelp: true,
      isHasInstruction: true
    };
  },
  methods: {
    closeInstructionBtn() {
      this.$emit("closeInstruction");
    },
    closeHelpBtn() {
      this.$emit("closeHelp");
    },
    nextQuestion() {
      if (this.currentQuestion + 1 != this.totalQuestion) {
        this.currentQuestion++;
        this.isCorrectAnswer = false;
      } else {
        this.$emit("isShowFinishPractice", true);
        return;
      }

      this.setStartPoint();
    },
    sendAnswer() {
      console.clear();
      let randomStar = Math.ceil(Math.random() * 10);

      if (randomStar % 2 == 0) {
        if (this.totalStar != 3) {
          this.totalStar += 1;
        } else {
          this.totalStar = 0;
        }
      }

      if (this.numberOfPractice != 2) {
        this.numberOfPractice += 1;
      } else {
        this.numberOfPractice = 1;
      }

      this.$emit("numberOfPractice", this.numberOfPractice);

      if (this.currentQuestion == 1) {
        this.isCorrectAnswer = true;
      } else {
        this.isCorrectAnswer = false;
      }
    },
    lineMoveBtn(item) {
      // ถ้ามีการกดปุ่มไว้อยู่แล้ว
      let sameAnswer = this.currentAnswerList.filter(x => x.index == item.index)
        .length;

      // กรณีครั้งแรกห้ามกดตัวซ้ำ
      if (sameAnswer && this.currentAnswerList.length == 1) {
        return;
      }

      if (this.currentAnswerList.length > 1) {
        // เก็บค่า Index หลังจากกด Back กลับไป
        let backAnswer = this.currentAnswerList[
          this.currentAnswerList.length - 2
        ].index;

        // เช็คค่า Back หลังจากกดกลับไป ว่าค่า Index ตรงกับที่กดมาหรือไม่
        if (backAnswer == item.index) {
          this.isSendAnswer = false;
          this.currentAnswerList[this.currentAnswerList.length - 2].lineMove =
            "center";
          this.currentAnswerList.pop();
          return;
        }

        let DulpicateIndex = this.currentAnswerList.filter(
          x => x.index == item.index
        ).length;

        // ถ้ากรณีมีข้อมูลที่กดอยู่แล้ว
        if (DulpicateIndex) {
          return;
        }

        // ไม่สามารถกดปุ่มต่อไปได้ถ้าตอบข้อตามจำนวนข้อแล้ว
        if (this.currentAnswerList.length == this.currentQuestionText.length) {
          return;
        }
      }

      // เซ็ท
      let newData = {
        index: item.index,
        text: item.val,
        lineMove: "center",
        setAround: {
          left: item.index - 1,
          right: item.index + 1,
          top: item.index - 5,
          bottom: item.index + 5
        }
      };

      if (item.index < 5) {
        if (item.index == 0) {
          newData.setAround.left = null;
        } else if (item.index == 4) {
          newData.setAround.right = null;
        }
      } else if (item.index < 10) {
        if (item.index == 5) {
          newData.setAround.left = null;
        } else if (item.index == 9) {
          newData.setAround.right = null;
        }
      } else if (item.index < 15) {
        if (item.index == 10) {
          newData.setAround.left = null;
        } else if (item.index == 14) {
          newData.setAround.right = null;
        }
      } else if (item.index < 20) {
        if (item.index == 15) {
          newData.setAround.left = null;
        } else if (item.index == 19) {
          newData.setAround.right = null;
        }
      } else {
        if (item.index == 20) {
          newData.setAround.left = null;
        } else if (item.index == 24) {
          newData.setAround.right = null;
        }
      }

      for (const setLine in newData.setAround) {
        if (
          this.currentAnswerList[this.currentAnswerList.length - 1].setAround[
            setLine
          ] == item.index
        ) {
          if (setLine == "right") {
            this.currentAnswerList[this.currentAnswerList.length - 1].lineMove =
              "left";
          } else if (setLine == "left") {
            this.currentAnswerList[this.currentAnswerList.length - 1].lineMove =
              "right";
          } else {
            this.currentAnswerList[
              this.currentAnswerList.length - 1
            ].lineMove = setLine;
          }
        }
      }

      this.currentAnswerList.push(newData);
    },
    setStartPoint() {
      this.currentAnswerList = [];
      this.currentQuestionText = this.questionList[
        this.currentQuestion
      ].question;

      let firstText = this.questionList[this.currentQuestion].question[0];

      let randomPoint = Math.ceil(Math.random() * 24);

      let newData = {
        text: firstText,
        index: randomPoint,
        lineMove: "center",
        setAround: {
          left: randomPoint - 1,
          right: randomPoint + 1,
          center: randomPoint,
          top: randomPoint - 5,
          bottom: randomPoint + 5
        }
      };

      if (randomPoint < 5) {
        if (randomPoint == 0) {
          newData.setAround.left = null;
        } else if (randomPoint == 4) {
          newData.setAround.right = null;
        }
      } else if (randomPoint < 10) {
        if (randomPoint == 5) {
          newData.setAround.left = null;
        } else if (randomPoint == 9) {
          newData.setAround.right = null;
        }
      } else if (randomPoint < 15) {
        if (randomPoint == 10) {
          newData.setAround.left = null;
        } else if (randomPoint == 14) {
          newData.setAround.right = null;
        }
      } else if (randomPoint < 20) {
        if (randomPoint == 15) {
          newData.setAround.left = null;
        } else if (randomPoint == 19) {
          newData.setAround.right = null;
        }
      } else {
        if (randomPoint == 20) {
          newData.setAround.left = null;
        } else if (randomPoint == 24) {
          newData.setAround.right = null;
        }
      }

      this.currentAnswerList.push(newData);
    }
  },
  created() {
    if (this.isHasHelp) {
      this.$emit("isShowButtonHelp");
    }

    if (this.isHasInstruction) {
      this.$emit("isShowButtonInstruction");
    }

    this.testData = this.testData.map((x, index) => {
      return { val: x, index: index };
    });

    this.setStartPoint();
  },
  watch: {
    isStartPractice() {
      if (!this.isStartPractice) {
        this.isCorrectAnswer = false;
        this.currentAnswerList = [];
        this.currentQuestion = 0;
        this.totalStar = 0;
        this.setStartPoint();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.bg-seplling {
  background-image: url("../../public/images/spellingbee/bg-spellingbee.png");
  background-size: cover;
  background-position: center;
}
.box-extravocab-pc {
  max-width: 600px;
  min-width: 290px;
  width: 100%;
}

.box-extravocab-mobile {
  max-width: 400px;
  width: 100%;
}

.box-header-extravocab {
  background-color: #9f220c;
  color: #fff;
  border-radius: 7px 7px 0px 0px;
}

.box-content-instruction {
  height: 100%;
}
</style>
