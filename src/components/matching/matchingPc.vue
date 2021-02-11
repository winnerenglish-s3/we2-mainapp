<template>
  <div class="relative-position row box-content-answer">
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
    <div class="col-12 row justify-center" style="z-index: 1">
      <!-- ตัวเลือกตอบด้านซ้าย -->
      <div class="col-3 self-center">
        <div class="q-mt-md" v-for="(item, index) in showAnswer">
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
            <div class="absolute-center transparent full-width" align="center">
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
      <div class="col-8 self-center" align="right">
        <div class="q-mt-md" v-for="(item, index) in choicesRight">
          <q-img
            fit="contain"
            class="relative-position cursor-pointer"
            style="max-width: 315px; width: 35%; margin-right: -5%"
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
            <div class="absolute-center transparent">
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
            style="max-width: 315px; width: 35%; margin-right: -5%"
            :src="
              require(`../../../public/images/matching/matching-answer${
                activeLeftIndex != null || activeRightIndex != null ? '-active' : ''
              }.png`)
            "
          ></q-img>

          <q-img
            fit="contain"
            v-if="isSendAnswer"
            style="max-width: 315px; width: 35%; margin-right: -5%"
            :src="
              require(`../../../public/images/matching/matching-choices${
                showQuestion[index].vocab == item.vocab ? '-correct' : '-incorrect'
              }.png`)
            "
          >
            <div class="absolute-center transparent full-width" align="center">
              <div class="" style="font-size: max(1.1vw, 12px)">
                <span class="text-black">
                  {{ item.vocab }}
                </span>

                <div v-if="showQuestion[index].vocab != item.vocab">
                  <span class="text-black">คำตอบที่ถูกต้องคือ</span>
                  <br />
                  <span>{{ showQuestion[index].vocab }}</span>
                </div>
              </div>
            </div>
          </q-img>

          <q-img
            class=""
            fit="contain"
            style="max-width: 600px; width: 68%"
            src="../../../public/images/matching/matching-question.png"
          >
            <div class="absolute-center transparent full-width q-px-lg" align="center">
              <span style="font-size: max(1.1vw, 12px)" class="text-black">{{
                showQuestion[index].meaning
              }}</span>
            </div></q-img
          >
        </div>
      </div>
    </div>

    <div class="col-12 self-center q-py-lg" align="center">
      <q-img
        v-if="!isSendAnswer"
        :class="
          choicesRight.filter((x) => x.vocab != '').length == choices.length
            ? 'cursor-pointer'
            : ''
        "
        @click="sendAnswer()"
        width="200px"
        :src="
          require(`../../../public/images/matching/btn-matching-${
            choicesRight.filter((x) => x.vocab != '').length == choices.length
              ? ''
              : 'not'
          }active.png`)
        "
      ></q-img>

      <q-img
        v-if="isSendAnswer && currentQuestion != totalQuestion"
        @click="nextQuestion()"
        class="cursor-pointer"
        width="200px"
        src="../../../public/images/next-question-btn.png"
      ></q-img>

      <q-img
        v-if="isSendAnswer && currentQuestion == totalQuestion"
        class="cursor-pointer"
        width="200px"
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
  },
  setup(props) {
    const testCount = ref(0);

    const getThemeSync = () => {
      console.log(props.themeSync);
    };

    const currentQuestion = ref(0);
    const dataAnswerList = ref([]);
    const dataQuestionList = ref([]);
    const activeLeftIndex = ref(null);
    const activeRightIndex = ref(null);

    const sendAnswer = () => {
      this.isSendAnswer = true;

      let countCorrect = 0;

      this.choicesRight.map((x, index) => {
        if (this.randomQuestion[index].vocab == x.vocab) {
          countCorrect++;
        }
      });

      if (countCorrect == this.choices.length) {
        this.isCorrectAnswer = true;
      } else {
        this.isCorrectAnswer = false;
      }
    };

    const loadData = () => {
      let setData = props.questionList;

      setData = setData.map((x) => x);

      let tempAnswer = [];
      let tempQuestion = [];

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

        for (let i = 0; i < randomAnswer.length; i++) {
          let newData = {
            vocab: randomAnswer[i].vocab,
            meaning: randomAnswer[i].meaning,
          };

          setNewAnswer.push(newData);
        }

        let setNewQuestion = [...setNewAnswer];

        setNewQuestion = setNewQuestion.sort(() => Math.random() - 0.5);

        tempAnswer.push(setNewAnswer);
        tempQuestion.push(setNewQuestion);
      }

      dataAnswerList.value = tempAnswer;
      dataQuestionList.value = tempQuestion;
    };

    const funcRandom = () => {
      dataAnswerList.value[currentQuestion.value].sort(() => Math.random() - 0.5);

      let setAnswer = dataAnswerList.value[currentQuestion.value];
      let setQuestion = dataQuestionList.value[currentQuestion.value];

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

      return setAnswer;
    };

    const choicesLeft = ref([]);
    const choicesRight = ref([
      { vocab: "", meaning: "" },
      { vocab: "", meaning: "" },
      { vocab: "", meaning: "" },
    ]);

    const showAnswer = computed(() => {
      let setData = [];
      if (dataAnswerList.value.length) {
        setData = funcRandom();
      }

      return setData;
    });

    const showQuestion = computed(() => {
      let setData = dataQuestionList.value[currentQuestion.value];

      return setData;
    });

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

    onMounted(() => {
      loadData();
    });

    return {
      testCount,
      getThemeSync,

      // practice data
      activeLeftIndex,
      activeRightIndex,
      currentQuestion,
      dataAnswerList,
      dataQuestionList,
      showAnswer,
      showQuestion,
      choicesLeft,
      choicesRight,
      sendAnswer,

      // Select Answer
      selectAnswer,
    };
  },
  components: {
    headerBar,
    themeAnimation,
  },
  data() {
    return {
      choices: [
        {
          vocab: "electrician",
          meaning: "นักวิชาการ, ผู้คงแก่เรียน, ผู้ได้รับทุนการศึกษา",
        },
        {
          vocab: "mathematician",
          meaning: "นักคณิตศาสตร์",
        },
        {
          vocab: "naturalist",
          meaning: "นักธรรมชาติวิทยา",
        },
      ],
      randomQuestion: [],

      isSendAnswer: false,
      isCorrectAnswer: false,
    };
  },

  methods: {
    nextQuestion() {
      this.startPractice();

      this.isSendAnswer = false;
      this.currentQuestion++;
    },
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
