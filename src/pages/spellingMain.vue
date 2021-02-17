<template>
  <q-page class="bg-seplling">
    <div>
      <app-bar :instructionData="instructionData"></app-bar>
    </div>

    <spelling-pc
      :boggle="boggle"
      :selectValue="selectValue"
      :currentQuestionText="currentQuestionText"
      :currentQuestion="currentQuestion"
      :selectedLetter="selectedLetter"
      :totalQuestion="totalQuestion"
      :totalStar="totalStar"
      :practiceTime="practiceTime"
      :isPracticeTimeout="isPracticeTimeout"
      :isCorrectAnswer="isCorrectAnswer"
      :themeSync="themeSync"
      @chooseBtn="selectedBox"
      @sendCallBack="sendAnswer"
      @sendNextQuestion="nextQuestion"
      class="box-container-main"
      v-if="$q.platform.is.desktop"
    ></spelling-pc>
    <spelling-mobile
      :boggle="boggle"
      :selectValue="selectValue"
      :currentQuestionText="currentQuestionText"
      :currentQuestion="currentQuestion"
      :selectedLetter="selectedLetter"
      :totalQuestion="totalQuestion"
      :totalStar="totalStar"
      :practiceTime="practiceTime"
      :isPracticeTimeout="isPracticeTimeout"
      :isCorrectAnswer="isCorrectAnswer"
      :themeSync="themeSync"
      @chooseBtn="selectedBox"
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
import appBar from "../components/app-bar";
import { useQuasar } from "quasar";
import { ref, onMounted } from "vue";
export default {
  components: {
    spellingPc,
    spellingMobile,
    appBar,
  },
  props: {
    themeSync: {
      type: Number,
      default: 0,
    },
  },

  setup(props) {
    // Initial Data
    const $q = useQuasar();
    const isCorrectAnswer = ref(false);

    let currentQuestion = ref(0);
    const boggle = ref([
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ]);

    const vocabularyList = [
      "Alligator",
      "Ant",
      "Baboon",
      "Bat",
      "Bear",
      "Beetle",
      "Bird",
      "Camel",
      "Cat",
      "Centipede",
      "Chicken",
      "Deer",
      "Dog",
      "Eagle",
      "Elephant",
      "Eel",
      "Eastern Gorilla",
      "Fennec Fox",
      "Fur Seal",
      "King Cobra",
      "King Crab",
      "Leopard Cat",
      "Little Penguin",
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

    const currentQuestionText = ref(vocabularyList[currentQuestion.value]);

    const selectedLetter = ref([]);

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
      console.log("reset");
      selectValue.value = [];
      selectedLetter.value = [];
      counter = 0;
      boggle.value = [
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
      ];
      rowBefore = null;
      colBefore = null;
      shuffleLetters(counter);
    };

    const selectValue = ref([]);

    let countError = 0;

    const shuffleLetters = (counter) => {
      try {
        if (counter < vocabularyList[currentQuestion.value].length) {
          if (counter == 0) {
            let randomRow = Math.floor(Math.random() * 5); //random 0-4
            let randomCol = Math.floor(Math.random() * 5); //random 0-4
            //   ตัวแรก
            boggle.value[randomRow][randomCol] = {
              letter: vocabularyList[currentQuestion.value][counter].toUpperCase(),
            };

            selectedLetter.value.push(
              vocabularyList[currentQuestion.value][counter].toUpperCase()
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
              try {
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
                    letter: vocabularyList[currentQuestion.value][counter].toUpperCase(),
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
                    console.log(boggle.value);
                    resetBoggle();
                  }
                }
              } catch (error) {
                console.log(error);
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
        console.log("error out");
        resetBoggle();
      }
    };

    const selectedBox = (item) => {
      // ถ้ามีการกดปุ่มไว้อยู่แล้ว
      let sameAnswer = selectValue.value.filter(
        (x) => x.row == item.row && x.col == item.col
      ).length;

      console.log(sameAnswer);

      // กรณีครั้งแรกห้ามกดตัวซ้ำ
      if (sameAnswer && selectValue.value.length == 1) {
        return;
      }

      if (selectValue.value.length > 1) {
        // เก็บค่า Index หลังจากกด Back กลับไป
        let backAnswer = selectValue.value[selectValue.value.length - 2];

        console.log(backAnswer);

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

      let newData = {
        setAround: {
          left: null,
          right: null,
          center: null,
          top: null,
          bottom: null,
        },
      };

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
        console.log("Same Row");
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

    const showVocab = ref(vocabularyList[currentQuestion.value]);

    const nextQuestion = () => {
      currentQuestion.value++;
      selectValue.value = [];

      showVocab.value = vocabularyList[currentQuestion.value];

      currentQuestionText.value = showVocab.value;
      resetBoggle();
    };

    onMounted(() => {
      shuffleLetters(counter);
    });

    return {
      boggle,
      nextQuestion,
      selectedBox,
      selectValue,
      reset,
      showVocab,
      isFinishBoggle,
      selectedLetter,
      currentQuestionText,
      sendAnswer,
      isCorrectAnswer,
    };
  },
  data() {
    return {
      tab: "vocab",
      instruction: {
        en: "xxx",
        th: "ปปป",
      },

      isPracticeTimeout: false,
      funcPracticeTime: "",

      // For Practice Layout
      isHasHelp: true,
      isHasInstruction: true,
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
