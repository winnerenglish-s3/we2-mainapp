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
    <div class="col-12 row justify-center brx" style="z-index: 1">
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
            <div class="absolute-center transparent">
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
                randomQuestion[index].vocab == item.vocab ? '-correct' : '-incorrect'
              }.png`)
            "
          >
            <div class="absolute-center transparent full-width" align="center">
              <div class="" style="font-size: max(1.1vw, 12px)">
                <span class="text-black">
                  {{ item.vocab }}
                </span>

                <div v-if="randomQuestion[index].vocab != item.vocab">
                  <span class="text-black">คำตอบที่ถูกต้องคือ</span>
                  <br />
                  <span>{{ randomQuestion[index].vocab }}</span>
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
                randomQuestion[index].meaning
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
import { ref, reactive, onMounted } from "vue";
export default {
  props: {
    themeSync: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const testCount = ref(0);

    const getThemeSync = () => {
      console.log(props.themeSync);
    };

    return {
      testCount,
      getThemeSync,
    };
  },
  components: {
    headerBar,
    themeAnimation,
  },
  data() {
    return {
      currentQuestion: 0,
      totalQuestion: 10,
      activeLeftIndex: null,
      activeRightIndex: null,
      choicesRight: [],
      choicesLeft: [],
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
    sendAnswer() {
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
    },
    selectAnswer(index, moveTo) {
      let selectActive = "";

      if (this.activeLeftIndex != null) {
        selectActive = { ...this.choicesLeft[this.activeLeftIndex] };

        this.choicesLeft[this.activeLeftIndex].vocab = "";
        this.choicesLeft[this.activeLeftIndex].meaning = "";
      } else {
        selectActive = { ...this.choicesRight[this.activeRightIndex] };

        this.choicesRight[this.activeRightIndex].vocab = "";
        this.choicesRight[this.activeRightIndex].meaning = "";
      }

      this.activeLeftIndex = null;
      this.activeRightIndex = null;

      if (moveTo == "right") {
        this.choicesRight[index] = selectActive;
      }

      if (moveTo == "left") {
        this.choicesLeft[index] = selectActive;
      }
    },
    startPractice() {
      let temp = [...this.choices];

      this.choicesRight = [];
      this.choicesLeft = [];

      for (let i = 0; i < temp.length; i++) {
        this.choicesRight.push({ vocab: "", meaning: "" });
        this.choicesLeft.push({ ...temp[i] });
      }

      let tempRandom = temp.sort(() => Math.random() - 0.5);
      this.randomQuestion = tempRandom;
    },
  },
  created() {
    this.startPractice();
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
