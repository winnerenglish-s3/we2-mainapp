<template>
  <div class="relative-position row justify-center box-content-answer">
    <div class="absolute full-width">
      <header-bar
        :totalQuestion="totalQuestion"
        :currentQuestion="currentQuestion"
      ></header-bar>
    </div>
    <div class="col-12 self-start bg-sky">
      <theme-animation
        :isCorrectAnswer="isCorrectAnswer"
        :isSendAnswer="isSendAnswer"
        :themeSync="themeSync"
        style="margin-bottom: -5px; z-index: 3"
      ></theme-animation>
    </div>
    <div class="col-10 row justify-center" style="z-index: 1">
      <!-- ตัวเลือกตอบด้านซ้าย -->
      <div class="col-3 self-center">
        <div class="q-mt-md" v-for="(item, index) in choicesLeft">
          <q-img
            fit="contain"
            v-if="item.vocab != ''"
            @click="
              activeLeftIndex == null
                ? ((activeLeftIndex = index), (activeRightIndex = null))
                : ''
            "
            @mousedown="activeLeftIndex = null"
            class="cursor-pointer"
            style="max-width: 315px; width: 95%"
            :src="
              require(`../../../public/images/matching/matching-choices${
                index == activeLeftIndex ? '-active' : ''
              }.png`)
            "
          >
            <div
              class="absolute-center transparent"
              style="width: 85%; left: 45%"
              align="center"
            >
              <span style="font-size: max(1.2vw, 14px)" class="text-black">{{
                item.vocab
              }}</span>
            </div></q-img
          >
          <q-img
            fit="contain"
            v-if="item.vocab == ''"
            :class="
              activeLeftIndex != null || activeRightIndex != null ? 'cursor-pointer' : ''
            "
            @click="
              activeLeftIndex != null || activeRightIndex != null
                ? selectAnswer(index, 'left')
                : ''
            "
            style="max-width: 315px; width: 95%"
            :src="
              require(`../../../public/images/matching/matching-answer${
                activeLeftIndex != null || activeRightIndex != null ? '-active' : ''
              }.png`)
            "
          >
          </q-img>
        </div>
      </div>

      <!-- ตัวเลือกตอบด้านขวา -->
      <div class="col-3 self-center" align="right">
        <div
          class="relative-position q-mt-md"
          style="right: -32%"
          v-for="(item, index) in choicesRight"
          :key="index"
        >
          <q-img
            fit="contain"
            class="relative-position cursor-pointer"
            style="max-width: 315px; width: 95%"
            v-if="!isSendAnswer && item.vocab != ''"
            @click="
              activeRightIndex == null
                ? ((activeRightIndex = index), (activeLeftIndex = null))
                : ''
            "
            @mousedown="activeRightIndex = null"
            :src="
              require(`../../../public/images/matching/matching-choices${
                index == activeRightIndex ? '-active' : ''
              }.png`)
            "
          >
            <div class="absolute-center transparent full-width" align="center">
              <span style="font-size: max(1.1vw, 12px)" class="text-black">{{
                item.vocab
              }}</span>
            </div>
          </q-img>

          <q-img
            fit="contain"
            v-if="!isSendAnswer && item.vocab == ''"
            :class="
              activeLeftIndex != null || activeRightIndex != null ? 'cursor-pointer' : ''
            "
            @click="
              activeLeftIndex != null || activeRightIndex != null
                ? selectAnswer(index, 'right')
                : ''
            "
            class=""
            style="max-width: 315px; width: 95%"
            :src="
              require(`../../../public/images/matching/matching-answer${
                activeLeftIndex != null || activeRightIndex != null ? '-active' : ''
              }.png`)
            "
          ></q-img>

          <q-img
            fit="contain"
            v-if="isSendAnswer"
            style="max-width: 315px; width: 95%"
            :src="
              require(`../../../public/images/matching/matching-choices${
                item.vocab == dataQuestionList[currentQuestion][index].vocab
                  ? '-correct'
                  : '-incorrect'
              }.png`)
            "
          >
            <div class="absolute-center transparent full-width" align="center">
              <div class="" style="font-size: max(1.1vw, 12px)">
                <span class="text-black">
                  {{ item.vocab }}
                </span>

                <div v-if="item.vocab != dataQuestionList[currentQuestion][index].vocab">
                  <span class="text-black">คำตอบที่ถูกต้องคือ</span>
                  <br />
                  <span>{{ item.vocab }}</span>
                </div>
              </div>
            </div>
          </q-img>
        </div>
      </div>
      <div class="col-6 self-center" align="right">
        <div
          class="q-mt-md"
          v-for="(item, index) in dataQuestionList[currentQuestion]"
          :key="index"
        >
          <q-img
            class=""
            fit="contain"
            style="max-width: 600px; width: 92%"
            src="../../../public/images/matching/matching-question.png"
          >
            <div class="absolute-center transparent full-width q-px-lg" align="center">
              <span style="font-size: max(1.1vw, 12px)" class="text-black">{{
                item.meaning
              }}</span>
            </div>
          </q-img>
        </div>
      </div>
    </div>

    <div class="col-12 self-center q-py-lg" align="center" v-if="dataAnswerList.length">
      <q-img
        v-if="!isSendAnswer"
        :class="
          choicesRight.filter((x) => x.vocab != '').length ==
          dataAnswerList[currentQuestion].length
            ? 'cursor-pointer'
            : 'no-pointer-events'
        "
        @click="sendAnswer()"
        width="200px"
        :src="
          require(`../../../public/images/matching/btn-matching-${
            choicesRight.filter((x) => x.vocab != '').length ==
            dataAnswerList[currentQuestion].length
              ? ''
              : 'not'
          }active.png`)
        "
      ></q-img>

      <q-img
        v-if="isSendAnswer && !isFinishPractice"
        @click="nextQuestion()"
        class="cursor-pointer"
        width="200px"
        src="../../../public/images/next-question-btn.png"
      ></q-img>

      <q-img
        v-if="isSendAnswer && isFinishPractice"
        class="cursor-pointer"
        width="200px"
        @click="funcFinishPractice()"
        src="../../../public/images/finish-btn.png"
      ></q-img>
    </div>
  </div>
</template>

<script>
import themeAnimation from "../matching/theme-animation";
import headerBar from "../header-time-progress";
import { ref, reactive, onMounted, computed } from "vue";
export default {
  props: {
    themeSync: {
      type: Number,
      default: 0,
    },
    questionList: {
      type: Array,
      default: () => [],
    },
    totalQuestion: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { emit }) {
    const getThemeSync = () => {
      console.log(props.themeSync);
    };

    const currentQuestion = ref(0);
    const dataAnswerList = ref([]);
    const dataQuestionList = ref([]);
    const activeLeftIndex = ref(null);
    const activeRightIndex = ref(null);
    const isCorrectAnswer = ref(false);
    const isSendAnswer = ref(false);
    const isFinishPractice = ref(false);

    const sendAnswer = () => {
      if (currentQuestion.value + 1 == props.totalQuestion) {
        isFinishPractice.value = true;
      }

      isSendAnswer.value = true;

      let countCorrect = 0;

      choicesRight.value.map((x, index) => {
        if (dataQuestionList.value[currentQuestion.value][index].vocab == x.vocab) {
          countCorrect++;
        }
      });

      if (countCorrect == dataQuestionList.value[currentQuestion.value].length) {
        isCorrectAnswer.value = true;
      } else {
        isCorrectAnswer.value = false;
      }
    };

    const choicesLeft = ref([]);
    const choicesRight = ref([
      { vocab: "", meaning: "" },
      { vocab: "", meaning: "" },
      { vocab: "", meaning: "" },
    ]);

    const loadData = () => {
      let setData = props.questionList;

      setData = setData.map((x) => x);

      let tempAnswer = [];
      let tempQuestion = [];

      // แปลงโจทย์คำตอบให้เป็น อย่างละ 3 Choices
      for (let i = 0; i < props.questionList.length; i++) {
        let currentAnswer = props.questionList[i];
        let randomAnswer = [...setData];

        randomAnswer = randomAnswer.sort(() => Math.random() - 0.5);

        let findIndexCurrentAnswer = randomAnswer
          .map((x) => x.vocab)
          .indexOf(currentAnswer.vocab);

        randomAnswer.splice(findIndexCurrentAnswer, 1);

        randomAnswer = randomAnswer.slice(0, 2);

        let setNewAnswer = [
          {
            vocab: currentAnswer.vocab,
            meaning: currentAnswer.meaning,
          },
        ];

        let setNewQuestion = [
          {
            vocab: currentAnswer.vocab,
            meaning: currentAnswer.meaning,
          },
        ];

        for (let i = 0; i < randomAnswer.length; i++) {
          let newData = {
            vocab: randomAnswer[i].vocab,
            meaning: randomAnswer[i].meaning,
          };

          let setQuestion = {
            vocab: randomAnswer[i].vocab,
            meaning: randomAnswer[i].meaning,
          };

          setNewAnswer.push(newData);

          setNewQuestion.push(setQuestion);
        }

        setNewQuestion = setNewQuestion.sort(() => Math.random() - 0.5);

        tempAnswer.push(setNewAnswer);
        tempQuestion.push(setNewQuestion);
      }

      dataAnswerList.value = [...tempAnswer];
      dataQuestionList.value = [...tempQuestion];

      funcRandom();
    };

    const funcRandom = () => {
      dataAnswerList.value[currentQuestion.value].sort(() => Math.random() - 0.5);

      let setAnswer = [...dataAnswerList.value[currentQuestion.value]];

      let setQuestion = [...dataQuestionList.value[currentQuestion.value]];

      let temp = [];

      for (let i = 0; i < setAnswer.length; i++) {
        if (setAnswer[i].vocab == setQuestion[i].vocab) {
          temp.push(true);
        } else {
          temp.push(false);
        }
      }

      if (temp.every((x) => x)) {
        funcRandom();
      }

      choicesLeft.value = setAnswer;
    };

    const selectAnswer = (index, moveTo) => {
      let selectActive = "";

      if (activeLeftIndex.value != null) {
        selectActive = { ...choicesLeft.value[activeLeftIndex.value] };

        choicesLeft.value[activeLeftIndex.value].vocab = "";
        choicesLeft.value[activeLeftIndex.value].meaning = "";
      } else {
        selectActive = { ...choicesRight.value[activeRightIndex.value] };

        choicesRight.value[activeRightIndex.value].vocab = "";
        choicesRight.value[activeRightIndex.value].meaning = "";
      }

      activeLeftIndex.value = null;
      activeRightIndex.value = null;

      if (moveTo == "right") {
        choicesRight.value[index] = selectActive;
      }

      if (moveTo == "left") {
        choicesLeft.value[index] = selectActive;
      }
    };

    // Func Next Question
    const nextQuestion = () => {
      currentQuestion.value++;

      funcRandom();

      choicesRight.value = [
        { vocab: "", meaning: "" },
        { vocab: "", meaning: "" },
        { vocab: "", meaning: "" },
      ];

      isSendAnswer.value = false;
    };

    // Func Finish Practice
    const funcFinishPractice = () => {
      emit("finishPractice", true);
    };

    onMounted(() => {
      loadData();
    });

    return {
      getThemeSync,

      // practice data
      activeLeftIndex,
      activeRightIndex,
      currentQuestion,
      dataAnswerList,
      dataQuestionList,
      choicesLeft,
      choicesRight,
      isCorrectAnswer,
      isFinishPractice,
      isSendAnswer,
      funcFinishPractice,

      // Send Answer
      sendAnswer,

      // Next Question
      nextQuestion,

      // Select Answer
      selectAnswer,
    };
  },
  components: {
    headerBar,
    themeAnimation,
  },
};
</script>

<style lang="scss" scoped>
.bg-sky {
  background-image: url("../../../public/images/matching/bg-sky.png");
  background-size: cover;
  background-position: top;
}

.box-content-answer {
  background-image: url("../../../public/images/matching/bg-content-matching.png");
  background-size: contain;
  width: 100%;
}
</style>
