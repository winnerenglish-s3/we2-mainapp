<template>
  <q-page class="bg-seplling relative-position">
    <div id="background"></div>
    <div id="midground"></div>
    <div id="foreground"></div>
    <div>
      <app-bar
        :isLoadPractice="isLoadPractice"
        :isHasInstruction="true"
        :isShowPause="true"
        :themeSync="themeSync"
        :instructionData="instructionData"
      ></app-bar>
    </div>

    <div class="absolute-center" v-if="!isLoadPractice">
      <q-spinner color="primary" size="100px" />
    </div>

    <spelling-pc
      :practiceData="practiceData"
      :boggle="boggle"
      :selectValue="selectValue"
      :currentQuestionText="currentQuestionText"
      :selectedLetter="selectedLetter"
      :isCorrectAnswer="isCorrectAnswer"
      :currentQuestionTh="currentQuestionTh"
      @chooseBtn="selectedBox"
      @callback-sendanswer="sendAnswer"
      @callback-nextquestion="funcNextQuestion"
      @callback-finishpractice="funcFinishPractice()"
      class="box-container-main"
      v-if="$q.platform.is.desktop && isLoadPractice"
      :boggleNumber="boggleNumber"
    ></spelling-pc>

    <spelling-mobile
      :practiceData="practiceData"
      :boggle="boggle"
      :selectValue="selectValue"
      :currentQuestionText="currentQuestionText"
      :currentQuestionTh="currentQuestionTh"
      :selectedLetter="selectedLetter"
      :isCorrectAnswer="isCorrectAnswer"
      @chooseBtn="selectedBox"
      @callback-sendanswer="sendAnswer"
      @callback-nextquestion="funcNextQuestion"
      @callback-finishpractice="funcFinishPractice()"
      v-if="$q.platform.is.mobile && isLoadPractice"
      class="box-container-main"
      :boggleNumber="boggleNumber"
    ></spelling-mobile>

    <finish-practice
      :isFinishPractice="isFinishPractice"
      @reStart="reStart"
    ></finish-practice>
  </q-page>
</template>

<script>
import spellingPc from "../components/spellingbee/spellingbeePc";
import spellingMobile from "../components/spellingbee/spellingbeeMobile";
import finishPractice from "../components/finishPracticeDialog";
import appBar from "../components/app-bar";
import { useQuasar } from "quasar";
import { ref, onMounted, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
export default {
  components: {
    spellingPc,
    spellingMobile,
    appBar,
    finishPractice,
  },
  props: {
    themeSync: {
      type: Number,
      default: 0,
    },
  },

  setup(props) {
    // Router and Route
    const router = useRouter();
    const route = useRoute();
    // Initial Data
    const $q = useQuasar();
    const isCorrectAnswer = ref(false);
    const practiceData = reactive({
      totalQuestion: 0,
      currentQuestion: 0,
      question: "",
    });

    const isLoadPractice = ref(false);

    const boggle = ref([]);

    const vocabularyList = [
      { vocab: "Penguin", meaning: "เพนกวินสีน้ำเงิน" },
      { vocab: "Alligator", meaning: "จระเข้" },
      { vocab: "Ant", meaning: "มด" },
      { vocab: "King Cobra", meaning: "งูจงอาง" },
      { vocab: "King Crab", meaning: "ปูยักษ์" },
      { vocab: "Leopard Cat", meaning: "แมวดาว" },
    ];

    const letter = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ];

    const currentQuestionText = ref(vocabularyList[practiceData.currentQuestion].vocab);

    const currentQuestionTh = ref(vocabularyList[practiceData.currentQuestion].meaning);

    const selectedLetter = ref([]);

    const boggleNumber = ref(3);

    let counter = 0;

    let rowBefore;
    let colBefore;

    const isFinishBoggle = ref(false);

    const shuffleArray = (array) => {
      var currentIndex = array.length,
        temporaryValue,
        randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    };

    const resetBoggle = () => {
      selectValue.value = [];
      selectedLetter.value = [];
      counter = 0;

      if (boggleNumber.value == 5) {
        boggle.value = [
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
        ];
      } else {
        boggle.value = [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ];
      }

      rowBefore = null;
      colBefore = null;
      shuffleLetters(counter);
    };

    const selectValue = ref([]);

    let countError = 0;

    const shuffleLetters = (counter) => {
      try {
        if (counter < vocabularyList[practiceData.currentQuestion].vocab.length) {
          if (counter == 0) {
            let randomRow = Math.floor(Math.random() * 5); //random 0-4
            let randomCol = Math.floor(Math.random() * boggleNumber.value); //random 0-4
            //   ตัวแรก
            boggle.value[randomRow][randomCol] = {
              letter: vocabularyList[practiceData.currentQuestion].vocab[
                counter
              ].toUpperCase(),
            };

            selectedLetter.value.push(
              vocabularyList[practiceData.currentQuestion].vocab[counter].toUpperCase()
            );

            rowBefore = randomRow;
            colBefore = randomCol;
            selectValue.value.push({
              row: randomRow,
              col: randomCol,
              left: {
                row: randomRow,
                col: randomCol - 1,
              },
              right: {
                row: randomRow,
                col: randomCol + 1,
              },
              bottom: {
                row: randomRow + 1,
                col: randomCol,
              },
              top: {
                row: randomRow - 1,
                col: randomCol,
              },
              lineMove: "center",
            });
            counter++;
            shuffleLetters(counter);
          } else {
            const findNearestColumn = () => {
              const try3 = () => {
                let availablePosition;
                if (rowBefore == 0) {
                  if (colBefore == 0) {
                    availablePosition = [
                      [0, 1],
                      [1, 0],
                    ];
                  } else if (colBefore == 1) {
                    availablePosition = [
                      [0, 0],
                      [0, 2],
                      [1, 1],
                    ];
                  } else if (colBefore == 2) {
                    availablePosition = [
                      [0, 1],
                      [0, 3],
                      [1, 2],
                    ];
                  }
                } else if (rowBefore == 1) {
                  if (colBefore == 0) {
                    availablePosition = [
                      [1, 1],
                      [2, 0],
                      [0, 0],
                    ];
                  } else if (colBefore == 1) {
                    availablePosition = [
                      [1, 0],
                      [1, 2],
                      [0, 1],
                      [2, 1],
                    ];
                  } else if (colBefore == 2) {
                    availablePosition = [
                      [1, 1],
                      [0, 2],
                      [1, 3],
                      [2, 2],
                    ];
                  }
                } else if (rowBefore == 2) {
                  if (colBefore == 0) {
                    availablePosition = [
                      [1, 0],
                      [2, 1],
                      [3, 0],
                    ];
                  } else if (colBefore == 1) {
                    availablePosition = [
                      [2, 0],
                      [1, 1],
                      [2, 2],
                      [3, 1],
                    ];
                  } else if (colBefore == 2) {
                    availablePosition = [
                      [2, 1],
                      [1, 2],
                      [2, 3],
                      [3, 2],
                    ];
                  }
                } else if (rowBefore == 3) {
                  if (colBefore == 0) {
                    availablePosition = [
                      [2, 0],
                      [3, 1],
                      [4, 0],
                    ];
                  } else if (colBefore == 1) {
                    availablePosition = [
                      [3, 0],
                      [2, 1],
                      [3, 2],
                      [4, 1],
                    ];
                  } else if (colBefore == 2) {
                    availablePosition = [
                      [3, 1],
                      [2, 2],
                      [3, 3],
                      [4, 2],
                    ];
                  }
                } else if (rowBefore == 4) {
                  if (colBefore == 0) {
                    availablePosition = [
                      [3, 0],
                      [4, 1],
                    ];
                  } else if (colBefore == 1) {
                    availablePosition = [
                      [4, 0],
                      [3, 1],
                      [4, 2],
                    ];
                  } else if (colBefore == 2) {
                    availablePosition = [
                      [4, 1],
                      [3, 2],
                      [4, 3],
                    ];
                  }
                }

                let shuffleArr = shuffleArray(availablePosition);
                let [row, col] = shuffleArr[0];
                if (boggle.value[row][col] == "") {
                  boggle.value[row][col] = {
                    letter: vocabularyList[practiceData.currentQuestion].vocab[
                      counter
                    ].toUpperCase(),
                  };
                  counter++;
                  rowBefore = row;
                  colBefore = col;
                  shuffleLetters(counter);
                  countError = 0;
                } else {
                  countError++;
                  if (countError < 100) {
                    findNearestColumn();
                  } else {
                    countError = 0;
                    resetBoggle();
                  }
                }
              };

              const try5 = () => {
                let availablePosition;
                if (rowBefore == 0) {
                  if (colBefore == 0) {
                    availablePosition = [
                      [0, 1],
                      [1, 0],
                    ];
                  } else if (colBefore == 1) {
                    availablePosition = [
                      [0, 0],
                      [0, 2],
                      [1, 1],
                    ];
                  } else if (colBefore == 2) {
                    availablePosition = [
                      [0, 1],
                      [0, 3],
                      [1, 2],
                    ];
                  } else if (colBefore == 3) {
                    availablePosition = [
                      [0, 2],
                      [0, 4],
                      [1, 3],
                    ];
                  } else if (colBefore == 4) {
                    availablePosition = [
                      [0, 3],
                      [1, 4],
                    ];
                  }
                } else if (rowBefore == 1) {
                  if (colBefore == 0) {
                    availablePosition = [
                      [1, 1],
                      [2, 0],
                      [0, 0],
                    ];
                  } else if (colBefore == 1) {
                    availablePosition = [
                      [1, 0],
                      [1, 2],
                      [0, 1],
                      [2, 1],
                    ];
                  } else if (colBefore == 2) {
                    availablePosition = [
                      [1, 1],
                      [0, 2],
                      [1, 3],
                      [2, 2],
                    ];
                  } else if (colBefore == 3) {
                    availablePosition = [
                      [1, 2],
                      [0, 3],
                      [1, 4],
                      [2, 3],
                    ];
                  } else if (colBefore == 4) {
                    availablePosition = [
                      [1, 3],
                      [0, 4],
                      [2, 4],
                    ];
                  }
                } else if (rowBefore == 2) {
                  if (colBefore == 0) {
                    availablePosition = [
                      [1, 0],
                      [2, 1],
                      [3, 0],
                    ];
                  } else if (colBefore == 1) {
                    availablePosition = [
                      [2, 0],
                      [1, 1],
                      [2, 2],
                      [3, 1],
                    ];
                  } else if (colBefore == 2) {
                    availablePosition = [
                      [2, 1],
                      [1, 2],
                      [2, 3],
                      [3, 2],
                    ];
                  } else if (colBefore == 3) {
                    availablePosition = [
                      [2, 2],
                      [1, 3],
                      [2, 4],
                      [3, 3],
                    ];
                  } else if (colBefore == 4) {
                    availablePosition = [
                      [2, 3],
                      [1, 4],
                      [3, 4],
                    ];
                  }
                } else if (rowBefore == 3) {
                  if (colBefore == 0) {
                    availablePosition = [
                      [2, 0],
                      [3, 1],
                      [4, 0],
                    ];
                  } else if (colBefore == 1) {
                    availablePosition = [
                      [3, 0],
                      [2, 1],
                      [3, 2],
                      [4, 1],
                    ];
                  } else if (colBefore == 2) {
                    availablePosition = [
                      [3, 1],
                      [2, 2],
                      [3, 3],
                      [4, 2],
                    ];
                  } else if (colBefore == 3) {
                    availablePosition = [
                      [3, 2],
                      [2, 3],
                      [3, 4],
                      [4, 3],
                    ];
                  } else if (colBefore == 4) {
                    availablePosition = [
                      [3, 3],
                      [2, 4],
                      [4, 4],
                    ];
                  }
                } else if (rowBefore == 4) {
                  if (colBefore == 0) {
                    availablePosition = [
                      [3, 0],
                      [4, 1],
                    ];
                  } else if (colBefore == 1) {
                    availablePosition = [
                      [4, 0],
                      [3, 1],
                      [4, 2],
                    ];
                  } else if (colBefore == 2) {
                    availablePosition = [
                      [4, 1],
                      [3, 2],
                      [4, 3],
                    ];
                  } else if (colBefore == 3) {
                    availablePosition = [
                      [4, 2],
                      [3, 3],
                      [4, 4],
                    ];
                  } else if (colBefore == 4) {
                    availablePosition = [
                      [4, 3],
                      [3, 4],
                    ];
                  }
                }

                let shuffleArr = shuffleArray(availablePosition);
                let [row, col] = shuffleArr[0];
                if (boggle.value[row][col] == "") {
                  boggle.value[row][col] = {
                    letter: vocabularyList[practiceData.currentQuestion].vocab[
                      counter
                    ].toUpperCase(),
                  };
                  counter++;
                  rowBefore = row;
                  colBefore = col;
                  shuffleLetters(counter);
                  countError = 0;
                } else {
                  countError++;
                  if (countError < 100) {
                    findNearestColumn();
                  } else {
                    countError = 0;
                    resetBoggle();
                  }
                }
              };
              try {
                if (boggleNumber.value == 3) {
                  try3();
                } else {
                  try5();
                }
              } catch (error) {
                resetBoggle();
              }
            };

            findNearestColumn();
          }
        } else {
          // Finish
          boggle.value.forEach((element) => {
            element.forEach((x, index) => {
              if (!x) {
                let randomNumber = Math.floor(Math.random() * 26); //raddom 0  - 25
                element[index] = { letter: letter[randomNumber].toUpperCase() };
              }
            });
          });
          isFinishBoggle.value = true;
        }
      } catch (error) {
        resetBoggle();
      }
    };

    const selectedBox = (item) => {
      // ถ้ามีการกดปุ่มไว้อยู่แล้ว
      let sameAnswer = selectValue.value.filter(
        (x) => x.row == item.row && x.col == item.col
      ).length;

      // กรณีครั้งแรกห้ามกดตัวซ้ำ
      if (sameAnswer && selectValue.value.length == 1) {
        return;
      }

      if (selectValue.value.length > 1) {
        // เก็บค่า Index หลังจากกด Back กลับไป
        let backAnswer = selectValue.value[selectValue.value.length - 2];

        // เช็คค่า Back หลังจากกดกลับไป ว่าค่า Index ตรงกับที่กดมาหรือไม่
        if (backAnswer.row == item.row && backAnswer.col == item.col) {
          // isSendAnswer.value = false;
          // selectValue.value[selectValue.value.length - 2].lineMove = "center";
          selectValue.value.pop();
          selectedLetter.value.pop();
          return;
        }

        let DulpicateIndex = selectValue.value.filter(
          (x) => x.row == item.row && x.col == item.col
        ).length;

        // ถ้ากรณีมีข้อมูลที่กดอยู่แล้ว
        if (DulpicateIndex) {
          return;
        }

        // ไม่สามารถกดปุ่มต่อไปได้ถ้าตอบข้อตามจำนวนข้อแล้ว
        if (selectValue.value.length == currentQuestionText.value.length) {
          return;
        }
      }

      selectValue.value.push({
        row: item.row,
        col: item.col,
        left: {
          row: item.row,
          col: item.col - 1,
        },
        right: {
          row: item.row,
          col: item.col + 1,
        },
        bottom: {
          row: item.row + 1,
          col: item.col,
        },
        top: {
          row: item.row - 1,
          col: item.col,
        },
        lineMove: "center",
      });

      if (item.row == selectValue.value[selectValue.value.length - 2].row) {
        if (item.col > selectValue.value[selectValue.value.length - 2].col) {
          selectValue.value[selectValue.value.length - 1].lineMove = "right";
        } else {
          selectValue.value[selectValue.value.length - 1].lineMove = "left";
        }
      } else {
        if (item.row > selectValue.value[selectValue.value.length - 2].row) {
          selectValue.value[selectValue.value.length - 1].lineMove = "top";
        } else {
          selectValue.value[selectValue.value.length - 1].lineMove = "bottom";
        }
      }

      selectedLetter.value.push(item.val.toUpperCase());
    };

    const sendAnswer = () => {
      let answerLetter = selectedLetter.value.join("");

      if (answerLetter == currentQuestionText.value.toUpperCase()) {
        isCorrectAnswer.value = true;
      } else {
        isCorrectAnswer.value = false;
      }
    };

    const reset = () => {
      selectValue.value = [];
      resetBoggle();
    };

    const funcNextQuestion = () => {
      practiceData.currentQuestion++;
      selectValue.value = [];
      currentQuestionText.value = vocabularyList[practiceData.currentQuestion].vocab;
      currentQuestionTh.value = vocabularyList[practiceData.currentQuestion].meaning;
      resetBoggle();
    };

    const isFinishPractice = ref(false);

    const funcFinishPractice = () => {
      setTimeout(() => {
        isFinishPractice.value = true;
      }, 100);
    };

    const funcLoadPractice = () => {
      practiceData.totalQuestion = vocabularyList.length;
      currentQuestionText.value = vocabularyList[practiceData.currentQuestion].vocab;
      currentQuestionTh.value = vocabularyList[practiceData.currentQuestion].meaning;

      setTimeout(() => {
        shuffleLetters(counter);

        isLoadPractice.value = true;
      }, 1500);
    };

    const reStart = async () => {
      isFinishPractice.value = false;
      isLoadPractice.value = false;

      practiceData.totalQuestion = 0;
      practiceData.currentQuestion = 0;
      practiceData.totalStar = 0;

      // await checkPracticePermission();
      funcLoadPractice();
    };

    onMounted(() => {
      funcLoadPractice();
    });

    return {
      practiceData,
      boggle,
      funcNextQuestion,
      selectedBox,
      selectValue,
      reset,
      isFinishBoggle,
      selectedLetter,
      currentQuestionText,
      currentQuestionTh,
      sendAnswer,
      isCorrectAnswer,
      isLoadPractice,
      funcFinishPractice,
      finishPractice,
      isFinishPractice,
      funcLoadPractice,
      reStart,
      boggleNumber,
    };
  },
  data() {
    return {
      tab: "vocab",
      instruction: {
        en: "xxx",
        th: "ปปป",
      },
    };
  },
  methods: {
    closeInstructionBtn() {
      this.$emit("closeInstruction");
    },
    closeHelpBtn() {
      this.$emit("closeHelp");
    },
  },
};
</script>

<style lang="scss" scoped>
@keyframes STAR-MOVE {
  to {
    left: -10000px;
    top: -2000px;
  }
}

#background {
  // background: black url(../../public/images/spellingbee/background-star.png) repeat 5% 5%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;

  -webkit-animation-name: STAR-MOVE;
  -webkit-animation-duration: 1000s;
  -webkit-animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
}

#midground {
  background: url(../../public/images/spellingbee/midground-star.png) repeat 0% 0%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;

  -webkit-animation-name: STAR-MOVE;
  -webkit-animation-duration: 500s;
  -webkit-animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
}

#foreground {
  background: url(../../public/images/spellingbee/foreground-star.png) repeat 0% 0%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;

  -webkit-animation-name: STAR-MOVE;
  -webkit-animation-duration: 300s;
  -webkit-animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
}

.bg-seplling {
  // background-image: url("../../public/images/spellingbee/bg-spellingbee.png");
  background-size: cover;
  background-position: center;
  background-color: #252a52;
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
