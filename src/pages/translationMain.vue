<template>
  <q-page
    :class="!isSynchronize ? 'bg-translation' : `bg-translation-theme-${themeSync}`"
  >
    <div>
      <app-bar :themeSync="themeSync" :isShowHome="true"></app-bar>
    </div>

    <div class="absolute-center" v-if="!isLoadPractice">
      <q-spinner color="primary" size="100px" />
    </div>

    <translation-pc
      :themeSync="themeSync"
      :practiceData="practiceData"
      v-if="$q.platform.is.desktop && isLoadPractice"
    ></translation-pc>

    <translation-mobile
      :themeSync="themeSync"
      :practiceData="practiceData"
      v-if="$q.platform.is.mobile && isLoadPractice"
    ></translation-mobile>
  </q-page>
</template>

<script>
import appBar from "../components/app-bar";
import translationPc from "../components/translation/translationPc";
import translationMobile from "../components/translation/translationMobile";
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { db } from "src/router";
export default {
  components: {
    appBar,
    translationPc,
    translationMobile,
  },
  props: {
    themeSync: {
      type: Number,
      default: 1,
    },
    isSynchronize: {
      type: Boolean,
      default: () => false,
    },
  },
  setup(props) {
    // Initial Route
    const route = useRoute();
    const router = useRouter();

    // Initial Data
    const questionList = ref([]);
    const practiceData = reactive({
      totalQuestion: 0,
      totalStar: 0,
      currentQuestion: 2,
      question: "",
      choices: [],
      questionTh: "",
    });
    const isLoadPractice = ref(false);

    // Function : Load Practice
    const funcLoadPractice = async () => {
      console.clear();

      try {
        // Set Practice ID
        let practiceListId = route.params.practiceListId;

        // Get Practice List
        let getData = await db.collection("practiceList").doc(practiceListId).get();

        // Practice Data : Show Total Question
        practiceData.totalQuestion = getData.data().numOfPractice;

        // Get Practice Data
        const apiURL =
          "https://us-central1-winnerenglish2-e0f1b.cloudfunctions.net/wfunctions/getPracticeData";

        const postData = {
          practiceListId: practiceListId,
        };

        const response = await axios.post(apiURL, postData);

        // Question List : Set Question
        questionList.value = response.data;

        // เรียงแบบฝึกหัด
        questionList.value.sort((a, b) => a.order - b.order);

        // สุ่มแบบฝึกหัด
        // questionList.value.sort(() => Math.random() - 0.5);

        funcSelectedQuestion(true);

        isLoadPractice.value = true;
      } catch (error) {
        console.log(`${error} : Function Load Practice`);
      }
    };

    const funcSelectedQuestion = (firsttime) => {
      firsttime = firsttime || false;

      if (!firsttime) {
        practiceData.currentQuestion++;
      }

      // Practice Data : Show Question
      let newQuestion = questionList.value[practiceData.currentQuestion].sentenceEng;

      newQuestion = newQuestion
        .replace(/,/g, " , ")
        .replace(/&nbsp;/g, " ")
        .split(" ");

      newQuestion = newQuestion.map((x, index) => {
        let newData = {
          isAnswer: false,
          answer: x,
          currentAnswer: "",
          index: index,
        };

        let tagMatch = x.match(/<s*u>(.*?)<s*\/u>/gm) || 0;

        if (tagMatch.length) {
          newData.isAnswer = true;
          newData.answer = newData.answer.replace(/<s*u>(.*?)<s*\/u>/g, "");
        }

        return newData;
      });

      // Practice Data : Show Question
      practiceData.question = newQuestion;

      // Practice Data : Show Question Th
      practiceData.questionTh =
        questionList.value[practiceData.currentQuestion].sentenceTh;

      // Practice Data : Show Choices
      practiceData.choices =
        questionList.value[practiceData.currentQuestion].sentenceExtra;
    };

    // Mounted
    onMounted(() => {
      funcLoadPractice();
    });

    return { practiceData, isLoadPractice };
  },
};
</script>

<style lang="scss" scoped>
.bg-translation {
  background-image: url("../../public/images/translation/bg-translation.png");
  background-size: cover;
  background-color: #fff;
}

.bg-translation-theme-1 {
  background-image: url("../../public/images/action/bg-action-theme-1.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.bg-translation-theme-2 {
  background-image: url("../../public/images/action/bg-action-theme-2.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
