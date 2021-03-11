<template>
  <q-page :class="!isSynchronize ? 'bg-translation' : `bg-translation-action`">
    <div>
      <app-bar
        :isHasHelp="true"
        :isHasInstruction="true"
        :themeSync="themeSync"
        :isShowHome="true"
        :isShowPause="true"
        :isLoadPractice="isLoadPractice"
      ></app-bar>
    </div>

    <div class="absolute-center" v-if="!isLoadPractice">
      <q-spinner color="primary" size="100px" />
    </div>

    <translation-pc
      :themeSync="themeSync"
      :practiceData="practiceData"
      @callback-nextquestion="funcSelectedQuestion()"
      v-if="$q.platform.is.desktop && !isSynchronize && isLoadPractice"
    ></translation-pc>

    <translation-mobile
      :themeSync="themeSync"
      :practiceData="practiceData"
      v-if="$q.platform.is.mobile && !isSynchronize && isLoadPractice"
    ></translation-mobile>

    <translation-action-pc
      :themeSync="themeSync"
      :practiceData="practiceData"
      @callback-nextquestion="funcSelectedQuestion()"
      class="box-container-main"
      v-if="$q.platform.is.desktop && isSynchronize && isLoadPractice"
    ></translation-action-pc>
  </q-page>
</template>

<script>
import appBar from "../components/app-bar";
import translationPc from "../components/translation/translationPc";
import translationMobile from "../components/translation/translationMobile";
import translationActionPc from "../components/translation/translationActionPc";
// import translationActionMobile from "../components/translation/translationActionMobile";
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { db } from "src/router";
export default {
  components: {
    appBar,
    translationPc,
    translationMobile,
    translationActionPc,
    // translationActionMobile,
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
      currentQuestion: 0,
      question: "",
      choices: [],
      questionTh: "",
      nameTh: "",
      nameEng: "",
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

        try {
          let getPracticeName = await db
            .collection("practiceListName")
            .where("level", "==", getData.data().level)
            .where("unit", "==", getData.data().unit)
            .where("skill", "==", "Writing")
            .get();

          practiceData.nameEng = getPracticeName.docs[0].data().nameEng;
          practiceData.nameTh = getPracticeName.docs[0].data().nameTh;
        } catch (error) {
          console.log(`${error} : Get Load Practice List Name`);
        }

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

        questionList.value = questionList.value.filter((x) => !x.except);

        questionList.value = questionList.value.slice(0, practiceData.totalQuestion);

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

      let findTag = questionList.value[practiceData.currentQuestion].sentenceEng.match(
        /<s*u>(.*?)<s*\/u>/gm
      );

      newQuestion = newQuestion
        .replace(/,/g, ", ")
        .replace(/&nbsp;/g, " ")
        .split(/<s*u>(.*?)<s*\/u>/gm);

      newQuestion = newQuestion.map((x, index) => {
        let newData = {
          isAnswer: false,
          answer: x,
          currentAnswer: "",
          index: index,
          correctAnswer: false,
        };

        let moveArrUnderline = null;

        for (let i = 0; i < findTag.length; i++) {
          let newTag = findTag[i].replace(/<u>/g, "").replace(/<\/u>/g, "");

          if (newData.answer == newTag) {
            moveArrUnderline = i;

            findTag.splice(moveArrUnderline, 1);
            newData.isAnswer = true;
            break;
          }
        }

        return newData;
      });

      // Practice Data : Show Question
      practiceData.question = newQuestion;

      // Practice Data : Show Question Th
      practiceData.questionTh =
        questionList.value[practiceData.currentQuestion].sentenceTh;

      practiceData.questionEng =
        questionList.value[practiceData.currentQuestion].sentenceEng;

      let tempChoices = questionList.value[practiceData.currentQuestion].sentenceExtra;
      // .map((x, index) => {
      //   let newData = {
      //     index: index,
      //     answer: x,
      //   };

      //   return newData;
      // });

      tempChoices.sort(() => Math.random() - 0.5);

      // Practice Data : Show Choices
      practiceData.choices = tempChoices;
    };

    // Mounted
    onMounted(() => {
      funcLoadPractice();
    });

    return { practiceData, isLoadPractice, funcSelectedQuestion };
  },
};
</script>

<style lang="scss" scoped>
.bg-translation {
  background-image: url("../../public/images/translation/bg-translation.png");
  background-size: cover;
  background-color: #fff;
}

.bg-translation-action {
  background-image: url("../../public/images/translation/bg-translation-action.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
