<template>
  <div align="center">
    <div v-for="(item, index) in boggle" :key="index" class="row justify-center">
      <div v-for="(item2, index2) in item" class="col q-pt-md">
        <q-btn :label="item2"> </q-btn>
      </div>
    </div>

    <div class="q-pt-md">
      <q-btn
        label="next"
        @click="nextQuestion()"
        class="bg-teal text-white"
        style="width: 150px"
      ></q-btn>
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
      "blackbirdsxczvs",
      "blackbirdsxczvs",
      "blackbirdsxczvs",
      "blackbirdsxczvs",
      "blackbirdsxczvs",
      "blackbirdsxczvs",
      "blackbirdsxczvs",
      "blackbirdsxczvs",
      "blackbirdsxczvs",
      "blackbirdsxczvs",
      "blackbirdsxczvs",
      "blackbirdsxczvs",
      "blackbirdsxczvs",
      "blackbirdsxczvs",
    ];
    let currentQuestion = ref(0);

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

    let countError = 0;

    const shuffleLetters = (counter) => {
      try {
        if (counter < vocabularyList[currentQuestion.value].length) {
          if (counter == 0) {
            let randomRow = Math.floor(Math.random() * 5); //random 0-4
            let randomCol = Math.floor(Math.random() * 5); //random 0-4
            //   ตัวแรก
            boggle.value[randomRow][randomCol] =
              vocabularyList[currentQuestion.value][counter];
            rowBefore = randomRow;
            colBefore = randomCol;
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
                  boggle.value[row][col] = vocabularyList[currentQuestion.value][counter];
                  counter++;
                  rowBefore = row;
                  colBefore = col;
                  shuffleLetters(counter);
                  countError = 0;
                } else {
                  countError++;
                  console.log(countError);
                  if (countError < 50) {
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
          console.log("finish");
          boggle.value.forEach((element) => {
            element.forEach((x) => {
              if (!x) {
                x = "1";
              }
            });
          });
          $q.loading.hide();
        }
      } catch (error) {
        console.log("error out");
        resetBoggle();
      }
    };

    const nextQuestion = () => {
      if (currentQuestion.value < vocabularyList.length - 1) {
        currentQuestion.value++;
        resetBoggle();
      }
    };

    onMounted(() => {
      shuffleLetters(counter);
    });
    return { boggle, nextQuestion };
  },
};
</script>

<style lang="scss" scoped></style>
