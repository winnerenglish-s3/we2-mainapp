<template>
  <div align="center" v-if="isFinishBoggle">
    <div class="text-h5" align="center">
      {{ showVocab }}
    </div>
    <div class="text-h5" align="center">คำที่กด : {{ selectedLetter }}</div>
    <div v-for="(item, row) in boggle" :key="row" class="row justify-center">
      <div v-for="(item2, col) in item" class="col q-pt-md">
        <q-btn
          :class="{
            'bg-teal text-white cursor-not-allowed no-pointer-events ': selectValue.filter(
              (x) => x.row == row && x.col == col
            ).length,
            'bg-red':
              !(
                selectValue[selectValue.length - 1].left.row == row &&
                selectValue[selectValue.length - 1].left.col == col
              ) &&
              !(
                selectValue[selectValue.length - 1].right.row == row &&
                selectValue[selectValue.length - 1].right.col == col
              ) &&
              !(
                selectValue[selectValue.length - 1].top.row == row &&
                selectValue[selectValue.length - 1].top.col == col
              ) &&
              !(
                selectValue[selectValue.length - 1].bottom.row == row &&
                selectValue[selectValue.length - 1].bottom.col == col
              ),
          }"
          @click="selectedBox(row, col, item2.letter)"
          :label="item2.letter"
          :disable="
            !(
              selectValue[selectValue.length - 1].left.row == row &&
              selectValue[selectValue.length - 1].left.col == col
            ) &&
            !(
              selectValue[selectValue.length - 1].right.row == row &&
              selectValue[selectValue.length - 1].right.col == col
            ) &&
            !(
              selectValue[selectValue.length - 1].top.row == row &&
              selectValue[selectValue.length - 1].top.col == col
            ) &&
            !(
              selectValue[selectValue.length - 1].bottom.row == row &&
              selectValue[selectValue.length - 1].bottom.col == col
            ) &&
            !selectValue.filter((x) => x.row == row && x.col == col).length
          "
        >
        </q-btn>
      </div>
    </div>

    <div class="q-pt-md">
      <q-btn
        label="next"
        @click="nextQuestion()"
        class="bg-teal text-white"
        style="width: 150px"
      ></q-btn>
      <div class="q-pt-md">
        <q-btn
          style="width: 150px"
          color="negative"
          @click="reset()"
          label="reset"
        ></q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
export default {
  setup() {
    const $q = useQuasar();
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
    let currentQuestion = ref(0);
    const selectedLetter = ref("");
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
              letter: vocabularyList[currentQuestion.value][counter],
            };

            selectedLetter.value = vocabularyList[currentQuestion.value][
              counter
            ].toUpperCase();

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
                    letter: vocabularyList[currentQuestion.value][counter],
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
                element[index] = { letter: letter[randomNumber] };
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

    const selectedBox = (row, col, letter) => {
      selectValue.value.push({
        row: row,
        col: col,
        left: {
          row: row,
          col: col - 1,
        },
        right: {
          row: row,
          col: col + 1,
        },
        bottom: {
          row: row + 1,
          col: col,
        },
        top: {
          row: row - 1,
          col: col,
        },
      });

      selectedLetter.value += letter.toUpperCase();
    };

    const reset = () => {
      selectValue.value = [];
      resetBoggle();
    };

    const showVocab = ref(vocabularyList[currentQuestion.value]);

    const nextQuestion = () => {
      if (currentQuestion.value < vocabularyList.length - 1) {
        currentQuestion.value++;
        selectValue.value = [];
        showVocab.value = vocabularyList[currentQuestion.value];
        resetBoggle();
      }
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
    };
  },
};
</script>

<style lang="scss" scoped></style>
