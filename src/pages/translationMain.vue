<template>
  <q-page :class="!isSynchronize ? 'bg-translation' : `bg-translation-action`">
    <div>
      <app-bar
        :isHasHelp="false"
        :isHasInstruction="true"
        :isShowHome="false"
        :isShowPause="true"
        :isLoadPractice="isLoadPractice"
      ></app-bar>
    </div>

    <div class="absolute-center" v-if="!isLoadPractice">
      <q-spinner color="primary" size="100px" />
    </div>

    <translation-pc
      :practiceData="practiceData"
      @callback-nextquestion="funcSelectedQuestion()"
      @callback-finishpractice="funcFinishPractice()"
      class="box-container-main"
      v-if="$q.platform.is.desktop && !isSynchronize && isLoadPractice"
    ></translation-pc>

    <translation-mobile
      :practiceData="practiceData"
      @callback-nextquestion="funcSelectedQuestion()"
      @callback-finishpractice="funcFinishPractice()"
      v-if="$q.platform.is.mobile && !isSynchronize && isLoadPractice"
    ></translation-mobile>

    <translation-action-pc
      :practiceData="practiceData"
      @callback-nextquestion="funcSelectedQuestion()"
      class="box-container-main"
      v-if="$q.platform.is.desktop && isSynchronize && isLoadPractice"
    ></translation-action-pc>

    <!-- Finish Practice -->
    <finish-practice-dialog
      :isFinishPractice="isFinishPractice"
      @reStart="reStart"
    ></finish-practice-dialog>
  </q-page>
</template>

<script>
import appBar from "../components/app-bar";
import translationPc from "../components/translation/translationPc";
import translationMobile from "../components/translation/translationMobile";
import translationActionPc from "../components/translation/translationActionPc";
// import translationActionMobile from "../components/translation/translationActionMobile";
import finishPracticeDialog from "../components/finishPracticeDialog";
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
    finishPracticeDialog,
  },
  props: {
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
      contentEng: "",
      contentTh: "",
    });

    const isFinishPractice = ref(false);

    const isLoadPractice = ref(false);

    // Function : Load Practice
    const funcLoadPractice = async () => {
      console.clear();

      let tempContent = [];

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
        tempContent = response.data;

        // เรียงแบบฝึกหัด
        tempContent.sort((a, b) => a.order - b.order);

        let setNewContentEng = "";
        let setNewContentTh = "";

        tempContent.forEach((x) => {
          setNewContentEng +=
            x.sentenceEng.split(/<s*u>(.*?)<s*\/u>/gm).join(" ") + "<br><br>";
          setNewContentTh += x.sentenceTh + "<br><br>";
        });

        practiceData.contentEng = setNewContentEng
          .replace(/&nbsp;/g, "")
          .replace(/" , "/g, ", ");
        practiceData.contentTh = setNewContentTh;

        questionList.value = tempContent.filter((x) => !x.except);

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
          isCorrectAnswer: false,
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

    const funcFinishPractice = () => {
      setTimeout(() => {
        isFinishPractice.value = true;
      }, 100);
    };

    const reStart = async () => {
      isFinishPractice.value = false;
      isLoadPractice.value = false;

      practiceData.totalQuestion = 0;
      practiceData.totalStar = 0;
      practiceData.question = [];
      practiceData.choices = [];
      practiceData.currentQuestion = 0;

      // await checkPracticePermission();
      funcLoadPractice();
    };

    // Mounted
    onMounted(() => {
      funcLoadPractice();
    });

    return {
      practiceData,
      isLoadPractice,
      isFinishPractice,
      funcSelectedQuestion,
      funcFinishPractice,
      reStart,
    };
  },
};
</script>

<style lang="scss" scoped>
.bg-translation {
  background-image: url("../../public/images/translation/bg-writing.png");
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
